import { Card, Space, Divider, Image, Descriptions, Badge, Button } from "antd";
import req from "../../axios/req";
import { API } from "../../config";
import { useLocation, useBeforeUnload } from "react-router-dom";
import { useEffect, useState } from "react";
import QNA from "./QNA";
import CommentWritting from "./CommentWritting";
import React from "react";
import BidModal from "./bid/BidModal";
const Product = () => {
  let location = useLocation();

  const [renderStart, setRenderStart] = useState(false);
  const [productId, setProductId] = useState(null);
  const [nowPrice, setNowPrice] = useState(null);
  const [product, setProduct] = useState({
    auctionId: null,
    auctionEndDate: null,
    categoryName: null,
    info: null,
    memberId: null,
    nickname: null,

    ordinalImgList: [
      {
        originalName: null,
        path: null,
      },
    ],
    priceUnit: null,
    productName: null,
    sigImg: {
      originalName: null,
      path: null,
    },
    startPrice: null,
    status: null,
    viewCount: null,
  });
  const boxStyle = {
    display: "flex",
    justifyContent: "center",
    margin: "4rem 15%",
    alignItems: "center",
  };
  const cardStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: "2rem ",
    alignItems: "center",
  };
  const imgArrStyle = {
    wordWrap: "break-word",

    width: "800px",
  };
  const sigImgStyle = {
    margin: "2rem 4rem 2rem 2rem",
  };

  useEffect(() => {
    setProductId(location.pathname.split("productDetail/")[1]);
  }, []);
  useEffect(() => {
    if (productId !== null) {
      req.get(`${API.PRODUCT}/${productId}`).then((res) => {
        setProduct(res.data.result);
      });
    }
  }, [productId]);

  useEffect(() => {
    if (product.auctionId !== null) {
      sseConnect(product.auctionId);
      setRenderStart(true);
    }
  }, [product]);

  const sseConnect = (auctionId) => {
    console.log("au", auctionId);

    let sse = new EventSource(API.SSECONNECTIONOFPRODUCT + `/${auctionId}`, {
      withCredentials: true,
      heartbeatTimeout: 300000,
    });
    sse.addEventListener("CONNECT", (e) => {
      if (!window.location.pathname.includes("productDetail")) {
        console.log("로케이션 이동 알림");
        sse.close();
        return;
      }

      const { data: receivedConnectData } = e;
      const c = JSON.parse(receivedConnectData);
      console.log("c", c);
      console.log("connect event id: ", c.sseId); // "sse-id"
      console.log("connect event result: ", c.result); // "연결성공!"
    });
    sse.addEventListener("SEND_BID_DATA", (e) => {
      if (!window.location.pathname.includes("productDetail")) {
        console.log("로케이션 이동 알림");
        sse.close();
        return;
      }
      const { data: receivedConnectData } = e;
      const r = JSON.parse(receivedConnectData);
      setNowPrice(r.result);
      console.log("send data sseId: ", r.sseId); // "sse-id"
      console.log("send data result: ", r.result); // "10000" -> 입찰 가격
    });
  };

  {
    if (renderStart) {
      return (
        <div style={boxStyle}>
          <Space direction="vertical" size={16}>
            <Card
              title={product.productName}
              style={{
                width: 900,
              }}
            >
              <div style={cardStyle}>
                <div style={sigImgStyle}>
                  <Image width={250} height={250} src={product.sigImg.path} />
                </div>

                <Descriptions column={2} title="상품 정보">
                  <Descriptions.Item label="판매자">
                    <Badge
                      color="green"
                      count={product.nickname}
                      overflowCount={9999999999}
                    ></Badge>
                  </Descriptions.Item>
                  <Descriptions.Item label="카테고리">
                    <Badge
                      color="green"
                      count={product.categoryName}
                      overflowCount={9999999999}
                    ></Badge>
                  </Descriptions.Item>
                  <Descriptions.Item label="상태">
                    <Badge
                      color="green"
                      count={product.status}
                      overflowCount={9999999999}
                    ></Badge>
                  </Descriptions.Item>
                  <Descriptions.Item label="시작가">
                    <Badge
                      color="blue"
                      count={product.startPrice}
                      overflowCount={9999999999}
                    ></Badge>
                  </Descriptions.Item>
                  <Descriptions.Item label="현재가">
                    <Badge count={nowPrice} overflowCount={9999999999}></Badge>
                  </Descriptions.Item>
                  <Descriptions.Item label="단위가격">
                    <Badge
                      color="green"
                      count={product.priceUnit}
                      overflowCount={9999999999}
                    ></Badge>
                  </Descriptions.Item>
                  <Descriptions.Item label="조회수">
                    <Badge
                      color="yellow"
                      count={product.viewCount}
                      overflowCount={9999}
                    ></Badge>
                  </Descriptions.Item>
                  <Descriptions.Item label="경매마감일">
                    <Badge
                      color="green"
                      count={product.auctionEndDate}
                      overflowCount={999999999999}
                    ></Badge>
                  </Descriptions.Item>
                  <Descriptions.Item>
                    <BidModal
                      priceUnit={product.priceUnit}
                      auctionEndDate={product.auctionEndDate}
                      nowPrice={nowPrice}
                      auctionId={product.auctionId}
                    />
                  </Descriptions.Item>
                </Descriptions>
              </div>

              <Divider />
              <div>{product.info}</div>
              <Divider />
              <div style={boxStyle}>
                <div style={imgArrStyle}>
                  {product.ordinalImgList.map((value, i) => {
                    console.log(value);
                    return (
                      <div key={i}>
                        <Image
                          width="800px"
                          height="600px"
                          src={value.path}
                        ></Image>
                        <Divider />
                      </div>
                    );
                  })}
                </div>
              </div>
              <CommentWritting productId={productId} />
              <Divider />
              <QNA productId={productId} nickname={product.nickname} />
            </Card>
          </Space>
        </div>
      );
    }
  }
};
export default Product;
