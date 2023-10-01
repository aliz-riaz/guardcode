import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "reactstrap";
import Link from "next/link";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import {
  setShouldSliderOnStepOneShake,
  updateBookingActiveStepAction,
  updateAttendeesAction,
  setShouldComponentShakeOnPageOne,
  setNoOfSeatsError,
} from "../../redux/actions/bookingAction";
import { isMobile } from "react-device-detect";
var _ = require("lodash");

function SlideControl(props) {
  const router = useRouter();
  const [goToNextEnable, SetGoToNextEnable] = useState(false);
  const [Checkout, SetCheckout] = useState(false);
  const [attendeesShowError, setAttendeesShowError] = useState(
    props.attendees_show_error
  );
  useEffect(() => {
    setAttendeesShowError(props.attendees_show_error);
  }, [props.attendees_show_error]);

  let error = false;
  useEffect(() => {
    if (props.booking_active_step == 1) {
      SetGoToNextEnable(true);
    } else if (props.location_id > 0 && props.booking_active_step == 2) {
      SetGoToNextEnable(true);
    } else if (
      props.attendees.length > 0 &&
      !_.isEmpty(props.selected_location_object) &&
      props.booking_active_step == 3
    ) {
      error = ErrorHandlerForStep3();
      if (error) SetGoToNextEnable(false);
      else SetGoToNextEnable(true);
    } else if (props.booking_active_step == 4) {
      SetGoToNextEnable(true);
      SetCheckout(true);
    } else {
      SetGoToNextEnable(false);
    }
  }, []);

  useEffect(() => {
    if (props.booking_active_step == 1) {
      SetGoToNextEnable(true);
    } else if (
      props.location_id > 0 &&
      !_.isEmpty(props.selected_location_object) &&
      props.booking_active_step == 2
    ) {
      SetGoToNextEnable(true);
    } else if (props.attendees.length > 0 && props.booking_active_step == 3) {
      error = ErrorHandlerForStep3();
      if (error) SetGoToNextEnable(false);
      else SetGoToNextEnable(true);
    } else if (props.booking_active_step == 4) {
      SetGoToNextEnable(true);
      SetCheckout(true);
    } else {
      SetGoToNextEnable(false);
    }
  }, [
    props.course_id,
    props.number_of_seats,
    props.location_id,
    props.booking_active_step,
    props.attendees,
    props.selected_location_object,
  ]);
  // const [AttendeeArray, setAttendeeArray] = useState(props.attendees);

  const ErrorHandlerForStep3 = () => {
    let has_error = false;
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    var pattern_mobile = new RegExp(
      /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
    );

    const condition_one =
      props.course_id != 33 &&
      props.selected_location_object.direct_checkout == 0 &&
      (props.selected_location_object.enable_gold == 1 ||
        props.selected_location_object.enable_platinum == 1);
    const condition_two =
      props.course_id == 33 &&
      props.selected_location_object.enable_flexi_plus == 1;

    _.forEach(props.attendees, function (value, index) {
      if (attendeesShowError === true) {
        if (!value.first_name) {
          has_error = true;
          props.attendees[index].first_name_error = true;
          return false;
        } else if (!value.last_name) {
          has_error = true;
          props.attendees[index].last_name_error = true;
          return false;
        } else if (!value.phone || value.phone.length < 11) {
          has_error = true;
          props.attendees[index].phone_error = true;
          return false;
        } else if (!value.email) {
          has_error = true;
          props.attendees[index].email_error = true;
          return false;
        } else if (!value.address) {
          has_error = true;
          props.attendees[index].address_error = true;
          return false;
        } else if (
          !value.has_efaw &&
          !value.already_has_first_aid &&
          props.selected_location_object.efaw
        ) {
          has_error = true;
          props.attendees[index].efaw_error = true;
          return false;
        } else if (!value.postal_code) {
          has_error = true;
          props.attendees[index].postal_code_error = true;
          return false;
        } else if (!value.address1) {
          has_error = true;
          props.attendees[index].address1_error = true;
          return false;
        } else if (!value.city) {
          has_error = true;
          props.attendees[index].city_error = true;
          return false;
        } else if (!value.plan_id && (condition_one || condition_two)) {
          has_error = true;
          props.attendees[index].plan_error = true;
          return false;
        } else {
          has_error = false;
        }

        if (!props.selected_location_object.efaw) {
          props.attendees[index].has_efaw = false;
        }

        if (
          props.selected_location_object.direct_checkout != 0 &&
          (props.selected_location_object.enable_gold == 1 ||
            props.selected_location_object.enable_platinum == 1)
        ) {
          props.attendees[index].has_unlimited_retakes = false;
        }

        if (value.email) {
          if (!pattern.test(value.email)) {
            has_error = true;
            props.attendees[index].email_error = true;
            props.attendees[index].email_error_message =
              "Please enter a valid email address";
            return false;
          } else if (pattern.test(value.email)) {
            props.attendees[index].email_error = false;
            props.attendees[index].email_error_message =
              "Email Address is required";
          }
        }
        if (value.phone) {
          if (!pattern_mobile.test(value.phone)) {
            has_error = true;
            props.attendees[index].phone_error = true;
            props.attendees[index].phone_error_message =
              "Please enter a valid mobile number";
            return false;
          } else if (pattern_mobile.test(value.phone)) {
            props.attendees[index].phone_error = false;
            props.attendees[index].phone_error_message =
              "Mobile number is required";
          }
        }
      }
      if (attendeesShowError === false) {
        has_error = true;
      }
    });
    // props.updateAttendeesActionTemp([]).then((resp0) => {});
    // props.updateAttendeesActionTemp(props.attendees).then((resp0) => {});
    return has_error;
  };

  const GoNextHandler = (e) => {
    // let error_function_return = ErrorHandlerForStep3();
    if (props.number_of_seats <= 0) {
      e.preventDefault();
      props.setShouldSliderOnStepOneShake(true);
      setTimeout(() => {
        props.setShouldSliderOnStepOneShake(false);
      }, 500);
      props.setNoOfSeatsError(true);
    }
    if (props.course_id <= 0 && props.booking_active_step == 1) {
      e.preventDefault();

      props.setShouldComponentShakeOnPageOne(true);
      setTimeout(() => {
        props.setShouldComponentShakeOnPageOne(false);
      }, 500);
    }
  };
  const GoBackHandler = () => {
    if (props.booking_active_step > 1) {
      props
        .updateBookingActiveStepActionTemp(props.booking_active_step - 1)
        .then((resp0) => {
          // router.back()
          router.push("" + props.backUrl);
        });
    }
  };
  return (
    <>
      <div className="slides_controls">
        <div className="slide_control_fixed">
          <Row className="justify-content-center">
            <Col
              md="6"
              className="col-5 col-md-6 justify-content-md-center  align-items-center"
            >
              {/* <Link href="/dashboard" >
                                <Button className="btn btn-sm btn-gray">Cancel</Button>
                            </Link> */}
              {props.booking_active_step > 1 ? (
                <Button
                  onClick={(e) => GoBackHandler(e)}
                  className="btn w-100 btn_back w-md-auto btn-sm btn-gray w-100 aa"
                >
                  Back
                </Button>
              ) : (
                ""
              )}
            </Col>
            <Col className="d-flex justify-content-center col-5 col-md-6">
              <Link
                href={
                  goToNextEnable
                    ? props.number_of_seats == 0 ||
                      (props.course_id <= 0 && props.booking_active_step == 1)
                      ? ""
                      : "" + props.nextUrl
                    : ""
                }
              >
                <Button
                  onClick={(e) => GoNextHandler(e)}
                  className="btn w-100 btn-next w-md-auto btn_next btn-sm btn-green btn-disble"
                  disabled={!goToNextEnable}
                >
                  {Checkout === true ? "Checkout" : "Next"}
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  booking_active_step: state.vantage.bookingReducer.booking_active_step,
  course_id: state.vantage.bookingReducer.course_id,
  number_of_seats: state.vantage.bookingReducer.number_of_seats,
  location_id: state.vantage.bookingReducer.location_id,
  attendees: state.vantage.bookingReducer.attendees,
  attendees_show_error: state.vantage.bookingReducer.attendees_show_error,
  selected_location_object:
    state.vantage.bookingReducer.selected_location_object,
  should_component_on_page_one_shake:
    state.vantage.commonReducer.should_component_on_page_one_shake,
});

const mapDispatchToProps = (dispatch) => ({
  updateBookingActiveStepAction: updateBookingActiveStepAction,
  updateBookingActiveStepActionTemp: (current_step) =>
    dispatch(updateBookingActiveStepAction(current_step)),

  updateAttendeesAction: updateAttendeesAction,
  updateAttendeesActionTemp: (attendees) =>
    dispatch(updateAttendeesAction(attendees)),
  setShouldComponentShakeOnPageOne: (value) =>
    dispatch(setShouldComponentShakeOnPageOne(value)),
  setNoOfSeatsError: (value) => dispatch(setNoOfSeatsError(value)),
  setShouldSliderOnStepOneShake: (status) =>
    dispatch(setShouldSliderOnStepOneShake(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SlideControl);
