import React, { useEffect, useState } from "react";
import { Modal, ModalBody, Spinner } from "reactstrap";
import styles from "./JobPostModal.module.scss";
import { connect } from "react-redux";
import { fetchJobs } from "../../../../redux/actions/jobPostAction";
import {
  setJobPostModalStatus,
  checkAvailableCredits,
  fetchMatchingCandidatesForBoost,
  setMatchingCandidates,
  setShowBillingModal,
  setShowJobPostCalculator,
  setShowJobBoostCalculator,
} from "../../../../redux/actions/billingAction";
import {
  postJob,
  setActiveStep,
} from "../../../../redux/actions/jobPostAction";
import {
  JobPostWithBoostJobPostModal,
  JobPostWithoutBoostJobPostModal,
} from "../../../../utilites/utilityForJobPost";

function JobPostModal(props) {
  const [isPostWithoutBoot, setIsPostWithoutBoost] = useState(false);

  const [
    fetchMatchingApplicantsApiLoading,
    setFetchingMatchingApplicantsLoading,
  ] = useState(false);

  const [availableCredits, setAvailbleCredits] = useState([]);

  const [isPostWithBoost, setIsPostWithBoost] = useState(false);

  useEffect(async () => {
    setFetchingMatchingApplicantsLoading(true);
    const response = await props.checkAvailableCredits(props.user_token);
    if (response.job_post == 0) {
      props.setShowBillingModal(true);
      props.setShowJobPostCalculator(true);
      props.setJobPostModalStatus(false);
      return <div></div>;
    }
    setAvailbleCredits(response);
    setFetchingMatchingApplicantsLoading(false);
  }, []);

  const postJobWithoutBoostHandlerOnCreditAvaiable = async (credits) => {
    // setIsPostWithoutBoot(true);
    await JobPostWithoutBoostJobPostModal({ props, setIsPostWithoutBoost });
    // const data = {
    //   title: props.job_title,
    //   ref_number: props.job_ref_number,
    //   employment_type: props.type_of_employment,
    //   license_course_id: props.license_required,
    //   contract_type: props.contract_type,
    //   venue_type:
    //     props.venue_type == "Other"
    //       ? props.venue_type_other_value
    //       : props.venue_type,
    //   is_immediate: props.is_immediate,
    //   shift_schedule: props.shift_schedule,
    //   shift_timings: props.shift_timing,
    //   description: props.job_description,
    //   is_report_specific_address: props.specific_address == "yes" ? 1 : 0,
    //   address:
    //     props.specific_address == "yes" ? props.loqate_address_line_one : "",
    //   address2:
    //     props.specific_address == "yes" ? props.loqate_address_line_two : "",
    //   city:
    //     props.specific_address == "yes"
    //       ? props.loqate_city_town
    //       : props.google_city_town,
    //   // city: "London",
    //   postal_code:
    //     props.specific_address == "yes"
    //       ? props.loqate_postal_code
    //       : props.google_post_code,
    //   salary_type: props.salary_type,
    //   salary: props.salary_type == "Fixed Rate" ? props.salary_pay : null,
    //   salary_min:
    //     props.salary_type == "Fixed Rate" ? null : props.salary_range_min,
    //   salary_max:
    //     props.salary_type == "Fixed Rate" ? null : props.salary_range_max,
    //   pay_frequency: props.salary_per_unit,
    //   benefit_id: props.salary_benefits,
    //   updating_email: props.daily_updates_about_this_job_email,
    //   latitude:
    //     props.specific_address == "yes"
    //       ? props.center_for_map_loqate.lat
    //       : props.center_for_google_map.lat,
    //   longitude:
    //     props.specific_address == "yes"
    //       ? props.center_for_map_loqate.lng
    //       : props.center_for_google_map.lng,
    //   working_hours: props.salary_work_hour_per_week,
    //   // is_drafted: props.updateJobTemplate ? 0 : 1,
    //   template_name: props.jobTemplate.name,
    // };
    // if (
    //   (props.saveJobAsTemplate && props.fromJobTemplate === false) ||
    //   (props.updateJobTemplate &&
    //     props.fromJobTemplate &&
    //     props.saveJobAsTemplate)
    // ) {
    //   data.save_job_as_template = props.saveJobAsTemplate;
    //   data.is_available_for_team = props.isAvailableForTeam;
    //   data.template_name = props.jobTemplate.name;
    // } else if (
    //   props.updateJobTemplate &&
    //   props.fromJobTemplate &&
    //   props.saveJobAsTemplate == false
    // ) {
    //   data.update_job_template = Number(props.updateJobTemplate);
    //   data.is_available_for_team = props.isAvailableForTeam;
    //   data.template_name = props.jobTemplate.name;
    //   data.template_id = props.templateId;
    // }

    // await props.postJob(data, props.user_token).then((res) => {
    //   if (res) {
    //     props.setJobPostModalStatus(false);
    //     props.setActiveStep(6);
    //     setIsPostWithoutBoot(false);
    //   }
    // });
  };

  // const postJobWithoutBoostHandlerOnZeroCredit = () => {
  //   props.setShowBillingModal(true);
  //   props.setShowJobPostCalculator(true);
  // };

  const backButtonHandler = () => {
    props.setJobPostModalStatus(false);
    props.setMatchingCandidates({});
  };

  const jobPostWhenBoostAvailable = async () => {
    await JobPostWithBoostJobPostModal({ props, setIsPostWithBoost });
    // setIsPostWithBoost(true);

    // const data = {
    //   title: props.job_title,
    //   ref_number: props.job_ref_number,
    //   employment_type: props.type_of_employment,
    //   license_course_id: props.license_required,
    //   contract_type: props.contract_type,
    //   venue_type:
    //     props.venue_type == "Other"
    //       ? props.venue_type_other_value
    //       : props.venue_type,
    //   is_immediate: props.is_immediate,
    //   shift_schedule: props.shift_schedule,
    //   shift_timings: props.shift_timing,
    //   description: props.job_description,
    //   is_report_specific_address: props.specific_address == "yes" ? 1 : 0,
    //   address:
    //     props.specific_address == "yes" ? props.loqate_address_line_one : "",
    //   address2:
    //     props.specific_address == "yes" ? props.loqate_address_line_two : "",
    //   city:
    //     props.specific_address == "yes"
    //       ? props.loqate_city_town
    //       : props.google_city_town,
    //   // city: "London",
    //   postal_code:
    //     props.specific_address == "yes"
    //       ? props.loqate_postal_code
    //       : props.google_post_code,
    //   salary_type: props.salary_type,
    //   salary: props.salary_type == "Fixed Rate" ? props.salary_pay : null,
    //   salary_min:
    //     props.salary_type == "Fixed Rate" ? null : props.salary_range_min,
    //   salary_max:
    //     props.salary_type == "Fixed Rate" ? null : props.salary_range_max,
    //   pay_frequency: props.salary_per_unit,
    //   benefit_id: props.salary_benefits,
    //   updating_email: props.daily_updates_about_this_job_email,
    //   latitude:
    //     props.specific_address == "yes"
    //       ? props.center_for_map_loqate.lat
    //       : props.center_for_google_map.lat,
    //   longitude:
    //     props.specific_address == "yes"
    //       ? props.center_for_map_loqate.lng
    //       : props.center_for_google_map.lng,
    //   working_hours: props.salary_work_hour_per_week,
    //   // is_drafted: props.updateJobTemplate ? 0 : 1,
    //   should_boost: true,
    //   template_name: props.jobTemplate.name,
    // };

    // if (
    //   (props.saveJobAsTemplate && props.fromJobTemplate === false) ||
    //   (props.updateJobTemplate &&
    //     props.fromJobTemplate &&
    //     props.saveJobAsTemplate)
    // ) {
    //   data.save_job_as_template = props.saveJobAsTemplate;
    //   data.is_available_for_team = props.isAvailableForTeam;
    //   data.template_name = props.jobTemplate.name;
    // } else if (
    //   props.updateJobTemplate &&
    //   props.fromJobTemplate &&
    //   props.saveJobAsTemplate == false
    // ) {
    //   data.update_job_template = Number(props.updateJobTemplate);
    //   data.is_available_for_team = props.isAvailableForTeam;
    //   data.template_name = props.jobTemplate.name;
    //   data.template_id = props.templateId;
    // }

    // await props.postJob(data, props.user_token).then((res) => {
    //   if (res) {
    //     props.setJobPostModalStatus(false);
    //     props.setActiveStep(6);
    //     setIsPostWithBoost(false);
    //   }
    // });
  };

  const addBoostCredits = () => {
    props.setShowBillingModal(true);
    props.setShowJobBoostCalculator(true);
    props.setJobPostModalStatus(false);
  };

  if (fetchMatchingApplicantsApiLoading) {
    return (
      <div className={styles.modal_wrap}>
        <div className={styles.modal_header}>
          <button onClick={() => backButtonHandler()}>
            <img
              src={process.env.APP_URL + "/images/arrow-left.svg"}
              alt="arrow"
              className="img-fluid"
            />
            Back
          </button>
        </div>

        <div className={styles.boost_card}>
          <div className={styles.card_wrapper}>
            <h2 className="animated_shimmer">
              Reach candidates 5x faster with{" "}
              <span>
                <img
                  src={`${process.env.APP_URL}/images/offline-bolt.svg`}
                  alt="bolt"
                />
                Boost
              </span>
            </h2>
            <ul>
              {[1, 2, 3, 4].map((list) => (
                <li>
                  <a className="animated_shimmer mb-0 d-block rounded-circle">
                    <img
                      src={`${process.env.APP_URL}/images/user-1.jpg`}
                      alt="user"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <ul className={styles.bullet_points}>
              <li className="animated_shimmer">
                Instantly notifies matching and active jobseekers in the area
              </li>
              <li className="animated_shimmer mb-0">
                Your job gets priority in search results
              </li>
            </ul>
          </div>
          <button
            className={`${styles.add_credit} fs-5 btn btn-md btn-green w-50 mx-auto d-block mt-5 animated_shimmer mb-0`}
          >
            Add boost credits
          </button>
        </div>

        <button
          type="submit"
          className={`${styles.post_without_boost} animated_shimmer mb-0`}
        >
          Post job without boost
        </button>
      </div>
    );
  }

  return (
    <div className={styles.modal_wrap}>
      <div className={styles.modal_header}>
        <button onClick={() => backButtonHandler()}>
          <img
            src={process.env.APP_URL + "/images/arrow-left.svg"}
            alt="arrow"
            className="img-fluid"
          />
          Back
        </button>
      </div>
      {props.boostMatchingCandidatesList?.is_boost_applicable && (
        <div className={styles.boost_card}>
          <div className={styles.card_wrapper}>
            <h2>
              Reach candidates 5x faster with{" "}
              <span>
                <img
                  src={`${process.env.APP_URL}/images/offline-bolt.svg`}
                  alt="bolt"
                />
                Boost
              </span>
            </h2>
            <ul>
              {props.boostMatchingCandidatesList?.first_three_applilcants?.map(
                (list) => (
                  <li>
                    <a>
                      <img src={list.profile_picture} alt="bolt" />
                    </a>
                  </li>
                )
              )}

              <li className={styles.plus_value}>
                <a>+{props.boostMatchingCandidatesList?.remaining_market}</a>
              </li>
            </ul>

            <ul className={styles.bullet_points}>
              <li>
                Instantly notifies matching and active jobseekers in the area
              </li>
              <li>Your job gets priority in search results</li>
            </ul>
          </div>

          {availableCredits.boost_job > 0 && (
            <button
              className={`${styles.post_with_boost} mt-4`}
              onClick={() => jobPostWhenBoostAvailable()}
              disabled={isPostWithoutBoot || isPostWithBoost}
            >
              <img
                src={`${process.env.APP_URL}/images/bolt-dark.svg`}
                alt="bolt"
              />
              Post with boost
              {isPostWithBoost && <Spinner size="md" />}
            </button>
          )}

          {availableCredits.boost_job == 0 && (
            <button
              disabled={isPostWithoutBoot || isPostWithBoost}
              className={`${styles.add_credit} fs-5 btn btn-md btn-green w-50 mx-auto d-block mt-5`}
              onClick={() => addBoostCredits()}
            >
              Add boost credits
            </button>
          )}
        </div>
      )}
      {/* {props.boostMatchingCandidatesList?.is_boost_applicable == false && (
        <div className={styles.boost_card}>
          <div className={styles.card_wrapper}>
            <h2>
              Reach candidates 5x faster with{" "}
              <span>
                <img
                  src={`${process.env.APP_URL}/images/offline-bolt.svg`}
                  alt="bolt"
                />
                Boost
              </span>
            </h2>

            <ul className={styles.bullet_points}>
              <li>
                Instantly notifies matching and active jobseekers in the area
              </li>
              <li>Your job gets priority in search results</li>
            </ul>
          </div>
          <div className={styles.boost_unavailable}>
            <img
              src={`${process.env.APP_URL}/images/error-ico.svg`}
              alt="bolt"
            />
            Boost is not available at your location
          </div>
        </div>
      )} */}
      {availableCredits.job_post > 0 && (
        <button
          // form="updatingEmail"
          type="submit"
          className={styles.post_without_boost}
          disabled={isPostWithoutBoot || isPostWithBoost}
          onClick={() => {
            postJobWithoutBoostHandlerOnCreditAvaiable();
          }}
        >
          Post job without boost
          {isPostWithoutBoot && <Spinner size="sm" />}
        </button>
      )}
      {/* {availableCredits.job_post == 0 && (
        <button
          type="submit"
          className={`${styles.post_without_boost}`}
          onClick={() => {
            postJobWithoutBoostHandlerOnZeroCredit();
          }}
        >
          Post job without boost
          {isPostWithoutBoot && <Spinner size="sm" />}
        </button>
      )} */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
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
    salary_work_hour_per_week:
      state.vantage.jobPostReducer.salaryWorkHourPerWeek,
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
    boostMatchingCandidatesList:
      state.vantage.billingReducer.boostMatchingCandidatesList,
    saveJobAsTemplate: state.vantage.jobPostReducer.saveJobAsTemplate,
    fromJobTemplate: state.vantage.jobPostReducer.fromJobTemplate,
    websiteLink: state.vantage.jobPostReducer.websiteLink,
    allowedExternalLink: state.vantage.organisationReducer.allowedExternalLink,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchJobs: (status) => dispatch(fetchJobs(status)),
  setJobPostModalStatus: (status) => dispatch(setJobPostModalStatus(status)),
  checkAvailableCredits: (userToken) =>
    dispatch(checkAvailableCredits(userToken)),
  fetchMatchingCandidatesForBoost: (user_token, data) =>
    dispatch(fetchMatchingCandidatesForBoost(user_token, data)),
  setMatchingCandidates: (data) => dispatch(setMatchingCandidates(data)),
  setShowBillingModal: (status) => dispatch(setShowBillingModal(status)),
  setShowJobPostCalculator: (status) =>
    dispatch(setShowJobPostCalculator(status)),
  setShowJobBoostCalculator: (status) =>
    dispatch(setShowJobBoostCalculator(status)),
  postJob: (data, user_token) => dispatch(postJob(data, user_token)),
  setActiveStep: (step) => dispatch(setActiveStep(step)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobPostModal);
