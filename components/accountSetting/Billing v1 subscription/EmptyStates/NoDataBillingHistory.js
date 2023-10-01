import React from "react";
import styles from "./EmptyStateBillingHistory.module.scss";

function NoDataBillingHistory(props) {
  return (
    <div className={styles.empty_plan}>
      <img
        src={process.env.APP_URL + "/images/empty-history.svg"}
        alt="Empty"
        className="img-fluid"
      />
      <h3 className="fs-5 fw-bold">No billing history found</h3>
      <p>
        We're sorry, but we couldn't find any{" "}
        <br className="d-none d-md-block" /> bill history associated with your
        search. Please <br className="d-none d-md-block" /> double-check the
        name entered and ensure its accuracy.
      </p>
    </div>
  );
}

export default NoDataBillingHistory;
