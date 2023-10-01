import React from "react";
import dynamic from "next/dynamic";
import { connect } from "react-redux";

const Billing = dynamic(() => import("./Billing/Billing"), {
  ssr: false,
});

function GlobalModals(props) {
  return <>{props.showBillingModal && <Billing />}</>;
}

const mapStateToProps = (state) => ({
  showBillingModal: state.vantage.billingReducer.showBillingModal,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(GlobalModals);
