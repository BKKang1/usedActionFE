import Search from "./Search";
import axios from "axios";
import { Link } from "react-router-dom";
import { API } from "../../config";
import {
  WechatOutlined,
  TeamOutlined,
  PayCircleFilled,
} from "@ant-design/icons";
import Title from "./Title";
import LoginModal from "./LoginModal";
axios.defaults.withCredentials = true;
const headerBox = {
  display: "flex",
  justifyContent: "center",
  margin: "2rem",
  alignItems: "center",
  borderBottom: "2px solid",
};
const innerBox = {
  display: "flex",
  justifyContent: "center",
  margin: "2rem",
  alignItems: "center",
};
const iconSize = {
  fontSize: "3rem",
};

const LoginModalBoxStyle = {
  margin: "2rem",
  marginRight:"24rem",
  display: "flex",
  flexDirection: "row-reverse",
};
const itemStyle1 = {
  flexBasis: "30rem",
};


const boxStyle = {};
const Headers = () => {
  return (
    <div>
      <div style={LoginModalBoxStyle}>
        <LoginModal ></LoginModal>
      </div>
      <div style={headerBox}>
        <div style={innerBox}>
          <Title></Title>
        </div>
        <div style={innerBox && itemStyle1}>
          <Search></Search>
        </div>

        <div style={innerBox}>
          <PayCircleFilled style={iconSize} />
        </div>
        <Link to="/myStore">
          <div style={innerBox}>
            <TeamOutlined style={iconSize} />
          </div>
        </Link>
        <div style={innerBox}>
          <WechatOutlined style={iconSize} />
        </div>
      </div>
    </div>
  );
};
export default Headers;
