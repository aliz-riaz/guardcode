import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Header from "../../components/Header/";
import Sidenav from "../../components/LeftNav";
import AddAttendee from "../../components/booking/AddAttendee";
import ProgressBar from "../../components/booking/ProgressBar";
import SlideControl from "../../components/booking/SlideControl";
// import {UpdateUserInfoForBookingFlow} from '../../redux/actions/userAction'
import {
  updateBookingActiveStepAction,
  updateAttendeesShowErrorAction,
} from "../../redux/actions/bookingAction";
var _ = require("lodash");

import { protectedRoute } from "../../utilites/utility";

export const getServerSideProps = async function (context) {
  return protectedRoute(context);
};

function Step3(props) {
  const [expandMenu, setExpandMenu] = useState();
  const getClass = (expand) => {
    setExpandMenu(expand);
  };
  useEffect(() => {
    // props.UpdateUserInfoForBookingFlow(props.user_token)
    props.updateBookingActiveStepActionTemp(3).then((resp0) => {});
    if (_.isEmpty(props.attendees)) {
      props.updateAttendeesShowErrorAction(false).then((resp0) => {});
    }
  }, []);

  return (
    <>
      <Header isNavBarOpenCookie={props.isNavBarOpenCookie} />
      <div className="main-layout">
        <Sidenav isNavBarOpenCookie={props.isNavBarOpenCookie} />
        <div className="main-content">
          <ProgressBar />
          <div className="main-inner-content booking-content">
            <AddAttendee />
          </div>
          <SlideControl backUrl="/booking/step-2" nextUrl="/booking/step-4" />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  attendees: state.vantage.bookingReducer.attendees,
  user_token: state.vantage.userDataReducer.user_token,
});

const mapDispatchToProps = (dispatch) => ({
  updateBookingActiveStepAction: updateBookingActiveStepAction,
  updateBookingActiveStepActionTemp: (current_step) =>
    dispatch(updateBookingActiveStepAction(current_step)),
  updateAttendeesShowErrorAction: (status) =>
    dispatch(updateAttendeesShowErrorAction(status)),

  // UpdateUserInfoForBookingFlow: (token) => dispatch(UpdateUserInfoForBookingFlow(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Step3);
