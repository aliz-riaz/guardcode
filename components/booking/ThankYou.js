import React, { useState } from "react";
import { connect } from "react-redux";

import {
  Tooltip,
  Button,
  Row,
  Col,
  Table,
  Form,
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
} from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";

import { updateBookingActiveStepAction } from "../../redux/actions/bookingAction";
import Link from "next/link";

function ThankYou(props) {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);
  const moment = require("moment");

  const AttendeeRender = () => {
    const Attendeee = props.attendees.map((value, key) => {
      return (
        <div className="course_summary" key={value.id}>
          <div className="course_summary_row ">
            <div className="course_name--location attendee_info">
              <span className="avatar">
                {value.first_name.charAt(0).toUpperCase() +
                  value.last_name.charAt(0).toUpperCase()}
              </span>
              <span>
                {value.first_name.charAt(0).toUpperCase() +
                  value.first_name.slice(1) +
                  " " +
                  value.last_name.charAt(0).toUpperCase() +
                  value.last_name.slice(1)}
              </span>
            </div>
          </div>
          {value.has_efaw === true ? (
            <div className="course_summary_row">
              <div className="course_name--location additional_coverage">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <g fill="none" fillRule="evenodd">
                      <g fill="#3BD55A" fillRule="nonzero">
                        <g>
                          <path
                            d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM7 11.4L3.6 8 5 6.6l2 2 4-4L12.4 6 7 11.4z"
                            transform="translate(-1018.000000, -417.000000) translate(1018.000000, 417.000000)"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
                <span className="course_name addtional_course">
                  Emergency First Aid at Work
                </span>
              </div>
            </div>
          ) : (
            ""
          )}
          {value.has_unlimited_retakes === true ? (
            <div className="course_summary_row">
              <div className="course_name--location additional_coverage">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <g fill="none" fillRule="evenodd">
                      <g fill="#3BD55A" fillRule="nonzero">
                        <g>
                          <path
                            d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM7 11.4L3.6 8 5 6.6l2 2 4-4L12.4 6 7 11.4z"
                            transform="translate(-1018.000000, -417.000000) translate(1018.000000, 417.000000)"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
                <span className="course_name addtional_course">
                  Unlimited Retakes
                </span>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      );
    });
    return <>{Attendeee}</>;
  };
  return (
    <>
      <div className="d-block d-md-none step_heading">Thank You</div>
      <Row className="pt-5 pb-4 d-none d-md-block">
        <Col className="">
          <h2 className="text-center">Thank You</h2>
        </Col>
      </Row>
      <Row>
        <Col md="6" className="">
          <div className="booking_history_card">
            <h4>We’ve placed your bookings!</h4>
            <div className="course_summary">
              <h5 className="mb-0">Course</h5>
              <div className="course_summary_row">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <g fill="none" fillRule="evenodd">
                      <g fill="#3BD55A" fillRule="nonzero">
                        <g>
                          <path
                            d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM7 11.4L3.6 8 5 6.6l2 2 4-4L12.4 6 7 11.4z"
                            transform="translate(-1018.000000, -417.000000) translate(1018.000000, 417.000000)"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </span>
                <span className="course_name">
                  {props.selected_location_object.course_delivery_type == 3
                    ? "Personal Licence Training (APLH) - Virtual/Online Course"
                    : props.course_name}
                </span>{" "}
                <br />
                <span className="course_location course_name">
                  {props.selected_location_object.course_delivery_type == 3
                    ? null
                    : props.location_name}
                  {props.selected_location_object.course_delivery_type == 3
                    ? null
                    : "-"}
                  {moment(
                    props.selected_location_object.start_date,
                    "YYYY-MM-DD"
                  ).format("DD MMMM YYYY")}
                </span>
              </div>
            </div>
            {AttendeeRender()}
          </div>
          <div className="booking_history_card mt-3">
            <h4>Your receipt</h4>
            <div className="course_summary">
              <div className="course_summary_row align-items-center justify-content-center">
                <div className="course_name d-flex align-items-center">
                  <img
                    src={process.env.APP_URL + "/images/bill-icn.svg"}
                    alt=""
                  />
                  <p href="#" className="ml-2 mb-0 receipt_text">
                    Your receipt has been emailed to you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col md="6" className="">
          <div className="what_next">
            <h5>What happens next?</h5>
            <ul>
              <li>
                We’ll notify the attendees of their booking via email and SMS. A
                copy of their booking confirmation will also be sent to you.
              </li>

              <li>
                The instructions we send them will include the documents they
                need to bring and how to complete the course eLearning.
              </li>
              <li>
                You’ll be able to monitor their progress via your training
                dashboard.{" "}
              </li>
            </ul>
            <Link href="/dashboard" replace>
              <Button className="btn btn-sm btn-green">
                Take me to dashboard
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </>
  );
}

const mapStateToProps = (state) => ({
  attendees: state.vantage.bookingReducer.attendees,
  course_name: state.vantage.bookingReducer.course_name,
  location_name: state.vantage.bookingReducer.location_name,
  selected_location_object:
    state.vantage.bookingReducer.selected_location_object,
});

const mapDispatchToProps = (dispatch) => ({
  updateBookingActiveStepAction: updateBookingActiveStepAction,
  updateBookingActiveStepActionTemp: (current_step) =>
    dispatch(updateBookingActiveStepAction(current_step)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThankYou);
