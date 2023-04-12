import { Button, Layout, Menu } from "antd";
import { PageHeader } from '@ant-design/pro-layout';
import React, { location, useState, useEffect } from "react";
import { WebRtcPeer, KurentoClient } from 'kurento-utils'
import pic from "../../img/webrtc.png";
var kurentoUtils =require('kurento-utils')

const Streaming = () => {
  // const location =useState();
  const ws = new WebSocket('wss://' + "usedauction.shop:8443" + '/call');
  const [wsState, setWsState] = useState(true);
  const [prevStateID, setPrevStateID] = useState(" ");
  var video;
  var webRtcPeer;

  useEffect(() => {
    video = document.getElementById('video');
    console.log(video);
    console.log(window.location); 

    console.log("Trying to open ws");
    setWsState(true);

    ws.onopen = () => {
      console.log('ws opened');
      if(prevStateID == "presenter"){
        presenter();
      }
      else if(prevStateID == "viewer"){
        viewer();
      }
      else if(prevStateID == "stop"){
        stop();
      }
      else{

      }
    };

    ws.onclose = (event) => {
      // Parse event code and log
      setTimeout(() => {setWsState(false)}, 5000)
      console.log('ws closed');
    }

  }, [wsState]);

  // window.onload = function() {
  //   //console = new Console();
  //   video = document.getElementById('video');
  //   console.log(video);
  //   console.log(location);
  // }

  window.onbeforeunload = function() {
    ws.close();
  }

  ws.onmessage = function(message) {
    var parsedMessage = JSON.parse(message.data);
    console.info('Received message: ' + message.data);

    switch (parsedMessage.id) {
    case 'presenterResponse':
      presenterResponse(parsedMessage);
      break;
    case 'viewerResponse':
      viewerResponse(parsedMessage);
      break;
    case 'iceCandidate':
      webRtcPeer.addIceCandidate(parsedMessage.candidate, function(error) {
        if (error)
          return console.error('Error adding candidate: ' + error);
      });
      break;
    case 'stopCommunication':
      dispose();
      break;
    default:
      console.error('Unrecognized message', parsedMessage);
    }
  }

  function presenterResponse(message) {
    if (message.response != 'accepted') {
      var errorMsg = message.message ? message.message : 'Unknow error';
      console.info('Call not accepted for the following reason: ' + errorMsg);
      dispose();
    } else {
      webRtcPeer.processAnswer(message.sdpAnswer, function(error) {
        if (error)
          return console.error(error);
      });
    }
  }

  function viewerResponse(message) {
    if (message.response != 'accepted') {
      var errorMsg = message.message ? message.message : 'Unknow error';
      console.info('Call not accepted for the following reason: ' + errorMsg);
      dispose();
    } else {
      webRtcPeer.processAnswer(message.sdpAnswer, function(error) {
        if (error)
          return console.error(error);
      });
    }
  }

  function presenter() {
    if (!webRtcPeer) {
      console.log(video);
      showSpinner(video);

      var options = {
        localVideo : video,
        onicecandidate : onIceCandidate
      }
      webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options,
          function(error) {
            if (error) {
              return console.error(error);
            }
            webRtcPeer.generateOffer(onOfferPresenter);
          });

      enableStopButton();
    }
  }

  function onOfferPresenter(error, offerSdp) {
    if (error)
      return console.error('Error generating the offer');
    console.info('Invoking SDP offer callback function ' + window.location.host);
    var message = {
      id : 'presenter',
      sdpOffer : offerSdp
    }
    setPrevStateID("presenter");
    sendMessage(message);
  }

  function viewer() {
    if (!webRtcPeer) {
      showSpinner(video);

      var options = {
        remoteVideo : video,
        onicecandidate : onIceCandidate
      }
      webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options,
          function(error) {
            if (error) {
              return console.error(error);
            }
            this.generateOffer(onOfferViewer);
          });

      enableStopButton();
    }
  }

  function onOfferViewer(error, offerSdp) {
    if (error)
      return console.error('Error generating the offer');
    console.info('Invoking SDP offer callback function ' + window.location.host);
    var message = {
      id : 'viewer',
      sdpOffer : offerSdp
    }
    setPrevStateID("viewer");
    sendMessage(message);
  }

  function onIceCandidate(candidate) {
    console.log("Local candidate" + JSON.stringify(candidate));

    var message = {
      id : 'onIceCandidate',
      candidate : candidate
    };
    sendMessage(message);
  }

  function stop() {
    var message = {
      id : 'stop'
    }
    setPrevStateID("stop");
    sendMessage(message);
    dispose();
  }

  function dispose() {
    if (webRtcPeer) {
      webRtcPeer.dispose();
      webRtcPeer = null;
      ws.close();
    }
    hideSpinner(video);

    disableStopButton();
  }

  function disableStopButton() {
    enableButton('#presenter', 'presenter()');
    enableButton('#viewer', 'viewer()');
    disableButton('#stop');
  }

  function enableStopButton() {
    disableButton('#presenter');
    disableButton('#viewer');
    enableButton('#stop', 'stop()');
  }

  function disableButton(id) {
    // $(id).attr('disabled', true);
    // $(id).removeAttr('onclick');
  }

  function enableButton(id, functionName) {
    // $(id).attr('disabled', false);
    // $(id).attr('onclick', functionName);
  }

  function sendMessage(message) {
    var jsonMessage = JSON.stringify(message);
    console.log('Sending message: ' + jsonMessage);
    //if (!isOpen(ws)) return;
    ws.send(jsonMessage);
  }

  function showSpinner() {
    for (var i = 0; i < arguments.length; i++) {
      arguments[i].poster = '../../img/transparent-1px.png';
      arguments[i].style.background = 'center transparent url("../../img/spinner.gif") no-repeat';
    }
  }

  function hideSpinner() {
    for (var i = 0; i < arguments.length; i++) {
      arguments[i].src = '';
      arguments[i].poster = '../../img/webrtc.png';
      arguments[i].style.background = '';
    }
  }

  function isOpen(ws) { return ws.readyState === ws.OPEN }

  return (
    <div>
      <div>
        <Button className="button1" type="primary" onClick={() => presenter()}>presenter</Button>
        <Button className="button2" type="primary" onClick={() => viewer()}>viewer</Button>
        <Button className="button3" type="primary" onClick={() => stop()}>stop</Button>
      </div>
      <div>
      <video id="video" autoPlay width="640px" height="480px"
						poster={pic}></video>
      </div>
    </div>
  );
};
export default Streaming;
