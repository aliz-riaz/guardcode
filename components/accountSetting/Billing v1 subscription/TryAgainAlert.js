import React from "react";
import styles from "./TryAgainAlert.module.scss";
import { connect } from "react-redux";
import { setShowBillingModal } from "../../../redux/actions/billingAction";

function TryAgainAlert({ setShowBillingModal }) {
  return (
    <div className={`${styles.alert_wrap} font-roboto`}>
      <p>
        <img
          src={process.env.APP_URL + "/images/alert-icon.svg"}
          height={20}
          width={20}
        />
        We apologise for the inconvenience. Your payment could not be processed
        at this time as it seems your card has been declined by the issuing bank
        or financial institution.
      </p>
      <button
        onClick={(e) => {
          e.preventDefault();
          setShowBillingModal(true);
        }}
        className="btn btn-secondary btn-sm"
      >
        Try again
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  // isCustomPlanAvailable: state.vantage.billingReducer.isCustomPlanAvailable,
  // isPaymentFailed: state.vantage.billingReducer.isPaymentFailed,
});

const mapDispatchToProps = (dispatch) => ({
  setShowBillingModal: (status) => dispatch(setShowBillingModal(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TryAgainAlert);
