import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Main from "./components/Main";
import Header from "./components/header/Header";
import MyStore from "./components/myStore/MyStore";
import ProductManagement from "./components/myStore/ProductManagement";
import { API } from "./config";

axios.defaults.withCredentials = true;
function App() {
  useEffect(() => {
    axios
      .get(API.MAIN, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
      });
  }, []);

  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<div></div>}></Route>
        <Route path="/myStore" element={<MyStore />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
