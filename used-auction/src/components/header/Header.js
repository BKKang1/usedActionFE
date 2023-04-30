import Search from "./others/SearchProductName";
import axios from "axios";
import { Link } from "react-router-dom";
import DropdownMenu from "./others/DropdownMenu";
import { useRef,useEffect } from "react";
import {
  WechatOutlined,
  TeamOutlined,
  PayCircleFilled,
} from "@ant-design/icons";
import Title from "./others/Title";
import LoginModal from "./login/LoginModal";
import { NavLink, useLocation } from "react-router-dom";


const outerBox = {
  display: "flex",
  flexDirection: "column",
  margin: "2rem",
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
  marginLeft: "2rem",
};
const LoginModalBoxStyle = {
  display: "flex",
  flexDirection: "row-reverse",
};
const itemStyle1 = {
  flexBasis: "30rem",
};
const textDecoration = {
  textDecoration: "none",
  color: "black",
};
const Headers = () => {
  let location = useLocation();
  let categoryId = useRef("0");
  
  useEffect(() => {
    console.log("location", location.pathname.includes("productDetail/"));
  }, [location]);
  useEffect(() => {
    console.log("USEEFFECT 일어남");
  }, );
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
        <Link to="/usedAuctionFE/sellProduct">
          <div style={innerBox}>
            <PayCircleFilled style={iconSize} />
            <b>판매하기</b>
          </div>
        </Link>
        <Link to="/usedAuctionFE/myStore">
          <div style={innerBox}>
            <TeamOutlined style={iconSize} />
            <b>내 상점</b>
          </div>
        </Link>
        <Link to="/usedAuctionFE/chattingRoom">
          <div style={innerBox}>
            <WechatOutlined style={iconSize} />
            <b>채팅</b>
          </div>
        </Link>
      </div>
      <div style={DropdownMenuStyle}>
        <DropdownMenu categoryId={categoryId}></DropdownMenu>
      </div>
    </div>
  );
};
export default Headers;
