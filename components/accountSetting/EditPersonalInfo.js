import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styles from "./PersonalInfo.module.scss";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";

import {
  getLoqateSuggestionsByText,
  getLoqateSuggestionById,
} from "../../redux/actions/accountSettings";

import { fetchCompanyNameSuggestions } from "../../redux/actions/signup";
import { updateAccountSettingInfo } from "../../redux/actions/accountSettings";
import {
  setDecisionMakerFirstName,
  setDecisionMakerLastName,
  setUserMobileNumber,
  setUserAddressOne,
  setUserCity,
  setUserPostCode,
  setUserAddressTwo,
  setOrganisationName,
} from "../../redux/actions/userAction";
import {
  setOrganisationSize,
  updateOrganisationName,
} from "../../redux/actions/organisationAction";
import { Spinner } from "react-bootstrap";

let compnaySchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .max(40, "name cannot more than 40 character")
    .required("Please enter name"),
  email_address: yup
    .string()
    .email("Please enter a valid email address")
    .required("Please enter email address"),
  company_name: yup.string().trim().required("Please enter company name"),
  mobile_number: yup
    .string()
    .required("Please enter mobile no")
    .test(
      "len",
      "Please enter a valid contact no",
      (val) => val?.toString()?.length >= 11 && val?.toString()?.length <= 12
    ),
  city: yup.string().trim(),
  postcode: yup.string().trim(),
  address1: yup.string().trim(),
});

const EditPersonalInfo = (props) => {
  const [loqateResponeforText, setLoqateResponeforText] = useState([]);
  const [showLoqateSugg, setShowLoqateSugg] = useState({
    address1: false,
    address2: false,
    city: false,
    postCode: false,
  });

  const [compnayAddress, setCompnayAddress] = useState(
    props.address1 ? props.address1 : ""
  );
  const [compnayAddress2, setCompnayAddress2] = useState(
    props.address2 ? props.address2 : ""
  );
  const [postCode, setPostCode] = useState(
    props.postcode ? props.postcode : ""
  );
  const [city, setCity] = useState(props.city ? props.city : "");

  const LoqateSugg = (show, keyName, fieldToCheck) => {
    const payloadFroShowLoqate = {
      ...showLoqateSugg,
      [keyName]: false,
    };
    return show && fieldToCheck != "" && !loqateResponeforText[0]?.Error ? (
      <div className={`${styles.custom_dropdown}`}>
        <div className={`${styles.close_dropdown} m-2`}>
          <img
            src={process.env.APP_URL + "/images/c-remove.svg"}
            onClick={() => setShowLoqateSugg(payloadFroShowLoqate)}
            className="cursor-pointer"
          />
        </div>
        <ul className="pt-4 mt-3">
          {/* <li
                        class="closelist"
                        onClick={() => setShowLoqateSugg(payloadFroShowLoqate)}
                    >
                        ✕
                    </li> */}
          {loqateResponeforText.map((value, idx) => {
            return (
              <li
                key={idx}
                onClick={(e) => {
                  if (value.Type == "Address") {
                    props
                      .getLoqateSuggestionByIdWithPromise(value.Id)
                      .then((res) => {
                        setPostCode(res.Items[0]?.PostalCode);
                        setCity(res.Items[0]?.City);
                        setCompnayAddress(
                          res.Items[0]?.Line1 + ", " + res.Items[0]?.Line2
                        );
                        setCompnayAddress2(res.Items[0]?.Line3 ?? "");
                      });
                    setShowLoqateSugg(payloadFroShowLoqate);
                  } else {
                    props
                      .getLoqateSuggestionsByText(postCode, value.Id)
                      .then((response) => {
                        setLoqateResponeforText(response.data);
                      });
                  }
                }}
              >
                {value.Text + " " + value.Description}
              </li>
            );
          })}
        </ul>
      </div>
    ) : null;
  };

  const [companyName, setCompanyName] = useState(
    props.user_name ? props.user_name : ""
  );
  const [showCompanySuggestions, setShowCompanySuggestions] = useState(false);
  const [isSubmittingLoading, setIsSubmitting] = useState(false);
  const [isOwner, setIsOwner] = useState(props.is_account_owner);
  const [name, setName] = useState(
    `${props.decision_maker_first_name} ${props.decision_maker_last_name}`
  );
  const [mobileNumber, setMobileNumber] = useState(
    props.employers_mobile_number ? props.employers_mobile_number : "-"
  );
  const [organisationSize, setOrganisationSize] = useState(
    props.organisationSize ? props.organisationSize : "-"
  );

  useEffect(() => {
    setIsOwner((prevCheck) => !prevCheck);
  }, []);

  return (
    <>
      {/* <div
        className={`table-card box-shadow mt-4 mt-md-4 ${styles.table_card}`}
      > */}
      <div className="d-flex align-items-center justify-content-between pr-md-3">
        <h4>Details</h4>
      </div>
      <div className={`table-wrap ${styles.table_wrap}`}>
        {/* <div
                    className={`table-responsive courses-table ${styles.persoanl_table}`}
                > */}
        <Formik
          enableReinitialize={true}
          htmlFor="amazing"
          initialValues={{
            name: name,
            email_address: props.user_email,
            company_name: companyName,
            mobile_number: mobileNumber,
            company_size: organisationSize,
            postcode: postCode,
            address1: compnayAddress,
            address2: compnayAddress2,
            city: city,
          }}
          validationSchema={compnaySchema}
          onSubmit={async (values, actions) => {
            setIsSubmitting(true);
            const splitName = values.name.split(" ");
            values.decision_maker_first_name = splitName[0];
            splitName.splice(0, 1); // remove first index of name
            values.decision_maker_last_name = splitName.join(" ");
            delete values.name;
            delete values.email_address;
            const data = await props.updateAccountSettingInfo(
              props.user_token,
              values
            );
            if (data.ok) {
              //updating redux store
              props.setDecisionMakerFirstName(values.decision_maker_first_name);
              props.setDecisionMakerLastName(values.decision_maker_last_name);
              props.setUserMobileNumber(values.mobile_number);
              props.setUserAddressOne(values.address1);
              props.setUserCity(values.city);
              props.setUserPostCode(values.postcode);
              props.setUserAddressTwo(values.address2);
              props.setEditHandler(false);
              if (isOwner === false) {
                props.updateOrganisationName(
                  props.organisation_id,
                  values.company_name
                );
                props.setOrganisationName(values.company_name);
                props.setOrganisationSize(values.company_size);
              }
            }
          }}
        >
          {({ errors, values, touched, isSubmitting, setFieldValue }) => (
            <Form>
              <div className={`${styles.table_view_wrap}`}>
                <div className={`${styles.table_list}`}>
                  <div className={`${styles.column} ${styles.column_first}`}>
                    <label htmlFor="name">Name: </label>
                  </div>
                  <div className={`${styles.column}`}>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                      placeholder="Enter name"
                    />
                    {errors.name && touched.name ? (
                      <div className="error text-danger mt-1">
                        {errors.name}
                      </div>
                    ) : null}
                  </div>
                  <div className={`${styles.column} ${styles.column_first}`}>
                    <label htmlFor="email">Email: </label>
                  </div>
                  <div className={`${styles.column}`}>
                    <Field
                      type="email"
                      name="email_address"
                      className="form-control"
                      placeholder="Enter email"
                      disabled={true}
                    />
                    {errors.email_address && touched.email_address ? (
                      <div className="error text-danger mt-1">
                        {errors.email_address}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className={`${styles.table_list}`}>
                  <div className={`${styles.column} ${styles.column_first}`}>
                    <label htmlFor="mobile_number">Mobile Number: </label>
                  </div>
                  <div className={`${styles.column}`}>
                    <input
                      type="number"
                      name="mobile_number"
                      className="form-control"
                      value={mobileNumber}
                      placeholder="Enter contact no"
                      onChange={(e) => setMobileNumber(e.target.value)}
                    />
                    {errors.mobile_number && touched.mobile_number ? (
                      <div className="error text-danger mt-1">
                        {errors.mobile_number}
                      </div>
                    ) : null}
                  </div>
                  <div
                    className={`${styles.column} ${styles.column_first}`}
                  ></div>
                  <div className={`${styles.column}`}></div>
                </div>
                <div className={`${styles.table_list}`}>
                  <div className={`${styles.column} ${styles.column_first}`}>
                    <label htmlFor="company_name">Company Name: </label>
                  </div>
                  <div className={`${styles.column}`}>
                    <div className="position-relative">
                      <input
                        type="text"
                        name="company_name"
                        value={companyName}
                        className="form-control"
                        placeholder="Company Name"
                        autoComplete="off"
                        onChange={async (e) => {
                          setCompanyName(e.target.value);
                          if (e.target.value?.length >= 3) {
                            setShowCompanySuggestions(true);
                            props.fetchCompanyNameSuggestions(e.target.value);
                          }
                        }}
                        disabled={isOwner}
                      />
                      {errors.company_name && touched.company_name ? (
                        <div className="error text-danger mt-1">
                          {errors.company_name}
                        </div>
                      ) : null}

                      {showCompanySuggestions &&
                      props.compnay_name_suggestions?.length > 0 ? (
                        <>
                          <div
                            className={`custom-dropdown ${styles.custom_dropdown}`}
                          >
                            <div className={`${styles.close_dropdown} m-2`}>
                              <img
                                src={
                                  process.env.APP_URL + "/images/c-remove.svg"
                                }
                                onClick={() => setShowCompanySuggestions(false)}
                                className="cursor-pointer"
                              />
                            </div>

                            <ul className="pt-4 mt-3">
                              {props.compnay_name_suggestions?.map(
                                (company) => {
                                  return (
                                    <li
                                      onClick={() => {
                                        setCompanyName(company);
                                        setShowCompanySuggestions(false);
                                      }}
                                    >
                                      {company}
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div className={`${styles.column} ${styles.column_first}`}>
                    <label htmlFor="company_size">Company Size: </label>
                  </div>
                  <div className={`${styles.column}`}>
                    <select
                      className="form-control"
                      as="select"
                      name="company_size"
                      value={values.company_size}
                      disabled={isOwner}
                      onChange={(e) => setOrganisationSize(e.target.value)}
                    >
                      <option value="">Company Size</option>
                      <option value="Company (1-5 employees)">
                        Company (1-5 employees)
                      </option>
                      <option value="Company (6-10 employees)">
                        Company (6-10 employees)
                      </option>
                      <option value="Company (11-20 employees)">
                        Company (11-20 employees)
                      </option>
                      <option value="Company (21-50 employees)">
                        Company (21-50 employees)
                      </option>
                      <option value="Company (51-100 employees)">
                        Company (51-100 employees)
                      </option>
                      <option value="Company (101-250 employees)">
                        Company (101-250 employees)
                      </option>
                      <option value="Company (501-3,500 employees)">
                        Company (501-3,500 employees)
                      </option>
                      <option value="Recruiting Firm">Recruiting Firm</option>
                      <option value="Staffing Agency">Staffing Agency</option>
                    </select>
                    {errors.company_size && touched.company_size ? (
                      <div className="error text-danger mt-1">
                        {errors.company_size}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className={`${styles.table_list}`}>
                  <div className={`${styles.column} ${styles.column_first}`}>
                    <label htmlFor="address1">Address 1: </label>
                  </div>
                  <div className={`${styles.column}`}>
                    {/* <Field type="text" name="address1" placeholder="Enter address 1" />
                                            {errors.address1 && touched.address1 ? <div className="error text-danger mt-1">{errors.address1}</div> : null} */}
                    <div className="position-relative">
                      <input
                        className="form-control w-100"
                        name="address1"
                        autoComplete="off"
                        value={compnayAddress}
                        onChange={(e) => {
                          setCompnayAddress(e.target.value);
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
                      {showLoqateSugg.address1 &&
                        LoqateSugg(
                          showLoqateSugg.address1,
                          "address1",
                          compnayAddress
                        )}
                    </div>
                  </div>
                  <div className={`${styles.column} ${styles.column_first}`}>
                    <label htmlFor="address2">Address 2: </label>
                  </div>
                  <div className={`${styles.column}`}>
                    <div className="position-relative">
                      <input
                        type={"text"}
                        autoComplete="off"
                        className="form-control w-100"
                        name="companyAddress2"
                        value={compnayAddress2}
                        onChange={(e) => {
                          setCompnayAddress2(e.target.value);
                          if (e.target.value != "") {
                            setShowLoqateSugg({
                              ...showLoqateSugg,
                              address2: true,
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
                      {showLoqateSugg.address2 &&
                        LoqateSugg(
                          showLoqateSugg.address2,
                          "address2",
                          compnayAddress2
                        )}
                    </div>
                  </div>
                </div>
                <div className={`${styles.table_list}`}>
                  <div className={`${styles.column} ${styles.column_first}`}>
                    <label htmlFor="postcode">Postcode: </label>
                  </div>
                  <div className={`${styles.column}`}>
                    <div className="position-relative">
                      <input
                        type={"text"}
                        autoComplete="off"
                        className="form-control w-100"
                        name="postcode"
                        value={postCode}
                        onChange={(e) => {
                          setPostCode(e.target.value);
                          if (e.target.value != "") {
                            setShowLoqateSugg({
                              ...showLoqateSugg,
                              postCode: true,
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
                      {showLoqateSugg.postCode &&
                        LoqateSugg(
                          showLoqateSugg.postCode,
                          "postCode",
                          postCode
                        )}
                      {errors.postcode && touched.postcode ? (
                        <div className="error text-danger mt-1">
                          {errors.postcode}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className={`${styles.column} ${styles.column_first}`}>
                    <label htmlFor="city">City: </label>
                  </div>
                  <div className={`${styles.column}`}>
                    <div className="position-relative">
                      <input
                        className="form-control w-100"
                        name="city"
                        autoComplete="off"
                        value={city}
                        onChange={(e) => {
                          e.preventDefault();
                          setCity(e.target.value);
                          if (e.target.value != "") {
                            setShowLoqateSugg({
                              ...showLoqateSugg,
                              city: true,
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
                      {showLoqateSugg.city &&
                        LoqateSugg(showLoqateSugg.city, "city", city)}
                      {errors.city && touched.city ? (
                        <div className="error text-danger mt-1">
                          {errors.city}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className={`${styles.table_list} pb-0`}>
                  <div className={`${styles.column}`}>
                    <div className="d-flex align-items-center justify-content-end">
                      <button
                        type="button"
                        className={`btn btn-md btn-secondary py-2 px-4 w-100 w-md-auto d-md-flex align-items-center mr-2 ${styles.button}`}
                        onClick={() => props.setEditHandler(false)}
                      >
                        <span>Cancel</span>
                      </button>
                      <button
                        type="submit"
                        className={`btn btn-md btn-green py-2 px-4 w-100 w-md-auto d-md-flex align-items-center ${styles.button}`}
                        disabled={isSubmittingLoading}
                      >
                        <span>Update</span>
                        {isSubmittingLoading && (
                          <Spinner
                            animation="border"
                            size="sm"
                            className="ml-2"
                          />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        {/* </div> */}
      </div>
      {/* </div> */}
    </>
  );
};

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  user_name: state.vantage.userDataReducer.user_name,
  user_id: state.vantage.userDataReducer.user_id,
  decision_maker_first_name:
    state.vantage.userDataReducer.decision_maker_first_name,
  decision_maker_last_name:
    state.vantage.userDataReducer.decision_maker_last_name,
  user_email: state.vantage.userDataReducer.user_email,
  organisationSize: state.vantage.organisationReducer.organisationSize,
  employers_mobile_number: state.vantage.userDataReducer.user_mobile_number,
  address1: state.vantage.userDataReducer.address1,
  address2: state.vantage.userDataReducer.address2,
  city: state.vantage.userDataReducer.city,
  postcode: state.vantage.userDataReducer.postcode,
  allOrganisations: state.vantage.organisationReducer.allOrganisations,
  compnay_name_suggestions: state.vantage.commonReducer.companyNameSuggestion,
  is_account_owner: state.vantage.organisationReducer.isAccountOwner,
  organisation_id: state.vantage.organisationReducer.organistaionId,
});

const mapDispatchToProps = (dispatch) => ({
  getLoqateSuggestionsByText: (text, contanier) =>
    dispatch(getLoqateSuggestionsByText(text, contanier)),
  getLoqateSuggestionById: getLoqateSuggestionById,
  getLoqateSuggestionByIdWithPromise: (id) =>
    dispatch(getLoqateSuggestionById(id)),
  fetchCompanyNameSuggestions: (companyName) =>
    dispatch(fetchCompanyNameSuggestions(companyName)),
  updateAccountSettingInfo: (userToken, data) =>
    dispatch(updateAccountSettingInfo(userToken, data)),
  setDecisionMakerFirstName: (data) =>
    dispatch(setDecisionMakerFirstName(data)),
  setDecisionMakerLastName: (data) => dispatch(setDecisionMakerLastName(data)),
  setUserMobileNumber: (data) => dispatch(setUserMobileNumber(data)),
  setUserAddressOne: (data) => dispatch(setUserAddressOne(data)),
  setUserCity: (data) => dispatch(setUserCity(data)),
  setUserPostCode: (data) => dispatch(setUserPostCode(data)),
  setUserAddressTwo: (data) => dispatch(setUserAddressTwo(data)),
  setOrganisationName: (data) => dispatch(setOrganisationName(data)),
  setOrganisationSize: (data) => dispatch(setOrganisationSize(data)),
  updateOrganisationName: (organisationId, organisationName) =>
    dispatch(updateOrganisationName(organisationId, organisationName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPersonalInfo);
