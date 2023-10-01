import React from "react";
import { connect } from "react-redux";
import RoleDetails from "./RoleDetails";
import SiteDetails from "./SiteDetails";
import VenueEnvType from "../Step01/VenueEnvType";
import NextBackBtn from "../GlobalComponents/NextBackBtn";
import { useQueryClient } from "@tanstack/react-query";

import { Formik } from "formik";
import {
  setShiftCal,
  setShiftPostingArray,
  setShiftExternalCharges,
} from "../../../../redux/actions/shiftActions";
import AddShiftList from "../Step01/AddShiftList";
import usePayCalculate from "../../../../hooks/Shifts/ShiftPosting/usePayCalculate";

function ShowingShiftDetails(props) {
  const { mutate } = usePayCalculate(props.setShiftExternalCharges);
  const calculations = props.shiftPostingArray.map((item) => {
    const start_time = item.time_start;
    const end_time = item.time_end;

    const startDate = new Date(`1970-01-01T${start_time}`);
    const endDate = new Date(`1970-01-01T${end_time}`);

    // Check if end time is earlier than start time and add a day to end time
    if (endDate < startDate) {
      endDate.setDate(endDate.getDate() + 1);
    }
    const duration = endDate - startDate;
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

    const working_hour = hours + "." + (minutes < 10 ? "0" : "") + minutes;
    const pay_rate = parseInt(item.pay_rate);

    return { working_hour, pay_rate };
  });

  const obj = {
    slots: calculations,
  };

  const handleSubmit = () => {
    props.setShiftCal(calculations);
          props.setPostShiftActiveStep(2);

  };
  return (
    <>
      <Formik>
        <div className={`main-inner-content`}>
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className={`bg-white p-4 pb-0 `}>
                <SiteDetails />
                <RoleDetails />
                <VenueEnvType />
                <AddShiftList
                  setPostShiftActiveStep={props.setPostShiftActiveStep}
                  postShiftActiveStep={props.postShiftActiveStep}
                  values={props.shiftPostingArray}
                  shiftActions={false}
                />
                <NextBackBtn
                  postShiftActiveStep={2}
                  setPostShiftActiveStep={props.setPostShiftActiveStep}
                  handleSubmit={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </Formik>
    </>
  );
}

const mapStateToProps = (state) => ({
  shiftPostingArray: state.vantage.shiftReducer.shiftPostingArray,
  calculations: state.vantage.shiftReducer.calculations,
  shiftExternalCharge: state.vantage.shiftReducer.shiftExternalCharge,
});

const mapDispatchToProps = (dispatch) => ({
  setShiftPostingArray: (data) => dispatch(setShiftPostingArray(data)),
  setShiftCal: (data) => dispatch(setShiftCal(data)),
  setShiftExternalCharges: (data) => dispatch(setShiftExternalCharges(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowingShiftDetails);
