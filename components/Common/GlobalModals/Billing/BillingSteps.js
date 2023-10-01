import styles from "./BillingSteps.module.scss";
import { Form, FormGroup, Spinner } from "react-bootstrap";
import { Field } from "formik";
import { useIntercom } from "react-use-intercom";

import useCustomPackages from "../../../../hooks/Billing/useCustomPackages";
import useSelectedPlan from "../../../../hooks/Billing/useSelectedPlan";
import useUserCardList from "../../../../hooks/Billing/useUserCardList";
import useSaveNewCard from "../../../../hooks/Billing/useSaveNewCard";
import useSubscription from "../../../../hooks/Billing/useSubscription";
import { useState } from "react";
import { connect } from "react-redux";
import {
  setSelectedPlan,
  setPlanIntervalSwitchValue,
  setSelectedPaymentMethod,
  setCurrentBillingModalStep,
  setSelectedCardBrand,
  setSelectedCardEndingIn,
  resetBillingReducer,
} from "../../../../redux/actions/billingAction";
import { setJobPostingLimitEnd } from "../../../../redux/actions/jobPostAction";
import {
  StepOneFooter,
  StepOneLoadingState,
  SubscriptionFailModal,
  SubscriptionSuccessModal,
  UsersCardsList,
} from "./UI";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useQueryClient } from "@tanstack/react-query";
const mapStateToProps = (state) => ({
  selectedPlan: state.vantage.billingReducer.selectedPlan,
  switchValue: state.vantage.billingReducer.switchValue,
  selectedPaymentMethod: state.vantage.billingReducer.selectedPaymentMethod,
  user_email: state.vantage.userDataReducer.user_email,
  selectedCardBrand: state.vantage.billingReducer.selectedCardBrand,
  nextPaymentDate: state.vantage.billingReducer.nextPaymentDate,
  selectedCardEndingIn: state.vantage.billingReducer.selectedCardEndingIn,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedPlan: (plan) => dispatch(setSelectedPlan(plan)),
  setCurrentBillingModalStep: (step) =>
    dispatch(setCurrentBillingModalStep(step)),
  setPlanIntervalSwitchValue: (status) =>
    dispatch(setPlanIntervalSwitchValue(status)),
  setSelectedPaymentMethod: (pm) => dispatch(setSelectedPaymentMethod(pm)),
  resetBillingReducer: (pm) => dispatch(resetBillingReducer(pm)),

  setSelectedCardBrand: (brand) => dispatch(setSelectedCardBrand(brand)),
  setSelectedCardEndingIn: (endingIn) =>
    dispatch(setSelectedCardEndingIn(endingIn)),
  setJobPostingLimitEnd: (status) => dispatch(setJobPostingLimitEnd(status)),
});

const ConnectedStep1 = ({
  switchValue,
  setPlanIntervalSwitchValue,
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  isValid,
  setFieldValue,
  selectedPlan,
  setSelectedPlan,
  resetBillingReducer,
  nextPaymentDate,
}) => {
  return <h1>Hello to step 1</h1>;
};

const ConnectedStep2 = ({
  switchValue,
  setPlanIntervalSwitchValue,
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  isValid,
  setFieldValue,
  selectedPlan,
  setSelectedPlan,
  setSelectedPaymentMethod,
  setCurrentBillingModalStep,
  setSelectedCardBrand,
  setSelectedCardEndingIn,
}) => {
  return <div className={styles.billing_step_two}>Step 2</div>;
};

const ConnectedStep3 = ({
  switchValue,
  setPlanIntervalSwitchValue,
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  isValid,
  setFieldValue,
  setFieldTouched,
  selectedPlan,
  setSelectedPlan,
  setCurrentBillingModalStep,
  user_email,
}) => {
  return <div className={styles.add_new_card}>Step 3</div>;
};

const ConnectedStep4 = ({
  switchValue,
  setPlanIntervalSwitchValue,
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  isValid,
  setFieldValue,
  selectedPlan,
  setSelectedPlan,
  selectedCardBrand,
  selectedCardEndingIn,
  selectedPaymentMethod,
  resetBillingReducer,
  setCurrentBillingModalStep,
  setJobPostingLimitEnd,
}) => {
  return (
    <>
      <h1>Step 4</h1>
    </>
  );
};

const Step1 = connect(mapStateToProps, mapDispatchToProps)(ConnectedStep1);
const Step2 = connect(mapStateToProps, mapDispatchToProps)(ConnectedStep2);
const Step3 = connect(mapStateToProps, mapDispatchToProps)(ConnectedStep3);
const Step4 = connect(mapStateToProps, mapDispatchToProps)(ConnectedStep4);

export { Step1, Step2, Step3, Step4 };
