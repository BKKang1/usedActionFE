
import { useRecoilState } from "recoil";
import { accessToken, loginState } from "../../recoil/accessToken";
import {nicknameKey} from "../../recoil/loginId";
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
    Button
} from '@chatscope/chat-ui-kit-react';
import axios from "axios";
import { API } from "../../config";
import React, { location, useState, useEffect,useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import {ClientContext} from "./Soket";
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
const innerSelectRoomStyle ={
  margin: "auto auto",
  fontSize: "30px",
};

const ChatRoomList = () => {
    const [token, setToken] = useRecoilState(accessToken);
    const [name, setName] = useRecoilState(nicknameKey);

    const [searchValue, setSearchValue] = useState("");
    const [conversationList, setConversationList] = useState([]);
    const [updatedConversation, setUpdatedConversation] = useState("");
    const [enteredRoomId, setEnteredRoomId] = useState("");
    const [newChatRoomData, setNewChatRoomData] = useState("");
    const [searched, setSearched] = useState([]);
    const [onClickTrigger,setOnClickTrigger] =useState(false);
    const [onReadTrigger,setOnReadTrigger] =useState(false);
    const [selectedRoomName, setSelectedRoomName] = useState("");
    const [selectedRoomId, setSelectedRoomId] = useState("");
    const [loadedMessages, setLoadedMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [messageInputValue, setMessageInputValue] = useState("");
    const [pageNum,setPageNum] = useState(1);
    const {client,setClient} = useContext(ClientContext);
    const {sse,setSse} = useContext(ClientContext);
    
    let noMorePage = useRef(false);


    useEffect(() => {
      console.log(window.location.pathname);
      if(window.location.pathname.includes("chattingRoom/detail")){
        let word = decodeURI(window.location.pathname);
        let words = word.split("/");
        word = words[4];
        words = word.split("&");
        let tempChatRoomId = words[0];
        let tempRoomName = words[1];
        tempChatRoomId = tempChatRoomId.split("=")[1];
        tempRoomName = tempRoomName.split("=")[1];
        console.log("채팅방아이디 : "+tempChatRoomId);
        onClcik(tempChatRoomId, tempRoomName);
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

      
      // sse = new EventSource(API.SSECONNECTIONOFCHATTINGROOM, {
      //   headers:{
      //     Authorization: `Bearer ${token}`,
      //     "Content-Type": "application/json",
      //   },
      //   withCredentials: true,
      //   heartbeatTimeout: 60000,
      // });
      console.log(sse);
      setSse();
      console.log(sse);

      sse.current.addEventListener("CONNECT", (e) => {
        const { data: receivedConnectData } = e;
        const data = JSON.parse(receivedConnectData);
        console.log(data);
      });
      sse.current.addEventListener("SEND_ROOM_DATA", (e) => {
        const { data: receivedConnectData } = e;
        const data = JSON.parse(receivedConnectData);
        console.log(data.result);
        setUpdatedConversation(data.result);
      });
      sse.current.addEventListener("SEND_ROOM_ENTER_DATA", (e) => {
        const { data: receivedConnectData } = e;
        const data = JSON.parse(receivedConnectData);
        console.log(data.result);
        setEnteredRoomId(data.result);
      }); 
      sse.current.addEventListener("SEND_NEW_ROOM_DATA", (e) => {
        const { data: receivedConnectData } = e;
        const data = JSON.parse(receivedConnectData);
        console.log(data.result);
        setNewChatRoomData(data.result);
      }); 
      sse.current.onerror = (e) => {
        if(!(window.location.pathname.includes("chattingRoom"))){
          console.log("로케이션 이동 알림");
          sse.current.close();
          return;
        }
      };
    }, []);

    useEffect(() => {
      if(updatedConversation != ""){
        console.log("채팅방리스트 업데이트 준비 완료.");
        let tempConversationList;
        let tempSearchedConversationList;

        if(updatedConversation.unReadMessages==true){
          tempConversationList = conversationList.map((item) => 
            item.chatRoomId==updatedConversation.chatRoomId?
            {
              ...item , 
              recentMessage: updatedConversation.recentMessage, 
              recentSender: updatedConversation.recentSender,
              unReadMessages: 0
            }
            :item
          );
          tempSearchedConversationList = searched.map((item) => 
            item.chatRoomId==updatedConversation.chatRoomId?
            {
              ...item , 
              recentMessage: updatedConversation.recentMessage, 
              recentSender: updatedConversation.recentSender,
              unReadMessages: 0
            }
            :item
          );
        }
        else if(updatedConversation.unReadMessages==false){
          tempConversationList = conversationList.map((item) => 
            item.chatRoomId==updatedConversation.chatRoomId?
            {
              ...item , 
              recentMessage: updatedConversation.recentMessage, 
              recentSender: updatedConversation.recentSender,
              unReadMessages: item.unReadMessages + 1
            }
            :item
          );
          tempSearchedConversationList = searched.map((item) => 
            item.chatRoomId==updatedConversation.chatRoomId?
            {
              ...item , 
              recentMessage: updatedConversation.recentMessage, 
              recentSender: updatedConversation.recentSender,
              unReadMessages: item.unReadMessages + 1
            }
            :item
          );
        }
        console.log(tempConversationList);
        setSearched(tempSearchedConversationList);
        setConversationList(tempConversationList);
      }
    }, [updatedConversation]);

    useEffect(() => {
      if(enteredRoomId != ""){
        console.log("채팅방리스트 업데이트 준비 완료.");
        const tempConversationList = conversationList.map((item) => 
        item.chatRoomId==enteredRoomId.chatRoomId?{
          ...item , 
          unReadMessages: 0
        }
          :item
        );
        const tempSearchedConversationList = searched.map((item) => 
        item.chatRoomId==enteredRoomId.chatRoomId?{
          ...item , 
          unReadMessages: 0
        }
          :item
        );
        console.log(tempConversationList);
        setSearched(tempSearchedConversationList);
        setConversationList(tempConversationList);
      }
    }, [enteredRoomId]);

    useEffect(() => {
      if(newChatRoomData!=""){
        console.log("채팅방리스트 업데이트 준비 완료.");
        console.log(newChatRoomData);
        setConversationList(
          conversationList =>
          [
            ...conversationList,
            {
              chatRoomId: newChatRoomData.chatRoomId,
              roomName: newChatRoomData.roomName,
              recentMessage: "",
              recentSender: "",
              unReadMessages: 0
            }
          ]
        );
      }

    },[newChatRoomData]);

    useEffect(() => {
      if(onReadTrigger==true){
        const tempMessageList = loadedMessages.map((item) => 
          item.readOrNot == false?{...item,readOrNot: true}:item
        );
        setLoadedMessages(tempMessageList);
        setOnReadTrigger(false);
      }
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
        if(client.current!=undefined && client.current.connected==true){
          console.log(client.current.connected);
          client.current.disconnect();
        }
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
      if(message != ""){
        console.log("메세지 있음.");
      setLoadedMessages(loadedMessages.concat(message));
      }
    }, [message]);

    const onConnectSocket = () => {
      // client = Stomp.over(socket);
      let socket = new SockJS('https://' + "usedauction.shop" + '/chat/ws');
      setClient(socket);

      client.current.connect(
        {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,

        },function(){
          console.log('Going to subscribe ... ');
          client.current.subscribe(`/sub/room/${selectedRoomId}`, function(frame){
            console.log('Subscribe되는중');
            console.log('Subscribe: Incoming message: ' + frame.body);
            if (frame.body) {
              const tempMessage = JSON.parse(frame.body);
              if(tempMessage.type=="ENTER" && tempMessage.sender!=name){
                console.log("상대가 방에 들어왔다.");
                setOnReadTrigger(true);
              }
              if(tempMessage.type=="ENTER" && tempMessage.sender==name){
                console.log("내가 방에 들어왔다.");
              }
              else if(tempMessage.type=="TALK"){
                if(tempMessage.sender==name){
                  setMessage({...tempMessage,direction:"outgoing"});
                }
                else if(tempMessage.sender!=name){
                  setMessage({...tempMessage,direction:"incoming"});
                }
              }
            }
            console.log("스톰프-subscribe: ");
            console.log(client);
          }, {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          });

          setTimeout(function() {
            client.current.send('/pub/message', {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            }, JSON.stringify({
              chatRoomId : selectedRoomId,
              sender: name,
              type: 'ENTER'
            }));
            console.log("스톰프-send1: ");
            console.log(client);
          }, 300);
        }
      );
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

      client.current.send('/pub/message', {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }, JSON.stringify({
        chatRoomId : selectedRoomId,
        sender: name,
        message: messageInputValue,
        type: 'TALK'
      }));
      setMessageInputValue("");
    };

    const onClcik = (e1, e2) => {
      console.log(e1 + "/" + e2);
      if(selectedRoomId != e1){
        window.history.pushState({}, null,`/usedAuctionFE/chattingRoom/detail/chatRoomId=${e1}&roomName=${e2}`);
        setSelectedRoomName(e2);
        setSelectedRoomId(e1);
        setOnClickTrigger(true);
        setLoadedMessages([]);
        setPageNum(1);

        // const state = { 
        //   isExist: true,
        //   chatRoomId: e1,
        //   roomName: e2,
        // };
        // window.history.pushState(state, null, `/usedAuctionFE/chattingRoom/detail/${e1}`);
        // setSelectedRoomName(window.history.state.roomName);
        // setSelectedRoomId(window.history.state.chatRoomId);
        // setOnClickTrigger(true);
        // setLoadedMessages([]);
        // setPageNum(1);
      }
    };

  const onYReachStart = () => {
    if(noMorePage.current == false){
      setTimeout(() => {
        axios
          .get(API.CHATLIST + `/${selectedRoomId}?page=${pageNum}`)
          .then((response) => {
            console.log(response.data.content);
            console.log(loadedMessages);
            if(response.data.content.length != 0){
              setLoadedMessages(response.data.content.reverse().concat(loadedMessages));
              setPageNum(pageNum+1);
            }
            noMorePage.current = true;
          })
          .catch((error) => {
            console.log(error);
          });
      }, 500);
    };
  };

  const chatList = () => {
    return(
      <ChatContainer>
        <ConversationHeader>
          <ConversationHeader.Back />
          <ConversationHeader.Content userName={selectedRoomName}/>                  
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
                  type: "custom"
                }}>
                  <Message.CustomContent>
                    <span>{item.message}</span>
                    {/* <Button border>Button</Button>  */}
                  </Message.CustomContent>
                </Message>
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
      <div style={innerSelectRoomStyle}>채팅방을 선택해주십시오</div>
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