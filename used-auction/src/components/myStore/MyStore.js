import axios from "axios";
import { API } from "../../config";
import { Button, Layout, Menu, Modal } from "antd";
import { PageHeader } from "@ant-design/pro-layout";
import React, { location, useState, useEffect } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  NavLink,
  useNavigate,
} from "react-router-dom";
import ProductManagement from "./ProductManagement";
import { useRecoilState } from "recoil";
import { accessToken, loginState } from "../../recoil/accessToken";
import UserInfoForm from "./userInfo/UserInfoForm";
import pic from "../../img/회원.jpg";
axios.defaults.withCredentials = true;

const totalBox = {
  marginLeft: "15%",
  marginRight: "15%",
};
const title = {
  borderBottom: "2px solid",
  backgroundColor: "white",
};
const sitePageHeader = {
  display: "flex",
  marginRight: "88.5%",
  borderTop: "2px solid",
  borderRight: "2px solid",
  borderLeft: "2px solid",
};
const userInfoBox = {
  display: "flex",
  paddingTop: "30px",
  paddingBottom: "30px",
  borderBottom: "2px solid",
  borderRight: "2px solid",
  backgroundColor: "white",
};
const userInfo = {
  height: "120px",
  flexDirection: "column",
};
const userText = {
  display: "flex",
  paddingTop: "15%",
  paddingBottom: "15%",
  marginLeft: "40px",
  fontSize: "25px",
  fontWeight: "700",
};

const buttonBox = {
  position: "relative",
  marginLeft: "40px",
};

const userScoreText1 = {
  display: "flex",
  paddingTop: "7%",
  marginTop: "40px",
  marginLeft: "40px",
  fontSize: "40px",
  fontWeight: "700",
};

const userScoreText2 = {
  marginLeft: "20px",
  color: "red",
};

const menuBox = {
  display: "flex",
  backgroundColor: "white",
  paddingTop: "10%",
  borderBottom: "2px solid",
};

const menuTable = {
  display: "table",
  backgroundColor: "white",
  //paddingTop: "5%",
  //marginTop: "10%",
  marginRight: "30%",
  borderBottom: "2px solid",
  borderCollapse: "collapse",
  //marginBottom: "10%",
};

const menu = {
  display: "table-cell",
  fontSize: "20px",
  fontWeight: "300",
  paddingRight: "20px",
  paddingLeft: "20px",
  paddingBottom: "15px",
  paddingTop: "15px",
  border: "2px solid",

  //paddingRight:
};

const menuHover = {
  display: "table-cell",
  fontSize: "20px",
  color: "blue",
  fontWeight: "300",
  paddingRight: "20px",
  paddingLeft: "20px",
  paddingBottom: "15px",
  paddingTop: "15px",
  border: "2px solid",
};

const blank = {
  paddingBottom: "20%",
  backgroundColor:"white"
};

const imgStyle = {
  //marginLeft: "60px",
  width: "30%",
  //height: "120px",
};

const btnStyle = {
  backgroundColor: "black",
};

const modalStyle = {
  fontSize: "50px",
};

const MyStore = () => {

  const [token, setToken] = useRecoilState(accessToken);
  const [userName, setUserName] = useState("강댕강댕");
  const [userScore, setUserScore] = useState("88");
  const [choiceNum, setChoiceNum] = useState(1);
  const [isHovering1, setIsHovering1] = useState(false);
  const [isHovering2, setIsHovering2] = useState(false);
  const [isHovering3, setIsHovering3] = useState(false);
  const [isHovering4, setIsHovering4] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const ifNum = () => {
    return <ProductManagement props={choiceNum}></ProductManagement>;
  };

  return (
    <Layout className="total-box" style={totalBox}>
      <div className="title" style={title}>
        <PageHeader
          className="site-page-header"
          style={sitePageHeader}
          title="내 상점"
        />
      </div>

      <div className="user-info-box" style={userInfoBox}>
        <img style={imgStyle} src={pic} />
        <div className="user-info" style={userInfo}>
          <span className="user-text" style={userText}>
            {userName}
          </span>
          <div className="button-box" style={buttonBox}>
            <Button
              className="button1"
              type="primary"
              style={btnStyle}
              onClick={showModal}
            >
              회원 정보 조회
            </Button>
            <Modal
              title={<div style={modalStyle}>회원 정보 조회</div>}
              open={isModalOpen}
              onCancel={handleCancel}
              footer={false}
              destroyOnClose="true"
            >
              <UserInfoForm onCancel={handleCancel}></UserInfoForm>
            </Modal>
          </div>
          <span className="user-score" style={userScoreText1}>
            평가점수 :<span style={userScoreText2}>{userScore}</span>
          </span>
        </div>
      </div>

      <div className="menu-box" style={menuBox}>
        <section className="menu-table" style={menuTable}>
          <div
            className="menu1"
            style={isHovering1 || choiceNum == "1" ? menuHover : menu}
            onClick={() => {
              setChoiceNum(1);
            }}
            onMouseOver={() => {
              setIsHovering1(true);
            }}
            onMouseOut={() => {
              setIsHovering1(false);
            }}
          >
            상품관리
          </div>
          <div
            className="menu2"
            style={isHovering2 || choiceNum == "2" ? menuHover : menu}
            onClick={() => setChoiceNum(2)}
            onMouseOver={() => {
              setIsHovering2(true);
            }}
            onMouseOut={() => {
              setIsHovering2(false);
            }}
          >
            판매완료내역
          </div>
          <div
            className="menu3"
            style={isHovering3 || choiceNum == "3" ? menuHover : menu}
            onClick={() => setChoiceNum(3)}
            onMouseOver={() => {
              setIsHovering3(true);
            }}
            onMouseOut={() => {
              setIsHovering3(false);
            }}
          >
            구매완료내역
          </div>
          <div
            className="menu4"
            style={isHovering4 || choiceNum == "4" ? menuHover : menu}
            onClick={() => setChoiceNum(4)}
            onMouseOver={() => {
              setIsHovering4(true);
            }}
            onMouseOut={() => {
              setIsHovering4(false);
            }}
          >
            입찰/낙찰내역
          </div>
        </section>
      </div>
      <div>
        {ifNum(() => {})}
        <div style={blank} />
      </div>
    </Layout>
  );
};
export default MyStore;
