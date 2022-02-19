import React from "react";
import MyTimer from "../Components/MyTimer";
import "../Styles/styles.css";
import InstructionsLines from "../Components/InstructionsLines";
import {
  RecordWebcam,
  useRecordWebcam,
  CAMERA_STATUS,
} from "react-record-webcam";
// import Timer from "../Components/Timer";
// import ProgressBar from "../Components/ProgressBar";
// import type {
//   WebcamRenderProps,
//   RecordWebcamOptions,
//   RecordWebcamHook,
// } from "react-record-webcam";

const OPTIONS = {
  filename: "test-filename",
  fileType: "mp4",
  recordingLength: 30,
  width: 1920,
  height: 1080,
};
// const [show,setShow]=React.useState(false);
function Timer1() {
  console.log("hello how are you");
  let timeleft = 60;

  let downloadTimer = setInterval(function function1() {
    let hi = `${timeleft} : seconds`;

    console.log("Remaining time:", hi);
    timeleft -= 1;
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
    }
  }, 1000);
}

export const WebCamRecorder = () => {
  const recordWebcam = useRecordWebcam(OPTIONS);

  // const getRecordingFileHooks = async () => {
  //   const blob = await recordWebcam.getRecording();
  //   console.log({ blob });
  // };

  // const getRecordingFileRenderProp = async (blob) => {
  //   console.log({ blob });
  // };

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
                {
                  recordWebcam.start();
                }
                {
                  Timer1();
                }
              }}
              // <MyTimer expiryTimestamp={90} />;
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
              controls
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
              autoPlay
              muted
              loop
              controls
            />
          </div>
          <div className="cam-status">
            <div>
              Camera status :{" "}
              <span className="cam-status-1">{recordWebcam.status}</span>
            </div>
            <div>
              <MyTimer expiryTimestamp={90} />
            </div>
          </div>
        </div>
        {/* <div>
          <p>The time is = {hi}</p>
        </div> */}
        <div>
          <InstructionsLines />
        </div>
      </div>
    </>
  );
};
