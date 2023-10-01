import * as t from "../types";

const defaultState = {
  inviteTeamMembers: [],
  email: "",
};

const teamAccessReducer = (state = defaultState, action) => {
  switch (action.type) {
    case t.SET_SCREEN_TO_SHOW_ON_QUOTE:
      return {
        ...state,
        screenToShowOnQuote: action.payload,
      };
    case t.SET_ALL_QUOTES_DATA:
      return {
        ...state,
        // allQuotes: [...state.allQuotes,...action.payload.data],
        allQuotes: action.payload.data,
        totalNoOfPages: action.payload.last_page,
        currentPage: action.payload.current_page,
        expiredQuotes: [],
      };
    case t.SET_EXPIRED_QUOTES_DATA:
      return {
        ...state,
        expiredQuotes: action.payload.data,
        totalNoOfPages: action.payload.last_page,
        currentPage: action.payload.current_page,
        allQuotes: [],
      };
    case t.EXPIRED_API_LOADING:
      return {
        ...state,
        expiedApiLoading: action.payload,
      };
    case t.ALL_QUOTES_API_LOADING:
      return {
        ...state,
        allQuotesApiLoading: action.payload,
      };
    case t.RESET_STATE:
      return {
        ...state,
        screenToShowOnQuote: "allQuotes",
        expiredQuotes: [],
        allQuotes: [],
        expiedApiLoading: true,
        allQuotesApiLoading: true,
        currentPage: 1,
        totalNoOfPages: 0,
      };
    default:
      return state;
  }
};

export default teamAccessReducer;
