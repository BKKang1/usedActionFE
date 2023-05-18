import { Card, Space, Divider, Image, Descriptions, Badge, Button } from "antd";
import req from "../../axios/req";
import { API } from "../../config";
import { useLocation, useBeforeUnload } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import QNA from "./QNA";
import CommentWritting from "./CommentWritting";
import React from "react";
import BidModal from "./bid/BidModal";
import { PriceOfSSE } from "./ContextOfPrice";
import { Link } from "react-router-dom";
import { ClientContext } from "../chattingRoom/Soket";
import { nicknameKey } from "../../recoil/loginId";
import { useRecoilState } from "recoil";
const Product = () => {
  let location = useLocation();
  const [name, setName] = useRecoilState(nicknameKey);
  const [renderStart, setRenderStart] = useState(false);
  const [productId, setProductId] = useState(null);
  const [nowPrice, setNowPrice] = useState(null);
  const { ssePrice, setSSEPrice } = useContext(PriceOfSSE);
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
  const contentStyle = {
    whiteSpace: "pre-wrap",
  };
  const titleStyle = {
    fontSize: "2.3rem",
  };
  const bodyStyle = {
    fontSize: "1.3rem",
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

    setSSEPrice(auctionId);
    ssePrice.current.addEventListener("CONNECT", (e) => {
      const { data: receivedConnectData } = e;
      const c = JSON.parse(receivedConnectData);
      console.log("c", c);
      console.log("connect event id: ", c.sseId); // "sse-id"
      console.log("connect event result: ", c.result); // "연결성공!"
    });
    ssePrice.current.addEventListener("SEND_BID_DATA", (e) => {
      const { data: receivedConnectData } = e;
      const r = JSON.parse(receivedConnectData);
      setNowPrice(r.result);
      console.log("send data sseId: ", r.sseId); // "sse-id"
      console.log("send data result: ", r.result); // "10000" -> 입찰 가격
    });
  };

  {
    const streamPage = `/stream/${productId}`;
    
    const streamPageofSub = `/stream/sub/${productId}`;
    if (renderStart) {
      return (
        <div style={boxStyle}>
          <Space direction="vertical" size={16}>
            <Card
              title={<h1 style={titleStyle}>{product.productName}</h1>}
              style={{
                width: 900,
              }}
            >
              <div style={cardStyle}>
                <div style={sigImgStyle}>
                  <Image width={250} height={250} src={product.sigImg.path} />
                </div>

                <Descriptions
                  column={2}
                  title="상품 정보"
                  labelStyle={bodyStyle}
                  contentStyle={bodyStyle}
                >
                  <Descriptions.Item label="판매자">
                    {product.nickname}
                  </Descriptions.Item>
                  <Descriptions.Item label="카테고리">
                    {product.categoryName}
                  </Descriptions.Item>
                  <Descriptions.Item label="상태">
                    {product.status}
                  </Descriptions.Item>
                  <Descriptions.Item label="시작가">
                    {product.startPrice !== null
                      ? product.startPrice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : null}
                  </Descriptions.Item>
                  <Descriptions.Item label="현재가">
                    {nowPrice !== null
                      ? nowPrice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : null}
                  </Descriptions.Item>
                  <Descriptions.Item label="단위가격">
                    {product.priceUnit !== null
                      ? product.priceUnit
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : null}
                  </Descriptions.Item>
                  <Descriptions.Item label="조회수">
                    {product.viewCount}
                  </Descriptions.Item>
                  <Descriptions.Item label="경매마감일">
                    {product.auctionEndDate}
                  </Descriptions.Item>
                  <Descriptions.Item>
                    <BidModal
                      priceUnit={product.priceUnit}
                      auctionEndDate={product.auctionEndDate}
                      nowPrice={nowPrice}
                      auctionId={product.auctionId}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item></Descriptions.Item>
                  {product.nickname === name ? (
                    <Descriptions.Item>
                      <Button>
                        {" "}
                        <Link to={streamPage}>방송하기</Link>{" "}
                      </Button>
                    </Descriptions.Item>
                  ) : (
                    <Descriptions.Item>
                      <Button> 
                      <Link to={streamPageofSub}>방송보기</Link>{" "}</Button>
                    </Descriptions.Item>
                  )}
                </Descriptions>
              </div>

              <Divider />
              <div style={contentStyle}>{<h2>{product.info}</h2>}</div>
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
