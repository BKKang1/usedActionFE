import { API } from "../../config";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  NavLink,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../../recoil/accessToken";
import React, { useEffect, useState, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  Image,
  Upload,
  Typography,
  Spin,
} from "antd";
import req from "../../axios/req";
const { Title } = Typography;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const defaultStyle = {
  margin: "2rem",
};

const imgStyle = {
  textAlign: "center",
  marginTop: "2rem",
};

const titleStyle = {
  textAlign: "center",
  marginTop: "2rem",
  fontSize: "25px",
};

const items = [
  {
    key: "0",
    label: "전체",
  },
  {
    key: "1",
    label: "디지털기기",
  },
  {
    key: "2",
    label: "생활가전",
  },
  {
    key: "3",
    label: "가구/인테리어",
  },
  {
    key: "4",
    label: "생활/주방",
  },
  {
    key: "5",
    label: "유아동",
  },
  {
    key: "6",
    label: "유아도서",
  },
  {
    key: "7",
    label: "여성의류",
  },
  {
    key: "8",
    label: "여성잡화",
  },
  {
    key: "9",
    label: "도서",
  },
  {
    key: "10",
    label: "가공식품",
  },
  {
    key: "11",
    label: "반려동물물품",
  },
  {
    key: "12",
    label: "식품",
  },
  {
    key: "13",
    label: "기타 중고물품",
  },
  {
    key: "14",
    label: "남성패션/잡화",
  },
  {
    key: "15",
    label: "뷰티/미용",
  },
  {
    key: "16",
    label: "티켓/교환권",
  },
  {
    key: "17",
    label: "스포츠/레저",
  },
  {
    key: "18",
    label: "취미/게임/음반",
  },
];

const ModifyProduct = () => {
  const [isloading, setIsLoading] = useState(true);
  const productId = useParams().productId;
  const [renderStart, setRenderStart] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [sigList, setSigList] = useState([]);
  const [id, setId] = useState(0);
  const [date, setDate] = useState(0);
  const [form] = Form.useForm();
  const [product, setProduct] = useState({
    categoryId: null,
    productName: null,
    startPrice: null,
    auctionEndDate: null,
    priceUnit: null,
    info: null,
    sigImg: {
      originalName: null,
      path: null,
    },
    ordinalImgList: [
      {
        originalName: null,
        path: null,
      },
    ],
  });
  const onChange = (value) => {
    setId(value);
  };

  useEffect(() => {
    req.get(API.PRODUCTUPDATE + `/${productId}`).then((res) => {
      console.log(res.data.result);
      setProduct(res.data.result);
    });
  }, []);
  useEffect(() => {
    if (product.productName) {
      form.setFieldsValue({
        categoryId: product.categoryId.toString(),
        productName: product.productName,
        startPrice: product.startPrice,
        priceUnit: product.priceUnit,
        info: product.info,
        auctionEndDate: dayjs(new Date(product.auctionEndDate)),
      });
      setId(product.categoryId);
      setDate(product.auctionEndDate);
      urlToObject(product.ordinalImgList);
      urlToSig(product.sigImg);
      setRenderStart(true);
      setIsLoading(false);
    }
  }, [product]);

  const urlToObject = async (props) => {
    let tempArr = [];
    console.log(props);
    for (let i = 0; i < props.length; i++) {
      if (props[i].path && fileList.length < props.length) {
        const response = await fetch(`../../${props[i].path}`);
        const blob = await response.blob();
        const file = new File([blob], props[i].originalName, {
          type: blob.Image,
        });
        tempArr = tempArr.concat(file);
        console.log(file);
      }
    }
    setFileList(tempArr);
  };
  const urlToSig = async (props) => {
    if (props) {
      const response = await fetch(`../../${props.path}`);
      const blob = await response.blob();
      const file = new File([blob], props.originalName, { type: blob.Image });
      setSigList(sigList.concat(file));

      console.log(file);
    }
  };

  const navigate = useNavigate();

  const refreshPage = () => {
    console.log("refreshPage");
    navigate("/modifyProduct");
  };

  const onChangeDate = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
    setDate(dateString);
  };

  const onOk = (value) => {
    console.log("onOk: ", value);
  };

  const onFinish = (values) => {
    if (sigList.length === 0 || fileList.length === 0) {
      alert("빈 공간이 있습니다");
      return;
    }
    const formData = new FormData();
    console.log("auctionEndDate", date);
    formData.append("categoryId", id.toString());
    formData.append("productName", values.productName);
    formData.append("startPrice", values.startPrice);
    formData.append("priceUnit", values.priceUnit);
    formData.append("auctionEndDate", date);
    formData.append("info", values.info);

    sigList.forEach((file) => {
      console.log(file);
      formData.append("sigImg", file);
    });

    fileList.forEach((file) => {
      console.log(file);
      formData.append("imgList", file);
    });
    for (let key of formData.keys()) {
      console.log(key, ":", formData.get(key));
    }

    req
      .patch(API.PRODUCTUPDATE + `/${productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log(response);
        alert(response.data.result.msg);
      })
      .then(() => {
        navigate("/myStore");
      });
  };

  if (renderStart) {
    return (
      <Spin spinning={isloading} size="large">
        <div style={defaultStyle}>
          <div style={titleStyle}>상품 수정</div>

          <Form
            form={form}
            name="basic"
            style={defaultStyle}
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            autoComplete="off"
            onFinish={onFinish}
          >
            <Form.Item label="카테고리" name="categoryId">
              <Select
                options={items}
                //changeOnSelect

                onChange={onChange}
                fieldNames={{
                  value: "key",
                  label: "label",
                }}
              />
            </Form.Item>
            <Form.Item label="상품명" name="productName">
              <Input />
            </Form.Item>
            <Form.Item label="경매 시작가" name="startPrice">
              <InputNumber />
            </Form.Item>
            <Form.Item label="입찰 단위" name="priceUnit">
              <InputNumber min={1000} />
            </Form.Item>
            <Form.Item label="경매 종료일" name="auctionEndDate">
              <DatePicker
                showTime={{
                  format: "HH:mm",
                }}
                value={date}
                format="YYYY-MM-DD HH:mm"
                onChange={onChangeDate}
                onOk={onOk}
              />
            </Form.Item>
            <Form.Item label="설명" name="info">
              <TextArea
                rows={10}
                placeholder="maxLength is 6"
                maxLength={300}
              />
            </Form.Item>
            <Form.Item label="대표이미지" name="sigImg">
              <Upload
                beforeUpload={(file) => {
                  if (sigList.length < 1) {
                    console.log("file", file);
                    setSigList((sigList) => sigList.concat(file));
                  }
                  return false; // 파일 선택시 바로 업로드 하지 않고 후에 한꺼번에 전송하기 위함
                }}
                listType="picture"
                maxCount={1.5}
                fileList={sigList}
                onPreview={() => false}
                onRemove={(file) => {
                  setSigList(sigList.filter((i) => i.uid !== file.uid));
                }}
              >
                <div>
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item label="이미지" name="imgList">
              <Upload
                fileList={fileList}
                onPreview={() => false}
                beforeUpload={(file) => {
                  console.log("file", file);
                  if (sigList.length <= 4) setFileList(fileList.concat(file));
                  return false; // 파일 선택시 바로 업로드 하지 않고 후에 한꺼번에 전송하기 위함
                }}
                listType="picture"
                maxCount={5}
                onRemove={(file) => {
                  setFileList(fileList.filter((i) => i.uid !== file.uid));
                }}
              >
                <div>
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </div>
              </Upload>
            </Form.Item>
            <div>
              <Form.Item label="제출">
                <Button type="primary" htmlType="submit">
                  글 등록
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Spin>
    );
  }
};
export default ModifyProduct;
