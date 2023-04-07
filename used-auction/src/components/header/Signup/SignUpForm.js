import { Button, Form, Input } from "antd";

import { API } from "../../../config";
import axios from "axios";

axios.defaults.withCredentials = true;
const boxHeight = {
  height: "2.5rem",
};
const btnBoxstyle = {
  display: "flex",
  flexDirection: "row-reverse",
  margin: "2rem",
};
const flexBox = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "70px",
};
const btnStyle = {
  margin: "0 2rem",
  backgroundColor: "green",
};
const formStyle = {
  marginTop: "2rem",
  marginRight: "2rem",
};

const SignUp = ({ onCancel }) => {
  const [form] = Form.useForm();
  let chkLoginId = null;
  let chkname = null;
  let chkEmail = null;
  const onFinish = (values) => {
    if (chkname !== values.name) {
      console.log("닉네임에 대한 중복체크가 필요합니다");
      return;
    }
    if (chkLoginId !== values.loginId) {
      console.log("아이디에 대한 중복체크가 필요합니다");
      return;
    }

    if (chkEmail !== values.email) {
      console.log("이메일에 대한 인증이 필요합니다");
      return;
    }

    const json = JSON.stringify(values);
    console.log("json", json);

    axios
      .post(API.SIGNUP, json)
      .then((response) => console.log(response.data.result.msg))
      .then(() => onCancel())
      .catch((error) => console.log(error.response.data));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const checkID = () => {
    const loginId = form.getFieldsValue().loginId;
    const url = API.IDCHECK + `/${loginId}/exists`;
    console.log("id", loginId);
    if (loginId === undefined) {
      console.log("공백은 허용되지 않습니다", loginId);
      return;
    }
    axios
      .get(url)
      .then((response) => {
        console.log(response.data.result);
        if (response.data.result === false) {
          chkLoginId = loginId;
        }
      })
      .catch((error) => console.log(error.response.data));
  };

  const checkNickname = () => {
    const name = form.getFieldsValue().name;
    const url = API.NICKNAMECHECK + `/${name}/exists`;
    if (name === undefined) {
      console.log("공백은 허용되지 않습니다", name);
      return;
    }
    axios
      .get(url)
      .then((response) => {
        console.log(response.data.result);
        if (response.data.result === false) {
          chkname = name;
        }
      })
      .catch((error) => console.log(error.response.data));
  };
  const sendEmail = () => {
    const email = form.getFieldsValue().email;
    if (email.length <= 12) {
      console.log("올바른 이메일을 입력하세요");
      return;
    }
    const emailform = email.slice(-12);

    if (emailform !== "@kumoh.ac.kr") {
      console.log("올바른 이메일을 입력하세요");
      return;
    }
    let url = API.EMAILCHECK + `/${email}/exists`;
    console.log(url);
    axios
      .get(url)
      .then((response) => {
        if (response.data.result === false) {
          chkEmail = email;
          url = API.EMAILSEND + `/${email}`;
          axios
            .post(url)

            .catch((error) => console.log(error.response));
        } else {
          console.log("이미 사용된 이메일입니다");
        }
      })
      .catch((error) => console.log(error.response.data));
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
    >
      <div>
        <div style={flexBox}>
          <Form.Item
            style={formStyle}
            label="닉네임"
            name="name"
            rules={[{ required: true, message: "닉네임을 입력하세요" }]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" onClick={checkNickname}>
            중복 체크
          </Button>
        </div>
        <div style={flexBox}>
          <Form.Item
            style={formStyle}
            label="아이디"
            name="loginId"
            rules={[{ required: true, message: "아이디를 입력하세요" }]}
          >
            <Input />
          </Form.Item>

          <Button type="primary" onClick={checkID}>
            중복 체크
          </Button>
        </div>

        <div style={flexBox}>
          <Form.Item
            style={formStyle}
            label="웹메일"
            name="email"
            rules={[{ required: true, message: "이메일을 입력하세요" }]}
          >
            <Input placeholder="~@kumoh.ac.kr" />
          </Form.Item>
          <Button type="primary" onClick={sendEmail}>
            인증 요청
          </Button>
        </div>
        <div style={boxHeight}>
          <Form.Item
            style={formStyle}
            label="이메일 인증 코드"
            name="code"
            rules={[
              { required: true, message: "이메일 인증 코드를 입력하세요" },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div style={boxHeight}>
          <Form.Item
            style={formStyle}
            label="비밀번호"
            name="password"
            rules={[{ required: true, message: "비밀번호를 입력하세요" }]}
          >
            <Input.Password />
          </Form.Item>
        </div>

        <div style={boxHeight}>
          <Form.Item
            style={formStyle}
            label="생년월일"
            name="birth"
            rules={[{ required: true, message: "생년월일을 입력하세요" }]}
          >
            <Input placeholder="19990101" />
          </Form.Item>
        </div>
        <div style={boxHeight}>
          <Form.Item
            style={formStyle}
            label="전화번호"
            name="phoneNumber"
            rules={[{ required: true, message: "전화번호를 입력하세요" }]}
          >
            <Input />
          </Form.Item>
        </div>

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
