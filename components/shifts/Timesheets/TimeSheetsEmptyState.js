import React from "react";
import styles from "./TimeSheetsEmptyState.module.scss";

function TimeSheetEmptyStates() {
  return (
    <div className={styles.empty_state}>
      <img
        src={`${process.env.APP_URL}/images/empty_timesheet.svg`}
        className="img-fluid"
      />
      <p>
        Timesheets are currently unavailable. They will{" "}
        <br className="d-none d-lg-block" /> be updated here once workers have
        finished <br className="d-none d-lg-block" /> their shifts.
      </p>
    </div>
  );
}

export default TimeSheetEmptyStates;
