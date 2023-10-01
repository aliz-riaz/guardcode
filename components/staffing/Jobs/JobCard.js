import { useState, useRef } from "react";
import {
  Row,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import moment from "moment";
import { connect } from "react-redux";

import {
  setJobStatus,
  fetchJobPostedByUser,
  setDidUserClickedAJob,
  setLatestJobId,
  setScreenToShowOnStaffing,
  setFilterForApplicantList,
  setDateOrderForApplicantList,
  setSearchKeywordForApplicantList,
  setCurrentPageForApplicantList,
  setSWPProfileWindowToBeShown,
  setSelectedJobIdForCloseJobDiscard,
  setSelectedJobNameForCloseJobDiscard,
  fetchJobDescription,
  fetchApplicantsAgainstJob,
  addUserInFeedbackList,
  setJobId,
} from "../../../redux/actions/staffingAction";
import {
  setDiscardModalForJobPost,
  setShowJobPreview,
} from "../../../redux/actions/jobPostAction";
import PreviewJob from "../../../components/JobPost/PreviewJob/Preview";
import {
  setBoostJobId,
  setBoostConfirmationModal,
} from "../../../redux/actions/billingAction";
import styles from "./JobCard.module.scss";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const JobCard = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenDetail, setDropdownOpenDetail] = useState(false);
  const [textCopied, setTextCopied] = useState(false);
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const toggleDetail = () => setDropdownOpenDetail((prevState) => !prevState);

  const [modalState, setModalState] = useState(false);
  const toggleModalState = (jobId) => {
    props.setBoostJobId(jobId);
    props.setBoostConfirmationModal(true);
  };

  const updateJobStatusHandler = async (jobId, status) => {
    const teamMembers =
      props.organisationFilters.staffing.switchValue === "All Jobs"
        ? props.organisationFilters.staffing.seletedTeamMembers.length > 0
          ? props.organisationFilters.staffing.seletedTeamMembers.map(
              (member) => member.id
            )
          : [
              ...props.organisationMembers.map((member) => member.id),
              props.user_id,
            ]
        : [];

    await props.setJobStatus(
      props.user_token,
      jobId,
      status,
      props.filter_for_job_list,
      props.search_keyword_for_job_list,
      props.date_order_for_job_list,
      props.current_page_for_job_list,
      "",
      {},
      null,
      teamMembers,
      props.organisationFilters.staffing.switchValue === "My Jobs"
        ? "self"
        : "all"
    );
  };

  const handleTitleClick = () => {
    props.setLatestJobId(props.data.id);
    props.setDidUserClickedAJob(true);
    props.setScreenToShowOnStaffing("applicants");
    props.setFilterForApplicantList("all");
    props.setDateOrderForApplicantList("DESC");
    props.setSearchKeywordForApplicantList("");
    props.setCurrentPageForApplicantList("1");
    props.setSWPProfileWindowToBeShown(false);
  };

  const OpenCloseHandler = (status) => {
    // props.addUserInFeedbackList(props.data.applicants)
    if (status == "Open") {
      updateJobStatusHandler(props.data.id, "1");
    } else {
      props.data.applicants_count === 0
        ? updateJobStatusHandler(props.data.id, "0")
        : props.setDiscardModalForJobPost(true);
      props.setSelectedJobIdForCloseJobDiscard(props.data.id);
      props.setSelectedJobNameForCloseJobDiscard(props.data.title);
      // props.fetchApplicantsAgainstJob(props.user_token,props.data.id)
    }
  };

  const TooltipMessage = () => {
    const { data } = props;

    if (data.status === "Closed") {
      if (data.is_expired === 0) {
        return "Job editing is not allowed for closed job";
      }
      return "Job editing is not allowed for expired job";
    }

    return "You have reached your edit limit";
  };

  return (
    <>
      <div
        className={`${styles.job_card} rounded bg-white p-4`}
        style={{ marginTop: "15px" }}
      >
        <Row className="position-relative">
          <Col
            className="col-12 col-md-8 cursor-pointer"
            onClick={handleTitleClick}
          >
            <div className="d-flex flex-column h-100">
              <div>
                <div
                  className={`d-flex align-items-md-center align-items-start  justify-content-between justify-content-md-start mb-1`}
                >
                  <h3 className="mb-0 p-0 fs-3 cursor-pointer d-flex align-items-center">
                    {props.data.title}
                    {props.switchValue == props.rightText && (
                      <span
                        className={`mb-0 fw-medium fs-7 ${styles.posted_tag}`}
                      >
                        Posted by{" "}
                        {`${props.data.employer.decision_maker_first_name} ${
                          props.data.employer.decision_maker_last_name
                        } ${
                          props.data.employer.id ==
                          props.organisationAccountOwnerId
                            ? "(Admin)"
                            : ""
                        }`}
                      </span>
                    )}
                  </h3>
                  {/* {props.data.refunded} */}
                  {props.data.refunded && (
                    <div
                      className={`${styles.refunded_badge} d-flex align-items-center  ml-3`}
                    >
                      <i>
                        <img
                          src={process.env.APP_URL + "/images/round-pound.svg"}
                        />
                      </i>
                      <span className="text-white ml-1">Refunded</span>
                    </div>
                  )}
                </div>

                <p className={`${styles.city} mb-1 mb-md-3`}>
                  <span className="mr-2 d-inline-block">
                    <img
                      src={`${process.env.APP_URL}/images/map-pin-1.svg`}
                      style={{ marginTop: "-2px" }}
                    />
                  </span>
                  {props.data.city +
                    `${props.data.postal_code != "" ? ", " : ""}` +
                    props.data.postal_code}
                </p>
                <p className={`${styles.date} m-0 text-md-right d-md-none`}>
                  Posted on{" "}
                  {moment(props.data.created_at, "YYYY-MM-DD").format(
                    "DD MMMM YYYY"
                  )}
                </p>
              </div>
              <div className="mt-2 mt-md-auto">
                <ul
                  className={`${styles.applicants} d-inline-flex list-unstyled mb-0`}
                >
                  <li>
                    <span>{props.data.applicants_count}</span>
                    <span className="d-block">Total Applicants</span>
                  </li>
                  <li>
                    <span>{props.data.new_applicants_count}</span>
                    <span className="d-block">New Applicants</span>
                  </li>
                  <li>
                    {/* <span>{props.data.reviewed_applicants_count}</span> */}
                    <span>{props.data.new_applicants_count}</span>
                    <span className="d-block">Awaiting Review</span>
                  </li>
                  <li>
                    <span>{props.data.shortlisted_applicants_count}</span>
                    <span className="d-block">Shortlisted</span>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col className="ml-auto cursor-pointer">
            <div className="d-flex flex-column h-100">
              <div className="mt-auto d-none d-flex flex-column align-items-end justify-content-md-end">
                <p className={`${styles.date} m-0 text-md-right`}>
                  Posted on{" "}
                  {moment(props.data.created_at, "YYYY-MM-DD").format(
                    "DD MMMM YYYY"
                  )}
                </p>
                {props.data.is_boosted == false &&
                  props.data.status == "Open" &&
                  props.data.boost_payment_status != "Completed" && (
                    <>
                      <button
                        className={styles.boost_job_button}
                        onClick={() => toggleModalState(props.data.id)}
                      >
                        <img
                          src={`${process.env.APP_URL}/images/bolt-dark.svg`}
                          alt="bolt"
                        />
                        Boost Job
                      </button>
                    </>
                  )}

                {(props.data.is_boosted == true &&
                  props.data.boost_payment_status == "Completed") ||
                (props.data.is_boosted == true &&
                  props.data.boost_payment_status == "") ? (
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={"tooltip-" + "1"}>
                        This job will be featured higher in search results and
                        attract more candidates
                      </Tooltip>
                    }
                  >
                    <span className={styles.boosted_tag}>
                      <img
                        src={`${process.env.APP_URL}/images/bolt-light.svg`}
                        alt="bolt"
                      />
                      boosted Job
                    </span>
                  </OverlayTrigger>
                ) : (
                  props.data.is_boosted == true &&
                  props.data.boost_payment_status == "In Progress" && (
                    <span className={styles.inprogress_tag}>
                      <img
                        src={`${process.env.APP_URL}/images/inprogress_tag.svg`}
                        alt="inprogress"
                      />
                      Boost in progress
                    </span>
                  )
                )}
              </div>
            </div>
          </Col>
          <div
            className={`position-absolute d-flex align-items-center ${styles.jobCard__actions}`}
          >
            <div>
              {props.data.is_expired === 0 && (
                <Dropdown
                  isOpen={dropdownOpen}
                  toggle={toggle}
                  end="false"
                  className="d-flex justify-content-end"
                >
                  <DropdownToggle
                    className={`${styles.jobActiveBtn} bg-white border-0 d-inline-flex align-items-center`}
                  >
                    <span
                      className={
                        "rounded-circle d-inline-block " +
                        (props.data.status === "Closed"
                          ? "bg-danger"
                          : "bg-success")
                      }
                      style={{ width: "10px", height: "10px" }}
                    ></span>
                    <span className="text-dark ml-3">
                      {props.data.status === "Closed" ? "Close" : "Open"}
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
                                <use
                                  fill="#000"
                                  fill-rule="nonzero"
                                  href="#9k2qh4jmza"
                                />
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
                          props.data.status == "Open" ? "Close" : "Open"
                        )
                      }
                    >
                      {props.data.status == "Open" ? "Close" : "Open"}
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}
            </div>
            <div className="position-relative">
              {show ? (
                <span
                  className={`badge badge-dark position-absolute ${styles.copiedBadge}`}
                >
                  Link copied
                </span>
              ) : null}
              <Dropdown
                isOpen={dropdownOpenDetail}
                toggle={toggleDetail}
                end="false"
                className=""
              >
                <DropdownToggle
                  className={`${styles.jobActiveBtn} bg-white border-0 d-inline-flex align-items-center`}
                >
                  <i className="" style={{ marginTop: "-2px" }}>
                    <img
                      src={process.env.APP_URL + "/images/more-vertical.svg"}
                    />
                  </i>
                </DropdownToggle>
                <DropdownMenu className={`box-shadow  ${styles.dropdownItems}`}>
                  <DropdownItem
                    className=" py-2"
                    onClick={(e) => {
                      e.preventDefault();
                      props.setScreenToShowOnStaffing("jobRepost");
                      props.setJobId(props.data.id);
                    }}
                  >
                    <span>Repost</span>
                  </DropdownItem>
                  {props.data.updated_count < 2 &&
                  props.data.is_expired == 0 &&
                  props.data.status == "Open" ? (
                    <DropdownItem
                      className=" py-2"
                      onClick={(e) => {
                        e.preventDefault();
                        props.setScreenToShowOnStaffing("editJob");
                        props.setJobId(props.data.id);
                      }}
                    >
                      <span>Edit {` (${props.data.updated_count}/2)`}</span>
                    </DropdownItem>
                  ) : (
                    <OverlayTrigger
                      overlay={
                        <Tooltip id="tooltip">
                          <TooltipMessage />
                        </Tooltip>
                      }
                      placement="top"
                    >
                      <span>
                        <DropdownItem className="py-2" disabled>
                          <span>Edit {` (${props.data.updated_count}/2)`}</span>
                        </DropdownItem>
                      </span>
                    </OverlayTrigger>
                  )}
                  <DropdownItem
                    className=" py-2"
                    onClick={(e) => {
                      e.preventDefault();
                      process.browser &&
                        navigator.clipboard.writeText(
                          process.env.WEB_JOB_BOARD_URL +
                            "detail/" +
                            props.data.id
                        );
                      setShow(true);
                      setTimeout(() => {
                        setShow(false);
                      }, 1000);
                    }}
                  >
                    <span>Copy link</span>
                  </DropdownItem>
                  <DropdownItem
                    className="py-2"
                    onClick={(e) => {
                      e.preventDefault();
                      props.setShowJobPreview(true);
                      props.fetchJobDescription(
                        props.user_token,
                        props.data.id
                      );
                    }}
                  >
                    View details
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </Row>
        {/* <br /> */}
        {props.data.is_feedback_given === 0 &&
          props.data.status === "Closed" &&
          props.data.is_expired === 1 &&
          props.data.applicants_count > 0 && (
            <Row className="position-relative">
              <Col className="col-12 col-md-12 cursor-pointer">
                <div
                  class={`alert alert-warning d-md-flex align-items-center mb-0 ${styles.warning_alert}`}
                >
                  <div className="text-center text-md-left">
                    <i className="d-inline-block mr-2">
                      <img
                        src={`${process.env.APP_URL}/images/o-warning.svg`}
                        width="18px"
                        style={{ marginTop: "-3px" }}
                      />
                    </i>
                    <strong>Your job reached its end date.</strong>
                    <span className="ml-md-2">Did you hire someone?</span>
                  </div>
                  <div
                    className={`ml-md-auto text-center text-md-left mt-2 mt-md-0 ${styles.actions}`}
                  >
                    <button
                      className={`btn bg-white fw-bold ${styles.yes_button}`}
                      onClick={() => {
                        OpenCloseHandler(props.data.status == "Close");
                      }}
                    >
                      Yes
                    </button>
                    <button
                      className={`btn fw-bold ${styles.no_button}`}
                      onClick={() => {
                        OpenCloseHandler(props.data.status == "Close");
                      }}
                    >
                      No
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          )}
      </div>

      <PreviewJob
        job_title={props.view_job_description?.job_title}
        type_of_employment={props.view_job_description?.type_of_employment}
        company_name={props.view_job_description?.company_name}
        job_description={props.view_job_description?.job_description}
        specific_address={props.view_job_description?.specific_address}
        google_city_town={props.view_job_description?.google_city_town}
        loqate_city_town={props.view_job_description?.loqate_city_town}
        salary_pay={props.view_job_description?.salary_pay}
        salary_per_unit={props.view_job_description?.salary_per_unit}
        license_required={props.view_job_description?.license_required}
        contract_type={props.view_job_description?.contract_type}
        show_job_preview={props.show_job_preview}
        salary_benefits={props.view_job_description?.salary_benefits?.map(
          (salary) => salary.benefit_id
        )}
        venue_type={props.view_job_description?.venue_type}
        shift_schedule={props.view_job_description?.shift_schedule}
        shift_timings={props.view_job_description?.shift_timings}
        salary_type={props.view_job_description?.salary_type}
        salary_range_min={props.view_job_description?.salary_min}
        salary_range_max={props.view_job_description?.salary_max}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  filter_for_job_list: state.vantage.staffingReducer.filterForJobList,
  date_order_for_job_list: state.vantage.staffingReducer.dateOrderForJobList,
  search_keyword_for_job_list:
    state.vantage.staffingReducer.searchKeywordForJobList,
  current_page_for_job_list:
    state.vantage.staffingReducer.currentPageForJobList,
  user_token: state.vantage.userDataReducer.user_token,
  view_job_description: state.vantage.staffingReducer.jobDescriptionData,
  show_job_preview: state.vantage.jobPostReducer.showJobPostPreview,
  jobs_posted_by_user: state.vantage.staffingReducer.jobsPostedByUser,

  shift_schedule: state.vantage.jobPostReducer.shift_schedule,
  shift_timing: state.vantage.jobPostReducer.shift_timing,
  selected_list_for_feedback:
    state.vantage.staffingReducer.selectedListForFeedBack,
  // applicants: state.vantage.staffingReducer.jobApplicants
  user_id: state.vantage.userDataReducer.user_id,
  isAccountOwner: state.vantage.organisationReducer.isAccountOwner,
  organisationAccountOwnerId:
    state.vantage.organisationReducer.organisationAccountOwnerId,

  organisationFilters: state.vantage.organisationReducer.filter,
  organisationMembers: state.vantage.organisationReducer.organisationMembers,
  boostedJobIdForBadge: state.vantage.billingReducer.boostedJobIdForBadge,
});

const mapDispatchToProps = (dispatch) => ({
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
  fetchJobPostedByUser: (
    userToken,
    jobStatus,
    keyword,
    dateOrder,
    pageNumber,
    url,
    userJobClickedStatus
  ) =>
    dispatch(
      fetchJobPostedByUser(
        userToken,
        jobStatus,
        keyword,
        dateOrder,
        pageNumber,
        url,
        userJobClickedStatus
      )
    ),
  setDidUserClickedAJob: (status) => dispatch(setDidUserClickedAJob(status)),
  setLatestJobId: (jobId) => dispatch(setLatestJobId(jobId)),
  setScreenToShowOnStaffing: (screen) =>
    dispatch(setScreenToShowOnStaffing(screen)),
  setFilterForApplicantList: (filter) =>
    dispatch(setFilterForApplicantList(filter)),
  setDateOrderForApplicantList: (dateOrder) =>
    dispatch(setDateOrderForApplicantList(dateOrder)),
  setSearchKeywordForApplicantList: (keyword) =>
    dispatch(setSearchKeywordForApplicantList(keyword)),
  setCurrentPageForApplicantList: (page) =>
    dispatch(setCurrentPageForApplicantList(page)),
  setSWPProfileWindowToBeShown: (status) =>
    dispatch(setSWPProfileWindowToBeShown(status)),
  setDiscardModalForJobPost: (status) =>
    dispatch(setDiscardModalForJobPost(status)),
  setSelectedJobIdForCloseJobDiscard: (jobId) =>
    dispatch(setSelectedJobIdForCloseJobDiscard(jobId)),
  setSelectedJobNameForCloseJobDiscard: (name) =>
    dispatch(setSelectedJobNameForCloseJobDiscard(name)),
  setShowJobPreview: (status) => dispatch(setShowJobPreview(status)),
  fetchJobDescription: (userToken, jobId) =>
    dispatch(fetchJobDescription(userToken, jobId)),
  // fetchApplicantsAgainstJob: (userToken, jobId, jobStatus, keyword, dateOrder) => dispatch(fetchApplicantsAgainstJob(userToken, jobId, jobStatus, keyword, dateOrder))
  // addUserInFeedbackList:(status) => dispatch(addUserInFeedbackList(status)), removed state
  setBoostJobId: (jobId) => dispatch(setBoostJobId(jobId)),
  setBoostConfirmationModal: (status) =>
    dispatch(setBoostConfirmationModal(status)),
  setJobId: (jobId) => dispatch(setJobId(jobId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobCard);
