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
  const [timer, setTimer] = React.useState(150);
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
  };
  timer === 0 && stopRecording();
  return (
    <>
      <p className="logo">Jobeffekt.dk</p>
      <div className="outer-container">
        <div className="webcam-container">
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
                recordWebcam.status === CAMERA_STATUS.CLOSED ||
                recordWebcam.status === CAMERA_STATUS.PREVIEW
              }
              onClick={recordWebcam.close}
            >
              Close Camera
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
              disabled={recordWebcam.status !== CAMERA_STATUS.RECORDING}
              onClick={recordWebcam.stop}
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
          <div className="cam-status">
            <div>
              <h3>
                Camera status :{" "}
                <span className="cam-status-1">{recordWebcam.status}</span>
              </h3>
            </div>
            <div>
              <h3>
                Remaining time = <span>{minutes}m</span>:<span>{seconds}s</span>
              </h3>
            </div>
          </div>
        </div>
        <div>
          <InstructionsLines />
        </div>
      </div>
    </>
  );
};
