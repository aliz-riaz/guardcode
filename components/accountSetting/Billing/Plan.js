import React from "react";
import EmptyStatePlan from "./EmptyStates/EmptyStatePlan";
import styles from "./Plan.module.scss";
import { Progress, Spinner } from "reactstrap";
import useCreditsDetail from "../../../hooks/Billing/useCreditsDetail";
import {
  setShowBillingModal,
  setShowJobPostCalculator,
  setShowJobBoostCalculator,
  setShowCVViewCalculator,
} from "../../../redux/actions/billingAction";
import { connect } from "react-redux";
import { OverlayTrigger, Popover, Tooltip } from "react-bootstrap";

function Plan(props) {
  const { data, isLoading, error } = useCreditsDetail();

  return (
    <div className={styles.plan}>
      {isLoading ? (
        <>
          <button className={`${styles.add_credit_btn} animated_shimmer mb-0`}>
            Add credits
          </button>
          <div className={`${styles.card_wrapper}`}>
            <div className={`${styles.card} animated_shimmer mb-0`}>
              <h3>
                0 <span>Job Posts</span>
              </h3>
            </div>
            <div className={`${styles.card} animated_shimmer mb-0`}>
              <h3>
                0 <span>CV Views</span>
              </h3>
            </div>
            <div className={`${styles.card} animated_shimmer mb-0`}>
              <h3>
                0<span>Job Boost </span>
              </h3>
            </div>
          </div>
          <div className="pl-2">
            <h3 className="fs-5 fw-bold animated_shimmer">Plan Benefits</h3>
            <ul>
              <li className={`${styles.no_before} animated_shimmer mb-0`}>
                SIA licence checks
              </li>
              <li className={`${styles.no_before} animated_shimmer mb-0`}>
                Access to video profiles
              </li>
              <li className={`${styles.no_before} animated_shimmer mb-0`}>
                Unlimited real time chat
              </li>
              <li className={`${styles.no_before} animated_shimmer mb-0`}>
                Company profile page
              </li>
              <li className={`${styles.no_before} animated_shimmer mb-0`}>
                Branded job posts
              </li>
              <li className={`${styles.no_before} animated_shimmer mb-0`}>
                Multi user access
              </li>
            </ul>
          </div>
        </>
      ) : (
        <>
          {props.user_token != "" && props.isOrganisationApproved == 1 && (
            <button
              className={styles.add_credit_btn}
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
          <div className={`${styles.card_wrapper}`}>
            <div className={styles.card}>
              <h3>
                {data.job_post} <span>Job Posts</span>
              </h3>
            </div>
            <div className={styles.card}>
              <span className={styles.addon}>JOB POST ADD-ON</span>
              <OverlayTrigger
                trigger="hover"
                placement="auto-end"
                rootClose
                overlay={
                  <Popover
                    className="bg-transparent border-0"
                    // style={{ maxWidth: "300px" }}
                  >
                    <div className={styles.tooltip}>
                      <p>Reach candidates 5x faster with Boost</p>
                      <ul>
                        <li>
                          Instantly notifies matching and active jobseekers in
                          the area
                        </li>
                        <li>Your job gets priority in search results</li>
                      </ul>
                    </div>
                  </Popover>
                }
              >
                <img src={process.env.APP_URL + "/images/c-info-dark.svg"} />
              </OverlayTrigger>
              <h3>
                {data.boost_job}{" "}
                <span>
                  Job Boost{" "}
                  <img src={process.env.APP_URL + "/images/bolt-dark.svg"} />
                </span>
              </h3>
            </div>
            <div className={styles.card}>
              <h3>
                {data.cv_views} <span>CV Views</span>
              </h3>
            </div>
          </div>
          <div className="pl-2">
            <h3 className="fs-5 fw-bold">All benefits include</h3>
            <ul>
              <li>SIA licence checks</li>
              <li>Access to video profiles</li>
              <li>Unlimited real time chat</li>
              <li>Company profile page</li>
              <li>Branded job posts</li>
              <li>Multi user access</li>
            </ul>
          </div>
        </>
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Plan);
// export default Plan;
