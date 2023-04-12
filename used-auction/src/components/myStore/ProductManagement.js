import axios from "axios";
import { API } from "../../config";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Typography, Button, List, Layout, Menu } from "antd";
import React, { location, useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes, NavLink, useNavigate,} from "react-router-dom";
import MyStore from "./MyStore";
import SockJS from "sockjs-client";
const Stomp = require('stompjs');
axios.defaults.withCredentials = true;

const basicStyle = {
    backgroundColor: "white",
};

const listBoxStyle = {
    marginTop: "2%",
    backgroundColor: "white",
    //marginLeft: "20%",
    //marginRight: "20%",
    //borderTop: "2px solid",
};
  
const titleStyle = {
    fontSize: "25px",
      ontWeight: "500",
};
  
const descriptionStyle = {
    fontSize: "20px",
    fontWeight: "500",
};
  
const buttonStyle = {
    display: "flex",
    marginTop: "5%",
};
  
const imgStyle = {
    width: "200px",
    height: "220px",
};

const menuStyle = {
    color: "black",
    marginTop: "2%",
    marginLeft: "2%",
    fontSize: "18px",
};

const listSpanStyle = {
    display: "flex",
};

const items1 = [
    {
      key: "0",
      label: "전체",
    },
    {
      key: "1",
      label: "경매중",
    },
    {
      key: "2",
      label: "낙찰성공",
    },
    {
      key: "3",
      label: "낙찰실패",
    },
    {
      key: "4",
      label: "거래성공",
    },
    {
      key: "5",
      label: "거래실패",
    },
];

const items3 = [
    {
      key: "0",
      label: "전체",
    },
    {
      key: "1",
      label: "거래성공",
    },
    {
      key: "2",
      label: "거래실패",
    },
];

const items2 = [
    {
      key: "0",
      label: "전체",
    },

    {
      key: "1",
      label: "낙찰성공",
    },
    {
      key: "2",
      label: "낙찰실패",
    },
];

const productData = [
    {
        productId: "1",
        productName: "롤랙스 시계",
        signatureImgSrc: "",
        nowPrice: "1000000",
        productState: "경매중",
        createdDate: "2023/04/04",
    },
];

const message = {
    "test" : "이런거 할거면 미리 말해주지 밥먹고 올걸 ㅠㅠ",
};

const ProductManagement = (props) => {
    const [data, setData] = useState(productData);
    const [categoryName, setCategoryName] = useState("전체");
    //const [itemKey, setItemKey] = useState(0);
    // const [choiceNum, setChoiceNum] = useState(0);
    const [items,setItems] = useState(items1);

    useEffect(() => {
        console.log(props.props);
        setCategoryName(prev => "전체");

        // let stomp_client;
        // let socket = new SockJS('https://' + "usedauction.shop" + '/chat/ws');
        // stomp_client = Stomp.over(socket);
        // stomp_client.connect({},function(){
        //     console.log('Going to subscribe ... ');
        //     stomp_client.subscribe('/sub/test', function(frame){
        //         console.log('Subscribe: Incoming message: ' + frame.body);
        //         if (frame.body) {
        //           let message = JSON.parse(frame.body);
        //           console.log('New message arrived: ' + frame.body);
        //         }
        //       }, {});
        //     stomp_client.send('/pub/hello', {}, JSON.stringify(message));
        // });

        if(props.props == 1){
           setItems(prev => items1);
        }
        else if(props.props == 2){
            setItems(prev => items2);
        }
        else if(props.props == 3){
            setItems(prev => items3);
        }
    }, [props.props]);

    useEffect(() => {
        console.log(categoryName);
        //여기에 axios 작업
    }, [categoryName]);

    const onSelect = (selectedKeys) => {
        console.log("selectedKeys체크", selectedKeys.key);
        setCategoryName(prev => items[selectedKeys.key].label);
      };

    return (
        <div style= {basicStyle}>
            <Dropdown
                menu={{
                    items,
                    selectable: true,
                    defaultSelectedKeys: ["0"],
                    onSelect,
                }}
                >
                <Typography.Link>
                    <Space style={menuStyle}>
                    {categoryName}
                    <DownOutlined />
                    </Space>
                </Typography.Link>
            </Dropdown>
            <div className="list-box" style={listBoxStyle}>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: () => {
                            //console.log(page);
                        },
                        align: "center",
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
                                title={<NavLink to={`../shop-list/shop-detail/${item.productId}`} style = {titleStyle}>{item.productName}</NavLink>}
                                description={<span style = {descriptionStyle}>{item.nowPrice}</span>}
                            />
                            <span style = {listSpanStyle}>{item.productState}</span>
                            <span style = {listSpanStyle}>{item.createdDate}</span>
                            {/* <Button className="button1" type="button" style = {buttonStyle}>
                                삭제
                            </Button> */}
                            </List.Item>
                        )
                    }}
                />
            </div>
        </div>
    );
  };
  export default ProductManagement;
  