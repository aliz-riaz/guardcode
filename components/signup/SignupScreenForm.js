import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import IsRequestLoderComponent from "../Common/IsRequestLoderComponent";
import {
  userSignUpAction,
  getCompanyHouseData,
  setScreenToBeShownOnSignup,
  setContactNameForSignup,
  setEmailAddressForSignup,
  setPhoneNumberForSignup,
  setCompanySizeForSignup,
  setCompanyNameForSignup,
  setCompanyAddressOneForSignup,
  setCompanyAddressTwoForSignup,
  setCompanyCityForSignup,
  setCompnayPostCodeForSignup,
  setTermsForSignup,
  setCompanyNumberForSignup,
  createSignUpDraft,
  fetchCompanyNameSuggestions,
  setCompanyAddressForSignup,
} from "../../redux/actions/signup";
import {
  getLoqateSuggestionsByText,
  setLocateSuggestionForText,
  getLoqateSuggestionById,
} from "../../redux/actions/jobPostAction";
import { useCookies } from "react-cookie";
import * as cookieparse from "cookie";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Label, Row, Col, FormGroup } from "reactstrap";
import LoginCarousel from "../Common/LoginCarousel";
// import ClaimFlowModal from "./claimFlowModal"
import ReCAPTCHA from "react-google-recaptcha";
import ReactGA from "react-ga4";

const signUpSchema = Yup.object().shape({
  contactName: Yup.string()
    .matches(
      /^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/,
      "Please enter your full name e.g John Doe"
    )
    .required("Please enter full name"),
  contactNumber: Yup.string()
    .required("Please enter phone number")
    .test(
      "len",
      "Please enter a valid mobile number",
      (val) => val?.toString()?.length >= 10 && val?.toString()?.length <= 12
    ),
  companySize: Yup.string().required("Please select company size"),
  emailAddress: Yup.string()
    .required("Please enter email address")
    .email("Please enter a valid email address"),
  companyName: Yup.string().required("Please enter company name"),
  // companyAddress: Yup.string().required('Please enter company address'),
  terms: Yup.boolean().oneOf([true], "You must agree with terms & conditions"),
});

function SignUpScreenForm(props) {
  const [cookie, setCookie] = useCookies(["show_thank_you"]);
  const [mobileValue, setMobileValue] = useState("");
  const [showCompanySuggestions, setShowCompanySuggestions] = useState(false);
  const [isUserComingFromInviteFlow, setIsUserComingFromInviteFlow] =
    useState(false);

  const router = useRouter();

  const recaptchaRefSignupForm = useRef();

  useEffect(() => {
    props.setEmailAddressForSignup("");
    props.setCompanySizeForSignup("");
    props.setCompanyNameForSignup("");
  }, []);

  const { claim } = router.query;

  const handleErrorForInviteFlow = () => {
    router.push("/signup");
  };

  useEffect(() => {
    const { key } = router.query;

    if (key) {
      try {
        // const encrptedURL = {
        //     email : "qasim@get-dasfasfdsfsdfsuk.com",
        //     companySize : "Company (21-50 employees)",
        //     companyName : "GET LICENSED",
        //     organisationId : "45",
        //  }

        //  const encrypt = Buffer.from(JSON.stringify(encrptedURL)).toString('base64')

        const decrypt = Buffer.from(key, "base64").toString("ascii");
        const parsedDecrypted = JSON.parse(decrypt);

        const { email, companySize, companyName, organisationId } =
          parsedDecrypted;

        if (email && companySize && companyName && organisationId) {
          props.setEmailAddressForSignup(email);
          props.setCompanySizeForSignup(companySize);
          props.setCompanyNameForSignup(companyName);
          setIsUserComingFromInviteFlow(true);
        } else {
          handleErrorForInviteFlow();
        }
      } catch {
        handleErrorForInviteFlow();
      }
    }
  }, []);

  useEffect(() => {
    if (mobileValue != "") {
      mobileValue.toString()[0] == 0
        ? setMobileValue(mobileValue)
        : setMobileValue("0" + mobileValue);
    }
  }, [mobileValue]);

  const onReCAPTCHAChange = (captchaCode) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if (!captchaCode) {
      return;
    }
    // Else reCAPTCHA was executed successfully so proceed with the
    // alert
    // alert(`Hey, ${props.email_address_for_signup}`);
    props.createSignUpDraft(
      props.contact_name_for_signup,
      props.email_address_for_signup,
      props.phone_number_for_signup,
      captchaCode,
      false
    );
    ReactGA.event({
      category: "click",
      action: "create_my_account",
    });

    // Reset the reCAPTCHA so that it can be executed again if user
    // submits another email.
    recaptchaRefSignupForm.current.reset();
  };

  return (
    <>
      {process.browser && (
        <div
          className={`${
            claim && !props.didUserSawTheModal ? "blur-8" : ""
          } login-main`}
        >
          <div className="login-left">
            <div className="login-wrapper signup-wrapper">
              <div className="login-logo">
                <img
                  src={process.env.APP_URL + "/images/guardpass-logo-white.svg"}
                  width=""
                  height=""
                  alt=""
                />
              </div>
              <p className="text-center text-white fs-6 mb-0 mt-4">
                {/* Welcome to Get Licensed. <br /> */}
                Create an account to book training or post a job.
              </p>

              <Formik
                enableReinitialize={true}
                initialValues={{
                  contactName: props.contact_name_for_signup,
                  emailAddress: props.email_address_for_signup,
                  contactNumber: props.phone_number_for_signup,
                  companySize: props.company_size_for_signup,
                  companyName: props.company_name_for_signup,
                  companyNumber: props.company_number_for_signup,
                  companyAddress: props.compnay_address_for_signup,
                  terms: props.term_for_signup,
                }}
                validationSchema={signUpSchema}
                onSubmit={(values) => {
                  //call draft api
                  recaptchaRefSignupForm.current.execute();
                  // alert(JSON.stringify(values));
                  // props.goToNext();
                }}
              >
                {({ errors, touched, values, setFieldValue }) => (
                  <Form className="login-form mt-4">
                    <ReCAPTCHA
                      ref={recaptchaRefSignupForm}
                      size="invisible"
                      sitekey={process.env.RECAPTCHA_SITE_KEY}
                      onChange={onReCAPTCHAChange}
                    />
                    <FormGroup className="gl-input mb-3">
                      <Field
                        type="text"
                        value={props.contact_name_for_signup}
                        name="contactName"
                        className="form-control"
                        placeholder="Contact Name"
                        onChange={(e) =>
                          props.setContactNameForSignup(e.target.value)
                        }
                      />
                      <label>Full Name</label>

                      {errors.contactName && touched.contactName ? (
                        <div className="text-danger mt-1">
                          {errors.contactName}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup className="gl-input  mb-3">
                      <Field
                        type="email"
                        value={props.email_address_for_signup}
                        name="emailAddress"
                        className={`form-control ${
                          isUserComingFromInviteFlow && "disabled"
                        }`}
                        placeholder="Contact Name"
                        onChange={(e) =>
                          props.setEmailAddressForSignup(e.target.value)
                        }
                        disabled={isUserComingFromInviteFlow}
                      />
                      <label>Email Address</label>
                      <span className="input-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="20"
                          viewBox="0 0 25 20"
                        >
                          <g
                            fill="none"
                            fillRule="evenodd"
                            strokeLinecap="round"
                          >
                            <g stroke="#242429" strokeWidth="1.5">
                              <g>
                                <g>
                                  <path
                                    d="M22.467 19H2.533C1.687 19 1 18.328 1 17.5v-15C1 1.672 1.687 1 2.533 1h19.934C23.313 1 24 1.672 24 2.5v15c0 .828-.687 1.5-1.533 1.5z"
                                    transform="translate(-497.000000, -491.000000) translate(182.000000, 316.000000) translate(0.000000, 163.000000) translate(315.000000, 12.000000)"
                                  />
                                  <path
                                    d="M4 5L12.5 12 21 5M4 14L6 12M21 14L19 12"
                                    transform="translate(-497.000000, -491.000000) translate(182.000000, 316.000000) translate(0.000000, 163.000000) translate(315.000000, 12.000000)"
                                  />
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </span>
                      {errors.emailAddress && touched.emailAddress ? (
                        <div className="text-danger mt-1">
                          {errors.emailAddress}
                        </div>
                      ) : null}
                    </FormGroup>
                    <div className="d-flex">
                      <span className="img bg-white">
                        <img src={process.env.APP_URL + "/images/uk.svg"} />
                      </span>
                      <FormGroup className="gl-input with-img mb-3">
                        <input
                          type="number"
                          value={props.phone_number_for_signup}
                          name="contactNumber"
                          className="form-control"
                          placeholder="Salary Value"
                          onChange={(e) => {
                            const turncated = e.target.value.slice(0, 11);
                            e.target.value && e.target.value[0] != "0"
                              ? props.setPhoneNumberForSignup("0" + turncated)
                              : props.setPhoneNumberForSignup(turncated);
                          }}
                          onWheel={(e) => e.target.blur()}
                        />
                        <label>Mobile Number</label>

                        {errors.contactNumber && touched.contactNumber ? (
                          <div className="text-danger mt-1">
                            {errors.contactNumber}
                          </div>
                        ) : null}
                      </FormGroup>
                    </div>
                    <Row>
                      <Col>
                        <div className="gl-input-simple form-group  mb-3">
                          <Field
                            className={`form-control ${
                              isUserComingFromInviteFlow && "disabled"
                            }`}
                            value={props.company_size_for_signup}
                            as="select"
                            name="companySize"
                            onChange={(e) =>
                              props.setCompanySizeForSignup(e.target.value)
                            }
                            disabled={isUserComingFromInviteFlow}
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
                            <option value="Recruiting Firm">
                              Recruiting Firm
                            </option>
                            <option value="Staffing Agency">
                              Staffing Agency
                            </option>
                          </Field>
                          {errors.companySize && touched.companySize ? (
                            <div className="text-danger mt-1">
                              {errors.companySize}
                            </div>
                          ) : null}
                        </div>
                      </Col>
                    </Row>

                    <FormGroup className="gl-input mb-3">
                      <input
                        type="text"
                        name="companyName"
                        value={props.company_name_for_signup}
                        className={`form-control ${
                          isUserComingFromInviteFlow && "disabled"
                        }`}
                        placeholder="Contact Name"
                        autoComplete="off"
                        onChange={async (e) => {
                          props.setCompanyNameForSignup(e.target.value);
                          if (e.target.value?.length >= 3) {
                            setShowCompanySuggestions(true);
                            props.fetchCompanyNameSuggestions(e.target.value);
                          }
                          // props.getCompanyHouseData(e.target.value)
                        }}
                        disabled={isUserComingFromInviteFlow}
                      />
                      <label>Company Name</label>

                      {errors.companyName && touched.companyName ? (
                        <div className="text-danger mt-1">
                          {errors.companyName}
                        </div>
                      ) : null}
                      {showCompanySuggestions &&
                      props.compnay_name_suggestions?.length > 0 ? (
                        <>
                          <div className="custom-dropdown">
                            <div className="close_dropdown m-2">
                              <img
                                src={
                                  process.env.APP_URL + "/images/c-remove.svg"
                                }
                                onClick={() => setShowCompanySuggestions(false)}
                                className="cursor-pointer"
                              />
                            </div>

                            <ul className="pt-4">
                              {props.compnay_name_suggestions?.map(
                                (company) => {
                                  return (
                                    <li
                                      onClick={() => {
                                        props.setCompanyNameForSignup(company);
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
                    </FormGroup>
                    <FormGroup className="gl-checkbox mb-1">
                      <label className="mb-0">
                        <input
                          type="checkbox"
                          name="terms"
                          checked={props.term_for_signup}
                          onChange={() =>
                            props.setTermsForSignup(!props.term_for_signup)
                          }
                        />
                        <span className="text-white fw-light">
                          I agree with{" "}
                          <a
                            href="https://www.get-licensed.co.uk/terms"
                            target="_blank"
                          >
                            {" "}
                            Terms & Conditions
                          </a>
                        </span>
                        <span className="checkmark"></span>{" "}
                      </label>
                      {errors.terms && touched.terms ? (
                        <div className="text-danger mb-2">{errors.terms}</div>
                      ) : null}
                    </FormGroup>

                    <Button
                      type="submit"
                      className="btn btn-md btn-green w-100"
                    >
                      Create My Account <IsRequestLoderComponent />
                    </Button>
                  </Form>
                )}
              </Formik>

              <div className="switch-form">
                Do you have an account?{" "}
                <a href={process.env.APP_URL + "/login"}>Sign in</a>
              </div>
            </div>
          </div>
          <LoginCarousel />
        </div>
      )}
      {/* <ClaimFlowModal isClaimFlow={claim} didUserSawTheModal={props.didUserSawTheModal}  setDidUserSawTheModal={props.setDidUserSawTheModal} /> */}
    </>
  );
}

const mapStateToProps = (state) => ({
  // user_token: state.vantage.userDataReducer.user_token,
  loquate_respone_for_text: state.vantage.jobPostReducer.loqateResponeforText,
  loquate_respone_for_id: state.vantage.jobPostReducer.loqateResponeforId,

  screen_to_be_shown_on_signup:
    state.vantage.commonReducer.screenToBeShownOnSignUp,
  contact_name_for_signup: state.vantage.commonReducer.contactName,
  email_address_for_signup: state.vantage.commonReducer.emailAddress,
  phone_number_for_signup: state.vantage.commonReducer.phoneNumber,
  company_size_for_signup: state.vantage.commonReducer.companySize,
  company_name_for_signup: state.vantage.commonReducer.companyName,
  compnay_address_for_signup: state.vantage.commonReducer.companyAddress,
  term_for_signup: state.vantage.commonReducer.terms,

  compnay_address_one_for_signup: state.vantage.commonReducer.companyAddressOne,
  compnay_address_two_for_signup: state.vantage.commonReducer.companyAddressTwo,
  compnay_city_for_signup: state.vantage.commonReducer.companyCity,
  compnay_post_code_for_signup: state.vantage.commonReducer.companyPostCode,
  compnay_name_suggestions: state.vantage.commonReducer.companyNameSuggestion,
});

const mapDispatchToProps = (dispatch) => ({
  userSignUpAction: (name, company_name, email, phoneNumber) =>
    dispatch(userSignUpAction(name, company_name, email, phoneNumber)),
  getCompanyHouseData: (keyword) => dispatch(getCompanyHouseData(keyword)),
  // getLoqateSuggestionById: getLoqateSuggestionById,
  getLoqateSuggestionById: (id, signup) =>
    dispatch(getLoqateSuggestionById(id, signup)),
  getLoqateSuggestionsByText: (text, Contanier) =>
    dispatch(getLoqateSuggestionsByText(text, Contanier)),
  setLocateSuggestionForText: (suggestions) =>
    dispatch(setLocateSuggestionForText(suggestions)),
  setScreenToBeShownOnSignup: (screen) =>
    dispatch(setScreenToBeShownOnSignup(screen)),
  setContactNameForSignup: (contactName) =>
    dispatch(setContactNameForSignup(contactName)),
  setEmailAddressForSignup: (emailAddress) =>
    dispatch(setEmailAddressForSignup(emailAddress)),
  setPhoneNumberForSignup: (phoneNumber) =>
    dispatch(setPhoneNumberForSignup(phoneNumber)),
  setCompanySizeForSignup: (companySize) =>
    dispatch(setCompanySizeForSignup(companySize)),
  setCompanyNameForSignup: (companyName) =>
    dispatch(setCompanyNameForSignup(companyName)),
  setCompanyAddressForSignup: (companyAddress) =>
    dispatch(setCompanyAddressForSignup(companyAddress)),
  setCompanyAddressOneForSignup: (companyAddress) =>
    dispatch(setCompanyAddressOneForSignup(companyAddress)),
  setCompanyAddressTwoForSignup: (companyAddress) =>
    dispatch(setCompanyAddressTwoForSignup(companyAddress)),
  setCompanyCityForSignup: (companyAddress) =>
    dispatch(setCompanyCityForSignup(companyAddress)),
  setCompnayPostCodeForSignup: (companyAddress) =>
    dispatch(setCompnayPostCodeForSignup(companyAddress)),
  setTermsForSignup: (status) => dispatch(setTermsForSignup(status)),
  setCompanyNumberForSignup: (companyNumber) =>
    dispatch(setCompanyNumberForSignup(companyNumber)),
  createSignUpDraft: (
    full_name,
    email,
    mobile_number,
    recaptcha,
    toastForResend
  ) =>
    dispatch(
      createSignUpDraft(
        full_name,
        email,
        mobile_number,
        recaptcha,
        toastForResend
      )
    ),
  fetchCompanyNameSuggestions: (companyName) =>
    dispatch(fetchCompanyNameSuggestions(companyName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreenForm);
