import { Row, Col, FormGroup } from "reactstrap";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";

import {
  setActiveStepForCloseJobDiscard,
  setRadioForJobDiscard,
} from "../../../redux/actions/staffingAction";

const step1Schema = Yup.object().shape({
  radioForJobClose: Yup.string().required("Please select  one of above"),
});

const ScreenForStepOne = (props) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        radioForJobClose: props.radio_for_job_close_discard,
      }}
      validationSchema={step1Schema}
      onSubmit={(values) => {
        props.setActiveStepForCloseJobDiscard("2");
      }}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <FormikForm id="closeStepOne">
          <Row>
            <Col className="col-12 mt-2">
              <FormGroup className="gl-radio mb-0">
                <label>
                  <input
                    type="radio"
                    name="radioForJobClose"
                    className=""
                    value="1"
                    onChange={(e) => {
                      props.setRadioForJobDiscard(e.target.value);
                    }}
                  />
                  <span>I hired someone!</span>
                  <span className="checkmark"></span>
                </label>
              </FormGroup>
              <FormGroup className="gl-radio mb-0">
                <label>
                  <input
                    type="radio"
                    name="radioForJobClose"
                    className=""
                    value="0"
                    onChange={(e) => {
                      props.setRadioForJobDiscard(e.target.value);
                    }}
                  />
                  <span>I didn't hire anyone</span>
                  <span className="checkmark"></span>
                </label>
                {errors.radioForJobClose && touched.radioForJobClose ? (
                  <div className="text-danger">{errors.radioForJobClose}</div>
                ) : null}
              </FormGroup>
            </Col>
          </Row>
        </FormikForm>
      )}
    </Formik>
  );
};

const mapStateToProps = (state) => ({
  radio_for_job_close_discard:
    state.vantage.staffingReducer.radioForCloseJobDiscard,
});

const mapDispatchToProps = (dispatch) => ({
  setActiveStepForCloseJobDiscard: (step) =>
    dispatch(setActiveStepForCloseJobDiscard(step)),
  setRadioForJobDiscard: (value) => dispatch(setRadioForJobDiscard(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScreenForStepOne);
