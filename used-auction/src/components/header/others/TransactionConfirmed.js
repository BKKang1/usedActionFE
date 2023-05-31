import axios from "axios";
import { API } from "../../../config";
import { Dropdown, Space, Segmented , Button, List, Layout, Menu } from "antd";
import React, { location, useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const imgStyle = {
    width: "150px",
    height: "150px",
};

const titleStyle = {
    fontSize: "25px",
    ontWeight: "500",
};

const infoStyle = {
    display: "flex",
    fontSize: "20px",
    fontWeight: "500",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap"
};

const checkStyle = {
    display: "flex",
    fontSize: "15px",
    fontWeight: "500",
    color: "blue"
};

const buttonStyle = {
    marginLeft: "10px",
    //backgroundColor: "grey",
};

const TransactionConfirmed = ({count}) => {
    const [listData1, setListData1] = useState();
    const [listData2, setListData2] = useState();
    const [selectedSegment, setSelectedSegment] = useState('거래확정');

    useEffect(() => {
        axios
        .get(API.NOTIFICATION+"/trans-confirm")
        .then((response) => {
            console.log(response.data.result);
            setListData1(response.data.result);
        })
        .catch((error) => {
            console.log(error.response.data);
        });

        axios
        .get(API.NOTIFICATION)
        .then((response) => {
            console.log(response.data.result);
            setListData2(response.data.result);
        })
        .catch((error) => {
            console.log(error.response.data.msg);
        });
    }, [count]);

    const transComplete = (e) => {
        console.log(e);
        axios
        .post(API.TRANS,{
            "productId": e.productId,
            "status": "TRANS_COMPLETE"
        })
        .then((response) => {
            console.log(response.data.result);
            alert(response.data.result);
            sendAlarm(e.notificationId);
        })
        .catch((error) => {
            console.log(error.response.data);
            alert(error.response.data.msg);
            if(error.response.data.code=="ALREADY_AUCTION_TRANS_COMPLETE"){
                sendAlarm(e.notificationId);
            }
        });
    };

    const transReject = (e) => {
        axios
        .post(API.TRANS,{
            "productId": e.productId,
            "status": "TRANS_REJECT"
        })
        .then((response) => {
            console.log(response.data.result);
            alert(response.data.result);
            sendAlarm(e.notificationId);
        })
        .catch((error) => {
            console.log(error.response.data);
            alert(error.response.data.msg);
            if(error.response.data.code=="ALREADY_AUCTION_TRANS_COMPLETE"){
                sendAlarm(e.notificationId);
            }
        });
    };

    const sendAlarm = (e) => {
        console.log(e);
        axios
        .post(API.NOTIFICATION+`/${e}`)
        .then((response) => {
            console.log(response.data.result);
        })
        .catch((error) => {
            console.log(error.response.data);
        });
    };

    return (
      <div>
        <Segmented options={['거래확정', '기타알림']} value={selectedSegment} onChange={setSelectedSegment}/>
        {
            selectedSegment == "거래확정"?
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                    console.log(page);
                    },
                    pageSize: 3,
                    align: "center",
                }}
                dataSource={listData1}
                renderItem={(item) => (
                <List.Item
                    key={item.notificationId}
                    extra={
                    <img
                        width={272}
                        alt="logo"
                        src={item.sigImgSrc}
                        style={imgStyle}
                    />
                    }
                >
                    <List.Item.Meta
                    title={
                        <Link
                        to={`../productList/productDetail/${item.productId}`}
                        >
                            <p style={titleStyle}>{item.title}</p>
                        </Link>
                    }
                    description={
                        <div>
                            {item.type=="판매자 거래확정"?
                                <span style={infoStyle}>
                                    판매 상품
                                </span>:
                                <span style={infoStyle}>
                                    구매 상품
                                </span>
                            }
                            <span style={infoStyle}>
                            {item.endPrice+"원"}
                            </span>
                        </div>
                    }
                    />
                    <Button 
                    type="primary" 
                    style={buttonStyle} 
                    onClick={
                        ()=>{
                            console.log(item); 
                            transComplete(item);
                        }
                    }>
                        거래 성공
                    </Button>
                    <Button 
                    type="primary" 
                    style={buttonStyle} 
                    onClick={
                        ()=>{
                            console.log(item); 
                            transReject(item);
                        }
                    }>
                        거래 실패
                    </Button>
                </List.Item>
                )}
            />:
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                    console.log(page);
                    },
                    pageSize: 3,
                    align: "center",
                }}
                dataSource={listData2}
                renderItem={(item) => (
                <List.Item
                    key={item.notificationId}
                >
                    <List.Item.Meta
                        title={
                            <p style={titleStyle}>{item.title}</p>
                        }
                        description={
                            <div>
                                <span style={infoStyle}>
                                    {item.content}
                                </span>
                                <span style={checkStyle} onClick={()=>{console.log(item.notificationId); sendAlarm(item.notificationId);}}>
                                    확인
                                </span>
                            </div>
                        }
                    />
                </List.Item>
                )}
            />
        }
      </div>
    );
  };
  
  export default TransactionConfirmed;