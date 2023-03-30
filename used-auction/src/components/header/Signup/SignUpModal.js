import { Button, Modal } from "antd";
import React, { useState } from "react";
import SignUp from "./SignUpForm.js";


const SignUpModal = () => {
 
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
   
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        회원가입
      </Button>
      <Modal
        title="회원가입"
        open={open}
        onCancel={handleCancel}
        footer={false}
    
        destroyOnClose="true"
      >
        <SignUp></SignUp>
      </Modal>
    </>
  );
};

export default SignUpModal;
