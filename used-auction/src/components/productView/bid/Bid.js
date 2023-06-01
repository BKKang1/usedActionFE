import { API } from "../../../config";
import { Descriptions, Form, Input, InputNumber, Button } from "antd";

import { useEffect, useState } from "react";
import moment from "moment";
import req from "../../../axios/req";
const Bid = ({ onCancel, priceUnit, auctionEndDate, nowPrice, auctionId }) => {
  const boxStyle = {
    border: "1px ridge black",
    padding: "2rem",
    borderRadius: "30px",
  };
  const inputBoxStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  };
  const inputItemStyle = {
    width: "15rem",
    margin: "0 1rem",
  };
  const [price, setPrice] = useState(nowPrice + priceUnit);
  const onChange = (value, info) => {
    console.log(value);
    console.log(info);
    if (info.type === "up") setPrice(price + info.offset * priceUnit);
    else setPrice(price - info.offset * priceUnit);
  };
  const onClick = () => {
    if (checkDate) {
      const object = new Object();
      object.bidPrice = price;
      const json = JSON.stringify(object);
      req
        .post(API.AUCTION + `/${auctionId}`, json)
        .then((res) => {
          alert(res.data.result.msg);
        })
    
    } else {
      console.log("경매 마감");
    }
  };
  const checkDate = () => {
    moment().isBefore(auctionEndDate);
  };
  useEffect(() => {
    setPrice(nowPrice + priceUnit);
  }, [nowPrice]);
  const [loadings, setLoadings] = useState();
  const enterLoading = () => {
    setLoadings(true);
    setTimeout(() => {
      setLoadings(false);
    }, 1000);
  };
  return (
    <div style={boxStyle}>
      <Descriptions column={1}>
        <Descriptions.Item label="경매마감일">
          {auctionEndDate}
        </Descriptions.Item>
        <Descriptions.Item label="입찰단위">{priceUnit}</Descriptions.Item>
        <Descriptions.Item label="현재가">{nowPrice}</Descriptions.Item>
      </Descriptions>
      <div>
        <span style={inputBoxStyle}>
          가격:
          <InputNumber
            keyboard={false}
            min={nowPrice + priceUnit}
            onStep={onChange}
            style={inputItemStyle}
            value={price}
          ></InputNumber>
          <Button
            type="primary"
            htmlType="button"
            onClick={() => {
              onClick();
              enterLoading();
            }}
            loading={loadings}
          >
            제출
          </Button>
        </span>
      </div>
    </div>
  );
};
export default Bid;
