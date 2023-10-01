import React from "react";
import ShiftDetails from "./ShiftDetails";
import { connect } from "react-redux";
import { setShiftSelectRole } from "../../../../redux/actions/shiftActions";

function RoleDetails(props) {
  return (
    <div className="mt-2 mb-4">
      <ShiftDetails
        // mainHeading="Role details"
        // firstDivHeading="Job title:"
        // firstDivPera={props.selectedRole.title}
        secondDivHeading="Job description:"
        secondDivPera={props.selectedRole.job_description}
        thirdDivHeading="Uniform:"
        thirdDivPera={props.selectedRole.uniform}
        fourthDivHeading="Licence:"
        license={props.license}
        //  change="Change role"
      />
    </div>
  );
}
const mapStateToProps = (state) => ({
  selectedSite: state.vantage.shiftReducer.selectedSite,
  selectedRole: state.vantage.shiftReducer.selectedRole,
  selectedVenue: state.vantage.shiftReducer.selectedVenue,
});
const mapDispatchToProps = (dispatch) => ({
  setShiftSelectRole: (id, title) => dispatch(setShiftSelectRole(id, title)),
});
export default connect(mapStateToProps, mapDispatchToProps)(RoleDetails);
