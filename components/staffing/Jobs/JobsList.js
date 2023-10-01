import { useEffect, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import {
  fetchJobPostedByUser,
  fetchJobCloseQuestions,
  setSearchKeywordForJobList,
} from "../../../redux/actions/staffingAction";
import IsRequestLoderComponent from "../../Common/IsRequestLoderComponent";
import JobCard from "./JobCard";
import PaginationForStaffing from "../PaginationForStaffing";
import { setCurrentPageForJobList } from "../../../redux/actions/staffingAction";
import PostAJobButton from "../../JobPost/PostAJobButton";
import styles from "./JobsList.module.scss";
import { fetchJobs } from "../../../redux/actions/jobPostAction";
import JobCardShimmer from "./JobCardShimmer";

function JobsPostedByUser(props) {
  const [prevProps, setPrevProps] = useState(props);
  const [isLoading, setIsLoading] = useState(false);

  const teamMembers =
    props.switchValue == props.rightText
      ? props.seletedTeamMembers.length > 0
        ? props.seletedTeamMembers.map((member) => member.id)
        : [
            ...props.organisationMembers.map((member) => member.id),
            props.user_id,
          ]
      : [];
  const switchValue = props.switchValue == props.rightText ? "all" : "self";

  useEffect(() => {
    const isSearchValueChanged =
      prevProps.search_keyword_for_job_list !==
      props.search_keyword_for_job_list;

    const isSwitchValueChanged = prevProps.switchValue !== props.switchValue;
    const isSelectedTeamMemberChanged =
      prevProps.seletedTeamMembers !== props.seletedTeamMembers;
    const isCurrentPageChanged =
      prevProps.current_page_for_job_list !== props.current_page_for_job_list;

    if (
      (props.search_keyword_for_job_list == "" &&
        props.user_token &&
        isSearchValueChanged) ||
      isSwitchValueChanged ||
      isSelectedTeamMemberChanged ||
      isCurrentPageChanged
    ) {
      props.fetchJobPostedByUser(
        props.user_token,
        props.filter_for_job_list,
        props.search_keyword_for_job_list,
        props.date_order_for_job_list,
        isCurrentPageChanged ? props.current_page_for_job_list : 1,
        "",
        props.did_user_click_a_job,
        teamMembers,
        switchValue
      );
    }

    // if (isCurrentPageChanged) {
    //   // props.setSearchKeywordForJobList("");
    //   props.fetchJobPostedByUser(
    //     props.user_token,
    //     props.filter_for_job_list,
    //     props.search_keyword_for_job_list,
    //     props.date_order_for_job_list,
    //     props.current_page_for_job_list,
    //     "",
    //     props.did_user_click_a_job,
    //     teamMembers,
    //     switchValue
    //   );
    // }
    setPrevProps(props);
  }, [
    props.search_keyword_for_job_list,
    props.switchValue,
    props.seletedTeamMembers,
    props.current_page_for_job_list,
  ]);

  // useEffect(() => {
  //   if (props.search_keyword_for_job_list == "" && props.user_token) {
  //     if (props.switchValue == "All") {
  //       props.fetchJobPostedByUser(
  //         props.user_token,
  //         props.filter_for_job_list,
  //         props.search_keyword_for_job_list,
  //         props.date_order_for_job_list,
  //         props.current_page_for_job_list,
  //         "",
  //         props.did_user_click_a_job,
  //         props.seletedTeamMembers.length > 0
  //           ? props.seletedTeamMembers.map((member) => member.id)
  //           : [
  //               ...props.organisationMembers.map((member) => member.id),
  //               props.user_id,
  //             ],
  //         "all"
  //       );
  //     } else {
  //       props.fetchJobPostedByUser(
  //         props.user_token,
  //         props.filter_for_job_list,
  //         props.search_keyword_for_job_list,
  //         props.date_order_for_job_list,
  //         props.current_page_for_job_list,
  //         "",
  //         props.did_user_click_a_job,
  //         [],
  //         "self"
  //       );
  //     }
  //   }
  // }, [props.search_keyword_for_job_list]);

  // useEffect(() => {
  //   if (props.switchValue == "All") {
  //     props.fetchJobPostedByUser(
  //       props.user_token,
  //       props.filter_for_job_list,
  //       props.search_keyword_for_job_list,
  //       props.date_order_for_job_list,
  //       1,
  //       "",
  //       props.did_user_click_a_job,
  //       props.seletedTeamMembers.length > 0
  //         ? props.seletedTeamMembers.map((member) => member.id)
  //         : [
  //             ...props.organisationMembers.map((member) => member.id),
  //             props.user_id,
  //           ],
  //       "all"
  //     );
  //   } else {
  //     props.fetchJobPostedByUser(
  //       props.user_token,
  //       props.filter_for_job_list,
  //       props.search_keyword_for_job_list,
  //       props.date_order_for_job_list,
  //       1,
  //       "",
  //       props.did_user_click_a_job,
  //       [],
  //       "self"
  //     );
  //   }
  // }, [props.switchValue, props.seletedTeamMembers]);

  // useEffect(() => {
  //   props.setSearchKeywordForJobList("");

  //   if (props.switchValue == "All") {
  //     props.fetchJobPostedByUser(
  //       props.user_token,
  //       props.filter_for_job_list,
  //       props.search_keyword_for_job_list,
  //       props.date_order_for_job_list,
  //       props.current_page_for_job_list,
  //       "",
  //       props.did_user_click_a_job,
  //       props.seletedTeamMembers.length > 0
  //         ? props.seletedTeamMembers.map((member) => member.id)
  //         : [
  //             ...props.organisationMembers.map((member) => member.id),
  //             props.user_id,
  //           ],
  //       "all"
  //     );
  //   } else {
  //     props.fetchJobPostedByUser(
  //       props.user_token,
  //       props.filter_for_job_list,
  //       props.search_keyword_for_job_list,
  //       props.date_order_for_job_list,
  //       props.current_page_for_job_list,
  //       "",
  //       props.did_user_click_a_job,
  //       [],
  //       "self"
  //     );
  //   }
  // }, [props.current_page_for_job_list]);

  const getUserJobsList = async () => {
    await props.fetchJobPostedByUser(
      props.user_token,
      props.filter_for_job_list,
      props.search_keyword_for_job_list,
      props.date_order_for_job_list,
      1,
      "",
      props.did_user_click_a_job,
      teamMembers,
      switchValue
    );
  };

  useEffect(async () => {
    if (props.user_token) {
      setIsLoading(true);
      getUserJobsList();
      setIsLoading(false);
      props.fetchJobCloseQuestions(props.user_token);
    }
  }, []);

  useEffect(async () => {
    // called from success modal billing
    if (props.fetchJobsStatus == true) {
      props.fetchJobs(false);
      getUserJobsList();
    }
  }, [props.fetchJobsStatus]);

  return (
    <>
      {props.is_request_loader || isLoading ? (
        <>
          {[1, 2, 3].map((item) => {
            return <JobCardShimmer />;
          })}
        </>
      ) : (
        <>
          {props.jobs_posted_by_user.length > 0 ? (
            props.jobs_posted_by_user.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  data={job}
                  switchValue={props.switchValue}
                  leftText={props.leftText}
                  rightText={props.rightText}
                  getUserJobsList={getUserJobsList}
                />
              );
            })
          ) : props.filter_for_job_list != "" ||
            props.search_keyword_for_job_list != "" ? (
            <>
              <div className={styles.noJobFound}>
                <div>
                  <img
                    src={process.env.APP_URL + "/images/briefcase-empty.svg"}
                  />
                </div>
                <h4>No job(s) found</h4>
              </div>
            </>
          ) : (
            <>
              <div className={styles.noJobFound}>
                <div>
                  <img
                    src={process.env.APP_URL + "/images/briefcase-empty.svg"}
                  />
                </div>
                <h4>No jobs posted yet.</h4>
                <p>
                  Posted jobs reside here. Post a job from
                  <br className="d-none d-md-block" /> below to start receiving
                  applicants.
                </p>
                <div className="d-inline-block mb-0">
                  <PostAJobButton />
                </div>
              </div>
            </>
          )}
          {props.total_pages_for_job_list <= 1 ? null : (
            <PaginationForStaffing
              currentpage={props.current_page_for_job_list}
              setCurrentpage={props.setCurrentPageForJobList}
              contentDataLinks={props.pagination_for_job_list}
            />
          )}
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  jobs_posted_by_user: state.vantage.staffingReducer.jobsPostedByUser,
  current_page_for_job_list:
    state.vantage.staffingReducer.currentPageForJobList,
  pagination_for_job_list: state.vantage.staffingReducer.paginationForJobList,
  total_pages_for_job_list: state.vantage.staffingReducer.totalPagesForJobList,
  user_token: state.vantage.userDataReducer.user_token,
  filter_for_job_list: state.vantage.staffingReducer.filterForJobList,
  date_order_for_job_list: state.vantage.staffingReducer.dateOrderForJobList,
  search_keyword_for_job_list:
    state.vantage.staffingReducer.searchKeywordForJobList,
  did_user_click_a_job: state.vantage.staffingReducer.didUserClickedAJob,
  is_request_loader: state.vantage.commonReducer.is_request_loader,
  user_id: state.vantage.userDataReducer.user_id,
  organisationMembers: state.vantage.organisationReducer.organisationMembers,
  fetchJobsStatus: state.vantage.jobPostReducer.fetchJobs,
});

const mapDispatchToProps = (dispatch) => ({
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
  fetchJobCloseQuestions: (userToken) =>
    dispatch(fetchJobCloseQuestions(userToken)),
  setSearchKeywordForJobList: (searchKeyword) =>
    dispatch(setSearchKeywordForJobList(searchKeyword)),
  fetchJobs: (status) => dispatch(fetchJobs(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobsPostedByUser);
