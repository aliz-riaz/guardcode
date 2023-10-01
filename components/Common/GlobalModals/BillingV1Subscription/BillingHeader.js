import React from "react";
import { connect } from "react-redux";
import styles from "./BillingHeader.module.scss";
import {
  setShowBillingModal,
  setCurrentBillingModalStep,
  resetBillingReducer,
} from "../../../../redux/actions/billingAction";

function BillingHeader(props) {
  const backHandler = (e) => {
    e.preventDefault();
    if (props.currentStep == 4) {
      props.setCurrentBillingModalStep(2);
    } else if (props.currentStep > 1) {
      props.setCurrentBillingModalStep(parseInt(props.currentStep) - 1);
    } else {
      props.setShowBillingModal(false);
      props.resetBillingReducer();
    }
  };

  return (
    <div className={styles.billing_header}>
      <button onClick={backHandler}>
        <img
          src={process.env.APP_URL + "/images/arrow-left.svg"}
          alt="arrow"
          className="img-fluid"
        />
        Back
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  showBillingModal: state.vantage.billingReducer.showBillingModal,
  currentStep: state.vantage.billingReducer.currentStep,
});

const mapDispatchToProps = (dispatch) => ({
  setShowBillingModal: (status) => dispatch(setShowBillingModal(status)),
  resetBillingReducer: () => dispatch(resetBillingReducer()),
  setCurrentBillingModalStep: (step) =>
    dispatch(setCurrentBillingModalStep(step)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BillingHeader);
