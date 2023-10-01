import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Header from "../../components/Header/";
import Sidenav from "../../components/LeftNav";
import SelectDate from "../../components/booking/SelectDate";
import ProgressBar from "../../components/booking/ProgressBar";
import SlideControl from "../../components/booking/SlideControl";

import { updateBookingActiveStepAction } from "../../redux/actions/bookingAction";

import { protectedRoute } from "../../utilites/utility";

export const getServerSideProps = async function (context) {
  return protectedRoute(context);
};

function Step2(props) {
  const [expandMenu, setExpandMenu] = useState();
  const getClass = (expand) => {
    setExpandMenu(expand);
  };
  useEffect(() => {
    props.updateBookingActiveStepActionTemp(2).then((resp0) => {});
  }, []);

  return (
    <>
      <Header isNavBarOpenCookie={props.isNavBarOpenCookie} />
      <div className="main-layout">
        <Sidenav isNavBarOpenCookie={props.isNavBarOpenCookie} />
        <div className="main-content">
          <ProgressBar />
          <div className="main-inner-content booking-content">
            <SelectDate />
          </div>
          <SlideControl backUrl="/booking/step-1" nextUrl="/booking/step-3" />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  booking_active_step: state.vantage.bookingReducer.booking_active_step,
});

const mapDispatchToProps = (dispatch) => ({
  updateBookingActiveStepAction: updateBookingActiveStepAction,
  updateBookingActiveStepActionTemp: (current_step) =>
    dispatch(updateBookingActiveStepAction(current_step)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Step2);
