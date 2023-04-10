import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { API } from "../../../config";
import { NavLink } from "react-router-dom";
const flexBox = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const searchIcon = {
  marginLeft: "1rem",
  fontSize: "2rem",
};

const Search = ({ categoryId, productName }) => {
  let orderBy = "VIEW_ORDER";
  let page = "0";
  let size = "10";
  const doSearch = () => {
    axios
      .get(
        API.SEARCH +
          `?categoryId=${categoryId.current}&productName=${productName.current}&orderBy=${orderBy}&page=${page}&size=${size}`
      )

      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error.response.data));
  };
  return (
    <div style={flexBox}>
      <Input placeholder="검색어를 입력하세요" />
      <NavLink to="/usedAuctionFE/productList">
        <SearchOutlined style={searchIcon} onClick={doSearch} />
      </NavLink>
    </div>
  );
};
export default Search;
