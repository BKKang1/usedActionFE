import { Col } from "antd";
import { NavLink } from "react-router-dom";
import { Typography } from "antd";

const boxStyle = {
  display: "flex",
  flexDirection: "column",
  padding: "8px 0",
  border: "3px solid black",
  textAlign: "center",
  height: "auto",
};
const imgStyle = {
  maxWidth: "100%",

  width: "12rem",
  height: "auto",
};
const textStyle = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "2",
  WebkitBoxOrient: "vertical",
};

const GridItem = ({ imgSigSrc, productId, productName, price }) => {
  return (
    <Col className="gutter-row" span={8}>
      <div className="main-flex-item" style={boxStyle}>
        <NavLink to={productId} alt="profile">
          <img style={imgStyle} src={imgSigSrc} alt="DOOLE" />
        </NavLink>
        <span style={textStyle}>
          <b>{productName}</b>
        </span>

        <p>
          현재 입찰가 <b>{price}</b> 원
          <br />
          즉시 구매가 <b>{price}</b> 원
        </p>
      </div>
    </Col>
  );
};
export default GridItem;
