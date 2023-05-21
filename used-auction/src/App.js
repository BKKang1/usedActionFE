import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import Main from "./components/main/Main";
import Header from "./components/header/Header";
import MyStore from "./components/myStore/MyStore";
//import ProductManagement from "./components/myStore/ProductManagement";
import ProductList from "./components/productListView/ProductList";
import SellProduct from "./components/sellProduct/SellProduct";
import ChatRoomList from "./components/chattingRoom/ChatRoomList";
import { API } from "./config";
import { useRecoilState } from "recoil";
import { accessToken } from "./recoil/accessToken";
import Product from "./components/productView/Product";
import { useEffect, useRef } from "react";
import ModifyProduct from "./components/sellProduct/ModifyProduct";
import { useQuery } from "react-query";
import { ClientContext } from "./components/chattingRoom/Soket";
import { EventSourcePolyfill } from "event-source-polyfill";
import SockJS from "sockjs-client";
import PrivateRoute from "./components/router/PrivateRoute";
import req from "./axios/req";
import { PriceOfSSE } from "./components/productView/ContextOfPrice";
import OnlineMeeting from "./components/stream/OnlineMetting";
import OnlineMeetingOfSub from "./components/stream/OnlineMettingOfSub";
import StreamSubRoute from "./components/router/StreamSubRoute";

const Stomp = require("stompjs");

const layoutStyle = {
  margin: "0 auto",
  width: "1500px",
};

function App() {
  const basename = process.env.PUBLIC_URL;
  const [token, setToken] = useRecoilState(accessToken);
  req.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios.defaults.withCredentials = true;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers.delete["Content-Type"] = "application/json";
  axios.defaults.headers.patch["Content-Type"] = "application/json";

  let client = useRef();
  const setClient = (e) => {
    console.log("client 세팅중");
    client.current = Stomp.over(e);
  };

  const EventSource = EventSourcePolyfill;
  let sse = useRef();
  const setSse = (e) => {
    console.log("sse 세팅중");
    sse.current = new EventSource(API.SSECONNECTIONOFCHATTINGROOM, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
      heartbeatTimeout: 60000,
    });
  };

  // useEffect(() => {
  //   return()=>{
  //     client.current.disconnect();
  //   }
  // }, []);

  let ssePrice = useRef();

  const setSSEPrice = (auctionId) => {
    console.log("auid", auctionId);
    ssePrice.current = new EventSource(
      API.SSECONNECTIONOFPRODUCT + `/${auctionId}`,
      {
        withCredentials: true,
        heartbeatTimeout: 300000,
      }
    );
  };
  return (
    <ClientContext.Provider value={{ client, setClient, sse, setSse }}>
      <PriceOfSSE.Provider value={{ ssePrice, setSSEPrice }}>
        <div style={layoutStyle}>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Main></Main>}></Route>
            <Route
              path="/productList/:categoryId/:productName"
              element={<ProductList />}
            ></Route>
            <Route
              path="/productList/:categoryId"
              element={<ProductList />}
            ></Route>
            <Route
              path="/productList/productDetail/:productId"
              element={<Product />}
            ></Route>
    
            <Route element={<StreamSubRoute />}>
              <Route
                path="/stream/sub/:productId"
                element={<OnlineMeetingOfSub />}
              ></Route>
            </Route>
            <Route element={<PrivateRoute />}>
              <Route
                path="/stream/:productId"
                element={<OnlineMeeting />}
              ></Route>
              <Route path="/myStore/:userId" element={<MyStore />}></Route>
              <Route
                element={<ModifyProduct />}
                path="/modifyProduct/:productId"
                exact
              ></Route>
              <Route path="/sellProduct" element={<SellProduct />}></Route>
              <Route path="/chattingRoom" element={<ChatRoomList />}></Route>
              <Route
                path="/chattingRoom/detail/*"
                element={<ChatRoomList />}
              ></Route>
            </Route>
          </Routes>
        </div>
      </PriceOfSSE.Provider>
    </ClientContext.Provider>
  );
}

export default App;
