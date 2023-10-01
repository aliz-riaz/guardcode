import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Header from "../../components/Header/";
import Sidenav from "../../components/LeftNav";
import PayConfirm from "../../components/booking/PayConfirm";
import ProgressBar from "../../components/booking/ProgressBar";
import SlideControl from "../../components/booking/SlideControl";

import {
  updateBookingActiveStepAction,
  setScreenToBeLoadedOnStep5CheckOut,
} from "../../redux/actions/bookingAction";

import { protectedRoute } from "../../utilites/utility";

export const getServerSideProps = async function (context) {
  return protectedRoute(context);
};

function Step4(props) {
  const [expandMenu, setExpandMenu] = useState();
  const getClass = (expand) => {
    setExpandMenu(expand);
  };
  useEffect(() => {
    // props.setScreenToBeLoadedOnStep5CheckOut(1);
    props.updateBookingActiveStepActionTemp(4).then((resp0) => {});
  }, []);

  return (
    <>
      <Header isNavBarOpenCookie={props.isNavBarOpenCookie} />
      <div className="main-layout">
        <Sidenav isNavBarOpenCookie={props.isNavBarOpenCookie} />
        <div className="main-content">
          <ProgressBar />
          <div className="main-inner-content booking-content">
            {process.browser && <PayConfirm />}
          </div>
          <SlideControl
            backUrl="/booking/step-3"
            nextUrl="/booking/step-5-checkout"
          />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  updateBookingActiveStepAction: updateBookingActiveStepAction,
  updateBookingActiveStepActionTemp: (current_step) =>
    dispatch(updateBookingActiveStepAction(current_step)),

  setScreenToBeLoadedOnStep5CheckOut: (value) =>
    dispatch(setScreenToBeLoadedOnStep5CheckOut(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Step4);
