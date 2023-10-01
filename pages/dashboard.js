import React, { useEffect } from "react";
import Header from "../components/Header";
import Sidenav from "../components/LeftNav";
import { connect } from "react-redux";
import dynamic from "next/dynamic";
import { protectedRoute } from "../utilites/utility";
import { isMobile } from "react-device-detect";
import AccountNotApprovedAlert from "../components/Common/AccountNotApprovedAlert";
import {
  setIsOnboardingFeedbackModal,
  setIsOnboardingTourModal,
} from "../redux/actions/userAction";

const GlobalChat = dynamic(
  () => import("../components/chat/globalChat/GlobalChat"),
  { ssr: false }
);

const DashboardStats = dynamic(
  () => import("../components/Dashboard/Dashboard"),
  { ssr: false }
);

export const getServerSideProps = async function (context) {
  return protectedRoute(context);
};

function Dashboard(props) {
  useEffect(() => {
    if (!props.isObordingFeedbackDone) {
      props.setIsOnboardingFeedbackModal(true);
    }
  }, [props.isObordingFeedbackDone]);

  return (
    <div>
      <Header isNavBarOpenCookie={props.isNavBarOpenCookie} />
      <div className="main-layout">
        <Sidenav isNavBarOpenCookie={props.isNavBarOpenCookie} />
        <div className="main-content">
          <AccountNotApprovedAlert />
          <div className="main-inner-content">
            <DashboardStats />
          </div>
          {!isMobile && <GlobalChat />}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isObordingFeedbackDone:
    state.vantage.userDataReducer.is_onboarding_feedback_done,
  isObordingTourDone: state.vantage.userDataReducer.is_onboarding_tour_done,
});

const mapDispatchToProps = (dispatch) => ({
  setIsOnboardingFeedbackModal: (status) =>
    dispatch(setIsOnboardingFeedbackModal(status)),
  setIsOnboardingTourModal: (status) =>
    dispatch(setIsOnboardingTourModal(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
