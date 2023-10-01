import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import _ from "lodash";
import { Spinner } from "react-bootstrap";
import Header from "../../components/Header/index";
import Sidenav from "../../components/LeftNav";
import { protectedRoute } from "../../utilites/utility";
import { fetchJobTitleSuggestions } from "../../redux/actions/jobPostAction";
import AccountNotApprovedAlert from "../../components/Common/AccountNotApprovedAlert";
import {
  setLatestJobId,
  setDidUserClickedAJob,
  setScreenToShowOnStaffing,
  setFilterForApplicantList,
  setDateOrderForApplicantList,
  setSearchKeywordForApplicantList,
  setCurrentPageForApplicantList,
  fetchUserSWPProfile,
  setSWPProfileWindowToBeShown,
  updateApplicationStatusOfJob,
  fetchJobPostedByUser,
  fetchApplicantsAgainstJob,
  setSWPProfileIndex,
} from "../../redux/actions/staffingAction";
import {
  setStaffingBookingsSwtichValue,
  setStaffingBookingsSeletedTeamMembers,
} from "../../redux/actions/organisationAction";

const Jobs = dynamic(() => import("../../components/staffing/Jobs/Jobs"), {
  ssr: false,
});
const Applicants = dynamic(
  () => import("../../components/staffing/Applicants/Applicants"),
  { ssr: false }
);
const NavigationBar = dynamic(
  () => import("../../components/JobPost/NavigationBar"),
  { ssr: false }
);
const CVSearch = dynamic(() => import("../../components/CVSearch/CVSearch"), {
  ssr: false,
});
const GlobalChat = dynamic(
  () => import("../../components/chat/globalChat/GlobalChat"),
  {
    ssr: false,
  }
);

import styles from "./index.module.scss";
import CVSearchScreen from "../../components/CVSearch/CVSearchScreen";
import { isMobile } from "react-device-detect";
import EditJobs from "../../components/staffing/Jobs/EditJob/EditJob";
import JobRepost from "../../components/staffing/Jobs/JobRepost/JobRepost";
// import GlobalChat from '../../components/chat/globalChat/GlobalChat'

export const getServerSideProps = async function (context) {
  return protectedRoute(context);
};

function Staffing(props) {
  const router = useRouter();

  const [didUserRequestJobTab, setDidUserRequestJobTab] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      router.query.jobid &&
      router.query.plot &&
      router.query.appid &&
      props.user_token
    ) {
      if (props.job_applicants_for_applicants_tab.length > 0) {
        const index = props.job_applicants_for_applicants_tab.findIndex(
          (obj) => obj.id == router.query.appid
        );
        props.setSWPProfileIndex(index);
      }
    }
  }, [props.job_applicants_for_applicants_tab]);

  useEffect(() => {
    if (process.browser && !_.isEmpty(router.query) && !didUserRequestJobTab) {
      showUserSWPProfileForMagicLinkVisitors();
    }
  }, []);

  useEffect(() => {
    if (props.screen_to_show_on_staffing != "CVSearch") {
      props.fetchJobTitleSuggestions(props.user_token);
    }

    return () => {
      props.setStaffingBookingsSwtichValue("My Jobs");
      props.setStaffingBookingsSeletedTeamMembers([]);
    };
  }, []);

  // commenting magic link work for team access
  const showUserSWPProfileForMagicLinkVisitors = async (e) => {
    if (
      router.query.jobid &&
      router.query.plot &&
      router.query.appid &&
      props.user_token
    ) {
      setLoading(true);
      props.setLatestJobId(router.query.jobid);
      props.setScreenToShowOnStaffing("applicants");
      props.setDidUserClickedAJob(true);
      props.setFilterForApplicantList("all");
      props.setDateOrderForApplicantList("DESC");
      props.setSearchKeywordForApplicantList("");
      // await props.fetchJobPostedByUser(props.user_token, props.filter_for_job_list, props.search_keyword_for_job_list, props.date_order_for_job_list, props.current_page_for_job_list, '', props.did_user_click_a_job)
      await props.fetchApplicantsAgainstJob(
        props.user_token,
        router.query.jobid,
        "all",
        "",
        "DESC"
      );
      await props.fetchUserSWPProfile(
        props.user_token,
        router.query.jobid,
        router.query.plot
      );
      await props.updateApplicationStatusOfJob(
        props.user_token,
        router.query.jobid,
        router.query.appid,
        "Reviewed"
      );
      props.setSWPProfileWindowToBeShown(true);
      setLoading(false);
    }
  };

  // if user request job tab handler
  useEffect(() => {
    if (didUserRequestJobTab) {
      props.setScreenToShowOnStaffing("jobs");
    }
  }, [didUserRequestJobTab]);

  // if(loading) {
  //   return <h1>Loading...</h1>
  // }

  const renderScreenForStaffing = (screenToBeShown) => {
    switch (screenToBeShown) {
      case "jobs":
        return <Jobs />;
      case "applicants":
        return <Applicants setDidUserRequestJobTab={setDidUserRequestJobTab} />;
      case "CVSearch":
        return <CVSearchScreen />;
      case "editJob":
        return <EditJobs />;
      case "jobRepost":
        return <JobRepost />;
      default:
        props.setScreenToShowOnStaffing("jobs");
        return <Jobs />;
    }
  };

  return (
    <>
      <Header isNavBarOpenCookie={props.isNavBarOpenCookie} />
      <div className="main-layout">
        <Sidenav isNavBarOpenCookie={props.isNavBarOpenCookie} />
        <div className="main-content">
          {props.screen_to_show_on_staffing == "editJob" ||
          props.screen_to_show_on_staffing == "jobRepost" ? (
            ""
          ) : (
            <NavigationBar setDidUserRequestJobTab={setDidUserRequestJobTab} />
          )}
          <AccountNotApprovedAlert />
          {loading ? (
            <div
              className={`${styles.magic_link_loading} text-center d-flex justify-content-center align-items-center`}
            >
              <Spinner animation="border" size="lg" className="ml-2" />
            </div>
          ) : (
            renderScreenForStaffing(props.screen_to_show_on_staffing)
          )}
          {!isMobile && <GlobalChat />}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  job_applicants_for_applicants_tab:
    state.vantage.staffingReducer.jobApplicants,
  screen_to_show_on_staffing:
    state.vantage.staffingReducer.screenToShowOnStaffing,
  user_token: state.vantage.userDataReducer.user_token,
  filter_for_job_list: state.vantage.staffingReducer.filterForJobList,
  date_order_for_job_list: state.vantage.staffingReducer.dateOrderForJobList,
  search_keyword_for_job_list:
    state.vantage.staffingReducer.searchKeywordForJobList,
  current_page_for_job_list:
    state.vantage.staffingReducer.currentPageForJobList,
  did_user_click_a_job: state.vantage.staffingReducer.didUserClickedAJob,
  is_cv_search_avalible: state.vantage.userDataReducer.is_cv_search_avalible,
});

const mapDispatchToProps = (dispatch) => ({
  setLatestJobId: (jobId) => dispatch(setLatestJobId(jobId)),
  setDidUserClickedAJob: (status) => dispatch(setDidUserClickedAJob(status)),
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

  setSWPProfileIndex: (index) => dispatch(setSWPProfileIndex(index)),
  fetchJobTitleSuggestions: (userToken) =>
    dispatch(fetchJobTitleSuggestions(userToken)),
  fetchUserSWPProfile: (userToken, jobId, slug) =>
    dispatch(fetchUserSWPProfile(userToken, jobId, slug)),
  updateApplicationStatusOfJob: (
    userToken,
    jobId,
    applicantId,
    status,
    fetchApplicantData
  ) =>
    dispatch(
      updateApplicationStatusOfJob(
        userToken,
        jobId,
        applicantId,
        status,
        fetchApplicantData
      )
    ),
  setSWPProfileWindowToBeShown: (status) =>
    dispatch(setSWPProfileWindowToBeShown(status)),
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

  setStaffingBookingsSwtichValue: (value) =>
    dispatch(setStaffingBookingsSwtichValue(value)),
  setStaffingBookingsSeletedTeamMembers: (members) =>
    dispatch(setStaffingBookingsSeletedTeamMembers(members)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Staffing);
