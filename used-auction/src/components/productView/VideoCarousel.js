import { Carousel } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { cloudServerIP } from "../../App";
import Video from "./video/Video";
import req from "../../axios/req";
import { API } from "../../config";
import { DeleteOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { accessToken } from "../../recoil/accessToken";
import { useRecoilState } from "recoil";
const iconStyle = {
  margin: "0 1rem",

  fontSize: "2rem",
};

const videoBox = {
  display: "flex",

  flexDirection: "column",
  margin: "1rem",
  alignItems: "center",
  justifyContent: "center",
};
const textStyle = {
  width: "750px",
  margin: "auto",
  marginTop: "10px",
  textAlign: "center",
};
const onChange = (currentSlide) => {
  console.log(currentSlide);
};

function VideoCarousel({ videoList, productId }) {
  let [isSeller, setIsSeller] = useState(true);

  console.log(productId);
  const auth = useRecoilState(accessToken)[0];

  useEffect(() => {
    if (!auth) {
      setIsSeller(false);
    } else
      axios
        .get(API.ISSELLER + `/${productId}`)
        .then((res) => {
          setIsSeller(res.data.result.valid);
        })
        .catch((error) => {
          setIsSeller(false);
        });
  }, []);

  const settings = {
    dots: true,
    arrows: true,
    isFinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    height: 300,
  };
  const dotStyle = {
    color: "red",
  };
  const list = videoList.map((value, i) => {
    return (
      <div key={i}>
        <div style={videoBox}>
          <div>
            <Video path={value.path}></Video>
          </div>
          {isSeller ? (
            <div
              style={iconStyle}
              onClick={() =>
                req
                  .delete(API.RECORD + `/${value.videoId}`)
                  .then((res) => {
                    alert(res.data.result.msg);
                  })
                  .then(() => window.location.reload())
              }
            >
              <DeleteOutlined />
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  });
  return <Slider {...settings}>{list}</Slider>;
}

export default VideoCarousel;
