import React from "react";
import OnboardingFeedback from "./OnboardingFeedback";
import OnboardingTour from "./OnboardingTour";

const Onboarding = () => {
  return (
    <div>
      <OnboardingFeedback />
      <OnboardingTour />
    </div>
  );
};

export default Onboarding;

// isObordingTourDone: state.vantage.userDataReducer.is_onboarding_tour_done,
