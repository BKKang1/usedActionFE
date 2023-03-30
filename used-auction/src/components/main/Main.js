import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../../config";
import GridItem from "./GridItem";
import { Row } from "antd";

axios.defaults.withCredentials = true;

const Main = () => {
  const boxStyle = {
    display: "flex",
    justifyContent: "center",
    margin: "4rem 15%",
    alignItems: "center",
    minWidth:"800px"
  };
  const [MainContent, setMainContent] = useState([
    {
      imgSigSrc: null,
      productId: null,
      productName: null,
      price: null,
    },
  ]);
  useEffect(() => {
    axios
      .get(API.MAIN, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setMainContent(response.data.result);
        console.log("리스트 이미지 결과", response.data.result);
      });
  }, []);
  return (
    <div style={boxStyle}>
      <Row gutter={[20, 100]}>
        {MainContent.map((value, i) => {
          return (
            <GridItem
              key={i}
              imgSigSrc={value.imgSigSrc}
              productId={value.productId}
              productName={value.productName}
              price={value.price}
            ></GridItem>
          );
        })}
      </Row>
    </div>
  );
};
export default Main;
