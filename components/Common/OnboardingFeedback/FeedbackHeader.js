import React from "react";
import styles from "./FeedbackHeader.module.scss";

const FeedbackHeader = ({ currentStep, totalNoOfSteps, showHeader }) => {
  if (currentStep == 1) {
    return null;
  }

  let stepIcons = Array.from(
    { length: totalNoOfSteps - 1 },
    (_, index) => index + 1
  );

  return (
    <div
      className={`${styles.feedback_header} ${
        showHeader && "justify-content-between"
      }`}
    >
      {showHeader && (
        <div className={`${styles.steps_count}`}>
          <p className="mr-2">
            Steps {currentStep - 1} of {totalNoOfSteps - 1}{" "}
          </p>
          {stepIcons.map(function (number) {
            return (
              <span
                className={
                  currentStep - 1 >= number
                    ? `${styles.active}`
                    : `${styles.inactive}`
                }
              ></span>
            );
          })}
        </div>
      )}

      {/* <button type="button" onClick={backBtnClickHandler}>
        Back
      </button> */}
    </div>
  );
};

export default FeedbackHeader;
