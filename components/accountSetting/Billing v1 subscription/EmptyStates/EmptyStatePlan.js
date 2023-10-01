import React from "react";
import styles from "./EmptyStatePlan.module.scss";

function EmptyStatePlan(props) {
  return (
    <div className={styles.empty_plan}>
      <img
        src={process.env.APP_URL + "/images/empty-plan.svg"}
        alt="Empty"
        className="img-fluid"
      />
      <h3 className="fs-5 fw-bold">Account pending approval</h3>
      <p>
        Thank you for choosing our platform. We will notify you{" "}
        <br className="d-none d-md-block" /> as soon as your account has been
        approved and you <br className="d-none d-md-block" />
        can proceed with selecting a subscription plan.
      </p>
    </div>
  );
}

export default EmptyStatePlan;
