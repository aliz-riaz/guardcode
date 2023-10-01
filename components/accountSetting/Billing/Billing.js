import React from "react";
import BillingHistory from "./BillingHistory";
import PlanDetails from "./PlanDetails";
import styles from "./Billing.module.scss";
import TryAgainAlert from "./TryAgainAlert";
import { connect } from "react-redux";
import dynamic from "next/dynamic";
import NewCustomPackageAlert from "./NewCustomPackageAlert";

const Billing = () => {
  return (
    <div className="main-inner-content">
      <PlanDetails />
      <BillingHistory />
      <br />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isCustomPlanAvailable: state.vantage.billingReducer.isCustomPlanAvailable,
  isPaymentFailed: state.vantage.billingReducer.isPaymentFailed,
});

const mapDispatchToProps = (dispatch) => ({});

// export default connect(mapStateToProps, mapDispatchToProps)(Billing);
export default Billing;
