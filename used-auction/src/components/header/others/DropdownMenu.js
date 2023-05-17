import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Typography } from "antd";
import { useState } from "react";
const menuStyle = {
  color: "black",
  fontSize: "2.5rem",
};

const items = [
  {
    key: "0",
    label: "전체",
  },
  {
    key: "1",
    label: "디지털기기",
  },
  {
    key: "2",
    label: "생활가전",
  },
  {
    key: "3",
    label: "가구/인테리어",
  },
  {
    key: "4",
    label: "생활/주방",
  },
  {
    key: "5",
    label: "유아동",
  },
  {
    key: "6",
    label: "유아도서",
  },
  {
    key: "7",
    label: "여성의류",
  },
  {
    key: "8",
    label: "여성잡화",
  },
  {
    key: "9",
    label: "도서",
  },
  {
    key: "10",
    label: "가공식품",
  },
  {
    key: "11",
    label: "반려동물물품",
  },
  {
    key: "12",
    label: "식품",
  },
  {
    key: "13",
    label: "기타 중고물품",
  },
  {
    key: "14",
    label: "남성패션/잡화",
  },
  {
    key: "15",
    label: "뷰티/미용",
  },
  {
    key: "16",
    label: "티켓/교환권",
  },
  {
    key: "17",
    label: "스포츠/레저",
  },
  {
    key: "18",
    label: "취미/게임/음반",
  },
];
const DropdownMenu = ({ categoryId, setSelected, selected }) => {
  const onSelect = (selectedKeys) => {
    categoryId.current = selectedKeys.key;
    setSelected(items.at(selectedKeys.key).label);
    console.log(selectedKeys);
    console.log(categoryId.current);
  };
  return (
    <Dropdown
      autoAdjustOverflow={false}
      menu={{
        items,
        selectable: true,
        onSelect,
   
        selectedKeys: [categoryId.current],
      }}
    >
      <Typography.Link>
        <Space style={menuStyle}>
          {selected}
          <DownOutlined />
        </Space>
      </Typography.Link>
    </Dropdown>
  );
};
export default DropdownMenu;
