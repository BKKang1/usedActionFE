import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Main from "./components/main/Main";
import Header from "./components/header/Header";
import MyStore from "./components/myStore/MyStore";
import ProductManagement from "./components/myStore/ProductManagement";
import Streaming from "./components/livestream/Streaming";
import { API } from "./config";

const layoutStyle ={
  minWidth:"1200px"
}
axios.defaults.withCredentials = true;
function App() {

  return (
    <div style={layoutStyle}>
      <BrowserRouter>
       <Header></Header>
        <Routes>
          <Route path="/" element={<Main></Main>}></Route>
          <Route path="/stream" element={<Streaming></Streaming>}></Route>
          <Route path="/myStore" element={<MyStore />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
