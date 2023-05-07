
import { useEffect, useState, useRef } from "react";
import { API } from "../../config";
import GridItem from "../main/GridItem";
import { Row } from "antd";
import { useLocation } from "react-router-dom";
import { Pagination } from "antd";
import SelectSort from "./SelectSort";
import req from "../../axios/req";
const ProductList = () => {
  const location = useLocation();

  const boxStyle = {
    display: "flex",
    justifyContent: "center",
    margin: "4rem 15%",
    alignItems: "center",
  };
  const style ={
    padding: "5px",
    width: "1200px",
    display: "grid",
    gridTemplateRows: "2fr ",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
  }
  const sortStyle = {

    margin: "2rem auto",
  };
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
  const [totalPage,setTotalPage] =useState(null);

  const [orderBy,setOrderBy] = useState("VIEW_ORDER")
  const [page, setPage] = useState(0);
  let size = "8";
  let productName = location.state.productName;
  let categoryId = location.state.categoryId.current;
  const onChange = (value) => {
    console.log(value);
    setPage(value - 1);
  };
  useEffect(() => {
    console.log("productName", productName);
    console.log("categoryId", categoryId);
    console.log("page", page);
    req
      .get(
        API.SEARCH +
          `?categoryId=${categoryId}&productName=${productName}&orderBy=${orderBy}&page=${
            page | 0
          }&size=${size}`
      )
      .then((response) => {
        console.log("pages",response.data.totalPages);
        setMainContent(response.data.content);
        setTotalPage(response.data.totalPages*8)
      })
  }, [productName, categoryId, page,orderBy]);

  return (
    <div>
      <div style={sortStyle}>
        <SelectSort orderBy={orderBy} setOrderBy={setOrderBy}/>
      </div>
      <div style={style}>
        {MainContent.map((value, i) => {
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
        })}
      </div>
      <div style={boxStyle}>
        <Pagination
          onChange={onChange}
          total={totalPage}
          pageSize={8}
        ></Pagination>
      </div>
    </div>
  );
};
export default ProductList;
