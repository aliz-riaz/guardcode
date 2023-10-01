import styles from "../ApplicantCard.module.scss";
import { connect } from "react-redux";
import ApplicantsList from "../ApplicantList";
import moment from "moment";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Col,
  Row,
  Button,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import { useEffect, useState } from "react";
import {
  fetchApplicantsAgainstJob,
  setDateOrderForApplicantList,
  setSearchKeywordForApplicantList,
  setFilterForApplicantList,
  setCurrentPageForApplicantList,
  setDidUserClickedAJob,
  setSelectedJobIdForCloseJobDiscard,
  setSelectedJobNameForCloseJobDiscard,
  setSWPProfileWindowToBeShown,
} from "../../../../redux/actions/staffingAction";
import { setDiscardModalForJobPost } from "../../../../redux/actions/jobPostAction";
import CloseJobModalForJobCards from "../../CloseJobModalForJobCard/CloseJobModalForJobCards";
import styles1 from "./StatsInHeader.module.scss";
const StatsInHeader = (props) => {
  const filterChangeHandler = (tabName) => {
    props.setFilterForApplicantList(tabName);
    // props.setCurrentPageForApplicantList('1')
    props.fetchApplicantsAgainstJob(
      props.user_token,
      props.latest_job_id_for_applicant_list,
      tabName,
      props.search_keyword_for_applicants_list,
      props.date_order_for_applicants_list
    );
  };

  const tabChangeHandler = (tabName) => {
    filterChangeHandler(tabName);
    props.setSWPProfileWindowToBeShown(false);
  };

  const tabs = [
    {
      count: props.job_to_be_shown_in_applicants_tab.applicants_count,
      name: "Total Applicants",
      value: "all",
    },
    {
      count: props.job_to_be_shown_in_applicants_tab.new_applicants_count,
      name: "Awaiting Review",
      value: "New Applicants",
    },
    {
      count: props.job_to_be_shown_in_applicants_tab.invited_applicants_count,
      name: "Invited",
      value: "Invited",
    },
    {
      count:
        props.job_to_be_shown_in_applicants_tab.shortlisted_applicants_count,
      name: "Shortlisted",
      value: "Shortlisted",
    },
    {
      count: props.job_to_be_shown_in_applicants_tab.rejected_applicants_count,
      name: "Declined",
      value: "Rejected",
    },
  ];
  return (
    <div className={`mt-md-auto mt-2 ${styles1.stats_tabs}`}>
      <ul
        className={`${styles.applicants} cursor-pointer d-inline-flex list-unstyled mb-0 applicants_total`}
      >
        {tabs.map((tab) => (
          <li
            className={`${
              (tab.name == props.filter_for_applicants_list ||
                tab.value == props.filter_for_applicants_list) &&
              styles1.active
            }`}
            onClick={() => tabChangeHandler(tab.value)}
          >
            <span className="fw-bold">{tab.count}</span>
            <span className="d-block">{tab.name}</span>
          </li>
        ))}

        {/* <li className={`${styles1.active}`} >
                    <span className='fw-bold'>{props.job_to_be_shown_in_applicants_tab.applicants_count}</span>
                    <span className="d-block">Total Applicants</span>
                  </li>
                  <li>
                  <span className='fw-bold'>{props.job_to_be_shown_in_applicants_tab.new_applicants_count}</span>
                    <span className="d-block">New Applicants</span>
                  </li>
                  <li>
                  <span className='fw-bold'>{props.job_to_be_shown_in_applicants_tab.reviewed_applicants_count}</span>
                    <span className="d-block">Reviewed</span>
                  </li>
                  <li>
                  <span className='fw-bold'>{props.job_to_be_shown_in_applicants_tab.shortlisted_applicants_count}</span>
                    <span className="d-block">Shortlisted</span>
                  </li>
                  <li>
                  <span className='fw-bold'>{props.job_to_be_shown_in_applicants_tab.shortlisted_applicants_count}</span>
                    <span className="d-block">Not Interested</span>
                  </li> */}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  job_to_be_shown_in_applicants_tab:
    state.vantage.staffingReducer.jobToBeShownInApplicantsTab,
  filter_for_applicants_list:
    state.vantage.staffingReducer.filterForApplicantsList,
  date_order_for_applicants_list:
    state.vantage.staffingReducer.dateOrderForApplicantsList,
  search_keyword_for_applicants_list:
    state.vantage.staffingReducer.searchKeywordForApplicantsList,
  latest_job_id_for_applicant_list: state.vantage.staffingReducer.latestJobId,
  user_token: state.vantage.userDataReducer.user_token,
  filter_for_job_list: state.vantage.staffingReducer.filterForJobList,
  date_order_for_job_list: state.vantage.staffingReducer.dateOrderForJobList,
  search_keyword_for_job_list:
    state.vantage.staffingReducer.searchKeywordForJobList,
  current_page_for_job_list:
    state.vantage.staffingReducer.currentPageForJobList,
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
    dateOrder
  ) =>
    dispatch(
      fetchApplicantsAgainstJob(userToken, jobId, jobStatus, keyword, dateOrder)
    ),
  setFilterForApplicantList: (filter) =>
    dispatch(setFilterForApplicantList(filter)),
  setDateOrderForApplicantList: (dateOrder) =>
    dispatch(setDateOrderForApplicantList(dateOrder)),
  setSearchKeywordForApplicantList: (keyword) =>
    dispatch(setSearchKeywordForApplicantList(keyword)),
  setCurrentPageForApplicantList: (page) =>
    dispatch(setCurrentPageForApplicantList(page)),
  setDidUserClickedAJob: (status) => dispatch(setDidUserClickedAJob(status)),
  setDiscardModalForJobPost: (status) =>
    dispatch(setDiscardModalForJobPost(status)),
  setSelectedJobIdForCloseJobDiscard: (jobId) =>
    dispatch(setSelectedJobIdForCloseJobDiscard(jobId)),
  setSelectedJobNameForCloseJobDiscard: (name) =>
    dispatch(setSelectedJobNameForCloseJobDiscard(name)),
  setSWPProfileWindowToBeShown: (status) =>
    dispatch(setSWPProfileWindowToBeShown(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StatsInHeader);
