import { toast } from "react-toastify";
import * as t from "../types";
var _ = require("lodash");

export const setLicenseTypeForCVSearchFilter = (license) => {
  return {
    type: t.SET_LICENSE_TYPE,
    payload: license,
  };
};

export const setLocaitonForCVSearchFilter = (location) => {
  return {
    type: t.SET_LOCATION,
    payload: location,
  };
};

export const setDistanceForCVSearchFilter = (distance) => {
  return {
    type: t.SET_DISTANCE,
    payload: distance,
  };
};

export const setVideoOnlyCheckForCVSearchFilter = (status) => {
  return {
    type: t.SET_VIDEO_ONLY_CHECK,
    payload: status,
  };
};

export const setShowCVSearchProfileStatus = (status) => {
  return {
    type: t.SET_SHOW_CV_SEARCH_PROFILE,
    payload: status,
  };
};

export const setSwpProfileId = (id) => {
  return {
    type: t.SET_SWP_PROFILE_ID,
    payload: id,
  };
};

export const setLatitudeForCVSearch = (lat) => {
  return {
    type: t.SET_LATITUDE_FOR_CV_SEARCH,
    payload: lat,
  };
};

export const setLongitudeForCVSearch = (lng) => {
  return {
    type: t.SET_LONGITUDE_FOR_CV_SEARCH,
    payload: lng,
  };
};
export const setSelectedLocaitonFromGoogleCVSearch = (status) => {
  return {
    type: t.SET_SELECTED_LOCATION_FROM_GOOGLE_CV_SEARCH,
    payload: status,
  };
};
export const setCVSearchViews = (status) => {
  return {
    type: t.SET_CV_SEARCH_VIEWS,
    payload: status,
  };
};

export const setIsSWPProfileLoading = (status) => {
  return {
    type: t.SET_IS_SWP_PROFILE_LOADING,
    payload: status,
  };
};

export const setCVSearchViewsTotal = (count) => {
  return {
    type: t.SET_CV_SEARCH_VIEWS_TOTAL,
    payload: count,
  };
};

// get user's cv search results based on filters
export const getCVSearchResultsAgainstSearch =
  (userToken, currentPage, filtersData) => async (dispatch) => {
    let request_status = false;
    let data = null;
    await fetch(
      `${process.env.API_URL}employer/cv/search?page=${currentPage}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + userToken,
        },
        body: JSON.stringify(filtersData),
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
          "Something went wrong in endpoint employer/cv/search?page=${currentPage}"
        );
        toast.error("Something Went Wrong! Try Again");
      });
    return { data: data, request_status: request_status };
  };

// get user's cv search results based on filters
// export const getCVSearchViewsCount = (userToken) => async dispatch => {
//   let request_status = false;
//   // let data = null;
//   await fetch(
//         `${process.env.API_URL}employer/cv/views/count`,
//         {
//           method: "GET",
//           headers: {
//               "Content-Type": "application/json",
//               "Accept": "application/json",
//               "Authorization": "Bearer " + userToken
//             },
//         }
//       )
//       .then(function (response) {
//         if (!response.ok) {
//           throw Error(response.statusText);
//        } else {
//           return response.json();
//        }
//       })
//       .then(function (result) {
//              dispatch({
//                 type: t.SET_CV_SEARCH_VIEWS,
//                 payload: result.data.count,
//             });
//             // data = result.data
//             request_status = true;
//       })
//       .catch(function (error) {
//           console.error("Something went wrong in endpoint employer/cv/views/count")
//           toast.error("Something Went Wrong! Try Again");
//       });
//   return request_status;
// }

// fetch user's profile against cv-search
export const fetchUserSWPProfileAgainstCVSearch =
  (userToken, jobSeekerId) => async (dispatch) => {
    let request_status = false;
    let data = null;
    const courses = await fetch(
      `${process.env.API_URL}employer/cv/search/swp/${jobSeekerId}`,
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
          "Something went wrong in endpoint employer/cv/search/swp/${userID}"
        );
        toast.error("Something Went Wrong! Try Again");
      });
    return { data: data, request_status: request_status };
  };

// get user's cv search status
export const getUsersCVSearchRequestStatus =
  (userToken) => async (dispatch) => {
    let request_status = false;
    let data = null;
    await fetch(`${process.env.API_URL}employer/cv/search/request/status`, {
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
          "Something went wrong in endpoint employer/cv/search/request/status"
        );
        toast.error("Something Went Wrong! Try Again");
      });
    return { data: data, request_status: request_status };
  };

// Invite Job in CV Search
export const inviteJobsInCvSearch =
  (userToken, jobseekerId, jobIds) => async (dispatch) => {
    let request_status = false;
    let data = null;
    await fetch(`${process.env.API_URL}job/invite/bulk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + userToken,
      },
      body: JSON.stringify({
        jobseeker_id: jobseekerId,
        job_id: jobIds,
      }),
    })
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(function (result) {
        toast.success("Job(s) invite has been sent");
        request_status = true;
      })
      .catch(function (error) {
        console.error("Something went wrong in endpoint /job/invite/bulk");
        toast.error("Something Went Wrong! Try Again");
      });
    return request_status;
  };

// Check avaliable views before opening swp profile
export const checkAvaliableViews =
  (userToken, jobSeekerId) => async (dispatch) => {
    let request_status = false;
    let data = null;
    await fetch(`${process.env.API_URL}employer/cv/views/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + userToken,
      },
      body: JSON.stringify({
        jobseeker_id: jobSeekerId,
      }),
    })
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(function (result) {
        // alert('Job invited')
        data = result.data;
        request_status = true;
      })
      .catch(function (error) {
        console.error(
          "Something went wrong in endpoint employer/cv/views/check"
        );
        toast.error("Something Went Wrong! Try Again");
      });
    return { data: data, request_status: request_status };
  };

// Request access for cv search
export const requestCVSearchAccess = (userToken) => async (dispatch) => {
  let request_status = false;
  let data = null;
  await fetch(`${process.env.API_URL}employer/cv/search/request`, {
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
      // alert('Job invited')
      data = result.data;
      request_status = true;
    })
    .catch(function (error) {
      console.error(
        "Something went wrong in endpoint employer/cv/search/request"
      );
      toast.error("Something Went Wrong! Try Again");
    });
  return { data: data, request_status: request_status };
};
