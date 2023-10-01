import React, { useState } from "react";
import Joyride from "react-joyride";
import { CUSTOM_STYLES, BUTTON_TEXTS, STEPS } from "./TourConstants";
import { connect } from "react-redux";
import {
  setIsOnboardingTourModal,
  setIsOnboardingTourDone,
} from "../../../redux/actions/userAction";

const OnboardingTour = (props) => {
  const [steps, setSteps] = useState(STEPS);
  const [runOnboarding, setRunOnboarding] = useState(true);

  const handleOnboardingEnd = (data) => {
    const { action } = data;
    if (action == "skip" || action == "reset") {
      setRunOnboarding(false);
      props.setIsOnboardingTourModal(false);
      props.setIsOnboardingTourDone(true);
    }
  };

  return (
    <>
      <Joyride
        steps={steps}
        run={props.showOnboardingTourModal}
        //  run={true}
        continuous={true}
        callback={handleOnboardingEnd}
        disableScrolling={true}
        disableCloseOnEsc={true}
        spotlightPadding={0}
        floaterProps={{ disableAnimation: true }}
        disableCloseOnOverlayClick={true}
        spotlightClicks={false}
        disableScrollParentFix={false}
        styles={CUSTOM_STYLES}
        locale={BUTTON_TEXTS}
      />
    </>
  );
};

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
  setIsOnboardingTourDone: (status) =>
    dispatch(setIsOnboardingTourDone(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingTour);
