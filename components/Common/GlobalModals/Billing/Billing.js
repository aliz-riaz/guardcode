import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import BillingForm from "./BillingForm";
import { connect } from "react-redux";
import CVSearchNoCreditsAlert from "./CVSearchNoCreditsAlert";
import JobPostNoCreditsAlert from "./JobPostNoCreditsAlert";
import JobBoostNoCreditsAlert from "./JobBoostNoCreditsAlert";
import styles from "./BillingHeader.module.scss";

function Billing(props) {
  return (
    <Modal
      isOpen={props.showBillingModal}
      size={
        props.currentStep === 2 ? "lg" : props.currentStep === 3 ? "sm" : "xl"
      }
      className={`font-roboto`}
      centered
      backdrop="static"
      keyboard={false}
    >
      <ModalBody className="p-0">
        {/* {props.showCVViewsCalculator &&
          !props.showJobPostCalculator &&
          !props.showJobBoostCalculator &&
          props.currentStep == 1 && (
            <div className={styles.alert_wrap}>
              <CVSearchNoCreditsAlert
                showAddCredits={false}
                addCreditsHandler={null}
              />
            </div>
          )} */}
        {/* {!props.showCVViewsCalculator &&
          props.showJobPostCalculator &&
          !props.showJobBoostCalculator &&
          props.currentStep == 1 && <JobPostNoCreditsAlert />} */}
        {/* {!props.showCVViewsCalculator &&
          !props.showJobPostCalculator &&
          props.showJobBoostCalculator &&
          props.currentStep == 1 && <JobBoostNoCreditsAlert />} */}
        <BillingForm />
      </ModalBody>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  showBillingModal: state.vantage.billingReducer.showBillingModal,
  currentStep: state.vantage.billingReducer.currentStep,

  showJobPostCalculator: state.vantage.billingReducer.showJobPostCalculator,
  showJobBoostCalculator: state.vantage.billingReducer.showJobBoostCalculator,
  showCVViewsCalculator: state.vantage.billingReducer.showCVViewsCalculator,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Billing);
