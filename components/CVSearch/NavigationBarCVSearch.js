import React, { useState } from "react";
import { useRouter } from "next/router";
import { Nav, NavItem, NavLink } from "reactstrap";
import Link from "next/link";
import { connect } from "react-redux";
import { setScreenToShowOnStaffing } from "../../redux/actions/staffingAction";

function NavigationBarCVSearch(props) {
  return (
    <>
      <div className="page-tabs">
        <Nav tabs>
          <NavItem>
            <Link href="">
              <NavLink className="active">
                <span className="d-none d-md-block">CV Search</span>
                <span className="d-block d-md-none">CV Search</span>
              </NavLink>
            </Link>
          </NavItem>
        </Nav>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  screen_to_show_on_staffing:
    state.vantage.staffingReducer.screenToShowOnStaffing,
  is_cv_search_avalible: state.vantage.userDataReducer.is_cv_search_avalible,
});

const mapDispatchToProps = (dispatch) => ({
  setScreenToShowOnStaffing: (screen) =>
    dispatch(setScreenToShowOnStaffing(screen)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBarCVSearch);
