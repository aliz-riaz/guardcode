import React, { useState, useEffect } from "react";
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
import {
  getPcaFindDataAction,
  getPcaRetriveDataAction,
  updateAttendeesShowErrorAction,
} from "../../redux/actions/bookingAction";
import { connect } from "react-redux";

function AttendeeCard(props) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [mobileValue, setMobileValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [UnlimitedRetakesValue, setUnlimitedRetakesValue] = useState(false);
  const [AddressValue, setAddressValue] = useState("");
  const [FirstAidValue, setFirstAidValue] = useState(false);
  const [AlreadyHasFirstAidValue, setAlreadyHasFirstAidValue] = useState(false);
  const [ShowFullAddreess, setShowFullAddreess] = useState(false);
  const [postal_code, setPostal_code] = useState("");
  const [postal_code_show_all, setPostal_code_show_all] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [pcaResponse, setPcaResponse] = useState([]);

  const [showPcaSugessions, setShowPcaSugessions] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  const moment = require("moment");

  useEffect(() => {
    if (mobileValue) {
      setMobileValue(mobileValue.slice(0, 11));
      if (mobileValue[0] != 0 && mobileValue.length > 0) {
        setMobileValue(`0${mobileValue}`);
      }
      if (props.attendees_show_error === false) {
        props.updateAttendeesShowErrorAction(true).then((resp0) => {});
      }
      if (mobileValue.length > 0) {
        props.AttendeeArray[props.dataObjectKey].phone = mobileValue;
      }

      var pattern = new RegExp(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g);
      if (mobileValue || !pattern.test(mobileValue)) {
        // if(event.target.value){
        if (pattern.test(mobileValue)) {
          props.AttendeeArray[props.dataObjectKey].phone_error = false;
          props.AttendeeArray[props.dataObjectKey].phone_error_message =
            "Mobile number is required";
        } else {
          props.AttendeeArray[props.dataObjectKey].phone_error = false;
          props.AttendeeArray[props.dataObjectKey].phone_error_message =
            "Mobile number is required";
        }
      } else {
        props.AttendeeArray[props.dataObjectKey].phone_error = true;
      }
      props.setAttendeeArray(props.AttendeeArray.filter((item) => item.id));
    }
  }, [mobileValue]);

  //  07th Sep 2022.
  useEffect(() => {
    if (props.dataObject.first_name)
      setFirstNameValue(props.dataObject.first_name);
    if (props.dataObject.last_name)
      setLastNameValue(props.dataObject.last_name);
    if (props.dataObject.phone) setMobileValue(props.dataObject.phone);
    if (props.dataObject.email) setEmailValue(props.dataObject.email);
    if (props.dataObject.has_unlimited_retakes)
      setUnlimitedRetakesValue(props.dataObject.has_unlimited_retakes);
    if (props.dataObject.address) setAddressValue(props.dataObject.address);
    if (props.dataObject.has_efaw) setFirstAidValue(props.dataObject.has_efaw);
    if (props.dataObject.already_has_first_aid)
      setAlreadyHasFirstAidValue(props.dataObject.already_has_first_aid);
    if (props.dataObject.show_full_addreess)
      setShowFullAddreess(props.dataObject.show_full_addreess);
    if (props.dataObject.postal_code)
      setPostal_code(props.dataObject.postal_code);
    if (props.dataObject.postal_code_show_all)
      setPostal_code_show_all(props.dataObject.postal_code_show_all);
    if (props.dataObject.address1) setAddress1(props.dataObject.address1);
    if (props.dataObject.address2) setAddress2(props.dataObject.address2);
    if (props.dataObject.city) setCity(props.dataObject.city);
  }, []);
  const showFullAddressDivClickHandler = () => {
    if (!ShowFullAddreess) {
      props.AttendeeArray[props.dataObjectKey].show_full_addreess = true;
    } else {
      props.AttendeeArray[props.dataObjectKey].show_full_addreess = false;
    }
    setShowFullAddreess(!ShowFullAddreess);
    props.setAttendeeArray(props.AttendeeArray.filter((item) => item.id));
  };

  // const deleteAttendeeCardHandler = () =>{
  //     props.setAttendeeArray(props.AttendeeArray.filter((item, index) => item.id !== props.dataObject.id));
  // }
  const firstNameValueHandleChange = (event) => {
    if (props.attendees_show_error === false) {
      props.updateAttendeesShowErrorAction(true).then((resp0) => {});
    }
    event.target.value = event.target.value.slice(0, event.target.maxLength);
    setFirstNameValue(event.target.value);
    props.AttendeeArray[props.dataObjectKey].first_name = event.target.value;
    if (event.target.value) {
      props.AttendeeArray[props.dataObjectKey].first_name_error = false;
    } else {
      props.AttendeeArray[props.dataObjectKey].first_name_error = true;
    }
    props.setAttendeeArray(props.AttendeeArray.filter((item) => item.id));
  };
  const lastNameValueHandleChange = (event) => {
    if (props.attendees_show_error === false) {
      props.updateAttendeesShowErrorAction(true).then((resp0) => {});
    }
    event.target.value = event.target.value.slice(0, event.target.maxLength);

    setLastNameValue(event.target.value);
    props.AttendeeArray[props.dataObjectKey].last_name = event.target.value;
    if (event.target.value) {
      props.AttendeeArray[props.dataObjectKey].last_name_error = false;
    } else {
      props.AttendeeArray[props.dataObjectKey].last_name_error = true;
    }
    props.setAttendeeArray(props.AttendeeArray.filter((item) => item.id));
  };
  const mobileValueHandleChange = (event) => {
    setMobileValue(event.target.value);
  };
  const emailValueHandleChange = (event) => {
    if (props.attendees_show_error === false) {
      props.updateAttendeesShowErrorAction(true).then((resp0) => {});
    }
    event.target.value = event.target.value.slice(0, event.target.maxLength);
    setEmailValue(event.target.value);
    props.AttendeeArray[props.dataObjectKey].email = event.target.value;

    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    if (event.target.value || !pattern.test(event.target.value)) {
      if (!pattern.test(event.target.value)) {
        props.AttendeeArray[props.dataObjectKey].email_error = true;
        props.AttendeeArray[props.dataObjectKey].email_error_message =
          "Please enter a valid email address";
      } else if (pattern.test(event.target.value)) {
        props.AttendeeArray[props.dataObjectKey].email_error = false;
        props.AttendeeArray[props.dataObjectKey].email_error_message =
          "Email Address is required";
      } else {
        props.AttendeeArray[props.dataObjectKey].email_error = false;
        props.AttendeeArray[props.dataObjectKey].email_error_message =
          "Email Address is required";
      }
    } else {
      props.AttendeeArray[props.dataObjectKey].email_error = true;
    }
    props.setAttendeeArray(props.AttendeeArray.filter((item) => item.id));
  };

  const unlimitedRetakesValueHandleClick = (event) => {
    if (event.target.value == 2) {
      props.AttendeeArray[props.dataObjectKey].plan_id =
        props.course_id == 61 || props.course_id == 33 ? 2 : 4;
      props.AttendeeArray[props.dataObjectKey].has_unlimited_retakes = false;
      setUnlimitedRetakesValue(false);
    } else {
      props.AttendeeArray[props.dataObjectKey].has_unlimited_retakes = true;
      props.AttendeeArray[props.dataObjectKey].plan_id =
        props.course_id == 33 ? 7 : 11;
      setUnlimitedRetakesValue(true);
    }
    props.AttendeeArray[props.dataObjectKey].plan_error = false;
    props.setAttendeeArray(props.AttendeeArray.filter((item) => item.id));
  };

  const addressValueHandleChange = (event) => {
    if (props.attendees_show_error === false) {
      props.updateAttendeesShowErrorAction(true).then((resp0) => {});
    }
    setAddressValue(event.target.value);
    props.AttendeeArray[props.dataObjectKey].address = event.target.value;
    props.AttendeeArray[props.dataObjectKey].address1 = event.target.value;
    if (event.target.value) {
      props.AttendeeArray[props.dataObjectKey].address_error = false;
    } else {
      props.AttendeeArray[props.dataObjectKey].address_error = true;
    }
    props.setAttendeeArray(props.AttendeeArray.filter((item) => item.id));
  };
  const firstAidValueHandleClick = (event) => {
    setFirstAidValue(!FirstAidValue);
    setAlreadyHasFirstAidValue(false);
    if (FirstAidValue) {
      props.AttendeeArray[props.dataObjectKey].efaw_error = true;
    } else {
      props.AttendeeArray[props.dataObjectKey].efaw_error = false;
    }
    props.AttendeeArray[props.dataObjectKey].has_efaw = !FirstAidValue;
    props.AttendeeArray[props.dataObjectKey].already_has_first_aid = false;
    props.setAttendeeArray(props.AttendeeArray.filter((item) => item.id));
  };
  const alreadyHasFirstAidValueHandleClick = (event) => {
    setAlreadyHasFirstAidValue(!AlreadyHasFirstAidValue);
    setFirstAidValue(false);
    if (AlreadyHasFirstAidValue) {
      props.AttendeeArray[props.dataObjectKey].efaw_error = true;
    } else {
      props.AttendeeArray[props.dataObjectKey].efaw_error = false;
    }
    props.AttendeeArray[props.dataObjectKey].already_has_first_aid =
      !AlreadyHasFirstAidValue;
    props.AttendeeArray[props.dataObjectKey].has_efaw = false;
    props.setAttendeeArray(props.AttendeeArray.filter((item) => item.id));
  };

  const postal_codeValueHandleChange = (event, is_request = true) => {
    if (is_request) {
      if (event.target.value) {
        props
          .getPcaFindDataActionTemp(event.target.value)
          .then((response_item) => {
            if (event.target.value == response_item.code) {
              setPcaResponse(response_item.data);
              setShowPcaSugessions(true);
            }
          });
      }
    }

    setPostal_code(event.target.value);
    props.AttendeeArray[props.dataObjectKey].postal_code = event.target.value;
    if (event.target.value) {
      props.AttendeeArray[props.dataObjectKey].postal_code_error = false;
    } else {
      props.AttendeeArray[props.dataObjectKey].postal_code_error = true;
    }
    props.setAttendeeArray(props.AttendeeArray.filter((item) => item.id));
  };

  const address1ValueHandleChange = (event, is_request = true) => {
    if (is_request) {
      if (event.target.value) {
        props
          .getPcaFindDataActionTemp(event.target.value)
          .then((response_item) => {
            if (event.target.value == response_item.code) {
              setPcaResponse(response_item.data);
              setShowPcaSugessions(true);
            }
          });
      }
    }
    setAddress1(event.target.value);
    props.AttendeeArray[props.dataObjectKey].address1 = event.target.value;
    if (event.target.value) {
      props.AttendeeArray[props.dataObjectKey].address1_error = false;
    } else {
      props.AttendeeArray[props.dataObjectKey].address1_error = true;
    }
    props.setAttendeeArray(props.AttendeeArray.filter((item) => item.id));
  };

  const address2ValueHandleChange = (event, is_request = true) => {
    if (is_request) {
      if (event.target.value) {
        props
          .getPcaFindDataActionTemp(event.target.value)
          .then((response_item) => {
            if (event.target.value == response_item.code) {
              setPcaResponse(response_item.data);
              setShowPcaSugessions(true);
            }
          });
      }
    }
    // if(event.target.value){
    setAddress2(event.target.value);
    props.AttendeeArray[props.dataObjectKey].address2 = event.target.value;
    props.setAttendeeArray(props.AttendeeArray.filter((item) => item.id));
    // }
  };

  const cityValueHandleChange = (event, is_request = true) => {
    if (is_request) {
      if (event.target.value) {
        props
          .getPcaFindDataActionTemp(event.target.value)
          .then((response_item) => {
            if (event.target.value == response_item.code) {
              setPcaResponse(response_item.data);
              setShowPcaSugessions(true);
            }
          });
      }
    }
    setCity(event.target.value);
    props.AttendeeArray[props.dataObjectKey].city = event.target.value;
    if (event.target.value) {
      props.AttendeeArray[props.dataObjectKey].city_error = false;
    } else {
      props.AttendeeArray[props.dataObjectKey].city_error = true;
    }
    props.setAttendeeArray(props.AttendeeArray.filter((item) => item.id));
  };

  const pcaSugessionHandleClick = (value) => {
    if (value.Type != "Address") {
      props
        .getPcaFindDataActionTemp(postal_code, value.Id)
        .then((response_item) => {
          setPcaResponse(response_item.data);
        });
    } else {
      props.getPcaRetriveDataActionTemp(value.Id).then((response_item) => {
        postal_codeValueHandleChange(
          { target: { value: response_item[0].PostalCode } },
          false
        );
        cityValueHandleChange(
          { target: { value: response_item[0].City } },
          false
        );
        let address1 =
          response_item[0].Line1 +
          (response_item[0].Line2 ? ", " : "") +
          response_item[0].Line2;
        address1ValueHandleChange({ target: { value: address1 } }, false);
        let address2 = "";
        if (response_item[0].Line3) {
          address2 = response_item[0].Line3;
        } else {
          address2 = "";
        }
        address2ValueHandleChange({ target: { value: address2 } }, false);
        setShowPcaSugessions(false);
        props.AttendeeArray[props.dataObjectKey].postal_code_show_all = true;
        props.setAttendeeArray(props.AttendeeArray.filter((item) => item.id));
        setPostal_code_show_all(true);
      });
    }
  };

  return (
    <>
      <div
        className="attendee_card"
        id={"scroll-to-attendee-card-" + props.dataObject.id}
      >
        <div className="attendees_info">
          <h4>Attendee #{props.dataObject.id}</h4>
          {/* <h4 className="text-danger text-right" onClick={() => deleteAttendeeCardHandler()}>Delete #{(props.dataObject.id)}</h4> */}
          <Row>
            <Col md="6">
              <FormGroup className="gl-input">
                <input
                  type="text"
                  name="first_name"
                  value={firstNameValue}
                  onChange={firstNameValueHandleChange}
                  className="form-control"
                  placeholder="First Name"
                  maxLength="50"
                />
                <label>First Name</label>
                {props.dataObject.first_name_error === true ? (
                  <span className="text-danger">
                    {props.dataObject.first_name_error_message}
                  </span>
                ) : (
                  ""
                )}
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup className="gl-input">
                <input
                  type="text"
                  name="last_name"
                  value={lastNameValue}
                  onChange={lastNameValueHandleChange}
                  className="form-control"
                  placeholder="Last Name"
                  maxLength="50"
                />
                <label>Last Name</label>
                {props.dataObject.last_name_error === true ? (
                  <span className="text-danger">
                    {props.dataObject.last_name_error_message}
                  </span>
                ) : (
                  ""
                )}
              </FormGroup>
            </Col>
            <Col md="6">
              <div className="d-flex">
                <span className="img attendee">
                  <img src={process.env.APP_URL + "/images/uk.svg"} />
                </span>
                <FormGroup className="gl-input with-img">
                  <input
                    type="number"
                    name="phone"
                    value={mobileValue}
                    onChange={mobileValueHandleChange}
                    className="form-control"
                    placeholder="Mobile Number"
                    maxLength="11"
                  />

                  <label>Mobile Number</label>
                  {props.dataObject.phone_error === true ? (
                    <span className="text-danger">
                      {props.dataObject.phone_error_message}
                    </span>
                  ) : (
                    ""
                  )}
                </FormGroup>
              </div>
            </Col>
            <Col md="6">
              <FormGroup className="gl-input">
                <input
                  type="email"
                  name="email"
                  value={emailValue}
                  onChange={emailValueHandleChange}
                  className="form-control"
                  placeholder="Email Address"
                  maxLength="50"
                />
                <label>Email Address</label>
                {props.dataObject.email_error === true ? (
                  <span className="text-danger">
                    {props.dataObject.email_error_message}
                  </span>
                ) : (
                  ""
                )}
              </FormGroup>
            </Col>
          </Row>
          {props.course_id != 33
            ? props.selected_location_object.direct_checkout == 0 &&
              (props.selected_location_object.enable_gold == 1 ||
                props.selected_location_object.enable_platinum == 1)
              ? ""
              : UnlimitedRetakesValue == true
              ? setUnlimitedRetakesValue(false)
              : ""
            : ""}
          {props.course_id != 33 ? (
            props.selected_location_object.direct_checkout == 0 &&
            (props.selected_location_object.enable_gold == 1 ||
              props.selected_location_object.enable_platinum == 1) ? (
              <>
                <h4 className="p-md-0">Select Plan</h4>
                <Row>
                  <Col md="6">
                    <div
                      className={`unlimited_retakes_box w-100 border_golden`}
                    >
                      <div className="most_popular">
                        <div className="mr-1">
                          <img
                            src={`${process.env.APP_URL}/images/hearts-suit.svg`}
                            // width="15px"
                          />
                        </div>
                        <div>MOST POPULAR</div>
                      </div>
                      <FormGroup check className="gl-radio">
                        <Label check className="w-100">
                          <span className="d-flex fw-medium text-dark">
                            <span className="fw-bold display-6">
                              Gold
                              {/* <span
                              className="fs-3 position-absolute"
                              style={{ margin: "-8px 8px 0", top: "0" }}
                            >
                              🚀
                            </span> */}
                            </span>
                            <span className={`ml-auto`}>
                              £{/* {props.course_id == 33 ? 50 : 60} */}
                              {props.selected_location_object?.upgrade_price?.toFixed(
                                0
                              )}
                            </span>
                          </span>

                          <Input
                            type="radio"
                            name={`has_unlimited_retakes-${props.dataObjectKey}`}
                            value="1"
                            onClick={unlimitedRetakesValueHandleClick}
                            checked={
                              props.AttendeeArray[props.dataObjectKey]
                                .plan_id == 7 ||
                              props.AttendeeArray[props.dataObjectKey]
                                .plan_id == 11
                                ? true
                                : false
                            }
                          />
                          <span className="checkmark"></span>
                          <span className="text-black-50">
                            <ul className="list-unstyled mb-0 fw-medium text-dark mt-1">
                              <li>
                                <img
                                  src={`${process.env.APP_URL}/images/tick-check.svg`}
                                  width="15px"
                                />{" "}
                                Results available within 7 working days
                              </li>
                              <li>
                                <img
                                  src={`${process.env.APP_URL}/images/tick-check.svg`}
                                  width="15px"
                                />{" "}
                                Unlimited exam retakes at no extra cost
                              </li>
                              <li>
                                <img
                                  src={`${process.env.APP_URL}/images/tick-check.svg`}
                                  width="15px"
                                />{" "}
                                Rescheduling allowed up to 72 hrs before start
                              </li>
                              <li>
                                <img
                                  src={`${process.env.APP_URL}/images/tick-check.svg`}
                                  width="15px"
                                />{" "}
                                Paperback course book included
                              </li>
                            </ul>
                          </span>
                        </Label>
                      </FormGroup>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className={`unlimited_retakes_box w-100 mt-3 mt-md-0`}>
                      <FormGroup check className="gl-radio">
                        <Label check className="w-100">
                          <span className="d-flex fw-medium text-dark">
                            <span className="fw-bold display-6">Bronze </span>
                          </span>

                          <Input
                            type="radio"
                            name={`has_unlimited_retakes-${props.dataObjectKey}`}
                            value="2"
                            onClick={unlimitedRetakesValueHandleClick}
                            checked={
                              props.AttendeeArray[props.dataObjectKey]
                                .plan_id == 2 ||
                              props.AttendeeArray[props.dataObjectKey]
                                .plan_id == 4
                                ? true
                                : false
                            }
                          />
                          <span className="checkmark"></span>
                          <span className="text-black-50">
                            <ul className="list-unstyled mb-0 fw-medium text-dark mt-1">
                              <li>
                                <img
                                  src={`${process.env.APP_URL}/images/c-delete.svg`}
                                  width="15px"
                                />{" "}
                                Results available within 14 working days
                              </li>
                              <li>
                                <img
                                  src={`${process.env.APP_URL}/images/c-delete.svg`}
                                  width="15px"
                                />{" "}
                                Exam retake fee £100
                              </li>
                              <li>
                                <img
                                  src={`${process.env.APP_URL}/images/c-delete.svg`}
                                  width="15px"
                                />{" "}
                                Rescheduling not allowed
                              </li>
                              <li>
                                <img
                                  src={`${process.env.APP_URL}/images/c-delete.svg`}
                                  width="15px"
                                />{" "}
                                Course eBook provided in pdf format
                              </li>
                            </ul>
                          </span>
                        </Label>
                      </FormGroup>
                    </div>
                  </Col>
                </Row>
                {props.dataObject.plan_error === true && (
                  <span className="text-danger">
                    {props.dataObject.plan_error_text}
                  </span>
                )}
              </>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {props.course_id == 33 &&
          props.selected_location_object.enable_flexi_plus == 1 ? (
            <>
              <h4 className="p-md-0">Select Plan</h4>
              <Row>
                <Col md="6">
                  <div className={`unlimited_retakes_box w-100 border_golden`}>
                    <div className="most_popular">
                      <div className="mr-1">
                        <img
                          src={`${process.env.APP_URL}/images/hearts-suit.svg`}
                          // width="15px"
                        />
                      </div>
                      <div>MOST POPULAR</div>
                    </div>
                    <FormGroup check className="gl-radio">
                      <Label check className="w-100">
                        <span className="d-flex fw-medium text-dark">
                          <span className="fw-bold display-6">
                            Gold
                            {/* <span
                              className="fs-3 position-absolute"
                              style={{ margin: "-8px 8px 0", top: "0" }}
                            >
                              🚀
                            </span> */}
                          </span>
                          <span className={`ml-auto`}>
                            £{/* {props.course_id == 33 ? 50 : 60} */}
                            {props.selected_location_object?.upgrade_price?.toFixed(
                              0
                            )}
                          </span>
                        </span>

                        <Input
                          type="radio"
                          name={`has_unlimited_retakes-${props.dataObjectKey}`}
                          value="1"
                          onClick={unlimitedRetakesValueHandleClick}
                          checked={
                            props.AttendeeArray[props.dataObjectKey].plan_id ==
                              7 ||
                            props.AttendeeArray[props.dataObjectKey].plan_id ==
                              11
                              ? true
                              : false
                          }
                        />
                        <span className="checkmark"></span>
                        <span className="text-black-50">
                          <ul className="list-unstyled mb-0 fw-medium text-dark mt-1">
                            <li>
                              <img
                                src={`${process.env.APP_URL}/images/tick-check.svg`}
                                width="15px"
                              />{" "}
                              Results available within 7 working days
                            </li>
                            <li>
                              <img
                                src={`${process.env.APP_URL}/images/tick-check.svg`}
                                width="15px"
                              />{" "}
                              Unlimited exam retakes at no extra cost
                            </li>
                            <li>
                              <img
                                src={`${process.env.APP_URL}/images/tick-check.svg`}
                                width="15px"
                              />{" "}
                              Rescheduling allowed up to 72 hrs before start
                            </li>
                            <li>
                              <img
                                src={`${process.env.APP_URL}/images/tick-check.svg`}
                                width="15px"
                              />{" "}
                              Paperback course book included
                            </li>
                          </ul>
                        </span>
                      </Label>
                    </FormGroup>
                  </div>
                </Col>
                <Col md="6">
                  <div className={`unlimited_retakes_box w-100 mt-3 mt-md-0`}>
                    <FormGroup check className="gl-radio">
                      <Label check className="w-100">
                        <span className="d-flex fw-medium text-dark">
                          <span className="fw-bold display-6">Bronze </span>
                        </span>

                        <Input
                          type="radio"
                          name={`has_unlimited_retakes-${props.dataObjectKey}`}
                          value="2"
                          onClick={unlimitedRetakesValueHandleClick}
                          checked={
                            props.AttendeeArray[props.dataObjectKey].plan_id ==
                              2 ||
                            props.AttendeeArray[props.dataObjectKey].plan_id ==
                              4
                              ? true
                              : false
                          }
                        />
                        <span className="checkmark"></span>
                        <span className="text-black-50">
                          <ul className="list-unstyled mb-0 fw-medium text-dark mt-1">
                            <li>
                              <img
                                src={`${process.env.APP_URL}/images/c-delete.svg`}
                                width="15px"
                              />{" "}
                              Results available within 14 working days
                            </li>
                            <li>
                              <img
                                src={`${process.env.APP_URL}/images/c-delete.svg`}
                                width="15px"
                              />{" "}
                              Exam retake fee £100
                            </li>
                            <li>
                              <img
                                src={`${process.env.APP_URL}/images/c-delete.svg`}
                                width="15px"
                              />{" "}
                              Rescheduling not allowed
                            </li>
                            <li>
                              <img
                                src={`${process.env.APP_URL}/images/c-delete.svg`}
                                width="15px"
                              />{" "}
                              Course eBook provided in pdf format
                            </li>
                          </ul>
                        </span>
                      </Label>
                    </FormGroup>
                  </div>
                </Col>
              </Row>
              {props.dataObject.plan_error === true && (
                <span className="text-danger">
                  {props.dataObject.plan_error_text}
                </span>
              )}
            </>
          ) : null}
        </div>
        <div className="attendees_info">
          <h4 className="bg-transparent mb-0 pb-0">Address</h4>
          {ShowFullAddreess === true ? (
            <Row className="mt-2">
              <Col md="6">
                <FormGroup className="gl-input">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Postal code"
                    value={postal_code}
                    autoComplete="none"
                    onChange={postal_codeValueHandleChange}
                  />
                  <label>Postcode</label>
                  {showPcaSugessions === true &&
                  !_.isEmpty(pcaResponse) === true ? (
                    <div className="custom-dropdown address-auto-complete">
                      <ul>
                        <li
                          onClick={() =>
                            setShowPcaSugessions(!showPcaSugessions)
                          }
                          className="closelist"
                        >
                          ✕
                        </li>
                        {pcaResponse.map((value, index) => {
                          return (
                            <li onClick={() => pcaSugessionHandleClick(value)}>
                              {value.Text + " " + value.Description}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                  {props.dataObject.postal_code_error === true ? (
                    <span className="text-danger">
                      {props.dataObject.postal_code_error_text}
                    </span>
                  ) : (
                    ""
                  )}
                </FormGroup>
              </Col>
              {postal_code_show_all === true ? (
                <>
                  <Col md="6">
                    <FormGroup className="gl-input">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address Line 1"
                        value={address1}
                        autoComplete="none"
                        onChange={address1ValueHandleChange}
                      />
                      <label>Address Line 1</label>
                      {props.dataObject.address1_error === true ? (
                        <span className="text-danger">
                          {props.dataObject.address1_error_text}
                        </span>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup className="gl-input">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address Line 2"
                        value={address2}
                        autoComplete="none"
                        onChange={address2ValueHandleChange}
                      />
                      <label>Address Line 2</label>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup className="gl-input">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="City/State"
                        value={city}
                        autoComplete="none"
                        onChange={cityValueHandleChange}
                      />
                      <label>City/State</label>
                      {props.dataObject.city_error === true ? (
                        <span className="text-danger">
                          {props.dataObject.city_error_text}
                        </span>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                  </Col>
                </>
              ) : (
                ""
              )}
            </Row>
          ) : (
            <Row>
              <Col>
                <FormGroup className="gl-input-simple address-input">
                  <input
                    type="text"
                    name="address"
                    value={AddressValue}
                    onChange={addressValueHandleChange}
                    className="form-control"
                    placeholder="Address"
                    readOnly
                  />
                  <span className="default_address">Default</span>
                  <span
                    className="change_address"
                    onClick={showFullAddressDivClickHandler}
                  >
                    {" "}
                    Change
                  </span>
                  {props.dataObject.address_error === true ? (
                    <span className="text-danger">
                      {props.dataObject.address_error_message}
                    </span>
                  ) : (
                    ""
                  )}
                </FormGroup>
              </Col>
            </Row>
          )}
        </div>
        {props.selected_location_object.efaw ? (
          <div className="attendees_info">
            <h4 className="bg-transparent">
              First aid requirement
              <Tooltip
                placement="top"
                className="attende_tooltop"
                isOpen={tooltipOpen}
                autohide={false}
                target="attendee_1"
                toggle={toggle}
              >
                From the 1st of April 2021, First Aid training is a legal
                requirement for all SIA Door Supervisor and Security Guarding
                Candidates. You can add this course as part of the training
                package for this candidate and the First Aid course will be
                delivered during the same course dates. If the candidate already
                has a First Aid qualification, they must bring the certificate
                with them to the course. The certificate must not expire before{" "}
                {moment().add("years", 1).format("Do MMMM YYYY")}.
              </Tooltip>
              <i id="attendee_1">
                <img
                  src={process.env.APP_URL + "/images/info.svg"}
                  alt="INFO"
                />
              </i>
            </h4>

            <Row>
              <Col>
                <FormGroup className="gl-checkbox mb-3">
                  <Label check>
                    <span className="">
                      Add first aid to the course plan - £
                      {props?.selected_location_object?.efaw?.efaw_price}
                    </span>
                    <Input
                      type="radio"
                      name={"radio1" + props.dataObject.id}
                      onClick={firstAidValueHandleClick}
                      checked={FirstAidValue}
                    />
                    <span className="checkmark"></span>
                  </Label>
                </FormGroup>
                <FormGroup className="gl-checkbox">
                  <Label check>
                    <span className="">
                      Attendee already has a valid First Aid qualification
                    </span>
                    <Input
                      type="radio"
                      name={"radio1" + props.dataObject.id}
                      onClick={alreadyHasFirstAidValueHandleClick}
                      checked={AlreadyHasFirstAidValue}
                    />
                    <span className="checkmark"></span>
                  </Label>
                  {props.dataObject.efaw_error === true ? (
                    <span className="text-danger">
                      {props.dataObject.efaw_error_message}
                    </span>
                  ) : (
                    ""
                  )}
                </FormGroup>
              </Col>
            </Row>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  pca_response: state.vantage.bookingReducer.pca_response,
  selected_location_object:
    state.vantage.bookingReducer.selected_location_object,
  attendees_show_error: state.vantage.bookingReducer.attendees_show_error,
  course_id: state.vantage.bookingReducer.course_id,
});

const mapDispatchToProps = (dispatch) => ({
  getPcaFindDataAction: getPcaFindDataAction,
  getPcaFindDataActionTemp: (text, Container) =>
    dispatch(getPcaFindDataAction(text, Container)),

  getPcaRetriveDataAction: getPcaRetriveDataAction,
  getPcaRetriveDataActionTemp: (text) =>
    dispatch(getPcaRetriveDataAction(text)),
  updateAttendeesShowErrorAction: (status) =>
    dispatch(updateAttendeesShowErrorAction(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AttendeeCard);
