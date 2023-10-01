import ShiftNoAccess from "./ShiftNoAccess";
import { connect } from "react-redux";
function ShiftAccessCheckWrapper(props) {
  return (
    <>
      {props.shiftRequestedStatus == "Approved" ? (
        <>{props.children}</>
      ) : (
    
        <ShiftNoAccess userAccessStatus={props.shiftRequestedStatus} />
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  shiftRequestedStatus: state.vantage.organisationReducer.shiftRequestedStatus,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShiftAccessCheckWrapper);
