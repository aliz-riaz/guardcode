import * as t from "../types";

const defaultState = {
  courses: [],
  courses_pagination_links: [],
  upcomming_courses: [],
  upcomming_courses_pagination_links: [],
  dashborad_past_courses: [],
  dashborad_upcoming_courses: [],

  last_page_no_of_booking_filter_pg2: 0,

  past_courses_currentpage: 1,
  past_courses_searchFilterField: "name",
  past_courses_searchFilterOrder: "ASC",
  past_courses_searchFieldValue: "",
  past_courses_selectedCourses: [],
  past_records_last_page_number: 1,

  upcoming_courses_currentpage: 1,
  upcoming_courses_searchFilterField: "name",
  upcoming_courses_searchFilterOrder: "ASC",
  upcoming_courses_searchFieldValue: "",
  upcoming_courses_selectedCourses: [],
  upcoming_records_last_page_number: 1,

  search_courses: [],
  search_courses_pagination_links: [],
  search_postcode: null,
};

const coursesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case t.SET_LAST_PAGE_NO_OF_BOOKING_FILTER_PG2:
      return {
        ...state,
        last_page_no_of_booking_filter_pg2: action.payload,
      };
    case t.SET_UPCOMING_CURRENT_PAGE:
      return {
        ...state,
        upcoming_courses_currentpage: action.payload,
      };
    case t.SET_PAST_CURRENT_PAGE:
      return {
        ...state,
        past_courses_currentpage: action.payload,
      };
    case t.SET_UPCOMING_RECORDS_LAST_PAGE:
      return {
        ...state,
        upcoming_records_last_page_number: action.payload,
      };
    case t.SET_PAST_RECORDS_LAST_PAGE:
      return {
        ...state,
        past_records_last_page_number: action.payload,
      };
    case t.SET_DASHBOARD_PAST_COURSES:
      return {
        ...state,
        dashborad_past_courses: action.payload,
      };
    case t.SET_DASHBOARD_UPCOMING_COURSES:
      return {
        ...state,
        dashborad_upcoming_courses: action.payload,
      };
    case t.SET_UPCOMING_SELECTED_COURSES:
      return {
        ...state,
        upcoming_courses_selectedCourses: action.payload,
      };
    case t.SET_PAST_SELECTED_COURSES:
      return {
        ...state,
        past_courses_selectedCourses: action.payload,
      };
    case t.SET_PAST_COURSES_STATE:
      return {
        ...state,
        past_courses_currentpage: action.payload.past_courses_currentpage,
        past_courses_searchFilterField:
          action.payload.past_courses_searchFilterField,
        past_courses_searchFilterOrder:
          action.payload.past_courses_searchFilterOrder,
        past_courses_searchFieldValue:
          action.payload.past_courses_searchFieldValue,
      };
    case t.SET_UPCOMING_COURSES_STATE:
      return {
        ...state,
        upcoming_courses_currentpage:
          action.payload.upcoming_courses_currentpage,
        upcoming_courses_searchFilterField:
          action.payload.upcoming_courses_searchFilterField,
        upcoming_courses_searchFilterOrder:
          action.payload.upcoming_courses_searchFilterOrder,
        upcoming_courses_searchFieldValue:
          action.payload.upcoming_courses_searchFieldValue,
      };
    case t.GET_COURSES:
      return {
        ...state,
        courses: state.courses,
      };
    case t.SET_COURSES:
      return {
        ...state,
        courses: action.payload,
      };

    case t.GET_COURSES_PAGINATION_LINKS:
      return {
        ...state,
        courses_pagination_links: state.courses,
      };
    case t.SET_COURSES_PAGINATION_LINKS:
      return {
        ...state,
        courses_pagination_links: action.payload,
      };
    case t.SET_UPCOMING_COURSES:
      return {
        ...state,
        upcomming_courses: action.payload,
      };
    case t.SET_UPCOMING_COURSES_PAGINATION_LINKS:
      return {
        ...state,
        upcomming_courses_pagination_links: action.payload,
      };
    case t.SET_SEARCH_COURSES:
      return {
        ...state,
        search_courses: action.payload,
      };
    case t.SET_SEARCH_COURSES_PAGINATION_LINKS:
      return {
        ...state,
        search_courses_pagination_links: action.payload,
      };
    case t.SET_SEARCH_POSTCODE:
      return {
        ...state,
        search_postcode: action.payload,
      };
    case t.RESER_COURSE_REDUCER:
      return {
        ...state,
        courses: [],
        courses_pagination_links: [],
        upcomming_courses: [],
        upcomming_courses_pagination_links: [],
        dashborad_past_courses: [],
        dashborad_upcoming_courses: [],

        last_page_no_of_booking_filter_pg2: 0,

        past_courses_currentpage: 1,
        past_courses_searchFilterField: "name",
        past_courses_searchFilterOrder: "ASC",
        past_courses_searchFieldValue: "",
        past_courses_selectedCourses: [],
        past_records_last_page_number: 1,

        upcoming_courses_currentpage: 1,
        upcoming_courses_searchFilterField: "name",
        upcoming_courses_searchFilterOrder: "ASC",
        upcoming_courses_searchFieldValue: "",
        upcoming_courses_selectedCourses: [],
        upcoming_records_last_page_number: 1,

        search_courses: [],
        search_courses_pagination_links: [],
        search_postcode: null,
      };

    default:
      return state;
  }
};

export default coursesReducer;
