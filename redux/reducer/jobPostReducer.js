import * as t from "../types";

const defaultState = {
  activeStep: 1,
  jobTitle: "",
  jobDescTemplate: [],
  showJobDescTemplate: false,
  jobDescTitles: [],
  refNumber: "",
  typeOfEmployment: "",
  SIALicense: [],
  radio: "",
  contract: "",
  venueType: "",
  venueTypeOtherValue: "",
  is_immediate: "",
  shift_schedule: "",
  shift_timing: "",
  editor: "",
  willReportToSpecificAddress: "",
  WillNotReportToCity: "",
  selectedLocationFromGoogle: false,
  WillNotReportToPostCode: "",
  showGoogleMapForGoogle: false,
  showGoogleMapForLoqate: false,
  centerForMapGoogle: {
    lat: 51.5072178,
    lng: -0.1275862,
  },
  centerForMapLoqate: {
    lat: 51.5072178,
    lng: -0.1275862,
  },
  willReportToWorkPostCode: "",
  willReportToWorkCity: "",
  willReportToWorkaddress1: "",
  willReportToWorkaddress2: "",
  loqateResponeforText: [],
  loqateResponeforId: "",
  willReportToWorkShowHide: true,
  salaryType: "Fixed Rate",
  salaryValue: "",
  salaryRangeMin: "",
  salaryRangeMax: "",
  salaryValuePerUnit: "",
  salaryWorkHourPerWeek: "",
  salaryBenefits: [],
  settingsEmail: "",
  show_discard_modal_for_job_post: false,
  discard_link_for_modal: "#",
  showJobPostPreview: false,
  jobTitleSuggestions: [],
  availableConnects: null,
  clientSecret: null,
  paymentIntent: null,
  jobPrice: null,
  jobPriceVAT: null,
  draftLatestJobId: null,
  isUserInJobPostingFlow: false,
  isAvailableForTeam: 0,
  saveJobAsTemplate: false,
  updateJobTemplate: false,
  templateId: 0,
  jobTemplate: { name: "", error: false, errorMessage: "", ownerId: 0 },
  fromJobTemplate: false,
  billingPlan: [],
  jobPostingLimitEnd: false,
  is_job_draft: false,
  fetchJobs: false,
  available_boost_credits: null,
  websiteLink: "",
};

const jobPostReducer = (state = defaultState, action) => {
  switch (action.type) {
    case t.SET_ACTIVE_STEP:
      return {
        ...state,
        activeStep: action.payload,
      };

    case t.SET_JOB_TITLE:
      return {
        ...state,
        jobTitle: action.payload,
      };

    case t.SET_JOB_DESCRIPTION_TEMPLATE:
      return {
        ...state,
        jobDescTemplate: action.payload,
      };

    case t.SET_JOB_DESCRIPTION_TITLES:
      return {
        ...state,
        jobDescTitles: action.payload,
      };

    case t.SET_TYPE_OF_EMPLOYMENT:
      return {
        ...state,
        typeOfEmployment: action.payload,
      };

    case t.SET_SIA_LICENSE:
      return {
        ...state,
        SIALicense: action.payload,
      };

    case t.SET_RADIO:
      return {
        ...state,
        radio: action.payload,
      };

    case t.SET_CONTRACT:
      return {
        ...state,
        contract: action.payload,
      };
    case t.SET_VENUE_TYPE:
      return {
        ...state,
        venueType: action.payload,
      };
    case t.SET_VENUE_TYPE_OTHER_VALUE:
      return {
        ...state,
        venueTypeOtherValue: action.payload,
      };

    case t.SET_IMMEDIATE_HIRING:
      return {
        ...state,
        is_immediate: action.payload,
      };

    case t.SET_SHIFT_SCHEDULE:
      return {
        ...state,
        shift_schedule: action.payload,
      };

    case t.SET_SHIFT_TIMING:
      return {
        ...state,
        shift_timing: action.payload,
      };

    case t.SET_EDITOR:
      return {
        ...state,
        editor: action.payload,
      };

    case t.SET_WILL_REPORT_TO_SPECIFIC_ADDRESS:
      return {
        ...state,
        willReportToSpecificAddress: action.payload,
      };
    case t.SET_WILL_NOT_REPORT_TO_CITY:
      return {
        ...state,
        WillNotReportToCity: action.payload,
      };
    case t.SET_WILL_NOT_REPORT_TO_POST_CODE:
      return {
        ...state,
        WillNotReportToPostCode: action.payload,
      };
    case t.SET_CENTER_FOR_MAP_GOOGLE:
      return {
        ...state,
        centerForMapGoogle: action.payload,
      };
    case t.SET_CENTER_FOR_MAP_LOQATE:
      return {
        ...state,
        centerForMapLoqate: action.payload,
      };
    case t.SET_WILL_REPORT_TO_WORK_POST_CODE:
      return {
        ...state,
        willReportToWorkPostCode: action.payload,
      };
    case t.SET_WILL_REPORT_TO_WORK_CITY:
      return {
        ...state,
        willReportToWorkCity: action.payload,
      };
    case t.SET_WILL_REPORT_TO_WORK_ADDRESS_ONE:
      return {
        ...state,
        willReportToWorkaddress1: action.payload,
      };
    case t.SET_WILL_REPORT_TO_WORK_ADDRESS_TWO:
      return {
        ...state,
        willReportToWorkaddress2: action.payload,
      };
    case t.SET_LOQATE_RESPONSE_FOR_TEXT:
      return {
        ...state,
        loqateResponeforText: action.payload,
      };
    case t.SET_LOQATE_RESPONSE_FOR_ID:
      return {
        ...state,
        loqateResponeforId: action.payload,
      };
    case t.SET_WILL_REPORT_TO_WORK_FIELDS_SHOW_HIDE:
      return {
        ...state,
        willReportToWorkShowHide: action.payload,
      };
    case t.SET_SALARY_TYPE:
      return {
        ...state,
        salaryType: action.payload,
      };
    case t.SET_SALARY_RANGE_MIN:
      return {
        ...state,
        salaryRangeMin: action.payload,
      };
    case t.SET_SALARY_RANGE_MAX:
      return {
        ...state,
        salaryRangeMax: action.payload,
      };
    case t.SET_SALARY_VALUE:
      return {
        ...state,
        salaryValue: action.payload,
      };
    case t.SET_SALARY_VALUE_PER_UNIT:
      return {
        ...state,
        salaryValuePerUnit: action.payload,
      };
    case t.SET_SALARY_BENEFITS:
      return {
        ...state,
        salaryBenefits: action.payload,
      };
    case t.SET_SETTINGS_EMAIL:
      return {
        ...state,
        settingsEmail: action.payload,
      };
    case t.SET_DISCARD_MODAL_FOR_JOB_POST:
      return {
        ...state,
        show_discard_modal_for_job_post: action.payload,
      };
    case t.SET_DISCARD_LINK_FOR_MODAL:
      return {
        ...state,
        discard_link_for_modal: action.payload,
      };
    case t.SET_JOB_TITLE_SUGGESTION:
      return {
        ...state,
        jobTitleSuggestions: action.payload,
      };
    case t.SET_SHOW_JOB_PREVIEW:
      return {
        ...state,
        showJobPostPreview: action.payload,
      };
    case t.SET_SHOW_GOOGLE_MAP_FOR_GOOGLE:
      return {
        ...state,
        showGoogleMapForGoogle: action.payload,
      };
    case t.SET_SHOW_GOOGLE_MAP_FOR_LOQATE:
      return {
        ...state,
        showGoogleMapForLoqate: action.payload,
      };
    case t.SET_SALARY_WORK_HOUR_PER_WEEK:
      return {
        ...state,
        salaryWorkHourPerWeek: action.payload,
      };
    case t.SET_JOB_REF_NUMBER:
      return {
        ...state,
        refNumber: action.payload,
      };
    case t.SET_AVALIBLE_CONNECTS:
      return {
        ...state,
        availableConnects: action.payload,
      };
    case t.SET_CLIENT_SECRET:
      return {
        ...state,
        clientSecret: action.payload,
      };
    case t.SET_PAYMENT_INTENT:
      return {
        ...state,
        paymentIntent: action.payload,
      };
    case t.SET_JOB_PRICE:
      return {
        ...state,
        jobPrice: action.payload,
      };
    case t.SET_JOB_PRICE_VAT:
      return {
        ...state,
        jobPriceVAT: action.payload,
      };
    case t.SET_SELECTED_LOCATION_FROM_GOOGLE:
      return {
        ...state,
        selectedLocationFromGoogle: action.payload,
      };
    case t.SET_DRAFT_LATEST_JOB_ID:
      return {
        ...state,
        draftLatestJobId: action.payload,
      };
    case t.SET_USER_IN_JOB_POSTING_FLOW:
      return {
        ...state,
        isUserInJobPostingFlow: action.payload,
      };
    case t.RESET_JOBPOST_REDUCER:
      return {
        ...state,
        activeStep: 1,
        jobTitle: "",
        jobDescTemplate: [],
        jobDescTitles: [],
        refNumber: "",
        typeOfEmployment: "",
        SIALicense: [],
        radio: "",
        contract: "",
        venueType: "",
        venueTypeOtherValue: "",
        is_immediate: "",
        shift_schedule: "",
        shift_timing: "",
        editor: "",
        willReportToSpecificAddress: "",
        WillNotReportToCity: "",
        selectedLocationFromGoogle: false,
        WillNotReportToPostCode: "",
        showGoogleMapForGoogle: false,
        showGoogleMapForLoqate: false,
        centerForMapGoogle: {
          lat: 51.5072178,
          lng: -0.1275862,
        },
        centerForMapLoqate: {
          lat: 51.5072178,
          lng: -0.1275862,
        },
        willReportToWorkPostCode: "",
        willReportToWorkCity: "",
        willReportToWorkaddress1: "",
        willReportToWorkaddress2: "",
        loqateResponeforText: [],
        loqateResponeforId: "",
        willReportToWorkShowHide: true,
        salaryType: "Fixed Rate",
        salaryValue: "",
        salaryRangeMin: "",
        salaryRangeMax: "",
        salaryValuePerUnit: "",
        salaryWorkHourPerWeek: "",
        salaryBenefits: [],
        settingsEmail: "",
        show_discard_modal_for_job_post: false,
        discard_link_for_modal: "#",
        showJobPostPreview: false,
        availableConnects: null,
        paymentIntent: null,
        clientSecret: null,
        jobPrice: null,
        jobPriceVAT: null,
        draftLatestJobId: null,
        isUserInJobPostingFlow: false,
        isAvailableForTeam: 0,
        saveJobAsTemplate: false,
        updateJobTemplate: false,
        templateId: 0,
        jobTemplate: { name: "", error: false, errorMessage: "", ownerId: 0 },
        fromJobTemplate: false,
        billingPlan: [],
        jobPostingLimitEnd: false,
        is_job_draft: false,
        fetchJobs: false,
        available_boost_credits: null,
        websiteLink: "",
      };
    case t.SET_AVAILABLE_FOR_TEAM:
      return {
        ...state,
        isAvailableForTeam: action.payload,
      };
    case t.SET_SAVE_JOB_AS_TEMPLATE:
      return {
        ...state,
        saveJobAsTemplate: action.payload,
      };
    case t.SET_UPDATE_JOB_TEMPLATE:
      return {
        ...state,
        updateJobTemplate: action.payload,
      };
    case t.SET_TEMPLATE_ID_FOR_JOB_UPDATE:
      return {
        ...state,
        templateId: action.payload,
      };
    case t.SET_TEMPLATE_NAME:
      return {
        ...state,
        jobTemplate: action.payload,
      };
    case t.SET_FROM_JOB_TEMPLATE:
      return {
        ...state,
        fromJobTemplate: action.payload,
      };
    case t.SET_BILLING_PLAN:
      return {
        ...state,
        billingPlan: action.payload,
      };
    case t.SET_JOB_POSTING_LIMIT_END:
      return {
        ...state,
        jobPostingLimitEnd: action.payload,
      };
    case t.SET_JOB_DRAFT:
      return {
        ...state,
        is_job_draft: action.payload,
      };
    case t.FETCH_JOBS:
      return {
        ...state,
        fetchJobs: action.payload,
      };
    case t.SET_AVAILABLE_BOOST_COUNT:
      return {
        ...state,
        available_boost_credits: action.payload,
      };
    case t.WEBSITE_LINK:
      return {
        ...state,
        websiteLink: action.payload,
      };
    default:
      return state;
  }
};

export default jobPostReducer;
