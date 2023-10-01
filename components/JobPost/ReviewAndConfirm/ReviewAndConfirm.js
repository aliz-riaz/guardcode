import { Button, Label, Row, Col, FormGroup } from "reactstrap";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import {
  setSettingsEmail,
  setActiveStep,
  postJob,
  // fetchUsersClientSecretForStripe,
  fetchUserAvalibleConnect,
  // updateJobDataInCaseOfUpdate,
  getBillingPlan,
  setShowJobPreview,
  setWebsiteLink,
} from "../../../redux/actions/jobPostAction";
import styles from "./ReviewAndConfirm.module.scss";
import PreviewJob from "../PreviewJob/Preview";
import * as Yup from "yup";
import { shiftTimings } from "../../../utilites/utility";
import { useEffect } from "react";
import SaveJobTemp from "./SaveJobTemp/SaveJobTemp";
import BoostCard from "./BoostCard/BoostCard";
import {
  setMatchingCandidates,
  setJobPostModalStatus,
  setShowBillingModal,
  setShowJobPostCalculator,
  fetchMatchingCandidatesForBoost,
} from "../../../redux/actions/billingAction";
import { JobPostWhenBoostNotApplicableJobPostPage } from "../../../utilites/utilityForJobPost";

const SettingsSchema = Yup.object().shape({
  settingsEmail: Yup.string().email("Please enter a valid email address"),
  websiteLink: Yup.string()
    .url("URL should look like https://www.example.com or https://example.com")
    .nullable(),
});

const ReviewAndConfirm = (props) => {
  // 1 => On-site parking,
  // 2 => Company Car,
  // 3 => Medical insurance,
  // 4 => Sick pay,
  // 5 => Uniform,
  // 6 => Store discounts,

  useEffect(() => {
    props.fetchUserAvalibleConnect(props.user_token);
    return () => {
      props.setMatchingCandidates({});
    };
  }, [props.showBillingModal]);

  const mapSalaryBeniftsBackToText = (value) => {
    value = parseInt(value);
    switch (value) {
      case 1:
        return "On-site parking";
      case 2:
        return "Company car";
      case 3:
        return "Medical insurance";
      case 4:
        return "Sick pay";
      case 5:
        return "Uniform";
      case 6:
        return "Store discount";
      default:
        return "";
    }
  };
  const mapSalaryUnitBackToCompleteText = (value) => {
    switch (value) {
      case "H":
        return "per hour";
      case "M":
        return "per month";
      case "Y":
        return "per year";
      default:
        return "";
    }
  };
  const mapCourseNumberBackToCourseName = (value) => {
    value = parseInt(value);
    switch (value) {
      case 12:
        return "SIA Door Supervisor Licence";
      case 13:
        return "SIA CCTV Licence";
      case 44:
        return "SIA Security Guarding Licence";
      case 29:
        return "SIA Close Protection Licence";
      default:
        return "";
    }
  };

  const editIconClickHandler = (e, activeStep) => {
    e.preventDefault();
    props.setActiveStep(activeStep);
  };
  return (
    <>
      <div className="pt-2 pt-md-5 pb-2 pb-md-4 row justify-content-end">
        <div className="col-md-10 col">
          <div className={`row align-items-center`}>
            {/* <div className="col-md-2 text-left">
              <button
                className={`btn btn-sm btn-transparent pl-0 ${styles.back_button}`}
                onClick={() => props.setActiveStep(3)}
              >
                <img
                  src={`${process.env.APP_URL}/images/chevron-left.svg`}
                  alt="chevron"
                />
                Back
              </button>
            </div> */}
            <div className="col-md-7 text-center">
              <h3 className="text-sm-uppercase font-sm-12 mb-0">
                Review & Confirm
              </h3>
            </div>
            {/* <div className="col-md-5 text-right">
              <button
                className={`btn btn-sm btn-gray text-white ${styles.preview_job}`}
                onClick={() => props.setShowJobPreview(true)}
              >
                <img
                  src={`${process.env.APP_URL}/images/visibility.svg`}
                  alt="eye"
                />
                Preview Job
              </button>
            </div> */}
          </div>
        </div>
      </div>
      <Row className="justify-content-end">
        <Col className="col-12 col-md-6">
          <div className="bg-white py-4 px-4 rounded">
            <p className={`${styles.policy_txt}`}>
              By pressing confirm, you agree that this job will be posted and
              applications will be processed in accordance with GuardPass for
              Employer's,{" "}
              <a href="/privacy" target="_blank">
                {" "}
                Privacy Policy{" "}
              </a>{" "}
              and{" "}
              <a href="/terms" target="_blank">
                {" "}
                Terms of Service{" "}
              </a>
              . You consent to GuardPass for Employer informing a user that you
              have opened, viewed or made a decision regarding the user's
              application.
            </p>

            <Formik
              enableReinitialize={true}
              initialValues={{
                settingsEmail: props.daily_updates_about_this_job_email,
                websiteLink: props.websiteLink,
              }}
              validationSchema={SettingsSchema}
              onSubmit={async (values) => {
                JobPostWhenBoostNotApplicableJobPostPage(props);
              }}
            >
              {({ errors, touched, values }) => (
                <Form id="updatingEmail">
                  <div className={`${styles.edit_preview} pr-0`}>
                    <h4 className="mb-3">
                      Would you like to notify another email address when
                      applicants apply for this job?
                    </h4>
                    <FormGroup className="gl-input mb-2">
                      <Field
                        value={props.daily_updates_about_this_job_email}
                        type="text"
                        name="settingsEmail"
                        className="form-control"
                        placeholder="settingsEmail"
                        onChange={(e) => {
                          props.setSettingsEmail(e.target.value);
                        }}
                      />
                      <Label>Notify another email address</Label>
                      {errors.settingsEmail && touched.settingsEmail ? (
                        <div className="text-danger mt-2">
                          {errors.settingsEmail}
                        </div>
                      ) : null}
                    </FormGroup>
                  </div>

                  {props.allowedExternalLink == 1 && (
                    <div className={`${styles.edit_preview} pr-0`}>
                      <h4 className="mb-3">
                        Redirect jobseeker to you own link
                      </h4>

                      <FormGroup className="gl-input mb-2">
                        <Field
                          value={props.websiteLink}
                          type="text"
                          name="websiteLink"
                          className="form-control"
                          placeholder="websiteLink"
                          onChange={(e) => {
                            props.setWebsiteLink(e.target.value);
                          }}
                        />
                        <Label>Add your external link</Label>
                        {errors.websiteLink && touched.websiteLink ? (
                          <div className="text-danger mt-2">
                            {errors.websiteLink}
                          </div>
                        ) : null}
                      </FormGroup>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
            <div className={`${styles.edit_preview}`}>
              <h4 className="mb-0">Job title</h4>
              <p className="fs-6 mb-0 mt-1">{props.job_title}</p>
              <span
                className={`${styles.edit} cursor-pointer`}
                onClick={(e) => editIconClickHandler(e, "1")}
              >
                <img
                  src={process.env.APP_URL + "/images/edit-green.svg"}
                  alt=""
                />
              </span>
            </div>
            <div class={`${styles.edit_preview}`}>
              <h4 className="mb-0">Company</h4>
              <p className="fs-6 mb-0 mt-1">{props.company_name}</p>
            </div>
            <div class={`${styles.edit_preview}`}>
              <h4 className="mb-2">Job description</h4>
              {process.browser && (
                <div
                  className={styles.jobDescription}
                  dangerouslySetInnerHTML={{ __html: props.job_description }}
                ></div>
              )}
              <span
                className={`${styles.edit} cursor-pointer`}
                onClick={(e) => editIconClickHandler(e, "1")}
              >
                <img
                  src={process.env.APP_URL + "/images/edit-green.svg"}
                  alt=""
                />
              </span>
            </div>
            <div class={`${styles.edit_preview}`}>
              <h4 className="mb-0">Street address</h4>
              {props.specific_address == "yes" ? (
                <p className="fs-6">
                  {props.loqate_address_line_one +
                    " " +
                    props.loqate_address_line_two +
                    ", " +
                    props.loqate_postal_code +
                    " " +
                    props.loqate_city_town}
                </p>
              ) : (
                <p className="fs-6 mb-0 mt-1">
                  {props.google_city_town + "" + props.google_post_code}
                </p>
              )}
              <span
                className={`${styles.edit} cursor-pointer`}
                onClick={(e) => editIconClickHandler(e, "2")}
              >
                <img
                  src={process.env.APP_URL + "/images/edit-green.svg"}
                  alt=""
                />
              </span>
            </div>
            <div class={`${styles.edit_preview}`}>
              <h4 className="mb-0">Pay & benefits</h4>
              <span>
                {props.salary_type == "Fixed Rate"
                  ? `£ ${props.salary_pay}`
                  : `£${props.salary_range_min} - £${props.salary_range_max}`}{" "}
                <span className={`${styles.p_hour} ml-0`}>per hour</span>
              </span>
              {props.salary_benefits.length > 0 ? (
                <p className="mb-1">
                  Benifits:
                  {props.salary_benefits.map((value, indx) => {
                    return (
                      <span className="fs-6">
                        {" "}
                        {`${mapSalaryBeniftsBackToText(value)}${
                          props.salary_benefits.length - 1 != indx ? "," : ""
                        }`}
                      </span>
                    );
                  })}
                </p>
              ) : null}
              <span
                className={`${styles.edit} cursor-pointer`}
                onClick={(e) => editIconClickHandler(e, "3")}
              >
                <img
                  src={process.env.APP_URL + "/images/edit-green.svg"}
                  alt=""
                />
              </span>
            </div>
            {props.is_license_required == "yes" ? (
              <div class={`${styles.edit_preview}`}>
                <>
                  <h4 className="mb-0">Licence required</h4>
                  <ul className="pl-0 mt-2">
                    {props.license_required.map((value) => {
                      return (
                        <li className="fs-6">
                          {mapCourseNumberBackToCourseName(value)}
                        </li>
                      );
                    })}
                  </ul>
                </>
                <span
                  className={`${styles.edit} cursor-pointer`}
                  onClick={(e) => editIconClickHandler(e, "1")}
                >
                  <img
                    src={process.env.APP_URL + "/images/edit-green.svg"}
                    alt=""
                  />
                </span>
              </div>
            ) : null}

            <div class={`${styles.edit_preview}`}>
              <h4>Employment type</h4>
              <p className="fs-6">{props.type_of_employment}</p>
              <span
                className={`${styles.edit} cursor-pointer`}
                onClick={(e) => editIconClickHandler(e, "1")}
              >
                <img
                  src={process.env.APP_URL + "/images/edit-green.svg"}
                  alt=""
                />
              </span>
            </div>

            <div class={`${styles.edit_preview}`}>
              <h4>Contract type</h4>
              <p className="fs-6">{props.contract_type}</p>
              <span
                className={`${styles.edit} cursor-pointer`}
                onClick={(e) => editIconClickHandler(e, "1")}
              >
                <img
                  src={process.env.APP_URL + "/images/edit-green.svg"}
                  alt=""
                />
              </span>
            </div>

            {props.shift_schedule && (
              <div class={`${styles.edit_preview}`}>
                <h4>Shift schedule</h4>
                <p className="fs-6">{props.shift_schedule}</p>
                <span
                  className={`${styles.edit} cursor-pointer`}
                  onClick={(e) => editIconClickHandler(e, "1")}
                >
                  <img
                    src={process.env.APP_URL + "/images/edit-green.svg"}
                    alt=""
                  />
                </span>
              </div>
            )}

            {props.shift_timing && (
              <div class={`${styles.edit_preview}`}>
                <h4>Shift timing</h4>
                <p className="fs-6">
                  {
                    shiftTimings?.filter(
                      (x) => x.value == props.shift_timing
                    )[0]?.label
                  }
                </p>
                <span
                  className={`${styles.edit} cursor-pointer`}
                  onClick={(e) => editIconClickHandler(e, "1")}
                >
                  <img
                    src={process.env.APP_URL + "/images/edit-green.svg"}
                    alt=""
                  />
                </span>
              </div>
            )}
            <div className={`${styles.edit_preview}`}>
              <h4>Expiry</h4>
              <p>Your job will be live for 28 days.</p>
            </div>

            {/* <h4>Daily Updates about this job will be sent to:</h4>
    <p className="fs-6">{props.daily_updates_about_this_job_email}</p> */}
          </div>
        </Col>
        <Col className="col-12 col-md-4">
          <SaveJobTemp />
          {/* <BoostCard /> */}
        </Col>
      </Row>
      <PreviewJob
        job_tile={props.job_title}
        type_of_employment={props.type_of_employment}
        company_name={props.company_name}
        job_description={props.job_description}
        specific_address={props.specific_address}
        google_city_town={props.google_city_town}
        loqate_city_town={props.loqate_city_town}
        salary_pay={props.salary_pay}
        salary_per_unit={props.salary_per_unit}
        license_required={props.license_required}
        contract_type={props.contract_type}
        show_job_preview={props.show_job_preview}
        salary_benefits={props.salary_benefits}
        venue_type={
          props.venue_type == "Other"
            ? props.venue_type_other_value
            : props.venue_type
        }
        shift_schedule={props.shift_schedule}
        shift_timings={
          shiftTimings?.filter((x) => x.value == props?.shift_timing)[0]?.label
        }
        salary_type={props.salary_type}
        salary_range_min={props.salary_range_min}
        salary_range_max={props.salary_range_max}
      />
    </>
  );
};

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
    client_secret: state.vantage.jobPostReducer.clientSecret,
    payment_intent: state.vantage.jobPostReducer.paymentIntent,
    avalible_connects: state.vantage.jobPostReducer.availableConnects,
    saveJobAsTemplate: state.vantage.jobPostReducer.saveJobAsTemplate,
    isAvailableForTeam: state.vantage.jobPostReducer.isAvailableForTeam,
    jobTemplate: state.vantage.jobPostReducer.jobTemplate,
    updateJobTemplate: state.vantage.jobPostReducer.updateJobTemplate,
    templateId: state.vantage.jobPostReducer.templateId,
    fromJobTemplate: state.vantage.jobPostReducer.fromJobTemplate,
    activeStep: state.vantage.jobPostReducer.activeStep,
    is_job_draft: state.vantage.jobPostReducer.is_job_draft,
    center_for_map_loqate: state.vantage.jobPostReducer.centerForMapLoqate,
    centerForMapLoqate: state.vantage.jobPostReducer.centerForMapLoqate,
    websiteLink: state.vantage.jobPostReducer.websiteLink,
    allowedExternalLink: state.vantage.organisationReducer.allowedExternalLink,
    showBillingModal: state.vantage.billingReducer.showBillingModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSettingsEmail: (settingsEmail) =>
      dispatch(setSettingsEmail(settingsEmail)),
    setActiveStep: (activeStep) => dispatch(setActiveStep(activeStep)),
    postJob: (data, user_token) => dispatch(postJob(data, user_token)),
    // fetchUsersClientSecretForStripe: (user_token, data) =>
    //   dispatch(fetchUsersClientSecretForStripe(user_token, data)),
    fetchUserAvalibleConnect: (user_token) =>
      dispatch(fetchUserAvalibleConnect(user_token)),
    // updateJobDataInCaseOfUpdate: (user_token, pi, data) =>
    //   dispatch(updateJobDataInCaseOfUpdate(user_token, pi, data)),
    getBillingPlan: (userToken) => dispatch(getBillingPlan(userToken)),
    setShowJobPreview: (status) => dispatch(setShowJobPreview(status)),
    setMatchingCandidates: (data) => dispatch(setMatchingCandidates(data)),
    setJobPostModalStatus: (status) => dispatch(setJobPostModalStatus(status)),
    setShowBillingModal: (status) => dispatch(setShowBillingModal(status)),
    setShowJobPostCalculator: (status) =>
      dispatch(setShowJobPostCalculator(status)),
    fetchMatchingCandidatesForBoost: (user_token, data) =>
      dispatch(fetchMatchingCandidatesForBoost(user_token, data)),
    setWebsiteLink: (link) => dispatch(setWebsiteLink(link)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewAndConfirm);
