import { Input } from "reactstrap";
import { connect } from "react-redux";
import { useState } from "react";

import {
  fetchJobPostedByUser,
  setCurrentPageForJobList,
  setFilterForJobList,
  setDateOrderForJobList,
  setSearchKeywordForJobList,
} from "../../../redux/actions/staffingAction";

import styles from "./Header.module.scss";

const Header = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const tabs = [
    {
      count: props.job_header_data?.total_jobs_count,
      name: "Total",
      value: "",
    },
    {
      count: props.job_header_data?.open_jobs_count,
      name: "Open",
      value: "1",
    },
    {
      count: props.job_header_data?.closed_jobs_count,
      name: "Closed",
      value: "0",
    },
  ];

  const sortByDate = (e) => {
    e.preventDefault();
    let order = "DESC";
    if (props.date_order_for_job_list == "DESC") {
      order = "ASC";
      props.setDateOrderForJobList(order);
    } else {
      order = "DESC";
      props.setDateOrderForJobList(order);
    }
    if (props.switchValue == props.rightText) {
      props.fetchJobPostedByUser(
        props.user_token,
        props.filter_for_job_list,
        props.search_keyword_for_job_list,
        props.date_order_for_job_list,
        props.current_page_for_job_list,
        "",
        props.did_user_click_a_job,
        props.seletedTeamMembers.length > 0
          ? props.seletedTeamMembers.map((member) => member.id)
          : [
              ...props.organisationMembers.map((member) => member.id),
              props.user_id,
            ],
        "all"
      );
    } else {
      props.fetchJobPostedByUser(
        props.user_token,
        props.filter_for_job_list,
        props.search_keyword_for_job_list,
        props.date_order_for_job_list,
        props.current_page_for_job_list,
        "",
        props.did_user_click_a_job,
        [],
        "self"
      );
    }
  };

  const searchJobsWithKeywords = (e) => {
    e.preventDefault();
    if (props.search_keyword_for_job_list != "") {
      if (props.switchValue == props.rightText) {
        props.fetchJobPostedByUser(
          props.user_token,
          props.filter_for_job_list,
          props.search_keyword_for_job_list,
          props.date_order_for_job_list,
          props.current_page_for_job_list,
          "",
          props.did_user_click_a_job,
          props.seletedTeamMembers.length > 0
            ? props.seletedTeamMembers.map((member) => member.id)
            : [
                ...props.organisationMembers.map((member) => member.id),
                props.user_id,
              ],
          "all"
        );
      } else {
        props.fetchJobPostedByUser(
          props.user_token,
          props.filter_for_job_list,
          props.search_keyword_for_job_list,
          props.date_order_for_job_list,
          props.current_page_for_job_list,
          "",
          props.did_user_click_a_job,
          [],
          "self"
        );
      }
    }
  };

  const filterChangeHandler = (value) => {
    props.setFilterForJobList(value);
    props.setCurrentPageForJobList("1");
    if (props.switchValue == props.rightText) {
      props.fetchJobPostedByUser(
        props.user_token,
        value,
        props.search_keyword_for_job_list,
        props.date_order_for_job_list,
        props.current_page_for_job_list,
        "",
        props.did_user_click_a_job,
        props.seletedTeamMembers.length > 0
          ? props.seletedTeamMembers.map((member) => member.id)
          : [
              ...props.organisationMembers.map((member) => member.id),
              props.user_id,
            ],
        "all"
      );
    } else {
      props.fetchJobPostedByUser(
        props.user_token,
        value,
        props.search_keyword_for_job_list,
        props.date_order_for_job_list,
        props.current_page_for_job_list,
        "",
        props.did_user_click_a_job,
        [],
        "self"
      );
    }
  };

  return (
    <>
      <div className={`bg-white box-shadow rounded ${styles.jobs_filter_card}`}>
        <div className="border border-light border-top-0 border-left-0 border-right-0">
          <h4 className="mb-0 py-3 px-3 px-md-4 ">Your Jobs</h4>
        </div>
        <div
          className={`${styles.jobs_filter_row} row d-flex align-items-center position-relative pt-2 px-3 px-md-4 mt-md-auto mt-2`}
        >
          <div className="col order-2 order-md-1 mt-3 mt-md-0">
            <div className={`${styles.stats_tabs}`}>
              <ul
                className={`${styles.applicants} w-100  cursor-pointer d-inline-flex list-unstyled mb-0 applicants_total`}
              >
                {tabs.map((tab, indx) => {
                  return (
                    <li
                      className={`${
                        tab.value == props.filter_for_job_list && styles.active
                      }`}
                      onClick={() => filterChangeHandler(tab.value)}
                      key={indx}
                    >
                      <span className="fw-bold">{tab.count}</span>
                      <span className="d-block">{tab.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="col order-1 order-md-2 mt-2 mt-md-0">
            <div className="d-flex justify-content-md-end">
              <div
                className={`sort_by_date_app  px-2  border rounded border-secondary cursor-pointer  ${styles.sort_by_date}`}
                onClick={(e) => sortByDate(e)}
              >
                <img
                  src={
                    props.date_order_for_job_list == "ASC"
                      ? process.env.APP_URL + "/images/sort-btn-za.svg"
                      : process.env.APP_URL + "/images/sort-btn-az.svg"
                  }
                />
              </div>
              <div className={`${styles.search_bar} ml-3`}>
                <form className="">
                  <Input
                    className="form-control"
                    placeholder="Search by job title"
                    value={props.search_keyword_for_job_list}
                    onChange={(e) =>
                      props.setSearchKeywordForJobList(e.target.value)
                    }
                    onKeyPress={(e) => {
                      if (e.key == "Enter") {
                        searchJobsWithKeywords(e);
                      }
                    }}
                  />
                  <button onClick={(e) => searchJobsWithKeywords(e)}>
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
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  filter_for_job_list: state.vantage.staffingReducer.filterForJobList,
  date_order_for_job_list: state.vantage.staffingReducer.dateOrderForJobList,
  search_keyword_for_job_list:
    state.vantage.staffingReducer.searchKeywordForJobList,
  did_user_clicked_a_job_list: state.vantage.staffingReducer.didUserClickedAJob,
  user_token: state.vantage.userDataReducer.user_token,
  job_header_data: state.vantage.staffingReducer.jobHeaderData,

  user_id: state.vantage.userDataReducer.user_id,
  organisationMembers: state.vantage.organisationReducer.organisationMembers,
});

const mapDispatchToProps = (dispatch) => ({
  setFilterForJobList: (filter) => dispatch(setFilterForJobList(filter)),
  setDateOrderForJobList: (dateOrder) =>
    dispatch(setDateOrderForJobList(dateOrder)),
  setSearchKeywordForJobList: (searchKeyword) =>
    dispatch(setSearchKeywordForJobList(searchKeyword)),
  fetchJobPostedByUser: (
    userToken,
    jobStatus,
    keyword,
    dateOrder,
    pageNumber,
    url,
    userJobClickedStatus,
    members,
    listType
  ) =>
    dispatch(
      fetchJobPostedByUser(
        userToken,
        jobStatus,
        keyword,
        dateOrder,
        pageNumber,
        url,
        userJobClickedStatus,
        members,
        listType
      )
    ),
  setCurrentPageForJobList: (currentPage) =>
    dispatch(setCurrentPageForJobList(currentPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
