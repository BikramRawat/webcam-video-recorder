import React from "react";
import { useTimer } from "react-timer-hook";

function MyTimer({ expiryTimestamp }) {
  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });
  // const timeStamp = () => {
  //   const time = new Date();
  //   time.setSeconds(time.getSeconds() + expiryTimestamp);
  //   restart(time);
  // };
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "25px" }}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
      {/* <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button> */}
      <button
        className="btn-timer"
        onClick={() => {
          const time = new Date();
          time.setSeconds(time.getSeconds() + expiryTimestamp);
          restart(time);
        }}
      >
        Start Recording
      </button>
    </div>
  );
}

export default MyTimer;
