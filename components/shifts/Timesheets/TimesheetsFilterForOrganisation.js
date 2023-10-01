import React from "react";

import TeamAccessFilters from "../../Common/TeamAccess/TeamAccessFilters";
import { connect } from "react-redux";
import {
  setTimesheetsSeletedTeamMembers,
  setTimesheetsSwtichValue,
} from "../../../redux/actions/organisationAction";

const MY_TIMESHEETS = "My Timesheets";
const ALL_TIMESHEETS = "All Timesheets";

function TimesheetsFilters(props) {
  const checkShiftLevelAccess =
    props.organisationMembers &&
    props.organisationMembers?.length > 0 &&
    props.userMenusAccess.find(
      (element) => element.title == "Staffing" && element.access_level == "FULL"
    );

  return (
    <>
      {checkShiftLevelAccess && (
        <div
          className={`row align-items-center justify-content-between mx-0 my-4`}
        >
          <TeamAccessFilters
            leftSideClickHandler={() => {
              props.setTimesheetsSwtichValue(MY_TIMESHEETS);
              props.setTimesheetsSeletedTeamMembers([]);
            }}
            leftText={MY_TIMESHEETS}
            rightSideClickHandler={() => {
              props.setTimesheetsSwtichValue(ALL_TIMESHEETS);
            }}
            rightText={ALL_TIMESHEETS}
            seletedTeamMembers={
              props.organisationFilters.timesheets.seletedTeamMembers
            }
            setSeletedTeamMembers={props.setTimesheetSeletedTeamMembers}
            switchValue={props.organisationFilters.timesheets.switchValue}
          />
        </div>
      )}
    </>
  );
}

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
  setTimesheetsSwtichValue: (value) =>
    dispatch(setTimesheetsSwtichValue(value)),
  setTimesheetsSeletedTeamMembers: (members) =>
    dispatch(setTimesheetsSeletedTeamMembers(members)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimesheetsFilters);
