import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import {
  setShiftPostingArray,
  setShiftPostingDeleteArray,
  setShiftCal,
} from "../../../../redux/actions/shiftActions";
import styles from "./AddShift.module.scss";

const AddShift = (props) => {
  //generate minimum shiftDate
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  const minDate = currentDate.toISOString().split("T")[0];

  return (
    <>
      <div
        className={`${styles.addShift_wraper} row p-0 mx-0 mt-0 align-items-center position-relative`}
      >
        <div
          className={`${styles.date_div} col-sm-auto p-0 col-md-12 col-lg-3 col-xl-2 mb-md-4 mb-lg-0 mb-sm-2 mb-3 position-relative`}
        >
          <h5 className={` ${styles.h5}`}>Date</h5>
          <Field
            type="date"
            name={`shifts[${props.index}].date_start`}
            min={minDate}
            value={props.shift.date_start}
            onChange={(e) => {
              const updatedShifts = [...props.values];
              updatedShifts[props.index].date_start = e.target.value;
              props.setFieldValue(
                `shifts[${props.index}].date_start`,
                e.target.value
              );

              props.setShiftPostingArray(updatedShifts);
            }}
          />
          <ErrorMessage
            component="h6"
            className={`${styles.error_text} position-absolute text-danger fw-normal`}
            name={`shifts[${props.index}].date_start`}
          />
        </div>
        <div
          className={`${styles.start_time_div} col-sm-6 col-md-12 p-0 col-lg-3 col-xl-2 mb-md-4 mb-lg-0 mb-sm-2 mb-3 position-relative`}
        >
          <h5 className={` ${styles.h5} `}>Start time</h5>
          <Field
            type="time"
            name={`shifts[${props.index}].time_start`}
            value={props.shift.time_start}
            onChange={(e) => {
              const updatedShifts = [...props.values];
              updatedShifts[props.index].time_start = e.target.value;
              props.setFieldValue(
                `shifts[${props.index}].time_start`,
                e.target.value
              );
              props.setShiftPostingArray(updatedShifts);
            }}
          />
          <ErrorMessage
            component="h6"
            className={`${styles.error_text} position-absolute text-danger fw-normal`}
            name={`shifts[${props.index}].time_start`}
          />
        </div>
        <div
          className={`${styles.end_time_div} col-sm-6 col-md-12 p-0 col-lg-3 col-xl-2 mb-md-4 mb-lg-0 mb-sm-2 mb-3 position-relative p-0`}
        >
          <h5 className={` ${styles.h5} `}> End time</h5>
          <Field
            type="time"
            name={`shifts[${props.index}].time_end`}
            value={props.shift.time_end}
            onChange={(e) => {
              const updatedShifts = [...props.values];
              updatedShifts[props.index].time_end = e.target.value;
              props.setFieldValue(
                `shifts[${props.index}].time_end`,
                e.target.value
              );
              props.setShiftPostingArray(updatedShifts);
            }}
          />
          <ErrorMessage
            component="h6"
            className={`${styles.error_text} position-absolute text-danger fw-normal`}
            name={`shifts[${props.index}].time_end`}
          />
        </div>
        <div
          className={`${styles.paid_break_div} col-sm-6 col-md-12 p-0 col-lg-3 mb-md-3 mb-lg-0 mb-sm-2 mb-2  col-xl-2`}
        >
          <h5 className={` ${styles.h5} `}>
            {" "}
            Paid break <span className={`${styles.mintsHeading}`}>
              (mins)
            </span>{" "}
          </h5>
          <div className="d-flex">
            <Field
              type="number"
              name={`shifts[${props.index}].paid_break`}
              value={props.shift.paid_break}
              // readOnly
              placeholder="00 mins"
              onChange={(e) => {
                const updatedShifts = [...props.values];
                updatedShifts[props.index].paid_break = e.target.value;
                props.setFieldValue(
                  `shifts[${props.index}].paid_break`,
                  e.target.value
                );
                props.setShiftPostingArray(updatedShifts);
              }}
            />
            <button
              type="button"
              disabled={
                props.shift.paid_break == "" &&
                parseInt(props.shift.paid_break) != 0
                  ? true
                  : false
              }
              onClick={() => {
                const updatedShifts = [...props.values];
                updatedShifts[props.index].paid_break =
                  parseInt(props.shift.paid_break) + 1;
                props.arrayHelpers.replace(
                  `shifts[${props.index}].paid_break`,
                  updatedShifts
                );
                props.setShiftPostingArray(updatedShifts);
              }}
            >
              +
            </button>
          </div>
          <ErrorMessage
            component="h6"
            className={`${styles.error_text} position-absolute text-danger fw-normal`}
            name={`shifts[${props.index}].paid_break`}
          />
        </div>
        <div className="p-0 relative col-sm-6 col-md-12 p-0 col-lg-3 col-xl-2 mb-md-3 mb-sm-2 mb-2 mb-lg-0 align-items-center">
          <h5 className={` ${styles.h5} `}> Required worker</h5>
          <div className={`${styles.workers_required_div}`}>
            <button
              className={`${styles.minus_btn}`}
              type="button"
              onClick={() => {
                const updatedShifts = [...props.values];
                if (parseInt(props.shift.workers_required) > 1) {
                  updatedShifts[props.index].workers_required =
                    parseInt(props.shift.workers_required) - 1;
                  props.arrayHelpers.replace(
                    `shifts[${props.index}].workers_required`,
                    updatedShifts
                  );
                  props.setShiftPostingArray(updatedShifts);
                }
              }}
            >
              -
            </button>
            <Field
              type="number"
              name={`shifts[${props.index}].workers_required`}
              value={props.shift.workers_required}
              onChange={(e) => {
                const updatedShifts = [...props.values];
                updatedShifts[props.index].workers_required = e.target.value;
                props.setFieldValue(
                  `shifts[${props.index}].workers_required`,
                  e.target.value
                );
                props.setShiftPostingArray(updatedShifts);
              }}
            />
            <button
              type="button"
              className={`${styles.plus_btn}`}
              onClick={() => {
                const updatedShifts = [...props.values];
                updatedShifts[props.index].workers_required =
                  parseInt(props.shift.workers_required) + 1;
                props.arrayHelpers.replace(
                  `shifts[${props.index}].workers_required`,
                  updatedShifts
                );
                props.setShiftPostingArray(updatedShifts);
              }}
            >
              +
            </button>
          </div>
          <ErrorMessage
            component="h6"
            className={`${styles.error_text} position-absolute text-danger fw-normal`}
            name={`shifts[${props.index}].workers_required`}
          />
        </div>
        <div
          className={`${styles.pay_rate_div} col-sm-6 col-md-12 p-0 col-lg-3 mb-md-3 col-xl-1 mb-sm-2 mb-lg-0 mb-3 relative`}
        >
          <h5 className={` ${styles.h5} `}> Pay rate </h5>
          <Field
            type="number"
            name={`shifts[${props.index}].pay_rate`}
            placeholder="£10.21"
            value={props.shift.pay_rate}
            onChange={(e) => {
              const updatedShifts = [...props.values];
              updatedShifts[props.index].pay_rate = e.target.value;
              props.setFieldValue(
                `shifts[${props.index}].pay_rate`,
                e.target.value
              );
              props.setShiftPostingArray(updatedShifts);
              props.setShiftCal(props.shift.pay_rate);
            }}
          />
          <ErrorMessage
            component="h6"
            className={`${styles.error_text} position-absolute text-danger fw-normal `}
            name={`shifts[${props.index}].pay_rate`}
          />
        </div>

        {/* visible delete-icon when shift more than 1 */}
        {props.shiftPostingArray?.length > 1 && (
          <span className={styles.delete_shift}>
            <img
              src={`${process.env.APP_URL}/images/deleteshift-icon.svg`}
              alt="deleteshift-icon"
              className="cursor-pointer"
              onClick={() => {
                props.setShiftPostingDeleteArray(props.index);
              }}
            />
          </span>
        )}
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  shiftPostingArray: state.vantage.shiftReducer.shiftPostingArray,
  calculations: state.vantage.shiftReducer.calculations,
});
const mapDispatchToProps = (dispatch) => ({
  setShiftPostingArray: (data) => dispatch(setShiftPostingArray(data)),
  setShiftPostingDeleteArray: (index) =>
    dispatch(setShiftPostingDeleteArray(index)),
  setShiftCal: (data) => dispatch(setShiftCal(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddShift);
