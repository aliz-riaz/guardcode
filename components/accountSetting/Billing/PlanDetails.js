import React from "react";
import CardDetails from "./CardDetails";
// import Plan from "./Plan";
import { connect } from "react-redux";
import styles from "./PlanDetails.module.scss";
import {
  setShowBillingModal,
  setShowJobPostCalculator,
  setShowJobBoostCalculator,
  setShowCVViewCalculator,
} from "../../../redux/actions/billingAction";
import dynamic from "next/dynamic";

const Plan = dynamic(() => import("./Plan"), {
  ssr: false,
});

function PlanDetails(props) {
  return (
    <div className={`${styles.plan_details} my-3`}>
      <div className="row align-items-center mb-2">
        <div className="col-6">
          <h2 className="fs-4 fw-bold mb-0">Your credits</h2>
        </div>
        <div className="col-6 text-right">
          {props.user_token != "" && props.isOrganisationApproved == 1 && (
            <button
              className={styles.change_plan_btn}
              onClick={(e) => {
                e.preventDefault();
                props.setShowBillingModal(true);
                props.setShowJobPostCalculator(true);
                props.setShowJobBoostCalculator(true);
                props.setShowCVViewCalculator(true);
              }}
            >
              Add credits
            </button>
          )}
        </div>
      </div>
      <div className={`${styles.card} row no-gutters`}>
        {/* Plan component */}
        <div className="col-lg-8">
          <Plan />
        </div>
        <div className="col-lg-4">
          {/* Card component */}
          <CardDetails />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentStep: state.vantage.billingReducer.currentStep,
  user_token: state.vantage.userDataReducer.user_token,
  isOrganisationApproved:
    state.vantage.organisationReducer.isOrganisationApproved,
});

const mapDispatchToProps = (dispatch) => ({
  setShowBillingModal: (status) => dispatch(setShowBillingModal(status)),

  setShowJobPostCalculator: (status) =>
    dispatch(setShowJobPostCalculator(status)),
  setShowJobBoostCalculator: (status) =>
    dispatch(setShowJobBoostCalculator(status)),
  setShowCVViewCalculator: (status) =>
    dispatch(setShowCVViewCalculator(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlanDetails);
