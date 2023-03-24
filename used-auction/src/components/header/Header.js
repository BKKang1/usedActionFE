import Search from "./others/Search";
import axios from "axios";
import { API } from "../../config";
import DropdownMenu from "./others/DropdownMenu";
import {
  WechatOutlined,
  TeamOutlined,
  PayCircleFilled,
} from "@ant-design/icons";
import Title from "./others/Title";
import LoginModal from "./login/LoginModal";
import { NavLink } from "react-router-dom";
axios.defaults.withCredentials = true;
const outerBox = {
  display: "flex",
  flexDirection: "column",
  margin: "2rem 15%",
};
const headerBox = {
  display: "flex",
  justifyContent: "center",
  margin: "2rem",
  alignItems: "center",
};
const innerBox = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: "2rem",
  whiteSpace: "nowrap",
  alignItems: "center",
};
const iconSize = {
  fontSize: "3rem",
};

const LoginModalBoxStyle = {
  display: "flex",
  flexDirection: "row-reverse",
};
const itemStyle1 = {
  flexBasis: "30rem",
};
const item = [
 
];

const Headers = () => {
  return (
    <div style={outerBox}>
     
      <div style={LoginModalBoxStyle} >
        <LoginModal></LoginModal>
      </div>
    
      <div style={headerBox}>
      <NavLink to="/" >
      <div style={innerBox} >
          <Title></Title>
        </div>
        </NavLink>
  
        <div style={innerBox && itemStyle1}>
          <Search></Search>
        </div>

        <div style={innerBox}>
          <PayCircleFilled style={iconSize} />

          <b>판매하기</b>
        </div>
        <div style={innerBox}>
          <TeamOutlined style={iconSize} />

          <b>내 상점</b>
        </div>

        <div style={innerBox}>
          <WechatOutlined style={iconSize} />

          <b>채팅</b>
        </div>
      </div>
      <div>
        <DropdownMenu item={item}></DropdownMenu>
      </div>
    </div>
  );
};
export default Headers;
