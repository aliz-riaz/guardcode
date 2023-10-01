import React from "react";
import styles from "./EmptyStateBillingHistory.module.scss";

function EmptyStateBillingHistory(props) {
  return (
    <div className={styles.empty_plan}>
      <img
        src={process.env.APP_URL + "/images/empty-history.svg"}
        alt="Empty"
        className="img-fluid"
      />
      <h3 className="fs-5 fw-bold">No billing history found</h3>
      <p>
        There is no billing history available at the moment.{" "}
        <br className="d-none d-md-block" />
        Once you have made payments or completed transactions,
        <br className="d-none d-md-block" /> they will appear here for your
        reference.
      </p>
    </div>
  );
}

export default EmptyStateBillingHistory;
