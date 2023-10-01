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
    // setStep(2);
    if (props.currentStep == 3) {
    } else if (props.currentStep == 2) {
      props.setCurrentBillingModalStep(4);
    } else {
      props.setCurrentBillingModalStep(parseInt(props.currentStep) + 1);
    }
  };

  return (
    <Formik
      initialValues={{
        //step1
        plan: props.selectedPlan?.id ?? "",
        //step2
        selectedCard: props.selectedPaymentMethod ?? "",
        //step3 - optional to save new card
        nameOnCard: "",
        cardNumber: null,
        cardExpiry: null,
        cardCVC: null,
      }}
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
        <Form className="px-2">
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
