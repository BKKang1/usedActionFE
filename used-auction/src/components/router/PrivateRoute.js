import { useRecoilState } from "recoil";
import { accessToken } from "../../recoil/accessToken";
import { Outlet, Navigate } from "react-router-dom";
const PrivateRoute = () => {
  const auth = useRecoilState(accessToken)[0];
  console.log("로그인이 필요한 기능입니다.",auth);
  if (auth === null) {
    alert("로그인이 필요한 기능입니다.",auth);
  }
  return (
    
      auth ? <Outlet /> :<Navigate to = "/usedAuctionFE"></Navigate>

  );
};
export default PrivateRoute;
