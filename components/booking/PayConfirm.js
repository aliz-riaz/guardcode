import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
// import { updateBookingActiveStepAction } from "../../redux/actions/bookingAction";
import {
  setSubTotalForPayment,
  setUnlimitedRetakesTotalForPayment,
  setEFAWTotalForPayment,
  setDiscountForPayment,
  setTotalBillForPayment,
  setNoOfBookingsForFirstAidForPayment,
  setNoOfBookingsForUnlimitedRetakesForPayment,
} from "../../redux/actions/bookingAction";

var _ = require("lodash");
import Link from "next/link";
import { parse } from "cookie";

function PayConfirm(props) {
  let smartPlus = 0;
  let firstAid = 0;

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);
  const [startDate, setStartDate] = useState();

  const moment = require("moment");

  const basicTotal = () => {
    let subTotal = 0;
    let normal_price_temp = 0.0;
    if (props.selected_location_object.normal_price) {
      normal_price_temp = parseFloat(
        props.selected_location_object.normal_price.replace(/,/g, "")
      );
    }
    (subTotal = (props.number_of_seats * normal_price_temp)
      .toString()
      .match(/^-?\d+(?:\.\d{0,2})?/)[0]),
      props.setSubTotalForPayment(subTotal);
    return subTotal;
  };
  const calculateDiscount = () => {
    let discount = 0;
    if (
      props.is_discount_on_booking_enabled == 1 &&
      props.course_id != 61 &&
      props.number_of_seats >= props.no_of_bookings_to_avail_discount
    ) {
      discount = (
        parseFloat(
          parseFloat(basicTotal()) + parseFloat(calculateRetakesTotalBill())
        ) * parseFloat(parseFloat(props.discount_per_on_booking) / 100)
      ).toFixed(2);
      props.setDiscountForPayment(discount);
      return discount;
    } else {
      discount = parseFloat(0).toFixed(2);
      props.setDiscountForPayment(discount);
      return discount;
    }
  };
  const orderTotal = () => {
    let firstAidPrice = props.selected_location_object.efaw?.efaw_price ?? 0;
    let orderTotal = (
      parseFloat(basicTotal()) +
      parseFloat(calculateRetakesTotalBill()) +
      parseFloat(calculateEfawTotalBill()) -
      calculateDiscount()
    )
      .toString()
      .match(/^-?\d+(?:\.\d{0,2})?/)[0];
    props.setTotalBillForPayment(orderTotal);
    return orderTotal;
  };

  const calculateEfawTotalBill = () => {
    let firstAidPrice = props.selected_location_object.efaw?.efaw_price ?? 0;
    let efawTotal = (firstAidPrice * firstAid).toFixed(2);
    props.setNoOfBookingsForFirstAidForPayment(firstAid);
    props.setEFAWTotalForPayment(efawTotal);
    return efawTotal;
  };
  const calculateRetakesTotalBill = () => {
    // let unlimited_retake_price = props.course_id == 33 ? 50.0 : 60.0;
    let unlimited_retake_price =
      props.selected_location_object?.upgrade_price?.toFixed(0);

    let unlimited_retakes = (unlimited_retake_price * smartPlus).toFixed(2);
    props.setNoOfBookingsForUnlimitedRetakesForPayment(smartPlus);
    props.setUnlimitedRetakesTotalForPayment(unlimited_retakes);
    return unlimited_retakes;
  };

  const calculateCoursesBill = (attendees) => {
    smartPlus = 0;
    firstAid = 0;
    attendees.map((employee) => {
      employee.has_unlimited_retakes == true ? smartPlus++ : null;
      employee.has_efaw == true ? firstAid++ : null;
    });
  };

  const AttendeeRender = () => {
    const Attendeee = props.attendees.map((value, key) => {
      return (
        <div className="course_summary" key={value.id}>
          <Link href="/booking/step-3">
            <span className="edit_attenee">
              <img
                src={process.env.APP_URL + "/images/edit-2.svg"}
                alt="edit"
              />
            </span>
          </Link>
          <h5>Attendee #{value.id}</h5>
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
              {/* <span className="avatar">{value.first_name.charAt(0)+value.last_name.charAt(0)}</span>
                            <span className="course_name attendee_name">{value.first_name+' '+value.last_name}</span> */}
            </div>
          </div>
          <div className="course_summary_row mt-3">
            <div className="course_name--location">
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
              <span className="course_name">Course Fee</span>
            </div>
            <div className="course_price_summary addtional_amount">
              £ {props.selected_location_object.normal_price}
            </div>
          </div>
          {value.has_unlimited_retakes === true || value.has_efaw === true ? (
            <h5 className="pb-1 pt-2 mt-2">Additional training</h5>
          ) : (
            ""
          )}
          {value.has_efaw === true ? (
            <div className="course_summary_row mt-1">
              <div className="course_name--location">
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
                <span className="course_name">Emergency First Aid At Work</span>
              </div>
              <div className="course_price_summary addtional_amount">
                £{" "}
                {parseFloat(
                  props.selected_location_object.efaw?.efaw_price
                ).toFixed(2)}
              </div>
            </div>
          ) : (
            ""
          )}

          {value.has_unlimited_retakes === true ? (
            <div className="course_summary_row">
              <div className="course_name--location">
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
                <span className="course_name">Unlimited Retakes</span>
              </div>
              <div className="course_price_summary addtional_amount">
                £{/* {props.course_id == 33 ? 50.0 : 60.0} */}
                {props.selected_location_object?.upgrade_price?.toFixed(0)}
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
      <div className="d-block d-md-none step_heading">Pay & Confirm</div>
      <Row className="pt-5 pb-4 d-none d-md-block">
        <Col className="">
          <h3 className="text-center">Pay & Confirm</h3>
        </Col>
      </Row>
      <Row>
        <Col md="7" className="">
          <div className="booking_summary_card">
            <h4>Booking Summary</h4>
            <div className="course_summary">
              <h5 className="mb-0">Course</h5>

              <div className="course_summary_row">
                <div className="course_name--location">
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
                    {calculateCoursesBill(props.attendees)}
                    <span>
                      {props.selected_location_object.course_delivery_type == 3
                        ? "Personal Licence Training (APLH) - Virtual/Online Course"
                        : props.course_name}
                    </span>{" "}
                    <br />
                    {/* {basicPlan > 0 ? <><span>{props.course_name} - Basic</span> <br /></> : null} */}
                    {/* {smartPlus > 0 ? <><span>{props.course_name} - Smart Plus</span> <br /></> : null}  */}
                    {/* {firstAid > 0 ? <><span>Emergency First Aid at Work</span> <br /></> : null}  */}
                    {props.selected_location_object.course_delivery_type == 3
                      ? ""
                      : props.location_name}{" "}
                    {props.selected_location_object.course_delivery_type == 3
                      ? ""
                      : "-"}{" "}
                    {moment(
                      props.selected_location_object.start_date,
                      "YYYY-MM-DD"
                    ).format("DD MMMM YYYY")}
                  </span>
                </div>
                <div className="course_price_summary">
                  {/* <span>
                                    £{props.selected_location_object.normal_price} x {props.number_of_seats} = {basicTotal()}
                                    </span> */}
                  <br />
                  {/*{basicPlan > 0 ? <><span>
                                    £{props.selected_location_object.normal_price} x {basicPlan} = {props.selected_location_object.normal_price*basicPlan}
                                    </span><br /></> : null}
                                     {smartPlus > 0 ? <><span>
                                    £{props.selected_location_object.smart_plus_price} x {smartPlus} = {props.selected_location_object.smart_plus_price*smartPlus}
                                    </span><br /></> : null}
                                    {firstAid > 0 ? <><span>
                                    £{50} x {firstAid} = {50*firstAid}
                                    </span><br /></> : null} */}
                  {/* Order total: £{orderTotal()} */}
                </div>
              </div>
            </div>
            {AttendeeRender()}
          </div>
        </Col>
        <Col md="3" className="pl-md-0">
          <div className="booking_total_card">
            <p className="d-flex justify-content-between">
              <span>Sub Total</span>
              <span>
                <strong> £ {basicTotal()}</strong>
              </span>
            </p>
            <span></span>
            <p className="d-flex justify-content-between">
              {calculateEfawTotalBill() == 0 ? (
                ""
              ) : (
                <>
                  <span>Emergency First Aid At Work</span>
                  <span>
                    <strong>£ {calculateEfawTotalBill()}</strong>
                  </span>
                </>
              )}
              {/* <span>Emergency First Aid At Work</span>
                            <span><strong>£ {calculateEfawTotalBill()}</strong></span> */}
            </p>
            <p className="d-flex justify-content-between">
              {calculateRetakesTotalBill() == 0 ? (
                ""
              ) : (
                <>
                  <span>Unlimited Retakes</span>
                  <span>
                    <strong>£ {calculateRetakesTotalBill()}</strong>
                  </span>
                </>
              )}
              {/* <span>Unlimited Retakes</span>
                            <span><strong>£ {calculateRetakesTotalBill()}</strong></span> */}
            </p>

            <p className="d-flex justify-content-between">
              {props.is_discount_on_booking_enabled == 1 &&
              props.course_id != 61 &&
              props.number_of_seats >=
                props.no_of_bookings_to_avail_discount ? (
                <>
                  <span>Discount</span>
                  <span>
                    <strong>- £ {calculateDiscount()}</strong>
                  </span>
                </>
              ) : null}
              {/* <span>Unlimited Retakes</span>
                            <span><strong>£ {calculateRetakesTotalBill()}</strong></span> */}
            </p>
            <br />
            <p className="d-flex justify-content-between align-items-center mt-auto">
              <span>Total Amount</span>
              <span className="grand_total">
                <strong>£ {orderTotal()}</strong>
              </span>
            </p>
          </div>
        </Col>
      </Row>
    </>
  );
}

const mapStateToProps = (state) => ({
  attendees: state.vantage.bookingReducer.attendees,
  course_name: state.vantage.bookingReducer.course_name,
  course_id: state.vantage.bookingReducer.course_id,
  location_name: state.vantage.bookingReducer.location_name,
  number_of_seats: state.vantage.bookingReducer.number_of_seats,
  selected_location_object:
    state.vantage.bookingReducer.selected_location_object,
  is_discount_on_booking_enabled:
    state.vantage.userDataReducer.is_discount_on_booking_enabled,
  discount_per_on_booking:
    state.vantage.userDataReducer.discount_per_on_booking,
  no_of_bookings_to_avail_discount:
    state.vantage.userDataReducer.no_of_bookings_to_avail_discount,
});

const mapDispatchToProps = (dispatch) => ({
  setSubTotalForPayment: (subTotal) =>
    dispatch(setSubTotalForPayment(subTotal)),
  setUnlimitedRetakesTotalForPayment: (retakesTotal) =>
    dispatch(setUnlimitedRetakesTotalForPayment(retakesTotal)),
  setEFAWTotalForPayment: (efawTotal) =>
    dispatch(setEFAWTotalForPayment(efawTotal)),
  setDiscountForPayment: (discount) =>
    dispatch(setDiscountForPayment(discount)),
  setTotalBillForPayment: (totalBill) =>
    dispatch(setTotalBillForPayment(totalBill)),
  setNoOfBookingsForFirstAidForPayment: (noOfFirstAids) =>
    dispatch(setNoOfBookingsForFirstAidForPayment(noOfFirstAids)),
  setNoOfBookingsForUnlimitedRetakesForPayment: (noOfUnlimitedRetakes) =>
    dispatch(
      setNoOfBookingsForUnlimitedRetakesForPayment(noOfUnlimitedRetakes)
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(PayConfirm);
