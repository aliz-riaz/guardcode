import { Nav, NavItem, NavLink } from "reactstrap";
import { connect } from "react-redux";
import { setShowToShowInSettings } from "../../redux/actions/accountSettings";

const NavigationBar = (props) => {
  return (
    <div className="page-tabs">
      <Nav tabs>
        <NavItem onClick={() => props.setShowToShowInSettings("general")}>
          <NavLink className={props.screenToShow == "general" ? `active` : ""}>
            <span className="">General</span>
          </NavLink>
        </NavItem>
        {props.isAccountOwner && (
          <NavItem onClick={() => props.setShowToShowInSettings("teamAccess")}>
            <NavLink
              className={props.screenToShow == "teamAccess" ? `active` : ""}
            >
              <span className="">Team Access</span>
            </NavLink>
          </NavItem>
        )}
        <NavItem onClick={() => props.setShowToShowInSettings("billing")}>
          <NavLink className={props.screenToShow == "billing" ? `active` : ""}>
            <span className="">Billing</span>
            {/* <div className="badge btn-green fs-8 inline-block ml-2 px-2 text-dark">
              NEW
            </div> */}
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

const mapStateToProps = (state) => ({
  screenToShow: state.vantage.accountSettingsReducer.screenToShow,
  isAccountOwner: state.vantage.organisationReducer.isAccountOwner,
  isBillingEnabled: state.vantage.billingReducer.isBillingEnabled,
});

const mapDispatchToProps = (dispatch) => ({
  setShowToShowInSettings: (screen) =>
    dispatch(setShowToShowInSettings(screen)),
});
export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
