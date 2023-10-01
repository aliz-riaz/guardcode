import * as t from "../types";

const defaultState = {
  user_token: "",
  user_token_type: "",
  is_user_login: false,
  user_id: null,
  user_name: "anonymous",
  decision_maker_first_name: "",
  decision_maker_last_name: "",
  user_email: "",
  user_mobile_number: null,
  address1: "",
  address2: "",
  city: "",
  postcode: "",
  is_discount_on_booking_enabled: null,
  discount_per_on_booking: null,
  no_of_bookings_to_avail_discount: null,
  is_bank_transfer_enabled: null,
  is_user_account_verified: null,
  is_news_modal_disabled: false,
  is_cv_search_avalible: false,
  is_onboarding_feedback_done: true,
  is_onboarding_tour_done: true,
  show_onboarding_feedback_modal: false,
  show_onboarding_tour_modal: false,
};

// export default function (state = defaultState, action = {}) {
const userDataReducer = (state = defaultState, action) => {
  switch (action.type) {
    case t.GET_USER_TOKEN:
      return {
        ...state,
        user_token: state.user_token,
      };
    case t.SET_USER_TOKEN:
      return {
        ...state,
        user_token: action.payload,
      };

    case t.GET_USER_TOKEN_TYPE:
      return {
        ...state,
        user_token_type: state.user_token_type,
      };
    case t.SET_USER_TOKEN_TYPE:
      return {
        ...state,
        user_token_type: action.payload,
      };

    case t.SET_IS_USER_LOGIN:
      return {
        ...state,
        is_user_login: action.payload,
      };

    case t.SET_USER_ID:
      return {
        ...state,
        user_id: action.payload,
      };
    case t.SET_USER_NAME:
      return {
        ...state,
        user_name: action.payload,
      };
    case t.SET_DECISION_MAKER_FIRST_NAME:
      return {
        ...state,
        decision_maker_first_name: action.payload,
      };
    case t.SET_DECISION_MAKER_LAST_NAME:
      return {
        ...state,
        decision_maker_last_name: action.payload,
      };
    case t.SET_USER_EMAIL:
      return {
        ...state,
        user_email: action.payload,
      };
    case t.SET_USER_MOBILE_NUMBER:
      return {
        ...state,
        user_mobile_number: action.payload,
      };
    case t.SET_ADDRESS1:
      return {
        ...state,
        address1: action.payload,
      };
    case t.SET_ADDRESS2:
      return {
        ...state,
        address2: action.payload,
      };
    case t.SET_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case t.SET_USER_POSTCODE:
      return {
        ...state,
        postcode: action.payload,
      };

    case t.SET_IS_DISCOUNT_ENABLED:
      return {
        ...state,
        is_discount_on_booking_enabled: action.payload,
      };
    case t.SET_DISCOUNT_ON_COURSE_BOOKING:
      return {
        ...state,
        discount_per_on_booking: action.payload,
      };
    case t.SET_NO_OF_BOOKINGS_TO_AVAIL_DISCOUNT:
      return {
        ...state,
        no_of_bookings_to_avail_discount: action.payload,
      };
    case t.SET_IS_BANK_TRANSFER_AVALIBLE:
      return {
        ...state,
        is_bank_transfer_enabled: action.payload,
      };
    case t.SET_IS_USER_ACCOUNT_VERIFIED:
      return {
        ...state,
        is_user_account_verified: action.payload,
      };
    case t.SET_IS_NEWS_MODAL_DISABLED:
      return {
        ...state,
        is_news_modal_disabled: action.payload,
      };
    case t.SET_IS_CV_SEARCH_AVALIBLE:
      return {
        ...state,
        is_cv_search_avalible: action.payload,
      };
    case t.SET_IS_ONBOARDING_FEEDBACK_DONE:
      return {
        ...state,
        is_onboarding_feedback_done: action.payload,
      };
    case t.SET_IS_ONBOARDING_TOUR_DONE:
      return {
        ...state,
        is_onboarding_tour_done: action.payload,
      };
    case t.SET_IS_ONBOARDING_FEEDBACK_MODAL:
      return {
        ...state,
        show_onboarding_feedback_modal: action.payload,
      };
    case t.SET_IS_ONBOARDING_TOUR_MODAL:
      return {
        ...state,
        show_onboarding_tour_modal: action.payload,
      };
    case t.RESET_USER_DATA_REDUCER:
      return {
        ...state,
        user_token: "",
        user_token_type: "",
        is_user_login: false,
        user_id: null,
        user_name: "anonymous",
        decision_maker_first_name: "",
        decision_maker_last_name: "",
        user_email: "",
        user_mobile_number: null,
        address1: "",
        address2: "",
        city: "",
        postcode: "",
        is_discount_on_booking_enabled: null,
        discount_per_on_booking: null,
        no_of_bookings_to_avail_discount: null,
        is_bank_transfer_enabled: null,
        is_user_account_verified: null,
        is_user_account_verified: null,
        is_news_modal_disabled: true,
        is_cv_search_avalible: false,
        is_onboarding_feedback_done: true,
        is_onboarding_tour_done: true,
        show_onboarding_feedback_modal: false,
        show_onboarding_tour_modal: false,
      };

    default:
      return state;
  }
};

export default userDataReducer;
