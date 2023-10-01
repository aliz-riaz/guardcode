import React from "react";
import styles from "./Candidate.module.scss";

const CandidateCardShimmer = () => {
  return (
    <>
      {[1, 2, 3].map((index) => {
        return (
          <div className={styles.candidates_wrap} key={index}>
            <div
              className={`gl-checkbox form-group animated_shimmer mb-0 ${styles.checkbox_wrap}`}
            >
              <label className="m-0">
                <input name="checkbox_name" type="checkbox" />
                <span className="checkmark"></span>
              </label>
            </div>
            <div
              className={`${styles.img_wrap} animated_shimmer mb-0 rounded-circle`}
            >
              <img
                src={process.env.APP_URL + "/images/user-profile.jpg"}
                className="img-fluid"
              />
            </div>
            <div className={styles.content}>
              <h2 className="animated_shimmer mb-1">Test User</h2>
              <div className={`${styles.rating} animated_shimmer mb-1`}>
                <img
                  src={process.env.APP_URL + "/images/star-rate.svg"}
                  className="img-fluid"
                />
                <img
                  src={process.env.APP_URL + "/images/star-rate.svg"}
                  className="img-fluid"
                />
                <img
                  src={process.env.APP_URL + "/images/star-rate.svg"}
                  className="img-fluid"
                />
                <img
                  src={process.env.APP_URL + "/images/star-rate.svg"}
                  className="img-fluid"
                />
                <img
                  src={process.env.APP_URL + "/images/star-rate.svg"}
                  className="img-fluid"
                />
              </div>
              <span className="animated_shimmer mb-0">74 completed shifts</span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CandidateCardShimmer;
