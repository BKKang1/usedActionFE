import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Main from "./components/Main";
import Header from "./components/header/Header";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
