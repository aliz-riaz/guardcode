import React, { useState } from "react";
import AddShiftForm from "./Step01/AddShiftForm";
import ReviewAndConfirm from "./Step03/ReviewAndConfirm";
import AllDone from "./Step04/AllDone";
import { connect } from "react-redux";
import { setShiftActiveStep } from "../../../redux/actions/shiftActions";
import DiscardComponentorShiftPost from "./GlobalComponents/DiscardComponentorShiftPost";

const ShiftPosting = (props) => {
  // const [postShiftActiveStep, setPostShiftActiveStep] = useState(1);

  return (
    <div className="main-content">
      <DiscardComponentorShiftPost />
      <div className="booking-steps">
        <ul>
          <li className={props.postShiftActiveSteps >= 1 ? "active" : ""}>
            <span className="circle"></span>
            <span className="step_name">Add Shift</span>
          </li>
          <li className={props.postShiftActiveSteps >= 2 ? "active" : ""}>
            <span className="circle"></span>
            <span className="step_name">Review & Confirm</span>
          </li>
        </ul>
      </div>

      {(() => {
        switch (props.postShiftActiveSteps) {
          case 1:
            return (
              <AddShiftForm
                postShiftActiveStep={props.postShiftActiveStep}
                setPostShiftActiveStep={props.setShiftActiveStep}
              />
            );
            break;

          case 2:
            return (
              <ReviewAndConfirm
                postShiftActiveStep={props.postShiftActiveStep}
                setPostShiftActiveStep={props.setPostShiftActiveStep}
              />
            );
          case 3:
            return (
              <AllDone
                postShiftActiveStep={props.postShiftActiveStep}
                setPostShiftActiveStep={props.setPostShiftActiveStep}
              />
            );

          default:
            return; // You can provide a default component or null for other values
        }
      })()}
    </div>
  );
};

const mapStateToProps = (state) => ({
  showCreateRole: state.vantage.shiftReducer.showCreateRole,
  user_token: state.vantage.userDataReducer.user_token,
  postShiftActiveSteps: state.vantage.shiftReducer.postShiftActiveSteps,
});
const mapDispatchToProps = (dispatch) => ({
  setShowCreateRole: (show) => dispatch(setShowCreateRole(show)),
  setShiftActiveStep: (step) => dispatch(setShiftActiveStep(step)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShiftPosting);
