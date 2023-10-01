import Header from "../../components/Header/index";
import Sidenav from "../../components/LeftNav";
import StaffingProgressBar from "../../components/JobPost/StaffingProgressBar";
import Role from "../../components/JobPost/Role/RoleForm";
import Location from "../../components/JobPost/Location/Location";
import NextBackButton from "../../components/JobPost/NextBackButton";
import {
  setActiveStep,
  fetchUserAvalibleConnect,
  setJobPostingLimitEnd,
  setUserInJobPostingFlow,
  setDiscardModalForJobPost,
} from "../../redux/actions/jobPostAction";
import {
  setBuyBoostModalStatus,
  setBoostConfirmationModal,
} from "../../redux/actions/billingAction";
import NavigationBar from "../../components/JobPost/NavigationBar";
import MakeABookingButtonComponent from "../../components/Common/MakeABookingButtonComponent";
import { connect } from "react-redux";
// import { useState } from 'react';

import { protectedRoute } from "../../utilites/utility";
import styles from "./jobpost.module.scss";
import { useEffect, useState } from "react";
import Salary from "../../components/JobPost/Salary/Salary";
import Settings from "../../components/JobPost/Settings/Settings";
import ReviewAndConfirm from "../../components/JobPost/ReviewAndConfirm/ReviewAndConfirm";
import DiscartComponentForJobPost from "../../components/JobPost/DiscartComponentForJobPost";
import Payment from "../../components/Common/StripePayment/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import ThankyouForJobPost from "../../components/JobPost/Thankyou/Thankyou.js";
import Pay from "../../components/JobPost/Pay/Pay";
import HomeScreen from "../../components/JobPost/HomeScreen/HomeScreen";
// import JobPostLimitExceed from "../../components/Common/GlobalModals/Boosting/JobPostLimitExceed";
import ModalContainer from "../../components/Common/GlobalModals/Boosting/ModalContainer";
// import BuyBoost from "";
import dynamic from "next/dynamic";
import JobPostModal from "../../components/Common/GlobalModals/Boosting/JobPostModal";
import { setScreenToShowOnStaffing } from "../../redux/actions/staffingAction";

const ThankyouForJobPost = dynamic(
  () => import("../../components/JobPost/Thankyou/Thankyou.js"),
  {
    ssr: false,
  }
);

export const getServerSideProps = async function (context) {
  return protectedRoute(context);
};

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

function JobPost(props) {
  // const [activeStep, setActiveStep] = useState(1);
  const [isSubmitting, setSubmitting] = useState(false);
  const [showThankyou, setShowThankyou] = useState(false);

  const goToNext = (moveForward) => {
    props.setActiveStep(parseInt(parseInt(props.active_step) + moveForward));
  };

  const goToBack = () => {
    props.setActiveStep(parseInt(parseInt(props.active_step) - 1));
  };

  useEffect(() => {
    currentStepScreen(props.active_step);
  }, [props.active_step]);

  useEffect(() => {
    props.fetchUserAvalibleConnect(props.user_token);
    return () => {
      props.setUserInJobPostingFlow(false);
      props.setScreenToShowOnStaffing("jobs");
      props.resetJobReducer();
    };
  }, []);

  const currentStepScreen = (activeStep) => {
    activeStep = parseInt(activeStep);
    switch (activeStep) {
      case 1:
        return process.browser && <Role goToNext={goToNext} />;
      case 2:
        return process.browser && <Location goToNext={goToNext} />;
      case 3:
        return process.browser && <Salary goToNext={goToNext} />;
      case 4:
        // return <Settings goToNext={goToNext} />
        return (
          process.browser && (
            <ReviewAndConfirm
              goToNext={goToNext}
              setSubmitting={setSubmitting}
            />
          )
        );
      case 5:
        // const pi = "pi_3L2zneAEmUVVHraX0YsVBiX9_secret_qTuoNiM6iEKvCwdoNdpLep235"
        return (
          process.browser && (
            <Pay goToNext={goToNext} setSubmitting={setSubmitting} />
          )
        );
      case 6:
        setShowThankyou(true);
        return <></>;
      default:
        return <h1>Default</h1>;
    }
  };

  return (
    <>
      <Header isNavBarOpenCookie={props.isNavBarOpenCookie} />
      <div className="main-layout">
        <Sidenav isNavBarOpenCookie={props.isNavBarOpenCookie} />
        <div className="main-content">
          {props.active_step <= 5 && !showThankyou && (
            <StaffingProgressBar jobPostActiveStep={props.jobPostActiveStep} />
          )}
          {props.isUserInJobPostingFlow === false && showThankyou === false ? (
            <HomeScreen />
          ) : (
            <>
              <div
                className={`main-inner-content booking-content ${
                  props.show_job_preview ? "blur" : ""
                }`}
              >
                {showThankyou ? (
                  <ThankyouForJobPost setShowThankyou={setShowThankyou} />
                ) : (
                  currentStepScreen(props.active_step)
                )}
              </div>

              {props.active_step <= 5 && !showThankyou && (
                <div className="slides_controls">
                  <div className="slide_control_fixed py-3 h-auto">
                    {process.browser && (
                      <NextBackButton
                        goToBack={goToBack}
                        jobPostActiveStep={props.jobPostActiveStep}
                        isSubmitting={isSubmitting}
                      />
                    )}
                  </div>
                </div>
              )}
            </>
          )}
          {/* <div className={`main-inner-content booking-content ${props.show_job_preview ? "blur" : ""}`}>
                        {showThankyou ? <ThankyouForJobPost setShowThankyou={setShowThankyou} /> : currentStepScreen(props.active_step)}
                    </div>
                    
                    {props.active_step <= 5 && !showThankyou && <div className="slides_controls">
                        <div className="slide_control_fixed">
                            {process.browser && <NextBackButton goToBack={goToBack} jobPostActiveStep={props.jobPostActiveStep} isSubmitting={isSubmitting} />}
                        </div>
                    </div>} */}
          {/* <SlideControl nextUrl="/booking/step-2" /> */}
        </div>
      </div>
      <DiscartComponentForJobPost />

      {/* <ModalContainer modalState={props.jobPostingLimitEnd}> // remove in new billing
        <JobPostLimitExceed />
      </ModalContainer> */}

      {/* <ModalContainer modalState={props.buyBoostModal}> // remove in new billing
        <BuyBoost modalStateHandler={props.setBuyBoostModalStatus} />
      </ModalContainer> */}

      <ModalContainer modalState={props.jobPostModal}>
        <JobPostModal />
      </ModalContainer>
    </>
  );
}

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  active_step: state.vantage.jobPostReducer.activeStep,
  show_job_preview: state.vantage.jobPostReducer.showJobPostPreview,
  client_secret: state.vantage.jobPostReducer.clientSecret,
  isUserInJobPostingFlow: state.vantage.jobPostReducer.isUserInJobPostingFlow,
  billingPlan: state.vantage.jobPostReducer.billingPlan,
  jobPostingLimitEnd: state.vantage.jobPostReducer.jobPostingLimitEnd,
  buyBoostModal: state.vantage.billingReducer.buyBoostModal,
  jobPostModal: state.vantage.billingReducer.jobPostModal,
});

const mapDispatchToProps = (dispatch) => ({
  setActiveStep: (activeStep) => dispatch(setActiveStep(activeStep)),
  fetchUserAvalibleConnect: (user_token) =>
    dispatch(fetchUserAvalibleConnect(user_token)),
  setJobPostingLimitEnd: (status) => dispatch(setJobPostingLimitEnd(status)),
  setBuyBoostModalStatus: (status) => dispatch(setBuyBoostModalStatus(status)),
  setBoostConfirmationModal: (status) =>
    dispatch(setBoostConfirmationModal(status)),
  setScreenToShowOnStaffing: (screen) =>
    dispatch(setScreenToShowOnStaffing(screen)),
  setUserInJobPostingFlow: (status) =>
    dispatch(setUserInJobPostingFlow(status)),
  setDiscardModalForJobPost: (status) =>
    dispatch(setDiscardModalForJobPost(status)),
  resetJobReducer: () => dispatch({ type: "RESET_JOBPOST_REDUCER" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobPost);
