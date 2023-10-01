import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchJobDescriptionTitles,
  setJobDescriptionTitles,
  setUserInJobPostingFlow,
} from "../../../redux/actions/jobPostAction";
import JobDescriptionTemplateList from "./JobDescriptionTemplateLIst/JobDescriptionTemplateList";
import styles from "./HomeScreen.module.scss";
import RecentSaveJob from "./RecentSaveJob/RecentSaveJob";

export const HomeScreen = (props) => {
  return (
    <>
      <div className="main-inner-content">
        <div className="row mt-4">
          <div className="col-12 col-md-7">
            <div className={`${styles.newJobPostCard}`}>
              <div className={`${styles.card_top}`}>
                <div className={`${styles.heading_wrap}`}>
                  <img src={`${process.env.APP_URL}/images/add-file.svg`} />
                  <h3>
                    New Job Post <span>Create your job post from scratch</span>
                  </h3>
                </div>
                <button
                  className="btn btn-md btn-green fs-6 fw-medium py-2"
                  onClick={() => props.setUserInJobPostingFlow(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="12px"
                    viewBox="0 0 448 448"
                  >
                    <path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0" />
                  </svg>
                  <span>Post a Job</span>
                </button>
              </div>
              <div className={`${styles.card_body}`}>
                <div className={`${styles.heading_wrap} mb-4`}>
                  <img src={`${process.env.APP_URL}/images/time-machine.svg`} />
                  <h3>
                    Recently Saved Jobs{" "}
                    <span>Use a job template you’ve previously saved</span>
                  </h3>
                </div>
                <div className={`${styles.card_wrapper}`}>
                  <RecentSaveJob />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-5">
            <JobDescriptionTemplateList />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  jobDescTitles: state.vantage.jobPostReducer.jobDescTitles,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setJobDescriptionTitles: (titles) =>
      dispatch(setJobDescriptionTitles(titles)),
    fetchJobDescriptionTitles: () => dispatch(fetchJobDescriptionTitles()),
    setUserInJobPostingFlow: (status) =>
      dispatch(setUserInJobPostingFlow(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
