import Header from "../../../Header/index";
import StaffingProgressBar from "./StaffingProgressBar";
import Role from "./Role/RoleForm";
import Location from "./Location/Location";
import NextBackButton from "./NextBackButton";
import {
  setActiveStep,
  fetchUserAvalibleConnect,
  setJobPostingLimitEnd,
  setUserInJobPostingFlow,
} from "../../../../redux/actions/jobPostAction";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Salary from "./Salary/Salary";
import ReviewAndConfirm from "./ReviewAndConfirm/ReviewAndConfirm";
import DiscartComponentForJobPost from "./DiscartComponentForJobPost";
import dynamic from "next/dynamic";
import {
  setScreenToShowOnStaffing,
  setJobId,
  fetchJobDescriptionForEdit,
} from "../../../../redux/actions/staffingAction";
import ReviewAndConfirmShimmer from "./ReviewAndConfirm/ReviewAndConfirmShimmer";
import ModalContainer from "../../../Common/GlobalModals/Boosting/ModalContainer";
import JobPostModal from "../../../Common/GlobalModals/Boosting/JobPostModal";

const ThankyouForJobPost = dynamic(() => import("./Thankyou/Thankyou.js"), {
  ssr: false,
});

function JobPost(props) {
  const [isSubmitting, setSubmitting] = useState(false);
  const [showThankyou, setShowThankyou] = useState(false);
  const [loading, setLoading] = useState(true);

  const goToNext = (moveForward) => {
    props.setActiveStep(parseInt(parseInt(props.active_step) + moveForward));
  };

  const goToBack = () => {
    props.setActiveStep(parseInt(parseInt(props.active_step) - 1));
  };

  useEffect(async () => {
    const jobDescriptionApi = await props.fetchJobDescriptionForEdit(
      props.user_token,
      props.clickedJobId
    );

    if (jobDescriptionApi) {
      setLoading(false);
    }
    props.setUserInJobPostingFlow(true);

    return () => {
      props.setUserInJobPostingFlow(false);
      props.setScreenToShowOnStaffing("jobs");
      props.setJobId(null);
    };
  }, []);

  useEffect(() => {
    currentStepScreen(props.active_step);
  }, [props.active_step]);

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

  if (loading) {
    return (
      <>
        {/* <Header isNavBarOpenCookie={props.isNavBarOpenCookie} /> */}
        <div>
          <div className="main-content">
            <div className="booking-steps">
              <ul>
                <li className={"active"}>
                  <span className="circle"></span>
                  <span className="step_name">Role</span>
                </li>
                <li>
                  <span className="circle"></span>
                  <span className="step_name">Location</span>
                </li>
                <li>
                  <span className="circle"></span>
                  <span className="step_name">Wage & Benefits</span>
                </li>
                <li>
                  <span className="circle"></span>
                  <span className="step_name">Review & Confirm</span>
                </li>
              </ul>
            </div>

            <>
              <div className={`main-inner-content booking-content`}>
                <ReviewAndConfirmShimmer />
              </div>
            </>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header isNavBarOpenCookie={props.isNavBarOpenCookie} />
      <div>
        <div className="main-content">
          {props.active_step <= 5 && !showThankyou && (
            <StaffingProgressBar jobPostActiveStep={props.jobPostActiveStep} />
          )}

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
        </div>
      </div>
      <DiscartComponentForJobPost />
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
  // jobPostModal: state.vantage.billingReducer.jobPostModal,
  clickedJobId: state.vantage.staffingReducer.clickedJobId,
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
  setJobId: (jobId) => dispatch(setJobId(jobId)),
  fetchJobDescriptionForEdit: (userToken, jobId) =>
    dispatch(fetchJobDescriptionForEdit(userToken, jobId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobPost);
