import { Outlet, Navigate, useLocation, useParams } from "react-router-dom";
import req from "../../axios/req";
import { API } from "../../config";
import { useEffect, useState } from "react";
import axios from "axios";
const StreamPubRoute = () => {
  const navigate = useLocation;
  let [isSeller, setIsSeller] = useState(true);
  const location = useLocation();
  let productId = location.pathname.split("stream/")[1];
  console.log(productId);
  useEffect(() => {
    axios
      .get(API.ISSELLER + `/${productId}`)
      .then((res) => {
        setIsSeller(res.data.result.valid);
      })
      .catch((error) => {
        setIsSeller(false);
      });
  }, []);

  return isSeller ? <Outlet /> : <Navigate to="/"></Navigate>;
};
export default StreamPubRoute;
