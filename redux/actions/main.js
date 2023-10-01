import * as t from "../types";
import { Toast } from "reactstrap";
import { method } from "lodash";

export const updateIsNavbarOpenAction =
  (is_navbar_open) => async (dispatch) => {
    dispatch({
      type: t.SET_IS_NAVBAR_OPEN,
      payload: is_navbar_open,
    });
    return true;
  };

export const updateIsModelOpenAction = (model_open) => async (dispatch) => {
  dispatch({
    type: t.SET_IS_MODEL_OPEN,
    payload: model_open,
  });
  return true;
};
export const updateIsModelLinkAction = (model_link) => async (dispatch) => {
  dispatch({
    type: t.SET_IS_MODEL_LINK,
    payload: model_link,
  });
  return true;
};

export const setScreenToBeShownOnLogin = (screen) => {
  return {
    type: t.SET_SCREEN_TO_BE_SHOWN_ON_LOGIN,
    payload: screen,
  };
};

export const setIsUserAccountVerified = (status) => {
  return {
    type: t.SET_IS_USER_ACCOUNT_VERIFIED,
    payload: status,
  };
};
export const setInvalidPasscode = (status) => {
  return {
    type: t.SET_INVALID_PASSCODE,
    payload: status,
  };
};
// export const setShowModal = (status) => {
//     return ({
//         type: t.SET_SHOW_CONGRATULATION_MODAL,
//         payload: status
//     })
// }
// export const setHasCongratulated = (status) => {
//     return ({
//         type: t.SET_HAS_CONGRATULATED,
//         payload: status
//     })
// }

// all courses
export const getCoursesData = () => async (dispatch) => {
  let courses_data = "";
  const courses = await fetch(
    "https://staging.get-licensed.co.uk/api/protect/courses"
  )
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then(function (response) {
      courses_data = response.data;
      // history.push("/enquiry");
    })
    .catch(function (error) {
      // toast.error(error.message);
    });
  dispatch({
    type: t.GET_COURSES,
    payload: courses_data,
  });
};

// export const userSignUp = ({ name, age, email, password }) => async dispatch => {
//     try {
//         dispatch({
//             type: t.LOADING,
//             payload: true
//         })
//         const apiResponse = await axios.post(process.env.API_ADDRESS+`/api/auth/register`, {name, age, email, password});

//         if(apiResponse.data.success){
//             localStorage.setItem("user_info", JSON.stringify(apiResponse.data.user))
//             dispatch({
//                 type: t.REGISTER,
//                 payload: apiResponse.data.user
//             })
//         }

//     }catch(error){
//         dispatch({
//             type: t.LOADING,
//             payload: false
//         })
//         dispatch({
//             type: t.ERROR,
//             payload: error.response.data.error
//         })
//     }
// }

export const getAllCourses = () => async (dispatch) => {
  let data = null;
  await fetch(`${process.env.API_URL}employer/training_quotation/courses`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then(function (result) {
      data = result.data;
    })
    .catch(function (error) {
      // Toast.error(error.message)
    });

  return data;
};

export const getLocation = (course_id) => async (dispatch) => {
  let data = null;
  await fetch(
    `${process.env.API_URL}employer/training_quotation/locations/${course_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then(function (result) {
      data = result.data;
    })
    .catch(function (error) {
      // Toast.error(error.message)
    });

  return data;
};

export const quotationSubmit = (dataObj) => async (dispatch) => {
  let data = null;
  await fetch(`${process.env.API_URL}employer/training_quotation/calculate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ ...dataObj }),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then(function (result) {
      data = result.data;
    })
    .catch(function (error) {
      // Toast.error(error.message)
    });

  return data;
};

export const employerVideos = () => async (dispatch) => {
  let data = null;
  await fetch(`${process.env.GUARD_PASS_URL}api/public/employers/videos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then((result) => {
      data = result.data;
    })
    .catch((error) => {
      console.error(
        "Something went wrong in endpoint /public/employers/videos"
      );
    });

  return data;
};

export const getTrustpilotTotalCount = () => async (dispatch) => {
  let data = null;
  await fetch(
    `${process.env.GUARD_PASS_URL}api/public/employers/trustpilot/reviews/count`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then((result) => {
      data = result.data;
    })
    .catch((error) => {
      console.error(
        "Something went wrong in endpoint /public/employers/trustpilot/reviews/count"
      );
    });

  return data;
};

// const maxSpeed = [
//     { car: 300, order: 6 },
//     { bike: 60, order: 2},
//     { motorbike: 200, order: 3},
//     { airplane: 1000, order: 1},
//     { helicopter: 400, order: 5},
//     { rocket: 8 * 60 * 60, order: 4}

// ];

// let wqw = maxSpeed.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0))
