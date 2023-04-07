import { Button, Modal } from "antd";
import { useState, useEffect } from "react";
import Login from "./LoginForm";
import { API } from "../../../config";
import axios from "axios";
import { useRecoilState } from "recoil";
import {loginState} from "../../../recoil/loginState";
const LoginModal = () => {
  const [token, setToken] = useRecoilState(loginState);
  const [name, setName] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    axios
      .get(API.ISLOGIN)
      .then((response) => {
        if (response.data.result.status === true) {
          setName(response.data.result.name);
        }
      })
      .catch(() => {
        setName(null);
        setToken(null)
      });
  }, []);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const logout = () => {
    console.log("qw",token)
    console.log("qwer",API.Headers)
    axios
      .get(API.LOGOUT)
      .then((response) => {
        console.log(response.data.result);
        if (response.data.result) {
         setName(null);
         setToken(null)
        }
      });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const LoginModalStyle = {
    backgroundColor: "black",
  };

  return (
    <>
      <Button
        type="primary"
        style={LoginModalStyle}
        onClick={name === null ? showModal : logout}
      >
        {name === null ? "로그인/회원가입" : `${name}님 로그아웃`}
      </Button>
      <Modal
        title="로그인"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
        destroyOnClose="true"
      >
        <Login onCancel={handleCancel} setName={setName} ></Login>
      </Modal>
    </>
  );
};
export default LoginModal;
