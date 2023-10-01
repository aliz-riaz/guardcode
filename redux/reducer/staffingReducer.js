import * as t from "../types";

const defaultState = {
  screenToShowOnStaffing: "jobs",
  jobsPostedByUser: [],
  filterForJobList: "",
  dateOrderForJobList: "DESC",
  searchKeywordForJobList: "",
  paginationForJobList: [],
  currentPageForJobList: 1,
  totalPagesForJobList: 1,
  jobToBeShownInApplicantsTab: {},
  jobApplicants: [],
  jobApplicantsShimmer: false,
  jobHeaderData: {},
  inviteApplicants: [],
  didUserClickedAJob: false,
  latestJobId: null,
  paginationForApplicantList: [],
  currentPageForApplicantList: 1,
  totalPagesForApplicantList: 1,
  filterForApplicantsList: "all",
  dateOrderForApplicantsList: "DESC",
  searchKeywordForApplicantsList: "",
  swpProfileToBeShown: {},
  swpProfileShimmer: false,
  swpProfileIndex: 0,
  swpProfileWindowToBeShown: false,
  activeStepForCloseJobDiscard: 1,
  radioForCloseJobDiscard: "",
  checkBoxListForCloseJobDiscard: [],
  yesScreenQuestionsForClosJobDiscard: [],
  noScreenQuestionsForClosJobDiscard: [],
  selectJobForCloseJobDiscard: null,
  selectedJobNameForCloseJobDiscard: null,
  jobDescriptionData: {},
  clickedSWPProfileStatus: "",
  notesForSWPProfile: "",
  selectedListForFeedBack: [],
  lastJobConnects: null,
  nextCandidateStatus: false,
  clickedJobId: null,
};

const staffingReducer = (state = defaultState, action) => {
  switch (action.type) {
    case t.SET_SCREEN_TO_SHOW_ON_STAFFING:
      return {
        ...state,
        screenToShowOnStaffing: action.payload,
      };
    case t.SET_JOBS_POSTED_BY_USER:
      return {
        ...state,
        jobsPostedByUser: action.payload,
      };
    case t.SET_FILTER_FOR_JOB_LIST:
      return {
        ...state,
        filterForJobList: action.payload,
      };
    case t.SET_DATE_ORDER_FOR_JOB_LIST:
      return {
        ...state,
        dateOrderForJobList: action.payload,
      };
    case t.SET_SEARCH_KEYWORD_FOR_JOB_LIST:
      return {
        ...state,
        searchKeywordForJobList: action.payload,
      };
    case t.SET_PAGINATION_FOR_JOB_LIST:
      return {
        ...state,
        paginationForJobList: action.payload,
      };
    case t.SET_CURRENT_PAGE_FOR_JOB_LIST:
      return {
        ...state,
        currentPageForJobList: action.payload,
      };
    case t.SET_TOTAL_PAGES_FOR_JOB_LIST:
      return {
        ...state,
        totalPagesForJobList: action.payload,
      };

    case t.SET_SWP_PROFILE_WINDOW_STATUS:
      return {
        ...state,
        swpProfileWindowToBeShown: action.payload,
      };
    case t.SET_JOB_TO_BE_SHOWN_IN_APPLICANT_TAB:
      return {
        ...state,
        jobToBeShownInApplicantsTab: action.payload,
      };

    case t.SET_SELECTED_JOB_APPLICANTS:
      return {
        ...state,
        jobApplicants: action.payload,
      };
    case t.SET_SELECTED_JOB_APPLICANTS_SHIMMER:
      return {
        ...state,
        jobApplicantsShimmer: action.payload,
      };
    case t.SET_DID_USER_CLICKED_A_JOB:
      return {
        ...state,
        didUserClickedAJob: action.payload,
      };
    case t.SET_LATEST_JOB_ID:
      return {
        ...state,
        latestJobId: action.payload,
      };
    case t.SET_PAGINATION_FOR_APPLICANT_LIST:
      return {
        ...state,
        paginationForApplicantList: action.payload,
      };
    case t.SET_CURRENT_PAGE_FOR_APPLICANT_LIST:
      return {
        ...state,
        currentPageForApplicantList: action.payload,
      };
    case t.SET_TOTAL_PAGES_FOR_APPLICANT_LIST:
      return {
        ...state,
        totalPagesForApplicantList: action.payload,
      };
    case t.SET_FILTER_FOR_APPLICANT_LIST:
      return {
        ...state,
        filterForApplicantsList: action.payload,
      };
    case t.SET_DATE_ORDER_FOR_APPLICANT_LIST:
      return {
        ...state,
        dateOrderForApplicantsList: action.payload,
      };
    case t.SET_SEARCH_KEYWORD_FOR_APPLICANT_LIST:
      return {
        ...state,
        searchKeywordForApplicantsList: action.payload,
      };
    case t.SET_SWP_PROFILE_TO_BE_SHOWN:
      return {
        ...state,
        swpProfileToBeShown: action.payload,
      };
    case t.SET_SWP_PROFILE_SHIMMER:
      return {
        ...state,
        swpProfileShimmer: action.payload,
      };
    case t.SET_ACTIVE_STEP_FOR_CLOSE_JOB_DISCARD:
      return {
        ...state,
        activeStepForCloseJobDiscard: action.payload,
      };
    case t.SET_RADIO_FOR_JOB_DISCARD:
      return {
        ...state,
        radioForCloseJobDiscard: action.payload,
      };
    case t.SET_CHECKBOX_LIST_FOR_CLOSE_JOB_DISCARD:
      return {
        ...state,
        checkBoxListForCloseJobDiscard: action.payload,
      };
    case t.SET_YES_SCREEN_QUESTION_FOR_CLOSE_JOB_DISCARD:
      return {
        ...state,
        yesScreenQuestionsForClosJobDiscard: action.payload,
      };
    case t.SET_NO_SCREEN_QUESTION_FOR_CLOSE_JOB_DISCARD:
      return {
        ...state,
        noScreenQuestionsForClosJobDiscard: action.payload,
      };
    case t.SET_SELECTED_JOB_ID_FOR_CLOSE_JOB_DISCARD:
      return {
        ...state,
        selectJobForCloseJobDiscard: action.payload,
      };
    case t.SET_SELECTED_JOB_NAME_FOR_CLOSE_JOB_DISCARD:
      return {
        ...state,
        selectedJobNameForCloseJobDiscard: action.payload,
      };
    case t.SET_JOB_DESCRIPTION_DATA:
      return {
        ...state,
        jobDescriptionData: action.payload,
      };
    case t.SET_CLICKED_SWP_PROFILE_STATUS:
      return {
        ...state,
        clickedSWPProfileStatus: action.payload,
      };
    case t.SET_SWP_PROFILE_NOTES:
      return {
        ...state,
        notesForSWPProfile: action.payload,
      };
    case t.SET_SWP_PROFILE_INDEX:
      return {
        ...state,
        swpProfileIndex: action.payload,
      };
    case t.SET_INVITE_APPLICANTS:
      return {
        ...state,
        inviteApplicants: action.payload,
      };
    case t.SET_JOB_HEADER_STATS:
      return {
        ...state,
        jobHeaderData: action.payload,
      };
    case t.SET_APPLICANT_IN_STATE_FOR_FEEDBACK:
      return {
        ...state,
        selectedListForFeedBack: action.payload,
      };
    case t.SET_LAST_JOB_CONNECT:
      return {
        ...state,
        lastJobConnects: action.payload,
      };
    case t.SET_NEXT_CANDIDATE_STATUS:
      return {
        ...state,
        nextCandidateStatus: action.payload,
      };
    case t.SET_CLICKED_JOB_ID_FOR_EDIT:
      return {
        ...state,
        clickedJobId: action.payload,
      };
    case t.RESET_STAFFING_REDUCER:
      return {
        ...state,
        screenToShowOnStaffing: "jobs",
        jobsPostedByUser: [],
        filterForJobList: "",
        dateOrderForJobList: "DESC",
        searchKeywordForJobList: "",
        paginationForJobList: [],
        currentPageForJobList: 1,
        totalPagesForJobList: 1,
        jobToBeShownInApplicantsTab: {},
        jobApplicants: [],
        jobApplicantsShimmer: false,
        jobHeaderData: {},
        inviteApplicants: [],
        didUserClickedAJob: false,
        latestJobId: null,
        paginationForApplicantList: [],
        currentPageForApplicantList: 1,
        totalPagesForApplicantList: 1,
        filterForApplicantsList: "all",
        dateOrderForApplicantsList: "DESC",
        searchKeywordForApplicantsList: "",
        swpProfileToBeShown: {},
        swpProfileShimmer: false,
        swpProfileIndex: 0,
        swpProfileWindowToBeShown: false,
        activeStepForCloseJobDiscard: 1,
        radioForCloseJobDiscard: "",
        checkBoxListForCloseJobDiscard: [],
        yesScreenQuestionsForClosJobDiscard: [],
        noScreenQuestionsForClosJobDiscard: [],
        selectJobForCloseJobDiscard: null,
        selectedJobNameForCloseJobDiscard: null,
        jobDescriptionData: {},
        clickedSWPProfileStatus: "",
        selectedListForFeedBack: [],
        notesForSWPProfile: "",
        lastJobConnects: null,
        nextCandidateStatus: false,
        clickedJobId: null,
      };
    default:
      return state;
  }
};

export default staffingReducer;
