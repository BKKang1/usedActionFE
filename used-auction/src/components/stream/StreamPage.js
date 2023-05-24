import BidModal from "../productView/bid/BidModal";
import OnlineMettingOfSub from "./OnlineMettingOfSub";
import { useContext, useState, useEffect } from "react";
import { PriceOfSSE } from "../productView/ContextOfPrice";
import axios from "axios";
import { API } from "../../config";

const boxStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: "4rem 15%",
  alignItems: "center",
};

const StreamPage = () => {
  const [nowPrice, setNowPrice] = useState(null);
  const { ssePrice, setSSEPrice } = useContext(PriceOfSSE);
  const productId = window.location.href.split("/")[6];
  console.log(productId);
  const [bid, setBid] = useState({
    auctionId: null,
    auctionEndDate: null,
    priceUnit: null,
  });

  useEffect(() => {
    if (productId !== null) {
      axios.get(API.AUCTION + `/${productId}`).then((res) => {
        console.log("test",res);
        setBid(res.data.result);
      });
      //axios productid로 요청 날려서 setbid하고, 현재가는 sse로 받기
    }
  }, [productId]);
  useEffect(() => {
    if (bid.auctionId !== null) {
      sseConnect(bid.auctionId);
    }
  }, [bid]);
  const sseConnect = (auctionId) => {
    console.log("au", auctionId);

    setSSEPrice(auctionId);
    ssePrice.current.addEventListener("CONNECT", (e) => {
      const { data: receivedConnectData } = e;
      const c = JSON.parse(receivedConnectData);
      console.log("c", c);
      console.log("connect event id: ", c.sseId); // "sse-id"
      console.log("connect event result: ", c.result); // "연결성공!"
    });
    ssePrice.current.addEventListener("SEND_BID_DATA", (e) => {
      const { data: receivedConnectData } = e;
      const r = JSON.parse(receivedConnectData);
      setNowPrice(r.result);
      console.log("send data sseId: ", r.sseId); // "sse-id"
      console.log("send data result: ", r.result); // "10000" -> 입찰 가격
    });
  };

  return (
    <div style={boxStyle}>
      <OnlineMettingOfSub />
      <BidModal
        priceUnit={bid.priceUnit}
        auctionEndDate={bid.auctionEndDate}
        nowPrice={nowPrice}
        auctionId={bid.auctionId}
      ></BidModal>
    </div>
  );
};
export default StreamPage;
