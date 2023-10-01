import React from "react";
import styles from "./NewCustomPackageAlert.module.scss";
import { setShowBillingModal } from "../../../redux/actions/billingAction";
import { connect } from "react-redux";

function NewCustomPackageAlert({ setShowBillingModal }) {
  return (
    <div className={`${styles.alert_wrap} font-roboto`}>
      <p>
        <img
          src={process.env.APP_URL + "/images/alert-icon.svg"}
          height={20}
          width={20}
        />
        Please review and consider subscribing to the personalized billing plan
        tailored specifically for you.
      </p>
      <button
        onClick={(e) => {
          e.preventDefault();
          setShowBillingModal(true);
        }}
        className="btn btn-secondary btn-sm"
      >
        Pay now
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCustomPackageAlert);
