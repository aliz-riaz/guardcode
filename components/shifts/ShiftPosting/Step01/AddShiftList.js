import React from "react";
import { connect } from "react-redux";
import AddShift from "./AddShiftCard.js";
import { setShiftPostingArray } from "../../../../redux/actions/shiftActions";
import styles from "./AddShift.module.scss";

const AddShiftList = (props) => {
  return (
    <div>
      <h4 className={`${styles.h4}`}>Add Shifts</h4>
      {/* map on formik initial value (shifts) */}
      {props.values &&
        props.values?.map((shift, index) => {
          return (
            //addShiftCard component
            <AddShift
              key={index}
              shift={shift}
              index={index}
              values={props.values}
              setFieldValue={props.setFieldValue}
              arrayHelpers={props.arrayHelpers}
            />
          );
        })}
      <div className="cursor-pointer mt-4">
        <span
          className={`${styles.add_shift_btn} mt-4`}
          onClick={() => {
            props.setShiftPostingArray([
              ...props.shiftPostingArray,
              {
                date_start: "",
                date_end: "2023-08-22",
                time_start: "",
                time_end: "",
                paid_break: 0,
                workers_required: 1,
                pay_rate: "",
              },
            ]);
          }}
        >
          <img
            src={`${process.env.APP_URL}/images/addshift-icon.svg`}
            alt="addshift-icon"
            className="cursor-pointer"
          />
          Add another shift
        </span>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  shiftPostingArray: state.vantage.shiftReducer.shiftPostingArray,
  calculations: state.vantage.shiftReducer.calculations,
});

const mapDispatchToProps = (dispatch) => ({
  setShiftPostingArray: (data) => dispatch(setShiftPostingArray(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddShiftList);
