import { Avatar, List, Radio, Space, Button, Pagination } from "antd";
import { useEffect, useState } from "react";
import { API } from "../../config";
import axios from "axios";
import { loginId, nicknameKey } from "../../recoil/loginId";
import { useRecoilState } from "recoil";
import WrittingModal from "./WrittingModal";
const QNA = ({ productId, nickname }) => {
  const [id, setID] = useRecoilState(loginId);
  const [name, setName] = useRecoilState(nicknameKey);
  const [data, setData] = useState([
    {
      content: null,
      createdDate: null,
      loginId: null,
      nickname: null,
      questionId: null,
      children: [
        {
          content: null,
          createdDate: null,
          loginId: null,
          nickname: null,
          questionId: null,
        },
      ],
    },
  ]);

  const [position, setPosition] = useState("bottom");
  const [align, setAlign] = useState("center");
  const flexBox = { display: "flex" };
  const childBox = { marginLeft: "2rem" };
  const [totalPage, setTotalPage] = useState(null);
  const [page, setPage] = useState(0);
  const boxStyle = {
    display: "flex",
    justifyContent: "center",
    margin: "4rem 15%",
    alignItems: "center",
  };
  const onChange = (value) => {
    console.log(value);
    setPage(value - 1);
  };
  useEffect(() => {
    axios
      .get(API.QUESTIONVIEW + `/${productId}?page=${page}&size=${4}`)
      .then((res) => {
        console.log("댓글", res.data.content);

        setData(res.data.content);
        setTotalPage(res.data.totalPages * 4);
      });
  }, [productId, page]);
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
        locale={{ emptyText: <div /> }}
        dataSource={data}
        itemLayout="vertical"
        renderItem={(item, index) => (
          <List.Item>
            <div style={flexBox}>
              <List.Item.Meta
                title={item.nickname + " " + item.createdDate}
                description={item.content}
              />

              {id == item.loginId ? (
                <Button
                  onClick={() =>
                    axios
                      .delete(API.QUESTIONDELETE + `/${data[index].questionId}`)
                      .then((res) => window.location.reload())
                  }
                >
                  삭제
                </Button>
              ) : null}

              {name == nickname ? (
                <WrittingModal
                  productId={productId}
                  questionId={data[index].questionId}
                >
                  글쓰기
                </WrittingModal>
              ) : null}
            </div>
            <div style={childBox}>
              {" "}
              <List
                itemLayout="horizontal"
                dataSource={data[index].children}
                locale={{ emptyText: <div /> }}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.nickname + " " + item.createdDate}
                      description={item.content}
                    />
                    {id == item.loginId ? (
                      <Button
                        onClick={() =>
                          axios
                            .delete(API.QUESTIONDELETE + `/${item.questionId}`)
                            .then((res) => window.location.reload())
                        }
                      >
                        삭제
                      </Button>
                    ) : null}
                  </List.Item>
                )}
              />
            </div>
          </List.Item>
        )}
      />
      <div style={boxStyle}>
        <Pagination
          onChange={onChange}
          total={totalPage}
          pageSize={4}
        ></Pagination>
      </div>
    </>
  );
};
export default QNA;
