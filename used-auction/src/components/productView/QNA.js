import { Avatar, List, Radio, Space } from "antd";
import { useEffect, useState } from "react";
import { API } from "../../config";
import axios from "axios";
const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];

const QNA = ({ productId }) => {
  useEffect(() => {
    axios
      .get(API.QUESTIONVIEW + `/${productId}?page=${0}&size=${8}`)
      .then((res) => {
        console.log("댓글",ㅛres.data);
      });
  }, [productId]);
  const [position, setPosition] = useState("bottom");
  const [align, setAlign] = useState("center");
  return (
    <>
      <Space
        direction="vertical"
        style={{
          marginBottom: "20px",
        }}
        size="middle"
      ></Space>
      <List
        pagination={{
          position,
          align,
        }}
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </>
  );
};
export default QNA;
