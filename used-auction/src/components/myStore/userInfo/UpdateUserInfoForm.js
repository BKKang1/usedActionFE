import { Button, Form, Input, Modal } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../config";
import { useRecoilState } from "recoil";
import { loginState } from "../../../recoil/loginState";
axios.defaults.withCredentials = true;

const btnBoxstyle = {
  display: "flex",
  flexDirection: "row-reverse",
  margin: "0 1rem",
};
const btnStyle = {
  margin: "0 1rem",
  backgroundColor: "green",
};
const formStyle = {
  marginTop: "2rem",
  marginRight: "2rem",
};

const UpdateUserInfoForm = ({ onCancel, onCancelTotal, userInfo }) => {
    const [updateUserInfo,setUpdateUserInfo]=useState(
        {
            name : userInfo.name,
            birth : userInfo.birth,
            phoneNumber : userInfo.phoneNumber,
        }
    );

    useEffect(() => {
        console.log(updateUserInfo);
    }, [updateUserInfo]);

    const onChange = (e) => {
        const { name, value } = e.target   
    
        const nextInputs = {            
          ...updateUserInfo,  
          [name]: value,
        }
    
        setUpdateUserInfo(nextInputs);
        console.log(updateUserInfo);     
    }

    const onFinish = (values) => {
        console.log(updateUserInfo.name);
        console.log(values);


        const json = JSON.stringify(updateUserInfo);

        axios
        .patch(API.USERINFO, json)
        .then((response) => {console.log(response);})
        .then(() => onCancelTotal())
        .catch((error) => console.log(error));
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
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
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        >
        <Form.Item
            style={formStyle}
            label="이름"
            name="name"
            onChange={onChange}
        >
            <Input name="name" defaultValue={userInfo.name}/>
        </Form.Item>
        <Form.Item
            style={formStyle}
            label="생년월일"
            name="birth"
            onChange={onChange}
        >
            <Input name="birth" defaultValue={userInfo.birth}/>
        </Form.Item>
        <Form.Item
            style={formStyle}
            label="전화번호"
            name="phoneNumber"
            onChange={onChange}
        >
            <Input name="phoneNumber" defaultValue={userInfo.phoneNumber}/>
        </Form.Item>
        <div style={btnBoxstyle}>
            <Form.Item wrapperCol={{ offset: 2, span: 16 }} style={formStyle}>
            <Button style={btnStyle} type="primary" htmlType="submit">
                수정
            </Button>
            </Form.Item>
        </div>
        </Form>
    );
};
export default UpdateUserInfoForm;