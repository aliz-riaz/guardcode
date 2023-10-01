import React from "react";
import ReviewAndConfirmShiftsCard from "./ReviewAndConfirmShiftsCard";
import styles from "./ReviewAndConfirmShiftList.module.scss";
//
function ReviewAndConfirmShiftList(props) {
  return (
    <div className={`${styles.table} table-responsive`}>
      <table className="w-100 table table-borderless">
        <thead>
          <tr>
            <th>Date</th>
            <th>Start</th>
            <th>End</th>
            <th>Workers required</th>
            <th>Total hours</th>
            <th>Wages</th>
          </tr>
        </thead>
        <tbody>
          <ReviewAndConfirmShiftsCard />
        </tbody>
      </table>
    
    </div>
  );
}

export default ReviewAndConfirmShiftList;
  