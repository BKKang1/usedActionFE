
import { useRecoilState } from "recoil";
import { accessToken, loginState } from "../../recoil/accessToken";
import {nicknameKey} from "../../recoil/loginId";
import React, { Component, location, useState, useEffect,useRef, useContext } from "react";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
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
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

const chatBox = {
    width: "130%",
    marginRight: "100px",
    height: "300px",
    borderRadius: "5px",
    backgroundColor: "white",
    overflow: "hidden"
};

const chatList = {
    overflow: "hidden"
};

const StreamChat = ({user}) => {
    const [messageList, setMessageList] = useState([]);
    const [message, setMessage] = useState("");
    const [name, setName] = useRecoilState(nicknameKey);


    useEffect(() => {
        user.stream.session.on('signal:chat', (event) => {
            console.log(messageList);
            const data = JSON.parse(event.data);
            const tempMessage = { connectionId: event.from.connectionId, nickname: data.nickname, message: data.message };
            setMessageList(messageList => [...messageList, tempMessage]);
        });
    }, []);

    const handlePressKey = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    const handleChange = (event) => {
        setMessage(event);
    };

    const sendMessage = () => {
        if (user && message && name) {
            let tempMessage = message.replace(/ +(?= )/g, '');
            if (tempMessage !== '' && tempMessage !== ' ') {
                const data = { message: tempMessage, nickname: name, streamId: user.stream.streamId };
                user.stream.session.signal({
                    data: JSON.stringify(data),
                    type: 'chat',
                });
            }
        }
        else{
            alert("로그인해주십시오.");
        }
        setMessage("");
    };

    const close = () => {
        user.close(undefined);
    };
    
    return (
        <div className="chat-box" style={chatBox}>
            <ChatContainer style={chatList}>
                <ConversationHeader>
                <ConversationHeader.Back />
                <ConversationHeader.Content/>                  
                </ConversationHeader>
                <MessageList >
                {
                    messageList.map((item,idx) => (
                    <MessageGroup
                        key={idx}
                        sender= {item.nickname}
                    >
                        <MessageGroup.Header>{item.nickname}</MessageGroup.Header>
                        <MessageGroup.Messages> 
                        <Message model={{
                        message: item.message
                        }} />
                        </MessageGroup.Messages>
                    </MessageGroup>
                    ))
                }
                </MessageList>
                <MessageInput 
                placeholder="Type message here" 
                attachButton={false} 
                value={message}
                onChange={handleChange}
                onSend={sendMessage} 
                />
            </ChatContainer>
        </div>
    );

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         messageList: [],
    //         message: '',
    //     };
    //     this.chatScroll = React.createRef();
    //     this.handleChange = this.handleChange.bind(this);
    //     this.handlePressKey = this.handlePressKey.bind(this);
    //     this.close = this.close.bind(this);
    //     this.sendMessage = this.sendMessage.bind(this);
    // }

    // componentDidMount() {
    //     this.props.user.stream.session.on('signal:chat', (event) => {
    //         const data = JSON.parse(event.data);
    //         let messageList = this.state.messageList;
    //         messageList.push({ connectionId: event.from.connectionId, nickname: data.nickname, message: data.message });
    //         this.setState({ messageList: messageList });
    //         this.scrollToBottom();
    //     });
    // }

    // handleChange(event) {
    //     console.log(event);
    //     this.setState({ message: event });
    // }

    // handlePressKey(event) {
    //     if (event.key === 'Enter') {
    //         this.sendMessage();
    //     }
    // }


    // sendMessage() {
    //     console.log(this.state.message);
    //     if (this.props.user && this.state.message) {
    //         let message = this.state.message.replace(/ +(?= )/g, '');
    //         if (message !== '' && message !== ' ') {
    //             const data = { message: message, nickname: "대현", streamId: this.props.user.stream.streamId };
    //             this.props.user.stream.session.signal({
    //                 data: JSON.stringify(data),
    //                 type: 'chat',
    //             });
    //         }
    //     }
    //     this.setState({ message: '' });
    // }


    // scrollToBottom() {
    //     setTimeout(() => {
    //         try {
    //             this.chatScroll.current.scrollTop = this.chatScroll.current.scrollHeight;
    //         } catch (err) {}
    //     }, 20);
    // }

    // close() {
    //     this.props.close(undefined);
    // }
}
export default StreamChat;