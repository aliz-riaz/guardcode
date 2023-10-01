import moment from "moment/moment";
import React from "react";
import Countdown, { zeroPad } from "react-countdown";
import * as styles from "./AllQuotes.module.scss";

const CountDownExpires = (props) => {
  // Renderer callback with condition
  const momentDate = moment.utc(props.expireAt).valueOf();
  const renderer = ({ formatted: { hours, minutes, seconds }, completed }) => {
    if (completed) {
      props.handleLocalExpireState(true);
      return <></>;
    } else {
      // Render a countdown
      return (
        <ul className={`${styles.CountDownExpires} justify-content-md-center`}>
          <li>
            <span className="mb-1">{zeroPad(hours)}</span>Hours
          </li>
          <li>
            <span className="mb-1">{zeroPad(minutes)}</span>Mins
          </li>
          <li>
            <span className="mb-1">{zeroPad(seconds)}</span>Secs
          </li>
        </ul>
      );
    }
  };
  return <Countdown date={momentDate} daysInHours renderer={renderer} />;
};

export default React.memo(CountDownExpires);
