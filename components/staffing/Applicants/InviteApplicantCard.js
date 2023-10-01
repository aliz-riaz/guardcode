import React, { useState, Suspense } from "react";
import { isMobile } from "react-device-detect";
import { mapLicenseIdToText } from "../../../lib/helper";
import {
  fetchUserSWPProfile,
  updateApplicationStatusOfJob,
  setDidUserClickedAJob,
  setLatestJobId,
  setSWPProfileWindowToBeShown,
  setClickedSWPProfileStatus,
  setSWPProfileIndex,
  inviteApplicantToJob,
  fetchApplicantsAgainstJob,
} from "../../../redux/actions/staffingAction";
import { connect } from "react-redux";

const Image = React.lazy(() => import("../../Common/Image"));
import styles from "./ApplicantCard.module.scss";
import { Spinner } from "react-bootstrap";

const InviteApplicantCard = (props) => {
  const [confirmInvitation, setConfirmInvitation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inviteDecisionForCard, setInviteDecisionForCard] = useState(
    props.is_invited_job
  );

  const showSWPProfile = () => {
    // e.preventDefault();
    props.setSWPProfileIndex(props.currentIndex);
    props.fetchUserSWPProfile(
      props.user_token,
      props.latest_job_id_for_applicant_tab,
      props.slug
    );
    props.setSWPProfileWindowToBeShown(true);
  };
  const inviteToApplyHandler = () => {
    setConfirmInvitation(true);
  };

  const conformationNoHandler = () => {
    setConfirmInvitation(false);
  };

  const inviteApplicantToApply = async () => {
    setLoading(true);
    if (
      await props.inviteApplicantToJob(
        props.user_token,
        props.latest_job_id_for_applicant_tab,
        props.id
      )
    ) {
      setConfirmInvitation(false);
      setInviteDecisionForCard(1);
      // props.fetchApplicantsAgainstJob(props.user_token, props.latest_job_id_for_applicant_list, props.filter_for_applicants_list, props.search_keyword_for_applicants_list, props.date_order_for_applicants_list)
    }
    setLoading(false);
  };

  return (
    <div
      className={`${styles.applicant_card_new} ${styles.invited} ${
        props.swp_profile_window_to_be_shown && styles.shownApplicant
      }`}
    >
      <ul>
        <li
          className={`pl-0 ${
            props.swp_profile_window_to_be_shown ? "flex-1" : null
          }`}
        >
          <div
            className={`${styles.user_header} p-0 d-flex align-items-center`}
          >
            <div
              className={`${styles.applicant_avatar} flex-shrink-0`}
              onClick={showSWPProfile}
            >
              <figure>
                <img src={props.profile_picture} className="img-fluid" />
              </figure>
              {!!props.is_enhanced_profile && (
                <span className={`${styles.applicant_badge}`}>
                  <img
                    src={process.env.APP_URL + "/images/badge-big.svg"}
                    className="verified"
                  />
                </span>
              )}
            </div>
            <div className={`${styles.applicant_info} flex-grow-1 `}>
              <h3
                className="mb-1 p-0 cursor-pointer text-left d-inline-block"
                onClick={showSWPProfile}
              >
                <u>{props.name}</u>
              </h3>
              <p className={`${styles.city} d-flex align-items-md-center mb-0`}>
                <img
                  src={process.env.APP_URL + "/images/map-pin.svg"}
                  height="14px"
                />
                <span className="ml-2">
                  {props.postcode + ", " + props.city}
                </span>
              </p>
            </div>
          </div>
        </li>

        {!isMobile && !props.swp_profile_window_to_be_shown && (
          <li className={`${styles.invite_applicant_list}`}>
            <div className={`${styles.licenses_wrap} mb-3`}>
              {props.license?.map((license) => {
                return (
                  <>
                    <div className={`${styles.license_card} flex-shrink-0`}>
                      <img
                        src={process.env.APP_URL + "/images/badge-img.svg"}
                        className="img-fluid"
                      />
                      <span>{license.course_license}</span>
                    </div>
                  </>
                );
              })}
            </div>
          </li>
        )}

        {!props.swp_profile_window_to_be_shown && (
          <li>
            <div
              className={`px-0 px-md-0 ml-md-auto col ${
                styles.invite_actions
              } ${confirmInvitation ? styles.invite_actions_open : ""}`}
            >
              <div className="d-flex justify-content-md-end justify-content-center mt-3 mt-md-0">
                {confirmInvitation ? (
                  <div className={`${styles.confirm_action} text-center mb-3`}>
                    <p className="text-center mb-1 mb-md-4 pb-0">
                      Are you sure, you want to invite this <br /> person to
                      apply?
                    </p>
                    <button
                      className={`btn btn-outline-danger btn-sm border-0 fw-bold ${styles.no_btn}`}
                      onClick={conformationNoHandler}
                    >
                      Cancel
                    </button>
                    <button
                      className={`btn btn-green btn-sm fw-bold ${
                        styles.yes_btn
                      } ${loading && "disabled"}`}
                      disabled={loading ? true : false}
                      onClick={inviteApplicantToApply}
                    >
                      {loading ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        "Yes"
                      )}
                    </button>
                  </div>
                ) : // props.is_invited_job == 0 ?
                inviteDecisionForCard == 0 ? (
                  <div>
                    <button
                      className={`btn btn-gray fw-bold fs-6 py-1 px-4 d-flex align-items-center justify-content-center ml-3 ml-md-0`}
                      onClick={inviteToApplyHandler}
                    >
                      <span
                        className="d-block"
                        style={{ margin: "3px 0px 2px" }}
                      >
                        Invite to apply
                      </span>
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className="btn btn-green fw-bold fs-6 py-2 px-4 d-flex align-items-center justify-content-center ml-3 ml-md-0"
                      disabled
                    >
                      <img
                        src={process.env.APP_URL + "/images/tickCheckImg2.svg"}
                        style={{ marginTop: "-2px" }}
                        width="14px"
                      />
                      <span
                        className="d-block ml-2"
                        style={{ marginTop: "0px" }}
                      >
                        Invite sent
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  jobs_posted_by_user: state.vantage.staffingReducer.jobsPostedByUser,
  current_page_for_job_list:
    state.vantage.staffingReducer.currentPageForJobList,
  pagination_for_job_list: state.vantage.staffingReducer.paginationForJobList,
  total_pages_for_job_list: state.vantage.staffingReducer.totalPagesForJobList,
  user_token: state.vantage.userDataReducer.user_token,
  filter_for_job_list: state.vantage.staffingReducer.filterForJobList,
  date_order_for_job_list: state.vantage.staffingReducer.dateOrderForJobList,
  search_keyword_for_job_list:
    state.vantage.staffingReducer.searchKeywordForJobList,
  latest_job_id_for_applicant_tab: state.vantage.staffingReducer.latestJobId,
  latest_job_id_for_applicant_list: state.vantage.staffingReducer.latestJobId,
  swp_profile_window_to_be_shown:
    state.vantage.staffingReducer.swpProfileWindowToBeShown,
  swp_profile_to_be_shown: state.vantage.staffingReducer.swpProfileToBeShown,
  filter_for_applicants_list:
    state.vantage.staffingReducer.filterForApplicantsList,
  date_order_for_applicants_list:
    state.vantage.staffingReducer.dateOrderForApplicantsList,
  search_keyword_for_applicants_list:
    state.vantage.staffingReducer.searchKeywordForApplicantsList,
  current_page_for_applicant_list:
    state.vantage.staffingReducer.currentPageForApplicantList,
  job_applicants_for_applicants_tab:
    state.vantage.staffingReducer.jobApplicants,
});

const mapDispatchToProps = (dispatch) => ({
  setDidUserClickedAJob: (status) => dispatch(setDidUserClickedAJob(status)),
  setLatestJobId: (jobId) => dispatch(setLatestJobId(jobId)),
  fetchUserSWPProfile: (userToken, jobId, jobSeekerSlug) =>
    dispatch(fetchUserSWPProfile(userToken, jobId, jobSeekerSlug)),
  updateApplicationStatusOfJob: (
    userToken,
    jobId,
    applicantId,
    status,
    fetchApplicantData
  ) =>
    dispatch(
      updateApplicationStatusOfJob(
        userToken,
        jobId,
        applicantId,
        status,
        fetchApplicantData
      )
    ),
  setSWPProfileWindowToBeShown: (status) =>
    dispatch(setSWPProfileWindowToBeShown(status)),
  setClickedSWPProfileStatus: (status) =>
    dispatch(setClickedSWPProfileStatus(status)),
  setSWPProfileIndex: (index) => dispatch(setSWPProfileIndex(index)),
  // getNotesAgainstSWPProfile:(userToken, jobId, applicantId) => dispatch(getNotesAgainstSWPProfile(userToken, jobId, applicantId)),
  inviteApplicantToJob: (userToken, jobId, jobSeekerId) =>
    dispatch(inviteApplicantToJob(userToken, jobId, jobSeekerId)),
  fetchApplicantsAgainstJob: (
    userToken,
    jobId,
    jobStatus,
    keyword,
    dateOrder
  ) =>
    dispatch(
      fetchApplicantsAgainstJob(userToken, jobId, jobStatus, keyword, dateOrder)
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InviteApplicantCard);
