import axios from "axios";
import { API } from "../../config";
import { Button, List, Layout, Menu } from "antd";
import React, { location, useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes, NavLink, useNavigate,} from "react-router-dom";
import MyStore from "./MyStore";
axios.defaults.withCredentials = true;

const style0 = {
    marginTop: "10%",
    //marginLeft: "20%",
    //marginRight: "20%",
    //borderTop: "2px solid",
};
  
const style1 = {
    paddingTop: "5%",
    paddingBottom: "5%",
    fontSize: "25px",
    fontWeight: "700",
    color: "black",
};
  
const style2 = {
    fontSize: "25px",
      ontWeight: "500",
};
  
const style3 = {
    fontSize: "20px",
    fontWeight: "500",
};
  
const style4 = {
    display: "flex",
    marginTop: "5%",
};
  
const imgStyle = {
    width: "200px",
    height: "220px",
};

const ProductManagement = () => {
    const [data, setData] = useState([]);

    return (
        <div>
            <div className="list-box" style={style0}>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 10,
                    }}
                    dataSource={data}
                    renderItem={(item) => {
                        return (
                            <List.Item
                                key={item.productId}
                                extra={
                                    <img
                                        width={272}
                                        alt="logo"
                                        src={item.signatureImgSrc}
                                        style={imgStyle}
                                    />
                                }
                            >
                            <List.Item.Meta
                                title={<NavLink to={`../shop-list/shop-detail/${item.productId}`} style = {style2}>{item.productName}</NavLink>}
                                description={<span style = {style3}>{item.price}</span>}
                            />
                            {item.count + item.retailUnit}
                            <Button className="button1" type="button" style = {style4}>
                                삭제
                            </Button>
                            </List.Item>
                        )
                    }}
                />
            </div>
        </div>
    );
  };
  export default ProductManagement;
  