import { Button, Modal } from 'antd';
import { useState } from 'react';
import Login from './LoginForm';
const LoginModal = () => {
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
 
  };
  const LoginModalStyle = {
    backgroundColor: "black",
  };
  return (
    <>
      <Button type="primary" style={LoginModalStyle} onClick={showModal}>
        로그인/회원가입
      </Button>
      <Modal title="로그인" open={isModalOpen} onCancel={handleCancel} footer={false}  destroyOnClose="true">
        <Login></Login> 
      </Modal>
    </>
  );
};
export default LoginModal;