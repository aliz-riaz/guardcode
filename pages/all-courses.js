import React, { useEffect } from "react";
import Header from "../components/Header";
import Sidenav from "../components/LeftNav";
import Link from "next/link";
import PageTabDashboard from "../components/PageTabs/PageTabDashboard";
import DashboardPastCourseComponent from "../components/Courses/DashboardPastCourseComponent";
import DashboardUpcomingCourseComponent from "../components/Courses/DashboardUpcomingCourseComponent";
import MakeABookingButtonComponent from "../components/Common/MakeABookingButtonComponent";
import { resetBookingReducerAction } from "../redux/actions/bookingAction";
import {
  setAllBookingsSwtichValue,
  setAllBookingsSeletedTeamMembers,
} from "../redux/actions/organisationAction";
import { connect } from "react-redux";
import dynamic from "next/dynamic";
import { protectedRoute } from "../utilites/utility";
import { isMobile } from "react-device-detect";
// import TeamAccessFilters from '../components/Common/TeamAccess/TeamAccessFilters';

const TeamAccessFilters = dynamic(
  () => import("../components/Common/TeamAccess/TeamAccessFilters"),
  {
    ssr: false,
  }
);
const GlobalChat = dynamic(
  () => import("../components/chat/globalChat/GlobalChat"),
  {
    ssr: false,
  }
);

export const getServerSideProps = async function (context) {
  return protectedRoute(context);
};

const MY_BOOKINGS = "My Bookings";
const ALL_BOOKINGS = "All Bookings";

function Dashboard(props) {
  useEffect(() => {
    props.resetBookingReducerActionTemp().then((resp0) => {});

    return () => {
      props.setAllBookingsSwtichValue(MY_BOOKINGS);
      props.setAllBookingsSeletedTeamMembers([]);
    };
  }, []);

  return (
    <>
      <Header isNavBarOpenCookie={props.isNavBarOpenCookie} />
      <div className="main-layout">
        <Sidenav isNavBarOpenCookie={props.isNavBarOpenCookie} />
        <div className="main-content">
          <PageTabDashboard></PageTabDashboard>
          <div className="main-inner-content">
            <div
              className={`row align-items-center justify-content-between m-0`}
            >
              {props.organisationMembers &&
                props.organisationMembers?.length > 0 &&
                props.userMenusAccess.find(
                  (element) =>
                    element.title == "Training" &&
                    element.access_level == "FULL"
                ) && (
                  <TeamAccessFilters
                    leftSideClickHandler={() => {
                      props.setAllBookingsSwtichValue(MY_BOOKINGS);
                      props.setAllBookingsSeletedTeamMembers([]);
                    }}
                    leftText={MY_BOOKINGS}
                    rightSideClickHandler={() =>
                      props.setAllBookingsSwtichValue(ALL_BOOKINGS)
                    }
                    rightText={ALL_BOOKINGS}
                    seletedTeamMembers={
                      props.organisationFilters.allBookings.seletedTeamMembers
                    }
                    setSeletedTeamMembers={
                      props.setAllBookingsSeletedTeamMembers
                    }
                    switchValue={
                      props.organisationFilters.allBookings.switchValue
                    }
                  />
                )}
              <MakeABookingButtonComponent />
            </div>
            <DashboardPastCourseComponent
              switchValue={props.organisationFilters.allBookings.switchValue}
              seletedTeamMembers={
                props.organisationFilters.allBookings.seletedTeamMembers
              }
              leftText={MY_BOOKINGS}
              rightText={ALL_BOOKINGS}
            />
            <DashboardUpcomingCourseComponent
              switchValue={props.organisationFilters.allBookings.switchValue}
              seletedTeamMembers={
                props.organisationFilters.allBookings.seletedTeamMembers
              }
              leftText={MY_BOOKINGS}
              rightText={ALL_BOOKINGS}
            />
          </div>
          {!isMobile && <GlobalChat />}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  is_user_login: state.vantage.userDataReducer.is_user_login,
  user_token: state.vantage.userDataReducer.user_token,
  booking_active_step: state.vantage.bookingReducer.booking_active_step,

  userMenusAccess: state.vantage.organisationReducer.userMenusAccess,
  organisationFilters: state.vantage.organisationReducer.filter,
  organisationMembers: state.vantage.organisationReducer.organisationMembers,
});

const mapDispatchToProps = (dispatch) => ({
  resetBookingReducerAction: resetBookingReducerAction,
  resetBookingReducerActionTemp: () => dispatch(resetBookingReducerAction()),
  setAllBookingsSwtichValue: (value) =>
    dispatch(setAllBookingsSwtichValue(value)),
  setAllBookingsSeletedTeamMembers: (members) =>
    dispatch(setAllBookingsSeletedTeamMembers(members)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
