import axios from "axios";
import { API } from "../../config";
import { Button, Layout, Menu, Modal, Input } from "antd";
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
import { accessToken } from "../../recoil/accessToken";
import { refreshToken } from "../../recoil/refreshToken";
import { loginId, nicknameKey } from "../../recoil/loginId";
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
  fontSize: "40px",
  //fontWeight: "700",
};

const passwordText = {
  display: "flex",
  paddingTop: "15%",
  paddingBottom: "15%",
  fontSize: "25px",
  //fontWeight: "700",
};

const TransactionText = {
  display: "flex",
  marginBottom: "10px",
  marginLeft: "40px",
  fontSize: "25px",
  //fontWeight: "700",
};

const buttonBox = {
  position: "relative",
  marginLeft: "40px",
  marginBottom: "20px",
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
  backgroundColor: "orange",
};

const modalStyle = {
  fontSize: "50px",
};

const MyStore = () => {
  const [name, setName] = useRecoilState(nicknameKey);
  const [token, setToken] = useRecoilState(accessToken);
  const [refToken, setRefToken] = useRecoilState(refreshToken);
  const [id, setId] = useRecoilState(loginId);
  const [userScore, setUserScore] = useState({});
  const [userPassword, setUserPassword] = useState("");
  const [choiceNum, setChoiceNum] = useState(1);
  const [isHovering1, setIsHovering1] = useState(false);
  const [isHovering2, setIsHovering2] = useState(false);
  const [isHovering3, setIsHovering3] = useState(false);
  const [isHovering4, setIsHovering4] = useState(false);

  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if(token != null){
      axios
        .get(API.TRANSACTIONCOUNT)
        .then((response) => {
          console.log(response.data);
          setUserScore(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.msg);
        });
    }
  },[token]); 

  const showModal1 = () => {
    setIsModalOpen1(true);
  };

  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };

  const showModal2 = () => {
    setIsModalOpen2(true);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  const onChange = (e) => {
    const { value } = e.target;
    setUserPassword(value);
  };

  const deleteUser = () => {
    console.log(userPassword);
    axios
      .delete(API.MEMBER+`?password=${userPassword}`)
      .then((response) => {
        console.log(response.data);
        setToken(null);
        setRefToken(null);
        setName(null);
        setId(null);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data.msg);
        alert(error.response.data.msg);
      });
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
            {name}
          </span>
          <div className="button-box" style={buttonBox}>
            <Button
              className="button1"
              type="primary"
              style={btnStyle}
              onClick={showModal1}
            >
              회원 정보 조회
            </Button>
            <Modal
              title={<div style={modalStyle}>회원 정보 조회</div>}
              open={isModalOpen1}
              onCancel={handleCancel1}
              footer={false}
              destroyOnClose="true"
            >
              <UserInfoForm onCancel={handleCancel1}></UserInfoForm>
            </Modal>
          </div>
          <div className="button-box" style={buttonBox}>
            <Button
              className="button2"
              type="primary"
              style={btnStyle}
              onClick={showModal2}
            >
              회원 탈퇴
            </Button>
            <Modal
              title={<div style={modalStyle}>회원 탈퇴</div>}
              open={isModalOpen2}
              onCancel={handleCancel2}
              footer={false}
              destroyOnClose="true"
            >
              <div>
                <span className="user-text" style={passwordText}>
                  Password: <Input.Password name="password" onChange={onChange}/> 
                </span>
                <Button
                  className="button3"
                  type="primary"
                  style={btnStyle}
                  onClick={deleteUser}
                >
                  회원 탈퇴
                </Button>
              </div>
            </Modal>
          </div>
          <span className="transaction-text1" style={TransactionText}>
            총 판매 횟수 : {userScore.allCount}
          </span>
          <span className="transaction-text2" style={TransactionText}>
            판매 성공 횟수 : {userScore.successCount}
          </span>
          <span className="transaction-text3" style={TransactionText}>
            거래 실패 횟수 : {userScore.rejectCount}
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
