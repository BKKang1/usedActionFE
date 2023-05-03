import {createContext,useRef} from "react";
import SockJS from "sockjs-client";
const Stomp = require('stompjs');

//const socket = new SockJS('https://' + "usedauction.shop" + '/chat/ws');
//export const client = Stomp.over(socket);
// export let client = useRef();
// export const setClient = (e) => {
//     client.current=Stomp.over(e);
// };


export const ClientContext = createContext();
//export const SetClientContext = createContext(() => {});

// socket.onclose = () => {
//     console.log("소켓 끊어짐.");
//   };  
  
