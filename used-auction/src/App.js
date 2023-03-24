import { BrowserRouter, Route, Routes } from "react-router-dom";

import axios from "axios";
import Main from "./components/main/Main";
import Header from "./components/header/Header";

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
