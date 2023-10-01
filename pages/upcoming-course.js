import React, { useEffect } from "react";
import Header from "../components/Header";
import Sidenav from "../components/LeftNav";
import PageTabDashboard from "../components/PageTabs/PageTabDashboard";
import UpcomingCourseComponent from "../components/Courses/UpcomingCourseComponent";
import MakeABookingButtonComponent from "../components/Common/MakeABookingButtonComponent";
import dynamic from "next/dynamic";
import { connect } from "react-redux";
import {
  setUpcomingBookingsSwtichValue,
  setUpcomingBookingsSeletedTeamMembers,
} from "../redux/actions/organisationAction";

const TeamAccessFilters = dynamic(
  () => import("../components/Common/TeamAccess/TeamAccessFilters"),
  { ssr: false }
);
const GlobalChat = dynamic(
  () => import("../components/chat/globalChat/GlobalChat"),
  { ssr: false }
);
import { protectedRoute } from "../utilites/utility";
import { isMobile } from "react-device-detect";

export const getServerSideProps = async function (context) {
  return protectedRoute(context);
};

const MY_BOOKINGS = "My Bookings";
const ALL_BOOKINGS = "All Bookings";

function UpcomingCourse(props) {
  useEffect(() => {
    return () => {
      props.setUpcomingBookingsSwtichValue(MY_BOOKINGS);
      props.setUpcomingBookingsSeletedTeamMembers([]);
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
                      props.setUpcomingBookingsSwtichValue(MY_BOOKINGS);
                      props.setUpcomingBookingsSeletedTeamMembers([]);
                    }}
                    leftText={MY_BOOKINGS}
                    rightSideClickHandler={() =>
                      props.setUpcomingBookingsSwtichValue(ALL_BOOKINGS)
                    }
                    rightText={ALL_BOOKINGS}
                    seletedTeamMembers={
                      props.organisationFilters.upcomingBookings
                        .seletedTeamMembers
                    }
                    setSeletedTeamMembers={
                      props.setUpcomingBookingsSeletedTeamMembers
                    }
                    switchValue={
                      props.organisationFilters.upcomingBookings.switchValue
                    }
                  />
                )}
              <MakeABookingButtonComponent />
            </div>
            <UpcomingCourseComponent
              switchValue={
                props.organisationFilters.upcomingBookings.switchValue
              }
              seletedTeamMembers={
                props.organisationFilters.upcomingBookings.seletedTeamMembers
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
  userMenusAccess: state.vantage.organisationReducer.userMenusAccess,
  organisationFilters: state.vantage.organisationReducer.filter,
  organisationMembers: state.vantage.organisationReducer.organisationMembers,
});

const mapDispatchToProps = (dispatch) => ({
  setUpcomingBookingsSwtichValue: (value) =>
    dispatch(setUpcomingBookingsSwtichValue(value)),
  setUpcomingBookingsSeletedTeamMembers: (members) =>
    dispatch(setUpcomingBookingsSeletedTeamMembers(members)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingCourse);
