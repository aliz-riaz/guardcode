import React from "react";
import { connect } from "react-redux";
// import styles from "./ReviewAndConfirm.module.scss";
import styles from "./ReviewAndConfirmShiftList.module.scss";

//shifts list showing on summary page card 
function ReviewAndConfirmShiftsCard(props) {
  const working_hour = props.calculations?.map((cal, i) => cal.working_hour);
  return props.shiftPostingArray?.map((shift, i) => {
    return (
      <tr key={i} className={`${styles.shiftsDetail}`}>
        <td>{shift.date_start}</td>
        <td>
          {shift.time_start}
          {parseInt(shift.time_start.split(":")[0]) >= 12 ? " PM" : " AM"}
        </td>
        <td>
          {shift.time_end}
          {parseInt(shift.time_end.split(":")[0]) >= 12 ? " PM" : " AM"}
        </td>
        <td>{shift.workers_required}</td>
        <td>{`${working_hour[i]} hrs/£${shift.pay_rate} per hour`}</td>
        <td>&pound;{(shift.pay_rate * working_hour[i]).toFixed(2)}</td>
      </tr>
    );
  });
}

const mapStateToProps = (state) => ({
  shiftPostingArray: state.vantage.shiftReducer.shiftPostingArray,
  calculations: state.vantage.shiftReducer.calculations,
});
const mapDispatchToProps = (dispatch) => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewAndConfirmShiftsCard);
