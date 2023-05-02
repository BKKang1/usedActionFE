import { Button, Modal } from "antd";
import { useState, useEffect } from "react";
import Login from "./LoginForm";
import { API } from "../../../config";
import axios from "axios";
import { useRecoilState } from "recoil";
import { accessToken } from "../../../recoil/accessToken";
import { refreshToken } from "../../../recoil/refreshToken";
import { loginId, nicknameKey } from "../../../recoil/loginId";
import { useQuery } from "react-query";
const LoginModal = () => {
  const [token, setToken] = useRecoilState(accessToken);
  const [refToken, setRefToken] = useRecoilState(refreshToken);
  const [id, setId] = useRecoilState(loginId);
  const [name, setName] = useRecoilState(nicknameKey);

  const tokenRefresh = () =>
    axios
      .get(API.ISLOGIN)
      .then((response) => {
        console.log("로그인상태체크");
        if (response.data.result.status === true) {
          console.log("로그인체크");
          setName(response.data.result.name);
          setId(response.data.result.loginId);
        } else if (token !== null) {
          console.log("token", token);
          axios
            .post(API.REISSUE, {
              accessToken: token,
              refreshToken: refToken,
            })
            .then((res) => {
              setToken(res.data.result.accessToken);
              setRefToken(res.data.result.refreshToken);
            })
            .catch(() => {
              setToken(null);
              setRefToken(null);
              setName(null);
              setId(null);
            });
        }
      })
      .catch(() => {
        setToken(null);
        setRefToken(null);
        setName(null);
        setId(null);
      });

  useQuery(["refresh_token"], tokenRefresh, {
    refetchInterval: 60 * 25 * 1000, //25분마다 refresh하여 access토큰 재발급
    refetchIntervalInBackground: true,
   
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    tokenRefresh();
    console.log("로그인상태체크inuseeffect");
  }, [token]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const logout = () => {
    console.log("before token", token);

    axios
      .post(API.LOGOUT, token)
      .then((response) => {
        console.log("tok", response.data.result);

        setToken(null);
        setRefToken(null);
        setName(null);
        setId(null);
      })
      .catch(() => {
        setToken(null);
        setRefToken(null);
        setName(null);
        setId(null);
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
        <Login onCancel={handleCancel} setName={setName}></Login>
      </Modal>
    </>
  );
};
export default LoginModal;
