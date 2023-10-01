import React from "react";
import styles from "./ShiftDetails.module.scss";
function ShiftDetails({
  mainHeading,
  firstDivHeading,
  firstDivPera,
  secondDivHeading,
  secondDivPera,
  thirdDivHeading,
  thirdDivPera,
  contactNumber,
  fourthDivHeading,
  license,
  change,
}) {
  return (
    <div className={`${styles.shiftDetailsWrapper}`}>
      <h3>{mainHeading}</h3>
      <div className="row">
        {/* <div className="col-md-4 ">
          <h3>{firstDivHeading}</h3>
          <p>
            {firstDivPera} <br /> {license}
          </p>
        </div> */}
        <div className="col-md-4">
          <h3>{secondDivHeading}</h3>
          <p>{secondDivPera}</p>
        </div>
        <div
          className="col-md-4
        "
        >
          <h3>{thirdDivHeading}</h3>
          <p>
            {thirdDivPera} {contactNumber}
          </p>

        </div>
        {fourthDivHeading && (
          <div
            className="col-md-4
        "
          >
            <h3 className="p-0">{fourthDivHeading}</h3>
            {license}
          </div>
        )}
      </div>
    </div>
  );
}

export default ShiftDetails;
