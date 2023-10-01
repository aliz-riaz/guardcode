import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./FiltersForCVSearch.module.scss";
import { Label, FormGroup } from "reactstrap";
import { Loader } from "@googlemaps/js-api-loader";

import "react-rangeslider/lib/index.css";
import Slider from "react-rangeslider";

const FiltersForCVSearchShimmer = (props) => {
  return (
    <div className="bg-white rounded px-3 py-3">
      <Formik>
        <Form id="cvSearchFilter">
          <div className={`row`}>
            <div className="col-12 col-md-6">
              <div className="gl-input-simple animated_shimmer mb-0">
                <Field className="form-control" as="select" name="license_type">
                  <option value={""}>Please select licence</option>
                </Field>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="gl-input-simple animated_shimmer mb-0">
                <Field className="form-control" as="select" name="license_type">
                  <option value={""}>Please select licence</option>
                </Field>
              </div>
            </div>
          </div>
          <div className={`row align-items-end`}>
            <div className="col-12 col-md-6">
              <div className="range_slider_container mt-0 mt-md-2 w-100">
                <FormGroup className="mb-0">
                  <Label className="d-flex justify-content-between fs-7">
                    <span className="animated_shimmer mb-0 d-inline-block">
                      Distance
                    </span>{" "}
                    <span className="text-black-50 fw-normal animated_shimmer mb-0 d-inline-block">
                      Miles Away
                    </span>
                  </Label>
                  <Slider
                    className={`slider animated_shimmer ${styles.rangeslider} my-0`}
                    type="range"
                    name="distance"
                    min={1}
                    max={10}
                    value={3}
                  />
                </FormGroup>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div
                className={`${styles.video_container} gl-checkbox form-group mb-0 mt-2 mt-md-0`}
              >
                <label className="form-check-label animated_shimmer">
                  <input
                    name="videoOnly"
                    type="checkbox"
                    className="form-check-input"
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
                className={`btn btn-dark btn-md fw-bold px-5 py-2 w-100 mt-3 mt-md-0 w-md-auto  ${styles.submit_btn} mr-2 animated_shimmer border-0 mb-0`}
              >
                Reset
              </button>
              <button
                type="submit"
                form="cvSearchFilter"
                className={`btn btn-green btn-md fw-bold px-5 py-2 w-100 mt-3 mt-md-0 w-md-auto  ${styles.submit_btn} animated_shimmer mb-0`}
              >
                Search
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default FiltersForCVSearchShimmer;
