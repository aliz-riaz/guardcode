import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styles from "./PersonalInfo.module.scss";
import {
  getCompanyInfo,
  getCoverage,
  getServices,
  getAccredition,
  getBenefits,
  updateCompanyDetailPageInfo,
  getLoqateSuggestionsByText,
  getLoqateSuggestionById,
} from "../../redux/actions/accountSettings";
import DatePicker from "react-datepicker";
import moment from "moment";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Multiselect from "multiselect-react-dropdown";
import "react-datepicker/dist/react-datepicker.css";
import { Spinner } from "react-bootstrap";
import ImageUploadModal from "./ImageUploadModal";

let compnaySchema = yup.object().shape({
  companyName: yup.string().trim().required("Please enter company name"),
  compnayAddress: yup.string().trim().required("Please enter address"),
  city: yup.string().trim().required("Please enter city"),
  postCode: yup.string().trim().required("Please enter postcode"),
  contact: yup
    .string()
    .required("Please enter contact no")
    .test(
      "len",
      "Please enter a valid contact no",
      (val) => val?.toString()?.length >= 10 && val?.toString()?.length <= 11
    ),
  companyEmail: yup
    .string()
    .email("Please enter a valid email address")
    .required("Please enter email address"),
  companyWebsite: yup
    .string()
    .url("Please enter a valid url ex: https://www.example.com")
    .required("Please enter website"),
  facebookLink: yup
    .string()
    .url("Please enter a valid url ex: https://www.example.com")
    .nullable(),
  instagramLink: yup
    .string()
    .url("Please enter a valid url ex: https://www.example.com")
    .nullable(),
  twitterLink: yup
    .string()
    .url("Please enter a valid url ex: https://www.example.com")
    .nullable(),

  servicesChecked: yup
    .array()
    .min(1, "Please select atleast one service you provide")
    .required("Please select atleast one service you provide"),
});
const ConmpnayDetail = (props) => {
  const [copyLinkStaus, setCopyLinkStaus] = useState(false);
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpenn] = useState(false);
  const [serviceCoverageArr, setServiceCoverageArr] = useState([]);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [accreditionArr, setAccreditionArr] = useState([]);
  const [benefitsArr, setBenefitsArr] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [companyName, setCompnayName] = useState("");
  const [companyImage, setCompnayImage] = useState("");
  const [userSelectedImage, setUserSelectedImage] = useState(null);
  const [companyWebsite, setCompnayWebsite] = useState("");
  const [companyEmail, setCompnayEmail] = useState("");
  const [contact, setContact] = useState("");
  const [compnayLink, setCompnayLink] = useState("");

  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");

  const [compnayAddress, setCompnayAddress] = useState("");
  const [compnayAddress2, setCompnayAddress2] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");

  const [coverage, setCoverage] = useState([]);

  const [services, setServices] = useState([]);
  const [servicesChecked, setServicesChecked] = useState([]);
  const [siaAcsUrl, setSiaAcsUrl] = useState("");
  const [acsRef, setAcsRef] = useState("");
  const [expiry, setExpiry] = useState(null);
  const [accreditions, setAccreditions] = useState([]);
  const [companyAbout, setCompanyAbout] = useState("");
  const [benefits, setBenefits] = useState([]);
  const [benefitsChecked, setBenefitsChecked] = useState([]);

  //loquate
  const [loqateResponeforText, setLoqateResponeforText] = useState([]);
  const [showLoqateSuggAddress1, setShowLoqateSuggAddress1] = useState(false);
  const [showLoqateSuggAddress2, setShowLoqateSuggAddress2] = useState(false);
  const [showLoqateSuggCity, setShowLoqateSuggCity] = useState(false);
  const [showLoqateSuggPostCode, setShowLoqateSuggPostCode] = useState(false);

  useEffect(() => {
    if (
      process.browser &&
      CKEditor == undefined &&
      ClassicEditor == undefined
    ) {
      editorRef.current = {
        CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
        ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
      };
      setEditorLoaded(true);
    }
  }, []);

  useEffect(async () => {
    const companyData = await props.getCompanyInfo(props.user_token);
    setCompnayName(companyData.company.title);
    setCompnayWebsite(companyData.company.website);
    setCompnayLink(companyData.company.slug);
    setCompnayImage(companyData.company.brand.logo_url);
    setCompnayEmail(companyData.company.email_address);
    setContact(companyData.company.contact_no);
    setFacebookLink(companyData.company.facebook);
    setInstagramLink(companyData.company.instagram);
    setTwitterLink(companyData.company.twitter);
    setCoverage(
      companyData.company.servicecoverage?.map((coverage) => ({
        id: coverage.coverage.id,
        name: coverage.coverage.title,
      }))
    );
    setServices(companyData.company.services.map((ser) => ser.service));
    setAccreditions(
      companyData.company.accreditations?.map((acc) => ({
        id: acc.accreditation.id,
        name: acc.accreditation.title,
        image: acc.accreditation.image,
      }))
    );
    setServicesChecked(
      companyData.company.services.map((service) => service.service.id)
    );
    setSiaAcsUrl(companyData.company.sia_acs_url);
    setAcsRef(companyData.company.sia_acs_reference);
    setExpiry(companyData.company.sia_acs_expiry);
    setCompanyAbout(companyData.company.about);
    setBenefits(companyData.company.benefits.map((benefit) => benefit.benefit));
    setBenefitsChecked(
      companyData.company.benefits.map((benefit) => benefit.benefit.id)
    );
    setCompnayAddress(companyData.company.address);
    setCompnayAddress2(companyData.company.address2);
    setPostCode(companyData.company.postcode);
    setCity(companyData.company.city);
  }, [editMode]);
  useEffect(async () => {
    setLoading(true);

    const servicesCoverage = await props.getCoverage(props.user_token);
    const accredition = await props.getAccredition(props.user_token);
    const AllBenefits = await props.getBenefits(props.user_token);
    const allServices = await props.getServices(props.user_token);
    const companyData = await props.getCompanyInfo(props.user_token);

    setServiceCoverageArr(servicesCoverage);
    setAccreditionArr(
      accredition?.map((acc) => ({
        id: acc.id,
        name: acc.title,
        image: acc.image,
      }))
    );
    setBenefitsArr(AllBenefits);
    setServiceOptions(allServices);

    setCompnayName(companyData.company.title);
    setCompnayWebsite(companyData.company.website);
    setCompnayImage(companyData.company.brand.logo_url);
    setCompnayEmail(companyData.company.email_address);
    setContact(companyData.company.contact_no);
    setFacebookLink(companyData.company.facebook);
    setInstagramLink(companyData.company.instagram);
    setTwitterLink(companyData.company.twitter);
    setCoverage(
      companyData.company.servicecoverage?.map((coverage) => ({
        id: coverage.coverage.id,
        name: coverage.coverage.title,
      }))
    );
    setServices(companyData.company.services.map((ser) => ser.service));
    setAccreditions(
      companyData.company.accreditations?.map((acc) => ({
        id: acc.accreditation.id,
        name: acc.accreditation.title,
        image: acc.accreditation.image,
      }))
    );
    setServicesChecked(
      companyData.company.services.map((service) => service.service.id)
    );
    setSiaAcsUrl(companyData.company.sia_acs_url);
    setAcsRef(companyData.company.sia_acs_reference);
    setExpiry(companyData.company.sia_acs_expiry);
    setCompanyAbout(companyData.company.about);
    setBenefits(companyData.company.benefits.map((benefit) => benefit.benefit));
    setBenefitsChecked(
      companyData.company.benefits.map((benefit) => benefit.benefit.id)
    );
    setCompnayAddress(companyData.company.address);
    setCompnayAddress2(companyData.company.address2);
    setPostCode(companyData.company.postcode);
    setCity(companyData.company.city);

    setLoading(false);
  }, []);

  const LoqateSugg = (show, setShowFn, fieldToCheck) => {
    return show && fieldToCheck != "" && !loqateResponeforText[0]?.Error ? (
      <div className="custom-dropdown">
        <ul>
          <li class="closelist" onClick={() => setShowFn(false)}>
            ✕
          </li>
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
                    setShowFn(false);
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

  if (loading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "300px" }}
      >
        <Spinner animation="border" role="status">
          <span className="visually-hidden"></span>
        </Spinner>
      </div>
    );
  }

  const copyLink = () => {
    setCopyLinkStaus(true);
    navigator.clipboard.writeText(
      `${process.env.COMPANY_DIR_URL}${compnayLink}`
    );
    setTimeout(() => {
      setCopyLinkStaus(false);
    }, 1000);
  };
  return (
    <div className={`table-card box-shadow mt-4 mt-md-4 ${styles.table_card}`}>
      <div className="d-flex justify-content-between align-items-center">
        <h4>Company info</h4>
        {editMode ? (
          <div
            className="pr-3 cursor-pointer"
            onClick={() => setEditMode(!editMode)}
          >
            <img
              src={`${process.env.APP_URL}/images/cancel.svg`}
              width="14px"
            />
          </div>
        ) : (
          <button
            className={`btn btn-md bg-transparent py-2 mr-2 pr-3 mt-2 mt-md-0 ${styles.edit_button}`}
            onClick={() => setEditMode(!editMode)}
          >
            <img src={process.env.APP_URL + "/images/edit-2.svg"} alt="icon" />
            <span>Edit</span>
          </button>
        )}
      </div>
      <Formik
        enableReinitialize={true}
        initialValues={{
          companyName,
          companyWebsite,
          companyEmail,
          contact,

          compnayAddress,
          compnayAddress2,
          postCode,
          city,

          facebookLink,
          instagramLink,
          twitterLink,

          siaAcsUrl,
          acsRef,
          expiry,

          companyAbout,
          servicesChecked,
          services,
          benefits,
        }}
        validationSchema={compnaySchema}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true);
          await props.updateCompanyDetailPageInfo(props.user_token, {
            title: companyName,
            website: companyWebsite,
            logo_data: userSelectedImage ? userSelectedImage : null,
            email_address: companyEmail,
            contact_no: contact,

            address: compnayAddress,
            address2: compnayAddress2,
            city: city,
            postcode: postCode,

            facebook: facebookLink,
            instagram: instagramLink,
            twitter: twitterLink,

            about: companyAbout,

            sia_acs_reference: acsRef,
            sia_acs_url: siaAcsUrl,
            sia_acs_expiry:
              expiry == "Invalid date"
                ? null
                : moment(expiry).format("YYYY-MM-DD").toString(),
            services: servicesChecked,
            accreditations: accreditions?.map((acc) => acc.id),
            benefits: benefitsChecked,
            service_coverage: coverage.map((coverage) => coverage.id),
          });
          setBenefits(
            benefitsArr.filter((ben) => benefitsChecked.includes(ben.id))
          );
          setServices(
            serviceOptions.filter((serv) => servicesChecked.includes(serv.id))
          );

          setEditMode(false);
          actions.setSubmitting(false);
        }}
      >
        {({ errors, values, touched, isSubmitting, setFieldValue }) => (
          <Form className="w-100 px-2 px-md-0" id="companyDetail">
            <div className={`table-wrap ${styles.table_wrap}`}>
              <div
                className={`table-responsive courses-table ${styles.persoanl_table}`}
              >
                <table className={`table ${styles.table}`}>
                  <tbody>
                    <tr>
                      <td colSpan={"4"}>
                        <span className="position-relative">
                          <a
                            href={`${process.env.COMPANY_DIR_URL}${compnayLink}`}
                            target="_blank"
                          >{`${process.env.COMPANY_DIR_URL}${compnayLink}`}</a>
                          <span
                            onClick={copyLink}
                            className="cursor-pointer ml-2"
                          >
                            <img
                              src={`${process.env.APP_URL}/images/copy_icon.svg`}
                              height="16px"
                            />
                          </span>
                          {copyLinkStaus && (
                            <>
                              <span className={`${styles.copy_txt} ml-2`}>
                                Copied
                              </span>
                            </>
                          )}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        Company name:{" "}
                        {editMode && <span className="text-danger">*</span>}
                      </th>
                      <td>
                        <div className="d-flex align-items-center">
                          {editMode ? (
                            <div
                              className={`gl-input-simple flex-grow-1 mb-0 ${styles.input_field}`}
                            >
                              <input
                                type={"text"}
                                className="form-control w-100"
                                name="companyName"
                                value={companyName}
                                onChange={(e) => {
                                  setCompnayName(e.target.value);
                                }}
                              />
                              {errors.companyName && touched.companyName ? (
                                <div className="error text-danger mt-1">
                                  {errors.companyName}
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <span>{companyName}</span>
                          )}
                        </div>
                      </td>
                      <th>
                        Website:{" "}
                        {editMode && <span className="text-danger">*</span>}
                      </th>
                      <td>
                        <div className="d-flex align-items-center">
                          {editMode ? (
                            <div
                              className={`gl-input-simple flex-grow-1 mb-0 ${styles.input_field}`}
                            >
                              <input
                                type={"text"}
                                className="form-control w-100"
                                name="companyWebsite"
                                value={companyWebsite}
                                onChange={(e) => {
                                  setCompnayWebsite(e.target.value);
                                }}
                              />
                              {errors.companyWebsite &&
                              touched.companyWebsite ? (
                                <div className="error text-danger mt-1">
                                  {errors.companyWebsite}
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <span>
                              <a href={companyWebsite} target="_blank">
                                {companyWebsite}
                              </a>
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>Company logo:</th>
                      <td>
                        {editMode ? (
                          <ImageUploadModal
                            companyImage={companyImage}
                            setCompnayImage={setCompnayImage}
                            setUserSelectedImage={setUserSelectedImage}
                          />
                        ) : (
                          <div className="d-flex align-items-center">
                            <span>
                              <img src={companyImage} width={`42px`} />
                            </span>
                          </div>
                        )}
                      </td>
                      <th>
                        Email:{" "}
                        {editMode && <span className="text-danger">*</span>}
                      </th>
                      <td>
                        <div className="d-flex align-items-center">
                          {editMode ? (
                            <div
                              className={`gl-input-simple flex-grow-1 mb-0 ${styles.input_field}`}
                            >
                              <input
                                type={"text"}
                                className="form-control w-100"
                                name="companyEmail"
                                value={companyEmail}
                                onChange={(e) => {
                                  setCompnayEmail(e.target.value);
                                }}
                              />
                              {errors.companyEmail && touched.companyEmail ? (
                                <div className="error text-danger mt-1">
                                  {errors.companyEmail}
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <span>{companyEmail}</span>
                          )}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        Contact no:{" "}
                        {editMode && <span className="text-danger">*</span>}
                      </th>
                      <td>
                        <div className="d-flex align-items-center">
                          {editMode ? (
                            <div
                              className={`gl-input-simple flex-grow-1 mb-0 ${styles.input_field}`}
                            >
                              <input
                                type={"text"}
                                className="form-control w-100"
                                name="contact"
                                value={contact}
                                onChange={(e) => {
                                  setContact(e.target.value);
                                }}
                              />
                              {errors.contact && touched.contact ? (
                                <div className="error text-danger  mt-1">
                                  {errors.contact}
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <span>{contact}</span>
                          )}
                        </div>
                      </td>
                      <td colSpan={"2"}></td>
                      {/* <th >
                          Compnay profile
                      </th>
                      <td >
                          <a href={`${process.env.COMPANY_DIR_URL}${compnayLink}`} target="_blank">{`${process.env.COMPANY_DIR_URL}${compnayLink}`}</a>
                      </td> */}
                    </tr>
                    <tr className={`${styles.align}`}>
                      <th className="align-baseline">
                        Address line 1:{" "}
                        {editMode && <span className="text-danger">*</span>}
                      </th>
                      <td className="align-baseline">
                        <div className="d-flex  align-items-baseline">
                          {editMode ? (
                            <div
                              className={`gl-input-simple flex-grow-1 mb-0 ${styles.input_field}`}
                            >
                              <input
                                className="form-control w-100"
                                name="companyAddress"
                                autoComplete="off"
                                value={compnayAddress}
                                onChange={(e) => {
                                  setCompnayAddress(e.target.value);
                                  if (e.target.value != "") {
                                    setShowLoqateSuggAddress1(true);
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
                              {showLoqateSuggAddress1 &&
                                LoqateSugg(
                                  showLoqateSuggAddress1,
                                  setShowLoqateSuggAddress1,
                                  compnayAddress
                                )}
                              {errors.compnayAddress &&
                              touched.compnayAddress ? (
                                <div className="error text-danger mt-1">
                                  {errors.compnayAddress}
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <span className={`${styles.address_col}`}>
                              {compnayAddress}
                            </span>
                          )}
                        </div>
                      </td>
                      <th className="align-baseline">Address line 2:</th>
                      <td className="align-baseline">
                        <div className="d-flex align-items-center">
                          {editMode ? (
                            <div
                              className={`gl-input-simple flex-grow-1 mb-0 ${styles.input_field}`}
                            >
                              <input
                                type={"text"}
                                autoComplete="off"
                                className="form-control w-100"
                                name="companyAddress2"
                                value={compnayAddress2}
                                onChange={(e) => {
                                  setCompnayAddress2(e.target.value);
                                  if (e.target.value != "") {
                                    setShowLoqateSuggAddress2(true);
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
                              {showLoqateSuggAddress2 &&
                                LoqateSugg(
                                  showLoqateSuggAddress2,
                                  setShowLoqateSuggAddress2,
                                  compnayAddress2
                                )}
                            </div>
                          ) : (
                            <span>
                              {compnayAddress2 ? compnayAddress2 : "N/A"}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                    <tr className={`${styles.align}`}>
                      <th className="align-baseline">
                        Town/City:{" "}
                        {editMode && <span className="text-danger">*</span>}
                      </th>
                      <td className="align-baseline">
                        <div className="d-flex  align-items-baseline">
                          {editMode ? (
                            <div
                              className={`gl-input-simple flex-grow-1 mb-0 ${styles.input_field}`}
                            >
                              <input
                                className="form-control w-100"
                                name="city"
                                autoComplete="off"
                                value={city}
                                onChange={(e) => {
                                  e.preventDefault();
                                  setCity(e.target.value);
                                  if (e.target.value != "") {
                                    setShowLoqateSuggCity(true);
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
                              {showLoqateSuggCity &&
                                LoqateSugg(
                                  showLoqateSuggCity,
                                  setShowLoqateSuggCity,
                                  city
                                )}

                              {errors.city && touched.city ? (
                                <div className="error text-danger mt-1">
                                  {errors.city}
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <span className={`${styles.address_col}`}>
                              {city}
                            </span>
                          )}
                        </div>
                      </td>
                      <th className="align-baseline">
                        Postcode:{" "}
                        {editMode && <span className="text-danger">*</span>}
                      </th>
                      <td className="align-baseline">
                        <div className="d-flex align-items-center">
                          {editMode ? (
                            <div
                              className={`gl-input-simple flex-grow-1 mb-0 ${styles.input_field}`}
                            >
                              <input
                                type={"text"}
                                autoComplete="off"
                                className="form-control w-100"
                                name="postCode"
                                value={postCode}
                                onChange={(e) => {
                                  setPostCode(e.target.value);
                                  if (e.target.value != "") {
                                    setShowLoqateSuggPostCode(true);
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
                              {showLoqateSuggPostCode &&
                                LoqateSugg(
                                  showLoqateSuggPostCode,
                                  setShowLoqateSuggPostCode,
                                  postCode
                                )}
                              {errors.postCode && touched.postCode ? (
                                <div className="error text-danger mt-1">
                                  {errors.postCode}
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <span>{postCode}</span>
                          )}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>Service coverage:</th>
                      <td>
                        <div className="d-flex align-items-center">
                          {editMode ? (
                            <div className="flex-grow-1">
                              <Multiselect
                                options={serviceCoverageArr.map((service) => ({
                                  id: service.id,
                                  name: service.title,
                                }))}
                                selectedValues={coverage}
                                onSelect={(e) => setCoverage(e)}
                                onRemove={(e) => setCoverage(e)}
                                displayValue="name"
                                showArrow={true}
                                customArrow={""}
                              />

                              {errors.coverage && touched.coverage ? (
                                <div className="error text-danger mt-1">
                                  {errors.coverage}
                                </div>
                              ) : null}
                            </div>
                          ) : coverage.length > 0 ? (
                            coverage.map((coverage, idx) => (
                              <>
                                <span className={`${idx != 0 && "ml-1"}`}>{`${
                                  coverage.name
                                }${
                                  idx != coverage.length - 1 ? `,` : ""
                                }`}</span>
                              </>
                            ))
                          ) : (
                            <>
                              <span>N/A</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td colSpan={"2"}></td>
                    </tr>
                    <tr>
                      <th>Facebook:</th>
                      <td>
                        <div className="d-flex align-items-center">
                          {editMode ? (
                            <div
                              className={`gl-input-simple flex-grow-1 mb-0 ${styles.input_field}`}
                            >
                              <input
                                type={"text"}
                                className="form-control w-100"
                                name="facebookLink"
                                value={facebookLink}
                                onChange={(e) => {
                                  setFacebookLink(e.target.value);
                                }}
                              />
                              {errors.facebookLink && touched.facebookLink ? (
                                <div className="error text-danger mt-1">
                                  {errors.facebookLink}
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <span>
                              {facebookLink ? (
                                <a href={facebookLink} target="_blank">
                                  {facebookLink}
                                </a>
                              ) : (
                                "N/A"
                              )}
                            </span>
                          )}
                        </div>
                      </td>

                      <th>Instagram:</th>
                      <td>
                        <div className="d-flex align-items-center">
                          {editMode ? (
                            <div
                              className={`gl-input-simple flex-grow-1 mb-0 ${styles.input_field}`}
                            >
                              <input
                                type={"text"}
                                className="form-control w-100"
                                name="instagramLink"
                                value={instagramLink}
                                onChange={(e) => {
                                  setInstagramLink(e.target.value);
                                }}
                              />
                              {errors.instagramLink && touched.instagramLink ? (
                                <div className="error text-danger mt-1">
                                  {errors.instagramLink}
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <span>
                              {instagramLink ? (
                                <a href={instagramLink} target="_blank">
                                  {instagramLink}
                                </a>
                              ) : (
                                "N/A"
                              )}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <th>Twitter:</th>
                      <td colSpan={3}>
                        <div className="d-flex align-items-center">
                          {editMode ? (
                            <div
                              className={`gl-input-simple flex-grow-1 mb-0 ${styles.input_field}`}
                            >
                              <input
                                type={"text"}
                                className="form-control w-100"
                                name="twitterLink"
                                value={twitterLink}
                                onChange={(e) => {
                                  setTwitterLink(e.target.value);
                                }}
                              />
                              {errors.twitterLink && touched.twitterLink ? (
                                <div className="error text-danger mt-1">
                                  {errors.twitterLink}
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <span>
                              {twitterLink ? (
                                <a href={twitterLink} target="_blank">
                                  {twitterLink}
                                </a>
                              ) : (
                                "N/A"
                              )}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <th>
                        Services:{" "}
                        {editMode && <span className="text-danger">*</span>}
                      </th>
                      <td colSpan={"3"}>
                        {editMode ? (
                          <>
                            <div className="d-flex align-items-center flex-wrap">
                              {serviceOptions.map((item, index) => {
                                return (
                                  <div
                                    className={`gl-checkbox form-group mb-0 mr-3`}
                                  >
                                    <label>
                                      <input
                                        name="servicesChecked"
                                        type="checkbox"
                                        value={item.id}
                                        defaultChecked={
                                          servicesChecked.includes(item.id)
                                            ? true
                                            : false
                                        }
                                        onChange={(e) => {
                                          e.target.defaultChecked
                                            ? setServicesChecked(
                                                servicesChecked.filter(
                                                  function (f) {
                                                    return f !== item.id;
                                                  }
                                                )
                                              )
                                            : setServicesChecked([
                                                ...servicesChecked,
                                                item.id,
                                              ]);
                                        }}
                                      />
                                      <span>{item.title}</span>
                                      <span className="checkmark"></span>
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                            {errors.servicesChecked &&
                            touched.servicesChecked ? (
                              <div className="error text-danger mt-1">
                                {errors.servicesChecked}
                              </div>
                            ) : null}
                          </>
                        ) : (
                          <div className="d-flex align-items-center">
                            {services.length > 0 ? (
                              services.map((item, idx) => (
                                <span className={`${idx != 0 && "ml-1"}`}>{`${
                                  item.title
                                }${
                                  idx != services.length - 1 ? `,` : ""
                                }`}</span>
                              ))
                            ) : (
                              <span>N/A</span>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>SIA ACS url:</th>
                      <td>
                        <div className="d-flex align-items-center">
                          {editMode ? (
                            <div
                              className={`gl-input-simple flex-grow-1 mb-0 ${styles.input_field}`}
                            >
                              <input
                                type={"text"}
                                className="form-control w-100"
                                value={siaAcsUrl}
                                name="siaAcsUrl"
                                onChange={(e) => {
                                  setSiaAcsUrl(e.target.value);
                                }}
                              />
                              {errors.siaAcsUrl && touched.siaAcsUrl ? (
                                <div className="error text-danger mt-1">
                                  {errors.siaAcsUrl}
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <span>{siaAcsUrl ? siaAcsUrl : "N/A"}</span>
                          )}
                        </div>
                      </td>
                      <th>SIA ACS no#:</th>
                      <td>
                        <div className="d-flex align-items-center">
                          {editMode ? (
                            <div
                              className={`gl-input-simple flex-grow-1 mb-0 ${styles.input_field}`}
                            >
                              <input
                                type={"text"}
                                className="form-control w-100"
                                value={acsRef}
                                onChange={(e) => setAcsRef(e.target.value)}
                              />
                            </div>
                          ) : (
                            <span>{acsRef ? acsRef : "N/A"}</span>
                          )}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>SIA ACS Expiry:</th>
                      <td colSpan={""}>
                        {editMode ? (
                          <DatePicker
                            autoComplete="off"
                            className="form-control"
                            name="startDate"
                            selected={
                              expiry
                                ? moment(expiry).toDate("YYYY-MM-DD")
                                : undefined
                            }
                            placeholderText="Expiry Date"
                            onSelect={(date) => {
                              setExpiry(moment(date).toDate("YYYY-MM-DD"));
                            }}
                          />
                        ) : (
                          <span>
                            {expiry
                              ? moment(expiry).format("YYYY-MM-DD").toString()
                              : "N/A"}
                          </span>
                        )}
                      </td>
                      <td colSpan={"2"}></td>
                    </tr>
                    <tr>
                      <th>Accreditions:</th>
                      <td>
                        <div className="d-flex align-items-center">
                          {editMode ? (
                            <div className="flex-grow-1">
                              <Multiselect
                                options={accreditionArr}
                                selectedValues={accreditions}
                                onSelect={(e) => setAccreditions(e)}
                                onRemove={(e) => setAccreditions(e)}
                                displayValue="name"
                                showArrow={true}
                                customArrow={""}
                              />
                            </div>
                          ) : accreditions.length > 0 ? (
                            accreditions.map((acc, idx) => (
                              <span className={`${idx != 0 && "ml-1"}`}>{`${
                                acc.name
                              }${
                                idx != accreditions.length - 1 ? `,` : ""
                              }`}</span>
                            ))
                          ) : (
                            "N/A"
                          )}
                        </div>
                      </td>
                      <td colSpan={"2"}></td>
                    </tr>
                    <tr>
                      <th className="align-baseline">Company benefits:</th>
                      <td className="align-baseline" colSpan={"3"}>
                        <div className="d-flex align-items-center">
                          {editMode ? (
                            <>
                              <div className="d-flex align-items-center flex-wrap">
                                {benefitsArr.map((item, index) => {
                                  return (
                                    <div
                                      className={`gl-checkbox form-group mb-0 mr-3`}
                                    >
                                      <label>
                                        <input
                                          name="salaryBenefits"
                                          type="checkbox"
                                          value={item.id}
                                          defaultChecked={
                                            benefitsChecked.includes(item.id)
                                              ? true
                                              : false
                                          }
                                          onChange={(e) => {
                                            e.target.defaultChecked
                                              ? setBenefitsChecked(
                                                  benefitsChecked.filter(
                                                    function (f) {
                                                      return f !== item.id;
                                                    }
                                                  )
                                                )
                                              : setBenefitsChecked([
                                                  ...benefitsChecked,
                                                  item.id,
                                                ]);
                                          }}
                                        />
                                        <span>{item.title}</span>
                                        <span className="checkmark"></span>
                                      </label>
                                    </div>
                                  );
                                })}
                              </div>

                              {errors.benefits && touched.benefits ? (
                                <div className="error text-danger">
                                  {errors.benefits}
                                </div>
                              ) : null}
                            </>
                          ) : (
                            <div className="d-flex align-items-center">
                              {benefits.length > 0 ? (
                                benefits.map((item, idx) => (
                                  <span className={`${idx != 0 && "ml-1"}`}>{`${
                                    item.title
                                  }${
                                    idx != benefits.length - 1 ? `,` : ""
                                  }`}</span>
                                ))
                              ) : (
                                <span>N/A</span>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className="align-baseline">About us:</th>
                      <td
                        className="align-baseline"
                        colSpan={"3"}
                        style={{ whiteSpace: "normal" }}
                      >
                        <div className=" align-items-baseline">
                          {editMode ? (
                            <div className={`flex-grow-1 ${styles.ckEditor}`}>
                              {editorLoaded && (
                                <CKEditor
                                  name="editor"
                                  id="editor"
                                  data={companyAbout}
                                  className=""
                                  config={{
                                    heading: {
                                      options: [
                                        {
                                          model: "heading3",
                                          view: "h3",
                                          title: "Heading 3",
                                          class: "ck-heading_heading3",
                                        },
                                        {
                                          model: "heading4",
                                          view: "h4",
                                          title: "Heading 4",
                                          class: "ck-heading_heading4",
                                        },
                                        {
                                          model: "heading5",
                                          view: "h5",
                                          title: "Heading 5",
                                          class: "ck-heading_heading5",
                                        },
                                        {
                                          model: "heading6",
                                          view: "h6",
                                          title: "Heading 6",
                                          class: "ck-heading_heading6",
                                        },
                                      ],
                                    },

                                    toolbar: [
                                      "heading",
                                      "|",
                                      "selectAll",
                                      "numberedList",
                                      "bulletedList",
                                      "|",
                                      "bold",
                                      "italic",
                                      "blockQuote",
                                      "|",
                                      "link",
                                      "mediaEmbed",
                                      "|",
                                      "|",
                                      "undo",
                                      "redo",
                                    ],
                                  }}
                                  editor={ClassicEditor}
                                  onChange={(event, editor) => {
                                    setCompanyAbout(editor.getData());
                                  }}
                                />
                              )}

                              {errors.companyAbout && touched.companyAbout ? (
                                <div className="error text-danger">
                                  {errors.companyAbout}
                                </div>
                              ) : null}
                            </div>
                          ) : companyAbout ? (
                            <div
                              className={styles.about_cont}
                              dangerouslySetInnerHTML={{ __html: companyAbout }}
                            />
                          ) : (
                            <span className={`${styles.about_cont}`}>N/A</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {editMode ? (
              <div className="text-right">
                <button
                  type="submit"
                  className={`btn m-3 btn-dark btn-md py-1 fs-6   ${styles.submit_btn}`}
                  onClick={() => setEditMode(!editMode)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="companyDetail"
                  className={`btn m-3 btn-success btn-md py-1 fs-6   ${styles.submit_btn}`}
                  disabled={isSubmitting}
                >
                  Update
                </button>
              </div>
            ) : null}
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
});

const mapDispatchToProps = (dispatch) => ({
  getCompanyInfo: (token) => dispatch(getCompanyInfo(token)),
  getCoverage: (token) => dispatch(getCoverage(token)),
  getServices: (token) => dispatch(getServices(token)),
  getAccredition: (token) => dispatch(getAccredition(token)),
  getBenefits: (token) => dispatch(getBenefits(token)),
  updateCompanyDetailPageInfo: (userToken, data) =>
    dispatch(updateCompanyDetailPageInfo(userToken, data)),
  getLoqateSuggestionsByText: (text, contanier) =>
    dispatch(getLoqateSuggestionsByText(text, contanier)),
  getLoqateSuggestionById: getLoqateSuggestionById,
  getLoqateSuggestionByIdWithPromise: (id) =>
    dispatch(getLoqateSuggestionById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConmpnayDetail);
