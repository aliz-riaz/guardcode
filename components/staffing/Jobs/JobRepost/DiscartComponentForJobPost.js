import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "reactstrap";
import { connect } from "react-redux";
import {
  setDiscardModalForJobPost,
  saveJobAsTemplateFromRepost,
} from "../../../../redux/actions/jobPostAction";
import router, { useRouter } from "next/router";
import { setScreenToShowOnStaffing } from "../../../../redux/actions/staffingAction";
import { SaveJobTemplateFromRepost } from "../../../../utilites/utilityForJobPost";

const DiscartModelComponentForJobPost = (props) => {
  const { buttonLabel, className } = props;

  const [submitting, setSubmitting] = useState(false);

  const leaveFunction = async () => {
    await SaveJobTemplateFromRepost({ ...props, setSubmitting });
    // props.setScreenToShowOnStaffing("jobs");
    // props.setDiscardModalForJobPost(false);
    // props.restJobPostReducer();
    // props.resetBillingPlan();
  };

  const cancelFunciton = () => {
    if (submitting) {
      return;
    }
    props.setDiscardModalForJobPost(false);
  };

  const dontSaveHandler = () => {
    if (submitting) {
      return;
    }
    props.dontSaveAndExit();
  };

  return (
    <div>
      <Modal
        isOpen={props.show_discard_modal_for_job_post}
        className={className + " discardModal"}
        backdrop="static"
        keyboard={false}
      >
        <ModalHeader toggle={cancelFunciton}>Save your progress</ModalHeader>
        <ModalBody>
          Save your progress as a draft. Complete your job posting whenever
          you're ready!
        </ModalBody>
        <ModalFooter>
          <Button
            color="green"
            className="btn-sm"
            onClick={leaveFunction}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Spinner size={"sm"} /> Saving
              </>
            ) : (
              "Save as draft"
            )}
          </Button>{" "}
          <Button
            color="secondary"
            className="btn-sm"
            onClick={dontSaveHandler}
            disabled={submitting}
          >
            Leave
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  show_discard_modal_for_job_post:
    state.vantage.jobPostReducer.show_discard_modal_for_job_post,
  discard_link_for_modal: state.vantage.jobPostReducer.discard_link_for_modal,

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
  job_post_shift_timing: state.vantage.jobPostReducer.shift_timing,
  job_post_shift_schedule: state.vantage.jobPostReducer.shift_schedule,
  job_post_contract_type: state.vantage.jobPostReducer.contract,
  clickedJobId: state.vantage.staffingReducer.clickedJobId,
  sia_license: state.vantage.jobPostReducer.SIALicense,
  websiteLink: state.vantage.jobPostReducer.websiteLink,
  allowedExternalLink: state.vantage.organisationReducer.allowedExternalLink,
});

const mapDispatchToProps = (dispatch) => ({
  setDiscardModalForJobPost: (status) =>
    dispatch(setDiscardModalForJobPost(status)),
  restJobPostReducer: () => dispatch({ type: "RESET_JOBPOST_REDUCER" }),
  resetBillingPlan: () =>
    dispatch({
      type: "SET_BILLING_PLAN",
      payload: [],
    }),
  setScreenToShowOnStaffing: (screen) =>
    dispatch(setScreenToShowOnStaffing(screen)),
  saveJobAsTemplateFromRepost: (data, userToken) =>
    dispatch(saveJobAsTemplateFromRepost(data, userToken)),
  dontSaveAndExit: () => {
    dispatch({
      type: "SET_FILTER_FOR_APPLICANT_LIST",
      payload: "all",
    });
    dispatch({
      type: "SET_DATE_ORDER_FOR_APPLICANT_LIST",
      payload: "DESC",
    });
    dispatch({
      type: "SET_SEARCH_KEYWORD_FOR_APPLICANT_LIST",
      payload: "",
    });
    dispatch({
      type: "SET_SCREEN_TO_SHOW_ON_STAFFING",
      payload: "jobs",
    });
    dispatch({
      type: "RESET_JOBPOST_REDUCER",
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscartModelComponentForJobPost);
