import {} from "antd";
import logo from "../../../img/logo.png";
const textStyle = {
  whiteSpace: "nowrap",
  fontSize: "4rem",
  verticalAlign: "middle",
  textDecoration:"none"
};
const boxStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const Title = () => {
  return (
    <span style={boxStyle}>
      <img src={logo}></img>
      <p style={textStyle}>중고장터</p>
    </span>
  );
};

export default Title;
