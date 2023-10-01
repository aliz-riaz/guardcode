import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import {
  setLicenseTypeForCVSearchFilter,
  setLocaitonForCVSearchFilter,
  setDistanceForCVSearchFilter,
  setVideoOnlyCheckForCVSearchFilter,
  getCVSearchResultsAgainstSearch,
  setLatitudeForCVSearch,
  setLongitudeForCVSearch,
  setSelectedLocaitonFromGoogleCVSearch,
  setShowCVSearchProfileStatus,
} from "../../redux/actions/cvSearchAction";
import styles from "./FiltersForCVSearch.module.scss";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { Label, FormGroup } from "reactstrap";
import {
  DOOR_SUPERVISOUR_LICENCE_ID,
  CCTV_LICENCE_ID,
  SECURITY_GUARDING_LICENCE_ID,
  CLOSE_PROTECTION_LICENCE_ID,
} from "../../constants/licence_ids";
import { Loader } from "@googlemaps/js-api-loader";

import "react-rangeslider/lib/index.css";
import Slider from "react-rangeslider";

const CVSearchFilterSchema = Yup.object().shape({
  license_type: Yup.array().required().min(1, "Please select licence"),
  location: Yup.string().required("Please enter location"),
  selectedLocaitonFromGoogle: Yup.bool().oneOf(
    [true],
    "Please select the location from dropdown only"
  ),
});

const FiltersForCVSearch = (props) => {
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.GOOGLE_KEY,
      id: "googleMapsAPI",
      version: "weekly",
      libraries: ["places"],
    });
    loader
      .load()
      .then((google) => {
        setGoogleMapsLoaded(true);
      })
      .catch((e) => {
        console.error(
          "Something went wrong while loading google apis for cv-search filter"
        );
      });
  }, []);

  const handleReset = (e) => {
    e.preventDefault();
    props.setLicenseTypeForCVSearchFilter([]);
    props.setLocaitonForCVSearchFilter("");
    props.setDistanceForCVSearchFilter(9);
    props.setVideoOnlyCheckForCVSearchFilter(false);
    props.setLatitudeForCVSearch(null);
    props.setLongitudeForCVSearch(null);
    props.setSelectedLocaitonFromGoogleCVSearch(false);
    props.setShowCVSearchProfileStatus(false);

    props.setCurrentPage(1);
    props.setApplicants([]);
    props.setTotalNoOfPages(1);
    props.setTotalNoRecords(null);
  };

  return (
    <div className="bg-white rounded px-3 py-3">
      <Formik
        enableReinitialize={true}
        validationSchema={CVSearchFilterSchema}
        initialValues={{
          license_type: props.license_type_cv_search_filter,
          location: props.location_cv_search_filter,
          distance: props.distance_cv_search_filter,
          videoOnly: props.video_only_check_cv_search_filter,
          lat: props.latitude_cv_search_filter,
          lng: props.longitude_cv_search_filter,
          selectedLocaitonFromGoogle:
            props.selected_location_from_google_cv_search_filter,
        }}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true);
          props.setIsLoading(true);
          if (
            (values.license_type.length > 0 ||
              values.videoOnly ||
              values.distance != 9 ||
              values.location != "") &&
            props.enableCVSearch
          ) {
            const res = await props.getCVSearchResultsAgainstSearch(
              props.user_token,
              1,
              {
                miles: values.distance,
                license: values.license_type,
                only_video: values.videoOnly,
                latitude: values.lat,
                longitude: values.lng,
              }
            );
            props.setCurrentPage(1);
            props.setApplicants(res.data.jobseekers.data);
            props.setTotalNoOfPages(res.data.jobseekers.last_page);
            props.setTotalNoRecords(res.data.jobseekers.total);
          }
          props.setIsLoading(false);
          actions.setSubmitting(false);
        }}
      >
        {({ errors, values, touched, isSubmitting, setFieldValue }) => (
          <Form id="cvSearchFilter">
            <div className={`row`}>
              <div className="col-12 col-md-6">
                <div className="gl-input-simple">
                  <Field
                    className="form-control"
                    as="select"
                    name="license_type"
                    onChange={(e) => {
                      {
                        if (e.target.value != "") {
                          props.setLicenseTypeForCVSearchFilter([
                            Number(e.target.value),
                          ]);
                          return;
                        }
                        props.setLicenseTypeForCVSearchFilter([]);
                      }
                    }}
                  >
                    <option value={""}>Please select licence</option>
                    <option value={DOOR_SUPERVISOUR_LICENCE_ID}>
                      Door Supervisor Licence
                    </option>
                    <option value={CCTV_LICENCE_ID}>CCTV Licence</option>
                    <option value={SECURITY_GUARDING_LICENCE_ID}>
                      Security Guarding Licence
                    </option>
                    <option value={CLOSE_PROTECTION_LICENCE_ID}>
                      Close Protection Licence
                    </option>
                  </Field>
                  {errors.license_type && touched.license_type ? (
                    <div className="text-danger">{errors.license_type}</div>
                  ) : null}
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div>
                  {googleMapsLoaded && (
                    <PlacesAutocomplete
                      value={props.location_cv_search_filter}
                      onChange={(address) => {
                        setFieldValue("selectedLocaitonFromGoogle", false);
                        props.setSelectedLocaitonFromGoogleCVSearch(false);
                        props.setLocaitonForCVSearchFilter(address);
                      }}
                      onSelect={(address) => {
                        props.setSelectedLocaitonFromGoogleCVSearch(true);
                        setFieldValue("selectedLocaitonFromGoogle", true);
                        props.setLocaitonForCVSearchFilter(address);
                        geocodeByAddress(address)
                          .then((results) => results)
                          .then((latLng) => {
                            getLatLng(latLng[0]).then((latLng) => {
                              props.setLatitudeForCVSearch(latLng.lat);
                              props.setLongitudeForCVSearch(latLng.lng);
                            });
                          })
                          .catch((error) => console.error("Error", error));
                      }}
                      searchOptions={{
                        types: ["geocode"],
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
                          <FormGroup className="gl-input">
                            <input
                              {...getInputProps({
                                placeholder: "Postcode or city",
                                className: `${styles.location_search_input} location-search-input form-control`,
                                name: "location",
                              })}
                            />
                            <Label>Postcode or city</Label>
                            {props.location_cv_search_filter && (
                              <span
                                className={`${styles.cancel_text} cursor-pointer`}
                                onClick={() => {
                                  props.setLocaitonForCVSearchFilter("");
                                  props.setLatitudeForCVSearch(null);
                                  props.setLongitudeForCVSearch(null);
                                  props.setSelectedLocaitonFromGoogleCVSearch(
                                    false
                                  );
                                }}
                              >
                                <img
                                  src={`${process.env.APP_URL}/images/x-circle.svg`}
                                />
                              </span>
                            )}
                            {errors.location && touched.location ? (
                              <div className="text-danger">
                                {errors.location}
                              </div>
                            ) : null}
                            {!errors.location &&
                            errors.selectedLocaitonFromGoogle &&
                            touched.selectedLocaitonFromGoogle ? (
                              <div className="text-danger">
                                {errors.selectedLocaitonFromGoogle}
                              </div>
                            ) : null}
                            <div className="custom-dropdown">
                              {suggestions.length > 0 ? (
                                <ul className="autocomplete-dropdown-container">
                                  {suggestions.map((suggestion) => {
                                    const className = suggestion.active
                                      ? "suggestion-item--active"
                                      : "suggestion-item";

                                    return (
                                      <li
                                        {...getSuggestionItemProps(suggestion, {
                                          className,
                                          // style,
                                        })}
                                      >
                                        <span>{suggestion.description}</span>
                                      </li>
                                    );
                                  })}
                                </ul>
                              ) : null}
                            </div>
                          </FormGroup>
                        </div>
                      )}
                    </PlacesAutocomplete>
                  )}
                </div>
              </div>
            </div>
            <div className={`row align-items-end`}>
              <div className="col-12 col-md-6">
                <div className="range_slider_container mt-0 mt-md-2 w-100">
                  <FormGroup className="mb-0">
                    <Label className="d-flex justify-content-between fs-7">
                      <span>Distance</span>{" "}
                      <span className="text-black-50 fw-normal">
                        {props.distance_cv_search_filter} Miles Away
                      </span>
                    </Label>
                    <Slider
                      className={`slider ${styles.rangeslider} my-0`}
                      type="range"
                      name="distance"
                      min={1}
                      max={10}
                      value={props.distance_cv_search_filter}
                      onChangeStart={() => null}
                      onChange={(val) => {
                        props.setDistanceForCVSearchFilter(val);
                      }}
                      onChangeComplete={() => null}
                    />
                  </FormGroup>
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div
                  className={`${styles.video_container} gl-checkbox form-group mb-0 mt-2 mt-md-0`}
                >
                  <label className="form-check-label ">
                    <input
                      name="videoOnly"
                      type="checkbox"
                      className="form-check-input"
                      checked={props.video_only_check_cv_search_filter}
                      onChange={(e) => {
                        props.setVideoOnlyCheckForCVSearchFilter(
                          e.target.checked
                        );
                      }}
                    />
                    <span>Video only profiles</span>
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
              <div
                className={`col-12 col-md-3 d-flex justify-content-end ${styles.filter_btn}`}
              >
                <button
                  className={`btn btn-dark btn-md fw-bold px-5 py-2 w-100 mt-3 mt-md-0 w-md-auto  ${styles.submit_btn} mr-2`}
                  onClick={handleReset}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  form="cvSearchFilter"
                  className={`btn btn-green btn-md fw-bold px-5 py-2 w-100 mt-3 mt-md-0 w-md-auto  ${styles.submit_btn}`}
                  disabled={
                    isSubmitting ||
                    (props.user_token != "" &&
                      props.isOrganisationApproved == 0)
                  }
                >
                  Search
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  license_type_cv_search_filter: state.vantage.cvSearchReducer.licenseType,
  location_cv_search_filter: state.vantage.cvSearchReducer.location,
  distance_cv_search_filter: state.vantage.cvSearchReducer.distance,
  latitude_cv_search_filter: state.vantage.cvSearchReducer.latitude,
  longitude_cv_search_filter: state.vantage.cvSearchReducer.longitude,
  selected_location_from_google_cv_search_filter:
    state.vantage.cvSearchReducer.selectedLocationFromGoogle,
  video_only_check_cv_search_filter:
    state.vantage.cvSearchReducer.videoOnlyCheck,
  user_token: state.vantage.userDataReducer.user_token,
  isOrganisationApproved:
    state.vantage.organisationReducer.isOrganisationApproved,
});

const mapDispatchToProps = (dispatch) => ({
  setLicenseTypeForCVSearchFilter: (licenseType) =>
    dispatch(setLicenseTypeForCVSearchFilter(licenseType)),
  setLocaitonForCVSearchFilter: (location) =>
    dispatch(setLocaitonForCVSearchFilter(location)),
  setDistanceForCVSearchFilter: (distance) =>
    dispatch(setDistanceForCVSearchFilter(distance)),
  setVideoOnlyCheckForCVSearchFilter: (status) =>
    dispatch(setVideoOnlyCheckForCVSearchFilter(status)),
  getCVSearchResultsAgainstSearch: (userToken, currentPage, filtersData) =>
    dispatch(
      getCVSearchResultsAgainstSearch(userToken, currentPage, filtersData)
    ),
  setLatitudeForCVSearch: (lat) => dispatch(setLatitudeForCVSearch(lat)),
  setLongitudeForCVSearch: (lng) => dispatch(setLongitudeForCVSearch(lng)),
  setSelectedLocaitonFromGoogleCVSearch: (status) =>
    dispatch(setSelectedLocaitonFromGoogleCVSearch(status)),
  setShowCVSearchProfileStatus: (status) =>
    dispatch(setShowCVSearchProfileStatus(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltersForCVSearch);
