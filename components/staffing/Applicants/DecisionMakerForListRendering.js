import dynamic from "next/dynamic";
import { connect } from "react-redux";
import { useEffect } from "react";

import ApplicantList from "./ApplicantList";

import SimpleBarReact from "simplebar-react";

import {
  fetchApplicantsAgainstJob,
  setScreenToShowOnStaffing,
  fetchUserSWPProfile,
  setSWPProfileIndex,
  updateApplicationStatusOfJob,
} from "../../../redux/actions/staffingAction";
import InviteApplicantsList from "./InviteApplicantsList";
import IsRequestLoderComponent from "../../Common/IsRequestLoderComponent";
import { isMobile } from "react-device-detect";
import styles from "./DecisionMakerForListRendering.module.scss";
const SWPProfile = dynamic(() => import("../SWPProfile/SwpProfile"), {
  ssr: false,
});
const SwpProfileForInvite = dynamic(
  () => import("../SWPProfile/SwpProfileForInvite"),
  { ssr: false }
);

import "simplebar/dist/simplebar.min.css";
import NoApplicantsFound from "./NoApplicantsFound";
import EmptyStateForApplicantsList from "./EmptyStateForApplicantsList";
import ApplicantCardShimmer from "./ApplicantCardShimmer";

const DecisionMakerForListRendering = (props) => {
  const nextSWPProfile = (e) => {
    e.preventDefault();
    // setPopoverOpen(false);
    let nextIndex = parseInt(parseInt(props.swp_profile_index) + 1);
    props.setSWPProfileIndex(nextIndex);
    props.fetchUserSWPProfile(
      props.user_token,
      props.latest_job_id_for_applicant_tab,
      props.job_applicants_for_applicants_tab[nextIndex].slug
    );
    if (props.job_applicants_for_applicants_tab[nextIndex].is_reviewed == 0) {
      props.updateApplicationStatusOfJob(
        props.user_token,
        props.latest_job_id_for_applicant_tab,
        props.job_applicants_for_applicants_tab[nextIndex].id,
        "Reviewed"
      );
    }
    // props.setClickedSWPProfileStatus(props.job_applicants_for_applicants_tab[nextIndex].applicant_status)
  };

  const previousSWPProfile = (e) => {
    e.preventDefault();
    //setPopoverOpen(false);
    // if(props.swp_profile_index > 0) {
    let nextIndex = parseInt(parseInt(props.swp_profile_index) - 1);
    props.setSWPProfileIndex(nextIndex);
    props.fetchUserSWPProfile(
      props.user_token,
      props.latest_job_id_for_applicant_tab,
      props.job_applicants_for_applicants_tab[nextIndex].slug
    );
    if (props.job_applicants_for_applicants_tab[nextIndex].is_reviewed == 0) {
      props.updateApplicationStatusOfJob(
        props.user_token,
        props.latest_job_id_for_applicant_tab,
        props.job_applicants_for_applicants_tab[nextIndex].id,
        "Reviewed"
      );
    }
    // props.setClickedSWPProfileStatus(props.job_applicants_for_applicants_tab[nextIndex].applicant_status)
  };
  return (
    <>
      {props.is_request_loader ? (
        // <IsRequestLoderComponent color={"dark"} customClass="spinner-large" />
        <>
          <ApplicantCardShimmer /> <ApplicantCardShimmer />{" "}
          <ApplicantCardShimmer />
        </>
      ) : props.job_applicants_for_applicants_tab?.length > 0 ? (
        props.swp_profile_window_to_be_shown ? (
          <>
            <span className={`${styles.next_and_previous}`}>
              <button
                disabled={parseInt(props.swp_profile_index) > 0 ? false : true}
                onClick={previousSWPProfile}
              >
                <img
                  src={process.env.APP_URL + "/images/chevron-left.svg"}
                  alt=""
                />
                <span>Previous</span>
              </button>
              <button
                disabled={
                  props.job_applicants_for_applicants_tab.length ==
                  parseInt(parseInt(props.swp_profile_index) + 1)
                    ? true
                    : false || props.usreq
                }
                onClick={nextSWPProfile}
              >
                <span>Next</span>
                <img
                  src={process.env.APP_URL + "/images/chevron-right.svg"}
                  alt=""
                />
              </button>
            </span>
            <SimpleBarReact style={{ maxHeight: "100%" }}>
              <div style={{ overflowX: "hidden" }}>
                <ApplicantList />
              </div>
            </SimpleBarReact>
          </>
        ) : (
          <ApplicantList />
        )
      ) : props.filter_for_applicants_list != "all" ||
        props.search_keyword_for_applicants_list != "" ? (
        <NoApplicantsFound />
      ) : props.invite_applicants?.length > 0 ? (
        props.swp_profile_window_to_be_shown ? (
          <>
            {/* <span className={`${styles.next_and_previous}`}>
                      <button
                        disabled={parseInt(props.swp_profile_index) > 0 ? false : true}
                        onClick={previousSWPProfile}
                      >
                        <img src={process.env.APP_URL + '/images/chevron-left.svg'} alt="" />
                        <span>Previous</span>
                      </button>
                      <button
                        disabled={
                          props.job_applicants_for_applicants_tab.length ==
                            parseInt(parseInt(props.swp_profile_index) + 1)
                            ? true
                            : false || props.usreq
                        }
                        onClick={nextSWPProfile}
                      >
                        <span>Next</span>
                        <img src={process.env.APP_URL + '/images/chevron-right.svg'} alt="" />
                      </button>
                    </span> */}
            <SimpleBarReact style={{ maxHeight: "100%" }}>
              <div style={{ overflowX: "hidden" }}>
                <InviteApplicantsList
                  invite_applicants={props.invite_applicants}
                />
              </div>
            </SimpleBarReact>
          </>
        ) : (
          <InviteApplicantsList invite_applicants={props.invite_applicants} />
        )
      ) : (
        <EmptyStateForApplicantsList />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  jobs_posted_by_user: state.vantage.staffingReducer.jobsPostedByUser,
  job_applicants_for_applicants_tab:
    state.vantage.staffingReducer.jobApplicants,
  pagination_links_for_applicant_list:
    state.vantage.staffingReducer.paginationForApplicantList,
  current_page_for_applicant_list:
    state.vantage.staffingReducer.currentPageForApplicantList,
  total_pages_for_applicant_list:
    state.vantage.staffingReducer.totalPagesForApplicantList,
  user_token: state.vantage.userDataReducer.user_token,
  filter_for_applicants_list:
    state.vantage.staffingReducer.filterForApplicantsList,
  date_order_for_applicants_list:
    state.vantage.staffingReducer.dateOrderForApplicantsList,
  search_keyword_for_applicants_list:
    state.vantage.staffingReducer.searchKeywordForApplicantsList,
  latest_job_id_for_applicant_list: state.vantage.staffingReducer.latestJobId,
  is_request_loader: state.vantage.commonReducer.is_request_loader,
  swp_profile_index: state.vantage.staffingReducer.swpProfileIndex,
  job_to_be_shown_in_applicant_tab:
    state.vantage.staffingReducer.jobToBeShownInApplicantsTab,
  invite_applicants: state.vantage.staffingReducer.inviteApplicants,
  swp_profile_window_to_be_shown:
    state.vantage.staffingReducer.swpProfileWindowToBeShown,
  latest_job_id_for_applicant_tab: state.vantage.staffingReducer.latestJobId,
});

const mapDispatchToProps = (dispatch) => ({
  // fetchApplicantsAgainstJob: (userToken, jobId, jobStatus, keyword, dateOrder, pageNumber, url) => dispatch(fetchApplicantsAgainstJob(userToken, jobId, jobStatus, keyword, dateOrder, pageNumber, url)),
  fetchApplicantsAgainstJob: (
    userToken,
    jobId,
    jobStatus,
    keyword,
    dateOrder,
    pageNumber,
    url
  ) =>
    dispatch(
      fetchApplicantsAgainstJob(
        userToken,
        jobId,
        jobStatus,
        keyword,
        dateOrder,
        pageNumber,
        url
      )
    ),
  setCurrentPageForApplicantList: (page) =>
    dispatch(setCurrentPageForApplicantList(page)),
  fetchApplicantsAgainstJobForInvite: (userToken, jobId) =>
    dispatch(fetchApplicantsAgainstJobForInvite(userToken, jobId)),
  setScreenToShowOnStaffing: (screen) =>
    dispatch(setScreenToShowOnStaffing(screen)),
  fetchUserSWPProfile: (userToken, jobId, jobSeekerSlug) =>
    dispatch(fetchUserSWPProfile(userToken, jobId, jobSeekerSlug)),
  setSWPProfileIndex: (index) => dispatch(setSWPProfileIndex(index)),
  updateApplicationStatusOfJob: (userToken, jobId, applicantId, status) =>
    dispatch(
      updateApplicationStatusOfJob(userToken, jobId, applicantId, status)
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DecisionMakerForListRendering);
