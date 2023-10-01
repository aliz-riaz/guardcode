import React, { useEffect, useState, useRef } from "react";
import {
  userEmailVerificaitonForLogin,
  userPassCodeVerification,
} from "../redux/actions/login";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import IsRequestLoderComponent from "../components/Common/IsRequestLoderComponent";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
import VerificationInput from "react-verification-input";
import {
  setScreenToBeShownOnLogin,
  setInvalidPasscode,
} from "../redux/actions/main";
import { checkForAccountApproval } from "../redux/actions/signup";
import { FormGroup, Input, Button } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CountDownComponent from "../components/Common/CountDownComponent";
import { zeroPad } from "react-countdown";
import LoginCarousel from "../components/Common/LoginCarousel";
import { protectLoginPageIfLogin } from "../utilites/utility";
import Head from "next/head";
import ReCAPTCHA from "react-google-recaptcha";
import {
  getListOfUsersAllOrganisation,
  setOrganisationId,
  setOrganisationMembers,
  setOrganisationSize,
  setIsOrganisationSelected,
  setIsAccountOrganisationOwner,
  setActiveOrganisationMembers,
  markSelectedOrganisationAsDefault,
  setUserMenusAcces,
  setIsFullAccess,
  setIsOrganisationApproved,
  setHasOwnerCongratulatedForApproval,
  setAllOrganisations,
  setOrganisationAccountOwnerId,
  setExternalLink
} from "../redux/actions/organisationAction";
import {
  setOrganisationName,
  setIsDiscountEnabled,
  setIsDiscountOnCourseBooking,
  setNoOfSeatsToAvailDiscount,
  setIsBankTransferAvaliable,
  setIsNewsModalDisabled,
  setIsOnboardingFeedbackDone,
} from "../redux/actions/userAction";
import _ from "lodash";
import { socket } from "../lib/SocketProvider";
import { userLogoutAction } from "../redux/actions/login";
import useLogout from "../hooks/Auth/useLogout";
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter email address")
    .email("Please enter a valid email address"),
});

export const getServerSideProps = async function (context) {
  return protectLoginPageIfLogin(context);
};

const Login = (props) => {
  const { cleanGlobalState } = useLogout(props);
  const [cookie, setCookie] = useCookies(["user"]);
  const [isNavBarOpenCookie, setIsNavBarOpenCookie] = useCookies([
    "isNavBarOpenCookie",
  ]);
  const [isOrgSelected, setIsOrgSelected] = useCookies(["isOrgSelected"]);
  const [email, setEmail] = useState("");
  const [showResent, setShowResent] = useState(false);
  // const [activeIndex, setActiveIndex] = useState(0);
  // const [animating, setAnimating] = useState(false);
  const router = useRouter();
  const recaptchaRefLoginForm = useRef();

  const onReCAPTCHAChange = (captchaCode) => {
    if (!captchaCode) {
      return;
    }
    props.userEmailVerificaitonForLogin(email, captchaCode, false);
    setShowResent(false);
    recaptchaRefLoginForm.current.reset();
  };

  useEffect(() => {
    props.setScreenToBeShownOnLogin("login");
    props.setInvalidPasscode(false);

    const handleBeforeUnload = () => {
      Cookies.remove("intended");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    cleanGlobalState();

    return () => {
      Cookies.remove("intended");
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleOrganisaitonClickAutomation = async (
    selectedOrganizaiton,
    userToken,
    redirectTo
  ) => {
    const {
      id,
      members,
      title,
      is_discount_enabled,
      discount,
      is_bank_transfer_enabled,
      is_news_modal_disabled,
      bookings_to_avail_discount,
      is_account_owner,
      active_organisation_id,
      menus,
      is_full_access,
      company_size,
      is_account_approved,
      has_congratulated,
      account_owner,
      is_external_link,
    } = selectedOrganizaiton;
    const { data, request_status } =
      await props.markSelectedOrganisationAsDefault(userToken, id);
    if (request_status) {
      props.setOrganisationName(title);
      props.setIsDiscountEnabled(is_discount_enabled);
      props.setIsDiscountOnCourseBooking(discount);
      props.setNoOfSeatsToAvailDiscount(bookings_to_avail_discount);
      props.setIsBankTransferAvaliable(is_bank_transfer_enabled);
      props.setIsNewsModalDisabled(is_news_modal_disabled);

      props.setIsOrganisationSelected(true);
      props.setOrganisationId(id);
      props.setOrganisationMembers(
        members.map((member) => ({
          id: member.id,
          firstName: member.decision_maker_first_name,
          lastName: member.decision_maker_last_name,
        }))
      );
      props.setIsAccountOrganisationOwner(is_account_owner);
      props.setActiveOrganisationMembers(active_organisation_id);
      props.setUserMenusAcces(menus);
      props.setIsFullAccess(is_full_access);
      props.setOrganisationSize(company_size);
      props.setIsOrganisationApproved(is_account_approved);
      props.setHasOwnerCongratulatedForApproval(has_congratulated);
      props.setOrganisationAccountOwnerId(account_owner.id);
      props.setExternalLink(is_external_link);
      Cookies.set(
        "natprp",
        Buffer.from(is_account_approved.toString()).toString("base64"),
        {
          path: "/",
        }
      );
      setIsOrgSelected("isOrgSelected", true, {
        path: "/",
      });
      router.push(redirectTo).then(() => {
        Cookies.remove("intended");
      });
    }
  };

  // the below block of code needs refactoring offcourse
  const handlePasscode = async (e) => {
    if (e.length < 4) {
      props.setInvalidPasscode(false);
      return;
    }
    if (e.length == 4) {
      const { data, request_status } = await props.userPassCodeVerification(
        e,
        email
      );
      if (request_status) {
        const userToken = data.access_token;
        setCookie("user", JSON.stringify(props.user_token), {
          path: "/",
        });
        setIsNavBarOpenCookie("isNavBarOpenCookie", true, {
          path: "/",
        });
        // if (Cookies.get("intended")) {
        //   setIsOrgSelected("isOrgSelected", true, {
        //     path: "/",
        //   });
        //   router.push(Cookies.get("intended")).then(() => {
        //     Cookies.remove("intended");
        //   });
        // } else
        if (
          Cookies.get("intended") != null &&
          Cookies.get("intended").includes("/organisation/add/")
        ) {
          router.push(Cookies.get("intended")).then(() => {
            Cookies.remove("intended");
          });
        } else {
          const selectedOrganizaiton = data.organisations[0];
          if (data.organisations.length <= 1) {
            props.setAllOrganisations(
              data.organisations?.map((organisation) => ({
                id: organisation.id,
                title: organisation.title,
                menus: organisation.menus,
                role: organisation.is_account_owner,
                allowedExternalLink: organisation.is_external_link,
              }))
            );
            if (Cookies.get("intended")) {
              handleOrganisaitonClickAutomation(
                selectedOrganizaiton,
                userToken,
                Cookies.get("intended")
              );
            } else {
              handleOrganisaitonClickAutomation(
                selectedOrganizaiton,
                userToken,
                "/dashboard"
              );
            }
          } else {
            router.replace("/organisation").then(() => {
              if (Cookies.get("intended") != null) {
                // Cookies.remove("intended");
              }
            });
          }
          if (!data.employer.is_onboard_feedback_given) {
            props.setIsOnboardingFeedbackDone(false);
          }
        }
      }
    }
  };

  return (
    <>
      <Head>
        <link rel="canonical" href="https://www.guardpass.com/employers" />
      </Head>
      <div className="login-main">
        <div className="login-left">
          <div className="login-wrapper">
            <div className="login-logo mb-4">
              <img
                src={process.env.APP_URL + "/images/guardpass-logo-white.svg"}
                width=""
                height=""
                alt=""
              />
            </div>

            {process.browser &&
            props.screen_to_be_shown_on_login == "passcode" ? (
              <div className="login_passcode position-relative w-100 text-center">
                <p className="text-white text-center mt-4 fw-light">
                  Enter the 4-digit code sent to{" "}
                  <span className="fw-bold text-center text-success">
                    {email}
                  </span>
                </p>
                <div className="d-inline-block position-relative">
                  <VerificationInput
                    placeholder=""
                    validChars="0-9"
                    autoFocus
                    onChange={handlePasscode}
                    length={4}
                    // removeDefaultStyles
                    classNames={{
                      container: `passcode_container ${
                        props.invalid_passcode
                          ? "passcode_container_withError"
                          : ""
                      }`,
                      character: "character",
                      characterInactive: "character--inactive",
                      characterSelected: "character--selected",
                    }}
                  />{" "}
                  <div className="passcode_loader">
                    <IsRequestLoderComponent size="lg" color="success" />
                  </div>
                  {props.invalid_passcode ? (
                    <span className="invalid_msg mt-2 d-block ">
                      Invalid Code
                    </span>
                  ) : null}
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    recaptchaRefLoginForm.current.execute();
                  }}
                >
                  <ReCAPTCHA
                    ref={recaptchaRefLoginForm}
                    size="invisible"
                    sitekey={process.env.RECAPTCHA_SITE_KEY}
                    onChange={onReCAPTCHAChange}
                  />
                  <p className="text-white text-center mt-4 fw-light mb-0">
                    Didn’t recieve code?{" "}
                    <button
                      type="submit"
                      disabled={!showResent}
                      className="fw-bold cursor-pointer bg-transparent border-0 text-success resend_code_btn"
                      // onClick={() => {
                      //   setShowResent(false)
                      //   props.userEmailVerificaitonForLogin(email, "dasfadsf", true)
                      // }}
                    >
                      Resend
                    </button>
                    {showResent ? null : (
                      <CountDownComponent setShowResent={setShowResent} />
                    )}
                  </p>
                </form>

                {/* <p className="text-white text-center mt-4 fw-light mb-0">
                  Didn’t recieve code?{' '}
                  <button
                    disabled={!showResent}
                    className="fw-bold cursor-pointer bg-transparent border-0 text-success resend_code_btn"
                    onClick={() => {
                      setShowResent(false)
                      props.userEmailVerificaitonForLogin(email, "dasfadsf", true)
                    }}
                  >
                    Resend
                  </button>
                  {showResent ? null : (
                    <>
                      <CountDownComponent setShowResent={setShowResent} />
                    </>
                  )}
                </p> */}

                <div className="text-center cancel_btn text-success mt-4 fs-6 ">
                  <span
                    className="cursor-pointer"
                    onClick={() => props.setScreenToBeShownOnLogin("login")}
                  >
                    <i className="mr-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                      >
                        <g
                          transform="translate(1 1)"
                          stroke="#3BD55A"
                          fill="none"
                          fill-rule="evenodd"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <circle cx="5.5" cy="5.5" r="5.5" />
                          <path d="m3.5 3.5 4 4M7.5 3.5l-4 4" />
                        </g>
                      </svg>
                    </i>
                    <span
                      className="cancel_txt"
                      onClick={() => props.setScreenToBeShownOnLogin("login")}
                    >
                      Cancel
                    </span>
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-100">
                <p className="text-center text-white fs-6 mb-0 mt-4">
                  Welcome to GuardPass. It’s good to see you again <br />
                  Sign in to book training or post a job.
                </p>
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    email: email,
                  }}
                  validationSchema={LoginSchema}
                  onSubmit={(values) => {
                    // alert(JSON.stringify(values.email));
                    // props.goToNext();
                    recaptchaRefLoginForm.current.execute();
                  }}
                >
                  {({ errors, touched, values, setFieldValue }) => (
                    <Form className="login-form">
                      <ReCAPTCHA
                        ref={recaptchaRefLoginForm}
                        size="invisible"
                        sitekey={process.env.RECAPTCHA_SITE_KEY}
                        onChange={onReCAPTCHAChange}
                      />
                      <FormGroup className="gl-input mb-3">
                        <Field
                          type="text"
                          name="email"
                          value={email}
                          className="form-control"
                          placeholder="Email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Email</label>
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
                        {errors.email && touched.email ? (
                          <div className="text-danger mt-1">{errors.email}</div>
                        ) : null}

                        <Button
                          className="btn btn-md btn-green w-100 mt-4"
                          type="submit"
                        >
                          Sign in{" "}
                          <span className="ml-1">
                            <IsRequestLoderComponent />
                          </span>
                        </Button>
                      </FormGroup>

                      <div className="switch-form">
                        Don’t have an account?{" "}
                        <a href={process.env.APP_URL + "/signup"}>Sign up</a>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            )}
          </div>
        </div>
        <LoginCarousel />
      </div>
    </>
  );
};
// export default Login

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  is_user_login: state.vantage.userDataReducer.is_user_login,
  screen_to_be_shown_on_login:
    state.vantage.commonReducer.screen_to_be_shown_on_login,
  invalid_passcode: state.vantage.commonReducer.invalidPasscode,
});

const mapDispatchToProps = (dispatch) => ({
  setScreenToBeShownOnLogin: (screen) =>
    dispatch(setScreenToBeShownOnLogin(screen)),
  userEmailVerificaitonForLogin: (email, recaptcha, showToast) =>
    dispatch(userEmailVerificaitonForLogin(email, recaptcha, showToast)),
  userPassCodeVerification: (passcode, email) =>
    dispatch(userPassCodeVerification(passcode, email)),
  setInvalidPasscode: (status) => dispatch(setInvalidPasscode(status)),
  checkForAccountApproval: (userToken) =>
    dispatch(checkForAccountApproval(userToken)),
  // userLogoutAction: () => dispatch(userLogoutAction()),

  getListOfUsersAllOrganisation: (userToken) =>
    dispatch(getListOfUsersAllOrganisation(userToken)),
  //user's info

  setOrganisationName: (organisationName) =>
    dispatch(setOrganisationName(organisationName)),
  setIsDiscountEnabled: (discountEnabled) =>
    dispatch(setIsDiscountEnabled(discountEnabled)),
  setIsDiscountOnCourseBooking: (discount) =>
    dispatch(setIsDiscountOnCourseBooking(discount)),
  setNoOfSeatsToAvailDiscount: (availDiscount) =>
    dispatch(setNoOfSeatsToAvailDiscount(availDiscount)),
  setIsBankTransferAvaliable: (status) =>
    dispatch(setIsBankTransferAvaliable(status)),
  setIsNewsModalDisabled: (status) => dispatch(setIsNewsModalDisabled(status)),

  setIsOrganisationSelected: (status) =>
    dispatch(setIsOrganisationSelected(status)),
  setOrganisationId: (organisationId) =>
    dispatch(setOrganisationId(organisationId)),
  setOrganisationMembers: (organisationMembers) =>
    dispatch(setOrganisationMembers(organisationMembers)),
  setIsOrganisationApproved: (status) =>
    dispatch(setIsOrganisationApproved(status)),
  setHasOwnerCongratulatedForApproval: (status) =>
    dispatch(setHasOwnerCongratulatedForApproval(status)),
  setOrganisationAccountOwnerId: (ownerId) =>
    dispatch(setOrganisationAccountOwnerId(ownerId)),

  setIsAccountOrganisationOwner: (status) =>
    dispatch(setIsAccountOrganisationOwner(status)),
  setActiveOrganisationMembers: (activeOrganisation) =>
    dispatch(setActiveOrganisationMembers(activeOrganisation)),
  setUserMenusAcces: (menus) => dispatch(setUserMenusAcces(menus)),
  setIsFullAccess: (menus) => dispatch(setIsFullAccess(menus)),
  setOrganisationSize: (organisationSize) =>
    dispatch(setOrganisationSize(organisationSize)),
  setAllOrganisations: (allOrganisations) =>
    dispatch(setAllOrganisations(allOrganisations)),

  markSelectedOrganisationAsDefault: (userToken, organistationId) =>
    dispatch(markSelectedOrganisationAsDefault(userToken, organistationId)),
  userLogoutAction: userLogoutAction,
  userLogoutActionTemp: () => dispatch(userLogoutAction()),
  resetJobReducer: () => dispatch({ type: "RESET_STAFFING_REDUCER" }),

  // resetJobReducer: () => dispatch({ type: 'RESET_STAFFING_REDUCER' }),
  setIsOnboardingFeedbackDone: (status) =>
    dispatch(setIsOnboardingFeedbackDone(status)),
  setExternalLink: (isLinkAllowed) => dispatch(setExternalLink(isLinkAllowed)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
