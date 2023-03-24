import { Button, Checkbox, Form, Input } from "antd";
import SignUpModal from "../Signup/SignUpModal";
const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const btnBoxstyle = {
  display: "flex",
  flexDirection: "row-reverse",
  margin: "0 1rem",
};
const btnStyle = {
  margin: "0 1rem",
  backgroundColor:"green"

};
const formStyle = {
  marginTop: "2rem",
  marginRight:"2rem"
};
const LoginForm = () => (
  <Form
    name="basic"
    labelCol={{
      span: 7,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}

    onFinish={onFinish}
    autoComplete="off"
  >
    <Form.Item
      style={formStyle}
      label="아이디"
      name="loginId"
      rules={[
        {
          required: true,
          message: "아이디를 입력하세요",
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      style={formStyle}
      label="비밀번호"
      name="password"
      rules={[
        {
          required: true,
          message: "비밀번호를 입력하세요",
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <div style={btnBoxstyle}>
      <Form.Item wrapperCol={{ offset: 2, span: 16 }} style={formStyle}>
        <Button style={btnStyle} type="primary" htmlType="submit">
          로그인
        </Button>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={formStyle}>
        <SignUpModal></SignUpModal>
      </Form.Item>
    </div>
  </Form>
);
export default LoginForm;
