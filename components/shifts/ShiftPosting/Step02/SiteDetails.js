import React from "react";
import ShiftDetails from "./ShiftDetails";
import { ClassNames } from "@emotion/react";
import { connect } from "react-redux";
import { setShiftSelectSite } from "../../../../redux/actions/shiftActions";

function SiteDetails(props) {
  return (
    <div className="mt-2 mb-4">
      <ShiftDetails
        secondDivHeading="Access instructions:"
        secondDivPera={props.selectedSite.access_instructions}
        thirdDivHeading="Contact person:"
        thirdDivPera={`${props.selectedSite.contact_person}:` }
        contactNumber={props.selectedSite.contact_number}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  selectedSite: state.vantage.shiftReducer.selectedSite,
});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SiteDetails);
