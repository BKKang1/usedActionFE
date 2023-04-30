import { Button, Form, Input, Modal } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../config";
import { useRecoilState } from "recoil";
import { loginState } from "../../../recoil/accessToken";
import UpdateUserInfoForm from "./UpdateUserInfoForm";
axios.defaults.withCredentials = true;

const userText = {
  display: "flex",
  // paddingTop: "15%",
  // paddingBottom: "15%",
  // marginLeft: "40px",
  fontSize: "30px",
  //fontWeight: "700",
  borderBottom: "2px solid",
};

const btnStyle = {
  marginLeft: "65%",
  marginTop: "5%",
  backgroundColor: "green",
};

const modalStyle = {
  fontSize: "50px",
};

const USerInfoForm = ({ onCancel }) => {
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    birth: "",
    createdDate: "",
    email: "",
    loginId: "",
    name: "",
    phoneNumber: "",
  });


    useEffect(() => {
        axios
          .get(API.USERINFO)
          .then((response) => {
            console.log(response.data.result);
            setUserInfo(response.data.result);
          })
          .catch((error) => {
            console.log(error.response.data);
          });
    }, []);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <span className="user-text1" style={userText}>
        이름 : {userInfo.name}
      </span>
      <span className="user-text2" style={userText}>
        ID : {userInfo.loginId}
      </span>
      <span className="user-text3" style={userText}>
        E-Mail : {userInfo.email}
      </span>
      <span className="user-text4" style={userText}>
        전화번호 : {userInfo.phoneNumber}
      </span>
      <span className="user-text5" style={userText}>
        생년월일 : {userInfo.birth}
      </span>
      <span className="user-text6" style={userText}>
        회원가입일 : {userInfo.createdDate}
      </span>
      <Button
        className="button1"
        type="primary"
        style={btnStyle}
        onClick={() => {
          showModal();
        }}
      >
        회원 정보 수정
      </Button>
      <Modal
        title={<div style={modalStyle}>회원 정보 수정</div>}
        open={open}
        onCancel={handleCancel}
        footer={false}
        destroyOnClose="true"
      >
        <UpdateUserInfoForm
          onCancel={handleCancel}
          onCancelTotal={onCancel}
          userInfo={userInfo}
        ></UpdateUserInfoForm>
      </Modal>
    </div>
  );
};
export default USerInfoForm;
