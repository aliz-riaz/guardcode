import React from "react";
import CardDetails from "./CardDetails";
// import Plan from "./Plan";

import styles from "./PlanDetails.module.scss";

import dynamic from "next/dynamic";

const Plan = dynamic(() => import("./Plan"), {
  ssr: false,
});

function PlanDetails(props) {
  return (
    <div className={`${styles.plan_details} my-3`}>
      <h2 className="fs-5 fw-bold mb-2">Plan Details</h2>
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

export default PlanDetails;
