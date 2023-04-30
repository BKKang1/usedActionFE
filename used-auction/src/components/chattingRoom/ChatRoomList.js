
import { useRecoilState } from "recoil";
import { accessToken, loginState } from "../../recoil/accessToken";
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { 
    MainContainer, 
    ChatContainer,
    ConversationHeader, 
    MessageList,
    MessageGroup, 
    Message, 
    MessageInput, 
    Sidebar,
    Search,
    ConversationList,
    Conversation,
    
} from '@chatscope/chat-ui-kit-react';
import axios from "axios";
import { API } from "../../config";
import React, { location, useState, useEffect,useRef } from "react";
import SockJS from "sockjs-client";
const Stomp = require('stompjs');
axios.defaults.withCredentials = true;

const totalBox = {
    marginLeft: "20%",
    marginRight: "20%",
    marginBottom: "10%",
    height: "400px",
    position: "relative",
    overflow: "hidden"
};

const sidebarStyle = {
    height: "390px",
    overflow: "hidden"
};

const ChatRoomList = () => {
    const [token, setToken] = useRecoilState(accessToken);
    const [searchValue, setSearchValue] = useState("");
    const [conversationList, setConversationList] = useState([]);
    const [searched, setSearched] = useState([]);
    const [onClickTrigger,setOnClickTrigger] =useState(false);
    const [onReadTrigger,setOnReadTrigger] =useState(false);
    const [selectedRoomName, setSelectedRoomName] = useState("");
    const [selectedRoomId, setSelectedRoomId] = useState("");
    const [loadedMessages, setLoadedMessages] = useState([]);
    const [message, setMessage] = useState({});
    const [messageInputValue, setMessageInputValue] = useState("");
    const [pageNum,setPageNum] = useState(1);

    let sseTrigger =useRef(false);
    let stomp_client =useRef();
    //let stomp_client = useRef();
    //stomp_client.current = Stomp.over(socket);

    useEffect(() => {
      if(window.history.state.isExist == true){
        console.log(window.history.state);
        onClcik(window.history.state.chatRoomId, window.history.state.roomName);
      }
      axios
        .get(API.CHATROOMLIST)
        .then((response) => {
            console.log(response.data.result);
            setConversationList(response.data.result);
        })
        .catch((error) => {
            console.log(error.response.data);
        });

      //sse작업  
    }, []);

    useEffect(() => {
      
    }, [sseTrigger]);

    useEffect(() => {
      console.log("onReadTrigger먹힘");
      //여기서 readOrNot을 true로 전환.
    }, [onReadTrigger]);

    useEffect(() => {
        if(searchValue != ""){
          setSearched(conversationList.filter((e) => {console.log(e); return e.roomName.toLowerCase().includes(searchValue);}));
          console.log(searched);
        }
    }, [searchValue]);

    useEffect(() => {
      if(onClickTrigger == true ){
        console.log(selectedRoomName);
        onConnectSocket();

        axios
        .get(API.CHATLIST + `/${selectedRoomId}`)
        .then((response) => {
          console.log(response.data.content);
          if(response.data.content.length != 0){
            setLoadedMessages(response.data.content.reverse().concat(loadedMessages));
          }
          console.log(loadedMessages);
        })
        .catch((error) => {
          console.log(error);
        });
      }
    }, [selectedRoomName]);

    useEffect(() => {
      console.log(loadedMessages);
      setLoadedMessages(loadedMessages.concat(message));
    }, [message]);

    const onConnectSocket = () => {
      console.log("리스트:"+ loadedMessages);
      let socket = new SockJS('https://' + "usedauction.shop" + '/chat/ws',{perMessageDeflate: false});
      stomp_client.current = Stomp.over(socket);

      stomp_client.current.connect(
        {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,

        },function(){
          console.log('Going to subscribe ... ');
          stomp_client.current.subscribe(`/sub/room/${window.history.state.chatRoomId}`, function(frame){
            console.log('Subscribe되는중');
            console.log('Subscribe: Incoming message: ' + frame.body);
            if (frame.body) {
              const tempMessage = JSON.parse(frame.body);
              if(tempMessage.type=="ENTER" && tempMessage.sender!="대현"){
                console.log("상대가 방에 들어왔다.");
              }
              if(tempMessage.type=="ENTER" && tempMessage.sender=="대현"){
                console.log("내가 방에 들어왔다.");
                setOnReadTrigger(true);
              }
              else if(tempMessage.type=="TALK"){
                if(tempMessage.sender=="대현"){
                  setMessage({...tempMessage,direction:"outgoing"});
                }
                else if(tempMessage.sender!="대현"){
                  setMessage({...tempMessage,direction:"incoming"});
                }
              }
            }
            console.log("스톰프-subscribe: ");
            console.log(stomp_client);
          }, {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          });

          setTimeout(function() {
            stomp_client.current.send('/pub/message', {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            }, JSON.stringify({
              chatRoomId : window.history.state.chatRoomId,
              sender: "대현",
              type: 'ENTER'
            }));
            console.log("스톰프-send1: ");
            console.log(stomp_client);
          }, 300);
      });
      console.log("스톰프-connectBefore: ");
      console.log(stomp_client);
    };

    const onChangeSearchValue = (e) => {
        console.log(e);
        setSearchValue(e.toLowerCase()); 
    };

    const onChangeMessageInput = (e) => {
      console.log(e);
      setMessageInputValue(e);
    };

    const onSendMessage = () => {
      console.log("리스트:"+ loadedMessages);

      stomp_client.current.send('/pub/message', {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }, JSON.stringify({
        chatRoomId : window.history.state.chatRoomId,
        sender: "대현",
        message: messageInputValue,
        type: 'TALK'
      }));
      setMessageInputValue("");
    };

    const onClcik = (e1, e2) => {
      console.log(e1 + "/" + e2);
      if(selectedRoomId != e1){
        const state = { 
          isExist: true,
          chatRoomId: e1,
          roomName: e2,
        };
        window.history.pushState(state, null, `/usedAuctionFE/chattingRoom/detail/${e1}`);
        setSelectedRoomName(window.history.state.roomName);
        setSelectedRoomId(window.history.state.chatRoomId);
        setOnClickTrigger(true);
        setLoadedMessages([]);
        setPageNum(1);
      }
    };

  const onYReachStart = () => {
    axios
      .get(API.CHATLIST + `/${selectedRoomId}?page=${pageNum}`)
      .then((response) => {
        console.log(response.data.content);
        console.log(loadedMessages);
        if(response.data.content.length != 0){
          setLoadedMessages(response.data.content.reverse().concat(loadedMessages));
          setPageNum(pageNum+1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const chatList = () => {
    return(
      <ChatContainer>
        <ConversationHeader>
          <ConversationHeader.Back />
          <ConversationHeader.Content userName={selectedRoomName} info="Active 10 mins ago" />         
        </ConversationHeader>
        <MessageList loadingMore={false} onYReachStart={onYReachStart}>
          {
            loadedMessages.map((item,idx) => (
              <MessageGroup
                key={idx}
                sentTime={item.sentTime}
                sender= {item.sender}
                direction={item.direction}
              >
                <MessageGroup.Messages> 
                <Message model={{
                  message: item.message
                }} />
                </MessageGroup.Messages>
                <MessageGroup.Footer>{item.readOrNot==true||item.direction=="incoming"?"":"🔴"}  {item.sentTime}</MessageGroup.Footer>
              </MessageGroup>
            ))
          }
        </MessageList>
        <MessageInput 
          placeholder="Type message here" 
          value={messageInputValue} 
          attachButton={false} 
          onChange={onChangeMessageInput}
          onSend={onSendMessage} 
        />
      </ChatContainer>
    );
  };

  const defaultList = () => {
    return(
      <div>채팅방을 선택해주십시오</div>
    );
  };

    return(
        <div style={totalBox}>
            <MainContainer responsive>                                   
                <Sidebar position="left" scrollable={true} style={sidebarStyle}>
                  <Search placeholder="Search..." value={searchValue} onChange={onChangeSearchValue} onClearClick={() => setSearchValue("")}/>
                  <ConversationList>                                                     
                  {(searchValue == "")?
                    conversationList.map((item) => (
                      <Conversation 
                        key={item.chatRoomId} 
                        name={item.roomName} 
                        lastSenderName={item.recentSender}
                        info={item.recentMessage} 
                        unreadCnt={item.unReadMessages}
                        onClick={()=>{onClcik(item.chatRoomId, item.roomName);}}
                      />  
                    )):
                    searched.map((item) => (
                      <Conversation 
                        key={item.chatRoomId} 
                        name={item.roomName} 
                        lastSenderName={item.recentSender}
                        info={item.recentMessage} 
                        unreadCnt={item.unReadMessages}
                        onClick={()=>{onClcik(item.chatRoomId, item.roomName);}}
                      />  
                    ))
                  }                                                      
                  </ConversationList>
                </Sidebar>
                {(onClickTrigger == true)?chatList(() => {}):defaultList(() => {})}
            </MainContainer>    
        </div>
    );

};
export default ChatRoomList;