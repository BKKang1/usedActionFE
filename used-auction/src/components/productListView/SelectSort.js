import { Select } from "antd";
import { useEffect, useState } from "react";
import { API } from "../../config";
import req from "../../axios/req";
const SelectSort = ({ setOrderBy, setPage, orderBy, onSelect }) => {
  const [options, setOptions] = useState([{}]);
  useEffect(() => {
    req.get(API.ORDERBY).then((response) => {
      console.log(response.data.result);
      let object = response.data.result;
      object.map((val) => {
        console.log("val", val);
        val.value = val.name;
        val.label = val.description;
        delete val.name;
        delete val.description;
      });

      console.log("123", object);
      setOptions(object);
    });
  }, []);

  return (
    <Select
      size="large"
      showSearch
      style={{
        width: 300,
        marginLeft:"4rem"
      }}
      placeholder="정렬기준"
      optionFilterProp="children"
      filterOption={(input, option) => (option?.label ?? "").includes(input)}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? "")
          .toLowerCase()
          .localeCompare((optionB?.label ?? "").toLowerCase())
      }
      options={options}
      onSelect={onSelect}
      value={orderBy}
    />
  );
};
export default SelectSort;
