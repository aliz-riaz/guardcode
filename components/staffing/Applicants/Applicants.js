import dynamic from "next/dynamic";
import { connect } from "react-redux";
import { useEffect } from "react";

import HeaderForApplicants from "./HeaderForApplicants/HeaderForApplicants";
import ApplicantList from "./ApplicantList";
import PostAJobButton from "../../JobPost/PostAJobButton";
import styles from "./ApplicantsList.module.scss";
import SimpleBarReact from "simplebar-react";
import NoJobsPosted from "./NoJobsPosted";
import {
  setInviteApplicants,
  setCurrentPageForJobList,
} from "../../../redux/actions/staffingAction";
import {
  fetchApplicantsAgainstJob,
  setScreenToShowOnStaffing,
  setSWPProfileWindowToBeShown,
} from "../../../redux/actions/staffingAction";
import { updateIsNavbarOpenAction } from "../../../redux/actions/main";
import InviteApplicantsList from "./InviteApplicantsList";
import IsRequestLoderComponent from "../../Common/IsRequestLoderComponent";
import { useRouter } from "next/router";
import SWPProfileShimmer from "../SWPProfile/SwpProfileShimmer";
const SWPProfile = dynamic(() => import("../SWPProfile/SwpProfile"), {
  ssr: false,
});
// const SWPProfileShimmer = dynamic(() => import('../SWPProfile/SWPProfileShimmer'), {
//   ssr: false,
// })
const SwpProfileForInvite = dynamic(
  () => import("../SWPProfile/SwpProfileForInvite"),
  { ssr: false }
);

import "simplebar/dist/simplebar.min.css";
import DecisionMakerForListRendering from "./DecisionMakerForListRendering";
import HeaderForApplicantShown from "./HeaderForApplicants/HeaderForApplicantShown";

const Applicants = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (
      (props.search_keyword_for_applicants_list == "" &&
        props.jobs_posted_by_user.length > 0) ||
      props.latest_job_id_for_applicant_list
    ) {
      props.fetchApplicantsAgainstJob(
        props.user_token,
        props.latest_job_id_for_applicant_list,
        props.filter_for_applicants_list,
        props.search_keyword_for_applicants_list,
        props.date_order_for_applicants_list
      );
    }

    props.updateIsNavbarOpenAction(false).then((resp0) => {});
  }, [
    props.swp_profile_window_to_be_shown,
    props.search_keyword_for_applicants_list,
    props.latest_job_id_for_applicant_list,
    props.latest_job_id_for_applicant_list,
    props.jobs_posted_by_user.length,
  ]);

  const router = useRouter();

  useEffect(() => {
    // not setting the swp profile window to false for magic link visitors
    if (
      !(
        router.query.jobid &&
        router.query.plot &&
        router.query.appid &&
        props.user_token
      )
    ) {
      props.setSWPProfileWindowToBeShown(false);
    }
  }, []);

  const backToJobs = (e) => {
    e.preventDefault();
    props.setDidUserRequestJobTab(true);
    props.setCurrentPageForJobList(1);
    props.setScreenToShowOnStaffing("jobs");
  };
  return (
    <div className={`main-inner-content staffing-content`}>
      {props.jobs_posted_by_user.length > 0 ||
      props.latest_job_id_for_applicant_list ? (
        <>
          {!props.swp_profile_window_to_be_shown && (
            <div className="d-flex flex-wrap justify-content-between justify-content-md-between align-items-center applicant_top_actions">
              <button
                className="btn btn-outline-dark btn-sm h-auto  mt-3 mt-md-4 mb-3 mb-md-4"
                onClick={backToJobs}
              >
                {" "}
                ← Back to Jobs
              </button>
              <PostAJobButton />
            </div>
          )}
          <div>
            {!props.swp_profile_window_to_be_shown ? (
              <HeaderForApplicants />
            ) : (
              <HeaderForApplicantShown />
            )}
          </div>
        </>
      ) : null}

      <div
        className={`${styles.applicant_container} ${
          props.swp_profile_window_to_be_shown
            ? "profile_open"
            : styles.profile_not_open
        }`}
      >
        <div
          className={`${styles.applicant_list_col} ${
            !props.swp_profile_window_to_be_shown && "col-12 px-0"
          }`}
        >
          {props.jobs_posted_by_user.length > 0 ||
          props.latest_job_id_for_applicant_list ? (
            <DecisionMakerForListRendering />
          ) : (
            <NoJobsPosted styles={styles} />
          )}
        </div>
        {props.swp_profile_window_to_be_shown ? (
          props.job_applicants_for_applicants_tab.length > 0 ? (
            !props.swp_profile_shimmer ? (
              <SWPProfile />
            ) : (
              <SWPProfileShimmer />
            )
          ) : (
            <SwpProfileForInvite />
          )
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  jobs_posted_by_user: state.vantage.staffingReducer.jobsPostedByUser,
  swp_profile_window_to_be_shown:
    state.vantage.staffingReducer.swpProfileWindowToBeShown,
  swp_profile_shimmer: state.vantage.staffingReducer.swpProfileShimmer,
  job_applicants_for_applicants_tab:
    state.vantage.staffingReducer.jobApplicants,
  // current_page_for_applicant_list: state.vantage.staffingReducer.currentPageForApplicantList,
  search_keyword_for_applicants_list:
    state.vantage.staffingReducer.searchKeywordForApplicantsList,
  user_token: state.vantage.userDataReducer.user_token,
  latest_job_id_for_applicant_list: state.vantage.staffingReducer.latestJobId,
  filter_for_applicants_list:
    state.vantage.staffingReducer.filterForApplicantsList,
  date_order_for_applicants_list:
    state.vantage.staffingReducer.dateOrderForApplicantsList,
  search_keyword_for_applicants_list:
    state.vantage.staffingReducer.searchKeywordForApplicantsList,
  is_request_loader: state.vantage.commonReducer.is_request_loader,
});

const mapDispatchToProps = (dispatch) => ({
  setScreenToShowOnStaffing: (screen) =>
    dispatch(setScreenToShowOnStaffing(screen)),
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
  setInviteApplicants: (list) => dispatch(setInviteApplicants(list)),
  setSWPProfileWindowToBeShown: (status) =>
    dispatch(setSWPProfileWindowToBeShown(status)),
  updateIsNavbarOpenAction: (value) =>
    dispatch(updateIsNavbarOpenAction(value)),
  setCurrentPageForJobList: (currentPage) =>
    dispatch(setCurrentPageForJobList(currentPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Applicants);
