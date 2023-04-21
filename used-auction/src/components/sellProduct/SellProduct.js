import axios from "axios";
import { API } from "../../config";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  NavLink,
  useNavigate,
} from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../../recoil/accessToken";
import React, { useEffect, useState, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
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
} from "antd";

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
axios.defaults.withCredentials = true;

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

const SellProduct = () => {
  const [fileList, setFileList] = useState([]);
  const [sigList, setSigList] = useState([]);
  const id = useRef(0);
  const date = useRef(0);

  const navigate = useNavigate();

  const refreshPage = () => {
    console.log("refreshPage");
    navigate("/usedAuctionFE/sellProduct");
  };

  const onChange = (value) => {
    console.log(value);
    id.current = value;
  };

  const onChangeDate = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
    date.current = dateString;
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
    console.log("id", id.current);
    formData.append("categoryId", id.current);
    formData.append("name", values.name);
    formData.append("startPrice", values.startPrice);
    formData.append("priceUnit", values.priceUnit);
    formData.append("auctionEndDate", date.current);
    formData.append("info", values.info);

    sigList.forEach((file) => {
      console.log(file);
      formData.append("sigImg", file);
    });

    fileList.forEach((file) => {
      console.log(file);
      formData.append("img", file);
    });
    for (let key of formData.keys()) {
      console.log(key, ":", formData.get(key));
    }

    axios
      .post(API.PRODUCT, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log(response);
        alert(response.data.result.msg);
      })
      .then(() => {
        refreshPage();
      })
      .catch((error) => {
        alert(error.response.data.msg);
        console.log(error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={defaultStyle}>
      <div style={titleStyle}>상품 등록</div>

      <Form
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
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="카테고리" name="카테고리">
          <Cascader
            options={items}
            //changeOnSelect
            onChange={onChange}
            fieldNames={{
              value: "key",
              label: "label",
            }}
          />
        </Form.Item>
        <Form.Item label="상품명" name="name">
          <span>
            <Input />
          </span>
        </Form.Item>
        <Form.Item label="경매 시작가" name="startPrice">
          <InputNumber />
        </Form.Item>
        <Form.Item label="입찰 단위" name="priceUnit">
          <InputNumber />
        </Form.Item>
        <Form.Item label="경매 종료일" name="auctionEndDate">
          <DatePicker
            //style={{marginBottom: "10px"}}
            showTime={{
              format: "HH:mm",
            }}
            format="YYYY-MM-DD HH:mm"
            onChange={onChangeDate}
            onOk={onOk}
          />
        </Form.Item>
        <Form.Item label="설명" name="info">
          <TextArea rows={10} placeholder="maxLength is 6" maxLength={300} />
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
        <Form.Item label="이미지" name="img">
          <Upload
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
  );
};
export default SellProduct;
