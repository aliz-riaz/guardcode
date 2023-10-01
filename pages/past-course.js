import React, { useEffect } from "react";
import Header from "../components/Header";
import Sidenav from "../components/LeftNav";
import PageTabDashboard from "../components/PageTabs/PageTabDashboard";
import PastCourseComponent from "../components/Courses/PastCourseComponent";
import MakeABookingButtonComponent from "../components/Common/MakeABookingButtonComponent";
import dynamic from "next/dynamic";
import { isMobile } from "react-device-detect";
import { connect } from "react-redux";
import {
  setPastBookingsSwtichValue,
  setPastBookingsSeletedTeamMembers,
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

export const getServerSideProps = async function (context) {
  return protectedRoute(context);
};

const MY_BOOKINGS = "My Bookings";
const ALL_BOOKINGS = "All Bookings";

function PastCourse(props) {
  useEffect(() => {
    return () => {
      props.setPastBookingsSwtichValue(MY_BOOKINGS);
      props.setPastBookingsSeletedTeamMembers([]);
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
                      props.setPastBookingsSwtichValue(MY_BOOKINGS);
                      props.setPastBookingsSeletedTeamMembers([]);
                    }}
                    leftText={MY_BOOKINGS}
                    rightSideClickHandler={() =>
                      props.setPastBookingsSwtichValue(ALL_BOOKINGS)
                    }
                    rightText={ALL_BOOKINGS}
                    seletedTeamMembers={
                      props.organisationFilters.pastBookings.seletedTeamMembers
                    }
                    setSeletedTeamMembers={
                      props.setPastBookingsSeletedTeamMembers
                    }
                    switchValue={
                      props.organisationFilters.pastBookings.switchValue
                    }
                  />
                )}
              <MakeABookingButtonComponent />
            </div>
            <PastCourseComponent
              switchValue={props.organisationFilters.pastBookings.switchValue}
              seletedTeamMembers={
                props.organisationFilters.pastBookings.seletedTeamMembers
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
  setPastBookingsSwtichValue: (value) =>
    dispatch(setPastBookingsSwtichValue(value)),
  setPastBookingsSeletedTeamMembers: (members) =>
    dispatch(setPastBookingsSeletedTeamMembers(members)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PastCourse);
