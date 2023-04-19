
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { 
    MainContainer, 
    ChatContainer, 
    MessageList, 
    Message, 
    MessageInput, 
    Sidebar,
    Search,
    ConversationList,
    Conversation,
    Avatar,
    
} from '@chatscope/chat-ui-kit-react';
import axios from "axios";
import { API } from "../../config";
import React, { location, useState, useEffect } from "react";
axios.defaults.withCredentials = true;

const totalBox = {
    marginLeft: "20%",
    marginRight: "20%",
    marginBottom: "10%",
};

const sidebarStyle = {
    height: "500px",
    overflow: "hidden"
};

const ChatList = () => {
    const [searchValue, setSearchValue] = useState("");

    const [conversations, setConversations] = useState([
        {
            id:"",
            name:"",
            info:"",
            unreadCnt:"",
        }
    ]);

    useEffect(() => {
        //sse로 채팅방 리스트 받아오는 부분
    }, []);

    // useEffect(() => {
    //     let conversationList = conversations.filter((e) => {console.log(e); e.name.toLowerCase().includes(searchValue);});

    // }, [searchValue]);


    const onChange = (e) => {
        console.log(e);
        setSearchValue(e); 
    };

    return(
        <div style={totalBox}>
            <MainContainer responsive>                                   
                <Sidebar position="left" scrollable={true} style={sidebarStyle}>
                  <Search placeholder="Search..." value={searchValue} onChange={onChange} onClearClick={() => setSearchValue("")}/>
                  <ConversationList>                                                     
                    <Conversation name="Lilly" lastSenderName="Lilly" info="Yes i can do it for you">
                      {/* <Avatar src={lillyIco} name="Lilly" status="available" /> */}
                    </Conversation>
                    
                    <Conversation name="Joe" lastSenderName="Joe" info="Yes i can do it for you">
                      {/* <Avatar src={joeIco} name="Joe" status="dnd" /> */}
                    </Conversation>
                    
                    <Conversation name="Emily" lastSenderName="Emily" info="Yes i can do it for you" unreadCnt={3}>
                      {/* <Avatar src={emilyIco} name="Emily" status="available" /> */}
                    </Conversation>
                    
                    <Conversation name="Kai" lastSenderName="Kai" info="Yes i can do it for you" unreadDot>
                      {/* <Avatar src={kaiIco} name="Kai" status="unavailable" /> */}
                    </Conversation>
                                
                    <Conversation name="Akane" lastSenderName="Akane" info="Yes i can do it for you">
                      {/* <Avatar src={akaneIco} name="Akane" status="eager" /> */}
                    </Conversation>
                                        
                    <Conversation name="Eliot" lastSenderName="Eliot" info="Yes i can do it for you">
                      {/* <Avatar src={eliotIco} name="Eliot" status="away" /> */}
                    </Conversation>
                                                        
                    <Conversation name="Zoe" lastSenderName="Zoe" info="Yes i can do it for you" active={false}>
                      {/* <Avatar src={zoeIco} name="Zoe" status="dnd" /> */}
                    </Conversation>
                    
                    <Conversation name="Patrik" lastSenderName="Patrik" info="Yes i can do it for you">
                      {/* <Avatar src={patrikIco} name="Patrik" status="invisible" /> */}
                    </Conversation>
                                                                             
                  </ConversationList>
                </Sidebar>
            </MainContainer>    
        </div>
    );

};
export default ChatList;