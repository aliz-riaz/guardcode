import styles from "../ApplicantCard.module.scss";
import { connect } from "react-redux";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useState } from "react";
import {
  fetchApplicantsAgainstJob,
  setDateOrderForApplicantList,
  setSearchKeywordForApplicantList,
  setFilterForApplicantList,
  setCurrentPageForApplicantList,
  setDidUserClickedAJob,
  setJobStatus,
  setSelectedJobIdForCloseJobDiscard,
  setSelectedJobNameForCloseJobDiscard,
  setSWPProfileWindowToBeShown,
} from "../../../../redux/actions/staffingAction";
import { setDiscardModalForJobPost } from "../../../../redux/actions/jobPostAction";

const JobOpenCloseForApplicantHeader = (props) => {
  const [jobStatusDropdown, setJobStatusDropdown] = useState(false);

  const OpenCloseHandler = async (status) => {
    if (status == "Open") {
      await props.setJobStatus(
        props.user_token,
        props.job_to_be_shown_in_applicants_tab.id,
        "1",
        props.filter_for_job_list,
        props.search_keyword_for_job_list,
        props.date_order_for_job_list,
        props.current_page_for_job_list,
        "",
        {
          jobId: props.job_to_be_shown_in_applicants_tab.id,
          applicantStatus: props.filter_for_applicants_list,
          keyword: props.search_keyword_for_applicants_list,
          dateOrder: props.date_order_for_applicants_list,
          pageNumber: props.current_page_for_applicant_list,
          url: "",
        },
        null,
        null,
        null
      );

      await props.fetchApplicantsAgainstJob(
        props.user_token,
        props.latest_job_id_for_applicant_list,
        "all",
        props.search_keyword_for_applicants_list,
        props.date_order_for_applicants_list
      );
      props.setFilterForApplicantList("all");
    } else {
      if (props.job_to_be_shown_in_applicants_tab.applicants_count === 0) {
        await props.setJobStatus(
          props.user_token,
          props.job_to_be_shown_in_applicants_tab.id,
          "0",
          props.filter_for_job_list,
          props.search_keyword_for_job_list,
          props.date_order_for_job_list,
          props.current_page_for_job_list,
          "",
          {
            jobId: props.job_to_be_shown_in_applicants_tab.id,
            applicantStatus: props.filter_for_applicants_list,
            keyword: props.search_keyword_for_applicants_list,
            dateOrder: props.date_order_for_applicants_list,
            pageNumber: props.current_page_for_applicant_list,
            url: "",
          },
          null,
          null,
          null
        );
        await props.fetchApplicantsAgainstJob(
          props.user_token,
          props.latest_job_id_for_applicant_list,
          props.filter_for_applicants_list,
          props.search_keyword_for_applicants_list,
          props.date_order_for_applicants_list
        );
      } else {
        props.setDiscardModalForJobPost(true);
        props.setSelectedJobIdForCloseJobDiscard(
          props.job_to_be_shown_in_applicants_tab.id
        );
        props.setSelectedJobNameForCloseJobDiscard(
          props.job_to_be_shown_in_applicants_tab.title
        );
      }
    }
  };

  return (
    <div className="order-2 order-md-1">
      <Dropdown
        isOpen={jobStatusDropdown}
        toggle={() => setJobStatusDropdown((prevState) => !prevState)}
        end="false"
        className="d-flex justify-content-end p-0"
      >
        <DropdownToggle
          className={`${styles.jobActiveBtn} bg-white border-0 d-inline-flex align-items-center pr-0 py-0`}
        >
          <span
            className={
              "rounded-circle d-inline-block " +
              (props.job_to_be_shown_in_applicants_tab.status === "Closed"
                ? "bg-danger"
                : "bg-success")
            }
            style={{ width: "8px", height: "8px" }}
          ></span>
          <span className="text-dark fs-6 fw-bold ml-2">
            {props.job_to_be_shown_in_applicants_tab.status === "Closed"
              ? "Close"
              : "Open"}
          </span>
          <i className="ml-2" style={{ marginTop: "-4px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              viewBox="0 0 21 20"
            >
              <defs>
                <path
                  id="9k2qh4jmza"
                  d="M10 12.321l-4.41-4.41c-.326-.326-.854-.326-1.18 0-.325.325-.325.853 0 1.178l5 5c.326.326.854.326 1.18 0l5-5c.325-.325.325-.853 0-1.178-.326-.326-.854-.326-1.18 0L10 12.32z"
                />
              </defs>
              <g fill="none" fill-rule="evenodd">
                <g>
                  <g>
                    <g transform="translate(-986.000000, -18.000000) translate(32.000000, 16.000000) translate(954.375000, 2.000000)">
                      <mask id="7bh6d3uk6b" fill="#fff">
                        <use href="#9k2qh4jmza" />
                      </mask>
                      <use fill="#000" fill-rule="nonzero" href="#9k2qh4jmza" />
                      <g fill="#000" mask="url(#7bh6d3uk6b)">
                        <path
                          d="M0 0H20V20H0z"
                          transform="translate(0.000000, 1.000000)"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </i>
        </DropdownToggle>
        <DropdownMenu
          right
          className={`box-shadow ${styles.dropdown_menu_open} `}
        >
          <DropdownItem
            className="py-2"
            onClick={() =>
              OpenCloseHandler(
                props.job_to_be_shown_in_applicants_tab.status == "Open"
                  ? "Close"
                  : "Open"
              )
            }
          >
            {props.job_to_be_shown_in_applicants_tab.status == "Open"
              ? "Close"
              : "Open"}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
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
  setFilterForApplicantList: (filter) =>
    dispatch(setFilterForApplicantList(filter)),
  setDateOrderForApplicantList: (dateOrder) =>
    dispatch(setDateOrderForApplicantList(dateOrder)),
  setSearchKeywordForApplicantList: (keyword) =>
    dispatch(setSearchKeywordForApplicantList(keyword)),
  setCurrentPageForApplicantList: (page) =>
    dispatch(setCurrentPageForApplicantList(page)),
  setDidUserClickedAJob: (status) => dispatch(setDidUserClickedAJob(status)),
  setJobStatus: (
    userToken,
    jobId,
    status,
    jobStatus,
    keyword,
    dateOrder,
    pageNumber,
    report,
    fetchApplicantData,
    selected_applicants,
    members,
    listType
  ) =>
    dispatch(
      setJobStatus(
        userToken,
        jobId,
        status,
        jobStatus,
        keyword,
        dateOrder,
        pageNumber,
        report,
        fetchApplicantData,
        selected_applicants,
        members,
        listType
      )
    ),
  setDiscardModalForJobPost: (status) =>
    dispatch(setDiscardModalForJobPost(status)),
  setSelectedJobIdForCloseJobDiscard: (jobId) =>
    dispatch(setSelectedJobIdForCloseJobDiscard(jobId)),
  setSelectedJobNameForCloseJobDiscard: (name) =>
    dispatch(setSelectedJobNameForCloseJobDiscard(name)),
  setSWPProfileWindowToBeShown: (status) =>
    dispatch(setSWPProfileWindowToBeShown(status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobOpenCloseForApplicantHeader);
