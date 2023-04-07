import { BrowserRouter, Route, Routes } from "react-router-dom";

import axios from "axios";
import Main from "./components/main/Main";
import Header from "./components/header/Header";
import MyStore from "./components/myStore/MyStore";
import ProductManagement from "./components/myStore/ProductManagement";
import { API } from "./config";

const layoutStyle = {
  minWidth: "1200px",
};
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
function App() {
  return (
    <div style={layoutStyle}>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/usedAuctionFE" element={<Main></Main>}></Route>
          <Route path="/usedAuctionFE/myStore" element={<MyStore />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
