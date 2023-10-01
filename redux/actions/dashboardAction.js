import router from "next/router";
import { toast } from "react-toastify";
import * as t from "../types";
// import { toast } from 'react-toastify';
// import { bindActionCreators } from "redux";

// export const setChatBookingsSeletedTeamMembers = (members) => {
//   return ({
//     type: t.SET_ORGANISATION_FILTER,
//     path: 'chat.seletedTeamMembers',
//     payload: members,
//   })
// }

// Ftech all News and Updates
export const getNewsAndUpdates = (userToken) => async (dispatch) => {
  let request_status = false;
  let data = null;
  await fetch(`${process.env.API_URL}employer/dashboard/blogs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + userToken,
    },
  })
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then(function (result) {
      data = result.data;
      request_status = true;
    })
    .catch(function (error) {
      console.error(
        "Something went wrong in endpoint /employer/dashboard/blogs"
      );
      toast.error("Something Went Wrong! Try Again");
    });
  return { data: data, request_status: request_status };
};
// Ftech all News and Updates
export const getRecentCVviewed =
  (userToken, accountOwner) => async (dispatch) => {
    let request_status = false;
    let data = null;
    await fetch(
      `${process.env.API_URL}employer/dashboard/cvs_searched?is_account_owner=${accountOwner}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + userToken,
        },
      }
    )
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(function (result) {
        data = result.data;
        request_status = true;
      })
      .catch(function (error) {
        console.error(
          "Something went wrong in endpoint /employer/dashboard/cvs_searched"
        );
        toast.error("Something Went Wrong! Try Again");
      });
    return { data: data, request_status: request_status };
  };

// Ftech all News and Updates
export const getStaffingStats =
  (userToken, accountOwner, access) => async (dispatch) => {
    let request_status = false;
    let data = null;
    await fetch(
      `${process.env.API_URL}employer/dashboard/staffing?is_account_owner=${accountOwner}&staffing_access=${access}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + userToken,
        },
      }
    )
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(function (result) {
        data = result.data;
        request_status = true;
      })
      .catch(function (error) {
        console.error(
          "Something went wrong in endpoint /employer/dashboard/staffing"
        );
        toast.error("Something Went Wrong! Try Again");
      });
    return { data: data, request_status: request_status };
  };

// Ftech Training Stats
export const getTrainingStats =
  (userToken, startDate, endDate, accountOwner, access) => async (dispatch) => {
    let request_status = false;
    let data = null;
    await fetch(
      `${process.env.API_URL}employer/dashboard/training?start_date=${startDate}&end_date=${endDate}&is_account_owner=${accountOwner}&training_access=${access}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + userToken,
        },
        //body: JSON.stringify({q: statsFilter})
      }
    )
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(function (result) {
        data = result.data;
        request_status = true;
      })
      .catch(function (error) {
        console.error(
          "Something went wrong in endpoint /employer/dashboard/training"
        );
        toast.error("Something Went Wrong! Try Again");
      });
    return { data: data, request_status: request_status };
  };

// Get CV Search Stats
export const getCVSearchStats = (userToken) => async (dispatch) => {
  let request_status = false;
  let data = null;
  await fetch(`${process.env.API_URL}employer/dashboard/cv`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + userToken,
    },
  })
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then(function (result) {
      data = result.data;
      request_status = true;
    })
    .catch(function (error) {
      console.error("Something went wrong in endpoint /employer/dashboard/cv");
      toast.error("Something Went Wrong! Try Again");
    });
  return { data: data, request_status: request_status };
};

// Get Applicant Awaiting
export const applicantAwaiting =
  (userToken, accountOwner, access) => async (dispatch) => {
    let request_status = false;
    let data = null;
    await fetch(
      `${process.env.API_URL}employer/dashboard/awaiting_applicants?is_account_owner=${accountOwner}&staffing_access=${access}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + userToken,
        },
      }
    )
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(function (result) {
        data = result.data;
        request_status = true;
      })
      .catch(function (error) {
        console.error(
          "Something went wrong in endpoint /employer/dashboard/awaiting_applicants"
        );
        toast.error("Something Went Wrong! Try Again");
      });
    return { data: data, request_status: request_status };
  };

// Get Upcoming Courses
export const getUpcomingCourses =
  (userToken, members, listType) => async (dispatch) => {
    let request_status = false;
    let data = null;
    await fetch(
      `${process.env.API_URL}booking/upcoming'+'?limit=5&token='+${userToken}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ member_ids: members, list_type: listType }),
      }
    )
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(function (result) {
        data = result.data;
        request_status = true;
      })
      .catch(function (error) {
        console.error(
          "Something went wrong in endpoint /employer/dashboard/awaiting_applicants"
        );
        toast.error("Something Went Wrong! Try Again");
      });
    return { data: data, request_status: request_status };
  };
