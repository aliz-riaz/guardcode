import React, { useEffect, useState, useRef, useContext } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import ApplicantAwaitingActionEmptyState from "./ApplicantAwaitingActionEmptyState";
import { applicantAwaiting } from "../../../redux/actions/dashboardAction";
import {
  setDidUserClickedAJob,
  setLatestJobId,
  setScreenToShowOnStaffing,
  setDateOrderForApplicantList,
  setSearchKeywordForApplicantList,
  setCurrentPageForApplicantList,
  setSWPProfileWindowToBeShown,
  setFilterForApplicantList,
} from "../../../redux/actions/staffingAction";
import ApplicantAwaitingActionCard from "./ApplicantAwaitingActionCard";
import styles from "./ApplicantAwaitingAction.module.scss";
import { Spinner } from "react-bootstrap";

const ApplicantAwaitingAction = (props) => {
  const [applicantData, setApplicantData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [accessLevel, setAccessLevel] = useState(
    props.userMenusAccess.find((element) => element.title == "Staffing")
  );
  const router = useRouter();

  useEffect(async () => {
    setLoading(true);
    const applicants = await props.applicantAwaiting(
      props.user_token,
      props.is_account_owner,
      accessLevel.access_level == "FULL" ? 1 : 0
    );
    if (applicants) {
      setApplicantData(applicants.data);
    }
    setLoading(false);
  }, []);

  const handleTitleClick = (id) => {
    props.setLatestJobId(id);
    props.setDidUserClickedAJob(true);
    props.setScreenToShowOnStaffing("applicants");
    props.setFilterForApplicantList("all");
    props.setDateOrderForApplicantList("DESC");
    props.setSearchKeywordForApplicantList("");
    props.setCurrentPageForApplicantList("1");
    props.setSWPProfileWindowToBeShown(false);
    router.push("/staffing");
  };
  const viewAllJobs = () => {
    props.setFilterForApplicantList("all");
    props.setScreenToShowOnStaffing("jobs");
    router.push("/staffing");
  };
  return (
    <div className={`${styles.awaiting_action} px-3`}>
      {applicantData?.jobs?.length > 0 && (
        <h4 className={`${styles.heading}`}>
          Applicants awaiting action{" "}
          <span className="badge">{applicantData.total_applicants}</span>
        </h4>
      )}
      <div>
        <div className={`${styles.card}`}>
          {loading ? (
            <>
              {[1, 2, 3].map((ind) => {
                return (
                  <>
                    <div className={`${styles.list}`}>
                      <p className="animated_shimmer mb-0">hello</p>
                      <ul>
                        {[1, 2, 3].map((ind) => {
                          return (
                            <li>
                              <a className="animated_shimmer rounded-circle d-inline-block mb-0">
                                <img
                                  src={
                                    process.env.APP_URL + "/images/user-1.jpg"
                                  }
                                  alt=""
                                />
                              </a>
                            </li>
                          );
                        })}
                        <li className={`${styles.plus_value}`}>
                          <a className="animated_shimmer rounded-circle d-inline-block mb-0">
                            +2
                          </a>
                        </li>
                      </ul>
                    </div>
                  </>
                );
              })}
              <div className="text-center">
                <span className={`${styles.button_style} animated_shimmer`}>
                  View all jobs
                </span>
              </div>
            </>
          ) : applicantData.jobs?.length > 0 ? (
            <>
              {applicantData.jobs.map((data) => {
                return (
                  <div className={`${styles.list}`}>
                    <p>
                      {data.job.title}{" "}
                      <span
                        className="cursor-pointer"
                        onClick={() => handleTitleClick(data.job.id)}
                      >
                        View list
                      </span>
                    </p>
                    <ApplicantAwaitingActionCard
                      applicant={data.applicants}
                      jobId={data.job.id}
                    />
                  </div>
                );
              })}
              {applicantData.jobs?.length >= 3 && (
                <div className="text-center">
                  <span
                    onClick={viewAllJobs}
                    className={`${styles.button_style} cursor-pointer`}
                  >
                    View all jobs{" "}
                  </span>
                </div>
              )}
            </>
          ) : (
            <ApplicantAwaitingActionEmptyState />
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  userMenusAccess: state.vantage.organisationReducer.userMenusAccess,
  is_account_owner: state.vantage.organisationReducer.isAccountOwner,
});

const mapDispatchToProps = (dispatch) => ({
  applicantAwaiting: (userToken, accountOwner, access) =>
    dispatch(applicantAwaiting(userToken, accountOwner, access)),
  setLatestJobId: (jobId) => dispatch(setLatestJobId(jobId)),

  setDidUserClickedAJob: (status) => dispatch(setDidUserClickedAJob(status)),
  setScreenToShowOnStaffing: (screen) =>
    dispatch(setScreenToShowOnStaffing(screen)),
  setDateOrderForApplicantList: (dateOrder) =>
    dispatch(setDateOrderForApplicantList(dateOrder)),
  setSearchKeywordForApplicantList: (keyword) =>
    dispatch(setSearchKeywordForApplicantList(keyword)),
  setCurrentPageForApplicantList: (page) =>
    dispatch(setCurrentPageForApplicantList(page)),
  setSWPProfileWindowToBeShown: (status) =>
    dispatch(setSWPProfileWindowToBeShown(status)),
  setFilterForApplicantList: (filter) =>
    dispatch(setFilterForApplicantList(filter)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicantAwaitingAction);
