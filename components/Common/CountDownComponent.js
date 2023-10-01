import React from "react";
import ReactDOM from "react-dom";
import Countdown, { zeroPad } from "react-countdown";

const CountDownComponent = (props) => {
  // Random component
  const Completionist = () => <span>You are good to go!</span>;

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      props.setShowResent(true);
      return <></>;
    } else {
      // Render a countdown
      return (
        <span className="text-success">
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      );
    }
  };
  return <Countdown date={Date.now() + 120000} renderer={renderer} />;
};

export default React.memo(CountDownComponent);
