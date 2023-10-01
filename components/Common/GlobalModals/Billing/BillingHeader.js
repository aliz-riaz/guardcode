import React, { useState } from "react";
import { connect } from "react-redux";
import {
  setShowBillingModal,
  setCurrentBillingModalStep,
  resetBillingReducer,
  setJobPostModalStatus,
  setBoostConfirmationModal,
} from "../../../../redux/actions/billingAction";
import CVSearchNoCreditsAlert from "./CVSearchNoCreditsAlert";
import JobPostNoCreditsAlert from "./JobPostNoCreditsAlert";
import JobBoostNoCreditsAlert from "./JobBoostNoCreditsAlert";
import styles from "./BillingHeader.module.scss";
import ConfirmCloseModal from "./ConfirmCloseModal";

function BillingHeader(props) {
  const [showCancelModal, setShowCancelModal] = useState(false);

  const backHandler = (e) => {
    e.preventDefault();
    if (props.currentStep > 1) {
      props.setCurrentBillingModalStep(parseInt(props.currentStep) - 1);
    } else if (props.currentStep == 1 && props.cart.length > 0) {
      setShowCancelModal(true);
    } else {
      props.setShowBillingModal(false);
      props.resetBillingReducer();
      // if (props.isUserInJobPostingFlow) {
      //   props.setJobPostModalStatus(true);
      // } else if (props.isUserInJobPostingFlow == false) {
      //   props.setBoostConfirmationModal(true);
      // }
    }
  };

  if (props.currentStep == 3) {
    return null;
  }
  return (
    <div className={styles.billing_header}>
      <div className="row no-gutters">
        <div className="col-md-8 position-relative">
          <button type="button" onClick={backHandler}>
            <img
              src={process.env.APP_URL + "/images/arrow-left.svg"}
              alt="arrow"
              className="img-fluid"
            />
            Back
          </button>

          {props.showCVViewsCalculator &&
            !props.showJobPostCalculator &&
            !props.showJobBoostCalculator &&
            props.currentStep == 1 && (
              <div className={styles.alert_wrap}>
                <CVSearchNoCreditsAlert
                  showAddCredits={false}
                  addCreditsHandler={null}
                />
              </div>
            )}
          {!props.showCVViewsCalculator &&
            props.showJobPostCalculator &&
            !props.showJobBoostCalculator &&
            props.currentStep == 1 && <JobPostNoCreditsAlert />}
          {!props.showCVViewsCalculator &&
            !props.showJobPostCalculator &&
            props.showJobBoostCalculator &&
            props.currentStep == 1 && <JobBoostNoCreditsAlert />}
        </div>
      </div>
      <ConfirmCloseModal
        showCancelModal={showCancelModal}
        setShowCancelModal={setShowCancelModal}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  showBillingModal: state.vantage.billingReducer.showBillingModal,
  currentStep: state.vantage.billingReducer.currentStep,
  isUserInJobPostingFlow: state.vantage.jobPostReducer.isUserInJobPostingFlow,

  showJobPostCalculator: state.vantage.billingReducer.showJobPostCalculator,
  showJobBoostCalculator: state.vantage.billingReducer.showJobBoostCalculator,
  showCVViewsCalculator: state.vantage.billingReducer.showCVViewsCalculator,
  cart: state.vantage.billingReducer.cart,
});

const mapDispatchToProps = (dispatch) => ({
  setShowBillingModal: (status) => dispatch(setShowBillingModal(status)),
  resetBillingReducer: () => dispatch(resetBillingReducer()),
  setCurrentBillingModalStep: (step) =>
    dispatch(setCurrentBillingModalStep(step)),
  setJobPostModalStatus: (status) => dispatch(setJobPostModalStatus(status)),
  setBoostConfirmationModal: (status) =>
    dispatch(setBoostConfirmationModal(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BillingHeader);
