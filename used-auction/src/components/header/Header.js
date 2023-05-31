import Search from "./others/SearchProductName";
import axios from "axios";
import { Button, Modal, Badge, Segmented } from "antd";
import { Link } from "react-router-dom";
import DropdownMenu from "./others/DropdownMenu";
import { useRef, useState, useEffect, useContext } from "react";
import {
  WechatOutlined,
  TeamOutlined,
  PayCircleFilled,
  BellOutlined
} from "@ant-design/icons";
import { API } from "../../config";
import { useRecoilState } from "recoil";
import { loginId } from "../../recoil/loginId";
import { accessToken, loginState } from "../../recoil/accessToken";
import Title from "./others/Title";
import LoginModal from "./login/LoginModal";
import TransactionConfirmed from "./others/TransactionConfirmed";
import { NavLink, useLocation } from "react-router-dom";
import { ClientContext } from "../chattingRoom/Soket";
import req from "../../axios/req";
import { PriceOfSSE } from "../productView/ContextOfPrice";
import { EventSourcePolyfill } from "event-source-polyfill";

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
  textDecoration: "none",
  color: "black",
};
const iconSize = {
  fontSize: "3rem",
};
const bellIconSize = {
  fontSize: "2rem",
  marginRight: "20px"
};
const badgeSize = {
  marginRight: "20px"
};
const DropdownMenuStyle = {
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
  let sseNotification = useRef(undefined);
  const [id, setId] = useRecoilState(loginId);
  const [token, setToken] = useRecoilState(accessToken);
  const { client, setClient } = useContext(ClientContext);
  const { sse, setSse } = useContext(ClientContext);
  //const [isLogIn, setIsLogIn] = useState(false);
  const { ssePrice, setSSEPrice } = useContext(PriceOfSSE);
  const [selected, setSelected] = useState("전체");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [count, setCount] = useState(0);
  const EventSource = EventSourcePolyfill;
   
  useEffect(() => {
    if (
      !location.pathname.includes("productList") &&
      location.pathname.includes
    ) {
      categoryId.current = "0";
      setSelected("전체");
    }
  }, [location]);

  useEffect(() => {
    console.log("location", location.pathname.includes("productDetail/"));
    if (!location.pathname.includes("chattingRoom")) {
      console.log("채팅페이지 아닌거 확인");

      if (sse.current != undefined) {
        sse.current.close();
        //console.log("sss 끊어짐.");
      }

      if (client.current != undefined && client.current.connected == true) {
        console.log(client.current.connected);
        client.current.disconnect();
      }
    }
    if (
      !location.pathname.includes("productDetail") ||
      !location.pathname.includes("sub")
    ) {
      if (ssePrice.current != undefined) {
        ssePrice.current.close();

        console.log("상품상세페이지 아님");
      }

      return;
    }
  }, [location]);

  useEffect(() => {
    console.log("토큰 값 변동");
    if(token!=null && sseNotification.current == undefined){
      sseNotification.current = new EventSource(API.SSENOTIFICATION, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
        heartbeatTimeout: 1000000,
      });
      sseNotification.current.addEventListener("CONNECT", (e) => {
        console.log("알람 sse 연결 성공");
        const { data: receivedConnectData } = e;
        const data = JSON.parse(receivedConnectData);
        console.log(data.result);
        setCount(count => count=data.result);
      });
      sseNotification.current.addEventListener("SEND_NOTIFICATION_DATA", (e) => {
        const { data: receivedConnectData } = e;
        const data = JSON.parse(receivedConnectData);
        console.log(data.result);
        setCount(count=>count+data.result);
      });
      sseNotification.current.onerror = (e) => {
        console.log(e);
      };
    }
    else{
      console.log("로그아웃해서 토근값 지워짐.");
      if (token == null && sseNotification.current != undefined) {
        sseNotification.current.close();
        console.log("알림창 sse 연결 해제.");
        sseNotification.current = undefined;
        setCount(0);
      }
    }
  },[token]); 

  // useEffect(() => {
  //   req.get(API.ISLOGIN).then((response) => {
  //     console.log(response);
  //     if (response.data.result.status === true) {
  //       setIsLogIn(true);
  //     } else {
  //       setIsLogIn(false);
  //     }
  //   });
  // },[location]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={outerBox}>
      <div style={LoginModalBoxStyle}>
        <LoginModal></LoginModal>
        {token!=null?
          <div>
            <Badge style={badgeSize} count={count}>
              <BellOutlined style={bellIconSize} onClick={openModal}/>
            </Badge>
            <Modal
              title="거래확정"
              open={isModalOpen}
              onCancel={handleCancel}
              footer={false}
              destroyOnClose="true"
            >
            <TransactionConfirmed count={count}/>
            </Modal>  
          </div>
          :""
        }
      </div>

      <div style={headerBox}>
        <NavLink to="/" style={textDecoration}>
          <div style={innerBox}>
            <Title></Title>
          </div>
        </NavLink>

        <div style={innerBox && itemStyle1}>
          <Search categoryId={categoryId}></Search>
        </div>
        <Link to={"/sellProduct"} style={textDecoration}>
          <div style={innerBox}>
            <PayCircleFilled style={iconSize} />
            <b>판매하기</b>
          </div>
        </Link>
        <Link to={`/myStore/${id}`} style={textDecoration}>
          <div style={innerBox}>
            <TeamOutlined style={iconSize} />
            <b>내 상점</b>
          </div>
        </Link>
        <Link to={"/chattingRoom"} style={textDecoration}>
          <div style={innerBox}>
            <WechatOutlined style={iconSize} />
            <b>채팅</b>
          </div>
        </Link>
      </div>
      <div style={DropdownMenuStyle}>
        <DropdownMenu
          categoryId={categoryId}
          setSelected={setSelected}
          selected={selected}
        ></DropdownMenu>
      </div>
    </div>
  );
};
export default Headers;
