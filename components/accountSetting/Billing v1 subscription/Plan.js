import React from "react";
import EmptyStatePlan from "./EmptyStates/EmptyStatePlan";
import styles from "./Plan.module.scss";
import { Progress, Spinner } from "reactstrap";
import useCurrentActivePlan from "../../../hooks/Billing/useCurrentActivePlan";
import { setShowBillingModal } from "../../../redux/actions/billingAction";
import { connect } from "react-redux";

function Plan(props) {
  const { data, isLoading, error } = useCurrentActivePlan();

  return (
    <div
      className={`${styles.growth_plan} ${
        isLoading ? "d-flex align-items-center justify-content-center" : ""
      }`}
    >
      {isLoading ? (
        <div className="d-flex align-items-center justify-content-center my-5">
          <Spinner animation={"border"} size="lg" />
        </div>
      ) : data && Object.keys(data).length != 0 ? (
        <>
          <div className="row align-items-start">
            <div className="col-md-6">
              <h3 className="fs-5 fw-bold mb-0">{data.title}</h3>
              <p className="fs-6 fw-bold m-0">
                £{data.price.amount}
                <span className="fw-normal">/{data.price.interval}</span>
              </p>
            </div>
            <div className="col-md-6 text-right">
              <button
                className={styles.change_plan_btn}
                onClick={(e) => {
                  e.preventDefault();
                  props.setShowBillingModal(true);
                }}
              >
                Change plan
              </button>
            </div>
          </div>
          <hr className="my-2" />
          <div className="row">
            <div className="col-md-4">
              <div className={styles.progress_wrap}>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h4>Job Posting</h4>
                  <p>
                    {data.utilized.job_post_credits}
                    <span>/{data.assigned.job_post_credits}</span>
                  </p>
                </div>
                <Progress
                  value={
                    (data.utilized.job_post_credits /
                      data.assigned.job_post_credits) *
                    100
                  }
                  color="black"
                  style={{ height: "10px", borderRadius: 25 }}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className={styles.progress_wrap}>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h4>Boost Credits</h4>
                  <p>
                    {data.utilized.boost_job_credits}
                    <span>/{data.assigned.boost_job_credits}</span>
                  </p>
                </div>
                <Progress
                  value={
                    (data.utilized.boost_job_credits /
                      data.assigned.boost_job_credits) *
                    100
                  }
                  color="black"
                  style={{ height: "10px", borderRadius: 25 }}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className={styles.progress_wrap}>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <h4>CV Views</h4>
                  <p>
                    {data.utilized.cv_views_credits}
                    <span>/{data.assigned.cv_views_credits}</span>
                  </p>
                </div>
                <Progress
                  value={
                    (data.utilized.cv_views_credits /
                      data.assigned.cv_views_credits) *
                    100
                  }
                  color="black"
                  style={{ height: "10px", borderRadius: 25 }}
                />
              </div>
            </div>

            <div className="col-md-12 mt-3">
              <h3 className="fs-6 fw-bold">Plan Benefits</h3>
              {Object.keys(data.price.plan_benefits).length != 0 ? (
                <ul>
                  <li>Access to video profiles</li>

                  <li>Branded job posts</li>

                  <li>Company profile page</li>

                  <li>Multi user access</li>

                  <li>SIA licence checks</li>

                  <li>Unlimited real time chat</li>

                  {/* {data.price.plan_benefits.access_to_video_profiles == 1 && (
                    <li>Acces to video profiles</li>
                  )}
                  {data.price.plan_benefits.branded_job_posts == 1 && (
                    <li>Branded job posts</li>
                  )}
                  {data.price.plan_benefits.company_profile_page == 1 && (
                    <li>Company profile page</li>
                  )}
                  {data.price.plan_benefits.multi_user_access == 1 && (
                    <li>Multi user access</li>
                  )}
                  {data.price.plan_benefits.sia_licence_checks == 1 && (
                    <li>Sia licence checks</li>
                  )}
                  {data.price.plan_benefits.unlimited_real_time_chat == 1 && (
                    <li>Unlimited real time chat</li>
                  )} */}
                </ul>
              ) : (
                "No benefits"
              )}
            </div>
          </div>
        </>
      ) : (
        <EmptyStatePlan />
      )}
      {/* Show this component when empty state */}
      {/* <EmptyStatePlan /> */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentStep: state.vantage.billingReducer.currentStep,
});

const mapDispatchToProps = (dispatch) => ({
  setShowBillingModal: (status) => dispatch(setShowBillingModal(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Plan);
