import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { setDiscardModalForJobPost } from "../../../../redux/actions/jobPostAction";
import router, { useRouter } from "next/router";
import { setScreenToShowOnStaffing } from "../../../../redux/actions/staffingAction";

const DiscartModelComponentForJobPost = (props) => {
  const { buttonLabel, className } = props;

  const leaveFunction = () => {
    props.setScreenToShowOnStaffing("jobs");
    props.setDiscardModalForJobPost(false);
    props.restJobPostReducer();
    props.resetBillingPlan();
  };

  const cancelFunciton = () => {
    props.setDiscardModalForJobPost(false);
  };

  return (
    <div>
      <Modal
        isOpen={props.show_discard_modal_for_job_post}
        className={className + " discardModal"}
        backdrop="static"
        keyboard={false}
      >
        <ModalHeader toggle={cancelFunciton}>Discard changes</ModalHeader>
        <ModalBody>Are you sure you want to exit?</ModalBody>
        <ModalFooter>
          <Button color="green" className="btn-sm" onClick={leaveFunction}>
            Leave
          </Button>{" "}
          <Button color="secondary" className="btn-sm" onClick={cancelFunciton}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  show_discard_modal_for_job_post:
    state.vantage.jobPostReducer.show_discard_modal_for_job_post,
  discard_link_for_modal: state.vantage.jobPostReducer.discard_link_for_modal,
});

const mapDispatchToProps = (dispatch) => ({
  setDiscardModalForJobPost: (status) =>
    dispatch(setDiscardModalForJobPost(status)),
  restJobPostReducer: () => dispatch({ type: "RESET_JOBPOST_REDUCER" }),
  resetBillingPlan: () =>
    dispatch({
      type: "SET_BILLING_PLAN",
      payload: [],
    }),
  setScreenToShowOnStaffing: (screen) =>
    dispatch(setScreenToShowOnStaffing(screen)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscartModelComponentForJobPost);
