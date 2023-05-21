import { Outlet, Navigate, useLocation, useParams } from "react-router-dom";
import req from "../../axios/req";
import { API } from "../../config";
import { useEffect, useState } from "react";
const StreamSubRoute = () => {
  let [live, setLive] = useState(true);
  const location = useLocation();
  let productId = location.pathname.split("sub/")[1];
  console.log(productId);
  useEffect(() => {
    req.get(API.ISLIVE + `/${productId}`).then((res) => {
      console.log("[productiD]:", res.data.result.liveBroadcasting, productId);

      setLive(res.data.result.liveBroadcasting);
    });
  }, []);

  return live ? <Outlet /> : <Navigate to="/"></Navigate>;
};
export default StreamSubRoute;
