import { connect } from "react-redux";

import { useEffect, useState, useRef } from "react";
import styles from "./CreateSite.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner, Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";

import {
  setCreateSite,
  setShowCreateSite,
  setSiteName,
  setSiteReference,
  setSiteAddress1,
  setSiteAddress2,
  setSitePostcode,
  setSiteCity,
  setSiteAccessInstruction,
  setSiteLableColor,
  setSiteContactPerson,
  setSiteContactNumber,
  setSiteUseMyDetail,
  getLoqateSuggestionsByText,
  getLoqateSuggestionById,
} from "../../../redux/actions/shiftActions";
import useSaveSite from "../../../hooks/Shifts/Sites/useSaveSite";
import useUpdateSite from "../../../hooks/Shifts/Sites/useUpdateSite";
import LoqateSuggestionForAddress from "../../Common/LoqateSuggestionForAddress";

const RoleSchema = Yup.object().shape({
  site_Name: Yup.string()
    .max(40, "The site cannot be more than 40 characters long")
    .required("Please enter site name"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  postCode: Yup.string().required("Postcode is required"),

  site_AccessInstruction: Yup.string()
    .max(240, "Access instruction cannot be more than 240 characters")
    .required("Please enter access instruction"),
  // site_LabelColor: Yup.string().required("Please select color"),
  site_ContactPerson: Yup.string().required("Please enter contact person"),
  site_ContactNumber: Yup.string()
    .required("Please enter contact no")
    .test(
      "len",
      "Please enter a valid contact no",
      (val) => val?.toString()?.length >= 11 && val?.toString()?.length <= 12
    ),
});

export const getServerSideProps = async function (context) {
  return protectedRoute(context);
};
function CreateSite(props) {
  const queryClient = useQueryClient();
  const { mutate: saveSiteMutate, isLoading: saveIsloading } = useSaveSite();
  const { mutate: updateSiteMutate, isLoading: updateIsloading } =
    useUpdateSite();

  const resetFromValues = () => {
    props.setCreateSite({ id: 0, mode: "" });
    props.setShowCreateSite(false);
    props.setSiteName("");
    props.setSiteReference("");
    props.setSiteAddress1("");
    props.setSiteAddress2("");
    props.setSitePostcode("");
    props.setSiteCity("");
    props.setSiteAccessInstruction("");
    props.setSiteLableColor("");
    props.setSiteContactPerson("");
    props.setSiteContactNumber("");
    props.setSiteUseMyDetail(0);
  };
  const colorArr = [
    "#D40B00",
    "#E67B73",
    "#F4511E",
    "#F5BF27",
    "#32B579",
    "#1C8044",
    "#2D9BE5",
    "#3E51B5",
    "#7885CB",
    "#8E24AA",
    "#616161",
  ];

  useEffect(() => {
    props.site_label_color == "" && props.setSiteLableColor(colorArr[0]);
  }, []);
  return (
    <div
      className={`${styles.createSiteMain} position-fixed ${
        props.show_create_site && styles.show
      }`}
    >
      {/* props.show_create_role */}
      <div
        className={`${
          styles.createSiteContainer
        } bg-white box-shadow position-fixed ${
          props.show_create_site && styles.show
        }`}
      >
        <div
          className={`createRole_header border-bottom border-light py-3 px-3 d-flex justify-content-between`}
        >
          <h4 className="mb-0">Add New Site</h4>

          <span
            className="cursor-pointer"
            onClick={() => {
              props.setShowCreateSite(false);
              resetFromValues();
            }}
          >
            <img src={`${process.env.APP_URL}/images/x-circle.svg`} />
          </span>
        </div>
        <div className={`${styles.scroll}`}>
          <div className="px-3 py-4">
            <Formik
              enableReinitialize={true}
              initialValues={{
                site_Name: props.site_name,
                site_Reference: props.site_reference,

                address: props.site_address1,
                address2: props.site_address2,
                postCode: props.site_postcode,
                city: props.site_city,

                // site_Address1: props.site_address1,
                // site_Address2: props.site_address2,
                // site_Postcode: props.site_postcode,
                // site_City: props.site_city,
                site_AccessInstruction: props.site_access_instruction,
                site_LabelColor: props.site_label_color,
                site_ContactPerson: props.site_contact_person,
                site_ContactNumber: props.site_contact_number,
                site_useMyDetail: props.site_use_my_detail,
              }}
              validationSchema={RoleSchema}
              onSubmit={async (values, actions) => {
                if (props.create_site?.mode == "edit") {
                  updateSiteMutate(
                    {
                      obj: {
                        title: values.site_Name,
                        reference_no: values.site_Reference,
                        address: values.address + "," + values.address2,
                        city: values.city,
                        postcode: values.postCode,
                        access_instructions: values.site_AccessInstruction,
                        contact_person: values.site_ContactPerson,
                        contact_number: values.site_ContactNumber,
                        colour_calendar: values.site_LabelColor,
                        same_contact_details: values.site_useMyDetail,
                      },
                      id: props.create_site.id,
                    },
                    {
                      onSuccess: () => {
                        queryClient.invalidateQueries(["shiftSiteList"]);
                        toast.success("Site updated successfully.");
                        resetFromValues();
                        actions.setSubmitting(false);
                        actions.resetForm();
                        props.refetch && props.refetch();
                      },
                    }
                  );
                } else {
                  saveSiteMutate(
                    {
                      title: values.site_Name,
                      reference_no: values.site_Reference,
                      address: values.address + "," + values.address2,
                      city: values.city,
                      postcode: values.postCode,
                      access_instructions: values.site_AccessInstruction,
                      contact_person: values.site_ContactPerson,
                      contact_number: values.site_ContactNumber,
                      colour_calendar: values.site_LabelColor,
                      same_contact_details: values.site_useMyDetail,
                    },
                    {
                      onSuccess: () => {
                        toast.success("Site created successfully.");
                        resetFromValues();
                        actions.resetForm();
                        props.refetch && props.refetch();
                      },
                    }
                  );
                }
              }}
            >
              {({ errors, touched, values, isSubmitting, setFieldValue }) => (
                <Form id="role">
                  <div className="row mb-3">
                    <div className="col-12 col-md-6">
                      <div className="gl-input form-group mb-0">
                        <Field
                          type="text"
                          name="site_Name"
                          className="form-control"
                          value={props.site_name}
                          placeholder="Site Name"
                          onChange={(e) => props.setSiteName(e.target.value)}
                        />
                        <label className="fs-7 fw-bold">Site Name</label>
                      </div>
                      {errors.site_Name && touched.site_Name ? (
                        <div className="error text-danger mt-1">
                          {errors.site_Name}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="gl-input form-group mb-0">
                        <Field
                          type="text"
                          name="site_Reference"
                          className="form-control"
                          value={props.site_reference}
                          placeholder="Role Name"
                          onChange={(e) =>
                            props.setSiteReference(e.target.value)
                          }
                        />
                        <label className="fs-7 fw-bold">
                          Site Reference {`(optional)`}
                        </label>
                      </div>
                    </div>
                  </div>
                  <LoqateSuggestionForAddress
                    address={props.site_address1}
                    setAddress={props.setSiteAddress1}
                    address2={props.site_address2}
                    setAddress2={props.setSiteAddress2}
                    postCode={props.site_postcode}
                    setPostCode={props.setSitePostcode}
                    city={props.site_city}
                    setCity={props.setSiteCity}
                    labelStyle={`fw-bold`}
                    addressError={
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="text-danger mt-1 error"
                      />
                    }
                    cityError={
                      <ErrorMessage
                        name="city"
                        component="div"
                        className="text-danger mt-1 error"
                      />
                    }
                    postCodeError={
                      <ErrorMessage
                        name="postCode"
                        component="div"
                        className="text-danger mt-1 error"
                      />
                    }
                  />
                  {/* <div className="row mb-3">
                    <div className="col-12 col-md-6">
                      <div className="gl-input form-group mb-0">
                        <Field
                          type="text"
                          name="site_Address1"
                          className="form-control"
                          value={props.site_address1}
                          placeholder="Address 1"
                          onChange={(e) => {
                            props.setSiteAddress1(e.target.value);
                            if (e.target.value != "") {
                              setShowLoqateSugg({
                                ...showLoqateSugg,
                                address1: true,
                              });
                            }
                            props
                              .getLoqateSuggestionsByText(e.target.value)
                              .then((response) => {
                                if (e.target.value == response.code) {
                                  setLoqateResponeforText(response.data);
                                }
                              });
                          }}
                        />
                        <label className="fs-7 fw-bold">Address 1</label>
                        {showLoqateSugg.address1 &&
                          LoqateSugg(
                            showLoqateSugg.address1,
                            "address1",
                            props.site_address1
                          )}
                      </div>
                      {errors.site_Address1 && touched.site_Address1 ? (
                        <div className="error text-danger mt-1">
                          {errors.site_Address1}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="gl-input form-group mb-0">
                        <Field
                          type="text"
                          name="site_Address1"
                          className="form-control"
                          value={props.site_address2}
                          placeholder="Address 2"
                          onChange={(e) =>
                            props.setSiteAddress2(e.target.value)
                          }
                        />
                        <label className="fs-7 fw-bold">Address 2</label>
                      </div>
                      {errors.site_Address2 && touched.site_Address2 ? (
                        <div className="error text-danger mt-1">
                          {errors.site_Address2}
                        </div>
                      ) : null}
                    </div>
                  </div> */}
                  {/* <div className="row mb-3">
                    <div className="col-12 col-md-6">
                      <div className="gl-input form-group mb-0">
                        <Field
                          type="text"
                          name="site_Postcode"
                          className="form-control"
                          value={props.site_postcode}
                          placeholder="Postcode"
                          onChange={(e) => {
                            props.setSitePostcode(e.target.value);
                          }}
                        />
                        <label className="fs-7 fw-bold">Postcode</label>
                      </div>
                      {errors.site_Postcode && touched.site_Postcode ? (
                        <div className="error text-danger mt-1">
                          {errors.site_Postcode}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="gl-input form-group mb-0">
                        <Field
                          type="text"
                          name="site_City"
                          className="form-control"
                          value={props.site_city}
                          placeholder="Postcode"
                          onChange={(e) => props.setSiteCity(e.target.value)}
                        />
                        <label className="fs-7 fw-bold">City</label>
                      </div>
                      {errors.site_City && touched.site_City ? (
                        <div className="error text-danger mt-1">
                          {errors.site_City}
                        </div>
                      ) : null}
                    </div>
                  </div> */}
                  <div className="row mb-3">
                    <div className="col-12 col-md-12">
                      <div className="gl-input-simple form-group mb-0">
                        <label className="fw-bold fs-7">
                          Site Access Instruction
                        </label>
                        <Field
                          as="textarea" // Use "textarea" as the component
                          id="description"
                          name="site_AccessInstruction"
                          value={props.site_access_instruction}
                          className="form-control"
                          placeholder="Site Access Instruction"
                          rows="4" // Set the number of rows
                          onChange={(e) =>
                            props.setSiteAccessInstruction(e.target.value)
                          } // Use onChange to update state
                        />
                      </div>
                      {errors.site_AccessInstruction &&
                      touched.site_AccessInstruction ? (
                        <div className="error text-danger mt-1">
                          {errors.site_AccessInstruction}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12 col-md-12">
                      <div className="form-group mb-0">
                        <label className="fs-7 fw-bold">
                          Select colour (Used for calendar display){" "}
                        </label>
                        {/* <Field
                          type="color"
                          name="site_LabelColor"
                          className="form-control"
                          value={props.site_label_color}
                          ref={colorInputRef}
                          placeholder="Select colour (Used for calendar display) "
                          onChange={(e) =>
                            props.setSiteLableColor(e.target.value)
                          }
                        /> */}
                        <Dropdown className={`${styles.color_label_dropdown}`}>
                          <Dropdown.Toggle
                            variant="d"
                            id="dropdown-basic"
                            className={`${styles.color_label_btn}  d-flex justify-content-between align-items-center`}
                          >
                            <span
                              style={{
                                backgroundColor: props.site_label_color
                                  ? props.site_label_color
                                  : colorArr[0],
                              }}
                              className={`${styles.site_label_color} rounded-circle`}
                            ></span>
                          </Dropdown.Toggle>

                          <Dropdown.Menu
                            className={`${styles.color_label_list} border-0 box-shadow`}
                          >
                            <ul className="m-0 pl-0 py-2">
                              {colorArr?.map((val, i) => {
                                return (
                                  <li
                                    className={` py-1 my-2 ${
                                      props.site_label_color == val &&
                                      styles.active
                                    }`}
                                    onClick={() => {
                                      props.setSiteLableColor(val);
                                    }}
                                  >
                                    <span
                                      style={{
                                        backgroundColor: val,
                                      }}
                                      className={`${styles.site_label_color} rounded-circle`}
                                    ></span>
                                  </li>
                                );
                              })}
                              {/* <li
                                className={`px-2 py-1 my-2 ${
                                  props.site_label_color == "#E67B73" &&
                                  styles.active
                                }`}
                                onClick={() => {
                                  props.setSiteLableColor("#E67B73");
                                  // setFieldValue("site_LabelColor", "#E67B73");
                                }}
                              >
                                <span
                                  style={{
                                    backgroundColor: "#E67B73",
                                  }}
                                  className={`${styles.site_label_color} rounded-circle`}
                                ></span>
                              </li>
                              <li
                                className={`px-2 py-1 my-2 ${
                                  props.site_label_color == "#F4511E" &&
                                  styles.active
                                }`}
                                onClick={() => {
                                  props.setSiteLableColor("#F4511E");
                                  // setFieldValue("site_LabelColor", "#F4511E");
                                }}
                              >
                                <span
                                  style={{
                                    backgroundColor: "#F4511E",
                                  }}
                                  className={`${styles.site_label_color} rounded-circle`}
                                ></span>
                              </li>
                              <li
                                className={`px-2 py-1 my-2 ${
                                  props.site_label_color == "#F5BF27" &&
                                  styles.active
                                }`}
                                onClick={() => {
                                  props.setSiteLableColor("#F5BF27");
                                  // setFieldValue("site_LabelColor", "#F5BF27");
                                }}
                              >
                                <span
                                  style={{
                                    backgroundColor: "#F5BF27",
                                  }}
                                  className={`${styles.site_label_color} rounded-circle`}
                                ></span>
                              </li> */}
                            </ul>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      {errors.site_LabelColor && touched.site_LabelColor ? (
                        <div className="error text-danger mt-1">
                          {errors.site_LabelColor}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {/* <div className="row mb-3">
                    <div className="col-12 col-md-12 position-relative">
                      <ColorPicker />
                    </div>
                  </div> */}
                  <div className="row mb-2 mt-4">
                    <div className="col-12 col-md-12">
                      <h4>Contact Details</h4>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12 col-md-6">
                      <div className="gl-input form-group mb-0">
                        <Field
                          type="text"
                          name="site_ContactPerson"
                          className="form-control"
                          value={props.site_contact_person}
                          placeholder="Select colour (Used for calendar display) "
                          onChange={(e) =>
                            props.setSiteContactPerson(e.target.value)
                          }
                        />
                        <label className="fs-7 fw-bold">
                          Contact person on site
                        </label>
                      </div>
                      {errors.site_ContactPerson &&
                      touched.site_ContactPerson ? (
                        <div className="error text-danger mt-1">
                          {errors.site_ContactPerson}
                        </div>
                      ) : null}
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="gl-input form-group mb-0">
                        <Field
                          type="text"
                          name="site_ContactNumber"
                          className="form-control"
                          value={props.site_contact_number}
                          placeholder="Select colour (Used for calendar display) "
                          onChange={(e) =>
                            props.setSiteContactNumber(e.target.value)
                          }
                        />
                        <label className="fs-7 fw-bold">Contact Number</label>
                      </div>
                      {errors.site_ContactNumber &&
                      touched.site_ContactNumber ? (
                        <div className="error text-danger mt-1">
                          {errors.site_ContactNumber}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12 col-md-12">
                      <div className={`gl-checkbox mb-3 mb-md-0 `}>
                        <label className="mb-0">
                          <input
                            type="checkbox"
                            name="site_useMyDetail"
                            className=""
                            value="1"
                            checked={
                              props.site_use_my_detail == 1 ? true : false
                            }
                            onChange={(e) => {
                              props.setSiteUseMyDetail(
                                e.target.checked ? "1" : "0"
                              );
                            }}
                          />

                          <span>
                            Use my contact details for site contact person
                            details
                          </span>
                          <span className={`checkmark`}></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <button
                        type="submit"
                        className={`btn btn-md btn-green d-flex align-items-center ${
                          isSubmitting && "loooo"
                        }`}
                        disabled={saveIsloading || updateIsloading}
                      >
                        <span>
                          {props.create_site?.mode == "edit" ? `Update` : `Add`}{" "}
                          Site
                        </span>
                        {(saveIsloading || updateIsloading) && (
                          <Spinner
                            className="ml-2"
                            animation="border"
                            size="sm"
                          />
                        )}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  create_site: state.vantage.shiftReducer.createSite,
  show_create_site: state.vantage.shiftReducer.showCreateSite,
  site_name: state.vantage.shiftReducer.siteName,
  site_reference: state.vantage.shiftReducer.siteReference,

  site_address1: state.vantage.shiftReducer.siteAddress1,
  site_address2: state.vantage.shiftReducer.siteAddress2,
  site_postcode: state.vantage.shiftReducer.sitePostcode,
  site_city: state.vantage.shiftReducer.siteCity,
  site_access_instruction: state.vantage.shiftReducer.siteAccessInstruction,

  site_label_color: state.vantage.shiftReducer.siteLableColor,
  site_contact_person: state.vantage.shiftReducer.siteContactPerson,
  site_contact_number: state.vantage.shiftReducer.siteContactNumber,
  site_use_my_detail: state.vantage.shiftReducer.siteUseMyDetail,
});
const mapDispatchToProps = (dispatch) => ({
  getLoqateSuggestionsByText: (text, contanier) =>
    dispatch(getLoqateSuggestionsByText(text, contanier)),

  getLoqateSuggestionById: getLoqateSuggestionById,
  getLoqateSuggestionByIdWithPromise: (id) =>
    dispatch(getLoqateSuggestionById(id)),

  setCreateSite: (mode) => dispatch(setCreateSite(mode)),
  setShowCreateSite: (show) => dispatch(setShowCreateSite(show)),
  setSiteName: (name) => dispatch(setSiteName(name)),
  setSiteReference: (ref) => dispatch(setSiteReference(ref)),
  setSiteAddress1: (val) => dispatch(setSiteAddress1(val)),
  setSiteAddress2: (val) => dispatch(setSiteAddress2(val)),
  setSitePostcode: (data) => dispatch(setSitePostcode(data)),
  setSiteCity: (code) => dispatch(setSiteCity(code)),
  setSiteAccessInstruction: (val) => dispatch(setSiteAccessInstruction(val)),
  setSiteLableColor: (val) => dispatch(setSiteLableColor(val)),
  setSiteContactPerson: (val) => dispatch(setSiteContactPerson(val)),
  setSiteContactNumber: (val) => dispatch(setSiteContactNumber(val)),
  setSiteUseMyDetail: (val) => dispatch(setSiteUseMyDetail(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateSite);
