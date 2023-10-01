import { Button, Row, Col } from "reactstrap";
import { Formik } from "formik";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { isBrowser } from "react-device-detect";
import {
  setDiscardLinkForModalJobPost,
  setDiscardModalForJobPost,
  setShowJobPreview,
  setUserInJobPostingFlow,
  setJobPostingLimitEnd,
} from "../../../../redux/actions/jobPostAction";
import {
  setScreenToShowOnStaffing,
  setLatestJobId,
} from "../../../../redux/actions/staffingAction";
import {
  setBuyBoostModalStatus,
  setBoostConfirmationModal,
  setShowJobPostCalculator,
  setShowBillingModal,
  setJobPostModalStatus,
} from "../../../../redux/actions/billingAction";
import Link from "next/dist/client/link";
import { Spinner } from "reactstrap";
import styles from "./NextBackButton.module.scss";

function NextBackButton(props) {
  const router = useRouter();
  const [formToBeSubmitted, setFormToBeSubmitted] = useState({
    1: "role",
    2: "location",
    3: "salary",
    4: "updatingEmail",
    5: "jobPostPayment",
  });
  const [formName, setFormName] = useState(
    formToBeSubmitted[props.jobPostActiveStep]
  );

  const onClickConfirmJobEdit = async () => {
    // setIsPostWithBoostLoading(true);
    // const apicall = await props.getBillingPlan(props.user_token);
    // setIsPostWithBoostLoading(false);
    // props.setBoostConfirmationModal(true);
    // props.setShowBillingModal(true)
    // props.setShowJobPostCalculator(true)
    // props.setJobPostModalStatus(true);
  };

  useEffect(() => {
    setFormName(formToBeSubmitted[props.active_step]);
  }, [props.active_step]);

  return (
    <>
      <div className="container">
        <Row className="justify-content-center align-items-center row w-100">
          <Col className="col-12 col-md-4 text-left">
            {props.active_step == 1
              ? process.browser && (
                  <Button
                    onClick={() => {
                      if (
                        props.job_post_job_title != "" ||
                        props.job_post_job_description != "" ||
                        props.job_post_is_license_required != "" ||
                        props.job_post_contract_type != "" ||
                        props.job_post_ref_number != "" ||
                        props.job_post_shift_schedule != "" ||
                        props.job_post_shift_timing != "" ||
                        props.job_post_is_immediate != "" ||
                        props.job_post_type_of_employment != ""
                      ) {
                        props.setDiscardModalForJobPost(true);
                      } else {
                        props.setUserInJobPostingFlow(false);
                        props.setScreenToShowOnStaffing("jobs");
                      }
                    }}
                    className="btn w-100 btn_back w-md-auto btn-sm bg-transparent border-0 shadow-none text-dark"
                  >
                    Cancel
                  </Button>
                )
              : process.browser && (
                  <Button
                    onClick={() => props.goToBack()}
                    disabled={props.active_step <= 1}
                    className="btn w-100 btn_back w-md-auto btn-sm btn-gray w-100 shadow-none"
                  >
                    Back
                  </Button>
                )}
          </Col>
          <Col className="col-12 col-md-4">
            {props.active_step >= 5 ? (
              <>
                <button
                  disabled={props.isSubmitting}
                  form="jobPostPayment"
                  type="submit"
                  className="d-flex justify-content-center align-items-center btn w-100 btn-next w-md-auto btn_next btn-sm btn-green"
                >
                  Pay and post job{" "}
                  {props.isSubmitting && (
                    <span className="ml-2">
                      <Spinner size={"sm"} color={"dark"} />
                    </span>
                  )}{" "}
                </button>
              </>
            ) : (
              <div className={styles.button_wrapper}>
                {props.active_step != 4 && (
                  <button
                    disabled={
                      props.isSubmitting ||
                      (props.active_step == 4 && props.jobTemplate.error)
                    }
                    form={formName}
                    type="submit"
                    className={`${
                      props.active_step == 4
                        ? `${styles.post_without_boost}`
                        : "btn btn_back w-md-auto btn-sm btn-green w-100"
                    }`}
                  >
                    {props.active_step != 4 && "Next"}
                  </button>
                )}
                {props.active_step == 4 && (
                  <>
                    <button
                      disabled={
                        props.isSubmitting ||
                        (props.active_step == 4 && props.jobTemplate.error)
                      }
                      onClick={() => onClickConfirmJobEdit()}
                      form={formName}
                      type="submit"
                      className={`btn btn_back w-md-auto btn-sm btn-green w-100`}
                    >
                      Update
                    </button>
                  </>
                )}
              </div>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user_token: state.vantage.userDataReducer.user_token,
    active_step: state.vantage.jobPostReducer.activeStep,
    job_title: state.vantage.jobPostReducer.jobTitle,
    type_of_employment: state.vantage.jobPostReducer.typeOfEmployment,
    company_name: state.vantage.userDataReducer.user_name,
    venue_type: state.vantage.jobPostReducer.venueType,
    job_description: state.vantage.jobPostReducer.editor,
    specific_address: state.vantage.jobPostReducer.willReportToSpecificAddress,
    google_city_town: state.vantage.jobPostReducer.WillNotReportToCity,
    google_post_code: state.vantage.jobPostReducer.WillNotReportToPostCode,
    loqate_address_line_one:
      state.vantage.jobPostReducer.willReportToWorkaddress1,
    loqate_address_line_two:
      state.vantage.jobPostReducer.willReportToWorkaddress2,
    loqate_city_town: state.vantage.jobPostReducer.willReportToWorkCity,
    loqate_postal_code: state.vantage.jobPostReducer.willReportToWorkPostCode,
    salary_benefits: state.vantage.jobPostReducer.salaryBenefits,
    salary_pay: state.vantage.jobPostReducer.salaryValue,
    salary_per_unit: state.vantage.jobPostReducer.salaryValuePerUnit,
    is_license_required: state.vantage.jobPostReducer.radio,
    license_required: state.vantage.jobPostReducer.SIALicense,
    contract_type: state.vantage.jobPostReducer.contract,
    daily_updates_about_this_job_email:
      state.vantage.jobPostReducer.settingsEmail,
    center_for_google_map: state.vantage.jobPostReducer.centerForMapGoogle,
    is_request_loader: state.vantage.commonReducer.is_request_loader,

    job_post_job_title: state.vantage.jobPostReducer.jobTitle,
    job_post_job_description: state.vantage.jobPostReducer.editor,
    job_post_is_license_required: state.vantage.jobPostReducer.radio,
    job_post_contract_type: state.vantage.jobPostReducer.contract,
    job_post_type_of_employment: state.vantage.jobPostReducer.typeOfEmployment,
    is_request_loader: state.vantage.commonReducer.is_request_loader,
    show_job_preview: state.vantage.jobPostReducer.showJobPostPreview,

    job_post_ref_number: state.vantage.jobPostReducer.refNumber,
    job_post_shift_schedule: state.vantage.jobPostReducer.shift_schedule,
    job_post_shift_timing: state.vantage.jobPostReducer.shift_timing,
    job_post_is_immediate: state.vantage.jobPostReducer.is_immediate,

    avalible_connects: state.vantage.jobPostReducer.availableConnects,
    jobTemplate: state.vantage.jobPostReducer.jobTemplate,
    billingPlan: state.vantage.jobPostReducer.billingPlan,
    jobPostingLimitEnd: state.vantage.jobPostReducer.jobPostingLimitEnd,
    boostMatchingCandidatesList:
      state.vantage.billingReducer.boostMatchingCandidatesList,
    boostConfirmationModal: state.vantage.billingReducer.boostConfirmationModal,
    salary_type: state.vantage.jobPostReducer.salaryType,
    salary_range_min: state.vantage.jobPostReducer.salaryRangeMin,
    salary_range_max: state.vantage.jobPostReducer.salaryRangeMax,
    salary_work_hour_per_week:
      state.vantage.jobPostReducer.salaryWorkHourPerWeek,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setDiscardLinkForModalJobPost: (link) =>
    dispatch(setDiscardLinkForModalJobPost(link)),
  setLatestJobId: (jobId) => dispatch(setLatestJobId(jobId)),
  setDiscardModalForJobPost: (status) =>
    dispatch(setDiscardModalForJobPost(status)),
  setScreenToShowOnStaffing: (screen) =>
    dispatch(setScreenToShowOnStaffing(screen)),
  setShowJobPreview: (status) => dispatch(setShowJobPreview(status)),
  setUserInJobPostingFlow: (status) =>
    dispatch(setUserInJobPostingFlow(status)),
  // getBillingPlan: (userToken) => dispatch(getBillingPlan(userToken)),
  setJobPostingLimitEnd: (status) => dispatch(setJobPostingLimitEnd(status)),
  setBuyBoostModalStatus: (status) => dispatch(setBuyBoostModalStatus(status)),
  setBoostConfirmationModal: (status) =>
    dispatch(setBoostConfirmationModal(status)),
  setShowJobPostCalculator: (status) =>
    dispatch(setShowJobPostCalculator(status)),
  setShowBillingModal: (status) => dispatch(setShowBillingModal(status)),
  setJobPostModalStatus: (status) => dispatch(setJobPostModalStatus(status)),
});
export default connect(mapStateToProps, mapDispatchToProps)(NextBackButton);

// export default connect(mapStateToProps)(NextBackButton);

{
  /* <Row className="justify-content-center row">
<Col className="col-6 col-md-6 d-flex justify-content-end">
  <Button onClick={() => props.goToBack()} className="btn w-100 btn_back w-md-auto btn-sm btn-gray w-100" disabled={props.active_step<=1}>BACK</Button>
</Col>
<Col className="col-6 col-md-6 d-flex justify-content-start">
  <Button form={formName} className="btn w-100 btn-next w-md-auto btn_next btn-sm btn-green" type="submit">NEXT</Button>
</Col>
</Row> */
}
