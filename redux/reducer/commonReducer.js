import * as t from "../types";

const defaultState = {
  is_request_loader: false,
  is_navbar_open: true,
  is_model_open: false,
  is_model_link: "",
  sign_up_name: "",
  show_thank_you_page: false,
  should_component_on_page_one_shake: false,
  screen_to_be_shown_on_login: "login",
  //signup
  screenToBeShownOnSignUp: "signup",
  contactName: "",
  emailAddress: "",
  phoneNumber: "",
  companySize: "",
  companyName: "",
  companyAddress: "",
  companyNumber: "",
  companyNameSuggestion: [],
  terms: false,
  companyAddressOne: "",
  companyAddressTwo: "",
  companyCity: "",
  companyPostCode: "",
  invalidPasscode: false,
  // accountApproved: {
  //   is_account_declined : 0,
  //   is_account_approved : 0
  // },
  // hasCongratulated: null,
  // showCongratulationModal: false,
};

// export default function (state = defaultState, action = {}) {
const commonReducer = (state = defaultState, action) => {
  switch (action.type) {
    case t.SET_COMPONENT_SHAKE_ON_PAGE_ONE:
      return {
        ...state,
        should_component_on_page_one_shake: action.payload,
      };
    case t.SET_THANK_YOU_PAGE_SHOW:
      return {
        ...state,
        show_thank_you_page: action.payload,
      };
    case t.SET_SIGNUP_NAME:
      return {
        ...state,
        sign_up_name: action.payload,
      };
    case t.GET_IS_REQUEST_LOADER:
      return {
        ...state,
        is_request_loader: state.is_request_loader,
      };
    case t.SET_IS_REQUEST_LOADER:
      return {
        ...state,
        is_request_loader: action.payload,
      };
    case t.SET_IS_NAVBAR_OPEN:
      return {
        ...state,
        is_navbar_open: action.payload,
      };
    case t.SET_IS_MODEL_OPEN:
      return {
        ...state,
        is_model_open: action.payload,
      };
    case t.SET_IS_MODEL_LINK:
      return {
        ...state,
        is_model_link: action.payload,
      };
    case t.SET_SCREEN_TO_BE_SHOWN_ON_LOGIN:
      return {
        ...state,
        screen_to_be_shown_on_login: action.payload,
      };
    case t.SET_SCREEN_TO_BE_SHOWN_ON_SIGNUP:
      return {
        ...state,
        screenToBeShownOnSignUp: action.payload,
      };
    case t.SET_CONTACT_NAME_FOR_SIGNUP:
      return {
        ...state,
        contactName: action.payload,
      };
    case t.SET_EMAIL_ADDRESS_FOR_SIGNUP:
      return {
        ...state,
        emailAddress: action.payload,
      };
    case t.SET_PHONE_NUMBER_FOR_SIGNUP:
      return {
        ...state,
        phoneNumber: action.payload,
      };
    case t.SET_COMPANY_SIZE_FOR_SIGNUP:
      return {
        ...state,
        companySize: action.payload,
      };
    case t.SET_COMPANY_NAME_FOR_SIGNUP:
      return {
        ...state,
        companyName: action.payload,
      };
    case t.SET_COMPANY_ADDRESS_FOR_SIGNUP:
      return {
        ...state,
        companyAddress: action.payload,
      };
    case t.SET_COMPANY_ADDRESS_ONE_FOR_SIGNUP:
      return {
        ...state,
        companyAddressOne: action.payload,
      };
    case t.SET_COMPANY_ADDRESS_TWO_FOR_SIGNUP:
      return {
        ...state,
        companyAddressTwo: action.payload,
      };
    case t.SET_COMPANY_CITY_FOR_SIGNUP:
      return {
        ...state,
        companyCity: action.payload,
      };
    case t.SET_COMPANY_POST_FOR_SIGNUP:
      return {
        ...state,
        companyPostCode: action.payload,
      };
    case t.SET_TERMS_FOR_SIGNUP:
      return {
        ...state,
        terms: action.payload,
      };
    case t.SET_COMPANY_NUMBER_FOR_SIGNUP:
      return {
        ...state,
        companyNumber: action.payload,
      };
    case t.SET_INVALID_PASSCODE:
      return {
        ...state,
        invalidPasscode: action.payload,
      };
    // case t.SET_ACCOUNT_APPROVAL:
    //   return {
    //     ...state,
    //     accountApproved: action.payload,
    //   };
    // case t.SET_HAS_CONGRATULATED:
    //   return {
    //     ...state,
    //     hasCongratulated: action.payload,
    //   };
    // case t.SET_SHOW_CONGRATULATION_MODAL:
    //   return {
    //     ...state,
    //     showCongratulationModal: action.payload,
    //   };
    case t.SET_COMPANY_NAME_SUGGESTIONS:
      return {
        ...state,
        companyNameSuggestion: action.payload,
      };
    case t.RESET_COMMON_REDUCER:
      return {
        ...state,
        is_request_loader: false,
        is_navbar_open: true,
        is_model_open: false,
        is_model_link: "",
        screen_to_be_shown_on_login: "login",

        screenToBeShownOnSignUp: "signup",
        // accountApproved: {
        //   is_account_declined : 0,
        //   is_account_approved : 0
        // },
        contactName: "",
        emailAddress: "",
        phoneNumber: "",
        companySize: "",
        companyName: "",
        companyNumber: "",
        companyNameSuggestion: [],
        companyAddress: "",
        terms: false,
        companyAddressOne: "",
        companyAddressTwo: "",
        companyCity: "",
        companyPostCode: "",
        invalidPasscode: false,
        // hasCongratulated: null,
        // showCongratulationModal: false,
      };
    default:
      return state;
  }
};

export default commonReducer;
