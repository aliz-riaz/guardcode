import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

function ProgressBar(props) {
  const [bookingActiveStep, SetBookingActiveStep] = useState();
  useEffect(() => {
    // props.updateNumberOfSeatsAction(noOfSeatsValue);
    SetBookingActiveStep(props.booking_active_step);
  }, [props.booking_active_step]);
  return (
    <>
      <div className="booking-steps">
        <ul>
          <li className={bookingActiveStep >= 1 ? "active" : ""}>
            <span className="circle"></span>
            <span className="step_name">Select a course</span>
          </li>
          {/* <li className="current"> */}
          <li className={bookingActiveStep >= 2 ? "active" : ""}>
            <span className="circle"></span>
            <span className="step_name">Select dates</span>
          </li>
          <li className={bookingActiveStep >= 3 ? "active" : ""}>
            <span className="circle"></span>
            <span className="step_name">Attendees</span>
          </li>
          <li className={bookingActiveStep >= "4" ? "active" : ""}>
            <span className="circle"></span>
            <span className="step_name">Pay & Confirm </span>
          </li>
        </ul>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  booking_active_step: state.vantage.bookingReducer.booking_active_step,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar);
