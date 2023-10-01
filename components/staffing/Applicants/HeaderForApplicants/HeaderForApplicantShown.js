import styles from "./HeaderForApplicantShown.module.scss";
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
  fetchUserSWPProfile,
  fetchApplicantsAgainstJob,
  setDateOrderForApplicantList,
  setSearchKeywordForApplicantList,
  setFilterForApplicantList,
  setCurrentPageForApplicantList,
  setDidUserClickedAJob,
  setSelectedJobIdForCloseJobDiscard,
  setSelectedJobNameForCloseJobDiscard,
  setSWPProfileWindowToBeShown,
  setSWPProfileIndex,
  fetchJobDescription,
} from "../../../../redux/actions/staffingAction";
import {
  setDiscardModalForJobPost,
  setShowJobPreview,
} from "../../../../redux/actions/jobPostAction";
import CloseJobModalForJobCards from "../../CloseJobModalForJobCard/CloseJobModalForJobCards";
import StatsInHeader from "./StatsInHeader";
import PreviewJob from "../../../JobPost/PreviewJob/Preview";

const HeaderForApplicantShown = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const backToJob = () => {
    props.setSWPProfileWindowToBeShown(false);
  };

  const filterChangeHandler = async (tabName) => {
    props.setFilterForApplicantList(tabName);
    // props.setCurrentPageForApplicantList('1')
    await props.fetchApplicantsAgainstJob(
      props.user_token,
      props.latest_job_id_for_applicant_list,
      tabName,
      props.search_keyword_for_applicants_list,
      props.date_order_for_applicants_list
    );
  };

  const tabChangeHandler = async (tabName) => {
    await filterChangeHandler(tabName);
    props.setSWPProfileIndex(0);
    //props.setSWPProfileWindowToBeShown()
    await props.fetchUserSWPProfile(
      props.user_token,
      props.latest_job_id_for_applicant_tab,
      props.job_applicants_for_applicants_tab[0].slug
    );
  };

  // const removeShortlistFilter = () => {
  //   tabChangeHandler(`all`)
  // }
  return (
    <>
      <div className={`${styles.header_applicant}`}>
        <div className={`${styles.back_button} flex-shrink-0`}>
          <button onClick={backToJob}>
            <img
              src={process.env.APP_URL + "/images/arrow-left.svg"}
              className="img-fluid"
            />{" "}
            Back
          </button>
        </div>
        <div className={`${styles.card_view}`}>
          <div className={`${styles.content_wrap}`}>
            <h3
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                props.setShowJobPreview(true);
                props.fetchJobDescription(
                  props.user_token,
                  props.latest_job_id_for_applicant_list
                );
              }}
            >
              {props.job_to_be_shown_in_applicants_tab.title}
            </h3>
            <p>
              <img src={`${process.env.APP_URL}/images/map-pin-1.svg`} />
              <span className={`${styles.date_posted}`}>
                {props.job_to_be_shown_in_applicants_tab.city +
                  ", " +
                  props.job_to_be_shown_in_applicants_tab.postal_code}
              </span>
            </p>
          </div>
        </div>
        {props.filter_for_applicants_list == "Shortlisted" ? (
          <div
            className={`
          ${styles.shortlist_count}
          ${props.filter_for_applicants_list == "Shortlisted" && styles.active}
           position-relative`}
          >
            <h4>
              <span className="d-block">
                {props.job_to_be_shown_in_applicants_tab
                  .shortlisted_applicants_count > 0
                  ? props.job_to_be_shown_in_applicants_tab
                      .shortlisted_applicants_count
                  : "0"}
              </span>
              Shortlisted
            </h4>
            <span
              className={`${styles.closeBtn} position-absolute cursor-pointer`}
              onClick={() => tabChangeHandler(`all`)}
            >
              <img
                src={`${process.env.APP_URL}/images/f-remove 1.svg`}
                alt="a"
              />
            </span>
          </div>
        ) : (
          <div
            className={`
          ${styles.shortlist_count} ${
              !props.job_to_be_shown_in_applicants_tab
                .shortlisted_applicants_count > 0 && styles.disabled
            } cursor-pointer position-relative`}
            onClick={() => tabChangeHandler(`Shortlisted`)}
          >
            <h4>
              <span className="d-block">
                {props.job_to_be_shown_in_applicants_tab
                  .shortlisted_applicants_count > 0
                  ? props.job_to_be_shown_in_applicants_tab
                      .shortlisted_applicants_count
                  : "0"}
              </span>
              Shortlisted
            </h4>
          </div>
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
  job_applicants_for_applicants_tab:
    state.vantage.staffingReducer.jobApplicants,
  latest_job_id_for_applicant_tab: state.vantage.staffingReducer.latestJobId,
  view_job_description: state.vantage.staffingReducer.jobDescriptionData,
  show_job_preview: state.vantage.jobPostReducer.showJobPostPreview,
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
  fetchUserSWPProfile: (userToken, jobId, jobSeekerSlug) =>
    dispatch(fetchUserSWPProfile(userToken, jobId, jobSeekerSlug)),
  setSWPProfileIndex: (index) => dispatch(setSWPProfileIndex(index)),
  setShowJobPreview: (status) => dispatch(setShowJobPreview(status)),
  fetchJobDescription: (userToken, jobId) =>
    dispatch(fetchJobDescription(userToken, jobId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderForApplicantShown);
