import { Container, Button, Label, Row, Col } from "reactstrap";
import VerificationInput from "react-verification-input";
import { connect } from "react-redux";
import { setScreenToBeShownOnSignup } from "../../redux/actions/signup";
import {
  userPassCodeVerificationForSignup,
  resetCommonReducer,
  createSignUpDraft,
} from "../../redux/actions/signup";
import { setInvalidPasscode } from "../../redux/actions/main";
import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import router from "next/router";
import { useCookies } from "react-cookie";
import IsRequestLoderComponent from "../Common/IsRequestLoderComponent";
import CountDownComponent from "../Common/CountDownComponent";
import { useRouter } from "next/router";
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
} from "../../redux/actions/organisationAction";
import {
  setOrganisationName,
  setIsDiscountEnabled,
  setIsDiscountOnCourseBooking,
  setNoOfSeatsToAvailDiscount,
  setIsBankTransferAvaliable,
  setIsNewsModalDisabled,
  setGlobalIsRequestLoader,
} from "../../redux/actions/userAction";

const PassCodeScreen = (props) => {
  const [cookie, setCookie] = useCookies(["user"]);
  const [isNavBarOpenCookie, setIsNavBarOpenCookie] = useCookies([
    "isNavBarOpenCookie",
  ]);
  const [isOrgSelected, setIsOrgSelected] = useCookies(["isOrgSelected"]);
  // const [cookieRefresher, setCookieRefresher] = useCookies(Cookies.get('user'));
  const [showResent, setShowResent] = useState(false);

  const router = useRouter();
  const { claim, key, code } = router.query;
  useEffect(() => {
    props.setDidUserSawTheModal(true);
    props.setInvalidPasscode(false);
  }, []);

  // useEffect(() => {
  //     if(props.user_token != "" ) {
  //           if(Cookies.get('user') != null){
  //               router.push("/dashboard").then(()=> props.resetCommonReducer());
  //           }
  //     }
  // }, [cookie, isNavBarOpenCookie,setCookie,setIsNavBarOpenCookie])
  const recaptchaRef = useRef();

  const onReCAPTCHAChange = (captchaCode) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if (!captchaCode) {
      return;
    }
    // Else reCAPTCHA was executed successfully so proceed with the
    // alert
    setShowResent(false);
    props.createSignUpDraft(
      props.contact_name_for_signup,
      props.email_address_for_signup,
      props.phone_number_for_signup,
      captchaCode,
      true
    );
    // alert(`Hey,`);
    // Reset the reCAPTCHA so that it can be executed again if user
    // submits another email.
    recaptchaRef.current.reset();
  };

  const handleOrganisaitonClickAutomation = async (
    selectedOrganizaiton,
    userToken
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
      //   router.push("/dashboard");
      props.setGlobalIsRequestLoader(false);
      router.push("/dashboard").then(() => props.resetCommonReducer());
    }
  };

  const handlePasscode = async (e) => {
    if (e.length < 4) {
      props.setInvalidPasscode(false);
      return;
    }
    if (e.length == 4) {
      const { data, request_status } =
        await props.userPassCodeVerificationForSignup(
          props.company_name_for_signup,
          props.contact_name_for_signup,
          props.email_address_for_signup,
          props.phone_number_for_signup,
          e,
          props.company_size_for_signup,
          claim,
          code ? code : null
        );
      if (request_status) {
        // to do set organisation data if 1
        const selectedOrganizaiton = data.organisations[0];
        const userToken = data.access_token;
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
          handleOrganisaitonClickAutomation(selectedOrganizaiton, userToken);
        }
        // if(claim){
        //     router.push(`account-settings?claim=${claim}`).then(()=> props.resetCommonReducer());
        // }
        // else
        // if(key && code) {
        //     router.push(`/organisation`).then(()=> props.resetCommonReducer())
        // }
        // else{
        //     router.push("/dashboard").then(()=> props.resetCommonReducer());
        // }
        // if(claim){
        //     router.push(`account-settings?claim=${claim}`).then(()=> props.resetCommonReducer());
        // }else{
        //     router.push("/dashboard").then(()=> props.resetCommonReducer());
        // }
        // router.push("/dashboard").then(()=> props.resetCommonReducer());
        // .then((res) => {
        // })
        // call passcode check api here and redirect to login
        // also handle handleValidSubmit fn here
      }
    }
  };

  return (
    <>
      <div
        className="passcode_page"
        style={{
          background: ` var(--light-grey) url(${process.env.APP_URL}/images/passcode_bg.png) no-repeat`,
        }}
      >
        <Container>
          <Row>
            <Col>
              <div className="passCode_logo">
                <img
                  src={process.env.APP_URL + "/images/guardpass-logo-black.svg"}
                  width=""
                  height=""
                  alt=""
                />
              </div>
            </Col>
          </Row>
          <Row className="passcode_row">
            <Col className="col-md-6">
              <h1>
                Just one more step. <br className="d-none d-md-block" />
                Please verify your email
              </h1>

              <div className="passcode_wrap position-relative">
                <p className="mb-0">
                  Enter the 4-digit code sent to you via email;{" "}
                  <span className="fw-bold text-dark">
                    {props.email_address_for_signup}
                  </span>{" "}
                  <span
                    className="d-inline-block fs-6 text-success fw-bold cursor-pointer text-decoration-line"
                    onClick={() => props.setScreenToBeShownOnSignup("signup")}
                  >
                    edit email
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
                          : null
                      }`,
                      character: "character",
                      characterInactive: "character--inactive",
                      characterSelected: "character--selected",
                    }}
                  />
                  <div className="passcode_loader">
                    <IsRequestLoderComponent size="lg" color="success" />
                  </div>
                </div>
                {props.invalid_passcode ? (
                  <span className="d-block invalid_msg">Invalid Code</span>
                ) : null}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    recaptchaRef.current.execute();
                  }}
                >
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    size="invisible"
                    sitekey={process.env.RECAPTCHA_SITE_KEY}
                    onChange={onReCAPTCHAChange}
                  />
                  <p>
                    Didn’t receive code?{" "}
                    <button
                      type="submit"
                      disabled={!showResent}
                      className="fw-bold cursor-pointer bg-transparent border-0 text-success resend_code_btn"
                      // onClick={(e) => {
                      // setShowResent(false);
                      // props.createSignUpDraft(props.contact_name_for_signup, props.email_address_for_signup, props.phone_number_for_signup, true)
                      // }}
                    >
                      Resend code
                    </button>
                    {showResent ? null : (
                      <CountDownComponent setShowResent={setShowResent} />
                    )}
                  </p>
                </form>

                {/* <p>Didn’t receive code? <button disabled={!showResent} className="fw-bold cursor-pointer bg-transparent border-0 text-success resend_code_btn" onClick={(e) => {
                                        setShowResent(false);
                                        props.createSignUpDraft(props.contact_name_for_signup, props.email_address_for_signup, props.phone_number_for_signup, true)}}>Resend code</button>
                                        {showResent ?  null : <CountDownComponent setShowResent={setShowResent}/> }    
                                        </p> */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  is_user_login: state.vantage.userDataReducer.is_user_login,
  screen_to_be_shown_on_login:
    state.vantage.commonReducer.screen_to_be_shown_on_login,
  // screen_to_be_shown_on_login: "login",
  screen_to_be_shown_on_signup:
    state.vantage.commonReducer.screenToBeShownOnSignUp,
  contact_name_for_signup: state.vantage.commonReducer.contactName,
  email_address_for_signup: state.vantage.commonReducer.emailAddress,
  phone_number_for_signup: state.vantage.commonReducer.phoneNumber,
  company_size_for_signup: state.vantage.commonReducer.companySize,
  company_name_for_signup: state.vantage.commonReducer.companyName,
  compnay_address_for_signup: state.vantage.commonReducer.companyAddress,
  term_for_signup: state.vantage.commonReducer.terms,
  invalid_passcode: state.vantage.commonReducer.invalidPasscode,
  company_number_for_signup: state.vantage.commonReducer.companyNumber,

  compnay_address_one_for_signup: state.vantage.commonReducer.companyAddressOne,
  compnay_address_two_for_signup: state.vantage.commonReducer.companyAddressTwo,
  compnay_city_for_signup: state.vantage.commonReducer.companyCity,
  compnay_post_code_for_signup: state.vantage.commonReducer.companyPostCode,
});

const mapDispatchToProps = (dispatch) => ({
  // userSignInAction: userSignInAction,
  // userSignInTemp: (data, booking_id) => dispatch(userSignInAction(data, booking_id)),
  setScreenToBeShownOnLogin: (screen) =>
    dispatch(setScreenToBeShownOnLogin(screen)),
  userEmailVerificaitonForLogin: (email) =>
    dispatch(userEmailVerificaitonForLogin(email)),
  userPassCodeVerificationForSignup: (
    business_name,
    full_name,
    email_address,
    mobile_number,
    passcode,
    company_size,
    claim_request_id,
    invitationCode
  ) =>
    dispatch(
      userPassCodeVerificationForSignup(
        business_name,
        full_name,
        email_address,
        mobile_number,
        passcode,
        company_size,
        claim_request_id,
        invitationCode
      )
    ),
  setScreenToBeShownOnSignup: (screen) =>
    dispatch(setScreenToBeShownOnSignup(screen)),
  setInvalidPasscode: (status) => dispatch(setInvalidPasscode(status)),
  resetCommonReducer: () => dispatch(resetCommonReducer()),
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
  setGlobalIsRequestLoader: (status) =>
    dispatch(setGlobalIsRequestLoader(status)),
  setExternalLink: (isLinkAllowed) => dispatch(setExternalLink(isLinkAllowed)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PassCodeScreen);
