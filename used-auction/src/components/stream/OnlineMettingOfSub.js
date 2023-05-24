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
import ChatIcon from "@mui/icons-material/Chat";
import { withRouter } from "react-router-dom";

// 로컬 미디어 서버 주소
const OPENVIDU_SERVER_URL = "https://usedauction.shop/";

const Container = styled.div`
  height: 70vh;
  width: 85%;
  margin: 0 auto;
  background-color: #202124;
  margin-bottom: 50px;
`;

const Header = styled.div`
  height: 8vh;
  display: flex;
  align-items: center;
  padding: 0 50px;
  justify-content: center;
`;

const StudyTitle = styled.p`
  color: white;
  font-size: 20px;
  font-weight: 600;
`;

const Middle = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
`;

const VideoContainer = styled.div`
  margin-top: 30px;
  margin-right: 100px;
  margin-left: 100px;
  width: 100%;
  height: 40vh;
  overflow: hidden;
  display: flex;

  justify-content: center;
`;

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
  width: 20%;
  align-items: center;
  justify-content: space-around;
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
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
      <Container>
        <Header>
          <StudyTitle>방송 ({this.state.member}명)</StudyTitle>
        </Header>
        <Middle>
          {this.state.session === undefined ? (
            <div
              style={{
                position: "absolute",
                right: "0",
                left: "0",
                width: "300px",
                margin: "auto",
                height: "300px",
              }}
              id="join"
            ></div>
          ) : null}

          <VideoContainer>
            {this.state.session !== undefined ? (
              <div>
                {this.state.publisher !== undefined ? (
                  <StreamContainer key={this.state.publisher.stream.streamId}>
                    <UserVideoComponent streamManager={this.state.publisher} />
                  </StreamContainer>
                ) : (
                  this.state.subscribers.map((sub, i) => {
                    return (
                      <StreamContainer key={sub.stream.streamId}>
                        <UserVideoComponent streamManager={sub} />
                      </StreamContainer>
                    );
                  })
                )}
              </div>
            ) : null}
          </VideoContainer>
          {this.state.subscriber !== undefined ? (<StreamChat user={this.state.subscriber}></StreamChat>) : <div/>}
        </Middle>
        <Bottom>
          <BottomBox>
            <Icon
              primary={!this.state.isCamera}
              onClick={() => {
                this.subJoinSession();
              }}
            >
              <VideocamOutlinedIcon />
            </Icon>
            <Icon primary onClick={this.leaveSession}>
              <CallEndIcon />
            </Icon>
          </BottomBox>
        </Bottom>
      </Container>
    );
  }

  constructor(props) {
    console.log(props, "1");
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
      subscriber: undefined,
    };
    this.subJoinSession = this.subJoinSession.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    const productId = window.location.href.split("/")[6];
    this.productId = productId;

    // window.addEventListener("beforeunload", this.onbeforeunload);
    window.onbeforeunload = (event) => {
      this.leaveSession();
    };
    console.log(this);
    let timer = setInterval(() => {
      axios
        .get(OPENVIDU_SERVER_URL + `api/sessions/count/${productId}`)
        .then((res) => {
          this.setState({ member: res.data.result.count });
          console.log(res.data.result.count);
        });

      //  this.setState({ member: this.state.session.remoteConnections.size });
    }, 3000);
    this.timer = timer;
  }
  onbeforeunload(e) {
    this.leaveSession();
  }
  componentWillUnmount() {
    this.leaveSession();
  }
  // 화상회의 나갈때
  leaveSession() {
    if (this.state.subscribers.length < 1) {
      return;
    }
   
    clearInterval(this.timer);
    const mySession = this.state.session;

    mySession.disconnect();

    let reqbody = { token: this.token, productId: this.productId };
    console.log(this.state);

    axios
      .post(OPENVIDU_SERVER_URL + "api/sessions/remove-user-sub", reqbody)
      .then((res) => {
        console.log(res.data.result.msg);
      });
    // .then((res) => {
    //   axios
    //     .get(OPENVIDU_SERVER_URL + `api/sessions/count/${this.productId}`)
    //     .then((res) => console.log("count:", res.data.result.count));
    // });
    console.log(this.state.session);

    //this.state.session.unsubscribe(this.state.session.subscriber);
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
  subJoinSession() {
    if (this.state.subscribers.length !== 0) return;
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
          subscriber = mySession.subscribe(e.stream, undefined);

          subscriber.on("videoElementCreated", (event) => {
            console.log(event);
          });
          this.setState({ subscriber });
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          this.setState({ subscribers });

          console.log("연결함", subscribers);
          // let mySession = this.state.session;

          // // Session 객체가 각각 새로운 stream에 대해 구독 후, subscribers 상태값 업뎃
          // mySession.on("streamCreated", (e) => {
          //   // OpenVidu -> Session -> 102번째 줄 확인 UserVideoComponent를 사용하기 때문에 2번째 인자로 HTML
          //   // 요소 삽입X
          //   this.setState({subscriber :mySession.subscribe(e.stream, undefined)});

          //   this.state.subscriber.on("videoElementCreated", (event) => {
          //     console.log(event);
          //   });
          //   var subscribers = this.state.subscribers;
          //   subscribers.push(this.state.subscriber);

          //   this.setState({ subscribers });

          //   console.log("연결함", subscribers);
        });

        // 사용자가 화상회의를 떠나면 Session 객체에서 소멸된 stream을 받아와 subscribers 상태값 업뎃
        mySession.on("streamDestroyed", (e) => {
          this.deleteSubscriber(e.stream.streamManager);
          this.state.session.unsubscribe(this.state.subscriber);
        });

        // 서버 측에서 비동기식 오류 발생 시 Session 객체에 의해 트리거되는 이벤트
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        this.subGetToken().then((token) => {
          mySession
            .connect(token, {
              clientData: this.state.myUserName,
            })
            .then(() => {})
            .catch((error) => {
              console.log("세션 연결 오류", error.code, error.message);
            });
        });
      }
    );
  }

  async subGetToken() {
    const response = await axios.post(
      OPENVIDU_SERVER_URL + "api/sessions/get-token-sub",
      this.productId
    );
    this.token = response.data.result.token;

    return response.data.result.token;
  }
}

export default OnlineMeeting;
