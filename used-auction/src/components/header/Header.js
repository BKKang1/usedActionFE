import Search from "./others/SearchProductName";
import axios from "axios";
import { Link } from "react-router-dom";
import DropdownMenu from "./others/DropdownMenu";
import { useRef } from "react";
import {
  WechatOutlined,
  TeamOutlined,
  PayCircleFilled,
} from "@ant-design/icons";
import Title from "./others/Title";
import LoginModal from "./login/LoginModal";
import { NavLink } from "react-router-dom";

const outerBox = {
  display: "flex",
  flexDirection: "column",
  margin: "2rem 15%",
  minWidth:"1200px"
  
};
const headerBox = {
  display: "flex",
  justifyContent: "center",
  margin: "2rem",
  alignItems: "center",
  borderBottom: "2px solid",
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
const DropdownMenuStyle={
  width:"90%",
  height:"90%"
}
const LoginModalBoxStyle = {
  display: "flex",
  flexDirection: "row-reverse",
};
const itemStyle1 = {
  flexBasis: "30rem",
};
const textDecoration = {
  textDecoration: "none",
  color:"black"
};
const Headers = () => {
  let categoryId = useRef("0");
  return (
    <div style={outerBox}>
      <div style={LoginModalBoxStyle}>
        <LoginModal></LoginModal>
      </div>

      <div style={headerBox}>
        <NavLink to="/usedAuctionFE" style={textDecoration}>
          <div style={innerBox}>
            <Title></Title>
          </div>
        </NavLink>

        <div style={innerBox && itemStyle1}>
          <Search categoryId={categoryId}></Search>
        </div>

        <div style={innerBox}>
          <PayCircleFilled style={iconSize} />

          <b>판매하기</b>
        </div>
        <Link to="/usedAuctionFE/myStore">
          <div style={innerBox}>
            <TeamOutlined style={iconSize} />
            <b>내 상점</b>
          </div>
        </Link>
        <div style={innerBox}>
          <WechatOutlined style={iconSize} />

          <b>채팅</b>
        </div>
      </div>
      <div style={DropdownMenuStyle} >
        <DropdownMenu categoryId={categoryId}></DropdownMenu>
      </div>
    </div>
  );
};
export default Headers;
