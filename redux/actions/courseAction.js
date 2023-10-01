import * as t from "../types";
import { toast } from "react-toastify";
var _ = require("lodash");

export const setUpcomingCurrentPage = (current_page) => {
  return {
    type: t.SET_UPCOMING_CURRENT_PAGE,
    payload: current_page,
  };
};

export const setPastCurrentPage = (current_page) => {
  return {
    type: t.SET_PAST_CURRENT_PAGE,
    payload: current_page,
  };
};

export const setDashboardUpcomingCourses =
  (token, members, listType) => async (dispatch) => {
    let request_status = false;
    dispatch({
      type: t.SET_IS_REQUEST_LOADER,
      payload: true,
    });
    let dataObj = {
      ...(members?.length > 0 && { member_ids: members }),
    };
    try {
      let requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...dataObj, list_type: listType }),
      };
      let url =
        process.env.API_URL + "booking/upcoming" + "?limit=5&token=" + token;
      const courses = await fetch(url, requestOptions)
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          if (result.error) {
            if (error != "Authorization Token not found")
              toast.error(result.error);
          } else {
            // toast.success(result.message);
            dispatch({
              type: t.SET_DASHBOARD_UPCOMING_COURSES,
              payload: result.data.data,
            });
            request_status = true;
          }
        })
        .catch(function (error) {
          toast.error(error);
        });
    } catch (error) {}
    dispatch({
      type: t.SET_IS_REQUEST_LOADER,
      payload: false,
    });
    if (request_status) return true;
    else return false;
  };

export const setDashboardPastCourses =
  (token, members, listType) => async (dispatch) => {
    let request_status = false;
    dispatch({
      type: t.SET_IS_REQUEST_LOADER,
      payload: true,
    });
    let dataObj = {
      ...(members?.length > 0 && { member_ids: members }),
    };
    try {
      let requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...dataObj, list_type: listType }),
      };
      let url =
        process.env.API_URL + "booking/past" + "?limit=5&token=" + token;
      const courses = await fetch(url, requestOptions)
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          if (result.error) {
            if (error != "Authorization Token not found")
              toast.error(result.error);
          } else {
            // toast.success(result.message);
            dispatch({
              type: t.SET_DASHBOARD_PAST_COURSES,
              payload: result.data.data,
            });
            request_status = true;
          }
        })
        .catch(function (error) {
          toast.error(error);
        });
    } catch (error) {}
    dispatch({
      type: t.SET_IS_REQUEST_LOADER,
      payload: false,
    });
    if (request_status) return true;
    else return false;
  };

export const setPastSelectedCourses = (past_selected_courses) => {
  return {
    type: t.SET_PAST_SELECTED_COURSES,
    payload: past_selected_courses,
  };
};

export const setUpcomingSelectedCourses = (upcoming_selected_courses) => {
  return {
    type: t.SET_UPCOMING_SELECTED_COURSES,
    payload: upcoming_selected_courses,
  };
};

export const pastCoursesSetState = (past_courses_state) => {
  return {
    type: t.SET_PAST_COURSES_STATE,
    payload: past_courses_state,
  };
};
export const upcomingCoursesSetState = (upcoming_courses_state) => {
  return {
    type: t.SET_UPCOMING_COURSES_STATE,
    payload: upcoming_courses_state,
  };
};

export const updatePageLastNumberOnPagination = (pageNumber) => {
  return {
    type: t.SET_LAST_PAGE_NO_OF_BOOKING_FILTER_PG2,
    payload: pageNumber,
  };
};

export const updateSearchCourses = (data) => {
  return {
    type: t.SET_SEARCH_COURSES,
    payload: data,
  };
};

export const pastCourseAction =
  (
    token,
    pageNumber,
    sorting,
    searchFieldValue,
    course_ids,
    members,
    listType
  ) =>
  async (dispatch) => {
    let request_status = false;
    dispatch({
      type: t.SET_IS_REQUEST_LOADER,
      payload: true,
    });
    try {
      let requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          // 'Authorization': 'Bearer '+token,
        },
        body: JSON.stringify({
          sorting,
          course_ids: course_ids,
          list_type: listType,
          ...(members?.length > 0 && { member_ids: members }),
        }),
      };

      const url =
        process.env.API_URL +
        "booking/past" +
        "?page=" +
        pageNumber +
        "&keyword=" +
        searchFieldValue +
        "&token=" +
        token;

      const courses = await fetch(url, requestOptions)
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          if (result.error) {
            if (error != "Authorization Token not found")
              toast.error(result.error);
          } else {
            // toast.success(result.message);
            dispatch({
              type: t.SET_COURSES,
              payload: result.data.data,
            });
            dispatch({
              type: t.SET_COURSES_PAGINATION_LINKS,
              payload: result.data.links,
            });
            dispatch({
              type: t.SET_PAST_RECORDS_LAST_PAGE,
              payload: result.data.last_page,
            });
            request_status = true;
          }
        })
        .catch(function (error) {
          toast.error(error);
        });
    } catch (error) {}
    dispatch({
      type: t.SET_IS_REQUEST_LOADER,
      payload: false,
    });
    if (request_status) return true;
    else return false;
  };

export const upcomingCourseAction =
  (
    token,
    pageNumber,
    sorting,
    searchFieldValue,
    course_ids,
    members,
    listType
  ) =>
  async (dispatch) => {
    let request_status = false;
    dispatch({
      type: t.SET_IS_REQUEST_LOADER,
      payload: true,
    });
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          // 'Authorization': 'Bearer '+token,
        },
        body: JSON.stringify({
          sorting,
          course_ids: course_ids,
          list_type: listType,
          ...(members?.length > 0 && { member_ids: members }),
        }),
      };
      // requestOptions.body = JSON.stringify({ sorting, course_ids: course_ids });
      let url =
        process.env.API_URL +
        "booking/upcoming" +
        "?page=" +
        pageNumber +
        "&keyword=" +
        searchFieldValue +
        "&token=" +
        token;

      const courses = await fetch(url, requestOptions)
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          if (result.error) {
            if (error != "Authorization Token not found")
              toast.error(result.error);
          } else {
            // toast.success(result.message);
            dispatch({
              type: t.SET_UPCOMING_COURSES,
              payload: result.data.data,
            });
            dispatch({
              type: t.SET_UPCOMING_COURSES_PAGINATION_LINKS,
              payload: result.data.links,
            });
            dispatch({
              type: t.SET_UPCOMING_RECORDS_LAST_PAGE,
              payload: result.data.last_page,
            });
            request_status = true;
          }
        })
        .catch(function (error) {
          toast.error(error);
        });
    } catch (error) {}
    dispatch({
      type: t.SET_IS_REQUEST_LOADER,
      payload: false,
    });
    if (request_status) return true;
    else return false;
  };

export const searchCourseAction =
  (course_id, postcode, pageNumber, noOfSeats) => async (dispatch) => {
    let request_status = false;
    dispatch({
      type: t.SET_IS_REQUEST_LOADER,
      payload: true,
    });
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          // 'Authorization': 'Bearer '+token,
        },
        // body: JSON.stringify({ email: email_perameter , password: password_perameter }),
      };
      const courses = await fetch(
        process.env.API_TRAINING_HUB_URL +
          "courses/" +
          course_id +
          "/venues?with_paginate=true&course_id=" +
          course_id +
          "&view=venue_event_list&has_events=true&event_status=open&event_start_date_after=today&distance_range=100&postal_code=" +
          postcode +
          "&page=" +
          pageNumber +
          "&no_of_seats=" +
          noOfSeats,
        requestOptions
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          if (result.error) {
            toast.error(result.error);
          } else {
            // toast.success(result.message);

            dispatch({
              type: t.SET_VIRTUAL_EVENT,
              payload: result.data.course.virtual_events,
            });
            dispatch({
              type: t.SET_SEARCH_COURSES,
              payload: result.data.course,
            });
            dispatch({
              type: t.SET_SEARCH_COURSES_PAGINATION_LINKS,
              payload: result.data.course.course_venues.meta.links,
            });
            dispatch({
              type: t.SET_LAST_PAGE_NO_OF_BOOKING_FILTER_PG2,
              payload: result.data.course.course_venues.meta.last_page,
            });

            request_status = true;
          }
        })
        .catch(function (error) {
          toast.error(error);
        });
    } catch (error) {}
    dispatch({
      type: t.SET_IS_REQUEST_LOADER,
      payload: false,
    });
    if (request_status) return true;
    else return false;
  };
