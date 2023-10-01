import { connect } from "react-redux";
import { useEffect, useState } from "react";

import PostAJobButton from "../../JobPost/PostAJobButton";
// import JobsPostedByUser from './JobsList';
import Header from "./Header";
import CloseJobModalForJobCards from "../CloseJobModalForJobCard/CloseJobModalForJobCards";
import { setShowJobPreview } from "../../../redux/actions/jobPostAction";
import dynamic from "next/dynamic";
import {
  setStaffingBookingsSwtichValue,
  setStaffingBookingsSeletedTeamMembers,
} from "../../../redux/actions/organisationAction";
import ModalContainer from "../../Common/GlobalModals/Boosting/ModalContainer";
import BoostConfirmationModal from "../../Common/GlobalModals/Boosting/BoostConfirmationModal";

const TeamAccessFilters = dynamic(
  () => import("../../Common/TeamAccess/TeamAccessFilters"),
  { ssr: false }
);
const JobsPostedByUser = dynamic(() => import("./JobsList"), { ssr: false });

const MY_JOBS = "My Jobs";
const ALL_JOBS = "All Jobs";

const Jobs = (props) => {
  useEffect(() => {
    props.setShowJobPreview(false);
  }, []);

  return (
    <div className="main-inner-content">
      <div className={`row align-items-center justify-content-between m-0`}>
        {props.organisationMembers &&
          props.organisationMembers?.length > 0 &&
          props.userMenusAccess.find(
            (element) =>
              element.title == "Staffing" && element.access_level == "FULL"
          ) && (
            <TeamAccessFilters
              leftSideClickHandler={() => {
                props.setStaffingBookingsSwtichValue(MY_JOBS);
                props.setStaffingBookingsSeletedTeamMembers([]);
              }}
              leftText={MY_JOBS}
              rightSideClickHandler={() =>
                props.setStaffingBookingsSwtichValue(ALL_JOBS)
              }
              rightText={ALL_JOBS}
              seletedTeamMembers={
                props.organisationFilters.staffing.seletedTeamMembers
              }
              setSeletedTeamMembers={
                props.setStaffingBookingsSeletedTeamMembers
              }
              switchValue={props.organisationFilters.staffing.switchValue}
            />
          )}
        {props.jobs_posted_by_user.length > 0 ||
        props.search_keyword_for_job_list != "" ||
        props.filter_for_job_list != "" ? (
          <>
            <PostAJobButton />
          </>
        ) : null}
      </div>
      {props.jobs_posted_by_user.length > 0 ||
      props.search_keyword_for_job_list != "" ||
      props.filter_for_job_list != "" ? (
        <>
          <Header
            switchValue={props.organisationFilters.staffing.switchValue}
            seletedTeamMembers={
              props.organisationFilters.staffing.seletedTeamMembers
            }
            leftText={MY_JOBS}
            rightText={ALL_JOBS}
          />
        </>
      ) : null}
      <JobsPostedByUser
        switchValue={props.organisationFilters.staffing.switchValue}
        seletedTeamMembers={
          props.organisationFilters.staffing.seletedTeamMembers
        }
        leftText={MY_JOBS}
        rightText={ALL_JOBS}
      />
      <CloseJobModalForJobCards />
      <ModalContainer modalState={props.boostConfirmationModal}>
        <BoostConfirmationModal />
      </ModalContainer>
    </div>
  );
};
const mapStateToProps = (state) => ({
  jobs_posted_by_user: state.vantage.staffingReducer.jobsPostedByUser,
  search_keyword_for_job_list:
    state.vantage.staffingReducer.searchKeywordForJobList,
  filter_for_job_list: state.vantage.staffingReducer.filterForJobList,
  userMenusAccess: state.vantage.organisationReducer.userMenusAccess,
  organisationFilters: state.vantage.organisationReducer.filter,
  organisationMembers: state.vantage.organisationReducer.organisationMembers,
  boostConfirmationModal: state.vantage.billingReducer.boostConfirmationModal,
});

const mapDispatchToProps = (dispatch) => ({
  setShowJobPreview: (status) => dispatch(setShowJobPreview(status)),

  setStaffingBookingsSwtichValue: (value) =>
    dispatch(setStaffingBookingsSwtichValue(value)),
  setStaffingBookingsSeletedTeamMembers: (members) =>
    dispatch(setStaffingBookingsSeletedTeamMembers(members)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
