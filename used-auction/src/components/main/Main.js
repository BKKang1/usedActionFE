
import { useEffect, useState } from "react";
import { API } from "../../config";
import GridItem from "./GridItem";
import { Divider } from "antd";
import req from "../../axios/req";

const Main = () => {
 
  const style={
    

    width: "1080px",
    display: "grid",
    margin:"2rem",
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
    req
      .get(
        API.SEARCH +
          `?categoryId=0&productName=&orderBy=VIEW_ORDER&page=0&size=8`
      )
      .then((response) => {
        setMainContent(response.data.content);
        console.log("리스트 이미지 결과", response.data.content);
      })
     
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
              nowPrice={value.nowPrice!==null?value.nowPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):null}
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
