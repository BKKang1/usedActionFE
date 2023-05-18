import { Descriptions, Badge, Card, Space } from "antd";
import { NavLink } from "react-router-dom";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import { API } from "../../config";
import axios from "axios";

const boxStyle = {
  display: "flex",
  flexDirection: "column",
  borderRadius: "30px",
  margin: "2px 3px",
  border: "1px ridge black",
  textAlign: "center",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: "340px",
  height: "390px",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
};
const imgStyle = {
  borderRadius: "30px",
  paddingTop: "1rem",
  width: "300px",
  height: "180px",
  position: "relative",
};
const textStyle = {
  width: "320px",
  display: "-webkit-box",
  WebkitLineClamp: "2",
  WebkitBoxOrient: "vertical",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
const categoryStyle = {
  maxWidth: "70px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
const priceStyle = {
  maxWidth: "80px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
const dateStyle = {
  fontSize: "1rem",
  fontWeight: "1",
};
const bodyStyle = {
  fontSize: "1.3rem",
};
const LinkStyle = {
  color: "black",
  textDecoration: "none",
  position: "relative",
};
const redDot = {
  position: "absolute",
  width: "16px",
  height: "16px",
  background: "red",
  borderRadius: "50%",
  top: "-70%",
  left: "5%",
  lineHeight: "20px",
  verticalAlign: "middle",
  textAlign: "center",
  color: "white",
};

const productDetail = `${origin}/usedAuctionFE/productList/productDetail/`;
const GridItem = ({
  sigImgSrc,
  productId,
  productName,
  nowPrice,
  nickname,
  categoryName,
  auctionEndDate,
  status,
}) => {
  const [live, setLive] = useState(false);
  useEffect(() => {
    axios.get(API.ISLIVE + `/${productId}`).then((res) => {
      console.log("[productiD]:", res.data.result.liveBroadcasting, productId);
      if (res.data.result.liveBroadcasting) {
        setLive(true);
      } else setLive(false);
    });
  });
  return (
    <div style={boxStyle}>
      <Space direction="vertical">
        <NavLink to={productDetail + productId} style={LinkStyle}>
          <img style={imgStyle} src={sigImgSrc} alt="이미지"></img>
          <div style={live ? redDot : null}></div>
          <div style={textStyle}>
            <Descriptions
              title={productName}
              column={2}
              contentStyle={bodyStyle}
              labelStyle={bodyStyle}
            >
              <Descriptions.Item label="상태">{status}</Descriptions.Item>

              <Descriptions.Item label="현재가">
                <span style={priceStyle}>{nowPrice}</span>
              </Descriptions.Item>
              <Descriptions.Item label="판매자">{nickname}</Descriptions.Item>

              <Descriptions.Item label="카테고리">
                <span style={categoryStyle}>{categoryName}</span>
              </Descriptions.Item>
              <Descriptions.Item label="경매마감일">
                <span>{auctionEndDate}</span>
              </Descriptions.Item>
            </Descriptions>
          </div>
        </NavLink>
      </Space>
    </div>
  );
};
export default GridItem;
