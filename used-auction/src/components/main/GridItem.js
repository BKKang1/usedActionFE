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
    // <div style={boxStyle}>

    //     <NavLink to={productDetail + productId} style={LinkStyle}>
    //       <img style={imgStyle} src={sigImgSrc} alt="이미지" />

    //       <span style={textStyle}>
    //         <h1 style={textStyle}>{productName}</h1>({status}) 현재 입찰가{" "}
    //         <b>{nowPrice}</b> 원
    //       </span>
    //       <div style={dateStyle}>
    //         {auctionEndDate} 까지
    //         <br></br>
    //         {nickname} / {categoryName}
    //       </div>
    //     </NavLink>

    // </div>
    <div style={boxStyle}>
      <Space direction="vertical" size={16}>
        <Card
          bordered={true}
         
        >
          <NavLink to={productDetail + productId} style={LinkStyle}>
            <img style={imgStyle} src={sigImgSrc} alt="이미지" />
            <div style={textStyle}>
              <Descriptions title={productName} column={2}>
                <Descriptions.Item label="상태">
                  <Badge
                    color="green"
                    count={status}
                    overflowCount={9999999999}
                  ></Badge>
                </Descriptions.Item>

                <Descriptions.Item label="현재가">
                  <Badge count={nowPrice} overflowCount={9999999999}></Badge>
                </Descriptions.Item>
                <Descriptions.Item label="판매자">
                  <Badge
                    color="green"
                    count={nickname}
                    overflowCount={9999999999}
                  ></Badge>
                </Descriptions.Item>
                <Descriptions.Item label="카테고리">
                  <Badge
                    color="green"
                    count={categoryName}
                    overflowCount={9999999999}
                  ></Badge>
                </Descriptions.Item>
                <Descriptions.Item label="경매마감일">
                  <Badge
                    color="green"
                    count={auctionEndDate}
                    overflowCount={9999999999}
                  ></Badge>
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
