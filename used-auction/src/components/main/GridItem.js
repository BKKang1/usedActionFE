import { Descriptions, Badge, Card, Space } from "antd";
import { NavLink } from "react-router-dom";
import { Typography } from "antd";

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
  width: "270px",
  height: "390px",
  justifyContent: "center",
  alignItems: "center",
};
const imgStyle = {
  borderRadius: "30px",
  width: "230px",
  height: "180px",
};
const textStyle = {
  width: "260px",
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
  maxWidth: "120px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
const dateStyle = {
  fontSize: "1rem",
  fontWeight: "1",
};

const LinkStyle = {
  color: "black",
  textDecoration: "none",
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
  return (
    <div style={boxStyle}>
      <Space direction="vertical" size={16}>
        <Card bordered={true}>
          <NavLink to={productDetail + productId} style={LinkStyle}>
            <img style={imgStyle} src={sigImgSrc} alt="이미지" />
            <div style={textStyle}>
              <Descriptions title={productName} column={2}>
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
        </Card>
      </Space>
    </div>
  );
};
export default GridItem;
