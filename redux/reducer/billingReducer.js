import * as t from "../types";

const defaultState = {
  showBillingModal: false,
  currentStep: 1,

  showJobPostCalculator: false,
  showJobBoostCalculator: false,
  showCVViewsCalculator: false,

  selectedJobPostCredits: 1,
  selectedJobBoostCredits: 1,
  selectedCVViewsCredits: 50,

  cart: [],
  // switchValue: false,
  // selectedPlan: null,

  selectedPaymentMethod: null,
  selectedCardBrand: null,
  selectedCardEndingIn: null,

  buyBoostModal: false,
  showChangeCardModal: false,

  // nextPaymentDate: null,

  // isCustomPlanAvailable: false,
  // isPaymentFailed: false,
  boostMatchingCandidatesList: {},
  boostJobId: 0,
  boostedJobIdForBadge: 0,
  boostConfirmationModal: false,
  jobPostModal: false,
  isPaymentVerifying: false,
};

const billingReducer = (state = defaultState, action) => {
  switch (action.type) {
    case t.SET_SHOW_BILLING_MODAL:
      return {
        ...state,
        showBillingModal: action.payload,
      };
    case t.SET_CURRENT_BILLING_MODAL_STEP:
      return {
        ...state,
        currentStep: action.payload,
      };

    case t.SET_SHOW_JOB_POST_CALCULATOR:
      return {
        ...state,
        showJobPostCalculator: action.payload,
      };
    case t.SET_SHOW_JOB_BOOST_CALCULATOR:
      return {
        ...state,
        showJobBoostCalculator: action.payload,
      };
    case t.SET_SHOW_CV_VIEWS_CALCULATOR:
      return {
        ...state,
        showCVViewsCalculator: action.payload,
      };

    case t.SET_SELECTED_JOB_POST_CREDITS:
      return {
        ...state,
        selectedJobPostCredits: action.payload,
      };
    case t.SET_SELECTED_JOB_BOOST_CREDITS:
      return {
        ...state,
        selectedJobBoostCredits: action.payload,
      };
    case t.SET_SELECTED_CV_VIEWS_CREDITS:
      return {
        ...state,
        selectedCVViewsCredits: action.payload,
      };

    case t.SET_ORDER_CART:
      return {
        ...state,
        cart: action.payload,
      };
    // case t.SET_PLAN_INTERVAL_SWITCH_VALUE:
    //   return {
    //     ...state,
    //     switchValue: action.payload,
    //   };
    // case t.SET_SELECTED_PLAN:
    //   return {
    //     ...state,
    //     selectedPlan: action.payload,
    //   };
    case t.SET_SELECTED_PAYMENT_METHOD:
      return {
        ...state,
        selectedPaymentMethod: action.payload,
      };
    case t.SET_SELECTED_CARD_BRAND:
      return {
        ...state,
        selectedCardBrand: action.payload,
      };
    case t.SET_SELECTED_CARD_ENDING_IN:
      return {
        ...state,
        selectedCardEndingIn: action.payload,
      };
    case t.SET_SHOW_CHANGE_CARD_MODAL:
      return {
        ...state,
        showChangeCardModal: action.payload,
      };
    // case t.SET_NEXT_PAYMENT_DATE:
    //   return {
    //     ...state,
    //     nextPaymentDate: action.payload,
    //   };

    // case t.SET_IS_CUSTOM_PLAN_AVAILABLE:
    //   return {
    //     ...state,
    //     isCustomPlanAvailable: action.payload,
    //   };
    // case t.SET_IS_PAYMENT_FAILED:
    //   return {
    //     ...state,
    //     isPaymentFailed: action.payload,
    //   };

    case t.RESET_BILLING_REDUCER:
      return {
        ...state,
        showBillingModal: false,
        currentStep: 1,

        showJobPostCalculator: false,
        showJobBoostCalculator: false,
        showCVViewsCalculator: false,

        selectedJobPostCredits: 1,
        selectedJobBoostCredits: 1,
        selectedCVViewsCredits: 50,

        cart: [],

        // switchValue: false,
        // selectedPlan: null,
        selectedPaymentMethod: null,
        selectedCardBrand: null,
        selectedCardEndingIn: null,
        buyBoostModal: false,
        showChangeCardModal: false,
        // nextPaymentDate: null,
        // isCustomPlanAvailable: false,
        // isPaymentFailed: false,
        // boostMatchingCandidatesList: {},
        boostJobId: 0,
        boostedJobIdForBadge: 0,
        boostConfirmationModal: false,
        jobPostModal: false,
        isPaymentVerifying: false,
      };
    case t.SET_BUY_BOOST_MODAL:
      return {
        ...state,
        buyBoostModal: action.payload,
      };
    case t.SET_BOOST_MATCHING_CANDIDATES_LIST:
      return {
        ...state,
        boostMatchingCandidatesList: action.payload,
      };
    case t.SET_BOOST_JOB_ID:
      return {
        ...state,
        boostJobId: action.payload,
      };
    case t.SET_BOOST_JOB_ID_FOR_BADGE:
      return {
        ...state,
        boostedJobIdForBadge: action.payload,
      };
    case t.SET_BOOST_CONFIRMATION_MODAL:
      return {
        ...state,
        boostConfirmationModal: action.payload,
      };
    case t.SET_JOB_POST_MODAL:
      return {
        ...state,
        jobPostModal: action.payload,
      };
    case t.ISPAYMENTVERIFYING:
      return {
        ...state,
        isPaymentVerifying: action.payload,
      };
    default:
      return state;
  }
};

export default billingReducer;
