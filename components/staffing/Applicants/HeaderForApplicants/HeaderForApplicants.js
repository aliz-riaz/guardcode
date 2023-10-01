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
import StatsInHeader from "./StatsInHeader";
import FiltersForApplicantsHeader from "./FiltersForApplicantsHeader";
import JobOpenCloseForApplicantHeader from "./JobOpenCloseForApplicantHeader";

const HeaderForApplicants = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <>
      <div
        className={`${styles.applicant_card} ${styles.applicant_header} bg-white box-shadow rounded jobs_filter_card mt-0 border-0`}
      >
        <Row className="mx-0 px-3 px-md-4 pt-md-4 pt-3">
          <Col className="col-12 col-md-8 px-0 order-2 order-md-1">
            {/* start */}
            <div className="d-flex flex-column h-100">
              <div className="mt-3 mt-md-0">
                <h3
                  className="mb-1 p-0"
                  onClick={() => {
                    props.setDidUserClickedAJob(true);
                  }}
                >
                  {props.job_to_be_shown_in_applicants_tab.title}
                  {props.user_id !=
                    props.job_to_be_shown_in_applicants_tab?.employer?.id && (
                    <span
                      className={`mb-0 fw-medium fs-7 ${styles.posted_tag}`}
                    >
                      Posted by{" "}
                      {`${
                        props.job_to_be_shown_in_applicants_tab?.employer
                          ?.decision_maker_first_name
                      } ${
                        props.job_to_be_shown_in_applicants_tab?.employer
                          ?.decision_maker_last_name
                      } ${
                        props.job_to_be_shown_in_applicants_tab?.employer?.id ==
                        props.organisationAccountOwnerId
                          ? "(Admin)"
                          : ""
                      }`}
                    </span>
                  )}
                </h3>
                <p className={`${styles.city} mb-1 mb-md-2`}>
                  <span className="mr-2">
                    <img
                      src={`${process.env.APP_URL}/images/map-pin-2.svg`}
                      style={{ marginTop: "-2px" }}
                    />
                  </span>
                  {props.job_to_be_shown_in_applicants_tab.city +
                    ", " +
                    props.job_to_be_shown_in_applicants_tab.postal_code}
                </p>
              </div>
            </div>
          </Col>
          <Col className="ml-auto px-0  order-1 order-md-2">
            <div className="d-flex flex-md-column h-100 align-items-center align-items-md-end justify-content-between justify-content-md-start">
              {props.job_to_be_shown_in_applicants_tab.is_expired === 0 && (
                <JobOpenCloseForApplicantHeader />
              )}
              <div className="order-1 order-md-2">
                <p
                  className={`${styles.date} fs-6 m-0 text-md-right mt-0 mt-md-1`}
                >
                  <span>
                    Posted on{" "}
                    {moment(
                      props.job_to_be_shown_in_applicants_tab.created_at,
                      "YYYY-MM-DD"
                    ).format("DD MMMM YYYY")}
                  </span>
                  <br className="d-block d-md-none" />
                  {props.job_to_be_shown_in_applicants_tab.status !=
                    "Closed" && (
                    <span className="pl-md-3">
                      <span className={`${styles.circle}`}></span>
                      {props.job_to_be_shown_in_applicants_tab.remaining_days ==
                      "0"
                        ? "Expires today"
                        : `Expires in ${props.job_to_be_shown_in_applicants_tab.remaining_days} days`}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </Col>
        </Row>
        {props.swp_profile_window_to_be_shown ||
        (props.invite_applicants.length > 0 &&
          props.filter_for_applicants_list == "all") ? null : (
          <Row className="justify-content-between px-3 px-md-4 mx-md-0 border border-top-1 border-light pt-3">
            <Col className="order-2 order-md-1 pl-md-0">
              <StatsInHeader />
            </Col>
            <Col className="order-1 order-md-2 my-2 my-md-0 pr-md-0">
              <FiltersForApplicantsHeader />
            </Col>
          </Row>
        )}
      </div>
      <CloseJobModalForJobCards />
    </>
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
  invite_applicants: state.vantage.staffingReducer.inviteApplicants,
  user_id: state.vantage.userDataReducer.user_id,
  isAccountOwner: state.vantage.organisationReducer.isAccountOwner,
  organisationAccountOwnerId:
    state.vantage.organisationReducer.organisationAccountOwnerId,
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
)(HeaderForApplicants);
