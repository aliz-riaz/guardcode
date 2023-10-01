import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import FeedbackForm from "./FeedbackForm";
import { connect } from "react-redux";
import {
  setIsOnboardingFeedbackModal,
  setIsOnboardingTourModal,
} from "../../../redux/actions/userAction";
import { useRouter } from "next/router";

function OnboardingFeedback(props) {
  const router = useRouter();
  return (
    <div>
      {/* <Modal isOpen={true} size='lg' className={`font-roboto`} centered backdrop="static" keyboard={false}> */}
      <Modal
        isOpen={
          props.showOnboardingFeedbackModal && router.pathname == "/dashboard"
        }
        size="lg"
        className={`font-roboto`}
        centered
        backdrop="static"
        keyboard={false}
      >
        <ModalBody className="p-4">
          <FeedbackForm />
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isObordingFeedbackDone:
    state.vantage.userDataReducer.is_onboarding_feedback_done,
  isObordingTourDone: state.vantage.userDataReducer.is_onboarding_tour_done,
  showOnboardingFeedbackModal:
    state.vantage.userDataReducer.show_onboarding_feedback_modal,
  showOnboardingTourModal:
    state.vantage.userDataReducer.show_onboarding_tour_modal,
});

const mapDispatchToProps = (dispatch) => ({
  setIsOnboardingFeedbackModal: (status) =>
    dispatch(setIsOnboardingFeedbackModal(status)),
  setIsOnboardingTourModal: (status) =>
    dispatch(setIsOnboardingTourModal(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingFeedback);
