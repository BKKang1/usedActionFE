import { Button, Form, Input } from "antd";
import req from "../../../axios/req";
import { API } from "../../../config";

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
      alert("닉네임에 대한 중복체크가 필요합니다");
      return;
    }
    if (chkLoginId !== values.loginId) {
      alert("아이디에 대한 중복체크가 필요합니다");
      return;
    }
    if (chkEmail !== values.email) {
      alert("이메일에 대한 인증이 필요합니다");
      return;
    }

    const json = JSON.stringify(values);
    console.log("json", json);

    req
      .post(API.SIGNUP, json)
      .then((response) => alert(response.data.result.msg))
      .then(() => onCancel())
      
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const checkID = () => {
    const loginId = form.getFieldsValue().loginId;
    const url = API.IDCHECK + `/${loginId}/exists`;
    console.log("id", loginId);
    if (loginId === undefined) {
      alert("공백은 허용되지 않습니다", loginId);
      return;
    }
    req
      .get(url)
      .then((response) => {
        if (response.data.result === false) {
          chkLoginId = loginId;
          alert("사용 가능합니다");
        } else {
          alert("사용 불가능합니다");
        }
      })
      
  };

  const checkNickname = () => {
    const name = form.getFieldsValue().name;
    const url = API.NICKNAMECHECK + `/${name}/exists`;
    if (name === undefined) {
      alert("공백은 허용되지 않습니다", name);
      return;
    }
    req
      .get(url)
      .then((response) => {
        if (response.data.result === false) {
          chkname = name;
          alert("사용 가능합니다");
        } else {
          alert("사용 불가능합니다");
        }
      })
  };
  const sendEmail = () => {
    const email = form.getFieldsValue().email;
    if (email === undefined || email.length <= 12) {
      alert("올바른 이메일을 입력하세요");
      return;
    }
    const emailform = email.slice(-12);

    if (emailform !== "@kumoh.ac.kr") {
      alert("올바른 이메일을 입력하세요");
      return;
    }
    let url = API.EMAILCHECK + `/${email}/exists`;

    req.get(url).then((response) => {
      if (response.data.result === false) {
        chkEmail = email;
        url = API.EMAILSEND + `/${email}`;
        req.post(url).then(() => {
          alert("웹메일에 코드가 전송되었습니다.");
        });
      } else {
        alert("이미 사용된 이메일입니다");
      }
    });
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
            <Input placeholder="01012345678"/>
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
