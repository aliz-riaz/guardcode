import { FormGroup } from "reactstrap";
import { connect } from "react-redux";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";

import {
  setCheckBoxListForCloseJobDiscard,
  setJobStatus,
  fetchApplicantsAgainstJob,
} from "../../../redux/actions/staffingAction";
import { useRef } from "react";

const step2YesSchema = Yup.object().shape({
  checkBoxForYes: Yup.array()
    .required()
    .min(1, "Please select atleast one of above"),
});

const ScreenForStepTwoNo = (props) => {
  const textArea = useRef(null);
  return (
    <>
      <h3 className="mt-3">Why didn't you hire with us?</h3>
      <Formik
        enableReinitialize={true}
        initialValues={{
          checkBoxForYes: props.check_box_list_for_close_job_discard,
        }}
        validationSchema={step2YesSchema}
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
              other_reason: textArea.current.value,
            },
            {
              jobId: props.selected_job_id_for_close_job_discard,
              applicantStatus: props.filter_for_applicants_list,
              keyword: props.search_keyword_for_applicants_list,
              dateOrder: props.date_order_for_applicants_list,
              pageNumber: props.current_page_for_applicant_list,
              url: "",
            },
            null,
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
          <FormikForm id="closeStepOneNo">
            <div className="mt-2">
              {props.no_screen_questions_for_close_job_discard.map((ques) => {
                return (
                  <>
                    <FormGroup className="gl-checkbox form-check mb-1">
                      <label className="form-check-label">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="checkBoxForYes"
                          value={ques.id}
                          onChange={(e) => {
                            e.target.checked
                              ? props.setCheckBoxListForCloseJobDiscard([
                                  ...values.checkBoxForYes,
                                  e.target.value,
                                ])
                              : props.setCheckBoxListForCloseJobDiscard(
                                  values.checkBoxForYes.filter((value) =>
                                    value == ques.id ? false : true
                                  )
                                );
                            ques.id === 6
                              ? e.currentTarget.checked
                                ? (textArea.current.style.display = "block")
                                : (textArea.current.style.display = "none")
                              : "";
                          }}
                        />
                        <span>{ques.title}</span>
                        <span className="checkmark"></span>
                      </label>
                    </FormGroup>
                    {ques.id === 6 && (
                      <textarea
                        style={{ display: "none" }}
                        className="form-control"
                        ref={textArea}
                        placeholder="Write your comment"
                      ></textarea>
                    )}
                  </>
                );
              })}
              {errors.checkBoxForYes && touched.checkBoxForYes ? (
                <div className="text-danger">{errors.checkBoxForYes}</div>
              ) : null}
            </div>
          </FormikForm>
        )}
      </Formik>
    </>
  );
};

const mapStateToProps = (state) => ({
  radio_for_job_close_discard:
    state.vantage.staffingReducer.radioForCloseJobDiscard,
  check_box_list_for_close_job_discard:
    state.vantage.staffingReducer.checkBoxListForCloseJobDiscard,
  no_screen_questions_for_close_job_discard:
    state.vantage.staffingReducer.noScreenQuestionsForClosJobDiscard,
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
  user_id: state.vantage.userDataReducer.user_id,
  organisationFilters: state.vantage.organisationReducer.filter,
  organisationMembers: state.vantage.organisationReducer.organisationMembers,
});

const mapDispatchToProps = (dispatch) => ({
  setCheckBoxListForCloseJobDiscard: (list) =>
    dispatch(setCheckBoxListForCloseJobDiscard(list)),
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
    selected_applicants,
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
        selected_applicants,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ScreenForStepTwoNo);
