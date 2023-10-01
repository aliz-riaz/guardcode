import dynamic from "next/dynamic";
import { connect } from "react-redux";
import { useEffect } from "react";

import HeaderForApplicants from "./HeaderForApplicants/HeaderForApplicants";
import ApplicantList from "./ApplicantList";
import PostAJobButton from "../../JobPost/PostAJobButton";
import styles from "./ApplicantsList.module.scss";
import SimpleBarReact from "simplebar-react";
import NoJobsPosted from "./NoJobsPosted";
import { setInviteApplicants } from "../../../redux/actions/staffingAction";
import {
  fetchApplicantsAgainstJob,
  setScreenToShowOnStaffing,
} from "../../../redux/actions/staffingAction";
import InviteApplicantsList from "./InviteApplicantsList";
import IsRequestLoderComponent from "../../Common/IsRequestLoderComponent";

const SWPProfile = dynamic(() => import("../SWPProfile/SwpProfile"), {
  ssr: false,
});
const SwpProfileForInvite = dynamic(
  () => import("../SWPProfile/SwpProfileForInvite"),
  { ssr: false }
);

import "simplebar/dist/simplebar.min.css";
import NoApplicantsFound from "./NoApplicantsFound";

const EmptyStateForApplicantsList = (props) => {
  return (
    <div className={styles.noApplicantFound}>
      <div>
        <img src={process.env.APP_URL + "/images/noapplicants-img.svg"} />
      </div>
      <h4>There are no applicant(s) yet</h4>
      <p>The applicants applied against any job, will reside here.</p>
    </div>
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

  job_to_be_shown_in_applicant_tab:
    state.vantage.staffingReducer.jobToBeShownInApplicantsTab,
  invite_applicants: state.vantage.staffingReducer.inviteApplicants,
  swp_profile_window_to_be_shown:
    state.vantage.staffingReducer.swpProfileWindowToBeShown,
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmptyStateForApplicantsList);
