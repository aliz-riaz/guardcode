import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from "react-bootstrap/Modal";
import {
  Container,
  Row,
  Col,
  FormGroup,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import * as yup from "yup";
import { Formik, Field, Form } from "formik";
import "react-rangeslider/lib/index.css";
import Slider from "react-rangeslider";
import { Spinner } from "react-bootstrap";
import { useIntercom } from "react-use-intercom";

import {
  getAllCourses,
  getLocation,
  quotationSubmit,
} from "../../redux/actions/main";

import styles from "./Quotation.module.scss";

let compnaySchema = yup.object().shape({
  course: yup.string().required("Please select course"),
  location: yup.string().required("Please select location"),
  trainees: yup.string().required("Please select at least one trainee"),

  companyName: yup.string().required("Please enter company name"),
  yourName: yup.string().required("Please enter your full name"),
  yourEmail: yup
    .string()
    .email("Please enter a valid email address")
    .required("Please enter email address"),
  contactNumber: yup
    .string()
    .required("Please enter contact no")
    .test(
      "len",
      "Please enter a valid contact no",
      (val) => val?.toString()?.length >= 10 && val?.toString()?.length <= 11
    ),
});

const Quotation = (props) => {
  const [courseList, setCourseList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [calculatedData, setCalculatedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [courseId, setCourseId] = useState("");
  const [location, setLocation] = useState("");
  const [volume, setVolume] = useState(2);
  const [companyName, setCompanyName] = useState("");
  const [yourName, setYourName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    setCalculatedData([]);
    setCompanyName("");
    setYourName("");
    setEmail("");
    setContact("");
  };

  const { show } = useIntercom();

  const toggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const showChat = () => {
    show();
    // $crisp.push(["do", "chat:toggle"])
  };

  useEffect(async () => {
    const coursesData = await props.getAllCourses();
    setCourseList(coursesData);
  }, []);

  useEffect(async () => {
    if (courseId > 0) {
      setLoading(true);
      setLocation("");
      const coursesLocation = await props.getLocation(courseId);
      setLocationList(coursesLocation);
      setLoading(false);
    } else {
      setLocationList([]);
      setLocation("");
    }
  }, [courseId]);

  return (
    <section className={`${styles.quote_section}`}>
      <Container>
        <Row>
          <Col className="col-12 col-lg-7">
            <h2 className={`fs-1 fw-normal`}>Staff training? Sorted!</h2>
            <h3 className="fs-2 fw-normal">
              You’ll never have to worry about your staff training needs with
              Get Licensed, empowering the largest security training network in
              the UK with over 85 locations nationwide!
            </h3>
          </Col>

          <Col className="col-12 col-lg-12 mt-5">
            <div className={`${styles.instant_quote}`}>
              <Formik
                enableReinitialize={true}
                htmlFor="amazing"
                initialValues={{
                  course: courseId,
                  location: location,
                  trainees: volume,
                  companyName: companyName,
                  yourName: yourName,
                  yourEmail: email,
                  contactNumber: contact,
                }}
                validationSchema={compnaySchema}
                onSubmit={async (values, actions) => {
                  actions.setSubmitting(true);
                  const response = await props.quotationSubmit({
                    course_id: courseId,
                    location_id: locationList[location - 1].id,
                    persons: volume,
                    company_name: companyName,
                    person_name: yourName,
                    email: email,
                    contact: contact,
                    location: locationList[location - 1].venue_name,
                  });
                  if (response) {
                    setCalculatedData(response);
                    setShowModal(true);

                    setCourseId("");
                    setLocation("");
                    setVolume(1);
                    setCompanyName("");
                    setYourName("");
                    setEmail("");
                    setContact("");
                  }
                  actions.setSubmitting(false);
                  actions.resetForm({
                    values: {
                      course: "",
                      location: "",
                      trainees: "",
                      companyName: "",
                      yourName: "",
                      yourEmail: "",
                      contactNumber: "",
                    },
                    // you can also set the other form states here
                  });
                }}
              >
                {({ errors, values, touched, isSubmitting, setFieldValue }) => (
                  <Form>
                    <Row className="justify-content-between">
                      <Col className="col-12 col-lg-7">
                        <h3 className={`fw-medium mb-4`}>
                          Get an instant quote to see how much you can save
                        </h3>
                        <div
                          className={`gl-input-simple form-group mb-3 ${styles.input_field}`}
                        >
                          <label>Select Course</label>
                          <Field
                            className="form-control"
                            as="select"
                            name="course"
                            onChange={(e) => {
                              setCourseId(e.target.value);
                            }}
                          >
                            <option value={``}>{`Course Name`}</option>
                            {courseList?.map((item) => {
                              return (
                                <option value={item.id}>
                                  {item.course_name}
                                </option>
                              );
                            })}
                          </Field>
                          {errors.course && touched.course ? (
                            <div className="error text-danger mt-1">
                              {errors.course}
                            </div>
                          ) : null}
                        </div>

                        <div
                          className={`gl-input-simple form-group mb-0 ${styles.input_field}`}
                        >
                          <label>Select Location</label>
                          <ButtonDropdown
                            isOpen={dropdownOpen}
                            toggle={toggle}
                            className={`${styles.dropdown_list} d-block p-0`}
                          >
                            <DropdownToggle
                              className={`bg-transparent text-dark w-100 text-left ${
                                loading && styles.location_disabled
                              } ${!courseId > 0 && styles.location_disabled}`}
                            >
                              {location
                                ? locationList[location - 1].venue_name
                                : "Select Location"}
                            </DropdownToggle>
                            <DropdownMenu className={`${styles.dropdown_menu}`}>
                              <ul className="p-0 m-0 cursor-pointer">
                                <li
                                  onClick={() => {
                                    setLocation("");
                                    setDropdownOpen(false);
                                  }}
                                >
                                  Select Location
                                </li>
                                {locationList?.map((item, indx) => {
                                  return (
                                    <li
                                      onClick={() => {
                                        setLocation(indx + 1);
                                        setDropdownOpen(false);
                                      }}
                                    >
                                      {item.venue_name}
                                    </li>
                                  );
                                })}
                              </ul>
                            </DropdownMenu>
                          </ButtonDropdown>
                          {/* <Field className={`form-control ${!courseId > 0 && styles.location_disabled} ${loading && styles.location_disabled}`} disabledLocation as="select" name="location" onChange={(e) => {
                                                        
                                                        setLocation(e.target.value);

                                                        }}> */}

                          {/* <option value={0}>Location</option> */}
                          {/* {locationList?.map((item, indx) => {
                                                            return <option value={indx + 1}>{item.venue_name}</option>
                                                        })} */}
                          {/* </Field> */}
                          {loading && (
                            <div className={`${styles.loading}`}>
                              <Spinner
                                animation="border"
                                size="md"
                                role="status"
                              ></Spinner>
                            </div>
                          )}

                          {errors.location && touched.location ? (
                            <div className="error text-danger mt-1">
                              {errors.location}
                            </div>
                          ) : null}
                        </div>
                        <div className="range_slider_container mt-4 mt-md-5 w-100">
                          <label>Number of trainees ({volume})</label>
                          <FormGroup className="mb-0">
                            <Slider
                              className={`slider w-100 ${styles.rangeslider} my-0 mr-3`}
                              type="range"
                              name="trainees"
                              min={1}
                              max={24}
                              value={volume}
                              onChange={(e) => setVolume(e)}
                            />
                          </FormGroup>
                          {errors.trainees && touched.trainees ? (
                            <div className="error text-danger mt-1">
                              {errors.trainees}
                            </div>
                          ) : null}
                        </div>
                      </Col>
                      <Col className="col-12 col-lg-5 mt-4 mt-lg-0">
                        <div className={`${styles.quote_info}`}>
                          <div
                            className={`gl-input-simple form-group mb-3 ${styles.input_field}`}
                          >
                            <label>Company name</label>
                            <Field
                              type="text"
                              name="companyName"
                              className="form-control"
                              value={companyName}
                              placeholder="ABC Limited"
                              onChange={(e) => {
                                setCompanyName(e.target.value);
                              }}
                            />
                            {errors.companyName && touched.companyName ? (
                              <div className="error text-danger mt-1">
                                {errors.companyName}
                              </div>
                            ) : null}
                          </div>
                          <div
                            className={`gl-input-simple form-group mb-3 ${styles.input_field}`}
                          >
                            <label>Your name</label>
                            <Field
                              type="text"
                              name="yourName"
                              className="form-control"
                              value={yourName}
                              placeholder="Your full name"
                              onChange={(e) => {
                                setYourName(e.target.value);
                              }}
                            />
                            {errors.yourName && touched.yourName ? (
                              <div className="error text-danger mt-1">
                                {errors.yourName}
                              </div>
                            ) : null}
                          </div>
                          <div
                            className={`gl-input-simple form-group mb-3 ${styles.input_field}`}
                          >
                            <label>Your email address</label>
                            <Field
                              type="email"
                              name="yourEmail"
                              className="form-control"
                              value={email}
                              placeholder="example@company.com"
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
                            />
                            {errors.yourEmail && touched.yourEmail ? (
                              <div className="error text-danger mt-1">
                                {errors.yourEmail}
                              </div>
                            ) : null}
                          </div>
                          <div
                            className={`gl-input-simple form-group mb-3 ${styles.input_field}`}
                          >
                            <label>Contact number</label>
                            <Field
                              type="number"
                              name="contactNumber"
                              className="form-control"
                              value={contact}
                              placeholder="Mobile number"
                              onChange={(e) => {
                                setContact(e.target.value);
                              }}
                            />
                            {errors.contactNumber && touched.contactNumber ? (
                              <div className="error text-danger mt-1">
                                {errors.contactNumber}
                              </div>
                            ) : null}
                          </div>

                          <div
                            className={`d-flex justify-content-center align-items-start flex-wrap mt-4`}
                          >
                            <button
                              className={`btn btn-md btn-xs btn-success px-md-4 mr-lg-3 ${styles.btn_md}`}
                              type="submit"
                              disabled={isSubmitting}
                            >
                              <span>Generate Instant Quote</span>
                              {isSubmitting && (
                                <Spinner size="sm" animation="border" />
                              )}
                            </button>
                            <a
                              className={`btn btn-md btn-xs btn-success px-md-4 ${styles.btn_md_outline}`}
                              onClick={showChat}
                            >
                              Chat with us
                            </a>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            </div>
            <Modal show={showModal}>
              {calculatedData && (
                <div className={`${styles.quotationModal}`}>
                  <h2>Your quote is</h2>
                  <h3 className={`fs-1`}>
                    <del>£{calculatedData.quoted_price}</del> £{" "}
                    {calculatedData.discounted_price}{" "}
                    <span>You save £{calculatedData.saved_amount}</span>
                  </h3>

                  <p>Quote ref: {calculatedData.reference_no}</p>

                  <div className="btn-group flex-column align-items-center">
                    <button
                      className={`btn btn-md btn-xs btn-success px-md-5 mb-3 ${styles.btn_md}`}
                      onClick={showChat}
                    >
                      Chat with an advisor
                    </button>
                    <a href="javascript:void(0)" onClick={handleClose}>
                      <img src={process.env.APP_URL + "/images/revert.svg"} />{" "}
                      Start again
                    </a>
                  </div>
                </div>
              )}
            </Modal>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  getAllCourses: () => dispatch(getAllCourses()),
  getLocation: (course_id) => dispatch(getLocation(course_id)),
  quotationSubmit: (data) => dispatch(quotationSubmit(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quotation);
