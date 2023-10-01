import React, { useState } from "react";
import { useRouter } from "next/router";
import { Nav, NavItem, NavLink } from "reactstrap";
import Link from "next/link";
import { connect } from "react-redux";
import {
  setScreenToShowOnStaffing,
  setCurrentPageForJobList,
} from "../../redux/actions/staffingAction";

// reactstrap components
import { Form, FormGroup, Label, Input } from "reactstrap";
// import { route } from 'next/dist/next-server/server/router';
function NavigationBar(props) {
  const router = useRouter();

  return (
    <>
      <div className="page-tabs">
        <Nav tabs>
          <NavItem
            onClick={(e) => {
              e.preventDefault();
              props.setDidUserRequestJobTab(true);
              props.setCurrentPageForJobList(1);
              props.setScreenToShowOnStaffing("jobs");
            }}
          >
            <Link href="">
              <NavLink
                className={
                  props.screen_to_show_on_staffing == "jobs" ? "active" : ""
                }
              >
                <span className="d-none d-md-block">Jobs</span>
                <span className="d-block d-md-none">Jobs</span>
              </NavLink>
            </Link>
          </NavItem>
          <NavItem
            onClick={(e) => props.setScreenToShowOnStaffing("applicants")}
          >
            <Link href="">
              <NavLink
                className={
                  props.screen_to_show_on_staffing == "applicants"
                    ? "active"
                    : ""
                }
              >
                <span className="d-none d-md-block">Applicants</span>
                <span className="d-block d-md-none">Applicants</span>
              </NavLink>
            </Link>
          </NavItem>
          <NavItem onClick={(e) => props.setScreenToShowOnStaffing("CVSearch")}>
            <Link href="">
              <NavLink
                className={
                  props.screen_to_show_on_staffing == "CVSearch" ? "active" : ""
                }
              >
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

// export default NavigationBar;

const mapStateToProps = (state) => ({
  screen_to_show_on_staffing:
    state.vantage.staffingReducer.screenToShowOnStaffing,
  is_cv_search_avalible: state.vantage.userDataReducer.is_cv_search_avalible,
  // filter_for_job_list: state.vantage.staffingReducer.filterForJobList,
  // date_order_for_job_list: state.vantage.staffingReducer.dateOrderForJobList,
  // search_keyword_for_job_list: state.vantage.staffingReducer.searchKeywordForJobList,
  // current_page_for_job_list: state.vantage.staffingReducer.currentPageForJobList,
  // user_token: state.vantage.userDataReducer.user_token,
});

const mapDispatchToProps = (dispatch) => ({
  setScreenToShowOnStaffing: (screen) =>
    dispatch(setScreenToShowOnStaffing(screen)),
  setCurrentPageForJobList: (currentPage) =>
    dispatch(setCurrentPageForJobList(currentPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
