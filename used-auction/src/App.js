import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import SockJS from "sockjs-client";
import PrivateRoute from "./components/router/PrivateRoute";
import req from "./axios/req";
const Stomp = require("stompjs");

const layoutStyle = {
  margin: "0 auto",
  width: "1200px",
};

function App() {
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

  return (
    <ClientContext.Provider value={{ client, setClient }}>
      <div style={layoutStyle}>
        <Router>
          <Header></Header>
          <Routes>
            <Route path="/usedAuctionFE" element={<Main></Main>}></Route>
            <Route
              path="/usedAuctionFE/chattingRoom/detail/:roomId"
              element={<ChatRoomList />}
            ></Route>
            <Route
              path="/usedAuctionFE/productList"
              element={<ProductList />}
            ></Route>
            <Route
              path="/usedAuctionFE/productList/productDetail/:productId"
              element={<Product />}
            ></Route>
            <Route element={<PrivateRoute />}>
              <Route
                path="/usedAuctionFE/myStore"
                element={<MyStore />}
              ></Route>
              <Route
                element={<ModifyProduct />}
                path="/usedAuctionFE/modifyProduct/:productId"
                exact
              ></Route>
              <Route
                path="/usedAuctionFE/sellProduct"
                element={<SellProduct />}
              ></Route>
              <Route
                path="/usedAuctionFE/chattingRoom"
                element={<ChatRoomList />}
              ></Route>
            </Route>
          </Routes>
        </Router>
      </div>
    </ClientContext.Provider>
  );
}

export default App;
