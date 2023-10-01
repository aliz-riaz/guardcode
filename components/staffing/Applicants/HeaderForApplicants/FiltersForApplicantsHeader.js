import { connect } from "react-redux";
import { Input } from "reactstrap";
import {
  fetchApplicantsAgainstJob,
  setDateOrderForApplicantList,
  setSearchKeywordForApplicantList,
} from "../../../../redux/actions/staffingAction";
import { setDiscardModalForJobPost } from "../../../../redux/actions/jobPostAction";
import styles from "./FiltersForApplicantsHeader.module.scss";

const FiltersForApplicantsHeader = (props) => {
  const sortByDate = (e) => {
    e.preventDefault();
    let order = "DESC";
    if (props.date_order_for_applicants_list == "DESC") {
      order = "ASC";
      props.setDateOrderForApplicantList(order);
    } else {
      order = "DESC";
      props.setDateOrderForApplicantList(order);
    }
    props.fetchApplicantsAgainstJob(
      props.user_token,
      props.latest_job_id_for_applicant_list,
      props.filter_for_applicants_list,
      props.search_keyword_for_applicants_list,
      order,
      1,
      ""
    );
  };

  const searchApplicationsWithKeywords = (e) => {
    e.preventDefault();
    if (props.search_keyword_for_applicants_list != "") {
      props.fetchApplicantsAgainstJob(
        props.user_token,
        props.latest_job_id_for_applicant_list,
        props.filter_for_applicants_list,
        props.search_keyword_for_applicants_list,
        props.date_order_for_applicants_list,
        1,
        ""
      );
    }
  };

  return (
    <>
      <div
        className={`${styles.jobs_filter} ${styles.jobs_filter_row}  d-flex align-items-center justify-content-md-end position-relative`}
      >
        <div
          className={`${styles.sort_by_date}  border rounded border-secondary cursor-pointer`}
          onClick={(e) => sortByDate(e)}
        >
          <img
            src={
              props.date_order_for_applicants_list == "ASC"
                ? process.env.APP_URL + "/images/sort-btn-za.svg"
                : process.env.APP_URL + "/images/sort-btn-az.svg"
            }
          />
        </div>
        <div
          className={`${styles.jobs_filter_right} d-flex align-items-center jobs_filter_right ml-2 ml-md-3`}
        >
          <div className={`${styles.search_bar} search_bar`}>
            <form className="border-secondary w-100">
              <Input
                className="form-control"
                placeholder="Search by applicant's name"
                value={props.search_keyword_for_applicants_list}
                onChange={(e) =>
                  props.setSearchKeywordForApplicantList(e.target.value)
                }
                onKeyPress={(e) => {
                  if (e.key == "Enter") {
                    searchApplicationsWithKeywords(e);
                  }
                }}
              />
              <button onClick={(e) => searchApplicationsWithKeywords(e)}>
                <img
                  src={process.env.APP_URL + "/images/search-btn.svg"}
                  width="25px"
                  height="25px"
                  className=""
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  filter_for_applicants_list:
    state.vantage.staffingReducer.filterForApplicantsList,
  date_order_for_applicants_list:
    state.vantage.staffingReducer.dateOrderForApplicantsList,
  search_keyword_for_applicants_list:
    state.vantage.staffingReducer.searchKeywordForApplicantsList,
  latest_job_id_for_applicant_list: state.vantage.staffingReducer.latestJobId,
  user_token: state.vantage.userDataReducer.user_token,
});

const mapDispatchToProps = (dispatch) => ({
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
  setDateOrderForApplicantList: (dateOrder) =>
    dispatch(setDateOrderForApplicantList(dateOrder)),
  setSearchKeywordForApplicantList: (keyword) =>
    dispatch(setSearchKeywordForApplicantList(keyword)),
  setDiscardModalForJobPost: (status) =>
    dispatch(setDiscardModalForJobPost(status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FiltersForApplicantsHeader);
