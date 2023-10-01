import { connect } from "react-redux";

import IsRequestLoderComponent from "../../Common/IsRequestLoderComponent";
import ApplicantCard from "./ApplicantCard";
import {
  setCurrentPageForApplicantList,
  fetchApplicantsAgainstJob,
  setScreenToShowOnStaffing,
} from "../../../redux/actions/staffingAction";
import { isMobile } from "react-device-detect";
import styles from "./ApplicantsList.module.scss";
import InviteApplicantsList from "./InviteApplicantsList";

const NoApplicantsFound = (props) => {
  return (
    <div className={styles.noApplicantFound}>
      <div>
        <img src={process.env.APP_URL + "/images/noapplicants-img.svg"} />
      </div>
      <h4>No applicant(s) found</h4>
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

export default connect(mapStateToProps, mapDispatchToProps)(NoApplicantsFound);
