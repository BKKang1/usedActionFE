import { Button, Modal } from "antd";
import React, { useState } from "react";
import Bid from "./Bid.js";

const BidModal = ({priceUnit,auctionEndDate, nowPrice ,auctionId}) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        입찰모달
      </Button>
      <Modal
        title="입찰모달"
        open={open}
        onCancel={handleCancel}
        footer={false}
        destroyOnClose="true"
      >
        <Bid onCancel={handleCancel} priceUnit={priceUnit} auctionEndDate={auctionEndDate} nowPrice={nowPrice} auctionId={auctionId}></Bid>
      </Modal>
    </>
  );
};

export default BidModal;
