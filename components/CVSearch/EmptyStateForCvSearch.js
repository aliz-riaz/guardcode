import React from "react";
import { connect } from "react-redux";
import styles from "./EmptyStateForCvSearch.module.scss";
import {
  setShowBillingModal,
  setShowCVViewCalculator,
} from "../../redux/actions/billingAction";
import CVSearchNoCreditsAlert from "../Common/GlobalModals/Billing/CVSearchNoCreditsAlert";
const EmptyStateForCvSearch = (props) => {
  const addCreditsHandler = (e) => {
    e.preventDefault();
    props.setShowBillingModal(true);
    props.setShowCVViewCalculator(true);
  };
  return (
    <>
      <div className={`${styles.empty_state} mt-4`}>
        <div className="pl-0 pl-md-5 mt-3 text-center text-md-left d-none">
          <img
            src={`${process.env.APP_URL}/images/searchFilter.png`}
            className="img-fluid"
            width={`410px`}
          />
        </div>
        <div className={`text-center`}>
          <img
            src={`${process.env.APP_URL}/images/cv_search_empty_state.png`}
            height="186px"
            className="img-fluid"
            style={{ maxHeight: "186px", lineHeight: "30px" }}
          />
          <p className="fs-4 fw-medium mt-4">
            Search our database for thousands of verified profiles.
          </p>
        </div>
        {props.cv_search_views == 0 &&
          props.user_token != "" &&
          props.isOrganisationApproved == 1 && (
            <CVSearchNoCreditsAlert
              showAddCredits={true}
              addCreditsHandler={addCreditsHandler}
            />
          )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  cv_search_views: state.vantage.cvSearchReducer.cvSearchViews,
  user_token: state.vantage.userDataReducer.user_token,
  isOrganisationApproved:
    state.vantage.organisationReducer.isOrganisationApproved,
});

const mapDispatchToProps = (dispatch) => ({
  setShowBillingModal: (status) => dispatch(setShowBillingModal(status)),
  setShowCVViewCalculator: (status) =>
    dispatch(setShowCVViewCalculator(status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmptyStateForCvSearch);
