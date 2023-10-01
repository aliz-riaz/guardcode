import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio,
  AvCheckboxGroup,
  AvCheckbox,
} from "availity-reactstrap-validation";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import IsRequestLoderComponent from "../components/Common/IsRequestLoderComponent";
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
  resetCommonReducer,
  setCompanyAddressForSignup,
} from "../redux/actions/signup";
import {
  getLoqateSuggestionsByText,
  setLocateSuggestionForText,
  getLoqateSuggestionById,
} from "../redux/actions/jobPostAction";
import { useCookies } from "react-cookie";
import * as cookieparse from "cookie";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Label, Row, Col, FormGroup } from "reactstrap";
// import SignupScreenForm from '../components/signup/SignupScreenForm';
import PasscodeScreen from "../components/signup/PasscodeScreen";
import dynamic from "next/dynamic";
import { protectLoginPageIfLogin } from "../utilites/utility";
import Head from "next/head";
import Cookies from "js-cookie";
import { socket } from "../lib/SocketProvider";
import { userLogoutAction } from "../redux/actions/login";
import _ from "lodash";
import useLogout from "../hooks/Auth/useLogout";
const SignupScreenForm = dynamic(
  () => import("../components/signup/SignupScreenForm"),
  {
    ssr: false,
  }
);

export const getServerSideProps = async function (context) {
  return protectLoginPageIfLogin(context);
};

function SignUp(props) {
  const [didUserSawTheModal, setDidUserSawTheModal] = useState(false);
  const { cleanGlobalState } = useLogout(props);

  useEffect(() => {
    props.setScreenToBeShownOnSignup("signup");
    props.resetCommonReducer();
    cleanGlobalState();
  }, []);

  return (
    <>
      <Head>
        <link rel="canonical" href="https://www.guardpass.com/employers" />
      </Head>
      <div>
        {process.browser === true &&
        props.screen_to_be_shown_on_signup == "passcode" ? (
          <PasscodeScreen setDidUserSawTheModal={setDidUserSawTheModal} />
        ) : (
          <SignupScreenForm
            didUserSawTheModal={didUserSawTheModal}
            setDidUserSawTheModal={setDidUserSawTheModal}
            //    classForBlur={classForBlur}
            //    setClassForBlur={setClassForBlur}
          />
        )}
      </div>
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
});

const mapDispatchToProps = (dispatch) => ({
  userSignUpAction: (name, company_name, email, phoneNumber) =>
    dispatch(userSignUpAction(name, company_name, email, phoneNumber)),
  getCompanyHouseData: (keyword) => dispatch(getCompanyHouseData(keyword)),
  getLoqateSuggestionById: getLoqateSuggestionById,
  getLoqateSuggestionByIdWithPromise: (id) =>
    dispatch(getLoqateSuggestionById(id)),
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
  resetCommonReducer: () => dispatch(resetCommonReducer()),
  userLogoutAction: userLogoutAction,
  userLogoutActionTemp: () => dispatch(userLogoutAction()),
  resetJobReducer: () => dispatch({ type: "RESET_STAFFING_REDUCER" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
