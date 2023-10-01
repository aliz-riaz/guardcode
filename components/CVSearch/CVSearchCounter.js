import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import {
  setShowBillingModal,
  setShowCVViewCalculator,
} from "../../redux/actions/billingAction";
// import { getCVSearchViewsCount } from "../../redux/actions/cvSearchAction";
import Styles from "./CVSearchCounter.module.scss";

const CVSearchCounter = (props) => {
  const router = useRouter();
  // useEffect(() => {
  //   props.getCVSearchViewsCount(props.user_token);
  // }, []);

  const addCreditsHandler = (e) => {
    e.preventDefault();
    props.setShowBillingModal(true);
    props.setShowCVViewCalculator(true);
  };

  return (
    <>
      {props.cv_search_views == "0" ? (
        props.user_token != "" && props.isOrganisationApproved == 0 ? null : ( // </div> //   Your organisation verification is in progress // <div className="text-danger fs-6 text-center py-2 fw-medium">
          <div className="text-danger- fs-6 text-center py-2 fw-medium">
            <span> You have {props.cv_search_views} CV views left.</span>{" "}
            <a
              className="text-underline cursor-pointer"
              onClick={addCreditsHandler}
            >
              <u>Add credits</u>
            </a>
          </div>
        )
      ) : (
        <div className="text-black-50 fs-6 text-center py-2 fw-medium">
          You have {props.cv_search_views} CV views left
          {/* {props.cv_search_views_total} */}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  cv_search_views: state.vantage.cvSearchReducer.cvSearchViews,
  cv_search_views_total: state.vantage.cvSearchReducer.cvSearchViewsTotal,
  isOrganisationApproved:
    state.vantage.organisationReducer.isOrganisationApproved,
});

const mapDispatchToProps = (dispatch) => ({
  // getCVSearchViewsCount: (userToken) =>
  //   dispatch(getCVSearchViewsCount(userToken)),
  setShowBillingModal: (status) => dispatch(setShowBillingModal(status)),
  setShowCVViewCalculator: (status) =>
    dispatch(setShowCVViewCalculator(status)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CVSearchCounter);
