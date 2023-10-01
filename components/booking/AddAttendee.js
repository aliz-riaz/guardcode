import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import AttendeeCard from "./AttendeeCard.js";
import { updateAttendeesAction } from "../../redux/actions/bookingAction";

function AddAttendee(props) {
  const [AttendeeArray, setAttendeeArray] = useState(
    props.attendees.length > 0 ? props.attendees : []
  );
  let Attendee_Array = [];

  const AddAttendeeHandler = (i) => {
    let newElement = {
      id: i,
      first_name: "",
      first_name_error: false,
      first_name_error_message: "First name is required",
      last_name: "",
      last_name_error: false,
      last_name_error_message: "Last name is required",
      phone: "",
      phone_error: false,
      phone_error_message: "Mobile number is required",
      email: "",
      email_error: false,
      email_error_message: "Email Address is required",
      has_unlimited_retakes: false,
      address:
        props.city +
        " " +
        props.address1 +
        " " +
        props.address2 +
        ", " +
        props.postcode,
      address_error: false,
      address_error_message: "Address is required",
      show_full_addreess: false,
      has_efaw: false,
      efaw_error: false,
      efaw_error_message: "Please select one of above",
      already_has_first_aid: false,
      postal_code: "" + props.postcode,
      postal_code_error: false,
      postal_code_error_text: "Postcode is required",
      postal_code_show_all: false,
      address1: "" + props.address1,
      address1_error: false,
      address1_error_text: "Address1 is required",
      address2: "" + props.address2,
      city: "" + props.city,
      city_error: false,
      city_error_text: "City is required",
      // plan_id: props.course_id == 61 || props.course_id == 33 ? 2 : 4,
      plan_id:
        props.selected_location_object.direct_checkout == 0 &&
        props.selected_location_object.enable_gold == 1
          ? ""
          : props.course_id == 61 || props.course_id == 33
          ? 2
          : 4,
      plan_error: false,
      plan_error_text: "Please select a plan",
    };
    Attendee_Array.push(newElement);
  };

  useEffect(() => {
    // if(AttendeeArray.length == (props.number_of_seats)){
    props.updateAttendeesActionTemp(AttendeeArray).then((resp0) => {});
    // }
  }, [AttendeeArray]);
  useEffect(() => {
    if (props.number_of_seats != props.attendees.length) {
      if (props.number_of_seats < props.attendees.length) {
        setAttendeeArray(props.attendees.slice(0, props.number_of_seats));
      } else {
        for (let i = 1; i <= parseInt(props.number_of_seats); i++) {
          AddAttendeeHandler(i);
        }
        setAttendeeArray(Attendee_Array);
      }
    }
  }, []);

  const removeAttende = () => {
    props.updateAttendeesActionTemp([]).then((resp0) => {});
  };

  const AttendeeRender = () => {
    const Attendeee = props.attendees.map((value, key) => {
      return (
        <AttendeeCard
          dataObject={value}
          dataObjectKey={key}
          key={value.id}
          AttendeeArray={AttendeeArray}
          setAttendeeArray={setAttendeeArray}
          selected_location_object={props.selected_location_object}
        />
      );
    });
    return <>{Attendeee}</>;
  };

  return (
    <>
      <div className="d-block d-md-none step_heading">
        Add attendee information{" "}
      </div>
      <div className="booking_attendee_main">
        <h3 className="text-center d-none d-md-block">
          Add attendee information
        </h3>
        {/* <h3 className="text-center d-none d-md-block">Add attendee information</h3> */}
        {AttendeeRender()}
        {/* {JSON.stringify(props.selected_location_object)} */}
        {/* <button className="btn btn-success" onClick={() => AddAttendeeHandler()}>Add More Attendee</button> */}
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  attendees: state.vantage.bookingReducer.attendees,
  course_id: state.vantage.bookingReducer.course_id,
  selected_location_object:
    state.vantage.bookingReducer.selected_location_object,
  number_of_seats: state.vantage.bookingReducer.number_of_seats,
  postcode: state.vantage.userDataReducer.postcode,
  city: state.vantage.userDataReducer.city,
  address1: state.vantage.userDataReducer.address1,
  address2: state.vantage.userDataReducer.address2,
  selected_location_object:
    state.vantage.bookingReducer.selected_location_object,
});

const mapDispatchToProps = (dispatch) => ({
  updateAttendeesAction: updateAttendeesAction,
  updateAttendeesActionTemp: (attendees) =>
    dispatch(updateAttendeesAction(attendees)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAttendee);
