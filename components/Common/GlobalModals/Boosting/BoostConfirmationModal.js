import React, { useState, useEffect } from "react";
import styles from "./BoostConfirmationModal.module.scss";
import {
  checkJobCanPost,
  setBuyBoostModalStatus,
  boostJob,
  setBoostJobId,
  setBoostConfirmationModal,
  checkAvailableCredits,
  setShowBillingModal,
  setShowJobBoostCalculator,
} from "../../../../redux/actions/billingAction";
import {
  postJob,
  resetReducer,
  setBillingPlan,
  setActiveStep,
  // fetchUsersClientSecretForStripe,
  fetchJobs,
  setJobPostingLimitEnd,
} from "../../../../redux/actions/jobPostAction";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
// import BuyBoost from "./BuyBoost";
import dynamic from "next/dynamic";
import Lottie from "lottie-react";
import rocket_lottie from "../../../../lottie/rocket-in.json";
// const BuyBoost = dynamic(() => import("./BuyBoost"), {
//   loading: () => <p>Loading...</p>,
// });
import { toast } from "react-toastify";

function BoostConfirmationModal(props) {
  const [loading, setloading] = useState(false);
  const [boostApplicable, setBoostApplicable] = useState();
  const [checkingBoost, setCheckingBoost] = useState(true);

  const onClickCloseHandler = () => {
    props.setBoostConfirmationModal(false);
    setBoostApplicable();
  };

  useEffect(async () => {
    const response = await props.checkJobCanPost(
      props.user_token,
      props.boostJobId
    );

    if (response.is_boost_applicable == false) {
      setTimeout(() => {
        setCheckingBoost(false);
        setBoostApplicable(false);
      }, 5000);

      // props.setBoostConfirmationModal(false);
      // toast.error("Boost not available on this job");
    } else if (response.is_boost_applicable) {
      setTimeout(() => {
        setCheckingBoost(false);
        setBoostApplicable(true);
      }, 5000);
    }

    return () => {
      props.setBillingPlan([]);
    };
  }, []);

  const onJobPostBoostHandler = async () => {
    setloading(true);
    if (props.isUserInJobPostingFlow == false) {
      // user coming from job post list

      const checkAvailableCreditsApiRespone = await props.checkAvailableCredits(
        props.user_token
      );

      if (checkAvailableCreditsApiRespone.boost_job == 0) {
        props.setShowBillingModal(true);
        props.setShowJobBoostCalculator(true);
        props.setBoostConfirmationModal(false);
      } else if (checkAvailableCreditsApiRespone.boost_job > 0) {
        // const response = await props.checkJobCanPost(
        //   props.user_token,
        //   props.boostJobId
        // );
        // if (response.is_boost_applicable) {
        await props
          .boostJob(props.user_token, {
            job_id: props.boostJobId,
          })
          .then((res) => {
            setloading(false);
            if (res) {
              props.setBoostConfirmationModal(false);
              props.fetchJobs(true);
            }
          })
          .catch((e) => {
            toast.error("error", e);
          });
        // } else if (response.is_boost_applicable == false) {
        //   props.setBoostConfirmationModal(false);
        //   toast.error("Boost not available on this job");
        // }
      }
    }
  };

  if (checkingBoost) {
    return (
      <div className={styles.checking_boost_modal}>
        <div className={`${styles.lottie_wrap}`}>
          <Lottie
            style={{ width: 160, height: 160 }}
            animationData={rocket_lottie}
            loop={true}
          />
        </div>
        <h2>
          Checking boost <br /> availability...
        </h2>
      </div>
    );
  }

  if (boostApplicable === false || boostApplicable == undefined) {
    return (
      <>
        <div className={styles.not_available_modal}>
          <img
            src={`${process.env.APP_URL}/images/sad-emoji.png`}
            alt="emoji"
            className={`img-fluid`}
          />
          <h2>Sorry !</h2>
          <p>
            Unfortunately, boost is not <br /> available at this location.
          </p>
          <button onClick={() => onClickCloseHandler()}>Close</button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.modal_wrap}>
        <div className={`${styles.img_wrap}`}>
          <img
            src={`${process.env.APP_URL}/images/rocket-img.svg`}
            alt="rocket"
            className={`img-fluid`}
          />
        </div>
        <h2>Boost your job to reach 5x more candidates</h2>
        {/* <p>We are using your 1 boost credit, please confirm</p> */}
        <div className={styles.button_wrap}>
          <button
            className={styles.cancel_btn}
            onClick={() => props.setBoostConfirmationModal(false)}
            disabled={loading}
          >
            Close
          </button>
          <button onClick={() => onJobPostBoostHandler()} disabled={loading}>
            {loading ? (
              <Spinner size="sm" />
            ) : (
              <>
                <img
                  src={`${process.env.APP_URL}/images/bolt-dark.svg`}
                  alt="bolt"
                />
                Boost Job
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  buyBoostModal: state.vantage.billingReducer.buyBoostModal,
  billingPlan: state.vantage.jobPostReducer.billingPlan,

  job_title: state.vantage.jobPostReducer.jobTitle,
  company_name: state.vantage.userDataReducer.user_name,
  job_description: state.vantage.jobPostReducer.editor,
  venue_type: state.vantage.jobPostReducer.venueType,
  venue_type_other_value: state.vantage.jobPostReducer.venueTypeOtherValue,
  specific_address: state.vantage.jobPostReducer.willReportToSpecificAddress,
  google_city_town: state.vantage.jobPostReducer.WillNotReportToCity,
  google_post_code: state.vantage.jobPostReducer.WillNotReportToPostCode,
  loqate_address_line_one:
    state.vantage.jobPostReducer.willReportToWorkaddress1,
  loqate_address_line_two:
    state.vantage.jobPostReducer.willReportToWorkaddress2,
  loqate_city_town: state.vantage.jobPostReducer.willReportToWorkCity,
  loqate_postal_code: state.vantage.jobPostReducer.willReportToWorkPostCode,
  // street_address: state.vantage.jobPostReducer.settingsEmail,
  salary_benefits: state.vantage.jobPostReducer.salaryBenefits,
  salary_pay: state.vantage.jobPostReducer.salaryValue,
  salary_type: state.vantage.jobPostReducer.salaryType,
  salary_range_min: state.vantage.jobPostReducer.salaryRangeMin,
  salary_range_max: state.vantage.jobPostReducer.salaryRangeMax,
  salary_per_unit: state.vantage.jobPostReducer.salaryValuePerUnit,
  is_license_required: state.vantage.jobPostReducer.radio,
  license_required: state.vantage.jobPostReducer.SIALicense,
  contract_type: state.vantage.jobPostReducer.contract,
  daily_updates_about_this_job_email:
    state.vantage.jobPostReducer.settingsEmail,
  type_of_employment: state.vantage.jobPostReducer.typeOfEmployment,
  venue_type: state.vantage.jobPostReducer.venueType,
  is_immediate: state.vantage.jobPostReducer.is_immediate,
  shift_schedule: state.vantage.jobPostReducer.shift_schedule,
  shift_timing: state.vantage.jobPostReducer.shift_timing,
  center_for_google_map: state.vantage.jobPostReducer.centerForMapGoogle,
  show_job_preview: state.vantage.jobPostReducer.showJobPostPreview,
  salary_work_hour_per_week: state.vantage.jobPostReducer.salaryWorkHourPerWeek,
  job_ref_number: state.vantage.jobPostReducer.refNumber,
  client_secret: state.vantage.jobPostReducer.clientSecret,
  payment_intent: state.vantage.jobPostReducer.paymentIntent,
  avalible_connects: state.vantage.jobPostReducer.availableConnects,
  saveJobAsTemplate: state.vantage.jobPostReducer.saveJobAsTemplate,
  isAvailableForTeam: state.vantage.jobPostReducer.isAvailableForTeam,
  jobTemplate: state.vantage.jobPostReducer.jobTemplate,
  updateJobTemplate: state.vantage.jobPostReducer.updateJobTemplate,
  templateId: state.vantage.jobPostReducer.templateId,
  fromJobTemplate: state.vantage.jobPostReducer.fromJobTemplate,
  // activeStep: state.vantage.jobPostReducer.activeStep,
  is_job_draft: state.vantage.jobPostReducer.is_job_draft,
  boostJobId: state.vantage.billingReducer.boostJobId,
  isUserInJobPostingFlow: state.vantage.jobPostReducer.isUserInJobPostingFlow,
  draftLatestJobId: state.vantage.jobPostReducer.draftLatestJobId,
  center_for_map_loqate: state.vantage.jobPostReducer.centerForMapLoqate,
});

const mapDispatchToProps = (dispatch) => ({
  checkJobCanPost: (userToken, jobId) =>
    dispatch(checkJobCanPost(userToken, jobId)),
  setBuyBoostModalStatus: (status) => dispatch(setBuyBoostModalStatus(status)),
  boostJob: (user_token, data) => dispatch(boostJob(user_token, data)),
  postJob: (data, user_token) => dispatch(postJob(data, user_token)),
  resetReducer: () => dispatch(resetReducer()),
  setBillingPlan: (value) => dispatch(setBillingPlan(value)),
  setActiveStep: (activeStep) => dispatch(setActiveStep(activeStep)),
  // fetchUsersClientSecretForStripe: (user_token, data) =>
  //   dispatch(fetchUsersClientSecretForStripe(user_token, data)),
  setBoostJobId: (jobId) => dispatch(setBoostJobId(jobId)),
  setBoostConfirmationModal: (status) =>
    dispatch(setBoostConfirmationModal(status)),
  fetchJobs: (status) => dispatch(fetchJobs(status)),
  setJobPostingLimitEnd: (status) => dispatch(setJobPostingLimitEnd(status)),
  checkAvailableCredits: (userToken) =>
    dispatch(checkAvailableCredits(userToken)),
  setShowBillingModal: (status) => dispatch(setShowBillingModal(status)),
  setShowJobBoostCalculator: (status) =>
    dispatch(setShowJobBoostCalculator(status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoostConfirmationModal);

// export default BoostConfirmationModal;
