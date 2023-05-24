import { useEffect, useState, useRef, lazy } from "react";
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
  const style = {
    width: "1480px",
    display: "grid",
    margin: "0.5rem",
    gridTemplateRows: "2fr ",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
  };
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
  const [totalPage, setTotalPage] = useState(null);
  const [selectedOrderBy, setSelectedOrderBy] = useState(0);
  const [orderBy, setOrderBy] = useState("VIEW_ORDER");
  const [page, setPage] = useState(1);
  let size = "8";
  console.log("test",location.pathname)
  let productName = location.pathname.split("/")[3];
  let categoryId = location.pathname.split("/")[2];
  const onChange = (value) => {
    setPage(value);
  };
  const [cur, setCur] = useState(1);
  useEffect(() => {
    console.log("productName", productName);
    console.log("categoryId", categoryId);
    console.log("page", page);
    setOrderBy("VIEW_ORDER");
    setPage(1);
    req
      .get(
        API.SEARCH +
          `?categoryId=${categoryId}&productName=${productName}&orderBy=VIEW_ORDER&page=${0}&size=${size}`
      )
      .then((response) => {
        console.log("pages", response.data.totalPages);
        setMainContent(response.data.content);
        setTotalPage(response.data.totalPages * 8);
      });
  }, [productName, categoryId]);
  useEffect(() => {
    console.log("productName", productName);
    console.log("categoryId", categoryId);
    console.log("page", page);
    setOrderBy("VIEW_ORDER");
    req
      .get(
        API.SEARCH +
          `?categoryId=${categoryId}&productName=${productName}&orderBy=VIEW_ORDER&page=${
            (page - 1) | 0
          }&size=${size}`
      )
      .then((response) => {
        console.log("pages", response.data.totalPages);
        setMainContent(response.data.content);
        setTotalPage(response.data.totalPages * 8);
      });
  }, [page]);
  const onSelect = (val) => {
    console.log(val);
    setOrderBy(val);
    setPage(1);

    req
      .get(
        API.SEARCH +
          `?categoryId=${categoryId}&productName=${productName}&orderBy=${val}&page=${0}&size=${size}`
      )
      .then((response) => {
        console.log("pages", response.data.totalPages);
        setMainContent(response.data.content);
        setTotalPage(response.data.totalPages * 8);
      });
  };

  return (
    <div>
      <div style={sortStyle}>
        <SelectSort
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          onChange={onChange}
          setPage={setPage}
          onSelect={onSelect}
        />
      </div>
      <div style={style}>
        {MainContent.map((value, i) => {
          return (
            <GridItem
              key={i}
              sigImgSrc={value.sigImgSrc}
              productId={value.productId}
              productName={value.productName}
              nowPrice={
                value.nowPrice !== null
                  ? value.nowPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : null
              }
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
          current={page}
        ></Pagination>
      </div>
    </div>
  );
};
export default ProductList;
