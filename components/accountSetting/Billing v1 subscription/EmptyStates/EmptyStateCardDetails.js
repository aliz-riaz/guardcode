import React from "react";
import styles from "./EmptyStateCardDetails.module.scss";
import { connect } from "react-redux";
import { setShowChangeCardModal } from "../../../../redux/actions/billingAction";
function EmptyStateCardDetails({
  showChangeCardModal,
  setShowChangeCardModal,
}) {
  return (
    <div className={styles.empty_plan}>
      <img
        src={process.env.APP_URL + "/images/empty-card.svg"}
        alt="Empty"
        className="img-fluid"
      />
      <h3 className="fs-5 fw-bold mt-3 mb-2">No card added yet</h3>
      <p>Your card information will be displayed here.</p>
    </div>
  );
}

const mapStateToProps = (state) => ({
  showChangeCardModal: state.vantage.billingReducer.showChangeCardModal,
});

const mapDispatchToProps = (dispatch) => ({
  setShowChangeCardModal: (status) => dispatch(setShowChangeCardModal(status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmptyStateCardDetails);
