import Button from "@mui/material/Button";
import axios from "axios";
import { API } from "../config";
axios.defaults.withCredentials = true;
const doCheckCookie = () => {
  axios
    .get(API.COOKIECHECK, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log("쿠키 결과", response);
    });
};
const Cookie = () => {
  return (
    <div>
      <Button variant="contained" onClick={doCheckCookie}>
        쿠키 체크
      </Button>
    </div>
  );
};
export default Cookie;
