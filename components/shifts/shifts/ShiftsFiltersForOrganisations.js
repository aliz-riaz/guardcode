import React from "react";

import TeamAccessFilters from "../../Common/TeamAccess/TeamAccessFilters";
import { connect } from "react-redux";
import {
  setShiftsSeletedTeamMembers,
  setShiftsSwtichValue,
} from "../../../redux/actions/organisationAction";
import ShiftPostButton from "./ShiftPostButton";

const MY_SHIFTS = "My Shifts";
const ALL_SHIFTS = "All Shifts";

function ShiftsFiltersForOrganisations(props) {
  const checkShiftLevelAccess =
    props.organisationMembers &&
    props.organisationMembers?.length > 0 &&
    props.userMenusAccess.find(
      (element) => element.title == "Staffing" && element.access_level == "FULL"
    );

  return (
    <>
      {true && (
        <div className={`row align-items-center justify-content-between m-0`}>
          <TeamAccessFilters
            leftSideClickHandler={() => {
              props.setShiftsSwtichValue(MY_SHIFTS);
              props.setShiftsSeletedTeamMembers([]);
            }}
            leftText={MY_SHIFTS}
            rightSideClickHandler={() => {
              props.setShiftsSwtichValue(ALL_SHIFTS);
            }}
            rightText={ALL_SHIFTS}
            seletedTeamMembers={
              props.organisationFilters.shifts.seletedTeamMembers
            }
            setSeletedTeamMembers={props.setShiftsSeletedTeamMembers}
            switchValue={props.organisationFilters.shifts.switchValue}
          />
          <ShiftPostButton text="CREATE SHIFT POST" />
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
  setShiftsSwtichValue: (value) => dispatch(setShiftsSwtichValue(value)),
  setShiftsSeletedTeamMembers: (members) =>
    dispatch(setShiftsSeletedTeamMembers(members)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShiftsFiltersForOrganisations);
