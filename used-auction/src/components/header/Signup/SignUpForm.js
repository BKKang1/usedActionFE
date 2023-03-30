import { Button, Form, Input } from "antd";

const btnBoxstyle = {
  display: "flex",
  flexDirection: "row-reverse",
  margin: "0 1rem",
};
const btnStyle = {
  margin: "0 4rem",
  backgroundColor: "green",
};
const formStyle = {
  marginTop: "2rem",
  marginRight: "2rem",
};
const SignUp = () => {
  const onFinish = (values) => {};

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div>
        <Form.Item
          style={formStyle}
          label="이름"
          name="name"
          rules={[{ required: true, message: "이름을 입력하세요" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={formStyle}
          label="아이디"
          name="loginId"
          rules={[{ required: true, message: "아이디를 입력하세요" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={formStyle}
          label="비밀번호"
          name="password"
          rules={[{ required: true, message: "비밀번호를 입력하세요" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          style={formStyle}
          label="생년월일"
          name="birth"
          rules={[{ required: true, message: "생년월일을 입력하세요" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={formStyle}
          label="이메일"
          name="email"
          rules={[{ required: true, message: "이메일을 입력하세요" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={formStyle}
          label="전화번호"
          name="phoneNumber"
          rules={[{ required: true, message: "전화번호를 입력하세요" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={formStyle}
          label="닉네임"
          name="nickname"
          rules={[{ required: true, message: "닉네임을 입력하세요" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={formStyle}
          label="학번"
          name="studentId"
          rules={[{ required: true, message: "학번을 입력하세요" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item style={btnBoxstyle} wrapperCol={{ offset: 6, span: 16 }}>
          <Button style={btnStyle} type="primary" htmlType="submit">
            회원가입
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};
export default SignUp;
