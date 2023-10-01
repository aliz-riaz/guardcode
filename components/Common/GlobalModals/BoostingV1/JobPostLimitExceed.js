import React, { useEffect, useState } from "react";
import styles from "./JobPostLimitExceed.module.scss";
import { Progress } from "reactstrap";
import ModalContainer from "./ModalContainer";
import { connect } from "react-redux";
import {
  getBillingPlan,
  setJobPostingLimitEnd,
  setBillingPlan,
  saveJobAsDraft,
  saveDraftJobAsTemplate,
  fetchUserAvalibleConnect,
} from "../../../../redux/actions/jobPostAction";
import {
  setShowBillingModal,
  setBoostConfirmationModal,
} from "../../../../redux/actions/billingAction";

function JobPostLimitExceed(props) {
  const [onSavingDraft, setOnSavingDraft] = useState(false);

  useEffect(async () => {
    await props.fetchUserAvalibleConnect(props.user_token);
    await props.getBillingPlan(props.user_token);
  }, [props.showBillingModal]);

  const [isPlanUpgrade, setIsPlanUpgrade] = useState(false);

  const onClickPlanUpgradeHandler = async () => {
    props.setShowBillingModal(true);
    // setloading(true);
    // const response = await props.checkJobCanPost(props.user_token);
    // if (response.boost_credits) {
    //   setloading(false);
    //   setIsJobPostLimitError((prevState) => !prevState);
    // }
    // setIsPlanUpgrade((prevState) => !prevState);
  };

  const saveDraftJobHandler = async () => {
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
      // is_drafted: props.updateJobTemplate ? 0 : 1,
      is_drafted: 1,
      draft_template_id: props.templateId,
      template_name: props.jobTemplate.name,
    };
    setOnSavingDraft(true);
    props.setBoostConfirmationModal(false);
    await props.saveJobAsDraft(data, props.user_token);
    setOnSavingDraft(false);
  };

  const errorMessageTitle = (planData) => {
    if (
      planData?.assigned?.job_post_credits ==
        planData?.utilized?.job_post_credits &&
      planData?.assigned?.boost_job_credits ==
        planData?.utilized?.boost_job_credits
    ) {
      return "job post and boost ";
    } else if (
      planData?.assigned?.job_post_credits ==
        planData?.utilized?.job_post_credits &&
      planData?.assigned?.boost_job_credits >
        planData?.utilized?.boost_job_credits
    ) {
      return "job post ";
    } else if (
      planData?.assigned?.job_post_credits >
        planData?.utilized?.job_post_credits &&
      planData?.assigned?.boost_job_credits ==
        planData?.utilized?.boost_job_credits
    ) {
      return "job boost ";
    }
  };

  const getProgressBarStatus = (consumedValue, totalValue) => {
    return (consumedValue / totalValue) * 100;
  };

  const jobPostLimitModalHandler = () => {
    props.setJobPostingLimitEnd(false);
    props.setBoostConfirmationModal(false);
    props.setBillingPlan([]);
  };
  return (
    <>
      <div className={styles.modal_wrap}>
        <div className={styles.modal_header}>
          <button onClick={() => jobPostLimitModalHandler()}>
            <img
              src={process.env.APP_URL + "/images/arrow-left.svg"}
              alt="arrow"
              className="img-fluid"
            />
            Back
          </button>
        </div>
        <div className={`${styles.alert_wrap} font-roboto`}>
          <p>
            <img
              src={process.env.APP_URL + "/images/alert-icon.svg"}
              height={20}
              width={20}
            />
            You are out of {errorMessageTitle(props.billingPlan)}
            limits! Please upgrade your plan if you want to post this job
            otherwise it will be in save as draft.
          </p>
        </div>
        <div className={styles.content}>
          <h3>Summary</h3>
          <p>
            You are currently using <strong>{props.billingPlan?.title}</strong>{" "}
            you can change your plan anytime.
          </p>
          <h4>Remaining Features</h4>
          <p>You are having trouble posting job because of your credits.</p>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className={styles.progress_wrap}>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h4>Job Posting</h4>
                <p
                  className={
                    props.billingPlan?.utilized?.job_post_credits ==
                    props.billingPlan?.assigned?.job_post_credits
                      ? styles.danger
                      : ""
                  }
                >
                  {props.billingPlan?.utilized?.job_post_credits}
                  <span>/{props.billingPlan?.assigned?.job_post_credits}</span>
                </p>
              </div>
              <Progress
                value={getProgressBarStatus(
                  props.billingPlan?.utilized?.job_post_credits,
                  props.billingPlan?.assigned?.job_post_credits
                )}
                color={
                  props.billingPlan?.utilized?.job_post_credits ==
                  props.billingPlan?.assigned?.job_post_credits
                    ? "danger"
                    : "black"
                }
                style={{ height: "10px", borderRadius: 25 }}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className={styles.progress_wrap}>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h4>Boost Credits</h4>
                <p
                  className={
                    props.billingPlan?.utilized?.boost_job_credits ==
                    props.billingPlan?.assigned?.boost_job_credits
                      ? styles.danger
                      : ""
                  }
                >
                  {props.billingPlan?.utilized?.boost_job_credits}
                  <span>/{props.billingPlan?.assigned?.boost_job_credits}</span>
                </p>
              </div>
              <Progress
                value={getProgressBarStatus(
                  props.billingPlan?.utilized?.boost_job_credits,
                  props.billingPlan?.assigned?.boost_job_credits
                )}
                color={
                  props.billingPlan?.utilized?.boost_job_credits ==
                  props.billingPlan?.assigned?.boost_job_credits
                    ? "danger"
                    : "black"
                }
                style={{ height: "10px", borderRadius: 25 }}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className={styles.progress_wrap}>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h4>CV Views</h4>
                <p
                  className={
                    props.billingPlan?.utilized?.cv_views_credits ==
                    props.billingPlan?.assigned?.cv_views_credits
                      ? styles.danger
                      : ""
                  }
                >
                  {props.billingPlan?.utilized?.cv_views_credits}
                  <span>/{props.billingPlan?.assigned?.cv_views_credits}</span>
                </p>
              </div>
              <Progress
                value={getProgressBarStatus(
                  props.billingPlan?.utilized?.cv_views_credits,
                  props.billingPlan?.assigned?.cv_views_credits
                )}
                color={
                  props.billingPlan?.utilized?.cv_views_credits ==
                  props.billingPlan?.assigned?.cv_views_credits
                    ? "danger"
                    : "black"
                }
                style={{ height: "10px", borderRadius: 25 }}
              />
            </div>
          </div>
        </div>
        <div className={styles.button_wrap}>
          <button
            className={styles.save_btn}
            disabled={onSavingDraft}
            onClick={() => saveDraftJobHandler()}
          >
            {onSavingDraft ? "Saving..." : "Save as draft"}
          </button>
          <button
            onClick={() => {
              onClickPlanUpgradeHandler();
            }}
          >
            Upgrade Plan
          </button>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  billingPlan: state.vantage.jobPostReducer.billingPlan,

  user_token: state.vantage.userDataReducer.user_token,
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
  avalible_connects: state.vantage.jobPostReducer.availableConnects,
  isAvailableForTeam: state.vantage.jobPostReducer.isAvailableForTeam,
  jobTemplate: state.vantage.jobPostReducer.jobTemplate,
  activeStep: state.vantage.jobPostReducer.activeStep,
  is_job_draft: state.vantage.jobPostReducer.is_job_draft,
  updateJobTemplate: state.vantage.jobPostReducer.updateJobTemplate,
  templateId: state.vantage.jobPostReducer.templateId,
  showBillingModal: state.vantage.billingReducer.showBillingModal,
  center_for_map_loqate: state.vantage.jobPostReducer.centerForMapLoqate,
});

const mapDispatchToProps = (dispatch) => ({
  setJobPostingLimitEnd: (status) => dispatch(setJobPostingLimitEnd(status)),
  setBillingPlan: (status) => dispatch(setBillingPlan(status)),
  saveJobAsDraft: (data, user_token) =>
    dispatch(saveJobAsDraft(data, user_token)),
  saveDraftJobAsTemplate: (data, user_token) =>
    dispatch(saveDraftJobAsTemplate(data, user_token)),
  setShowBillingModal: (status) => dispatch(setShowBillingModal(status)),
  fetchUserAvalibleConnect: (userToken) =>
    dispatch(fetchUserAvalibleConnect(userToken)),
  getBillingPlan: (userToken) => dispatch(getBillingPlan(userToken)),
  setBoostConfirmationModal: (status) =>
    dispatch(setBoostConfirmationModal(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobPostLimitExceed);
