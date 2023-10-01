import { Row, Col, FormGroup, Spinner } from "reactstrap";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";

// import { setActiveStepForCloseJobDiscard, setRadioForJobDiscard,addUserInFeedbackList, setJobStatus, fetchApplicantsAgainstJob } from '../../../redux/actions/staffingAction'
import {
  setActiveStepForCloseJobDiscard,
  setRadioForJobDiscard,
  setJobStatus,
  fetchApplicantsAgainstJob,
  fetchApplicantsByJobId,
} from "../../../redux/actions/staffingAction";
import styles from "./ScreenForHireWithGL.module.scss";
import { useEffect, useState } from "react";

const step3Schema = Yup.object().shape({
  checkBoxForSelectedApplicants: Yup.array()
    .required()
    .min(1, "Please select atleast one of above"),
});

const ScreenForHireWithGL = (props) => {
  const [selectedApplicants, setSelectedApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    await props.fetchApplicantsByJobId(
      props.user_token,
      props.selected_job_id_for_close_job_discard
    );
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center w-100 py-4">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <h3 className="mt-3">Who did you hire?</h3>
      <span className="text-black-50 fs-6">Select all that apply</span>
      <Formik
        enableReinitialize={true}
        initialValues={{
          // checkBoxForSelectedApplicants: props.selected_applicant,
          checkBoxForSelectedApplicants: selectedApplicants,
        }}
        validationSchema={step3Schema}
        onSubmit={async (values) => {
          const teamMembers =
            props.organisationFilters.staffing.switchValue === "All Jobs"
              ? props.organisationFilters.staffing.seletedTeamMembers.length > 0
                ? props.organisationFilters.staffing.seletedTeamMembers.map(
                    (member) => member.id
                  )
                : [
                    ...props.organisationMembers.map((member) => member.id),
                    props.user_id,
                  ]
              : [];
          await props.setJobStatus(
            props.user_token,
            props.selected_job_id_for_close_job_discard,
            "0",
            props.filter_for_job_list,
            props.search_keyword_for_job_list,
            props.date_order_for_job_list,
            props.current_page_for_job_list,
            {
              s1: props.radio_for_job_close_discard,
              s2: props.check_box_list_for_close_job_discard,
            },
            {
              jobId: props.selected_job_id_for_close_job_discard,
              applicantStatus: props.filter_for_applicants_list,
              keyword: props.search_keyword_for_applicants_list,
              dateOrder: props.date_order_for_applicants_list,
              pageNumber: props.current_page_for_applicant_list,
              url: "",
            },
            selectedApplicants,
            teamMembers,
            props.organisationFilters.staffing.switchValue === "My Jobs"
              ? "self"
              : "all"
          );
          props.cancelFunciton();
          await props.fetchApplicantsAgainstJob(
            props.user_token,
            props.latest_job_id_for_applicant_list,
            props.filter_for_applicants_list,
            props.search_keyword_for_applicants_list,
            props.date_order_for_applicants_list
          );
        }}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <FormikForm id="closeStepHireWithGL">
            <div className="mt-2">
              <div
                className={`d-flex justify-content-between flex-wrap ${styles.hire_employee_list}`}
              >
                {props.selected_list_for_feedback.map((applicantList) => (
                  <div className={`${styles.hire_employee_card}`}>
                    <FormGroup className="gl-checkbox form-check mb-1">
                      <label className="form-check-label">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="checkBoxForSelectedApplicants"
                          value={applicantList && applicantList.id}
                          onChange={(e) => {
                            e.currentTarget.checked
                              ? setSelectedApplicants((prevState) => [
                                  ...prevState,
                                  e.target.value,
                                ])
                              : setSelectedApplicants((prevState) => [
                                  ...prevState.filter(
                                    (i) => i != e.target.value
                                  ),
                                ]);
                          }}
                        />
                        <span className={`d-flex align-items-center`}>
                          <span className={`flex-shrink-0`}>
                            <img
                              width="30px"
                              src={
                                applicantList && applicantList.profile_picture
                              }
                            />
                          </span>
                          <span className="flex-grow-1">
                            <span className="pl-2">
                              {applicantList && applicantList.first_name}
                            </span>
                          </span>
                        </span>

                        <span
                          className={`checkmark ${styles.checkmark}`}
                        ></span>
                      </label>
                    </FormGroup>
                  </div>
                  // ))
                ))}
              </div>
              {errors.checkBoxForSelectedApplicants &&
              touched.checkBoxForSelectedApplicants ? (
                <div className="text-danger">
                  {errors.checkBoxForSelectedApplicants}
                </div>
              ) : null}
            </div>
          </FormikForm>
        )}
      </Formik>
    </>
  );
};

const mapStateToProps = (state) => ({
  job_applicants_list: state.vantage.staffingReducer.jobApplicants,
  // selected_applicant: state.vantage.staffingReducer.selected_applicants,
  radio_for_job_close_discard:
    state.vantage.staffingReducer.radioForCloseJobDiscard,
  check_box_list_for_close_job_discard:
    state.vantage.staffingReducer.checkBoxListForCloseJobDiscard,
  yes_screen_questions_for_close_job_discard:
    state.vantage.staffingReducer.yesScreenQuestionsForClosJobDiscard,
  selected_job_id_for_close_job_discard:
    state.vantage.staffingReducer.selectJobForCloseJobDiscard,
  filter_for_job_list: state.vantage.staffingReducer.filterForJobList,
  date_order_for_job_list: state.vantage.staffingReducer.dateOrderForJobList,
  search_keyword_for_job_list:
    state.vantage.staffingReducer.searchKeywordForJobList,
  current_page_for_job_list:
    state.vantage.staffingReducer.currentPageForJobList,
  user_token: state.vantage.userDataReducer.user_token,
  filter_for_applicants_list:
    state.vantage.staffingReducer.filterForApplicantsList,
  date_order_for_applicants_list:
    state.vantage.staffingReducer.dateOrderForApplicantsList,
  search_keyword_for_applicants_list:
    state.vantage.staffingReducer.searchKeywordForApplicantsList,
  current_page_for_applicant_list:
    state.vantage.staffingReducer.currentPageForApplicantList,
  latest_job_id_for_applicant_list: state.vantage.staffingReducer.latestJobId,

  selected_list_for_feedback:
    state.vantage.staffingReducer.selectedListForFeedBack,
  user_id: state.vantage.userDataReducer.user_id,
  organisationFilters: state.vantage.organisationReducer.filter,
  organisationMembers: state.vantage.organisationReducer.organisationMembers,
});

const mapDispatchToProps = (dispatch) => ({
  setActiveStepForCloseJobDiscard: (step) =>
    dispatch(setActiveStepForCloseJobDiscard(step)),
  setRadioForJobDiscard: (value) => dispatch(setRadioForJobDiscard(value)),
  setJobStatus: (
    userToken,
    jobId,
    status,
    jobStatus,
    keyword,
    dateOrder,
    pageNumber,
    report,
    fetchApplicantData,
    selected_applicant,
    members,
    listType
  ) =>
    dispatch(
      setJobStatus(
        userToken,
        jobId,
        status,
        jobStatus,
        keyword,
        dateOrder,
        pageNumber,
        report,
        fetchApplicantData,
        selected_applicant,
        members,
        listType
      )
    ),
  fetchApplicantsAgainstJob: (
    userToken,
    jobId,
    jobStatus,
    keyword,
    dateOrder
  ) =>
    dispatch(
      fetchApplicantsAgainstJob(userToken, jobId, jobStatus, keyword, dateOrder)
    ),
  fetchApplicantsByJobId: (token, id) =>
    dispatch(fetchApplicantsByJobId(token, id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenForHireWithGL);
