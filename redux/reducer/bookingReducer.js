import * as t from "../types";

const defaultState = {
  booking_active_step: 1,
  postcode: "",
  course_id: 0,
  course_name: "",
  number_of_seats: 0,
  selected_location_object: {},
  location_id: 0,
  location_name: "",
  attendees: [],
  attendees_show_error: false,
  session_id: "",
  payment_intent_id: "",
  pca_response: [],
  show_no_of_seats_error: false,
  should_slider_shake_on_step_one: false,
  did_user_placed_the_order: false,
  screen_to_be_loaded_on_step5_checkout: 1,
  step5_checkout_radio_btn_value: "",
  step5_checkout_checkbox_btn_value: "",
  sub_total_for_payment: 0,
  unlimited_retakes_total_for_payment: 0,
  efaw_total_for_payment: 0,
  discount_for_payment: 0,
  total_bill_for_payment: 0,
  no_of_bookings_for_first_aid_for_payment: 0,
  no_of_bookings_for_unlimited_retakes_for_payment: 0,
  booking_ref_no: "",
  user_po_number: "",
  virtual_events: {},
  client_secret: null,
};

const bookingReducer = (state = defaultState, action) => {
  switch (action.type) {
    case t.SET_BOOKING_ACTIVE_STEP:
      return {
        ...state,
        booking_active_step: action.payload,
      };
    case t.SET_SELECTED_COURSE_ID:
      return {
        ...state,
        course_id: action.payload,
      };
    case t.SET_POSTCODE:
      return {
        ...state,
        postcode: action.payload,
      };
    case t.SET_SELECTED_COURSE_NAME:
      return {
        ...state,
        course_name: action.payload,
      };
    case t.SET_NUMBER_OF_SEATS:
      return {
        ...state,
        number_of_seats: action.payload,
      };

    case t.SET_SELECTED_LOCATION_OBJECT:
      return {
        ...state,
        selected_location_object: action.payload,
      };
    case t.SET_LOCATION_ID:
      return {
        ...state,
        location_id: action.payload,
      };
    case t.SET_LOCATION_NAME:
      return {
        ...state,
        location_name: action.payload,
      };
    case t.SET_ATTENDEES:
      return {
        ...state,
        attendees: action.payload,
      };
    case t.SET_ATTENDEES_SHOW_ERROR:
      return {
        ...state,
        attendees_show_error: action.payload,
      };

    case t.SET_SESSION_ID:
      return {
        ...state,
        session_id: action.payload,
      };
    case t.SET_PAYMENT_INTENT_ID:
      return {
        ...state,
        payment_intent_id: action.payload,
      };
    case t.SET_PCA_RESPONSE:
      return {
        ...state,
        pca_response: action.payload,
      };
    case t.SET_NO_OF_SEATS_ERROR:
      return {
        ...state,
        show_no_of_seats_error: action.payload,
      };
    case t.SET_SCREEB_TO_BE_LOADED_ON_STEP5_CHECKOUT:
      return {
        ...state,
        screen_to_be_loaded_on_step5_checkout: action.payload,
      };

    case t.SET_STEP5_RADIO_BTN_VALUE:
      return {
        ...state,
        step5_checkout_radio_btn_value: action.payload,
      };
    case t.SET_STEP5_CHECKBOX_BTN_VALUE:
      return {
        ...state,
        step5_checkout_checkbox_btn_value: action.payload,
      };
    case t.SET_DID_USER_PLACED_THE_ORDER:
      return {
        ...state,
        did_user_placed_the_order: action.payload,
      };
    case t.SET_SUB_TOTAL_FOR_PAYMENT:
      return {
        ...state,
        sub_total_for_payment: action.payload,
      };
    case t.SET_UNLIMITTED_RETAKES_TOTAL_FOR_PAYMENT:
      return {
        ...state,
        unlimited_retakes_total_for_payment: action.payload,
      };
    case t.SET_EFAW_TOTAL_FOR_PAYMENT:
      return {
        ...state,
        efaw_total_for_payment: action.payload,
      };
    case t.SET_DISCOUNT_FOR_PAYMENT:
      return {
        ...state,
        discount_for_payment: action.payload,
      };
    case t.SET_TOTAL_BILL_TOTAL_FOR_PAYMENT:
      return {
        ...state,
        total_bill_for_payment: action.payload,
      };
    case t.SET_NO_OF_BOOKINGS_FOR_FIRST_AID_FOR_PAYMENT:
      return {
        ...state,
        no_of_bookings_for_first_aid_for_payment: action.payload,
      };
    case t.SET_NO_OF_BOOKINGS_FOR_UNLIMITED_RETAKES_FOR_PAYMENT:
      return {
        ...state,
        no_of_bookings_for_unlimited_retakes_for_payment: action.payload,
      };
    case t.SET_BOOKING_REF_NO:
      return {
        ...state,
        booking_ref_no: action.payload,
      };
    case t.SET_SHOULD_SLIDER_SHAKE_ON_STEP_ONE:
      return {
        ...state,
        should_slider_shake_on_step_one: action.payload,
      };
    case t.SET_USER_PO_NUMBER:
      return {
        ...state,
        user_po_number: action.payload,
      };
    case t.SET_VIRTUAL_EVENT:
      return {
        ...state,
        virtual_events: action.payload,
      };
    case t.SET_CLIENT_SECRET_FOR_BOOKING:
      return {
        ...state,
        client_secret: action.payload,
      };
    case t.RESET_BOOKING_REDUCER:
      return {
        ...state,
        booking_active_step: 1,
        postcode: "",
        course_id: 0,
        course_name: "",
        number_of_seats: 0,
        selected_location_object: {},
        location_id: 0,
        location_name: "",
        attendees: [],
        session_id: "",
        payment_intent_id: "",
        pca_response: [],
        show_no_of_seats_error: false,
        should_slider_shake_on_step_one: false,
        did_user_placed_the_order: false,
        screen_to_be_loaded_on_step5_checkout: 1,
        step5_checkout_radio_btn_value: "",
        step5_checkout_checkbox_btn_value: "",
        sub_total_for_payment: 0,
        unlimited_retakes_total_for_payment: 0,
        efaw_total_for_payment: 0,
        discount_for_payment: 0,
        total_bill_for_payment: 0,
        no_of_bookings_for_first_aid_for_payment: 0,
        no_of_bookings_for_unlimited_retakes_for_payment: 0,
        booking_ref_no: "",
        user_po_number: "",
        virtual_events: {},
        client_secret: null,
      };
    default:
      return state;
  }
};

export default bookingReducer;
