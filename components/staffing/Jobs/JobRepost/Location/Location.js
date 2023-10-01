import React, { Component } from "react";
import { Button, Label, Row, Col, FormGroup } from "reactstrap";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import {
  setWillReportToSpecificAddress,
  setWillNotReportToCity,
  setWillNotReportToPostCode,
  setWillReportToWorkPostCode,
  getLoqateSuggestionsByText,
  getLoqateSuggestionById,
  setWillReportToWorkCity,
  setWillReportToWorkAddressOne,
  setWillReportToWorkAddressTwo,
  getLatLonForLoqateAddress,
  setWillReportToWorkShowHide,
  setCenterForMapGoogle,
  setCenterForMapLoqate,
  setShowGoogleMapForGoogle,
  setShowGoogleMapForLoquate,
  setLocateSuggestionForText,
  setSelectedLocationFromGoogle,
  setActiveStep,
} from "../../../../../redux/actions/jobPostAction";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Loader } from "@googlemaps/js-api-loader";
import GoogleMaps from "../GoogleMaps";

const LocationSchema = Yup.object().shape({
  willReportToSpecificAddress: Yup.string().required(
    "Please select one of above"
  ),
  WillNotReportToCity: Yup.string()
    .max(100, "The city cannot be more than 100 characters long")
    .when("willReportToSpecificAddress", {
      is: "no",
      then: Yup.string().required("Please enter job address"),
    }),
  selectedLocationFromGoogle: Yup.bool().when("willReportToSpecificAddress", {
    is: "no",
    then: Yup.bool().oneOf(
      [true],
      "Please select the job address from dropdown only"
    ),
  }),
  willReportToWorkPostCode: Yup.string().when("willReportToSpecificAddress", {
    is: "yes",
    then: Yup.string()
      .max(100, "Please enter a valid postcode")
      .required("Please enter postcode"),
  }),
  willReportToWorkCity: Yup.string().when("willReportToSpecificAddress", {
    is: "yes",
    then: Yup.string()
      .max(100, "Max Limit is 100")
      .required("Please enter city"),
  }),
  willReportToWorkAddressOne: Yup.string().when("willReportToSpecificAddress", {
    is: "yes",
    then: Yup.string().required("Please enter address line 1"),
  }),
});

const intializeValues = (props) => ({
  willReportToSpecificAddress: props.will_report_to_specific_address,
  WillNotReportToCity: props.will_not_report_to_city,
  WillNotReportToPostCode: props.will_not_report_to_post_code,
  willReportToWorkPostCode: props.will_report_to_work_post_code,
  willReportToWorkCity: props.will_report_to_work_city,
  willReportToWorkAddressOne: props.will_report_to_work_address_one,
  willReportToWorkAddressTwo: props.will_report_to_work_address_two,
  selectedLocationFromGoogle: props.selected_location_from_google,
});

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapsloaded: false,
      showLoqateSuggestion: false,
    };
    this.loader = new Loader({
      apiKey: process.env.GOOGLE_KEY,
      id: "googleMapsAPI",
      version: "weekly",
      libraries: ["places"],
    });
  }

  componentDidMount() {
    this.loader
      .load()
      .then((google) => {
        this.setState({
          ...this.state,
          mapsloaded: true,
        });
      })
      .catch((e) => {});
  }

  handleChange = (address, setFieldValue) => {
    this.props.setSelectedLocationFromGoogle(false);
    setFieldValue("selectedLocationFromGoogle", false);
    this.props.setWillNotReportToCity(address);
  };

  handleSelect = (address, setFieldValue) => {
    this.props.setSelectedLocationFromGoogle(true);
    setFieldValue("selectedLocationFromGoogle", true);
    geocodeByAddress(address)
      .then((results) => results)
      .then((latLng) => {
        getLatLng(latLng[0]).then((latLng) =>
          this.props.setCenterForMapGoogle(latLng)
        );
        if (latLng[0].address_components[0].types[0] == "postal_code") {
          this.props.setWillNotReportToPostCode(
            latLng[0].address_components[0].long_name
          );
          this.props.setShowGoogleMapForGoogle(true);
        } else {
          this.props.setWillNotReportToPostCode("");
          this.props.setShowGoogleMapForGoogle(true);
        }
        this.props.setWillNotReportToCity(latLng[0].formatted_address);
      })
      .catch((error) => console.error("Error", error));
  };

  render() {
    return (
      <>
        {this.state.mapsloaded ? (
          <>
            <div className="pt-2 pt-md-5 pb-2 pb-md-4 row align-items-center justify-content-center">
              {/* <div className="col-md-2">
                <button
                  className={`text-left btn btn-sm btn-transparent d-inline-flex align-items-center pl-0`}
                  onClick={() => this.props.setActiveStep(1)}
                >
                  <img
                    src={`${process.env.APP_URL}/images/chevron-left.svg`}
                    alt="chevron"
                  />
                  Back
                </button>
              </div> */}
              <div className="col-md-3">
                <h3 className="text-center text-sm-uppercase font-sm-12 mb-0">
                  Location
                </h3>
              </div>
            </div>
            <Row className="justify-content-center">
              <Col className="col-12 col-md-5">
                <div className="bg-white py-4 px-4 rounded">
                  <Formik
                    enableReinitialize={true}
                    initialValues={intializeValues(this.props)}
                    validationSchema={LocationSchema}
                    onSubmit={(values) => {
                      // alert(JSON.stringify(values));
                      this.props.goToNext(1);
                    }}
                  >
                    {({ errors, touched, setFieldValue }) => (
                      <Form id="location">
                        <h4 className="mb-3">
                          Where will an employee report to work?
                        </h4>
                        <Row>
                          <Col>
                            <FormGroup className="gl-radio form-check mb-0">
                              <Label>
                                <Field
                                  type="radio"
                                  name="willReportToSpecificAddress"
                                  value="yes"
                                  onChange={(e) => {
                                    this.props.setWillReportToSpecificAddress(
                                      e.target.value
                                    );
                                  }}
                                />
                                <span>
                                  Employees will report to a specific address
                                </span>
                                <span className="checkmark"></span>
                              </Label>
                            </FormGroup>
                            <FormGroup className="gl-radio form-check">
                              <Label>
                                <Field
                                  type="radio"
                                  name="willReportToSpecificAddress"
                                  value="no"
                                  onChange={(e) => {
                                    this.props.setWillReportToSpecificAddress(
                                      e.target.value
                                    );
                                  }}
                                />
                                <span>
                                  Employees will not report to a specific
                                  address
                                </span>
                                <span className="checkmark"></span>
                              </Label>
                              {errors.willReportToSpecificAddress &&
                              touched.willReportToSpecificAddress ? (
                                <div className="text-danger">
                                  {errors.willReportToSpecificAddress}
                                </div>
                              ) : null}
                            </FormGroup>
                          </Col>
                        </Row>

                        {this.props.will_report_to_specific_address == "no" ? (
                          <>
                            <PlacesAutocomplete
                              value={this.props.will_not_report_to_city}
                              onChange={(address) =>
                                this.handleChange(address, setFieldValue)
                              }
                              onSelect={(address) =>
                                this.handleSelect(address, setFieldValue)
                              }
                              searchOptions={{
                                types: ["(cities)"],
                                componentRestrictions: { country: "uk" },
                              }}
                            >
                              {({
                                getInputProps,
                                suggestions,
                                getSuggestionItemProps,
                                loading,
                              }) => (
                                <div>
                                  <Row>
                                    <Col>
                                      <h4 className="mb-2">
                                        Which city/locality would you like to
                                        advertise this job?
                                      </h4>
                                      <FormGroup className="gl-input">
                                        <input
                                          {...getInputProps({
                                            placeholder: "City",
                                            className:
                                              "location-search-input form-control",
                                            name: "WillNotReportToCity",
                                          })}
                                        />
                                        <Label>City</Label>
                                        {errors.WillNotReportToCity &&
                                        touched.WillNotReportToCity ? (
                                          <div className="text-danger">
                                            {errors.WillNotReportToCity}
                                          </div>
                                        ) : null}

                                        {!errors.WillNotReportToCity &&
                                        errors.selectedLocationFromGoogle &&
                                        touched.selectedLocationFromGoogle ? (
                                          <div className="text-danger">
                                            {errors.selectedLocationFromGoogle}
                                          </div>
                                        ) : null}
                                        <div className="custom-dropdown">
                                          {suggestions.length > 0 ? (
                                            <ul className="autocomplete-dropdown-container">
                                              {loading && <div></div>}
                                              {suggestions.map((suggestion) => {
                                                const className =
                                                  suggestion.active
                                                    ? "suggestion-item--active"
                                                    : "suggestion-item";
                                                // inline style for demonstration purpose
                                                // const style = suggestion.active
                                                //   ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                //   : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                return (
                                                  <li
                                                    {...getSuggestionItemProps(
                                                      suggestion,
                                                      {
                                                        className,
                                                        // style,
                                                      }
                                                    )}
                                                  >
                                                    <span>
                                                      {suggestion.description}
                                                    </span>
                                                  </li>
                                                );
                                              })}
                                            </ul>
                                          ) : null}
                                        </div>
                                      </FormGroup>
                                    </Col>
                                  </Row>
                                </div>
                              )}
                            </PlacesAutocomplete>

                            {/* <Row>
            <Col className="col-12">
              <FormGroup className="gl-input">
                <Field name="WillNotReportToPostCode" className="form-control" placeholder="Postcode" onChange={(e) => {
                  this.props.setWillNotReportToPostCode(e.target.value);
                }}/>
                <Label>Postcode</Label>   
              </FormGroup>            
            </Col>
          </Row> */}

                            {/* {errors.WillNotReportToPostCode && touched.WillNotReportToPostCode ? (
                <div>{errors.WillNotReportToPostCode}</div>
              ) : null} */}
                          </>
                        ) : null}
                        {/* Will Report To Work */}
                        {this.props.will_report_to_specific_address == "yes" ? (
                          <>
                            <Row>
                              <Col>
                                <h4 className="mb-2">Address</h4>
                                <p className="fs-6 text-black-50 fw-medium d-flex">
                                  <svg
                                    width="21"
                                    height="21"
                                    viewBox="0 0 16 16"
                                  >
                                    <path
                                      fill="#ccc"
                                      d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0-1A6 6 0 1 0 8 2a6 6 0 0 0 0 12zm0-8a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 1a.75.75 0 0 1 .75.75v3.5a.75.75 0 1 1-1.5 0v-3.5A.75.75 0 0 1 8 7z"
                                    ></path>
                                  </svg>
                                  <span className="ml-1">
                                    We won’t share your street address. We use
                                    your location to find candidates in your
                                    area.
                                  </span>
                                </p>
                                <FormGroup className="gl-input mb-3">
                                  <Field
                                    autoComplete="off"
                                    type="text"
                                    className="form-control"
                                    placeholder="Post Code"
                                    name="willReportToWorkPostCode"
                                    onChange={(e) => {
                                      this.props.setWillReportToWorkPostCode(
                                        e.target.value
                                      );
                                      if (e.target.value) {
                                        this.setState({
                                          ...this.state,
                                          showLoqateSuggestion: true,
                                        });
                                        this.props
                                          .getLoqateSuggestionsByText(
                                            e.target.value
                                          )
                                          .then((response) => {
                                            if (
                                              e.target.value == response.code
                                            ) {
                                              this.props.setLocateSuggestionForText(
                                                response.data
                                              );
                                            }
                                          });
                                        this.props.setShowGoogleMapForLoquate(
                                          true
                                        );
                                      }
                                    }}
                                  />
                                  <Label>Post Code</Label>
                                  {errors.willReportToWorkPostCode &&
                                  touched.willReportToWorkPostCode ? (
                                    <div className="text-danger">
                                      {errors.willReportToWorkPostCode}
                                    </div>
                                  ) : null}
                                  {this.state.showLoqateSuggestion ? (
                                    <div className="custom-dropdown">
                                      <ul>
                                        {this.props.loquate_respone_for_text.map(
                                          (value, idx) => {
                                            return (
                                              <li
                                                key={idx}
                                                onClick={(e) => {
                                                  if (value.Type == "Address") {
                                                    this.props
                                                      .getLoqateSuggestionByIdWithPromise(
                                                        value.Id
                                                      )
                                                      .then(() => {
                                                        this.props.getLatLonForLoqateAddress(
                                                          this.props
                                                            .loquate_respone_for_id[0]
                                                            ?.Line1 +
                                                            this.props
                                                              .loquate_respone_for_id[0]
                                                              ?.Line2 +
                                                            " " +
                                                            this.props
                                                              .loquate_respone_for_id[0]
                                                              ?.PostalCode +
                                                            " " +
                                                            this.props
                                                              .loquate_respone_for_id[0]
                                                              ?.City
                                                        );
                                                        this.props.setWillReportToWorkPostCode(
                                                          this.props
                                                            .loquate_respone_for_id[0]
                                                            ?.PostalCode
                                                        );
                                                        this.props.setWillReportToWorkCity(
                                                          this.props
                                                            .loquate_respone_for_id[0]
                                                            ?.City
                                                        );
                                                        this.props.setWillReportToWorkAddressOne(
                                                          this.props
                                                            .loquate_respone_for_id[0]
                                                            ?.Line1 +
                                                            ", " +
                                                            this.props
                                                              .loquate_respone_for_id[0]
                                                              ?.Line2
                                                        );
                                                        this.props.setWillReportToWorkAddressTwo(
                                                          this.props
                                                            .loquate_respone_for_id[0]
                                                            ?.Line3 ?? ""
                                                        );
                                                      });
                                                    this.props.setWillReportToWorkShowHide(
                                                      false
                                                    );
                                                    this.setState({
                                                      ...this.state,
                                                      showLoqateSuggestion: false,
                                                    });
                                                  } else {
                                                    this.props
                                                      .getLoqateSuggestionsByText(
                                                        this.props
                                                          .will_report_to_work_post_code,
                                                        value.Id
                                                      )
                                                      .then((response) => {
                                                        this.props.setLocateSuggestionForText(
                                                          response.data
                                                        );
                                                      });
                                                  }
                                                }}
                                              >
                                                {value.Text +
                                                  " " +
                                                  value.Description}
                                              </li>
                                            );
                                          }
                                        )}
                                      </ul>
                                    </div>
                                  ) : null}
                                </FormGroup>
                              </Col>
                            </Row>

                            {/* {this.props.will_report_to_work_show ?  */}
                            <>
                              <Row
                                className={
                                  this.props.will_report_to_work_show
                                    ? "d-none"
                                    : "d-block"
                                }
                              >
                                <Col>
                                  <FormGroup className="gl-input">
                                    <Field
                                      hidden={
                                        this.props.will_report_to_work_show
                                      }
                                      placeholder="City"
                                      className="form-control"
                                      autoComplete="off"
                                      type="text"
                                      name="willReportToWorkCity"
                                      onChange={(e) => {
                                        this.props.setWillReportToWorkCity(
                                          e.target.value
                                        );
                                      }}
                                    />
                                    <Label>City</Label>
                                    {!this.props.will_report_to_work_show ? (
                                      errors.willReportToWorkCity &&
                                      touched.willReportToWorkCity ? (
                                        <div className="text-danger">
                                          {errors.willReportToWorkCity}
                                        </div>
                                      ) : null
                                    ) : null}
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row
                                className={
                                  this.props.will_report_to_work_show
                                    ? "d-none"
                                    : "d-block"
                                }
                              >
                                <Col>
                                  <FormGroup className="gl-input">
                                    <Field
                                      hidden={
                                        this.props.will_report_to_work_show
                                      }
                                      autoComplete="off"
                                      className="form-control"
                                      placeholder="Addrerss Line 2"
                                      type="text"
                                      name="willReportToWorkAddressOne"
                                      onChange={(e) => {
                                        this.props.setWillReportToWorkAddressOne(
                                          e.target.value
                                        );
                                      }}
                                    />
                                    <Label>Addrerss Line 1</Label>
                                    {!this.props.will_report_to_work_show ? (
                                      errors.willReportToWorkAddressOne &&
                                      touched.willReportToWorkAddressOne ? (
                                        <div className="text-danger">
                                          {errors.willReportToWorkAddressOne}
                                        </div>
                                      ) : null
                                    ) : null}
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row
                                className={
                                  this.props.will_report_to_work_show
                                    ? "d-none"
                                    : "d-block"
                                }
                              >
                                <Col>
                                  <FormGroup className="gl-input mb-0">
                                    <Field
                                      hidden={
                                        this.props.will_report_to_work_show
                                      }
                                      autoComplete="off"
                                      className="form-control"
                                      placeholder="Addrerss Line 2"
                                      type="text"
                                      name="willReportToWorkAddressTwo"
                                      onChange={(e) => {
                                        this.props.setWillReportToWorkAddressTwo(
                                          e.target.value
                                        );
                                      }}
                                    />
                                    <Label>Addrerss Line 2</Label>
                                    {errors.willReportToWorkAddressTwo &&
                                    touched.willReportToWorkAddressTwo ? (
                                      <div className="text-danger">
                                        {errors.willReportToWorkAddressTwo}
                                      </div>
                                    ) : null}
                                  </FormGroup>
                                </Col>
                              </Row>
                            </>
                            <br />
                          </>
                        ) : null}
                      </Form>
                    )}
                  </Formik>

                  {/* Maps for google */}
                  {this.props.will_report_to_specific_address == "no" &&
                  this.props.show_google_map_for_google ? (
                    <GoogleMaps
                      className="w-100"
                      centerForMap={this.props.center_for_map_google}
                      lat={this.props.center_for_map_google.lat}
                      lng={this.props.center_for_map_google.lng}
                    />
                  ) : null}
                  {/* Maps for Loqate */}
                  {this.props.will_report_to_specific_address == "yes" &&
                  this.props.show_google_map_for_loqate ? (
                    <GoogleMaps
                      className="w-100"
                      centerForMap={this.props.center_for_map_loqate}
                      lat={this.props.center_for_map_loqate.lat}
                      lng={this.props.center_for_map_loqate.lng}
                    />
                  ) : null}
                </div>
              </Col>
            </Row>
          </>
        ) : null}
      </>
    );
  }
}
// 1: World
// 5: Landmass/continent
// 10: City
// 15: Streets
// 20: Buildings

const mapStateToProps = (state) => {
  return {
    will_report_to_specific_address:
      state.vantage.jobPostReducer.willReportToSpecificAddress,
    will_not_report_to_city: state.vantage.jobPostReducer.WillNotReportToCity,
    will_not_report_to_post_code:
      state.vantage.jobPostReducer.WillNotReportToPostCode,
    center_for_map_google: state.vantage.jobPostReducer.centerForMapGoogle,
    center_for_map_loqate: state.vantage.jobPostReducer.centerForMapLoqate,
    will_report_to_work_post_code:
      state.vantage.jobPostReducer.willReportToWorkPostCode,
    will_report_to_work_city: state.vantage.jobPostReducer.willReportToWorkCity,
    will_report_to_work_address_one:
      state.vantage.jobPostReducer.willReportToWorkaddress1,
    will_report_to_work_address_two:
      state.vantage.jobPostReducer.willReportToWorkaddress2,
    will_report_to_work_show:
      state.vantage.jobPostReducer.willReportToWorkShowHide,
    loquate_respone_for_text: state.vantage.jobPostReducer.loqateResponeforText,
    loquate_respone_for_id: state.vantage.jobPostReducer.loqateResponeforId,
    show_google_map_for_google:
      state.vantage.jobPostReducer.showGoogleMapForGoogle,
    show_google_map_for_loqate:
      state.vantage.jobPostReducer.showGoogleMapForLoqate,
    selected_location_from_google:
      state.vantage.jobPostReducer.selectedLocationFromGoogle,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setWillReportToSpecificAddress: (willReportToSpecificAddress) =>
      dispatch(setWillReportToSpecificAddress(willReportToSpecificAddress)),
    setWillNotReportToCity: (WillNotReportToCity) =>
      dispatch(setWillNotReportToCity(WillNotReportToCity)),
    setWillNotReportToPostCode: (WillNotReportToPostCode) =>
      dispatch(setWillNotReportToPostCode(WillNotReportToPostCode)),
    setCenterForMapGoogle: (centerForMapGoogle) =>
      dispatch(setCenterForMapGoogle(centerForMapGoogle)),
    setCenterForMapLoqate: (centerForMapLoqate) =>
      dispatch(setCenterForMapLoqate(centerForMapLoqate)),
    setWillReportToWorkPostCode: (postCode) =>
      dispatch(setWillReportToWorkPostCode(postCode)),
    getLoqateSuggestionsByText: (text, Contanier) =>
      dispatch(getLoqateSuggestionsByText(text, Contanier)),
    getLoqateSuggestionById: getLoqateSuggestionById,
    getLoqateSuggestionByIdWithPromise: (id) =>
      dispatch(getLoqateSuggestionById(id)),
    setWillReportToWorkCity: (city) => dispatch(setWillReportToWorkCity(city)),
    setWillReportToWorkAddressOne: (addressOne) =>
      dispatch(setWillReportToWorkAddressOne(addressOne)),
    setWillReportToWorkAddressTwo: (addressTwo) =>
      dispatch(setWillReportToWorkAddressTwo(addressTwo)),
    getLatLonForLoqateAddress: (location) =>
      dispatch(getLatLonForLoqateAddress(location)),
    setWillReportToWorkShowHide: (show) =>
      dispatch(setWillReportToWorkShowHide(show)),
    setShowGoogleMapForGoogle: (status) =>
      dispatch(setShowGoogleMapForGoogle(status)),
    setShowGoogleMapForLoquate: (status) =>
      dispatch(setShowGoogleMapForLoquate(status)),
    setLocateSuggestionForText: (suggestions) =>
      dispatch(setLocateSuggestionForText(suggestions)),
    setSelectedLocationFromGoogle: (status) =>
      dispatch(setSelectedLocationFromGoogle(status)),
    setActiveStep: (activeStep) => dispatch(setActiveStep(activeStep)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Location);
