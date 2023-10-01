import React, { useState, useEffect } from "react";
import ModalContainer from "./ModalContainer";
import styles from "./BoostConfirmationModal.module.scss";
import {
  checkJobCanPost,
  setBuyBoostModalStatus,
  boostJob,
  setBoostJobId,
  setBoostConfirmationModal,
} from "../../../../redux/actions/billingAction";
import {
  getBillingPlan,
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

const BuyBoost = dynamic(() => import("./BuyBoost"), {
  loading: () => <p>Loading...</p>,
});
import { toast } from "react-toastify";

function BoostConfirmationModal(props) {
  const [loading, setloading] = useState(false);

  useEffect(() => {
    return () => {
      props.setBillingPlan([]);
    };
  }, []);

  const onJobPostBoostHandler = async () => {
    setloading(true);
    if (props.isUserInJobPostingFlow == false) {
      // user coming from job post list
      const apicall = await props.getBillingPlan(props.user_token);
      if (
        apicall?.assigned?.boost_job_credits ==
        apicall?.utilized.boost_job_credits
      ) {
        const response = await props.checkJobCanPost(
          props.user_token,
          props.boostJobId
        );

        if (response.is_boost_applicable) {
          props.setBuyBoostModalStatus(true);
        } else if (response.is_boost_applicable == false) {
          props.setBoostConfirmationModal(false);
          toast.error("Boost not available on this job");
        }
      } else {
        const response = await props.checkJobCanPost(
          props.user_token,
          props.boostJobId
        );

        if (response.is_boost_applicable) {
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
        } else if (response.is_boost_applicable == false) {
          props.setBoostConfirmationModal(false);
          toast.error("Boost not available on this job");
        }
      }
    } else if (props.isUserInJobPostingFlow) {
      const data = {
        title: props.job_title,
        ref_number: props.job_ref_number,
        employment_type: props.type_of_employment,
        license_course_id: props.license_required,
        contract_type: props.contract_type,
        venue_type:
          props.venue_type == "Other"
            ? props.venue_type_other_value
            : props.venue_type,
        is_immediate: props.is_immediate,
        shift_schedule: props.shift_schedule,
        shift_timings: props.shift_timing,
        description: props.job_description,
        is_report_specific_address: props.specific_address == "yes" ? 1 : 0,
        address:
          props.specific_address == "yes" ? props.loqate_address_line_one : "",
        address2:
          props.specific_address == "yes" ? props.loqate_address_line_two : "",
        city:
          props.specific_address == "yes"
            ? props.loqate_city_town
            : props.google_city_town,
        // city: "London",
        postal_code:
          props.specific_address == "yes"
            ? props.loqate_postal_code
            : props.google_post_code,
        salary_type: props.salary_type,
        salary: props.salary_type == "Fixed Rate" ? props.salary_pay : null,
        salary_min:
          props.salary_type == "Fixed Rate" ? null : props.salary_range_min,
        salary_max:
          props.salary_type == "Fixed Rate" ? null : props.salary_range_max,
        pay_frequency: props.salary_per_unit,
        benefit_id: props.salary_benefits,
        updating_email: props.daily_updates_about_this_job_email,
        latitude:
          props.specific_address == "yes"
            ? props.center_for_map_loqate.lat
            : props.center_for_google_map.lat,
        longitude:
          props.specific_address == "yes"
            ? props.center_for_map_loqate.lng
            : props.center_for_google_map.lng,
        working_hours: props.salary_work_hour_per_week,
        should_boost: 1,
      };

      if (
        props.billingPlan?.assigned?.boost_job_credits >
          props.billingPlan?.utilized?.boost_job_credits &&
        props.billingPlan?.assigned?.job_post_credits >
          props.billingPlan?.utilized?.job_post_credits
      ) {
        // adding keys into data object for posting job

        if (
          (props.saveJobAsTemplate && props.fromJobTemplate === false) ||
          (props.updateJobTemplate &&
            props.fromJobTemplate &&
            props.saveJobAsTemplate)
        ) {
          data.save_job_as_template = props.saveJobAsTemplate;
          data.is_available_for_team = props.isAvailableForTeam;
          data.template_name = props.jobTemplate.name;
        } else if (
          props.updateJobTemplate &&
          props.fromJobTemplate &&
          props.saveJobAsTemplate == false
        ) {
          data.update_job_template = Number(props.updateJobTemplate);
          data.is_available_for_team = props.isAvailableForTeam;
          data.template_name = props.jobTemplate.name;
          data.template_id = props.templateId;
        }

        // ===> add keys into api call for draft <===
        if (props.is_job_draft) {
          // ===> this block will run when user post job with draft template <===
          data.draft_template_id = props.templateId;
        }

        await props.postJob(data, props.user_token).then((res) => {
          setloading(false);
          if (res) {
            props.setBoostConfirmationModal(false);
            props.setActiveStep(6);
          }
        });
      } else if (
        props.billingPlan?.assigned?.boost_job_credits ==
          props.billingPlan?.utilized?.boost_job_credits &&
        props.billingPlan?.assigned?.job_post_credits >
          props.billingPlan?.utilized?.job_post_credits
      ) {
        // await props.fetchUsersClientSecretForStripe(props.user_token, data);
        props.setBuyBoostModalStatus(true);
      } else if (
        props.billingPlan?.assigned?.boost_job_credits ==
          props.billingPlan?.utilized?.boost_job_credits ||
        (props.billingPlan?.assigned?.boost_job_credits >
          props.billingPlan?.utilized?.boost_job_credits &&
          props.billingPlan?.assigned?.job_post_credits ==
            props.billingPlan?.utilized?.job_post_credits)
      ) {
        props.setJobPostingLimitEnd(true);
      }
    }
  };

  return (
    <>
      {props.isUserInJobPostingFlow == false && (
        <ModalContainer modalState={props.buyBoostModal}>
          <BuyBoost
            modalStateHandler={props.modalStateHandler}
            getUserJobsList={props.getUserJobsList}
          />
        </ModalContainer>
      )}
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
  getBillingPlan: (userToken) => dispatch(getBillingPlan(userToken)),
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoostConfirmationModal);

// export default BoostConfirmationModal;
