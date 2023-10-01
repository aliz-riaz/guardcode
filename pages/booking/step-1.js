import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Header from "../../components/Header";
import Sidenav from "../../components/LeftNav";
import SelectCourse from "../../components/booking/SelectCourse";
import ProgressBar from "../../components/booking/ProgressBar";
import SlideControl from "../../components/booking/SlideControl";

import { updateBookingActiveStepAction } from "../../redux/actions/bookingAction";
import { protectedRoute } from "../../utilites/utility";

export const getServerSideProps = async function (context) {
  return protectedRoute(context);
};

function Step1(props) {
  const [expandMenu, setExpandMenu] = useState();
  const [nextButtonIsEnable, setNextButtonIsEnable] = useState(false);
  const getClass = (expand) => {
    setExpandMenu(expand);
  };
  useEffect(() => {
    props.updateBookingActiveStepActionTemp(1).then((resp0) => {});
  }, []);

  return (
    <>
      <Header isNavBarOpenCookie={props.isNavBarOpenCookie} />
      <div className="main-layout">
        <Sidenav isNavBarOpenCookie={props.isNavBarOpenCookie} />
        <div className="main-content">
          <ProgressBar />
          <div className="main-inner-content booking-content">
            <SelectCourse />
          </div>
          <SlideControl nextUrl="/booking/step-2" />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Step1);
