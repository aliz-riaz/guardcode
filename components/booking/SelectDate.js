import React, { useState, useEffect } from "react";
import {
  Button,
  FormGroup,
  Col,
  Row,
  InputGroup,
  Label,
  CustomInput,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroupAddon,
} from "reactstrap";
import RangeSlider from "../../components/RangeSlider";

import { connect } from "react-redux";
import EventBox from "../Courses/EventBox.js";
import IsRequestLoderComponent from "../Common/IsRequestLoderComponent.js";

import {
  searchCourseAction,
  updatePageLastNumberOnPagination,
  updateSearchCourses,
} from "../../redux/actions/courseAction";
import {
  updatePostCodeValueAction,
  updateSelectedLocationObjectAction,
  updateLocationIdAction,
} from "../../redux/actions/bookingAction";

import GoogleAutoComplete from "../Common/GoogleAutoComplete.js";
import { sortedLastIndex } from "lodash";
import PaginationComponent from "../Common/PaginationComponent";
var _ = require("lodash");
function SelectDate(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [CoursesLoded, setCoursesLoded] = useState(false);
  const [fetchData, setFetchData] = useState(
    props.postcode != "" ? true : false
  );
  const [postCode, setPostCode] = useState(props.postcode);
  const [saveSearchPostCode, setSaveSearchPostCode] = useState(
    props.postcode ? props.postcode : ""
  );
  const [showCrossBtn, setShowCrossBtn] = useState(
    props.postcode ? true : false
  );
  const [currentpage, setCurrentpage] = useState(1);
  useEffect(() => {
    props.updatePageLastNumberOnPagination(1);
    if (props.postcode != "") {
      setFetchData(true);
    }
  }, []);

  useEffect(() => {
    callSearchAction(postCode, currentpage);
  }, [currentpage]);

  useEffect(() => {
    if (props.postcode == "") {
      crossBtnHandler();
      props.updatePageLastNumberOnPagination(1);
      setFetchData(false);
    }
    setPostCode(props.postcode);
    // setSaveSearchPostCode(props.postcode);
    if (props.postcode != "") {
      setFetchData(true);
    }
  }, [props.postcode]);

  const crossBtnHandler = () => {
    props.updateSelectedLocationObjectActionTemp({}).then((resp0) => {
      setShowCrossBtn(false);
      setPostCode("");
      //   callSearchAction("",1);
      setSaveSearchPostCode("");
      props.updatePostCodeValueActionTemp("").then((resp0) => {});
    });
    props.updateLocationIdAction("").then((resp0) => {});
    props.updateSearchCourses({});
    setCoursesLoded(false);
  };

  const callSearchAction = (postCode_temp, page_num) => {
    if (fetchData) {
      setCoursesLoded(false);
      const updateLocations = (sentPostCode) => {
        setSaveSearchPostCode(sentPostCode);
        props.updatePostCodeValueActionTemp(sentPostCode).then((resp0) => {});
        props
          .searchCourseActionTemp(
            props.course_id,
            sentPostCode,
            page_num,
            props.number_of_seats
          )
          .then((resp0) => {
            setCoursesLoded(true);
          });
      };
      postCode_temp == ""
        ? updateLocations(postCode_temp)
        : updateLocations(postCode);
    }
  };

  const searchClickHandler = () => {
    if (postCode != "") {
      props.updateSelectedLocationObjectActionTemp({}).then((resp0) => {
        setShowCrossBtn(true);
        callSearchAction(props.postcode, 1);
      });
    }
  };
  const CoursesList = () => {
    let Courses;
    if (!_.isEmpty(props.search_courses.course_venues)) {
      if (!_.isEmpty(props.search_courses.course_venues.data)) {
        if (CoursesLoded) {
          Courses = props.search_courses.course_venues.data.map(
            (course, key) => {
              return (
                <EventBox
                  distance={course.distance}
                  venue_address={course.venue_address}
                  venue_name={course.venue_name}
                  venue_event_dates={course.venue_event_dates}
                  venue_first_event={course.venue_first_event}
                  key={course.id}
                  saveSearchPostCode={saveSearchPostCode}
                />
              );
            }
          );
        } else {
          Courses = "loading";
        }
      }
    } else {
      props.course_id == 33 && !_.isEmpty(props.virtual_events)
        ? (Courses = "")
        : (Courses = (
            <p className="text-center">
              <strong>No Record Found</strong>
            </p>
          ));
    }
    return <>{Courses}</>;
  };
  const PostcodeChangeHandler = (event) => {
    setPostCode(event.target.value);
    if (event.target.value == "") {
      setShowCrossBtn(false);
      setCurrentpage(1);
      callSearchAction("");
    }
    props.updatePostCodeValueActionTemp(event.target.value).then((resp0) => {});
  };
  return (
    <>
      <div className="d-block d-md-none step_heading">{props.course_name} </div>
      <div className="booking_locatins_container">
        <div className="d-none d-md-block selected_course">
          <i>
            {props.course_id == 12 ? (
              <img
                src={
                  process.env.APP_URL +
                  "/images/door-supervisor-traiining-icn.svg"
                }
              />
            ) : (
              ""
            )}
            {props.course_id == 13 ? (
              <img src={process.env.APP_URL + "/images/cctv-icn.svg"} />
            ) : (
              ""
            )}
            {props.course_id == 29 ? (
              <img
                src={process.env.APP_URL + "/images/close-protection-icn.svg"}
              />
            ) : (
              ""
            )}
            {props.course_id == 44 ? (
              <img src={process.env.APP_URL + "/images/security-off-icn.svg"} />
            ) : (
              ""
            )}
            {props.course_id == 120 || props.course_id == 119 ? (
              <img
                src={process.env.APP_URL + "/images/siaTopUp.svg"}
                className="mr-2"
              />
            ) : (
              ""
            )}
            {props.course_id == 61 ? (
              <img
                src={process.env.APP_URL + "/images/efaw.svg"}
                className="mr-2"
              />
            ) : (
              ""
            )}
            {props.course_id == 33 ? (
              <img
                src={process.env.APP_URL + "/images/aplh.svg"}
                className="mr-2"
              />
            ) : (
              ""
            )}
          </i>
          <h4>{props.course_name}</h4>
        </div>
        <div className="search_filter">
          <FormGroup className="">
            <label className="d-block text-center">
              <strong>Enter your postcode to view courses near you</strong>
            </label>
            <div className="gl-search-location">
              <GoogleAutoComplete
                enterKeyHandler={() => searchClickHandler()}
                setSaveSearchPostCode={setSaveSearchPostCode}
              />
              {/* <Input type="search" className="forn-control" value={postCode} onChange={PostcodeChangeHandler} placeholder="Postcode or address" /> */}
              <Button
                className="btn btn-green"
                onClick={() => searchClickHandler()}
              >
                <img
                  src={process.env.APP_URL + "/images/arrow-img.svg"}
                  alt="arrow-icon"
                />
              </Button>
            </div>
          </FormGroup>
        </div>
        <div className="all_location">
          <h6 className="mb-0">
            {showCrossBtn ? `Showing courses near ${saveSearchPostCode}` : ""}
          </h6>

          {/* {JSON.stringify(props.selected_location_object)}
                    {props.location_id} */}
          {showCrossBtn ? (
            <span className="remove_location" onClick={crossBtnHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16px"
                viewBox="0 0 511.76 511.76"
                y="0px"
                x="0px"
                id="Capa_1"
              >
                <g>
                  <g>
                    <path d="M436.896,74.869c-99.84-99.819-262.208-99.819-362.048,0c-99.797,99.819-99.797,262.229,0,362.048    c49.92,49.899,115.477,74.837,181.035,74.837s131.093-24.939,181.013-74.837C536.715,337.099,536.715,174.688,436.896,74.869z     M361.461,331.317c8.341,8.341,8.341,21.824,0,30.165c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    l-75.413-75.435l-75.392,75.413c-4.181,4.16-9.643,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    c-8.341-8.341-8.341-21.845,0-30.165l75.392-75.413l-75.413-75.413c-8.341-8.341-8.341-21.845,0-30.165    c8.32-8.341,21.824-8.341,30.165,0l75.413,75.413l75.413-75.413c8.341-8.341,21.824-8.341,30.165,0    c8.341,8.32,8.341,21.824,0,30.165l-75.413,75.413L361.461,331.317z" />
                  </g>
                </g>
              </svg>
            </span>
          ) : null}
        </div>

        <IsRequestLoderComponent color={"dark"} customClass="spinner-large" />
        <div className="events_list">
          {props.is_request_loader === false ? (
            <>
              {!_.isEmpty(props.virtual_events) &&
              showCrossBtn &&
              props.course_id == 33 ? (
                <EventBox
                  distance={null}
                  venue_address={null}
                  venue_name="Personal Licence Training (APLH) - Virtual/Online Class"
                  venue_event_dates={
                    props.virtual_events.others_virtual_event_dates
                  }
                  venue_first_event={props.virtual_events.first_virtual_event}
                  //  key={course.id}
                  saveSearchPostCode={saveSearchPostCode}
                />
              ) : null}
              {CoursesLoded === true ? CoursesList() : ""}
              <Row>
                <Col sm="12" md="12">
                  {props.last_page <= 1 ? null : (
                    <PaginationComponent
                      currentpage={currentpage}
                      setCurrentpage={setCurrentpage}
                      contentDataLinks={props.search_courses_pagination_links}
                    ></PaginationComponent>
                  )}
                </Col>
              </Row>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  number_of_seats: state.vantage.bookingReducer.number_of_seats,
  course_id: state.vantage.bookingReducer.course_id,
  course_name: state.vantage.bookingReducer.course_name,
  search_courses: state.vantage.coursesReducer.search_courses,
  is_request_loader: state.vantage.commonReducer.is_request_loader,
  selected_location_object:
    state.vantage.bookingReducer.selected_location_object,
  location_id: state.vantage.bookingReducer.location_id,
  postcode: state.vantage.bookingReducer.postcode,
  virtual_events: state.vantage.bookingReducer.virtual_events,
  search_courses_pagination_links:
    state.vantage.coursesReducer.search_courses_pagination_links,
  last_page: state.vantage.coursesReducer.last_page_no_of_booking_filter_pg2,
});

const mapDispatchToProps = (dispatch) => ({
  searchCourseAction: searchCourseAction,
  searchCourseActionTemp: (course_id, postcode, currentpage, noOfSeats) =>
    dispatch(searchCourseAction(course_id, postcode, currentpage, noOfSeats)),

  updatePostCodeValueAction: updatePostCodeValueAction,
  updatePostCodeValueActionTemp: (postcode) =>
    dispatch(updatePostCodeValueAction(postcode)),

  updateSelectedLocationObjectAction: updateSelectedLocationObjectAction,
  updateSelectedLocationObjectActionTemp: (selected_location_object) =>
    dispatch(updateSelectedLocationObjectAction(selected_location_object)),
  updateLocationIdAction: (selected_location_object) =>
    dispatch(updateLocationIdAction(selected_location_object)),

  updatePageLastNumberOnPagination: (page_number) =>
    dispatch(updatePageLastNumberOnPagination(page_number)),
  updateSearchCourses: (data) => dispatch(updateSearchCourses(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectDate);
