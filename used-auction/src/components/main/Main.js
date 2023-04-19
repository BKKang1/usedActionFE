import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../../config";
import GridItem from "./GridItem";
import { Divider } from "antd";

axios.defaults.withCredentials = true;

const Main = () => {
 
  const style={
    
    padding: "5px",
    width: "1200px",
    display: "grid",
    gridTemplateRows: "2fr ",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    
  }
  
  const [MainContent, setMainContent] = useState([
    {
      nickname: null,
      categoryName: null,
      productName: null,
      productId: null,
      nowPrice: null,
      auctionEndDate: null,
      sigImgSrc: null,
      status: null,
    },
  ]);
  useEffect(() => {
    axios
      .get(
        API.SEARCH +
          `?categoryId=0&productName=&orderBy=VIEW_ORDER&page=0&size=8`
      )
      .then((response) => {
        setMainContent(response.data.content);
        console.log("리스트 이미지 결과", response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  
  return (
    <div style={style}  >
      {MainContent.map((value, i) => {
        {
     
          return (
            <GridItem
              key={i}
              sigImgSrc={value.sigImgSrc}
              productId={value.productId}
              productName={value.productName}
              nowPrice={value.nowPrice}
              nickname={value.nickname}
              categoryName={value.categoryName}
              auctionEndDate={value.auctionEndDate}
              status={value.status}
            ></GridItem>
          );
        }
      })}
    </div>
  );
};
export default Main;
