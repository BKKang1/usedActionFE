import { Button, Modal } from "antd";
import { useState, useEffect } from "react";
import Writting  from "./CommentWritting";

const WrittingModal = ({productId,questionId}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const LoginModalStyle = {
    backgroundColor: "black",
    marginLeft:"1rem"
  };

  return (
    <>
      <Button
        type="primary"
        style={LoginModalStyle}
        onClick={showModal}
      > 답글 </Button>
      <Modal
        title="질문"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
        destroyOnClose="true"
      >
        <Writting onCancel={handleCancel} productId={productId} questionId={questionId} ></Writting>
      </Modal>
    </>
  );
};
export default WrittingModal;
