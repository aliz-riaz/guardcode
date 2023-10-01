import { connect } from "react-redux";
import { Alert } from "reactstrap";

const AccountNotApprovedAlert = (props) => {
  return (
    <>
      {/* {props.screen_to_show_on_staffing == "CVSearch" ? null : ( */}
      <>
        {props.user_token != "" && props.isOrganisationApproved == 0 ? (
          <Alert color="danger w-100 text-center mx-auto account_pending_alert">
            <img
              src={process.env.APP_URL + "/images/warning-icn.svg"}
              className="mr-2 align-top"
            />
            <strong>Verification in progress.</strong> Your organisation
            verification is in progress, we’ll notify you as soon as your
            organisation is verified!
          </Alert>
        ) : null}
      </>
      {/* )} */}
    </>
  );
};

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  isOrganisationApproved:
    state.vantage.organisationReducer.isOrganisationApproved,
  screen_to_show_on_staffing:
    state.vantage.staffingReducer.screenToShowOnStaffing,
});

const mapDispatchToProps = (dispatch) => ({});

// export default Staffing;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountNotApprovedAlert);
