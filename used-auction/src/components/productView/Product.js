import { Card, Space, Divider, Image, Descriptions, Badge } from "antd";
import axios from "axios";
import { API } from "../../config";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import QNA from "./QNA";

const Product = () => {
  const location = useLocation();
  const [renderStart, setRenderStart] = useState(false);
  const [productId, setProductId] = useState(null);
  const [product, setProduct] = useState({
    auctionEndDate: null,
    categoryName: null,
    info: null,
    memberId: null,
    nickname: null,
    nowPrice: null,
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
      axios.get(`${API.PRODUCT}/${productId}`).then((res) => {
        console.log(res.data.result);
        setProduct(res.data.result);
      });
    }
  }, [productId]);
  useEffect(() => {
    setRenderStart(true);
  }, [product]);
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
                    <Badge
                      count={product.nowPrice}
                      overflowCount={9999999999}
                    ></Badge>
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
              <QNA productId={productId} />
            </Card>
          </Space>
        </div>
      );
    }
  }
};
export default Product;
