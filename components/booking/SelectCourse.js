import React, { useState, useEffect } from "react";
import { Row, Col, FormGroup, Label } from "reactstrap";
import "animate.css";
//import RangeSlider from '../../components/RangeSlider'
// Using an ES6 transpiler like Babel
import Slider from "react-rangeslider";

// To include the default styles
import "react-rangeslider/lib/index.css";

import { connect } from "react-redux";
import {
  updateAttendeesAction,
  setShouldComponentShakeOnPageOne,
  updateSelectedCourseIdAction,
  updateSelectedCourseNameAction,
  updateNumberOfSeatsAction,
  setNoOfSeatsError,
  updateAttendeesShowErrorAction,
} from "../../redux/actions/bookingAction";

function SelectCourse(props) {
  const [course, SetCourse] = useState();
  const [noOfSeatsValue, SetNoOfSeatsValue] = useState(0);
  const [classWithShake, setClassWithShake] = useState("");
  const [classWithShakeForSlider, setClassWithShakeForSlider] = useState("");
  const [noOfSeatsErrorLocally, setNoOfSeatsErrorLocally] = useState(
    props.show_no_of_seats_error
  );
  useEffect(() => {
    if (props.course_id > 0) {
      SetCourse(props.course_id);
      props.setShouldComponentShakeOnPageOne(false);
    }
    if (props.number_of_seats > 0) SetNoOfSeatsValue(props.number_of_seats);
  }, []);
  useEffect(() => {
    if (props.should_slider_shake_on_step_one) {
      setClassWithShakeForSlider("animate__animated animate__shakeX");
    } else {
      setClassWithShakeForSlider("animate__animated");
    }
  }, [props.should_slider_shake_on_step_one]);
  useEffect(() => {
    props.updateNumberOfSeatsAction(noOfSeatsValue);
  }, [noOfSeatsValue]);
  useEffect(() => {
    setNoOfSeatsErrorLocally(props.show_no_of_seats_error);
  }, [props.show_no_of_seats_error]);
  useEffect(() => {
    if (props.should_component_on_page_one_shake) {
      setClassWithShake("course_select_box  animate__animated animate__shakeX");
    } else {
      setClassWithShake("course_select_box  animate__animated");
    }
  }, [props.should_component_on_page_one_shake]);

  const handleChangeStart = () => {};
  const handleChange = (value) => {
    if (props.number_of_seats >= 0) {
      props.setNoOfSeatsError(false);
    }
    props.updateAttendeesAction([]);
    props.updateAttendeesShowErrorAction(false);
    SetNoOfSeatsValue(value);
  };
  const handleChangeComplete = () => {};
  const handleCourse = (id, name) => {
    props.updateSelectedCourseIdAction(id);
    props.updateSelectedCourseNameAction(name);
    SetCourse(id);
    props.updateAttendeesAction([]);
  };
  return (
    <>
      <div className="course_select_container">
        <Row className="pt-2 pt-md-2 pb-1 pb-md-4">
          <Col>
            <h3 className="text-center text-sm-uppercase font-sm-12">
              Select a course
            </h3>
          </Col>
        </Row>

        <div className="course_select_row">
          <div
            className={
              course === 12 ? "course_select_box selected" : classWithShake
            }
            onClick={() => handleCourse(12, "Door Supervisor Training")}
          >
            <span className="select_icon"></span>
            <i className="course_icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="57"
                height="60"
                viewBox="0 0 57 60"
              >
                <g fill="none" fillRule="evenodd" strokeLinecap="square">
                  <g strokeWidth="2.5">
                    <g>
                      <g transform="translate(-440.000000, -268.000000) translate(399.000000, 264.000000) translate(41.545455, 4.000000)">
                        <path
                          stroke="#3BD55A"
                          d="M12.255 49L12.255 11 42.655 11 42.655 49"
                        />
                        <path
                          stroke="#242429"
                          d="M31.255 49h-7.6v-8.762h-3.8v-8.763c0-2.074 1.7-3.755 3.8-3.755h7.6c2.098 0 3.8 1.681 3.8 3.755v8.763h-3.8V49z"
                        />
                        <circle
                          cx="27.455"
                          cy="19.36"
                          r="3.8"
                          stroke="#242429"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </i>
            <span className="course_name">Door Supervisor Training</span>
          </div>
          <div
            className={
              course === 13 ? "course_select_box selected" : classWithShake
            }
            onClick={() => handleCourse(13, "CCTV Training")}
          >
            <span className="select_icon"></span>
            <i className="course_icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="57"
                height="60"
                viewBox="0 0 57 60"
              >
                <g fill="none" fillRule="evenodd" strokeLinecap="square">
                  <g strokeWidth="2.5">
                    <g transform="translate(-605.000000, -271.000000) translate(605.545455, 271.000000)">
                      <path
                        stroke="#3BD55A"
                        d="M44.455 45L34.555 45 33.455 38"
                      />
                      <path
                        stroke="#000"
                        d="M15.493 17.36L42.888 17.36 42.888 33.298 15.493 33.298z"
                        transform="translate(29.190617, 25.328881) rotate(-10.550319) translate(-29.190617, -25.328881)"
                      />
                      <path stroke="#000" d="M9.455 23L12.455 35" />
                      <circle cx="22.955" cy="25.5" r="2.5" stroke="#3BD55A" />
                    </g>
                  </g>
                </g>
              </svg>
            </i>
            <span className="course_name">CCTV Training</span>
          </div>
          <div
            className={
              course === 119 ? "course_select_box selected" : classWithShake
            }
            onClick={() => handleCourse(119, "Top-Up for Door Supervisors")}
          >
            <span className="select_icon"></span>
            <i className="course_icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
              >
                <g
                  className="nc-icon-wrapper"
                  stroke-linecap="square"
                  stroke-linejoin="miter"
                  stroke-width="2"
                  fill="none"
                  stroke="#212121"
                  stroke-miterlimit="10"
                >
                  <line x1="20" y1="18" x2="27" y2="18" stroke="#3bd55a" />{" "}
                  <line x1="20" y1="23" x2="27" y2="23" stroke="#3bd55a" />{" "}
                  <circle cx="11" cy="17" r="2" stroke="#3bd55a" />{" "}
                  <path
                    d="M16,26H6v0 c0-2.209,1.791-4,4-4h2C14.209,22,16,23.791,16,26L16,26z"
                    stroke="#3bd55a"
                  />{" "}
                  <polyline points="19,8 31,8 31,31 1,31 1,8 13,8 " />{" "}
                  <path d="M19,11h-6V4 c0-1.657,1.343-3,3-3h0c1.657,0,3,1.343,3,3V11z" />
                </g>
              </svg>
            </i>
            <span className="course_name">Top-Up for Door Supervisors</span>
          </div>

          <div
            className={
              course === 29 ? "course_select_box selected" : classWithShake
            }
            onClick={() => handleCourse(29, "Close Protection Training")}
          >
            <span className="select_icon"></span>
            <i className="course_icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="57"
                height="60"
                viewBox="0 0 57 60"
              >
                <g fill="none" fillRule="evenodd">
                  <g strokeWidth="2">
                    <g>
                      <path
                        stroke="#3BD55A"
                        d="M27.955 14L27.955 46M41.455 30.5L13.455 30.5"
                        transform="translate(-946.000000, -270.000000) translate(946.545455, 270.000000)"
                      />
                      <path
                        stroke="#000"
                        strokeLinecap="square"
                        d="M27.455 14c-4.8 3.2-11.2 4.571-16 4.571 0 11.2 4.8 22.629 16 27.429 11.2-4.8 16-16.229 16-27.429-4.8 0-11.2-1.371-16-4.571z"
                        transform="translate(-946.000000, -270.000000) translate(946.545455, 270.000000)"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </i>
            <span className="course_name">Close Protection Training</span>
          </div>
          <div
            className={
              course === 120 ? "course_select_box selected" : classWithShake
            }
            onClick={() =>
              handleCourse(120, "Top-Up Training for Security Guards")
            }
          >
            <span className="select_icon"></span>
            <i className="course_icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
              >
                <g
                  className="nc-icon-wrapper"
                  stroke-linecap="square"
                  stroke-linejoin="miter"
                  stroke-width="2"
                  fill="none"
                  stroke="#212121"
                  stroke-miterlimit="10"
                >
                  <line x1="20" y1="18" x2="27" y2="18" stroke="#3bd55a" />{" "}
                  <line x1="20" y1="23" x2="27" y2="23" stroke="#3bd55a" />{" "}
                  <circle cx="11" cy="17" r="2" stroke="#3bd55a" />{" "}
                  <path
                    d="M16,26H6v0 c0-2.209,1.791-4,4-4h2C14.209,22,16,23.791,16,26L16,26z"
                    stroke="#3bd55a"
                  />{" "}
                  <polyline points="19,8 31,8 31,31 1,31 1,8 13,8 " />{" "}
                  <path d="M19,11h-6V4 c0-1.657,1.343-3,3-3h0c1.657,0,3,1.343,3,3V11z" />
                </g>
              </svg>
            </i>
            <span className="course_name">Top-Up for Security Guards</span>
          </div>
          <div
            className={
              course === 44 ? "course_select_box selected" : classWithShake
            }
            onClick={() => handleCourse(44, "Security Guard Training")}
          >
            <span className="select_icon"></span>
            <i className="course_icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="57"
                height="60"
                viewBox="0 0 57 60"
              >
                <g fill="none" fillRule="evenodd">
                  <g>
                    <g transform="translate(-775.000000, -271.000000) translate(775.545455, 271.000000)">
                      <path
                        stroke="#3BD55A"
                        strokeLinecap="square"
                        strokeWidth="2"
                        d="M27.955 40L27.955 45"
                      />
                      <path
                        stroke="#000"
                        strokeLinecap="square"
                        strokeWidth="2"
                        d="M38.455 16.889c0-2.148-4.701-3.889-10.5-3.889-5.8 0-10.5 1.741-10.5 3.889 0 1.138 1.327 2.158 3.429 2.869.868 1.87 3.701 3.242 7.07 3.242 3.37 0 6.203-1.372 7.071-3.242 2.102-.711 3.43-1.731 3.43-2.87z"
                      />
                      <path
                        stroke="#000"
                        strokeWidth="2"
                        d="M25.046 32l-9.358 5.214c-1.377.765-2.233 2.235-2.233 3.832V45h30v-3.954c0-1.597-.857-3.067-2.234-3.832L31.863 32"
                      />
                      <path
                        stroke="#000"
                        strokeWidth="2"
                        d="M36.455 19v2.513c0 6.265-3.806 11.487-8.5 11.487-4.695 0-8.5-5.222-8.5-11.487V19"
                      />
                      <circle
                        cx="27.955"
                        cy="17.5"
                        r="1.5"
                        fill="#3BD55A"
                        fillRule="nonzero"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            </i>
            <span className="course_name">Security Guard Training</span>
          </div>
          <div
            className={
              course === 61 ? "course_select_box selected" : classWithShake
            }
            onClick={() =>
              handleCourse(61, "Emergency First Aid at Work (EFAW)")
            }
          >
            <span className="select_icon"></span>
            <i className="course_icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
              >
                <g
                  className="nc-icon-wrapper"
                  stroke-linecap="square"
                  stroke-linejoin="miter"
                  stroke-width="2"
                  fill="none"
                  stroke="#212121"
                  stroke-miterlimit="10"
                >
                  <polyline
                    data-cap="butt"
                    points="29,24 29,30 3,30 3,24 "
                    stroke-linecap="butt"
                  />{" "}
                  <polyline points=" 10,6 10,2 22,2 22,6 " stroke="#3bd55a" />{" "}
                  <rect x="1" y="6" width="30" height="18" />{" "}
                  <polygon
                    points=" 21,13 18,13 18,10 14,10 14,13 11,13 11,17 14,17 14,20 18,20 18,17 21,17 "
                    stroke="#3bd55a"
                  />
                </g>
              </svg>
            </i>
            <span className="course_name">
              Emergency First Aid At Work (EFAW)
            </span>
          </div>
          <div
            className={
              course === 33 ? "course_select_box selected" : classWithShake
            }
            onClick={() => handleCourse(33, "Personal Licence Training (APLH)")}
          >
            <span className="select_icon"></span>
            <i className="course_icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 64 64"
              >
                <g
                  className="nc-icon-wrapper"
                  stroke-linecap="square"
                  stroke-linejoin="miter"
                  stroke-width="4"
                  fill="none"
                  stroke="#212121"
                  stroke-miterlimit="10"
                >
                  <path
                    data-cap="butt"
                    d="M38,14c0-6.6,5.4-12,12-12 s12,5.4,12,12s-5.4,12-12,12c-3,0-5.7-1.1-7.7-2.8"
                    stroke-linecap="butt"
                    stroke="#3bd55a"
                  />{" "}
                  <line
                    data-cap="butt"
                    x1="16.2"
                    y1="26"
                    x2="39.8"
                    y2="26"
                    stroke-linecap="butt"
                    stroke="#3bd55a"
                  />{" "}
                  <polygon points="50,14 28,40 6,14 " />{" "}
                  <line x1="28" y1="40" x2="28" y2="62" />{" "}
                  <line x1="14" y1="62" x2="42" y2="62" />
                </g>
              </svg>
            </i>
            <span className="course_name">
              Personal Licence Training (APLH)
            </span>
          </div>
        </div>
      </div>
      <div className="range_slider_container">
        <FormGroup className={classWithShakeForSlider}>
          <Label>No. of seats: {noOfSeatsValue}</Label>
          <Slider
            className="slider"
            type="range"
            min={0}
            max={15}
            value={noOfSeatsValue}
            onChangeStart={handleChangeStart}
            onChange={handleChange}
            onChangeComplete={handleChangeComplete}
          />
          {noOfSeatsErrorLocally ? (
            <span className="text-danger text-center d-block">
              Please select No. of seats
            </span>
          ) : null}
          {/* <Label>No. of seats: {slidertVal}</Label>
                            <RangeSlider {...sliderProps} classes="additional-css-classes" /> */}
        </FormGroup>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  booking_active_step: state.vantage.bookingReducer.booking_active_step,
  course_id: state.vantage.bookingReducer.course_id,
  number_of_seats: state.vantage.bookingReducer.number_of_seats,
  should_component_on_page_one_shake:
    state.vantage.commonReducer.should_component_on_page_one_shake,
  show_no_of_seats_error: state.vantage.bookingReducer.show_no_of_seats_error,
  attendees: state.vantage.bookingReducer.attendees,
  should_slider_shake_on_step_one:
    state.vantage.bookingReducer.should_slider_shake_on_step_one,
});

const mapDispatchToProps = (dispatch) => ({
  updateSelectedCourseIdAction: (id) =>
    dispatch(updateSelectedCourseIdAction(id)),
  updateSelectedCourseNameAction: (name) =>
    dispatch(updateSelectedCourseNameAction(name)),
  updateNumberOfSeatsAction: (noOfSeatsValue) =>
    dispatch(updateNumberOfSeatsAction(noOfSeatsValue)),
  setShouldComponentShakeOnPageOne: (value) =>
    dispatch(setShouldComponentShakeOnPageOne(value)),
  setNoOfSeatsError: (value) => dispatch(setNoOfSeatsError(value)),
  updateAttendeesAction: (attendees) =>
    dispatch(updateAttendeesAction(attendees)),
  updateAttendeesShowErrorAction: (status) =>
    dispatch(updateAttendeesShowErrorAction(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectCourse);
