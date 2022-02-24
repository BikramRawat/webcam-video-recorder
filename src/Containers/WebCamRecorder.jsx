import React from "react";
import "../Styles/styles.css";
import InstructionsLines from "../Components/InstructionsLines";
import { useRecordWebcam, CAMERA_STATUS } from "react-record-webcam";

const OPTIONS = {
  filename: "test-filename",
  fileType: "mp4",
  // recordingLength: 30,
  width: 1920,
  height: 1080,
};

export const WebCamRecorder = () => {
  const recordWebcam = useRecordWebcam(OPTIONS);
  const [timer, setTimer] = React.useState(100);
  const [intervalId, setIntervalId] = React.useState();

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  const webCamTimer = () => {
    const timerId = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
    setIntervalId(timerId);
  };

  const stopRecording = () => {
    clearInterval(intervalId);
    recordWebcam.stop();
    setTimer(100);
  };

  timer === 0 && stopRecording();
  const elem = document.getElementById("myBar");
  if (recordWebcam.status === CAMERA_STATUS.RECORDING) {
    elem.style.width = (100 - timer) / 1 + "%";
    elem.innerHTML = Math.floor((100 - timer) / 1) + "%";
  } else if (
    recordWebcam.status === CAMERA_STATUS.PREVIEW ||
    recordWebcam.status === CAMERA_STATUS.RECORDING
  ) {
    elem.style.width = 0 + "%";
    elem.innerHTML = 0 + "%";
  }

  return (
    <>
      <p className="logo">Jobeffekt.dk</p>
      <div className="outer-container">
        <div className="webcam-container">
          <div>
            <button
              type="button"
              className="control-btns"
              onClick={() => console.log("Go Back to previous page")}
            >
              Go Back
            </button>
          </div>
          <h3 className="title">Video Ansøgning: Jobeffekt.dk</h3>
          <div className="btns-section">
            <button
              className="btns"
              disabled={
                recordWebcam.status === CAMERA_STATUS.OPEN ||
                recordWebcam.status === CAMERA_STATUS.RECORDING ||
                recordWebcam.status === CAMERA_STATUS.PREVIEW
              }
              onClick={recordWebcam.open}
            >
              Open Camera
            </button>
            <button
              className="btns"
              disabled={
                recordWebcam.status === CAMERA_STATUS.RECORDING ||
                recordWebcam.status === CAMERA_STATUS.PREVIEW
              }
              onClick={() => {
                recordWebcam.start();
                webCamTimer();
              }}
            >
              Start Recording
            </button>
            <button
              className="btns"
              onClick={() => {
                recordWebcam.stop();
                stopRecording();
              }}
            >
              Stop Recording
            </button>
            <button
              className="btns"
              disabled={recordWebcam.status !== CAMERA_STATUS.PREVIEW}
              onClick={recordWebcam.retake}
            >
              Retake
            </button>
            <button
              className="btns"
              disabled={recordWebcam.status !== CAMERA_STATUS.PREVIEW}
              onClick={recordWebcam.download}
            >
              Download
            </button>
          </div>
          <div className="webcam-thumbnail">
            <video
              ref={recordWebcam.webcamRef}
              style={{
                display: `${
                  recordWebcam.status === CAMERA_STATUS.OPEN ||
                  recordWebcam.status === CAMERA_STATUS.RECORDING
                    ? "block"
                    : "none"
                }`,
              }}
              autoPlay
              muted
            />
            <video
              ref={recordWebcam.previewRef}
              style={{
                display: `${
                  recordWebcam.status === CAMERA_STATUS.PREVIEW
                    ? "block"
                    : "none"
                }`,
              }}
              controls
            />
          </div>
          <div id="myProgress">
            <div id="myBar"></div>
          </div>
          <div className="cam-status">
            <div>
              {recordWebcam.status === CAMERA_STATUS.RECORDING && (
                <div className="blinking"> </div>
              )}
            </div>
            <div>
              {recordWebcam.status !== CAMERA_STATUS.RECORDING && (
                <h4>Camera Status: {recordWebcam.status}</h4>
              )}
            </div>
            <div>
              <h3>
                Remaining time = <span>{minutes}m</span>:<span>{seconds}s</span>
              </h3>
            </div>
            <button
              type="submit"
              value="Submit"
              className="control-btns"
              onClick={() => {
                console.log("Your video application is submitted successfully");
              }}
            >
              SUBMIT
            </button>
          </div>
        </div>
        <div>
          <InstructionsLines />
        </div>
      </div>
    </>
  );
};
