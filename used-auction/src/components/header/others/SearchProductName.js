import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
const flexBox = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const searchStyle = {
  minWidth: "10rem",
};

const SearchProductName = ({ categoryId }) => {
  const navigate = useNavigate();
  let productName = null;

  const doSearch = (value) => {
    productName = value;

   // "/productList/name=/:productName/id=/:categoryId"
    //if (value == "") navigate(`/productList/""/${categoryId.current}`);
     navigate(`/productList/${categoryId.current}/${productName}`);
  };
  return (
    <div style={flexBox}>
      <Input.Search
        style={searchStyle}
        placeholder="검색어를 입력하세요"
        onSearch={doSearch}
      />
    </div>
  );
};
export default SearchProductName;
