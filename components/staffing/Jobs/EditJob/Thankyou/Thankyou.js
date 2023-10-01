import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
// import useThankyou from "../../../hooks/JobPost/useThankyou";
import styles from "./Thankyou.module.scss";
import {
  setScreenToShowOnStaffing,
  setLatestJobId,
} from "../../../../../redux/actions/staffingAction";
import { Spinner } from "react-bootstrap";

// import {
//   setShowCVSearchProfileStatus,
//   setSwpProfileId,
//   setIsSWPProfileLoading,
// } from "../../../redux/actions/cvSearchAction";
// import SwpPrpfileForCvSearch from "../../../components/CVSearch/SwpPrpfileForCvSearch";

const ThankyouForJobPost = (props) => {
  

  return (
    <div>thank you</div>
  );
};

const mapStateToProps = (state) => {
  return {
    user_token: state.vantage.userDataReducer.user_token,
    last_job_connects: state.vantage.staffingReducer.lastJobConnects,
    draft_payment_id: state.vantage.jobPostReducer.draftLatestJobId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    restJobPostReducer: () => dispatch({ type: "RESET_JOBPOST_REDUCER" }),
    resetLastJobConnect: (value) =>
      dispatch({ type: "SET_LAST_JOB_CONNECT", payload: value }),
    setScreenToShowOnStaffing: (screen) =>
      dispatch(setScreenToShowOnStaffing(screen)),
    setLatestJobId: (jobId) => dispatch(setLatestJobId(jobId)),

    setSwpProfileId: (jobSeekerId) => dispatch(setSwpProfileId(jobSeekerId)),
    setIsSWPProfileLoading: (status) =>
      dispatch(setIsSWPProfileLoading(status)),
    setShowCVSearchProfileStatus: (status) =>
      dispatch(setShowCVSearchProfileStatus(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThankyouForJobPost);
