import React from "react";
import { connect } from "react-redux";

import TimesheetFilters from "./TimesheetsFilterForOrganisation";
import TimesheetTable from "./TimesheetsTable";

function Timesheets(props) {
  return (
    <div className="main-inner-content">
      <TimesheetFilters />
      <h1>Timesheet {props.organisationFilters.timesheets?.switchValue}</h1>
      <TimesheetTable />
    </div>
  );
}

const mapStateToProps = (state) => ({
  organisationFilters: state.vantage.organisationReducer.filter,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Timesheets);
