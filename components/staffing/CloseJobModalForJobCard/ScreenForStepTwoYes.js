import { FormGroup } from "reactstrap";
import { connect } from "react-redux";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";

import {
  setActiveStepForCloseJobDiscard,
  setCheckBoxListForCloseJobDiscard,
  fetchApplicantsAgainstJob,
} from "../../../redux/actions/staffingAction";

const step2YesSchema = Yup.object().shape({
  checkBoxForYes: Yup.array()
    .required()
    .min(1, "Please select atleast one of above"),
  // checkBoxForYes: Yup.string().required('Please select  one of above'),
});

const ScreenForStepTwoYes = (props) => {
  return (
    <>
      <h4 className="mt-3">How did you hire?</h4>
      <Formik
        enableReinitialize={true}
        initialValues={{
          checkBoxForYes: props.check_box_list_for_close_job_discard,
        }}
        validationSchema={step2YesSchema}
        onSubmit={async (values) => {
          props.setActiveStepForCloseJobDiscard("3");
        }}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <FormikForm id="closeStepOneYes">
            <div className="mt-2">
              {props.yes_screen_questions_for_close_job_discard.map((ques) => {
                return (
                  <FormGroup
                    className="gl-checkbox form-check mb-1"
                    key={ques.id}
                  >
                    <label className="form-check-label">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="radioForJobClose"
                        value={ques.id}
                        onChange={(e) => {
                          // e.target.checked ? props.setCheckBoxListForCloseJobDiscard([...values.checkBoxForYes, e.target.value]) : props.setCheckBoxListForCloseJobDiscard(values.checkBoxForYes.filter((value) => (value == ques.id ? false : true)))
                          e.target.checked
                            ? props.setCheckBoxListForCloseJobDiscard([
                                e.target.value,
                              ])
                            : props.setCheckBoxListForCloseJobDiscard(
                                values.checkBoxForYes.filter((value) =>
                                  value == ques.id ? false : true
                                )
                              );
                        }}
                      />
                      <span>{ques.title}</span>
                      <span className="checkmark"></span>
                    </label>
                  </FormGroup>
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
});

const mapDispatchToProps = (dispatch) => ({
  setCheckBoxListForCloseJobDiscard: (list) =>
    dispatch(setCheckBoxListForCloseJobDiscard(list)),
  // fetchApplicantsAgainstJob: (userToken, jobId, jobStatus, keyword, dateOrder) => dispatch(fetchApplicantsAgainstJob(userToken, jobId, jobStatus, keyword, dateOrder)),
  setActiveStepForCloseJobDiscard: (step) =>
    dispatch(setActiveStepForCloseJobDiscard(step)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenForStepTwoYes);
