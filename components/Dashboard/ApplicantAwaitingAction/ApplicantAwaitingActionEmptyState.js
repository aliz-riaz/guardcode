import React from "react";
import PostAJobButton from "../../JobPost/PostAJobButton";
import styles from "./ApplicantAwaitingAction.module.scss";

const ApplicantAwaitingActionEmptyState = () => {
  return (
    <>
      <div className={`${styles.empty_card}`}>
        <img src={`${process.env.APP_URL}/images/briefcase-empty.svg`} alt="" />
        <h3 className="fw-bold my-3">Application waiting for a response</h3>
        <p className="fs-6 fw-normal mb-4">
          Your unreviewed candidates <br className="d-none d-md-block" /> will
          be displayed here.
        </p>
        {/* <div className={styles.postJobButton}>
                    <PostAJobButton />
                </div> */}
      </div>
    </>
  );
};

export default ApplicantAwaitingActionEmptyState;
