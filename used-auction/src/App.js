import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

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
import ModifyProduct from "./components/sellProduct/ModifyProduct";
import { useEffect } from "react";
import { useQuery } from 'react-query';
 
const layoutStyle = {
  margin: "0 auto",
  width: "1200px",
};

function App() {

  const [token, setToken] = useRecoilState(accessToken);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios.defaults.withCredentials = true;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers.delete["Content-Type"] = "application/json";
  axios.defaults.headers.patch["Content-Type"] = "application/json";


  return (
    <div style={layoutStyle}>
      <BrowserRouter>
        <Header></Header>
        <Routes  >
        
          <Route path="/usedAuctionFE"  element={<Main></Main>}></Route>
          <Route path="/usedAuctionFE/myStore" element={<MyStore />}></Route>
          <Route path="/usedAuctionFE/sellProduct" element={<SellProduct />}></Route>
          <Route path="/usedAuctionFE/modifyProduct/:productId" element={<ModifyProduct />}></Route>
          <Route path="/usedAuctionFE/chattingRoom" element={<ChatRoomList />}></Route>
          <Route path="/usedAuctionFE/chattingRoom/detail/:roomId" element={<ChatRoomList />}></Route>
          <Route
            path="/usedAuctionFE/productList"
            element={<ProductList />}
          ></Route>
          <Route
            path="/usedAuctionFE/productList/productDetail/:productId"
            element={<Product />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;