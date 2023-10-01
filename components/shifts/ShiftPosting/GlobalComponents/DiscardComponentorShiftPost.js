import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { setDiscardModalForJobPost } from "../../../../redux/actions/jobPostAction";
import { setDiscardModalForShiftPost } from "../../../../redux/actions/shiftActions";
import { useRouter } from "next/router";

const DiscartModelComponentForShiftPost = (props) => {
  const { buttonLabel, className } = props;
  const router = useRouter();

  const leaveFunction = () => {
    router.push("/shifts");
    props.setDiscardModalForShiftPost(false);
    props.resetShiftPostingReducer();
  };

  const cancelFunciton = () => {
    props.setDiscardModalForShiftPost(false);
  };

  return (
    <div>
      <Modal
        isOpen={props.discardModalForShiftPost}
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
  discardModalForShiftPost: state.vantage.shiftReducer.discardModalForShiftPost,
  discard_link_for_modal: state.vantage.jobPostReducer.discard_link_for_modal,
});

const mapDispatchToProps = (dispatch) => ({
  setDiscardModalForJobPost: (status) =>
    dispatch(setDiscardModalForJobPost(status)),
  resetShiftPostingReducer: () => dispatch({ type: "RESET_SHIFT_REDUCER" }),
  setDiscardModalForShiftPost: (toggle) =>
    dispatch(setDiscardModalForShiftPost(toggle)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscartModelComponentForShiftPost);
