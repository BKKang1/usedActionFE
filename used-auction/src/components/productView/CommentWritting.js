import { Button, Form, Input } from "antd";
import axios from "axios";
import { API } from "../../config";
import { useEffect, useState } from "react";
const { TextArea } = Input;
const CommentWritting = ({ onCancel, productId, questionId }) => {
  const [status, setStatus] = useState(false);
  const onFinish = (values) => {
    console.log("value", values);
    console.log(productId);
    console.log(questionId);
    if (questionId == undefined) questionId = null;
    values.productId = productId;
    values.parentId = questionId;
    const json = JSON.stringify(values);
    console.log("json", json);

    axios
      .post(API.QUESTION, json)
      .then((res) => {
        console.log(res.data);

        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const btnBoxstyle = {
    display: "flex",
    flexDirection: "row-reverse",
    margin: "1rem",
  };
  const btnStyle = {
    backgroundColor: "black",
    marginLeft:"1rem"
  };
  return (
    <Form onFinish={onFinish}>
      <Form.Item
        name="content"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item style={btnBoxstyle}>
        <Button style={btnStyle} htmlType="submit" type="primary">
          작성
        </Button>
      </Form.Item>
    </Form>
  );
};
export default CommentWritting;
