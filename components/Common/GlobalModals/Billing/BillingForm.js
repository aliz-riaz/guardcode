import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";
import BillingHeader from "./BillingHeader";
import { renderStep, renderValidationSchema } from "./Helper";
import styles from "./BillingForm.module.scss";
import { setCurrentBillingModalStep } from "../../../../redux/actions/billingAction";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const BillingForm = (props) => {
  const [switchToggle, setSwitchToggle] = useState(false);

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    props.setCurrentBillingModalStep(parseInt(props.currentStep) - 1);
    setSubmitting(true);
  };

  return (
    <Formik
      initialValues={{}}
      validationSchema={renderValidationSchema(props.currentStep)}
      enableReinitialize={true}
      onSubmit={handleSubmit}
    >
      {({
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
        isValid,
        setFieldValue,
        setFieldTouched,
      }) => (
        <Form className="p-0">
          <BillingHeader />
          <Elements stripe={stripePromise}>
            {renderStep(props.currentStep, {
              values,
              handleChange,
              handleBlur,
              errors,
              touched,
              isValid,
              setFieldValue,
              setFieldTouched,
            })}
          </Elements>
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = (state) => ({
  currentStep: state.vantage.billingReducer.currentStep,
  selectedPlan: state.vantage.billingReducer.selectedPlan,
  selectedPaymentMethod: state.vantage.billingReducer.selectedPaymentMethod,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentBillingModalStep: (step) =>
    dispatch(setCurrentBillingModalStep(step)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BillingForm);
