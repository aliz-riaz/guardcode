import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
// reactstrap components
import {
  Button,
  FormGroup,
  InputGroup,
  Label,
  CustomInput,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroupAddon,
  Spinner,
} from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Link from "next/link";
import { connect } from "react-redux";
import { pastCourseAction } from "../../redux/actions/courseAction";
import {
  updateLocationNameAction,
  updateSelectedLocationObjectAction,
  updateLocationIdAction,
} from "../../redux/actions/bookingAction";
import { getEventDetailsAction } from "../../redux/actions/eventAction";

var _ = require("lodash");

function EventBox(props) {
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());
  const [EventDatesValue, setEventDatesValue] = useState(
    props.selected_location_object ? props.selected_location_object.id : ""
  );
  const [onScreenLoder, setOnScreenLoder] = useState(false);

  const [idTemp, setIdTemp] = useState(
    props.venue_first_event ? props.venue_first_event.id : ""
  );
  const [startTime, setStartTime] = useState(
    props.venue_first_event ? props.venue_first_event.start_time : ""
  );
  const [endTime, setEndTime] = useState(
    props.venue_first_event ? props.venue_first_event.end_time : ""
  );
  const [normalPrice, setNormalPrice] = useState(
    props.venue_first_event ? props.venue_first_event.normal_price : 0
  );
  const [centerName, setCenterName] = useState(
    props.venue_first_event ? props.venue_first_event.center.center_name : ""
  );

  const moment = require("moment");

  const EventDatesList = () => {
    if (props.venue_event_dates) {
      const Courses = props.venue_event_dates.map((events, key) => {
        return (
          <option key={key} value={events.event_id}>
            {moment(
              events.start_date + " " + events.start_time,
              "YYYY-MM-DD HH:mm"
            ).format("DD MMMM YYYY") +
              " - " +
              moment(
                events.end_date + " " + events.end_time,
                "YYYY-MM-DD HH:mm"
              ).format("DD MMMM YYYY")}
          </option>
        );
      });
      return <>{Courses}</>;
    }
  };
  const EventDatesOnChangeHandler = (event) => {
    setOnScreenLoder(true);
    setEventDatesValue(event.target.value);
    props.getEventDetailsActionTemp(event.target.value).then((response) => {
      setOnScreenLoder(false);
      if (!_.isEmpty(response)) {
        if (response.venue) {
          props
            .updateLocationNameActionTemp(response.venue.venue_name)
            .then((resp0) => {});
        }
        props.updateLocationIdActionTemp(response.id).then((resp0) => {});
        setIdTemp(response.id);
        setStartTime(response.start_time);
        setEndTime(response.end_time);
        setNormalPrice(response.normal_price);
        setCenterName(response.center.center_name);
      }
    });
  };

  const eventClickHandler = (event_id) => {
    setEventDatesValue(event_id);
    props.getEventDetailsActionTemp(event_id).then((response) => {
      if (!_.isEmpty(response)) {
        if (response.venue) {
          props
            .updateLocationNameActionTemp(response.venue.venue_name)
            .then((resp0) => {});
        }
        props.updateLocationIdActionTemp(response.id).then((resp0) => {});
        setIdTemp(response.id);
        setStartTime(response.start_time);
        setEndTime(response.end_time);
        setNormalPrice(response.normal_price);
        setCenterName(response.center.center_name);
      }
    });
  };

  return (
    <>
      <div
        className={
          _.findIndex(props.venue_event_dates, [
            "event_id",
            parseInt(props.selected_location_object.id),
          ]) !== -1
            ? "course_location_card active"
            : "course_location_card"
        }
      >
        {/* <div className="course_location_card"> */}

        <br />
        <div className="course_location_detail">
          {props.venue_address == null ? (
            <div className="align-items-center d-flex">
              <svg
                width="22"
                height="18"
                viewBox="0 0 18 14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" fill-rule="evenodd">
                  <path
                    d="M3 7.857V2.371C3 1.614 3.597 1 4.333 1h9.334C14.403 1 15 1.614 15 2.371v5.486"
                    stroke="#3BD55A"
                    stroke-linecap="square"
                  />
                  <circle
                    fill="#3BD55A"
                    fill-rule="nonzero"
                    cx="9"
                    cy="3.429"
                    r="1"
                  />
                  <path
                    d="M16.714 9.571c0 1.894-1.256 3.429-2.805 3.429H4.091c-1.55 0-2.805-1.535-2.805-3.429h15.428z"
                    stroke="#3BD55A"
                    stroke-linecap="square"
                  />
                </g>
              </svg>
              <p className="mb-0 ml-2 text-green" style={{ color: "#3bd55a" }}>
                Online Class
              </p>
            </div>
          ) : null}
          {/* <h6>
                        {
                            props.distance != null ?  props.distance + " miles from " + props.saveSearchPostCode : ''
                        }

                    </h6> */}

          <h5 className="fs-robot">{props.venue_name}</h5>
          {props.distance != null ? (
            <p className="">
              <i>
                <img
                  src={process.env.APP_URL + "/images/distance-icon.svg"}
                  height="18px"
                />
              </i>
              {/* <span>{props.distance + " miles from " + props.saveSearchPostCode}</span> */}
              <span className="">{props.distance + " miles"}</span>
            </p>
          ) : null}
          <p className="">
            <i>
              <img
                src={process.env.APP_URL + "/images/time_icon_light.svg"}
                height="10px"
              />
            </i>
            <span className="">
              {startTime} to {endTime}
            </span>
          </p>

          {props.venue_address != null ? (
            <p className="">
              <i>
                <img
                  src={process.env.APP_URL + "/images/map-pin.svg"}
                  height="13px"
                />
              </i>
              <span className="">{props.venue_address}</span>
            </p>
          ) : null}

          <FormGroup className="mb-0 label_date mt-3 pt-1">
            <Label className="mb-0 mb-md-1 fw-bold">Please select date</Label>
          </FormGroup>
          <FormGroup className="gl-input-simple d-flex align-items-center pt-0 mt-1">
            <Input
              type="select"
              className="d-inline-block flex-shrink-0"
              name="date-select"
              value={EventDatesValue}
              onChange={EventDatesOnChangeHandler}
            >
              {EventDatesList()}
            </Input>
            {onScreenLoder === true ? (
              <div className="ml-2">
                <Spinner size="sm" className="d-inlien-block" color={"dark"} />
              </div>
            ) : (
              ""
            )}
            {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
          </FormGroup>
          <p className="mt-2 provided_by mt-2">
            <i className="mr-2">
              <img
                src={process.env.APP_URL + "/images/Mortarboard_light.svg"}
                height="18px"
                alt=""
              />
            </i>
            <span>Provided by {centerName}</span>
          </p>
        </div>
        <div className="location_price">
          {_.findIndex(props.venue_event_dates, [
            "event_id",
            parseInt(props.selected_location_object.id),
          ]) !== -1 ? (
            <img
              src={process.env.APP_URL + "/images/checked-img.svg"}
              width="16px"
              height="16px"
              className="icon-check"
              alt="check-icon"
            />
          ) : (
            ""
          )}
          <span className="actual_price">
            Prices from <span>£{normalPrice}</span>{" "}
          </span>
          <div
            onClick={() =>
              eventClickHandler(
                _.findIndex(props.venue_event_dates, [
                  "event_id",
                  parseInt(EventDatesValue),
                ]) !== -1
                  ? EventDatesValue
                  : props.venue_first_event.id
              )
            }
          >
            {_.findIndex(props.venue_event_dates, [
              "event_id",
              parseInt(props.selected_location_object.id),
            ]) !== -1 ? (
              <button className="btn btn-sm fs-6 btn-green select-btn selected w-100">
                Selected
              </button>
            ) : (
              <button className="btn btn-sm fs-6 btn-gray select-btn w-100">
                Select
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  location_id: state.vantage.bookingReducer.location_id,
  selected_location_object:
    state.vantage.bookingReducer.selected_location_object,
});

const mapDispatchToProps = (dispatch) => ({
  pastCourseAction: pastCourseAction,
  pastCourseActionTemp: (data, booking_id) =>
    dispatch(pastCourseAction(data, booking_id)),
  updateLocationIdAction: updateLocationIdAction,
  updateLocationIdActionTemp: (location_id) =>
    dispatch(updateLocationIdAction(location_id)),

  updateLocationNameAction: updateLocationNameAction,
  updateLocationNameActionTemp: (location_name) =>
    dispatch(updateLocationNameAction(location_name)),

  updateSelectedLocationObjectAction: updateSelectedLocationObjectAction,
  updateSelectedLocationObjectActionTemp: (selected_location_object) =>
    dispatch(updateSelectedLocationObjectAction(selected_location_object)),

  getEventDetailsAction: getEventDetailsAction,
  getEventDetailsActionTemp: (selected_location_object) =>
    dispatch(getEventDetailsAction(selected_location_object)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventBox);
