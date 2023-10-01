import * as t from "../types";

const defaultState = {
  postShiftActiveSteps: 1,
  showCreateRole: false,
  createRole: { id: 0, mode: "" },
  roleName: "",
  roleReference: "",
  roleLicense: [],
  roleJobDescription: "",
  roleUniformType: "",
  roleUniformDescription: "",
  roleUniformImage: "",
  roleSiteType: "",
  roleSiteList: [],
  //shiftPosting
  selectedSite: {},
  selectedRole: {},
  selectedVenue: "",
  discardModalForShiftPost: false,
  shiftPostingArray: [
    {
      date_start: "",
      date_end: "",
      time_start: "",
      time_end: "",
      paid_break: 0,
      workers_required: 1,
      pay_rate: "",
    },
  ],
  calculations: [
    {
      working_hour: 0,
      pay_rate: 0,
    },
  ],
  shiftExternalCharge: {},
  selectedCandidatesForOffer: [],
  //Create Site
  createSite: { id: 0, mode: "" },
  showCreateSite: false,
  siteName: "",
  siteReference: "",
  siteAddress1: "",
  siteAddress2: "",
  sitePostcode: "",
  siteCity: "",
  siteAccessInstruction: "",
  siteLableColor: "",
  siteContactPerson: "",
  siteContactNumber: "",
  siteUseMyDetail: "",
  currentStepWorkerScreen: 1,
  showWorkerSteps: false,
};

const shiftReducer = (state = defaultState, action) => {
  switch (action.type) {
    case t.SET_SHIFT_POST_ACTIVE_STEPS:
      return {
        ...state,
        postShiftActiveSteps: action.payload,
      };
    case t.SET_SHOW_CREATE_ROLE:
      return {
        ...state,
        showCreateRole: action.payload,
      };
    case t.SET_CREATE_ROLE:
      return {
        ...state,
        createRole: action.payload,
      };
    case t.SET_ROLE_NAME:
      return {
        ...state,
        roleName: action.payload,
      };
    case t.SET_ROLE_REFERENCE:
      return {
        ...state,
        roleReference: action.payload,
      };
    case t.SET_ROLE_LICENSE:
      return {
        ...state,
        roleLicense: action.payload,
      };
    case t.SET_ROLE_JOB_DESCRIPTION:
      return {
        ...state,
        roleJobDescription: action.payload,
      };

    case t.SET_ROLE_UNIFORM_TYPE:
      return {
        ...state,
        roleUniformType: action.payload,
      };

    case t.SET_ROLE_UNIFORM_DESCRIPTION:
      return {
        ...state,
        roleUniformDescription: action.payload,
      };

    case t.SET_ROLE_UNIFORM_IMAGE:
      return {
        ...state,
        roleUniformImage: action.payload,
      };
    case t.SET_ROLE_SITE_TYPE:
      return {
        ...state,
        roleSiteType: action.payload,
      };
    case t.SET_ROLE_SITE_LIST:
      return {
        ...state,
        roleSiteList: action.payload,
      };
    // case t.RESET_SHIFT_REDUCER:

    case t.SET_DISCARD_MODAL_FOR_SHIFT_POST:
      return {
        ...state,
        discardModalForShiftPost: action.payload,
      };
    case t.SET_SHIFT_POSTING_Array:
      return {
        ...state,
        shiftPostingArray: action.payload,
      };
    case t.SET_SHIFT_POSTING_DELETE_Array:
      const updateArray = state.shiftPostingArray.filter(
        (_, i) => i !== action.payload
      );
      return {
        ...state,
        shiftPostingArray: updateArray,
      };
    case t.SET_SHIFT_SELECT_SITE:
      return {
        ...state,
        selectedSite: action.payload,
      };

    case t.SET_SHIFT_SELECT_ROLE:
      return {
        ...state,
        selectedRole: action.payload,
      };

    case t.SET_SHIFT_SELECT_VENUE_TYPE:
      return {
        ...state,
        selectedVenue: action.payload,
      };

    case t.SET_SHIFT_CALCULATION:
      return {
        ...state,
        calculations: action.payload,
      };

    case t.SET_SHIFT_EXTERNSL_CHARGES:
      return {
        ...state,
        shiftExternalCharge: action.payload,
      };
    case t.SET_SELECTED_CANDIDATES_FOR_OFFER:
      return {
        ...state,
        // selectedCandidatesForOffer: [
        //   ...state?.selectedCandidatesForOffer,
        //   action.payload,
        // ],
        selectedCandidatesForOffer: Array.isArray(
          state.selectedCandidatesForOffer
        )
          ? [...state.selectedCandidatesForOffer, action.payload]
          : [action.payload],
      };
    case t.REMOVE_SELECTED_CANDIDATES_FOR_OFFER:
      return {
        ...state,
        selectedCandidatesForOffer: state.selectedCandidatesForOffer.filter(
          (list) => list !== action.payload
        ),
      };
    case t.RESET_SELECTED_CANDIDATES_FOR_OFFER:
      return {
        ...state,
        selectedCandidatesForOffer: [],
      };
    case t.SET_CREATE_SITE:
      return {
        ...state,
        createSite: action.payload,
      };
    case t.SET_SHOW_CREATE_SITE:
      return {
        ...state,
        showCreateSite: action.payload,
      };
    case t.SET_SITE_NAME:
      return {
        ...state,
        siteName: action.payload,
      };
    case t.SET_SITE_REFERENCE:
      return {
        ...state,
        siteReference: action.payload,
      };
    case t.SET_SITE_ADDRESS1:
      return {
        ...state,
        siteAddress1: action.payload,
      };
    case t.SET_SITE_ADDRESS2:
      return {
        ...state,
        siteAddress2: action.payload,
      };
    case t.SET_SITE_POSTCODE:
      return {
        ...state,
        sitePostcode: action.payload,
      };
    case t.SET_SITE_CITY:
      return {
        ...state,
        siteCity: action.payload,
      };
    case t.SET_SITE_ACCESS_INSTRUCTION:
      return {
        ...state,
        siteAccessInstruction: action.payload,
      };
    case t.SET_SITE_LABEL_COLOR:
      return {
        ...state,
        siteLableColor: action.payload,
      };
    case t.SET_SITE_CONTACT_PERSON:
      return {
        ...state,
        siteContactPerson: action.payload,
      };
    case t.SET_SITE_CONTACT_NUMBER:
      return {
        ...state,
        siteContactNumber: action.payload,
      };
    case t.SET_SITE_USE_MY_DETAIL:
      return {
        ...state,
        siteUseMyDetail: action.payload,
      };
    case t.SET_CURRENT_STEP_WORKER_SCREEN:
      return {
        ...state,
        currentStepWorkerScreen: action.payload,
      };
    case t.SHOW_WORKER_SCREEN:
      return {
        ...state,
        showWorkerSteps: action.payload,
      };
    case t.RESET_SHIFT_REDUCER:
      return {
        ...state,
        createRole: { id: 0, mode: "" },
        postShiftActiveSteps: 1,
        showCreateRole: false,
        roleName: "",
        roleReference: "",
        roleLicense: [],
        roleJobDescription: "",
        roleUniformType: "",
        roleUniformDescription: "",
        roleUniformImage: "",
        roleSiteType: "",
        roleSiteList: [],
        selectedSite: {},
        selectedRole: {},
        selectedVenue: "",
        shiftPostingArray: [
          {
            date_start: "",
            date_end: "",
            time_start: "",
            time_end: "",
            paid_break: 0,
            workers_required: 1,
            pay_rate: "",
          },
        ],
        selectedCandidatesForOffer: [],
        //Create Site
        createSite: { id: 0, mode: "" },
        showCreateSite: false,
        siteName: "",
        siteReference: "",
        siteAddress1: "",
        siteAddress2: "",
        sitePostcode: "",
        siteCity: "",
        siteAccessInstruction: "",
        siteLableColor: "",
        siteContactPerson: "",
        siteContactNumber: "",
        siteUseMyDetail: "",
        currentStepWorkerScreen: 1,
        showWorkerSteps: false,
      };
    default:
      return state;
  }
};

export default shiftReducer;
