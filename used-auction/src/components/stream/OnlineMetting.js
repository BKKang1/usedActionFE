import React, { Component } from "react";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import styled from "styled-components";
import UserVideoComponent from "./UserVideoComponent";
import StreamChat from "./StreamChat";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import HeadsetIcon from "@mui/icons-material/Headset";
import VideocamOffOutlinedIcon from "@mui/icons-material/VideocamOffOutlined";
import MicOffIcon from "@mui/icons-material/MicOff";
import HeadsetOffIcon from "@mui/icons-material/HeadsetOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import TheatersIcon from "@mui/icons-material/Theaters";
import ChatIcon from "@mui/icons-material/Chat";
import { withRouter } from "react-router-dom";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
// 로컬 미디어 서버 주소
const OPENVIDU_SERVER_URL = "https://usedauction.shop/";
const flexBox = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const videoBox = {
  width: "1000px",
  height: "500px",
  backgroundColor: "black",
};

const boxStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: "4rem 15%",
  alignItems: "center",
  marginBottom: "200px",
};

const StreamContainer = styled.div`
  width: 100%;
  position: relative;
  border-radius: 5px;
  min-height: 34vh;
  overflow: hidden;
  box-sizing: border-box;
`;

const Bottom = styled.div`
  height: 13vh;
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
`;

const BottomBox = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: space-around;
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  margin: 1rem;
  height: 50px;
  border-radius: 50%;
  background-color: #333;
  color: white;
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    background-color: #3c4043;
  }

  ${(props) =>
    props.primary &&
    `
      background-color: red;
      color: white;
      &:hover{
          background-color: red;
      }
    `}
`;
class OnlineMeeting extends Component {
  render() {
    return (
      <div style={boxStyle}>
        <div>
          {this.state.session === undefined ? <div></div> : null}
          <div>방송 ({this.state.member}명)</div>
          <div style={flexBox}>
            <div style={videoBox}>
              {this.state.session !== undefined ? (
                this.state.publisher !== undefined ? (
                  <StreamContainer key={this.state.publisher.stream.streamId}>
                    <UserVideoComponent streamManager={this.state.publisher} />
                  </StreamContainer>
                ) : (
                  <div />
                )
              ) : null}
            </div>
            <div>
              {this.state.publisher !== undefined ? (
                <StreamChat user={this.state.publisher}></StreamChat>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
        <Bottom>
          <BottomBox>
            <Icon
              primary={!this.state.isCamera}
              onClick={() => this.handleToggle("camera")}
            >
              {this.state.isCamera ? (
                <VideocamOutlinedIcon />
              ) : (
                <VideocamOffOutlinedIcon />
              )}
            </Icon>

            <Icon
              primary={!this.state.isMike}
              onClick={() => this.handleToggle("mike")}
            >
              {this.state.isMike ? <MicOutlinedIcon /> : <MicOffIcon />}
            </Icon>

            <Icon
              primary={!this.state.isSpeaker}
              onClick={() => this.handleToggle("speaker")}
            >
              {this.state.isSpeaker ? <HeadsetIcon /> : <HeadsetOffIcon />}
            </Icon>
            <Icon onClick={this.recoding}>
              <TheatersIcon />
            </Icon>
            <Icon primary onClick={this.leaveSession}>
              <CallEndIcon />
            </Icon>
            <Icon
              onClick={() => {
                document.getElementsByTagName("video")[0].requestFullscreen();
              }}
            >
              <FullscreenIcon />
            </Icon>
          </BottomBox>
        </Bottom>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.userRef = React.createRef();

    this.state = {
      mySessionId: "SessionA",
      myUserName: undefined,
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined, // 로컬 웹캠 스트림
      subscribers: [], // 다른 사용자의 활성 스트림
      isMike: true,
      isCamera: true,
      isSpeaker: true,
      isChat: false,
      member: undefined,
    };
    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.recoding = this.recoding.bind(this);
  }

  componentDidMount() {
    const productId = window.location.href.split("/")[5];
    this.productId = productId;

    this.joinSession();
    let timer = setInterval(() => {
      axios
        .get(OPENVIDU_SERVER_URL + `api/sessions/count/${productId}`)
        .then((res) => {
          this.setState({ member: res.data.result.count });
          console.log(res.data.result.count);
        });

      //  this.setState({ member: this.state.session.remoteConnections.size });
    }, 5000);
    this.timer = timer;
  }

  componentWillUnmount() {
    this.leaveSession();
  }

  onbeforeunload(e) {
    this.leaveSession();
  }

  // 화상회의 나갈때
  leaveSession() {
    if (this.state.publisher == undefined) {
      return;
    }
    clearInterval(this.timer);
    let reqbody = { token: this.token, productId: this.productId };
    console.log(reqbody);
    console.log(this.state);

    axios
      .post(OPENVIDU_SERVER_URL + "api/sessions/remove-user-pub", reqbody)
      .then((res) => {
        console.log(res.data.result.msg);
      })
      .catch(() => {});

    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: undefined,
      myUserName: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
    });
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    console.log("123", index);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({ subscribers: subscribers });
    }
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({ mainStreamManager: stream });
    }
  }

  handleToggle(kind) {
    if (this.state.publisher) {
      switch (kind) {
        case "camera":
          this.setState({ isCamera: !this.state.isCamera }, () => {
            console.log(this.state.publisher);
            this.state.publisher.publishVideo(this.state.isCamera);
          });
          break;

        case "speaker":
          this.setState({ isSpeaker: !this.state.isSpeaker }, () => {
            this.state.subscribers.forEach((s) =>
              s.subscribeToAudio(this.state.isSpeaker)
            );
          });
          break;

        case "mike":
          this.setState({ isMike: !this.state.isMike }, () => {
            this.state.publisher.publishAudio(this.state.isMike);
          });
          break;
      }
    }
  }

  joinSession() {
    if (this.state.publisher !== undefined) return;
    this.OV = new OpenVidu(); // OpenVidu 객체를 얻음

    this.OV.setAdvancedConfiguration({
      publisherSpeakingEventsOptions: {
        interval: 50,
        threshold: -75,
      },
    });

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        let mySession = this.state.session;
        let subscriber;
        // Session 객체가 각각 새로운 stream에 대해 구독 후, subscribers 상태값 업뎃
        mySession.on("streamCreated", (e) => {
          // OpenVidu -> Session -> 102번째 줄 확인 UserVideoComponent를 사용하기 때문에 2번째 인자로 HTML
          // 요소 삽입X
          subscriber = mySession.subscribe(e.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          this.setState({ subscribers });

          console.log(subscribers);
        });

        // 사용자가 화상회의를 떠나면 Session 객체에서 소멸된 stream을 받아와 subscribers 상태값 업뎃
        mySession.on("streamDestroyed", (e) => {
          this.deleteSubscriber(e.stream.streamManager);

          this.state.session.unsubscribe(subscriber);
        });

        // 서버 측에서 비동기식 오류 발생 시 Session 객체에 의해 트리거되는 이벤트
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        this.pubGetToken().then((token) => {
          mySession
            .connect(token, {
              clientData: this.state.myUserName,
            })
            .then(() => {
              let publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined,
                videoSource: undefined, // 웹캠 기본 값으로
                publishAudio: true,
                publishVideo: true,
                resolution: "940x480",
                frameRate: 30,
                insertMode: "APPEND",
                mirror: "false",
              });

              mySession.publish(publisher);

              this.setState({ mainStreamManager: publisher, publisher });
            })
            .catch((error) => {
              this.leaveSession();
              console.log("세션 연결 오류", error.code, error.message);
            });
        });
      }
    );
  }
  // async getToken() {
  //   const sessionId = await this.createSession(this.state.mySessionId);
  //   return await this.createToken(sessionId);
  // }
  async pubGetToken() {
    const response = await axios
      .post(OPENVIDU_SERVER_URL + "api/sessions/get-token-pub", this.productId)
      .catch(() => {
        this.leaveSession();
      });
    this.token = response.data.result.token;

    console.log(response);
    return response.data.result.token;
  }
  async recoding() {
    const response = await axios.post(
      OPENVIDU_SERVER_URL + "api/sessions/recording",
      this.productId
    );

    console.log(response.data.result.msg);
  }
}

export default OnlineMeeting;
