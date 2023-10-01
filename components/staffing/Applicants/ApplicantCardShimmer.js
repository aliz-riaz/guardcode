import React, { useState, Suspense } from "react";
import styles from "./ApplicantCard.module.scss";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";

const ApplicantCard = (props) => {
  return (
    <>
      <div
        className={`${styles.applicant_card_new} ${
          props.swp_profile_window_to_be_shown && styles.shownApplicant
        } border-0`}
      >
        <ul>
          <li
            className={`pl-0 ${
              props.swp_profile_window_to_be_shown ? "flex-1" : null
            }`}
          >
            <div className={`${styles.user_header} d-flex align-items-center`}>
              <div className={`${styles.applicant_avatar} flex-shrink-0`}>
                <figure onClick={(e) => cardClickHandler(e)} className="h-100">
                  <Suspense className="h-100">
                    <div className="shimmerBG rounded-circle h-100"></div>
                  </Suspense>
                </figure>
              </div>
              <div className={`${styles.applicant_info} flex-grow-1 `}>
                <div className="shimmerBG py-3 px-2 w-100"></div>
                <div className="shimmerBG py-2 px-2 w-75 mt-2"></div>
              </div>
            </div>
          </li>

          {!isMobile && !props.swp_profile_window_to_be_shown && (
            <li>
              <div
                className={`${styles.licenses_wrap} mb-3 justify-content-center`}
              >
                <div className="shimmerBG py-2 px-2 w-100"></div>
                <div className="shimmerBG py-2 px-2 w-100 mt-1"></div>
              </div>
              <div className={`${styles.badges_wrap} justify-content-between`}>
                <div
                  className={`${styles.badge_circle} shimmerBG py-2 px-2 w-25 rounded-circle`}
                ></div>
                <div
                  className={`${styles.badge_circle} shimmerBG py-2 px-2 w-25 rounded-circle`}
                ></div>
                <div
                  className={`${styles.badge_circle} shimmerBG py-2 px-2 w-25 rounded-circle`}
                ></div>
              </div>
              <div></div>
            </li>
          )}

          {!isMobile && (
            <li
              className={`${
                isMobile || (props.swp_profile_window_to_be_shown && "d-none")
              }`}
            >
              <div className={`${styles.experience_wrap}`}>
                <div className="shimmerBG py-2 px-2 w-100"></div>
                <div className="shimmerBG py-2 px-2 w-75 mt-3"></div>
                <div className="shimmerBG py-2 px-2 w-75 mt-1"></div>
                <div className="shimmerBG py-2 px-2 w-75 mt-1"></div>
              </div>
            </li>
          )}

          {!isMobile && !props.swp_profile_window_to_be_shown && (
            <li className={`pr-0`}>
              <div className={`${styles.rank_btn_wrap}`}>
                <div className={`${styles.ranking_wrap}`}>
                  <div className="shimmerBG py-5 px-5 w-50"></div>
                </div>

                <div className={`${styles.button_wrap}`}>
                  <div className="shimmerBG py-3 px-5 w-25"></div>
                  <div className="shimmerBG py-3 px-5 w-25"></div>
                  <div className="shimmerBG py-3 px-5 w-25"></div>
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
    </>
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
  swp_profile_window_to_be_shown:
    state.vantage.staffingReducer.swpProfileWindowToBeShown,
  swp_profile_to_be_shown: state.vantage.staffingReducer.swpProfileToBeShown,
  swp_profile_index: state.vantage.staffingReducer.swpProfileIndex,
});

const mapDispatchToProps = (dispatch) => ({
  setDidUserClickedAJob: (status) => dispatch(setDidUserClickedAJob(status)),
  setLatestJobId: (jobId) => dispatch(setLatestJobId(jobId)),
  fetchUserSWPProfile: (userToken, jobId, jobSeekerSlug) =>
    dispatch(fetchUserSWPProfile(userToken, jobId, jobSeekerSlug)),
  updateApplicationStatusOfJob: (userToken, jobId, applicantId, status) =>
    dispatch(
      updateApplicationStatusOfJob(userToken, jobId, applicantId, status)
    ),
  setSWPProfileWindowToBeShown: (status) =>
    dispatch(setSWPProfileWindowToBeShown(status)),
  setClickedSWPProfileStatus: (status) =>
    dispatch(setClickedSWPProfileStatus(status)),
  setSWPProfileIndex: (index) => dispatch(setSWPProfileIndex(index)),
  //   getNotesAgainstSWPProfile: (userToken, jobId, applicantId) => dispatch(getNotesAgainstSWPProfile(userToken, jobId, applicantId)),
  setScreenToShowOnStaffing: (screen) =>
    dispatch(setScreenToShowOnStaffing(screen)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantCard);
// export default ApplicantCard;
