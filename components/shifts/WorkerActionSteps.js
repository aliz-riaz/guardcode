import React from "react";
import ActiveShifts from "./Timesheets/ActiveShifts";
import WorkerProfile from "./Timesheets/WorkerProfile";
import WorkerReview from "./Timesheets/WorkerReview";
import {
  setCurrentWorkerScreen,
  showWorkerScreen,
} from "../../redux/actions/shiftActions";
import { connect } from "react-redux";

function WorkerActionSteps(props) {
  switch (props.currentStepWorkerScreen) {
    case 1:
      return <ActiveShifts />;
    case 2:
      return <WorkerProfile />;
    case 3:
      return <WorkerReview />;
    default:
      return null;
  }
}

const mapStateToProps = (state) => ({
  currentStepWorkerScreen: state.vantage.shiftReducer.currentStepWorkerScreen,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentWorkerScreen: (step) => dispatch(setCurrentWorkerScreen(step)),
  showWorkerScreen: (status) => dispatch(showWorkerScreen(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkerActionSteps);
