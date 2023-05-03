import axios from "axios";
import { useRecoilState } from "recoil";
import { accessToken } from "../recoil/accessToken";

const req = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
req.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.data.code === "WRONG_TYPE_TOKEN") {
      alert("로그인 권한이 없습니다.");
    } else alert(error.response.data.msg);
  }
);

export default req;
