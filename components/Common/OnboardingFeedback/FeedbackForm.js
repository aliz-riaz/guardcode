import React, { useState } from "react";
import { Formik, Form } from "formik";
import { renderStep, renderValidationSchema } from "./Helper";
import { initialValues, mapObjToApiObject } from "./FeedbackConstants";
import FeedbackHeader from "./FeedbackHeader";
import { connect } from "react-redux";
import {
  sendUserOnboardingFeedback,
  setIsOnboardingFeedbackModal,
  setIsOnboardingTourModal,
  setIsOnboardingFeedbackDone,
  setIsOnboardingTourDone,
} from "../../../redux/actions/userAction";
import { Spinner } from "react-bootstrap";
import styles from "./FeedbackForm.module.scss";

const FormikForm = (props) => {
  const [step, setStep] = useState(1);
  const [totalNoOfSteps, setTotalNoOfSteps] = useState(5);
  const [showHeader, setShowHeader] = useState(true);
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setFormValues({ ...formValues, ...values });

    if (step === 1) {
      const { hiring, traning } = values;
      if (hiring && traning) {
        setTotalNoOfSteps(5);
        setShowHeader(true);
      } else if (hiring && !traning) {
        setTotalNoOfSteps(4);
        setShowHeader(true);
      } else if (!hiring && traning) {
        setStep(5);
        setTotalNoOfSteps(5);
        setShowHeader(false);
        return;
      }
    }
    if (step >= totalNoOfSteps) {
      const transformedObject = mapObjToApiObject(values);
      setLoading(true);
      const { request_status } = await props.sendUserOnboardingFeedback(
        props.user_token,
        transformedObject
      );
      if (request_status) {
        // close feedback modal and take user towards tour
        setLoading(false);
        props.setIsOnboardingFeedbackDone(true);
        props.setIsOnboardingFeedbackModal(false);
        props.setIsOnboardingTourDone(false);
        props.setIsOnboardingTourModal(true);
      }
      return;
    }
    setStep((step) => step + 1);
  };

  const backBtnHandler = () => {
    if (!showHeader) {
      setStep(1);
      return;
    }
    setStep(step - 1);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={renderValidationSchema(step)}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, handleBlur, errors, touched }) => (
        <Form className="px-2">
          <FeedbackHeader
            currentStep={step}
            totalNoOfSteps={totalNoOfSteps}
            showHeader={showHeader}
            // backBtnClickHandler={backBtnHandler}
          />
          {renderStep(
            step,
            `${props.decision_maker_first_name} ${props.decision_maker_last_name}`,
            { values, handleChange, handleBlur, errors, touched }
          )}
          <div
            className={`d-flex align-items-center justify-content-end mt-4 ${
              step > 1 && "justify-content-between"
            }`}
          >
            {step > 1 && (
              <button
                className={`${styles.backBtn}`}
                type="button"
                onClick={backBtnHandler}
              >
                Back
              </button>
            )}
            <button className="btn btn-md btn-green py-2 px-4" type="submit">
              {step >= totalNoOfSteps ? "Finish setup" : "Next"}
              {loading && <Spinner className="ml-2" size="sm" />}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  decision_maker_first_name:
    state.vantage.userDataReducer.decision_maker_first_name,
  decision_maker_last_name:
    state.vantage.userDataReducer.decision_maker_last_name,
});

const mapDispatchToProps = (dispatch) => ({
  sendUserOnboardingFeedback: (userToken, formData) =>
    dispatch(sendUserOnboardingFeedback(userToken, formData)),
  setIsOnboardingFeedbackModal: (status) =>
    dispatch(setIsOnboardingFeedbackModal(status)),
  setIsOnboardingTourModal: (status) =>
    dispatch(setIsOnboardingTourModal(status)),
  setIsOnboardingFeedbackDone: (status) =>
    dispatch(setIsOnboardingFeedbackDone(status)),
  setIsOnboardingTourDone: (status) =>
    dispatch(setIsOnboardingTourDone(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormikForm);
