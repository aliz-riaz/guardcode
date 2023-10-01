import router from "next/router";
import { toast } from "react-toastify";
import * as t from "../types";
var _ = require("lodash");

export const setNotificaitonsToastList = (notificaitonsList) => {
  return {
    type: t.SET_NOTIFICATION_TOAST_LIST,
    payload: notificaitonsList,
  };
};

// fetch user's profile against user-id
// export const fetchUserSWPProfile = (userToken, userID) => async dispatch => {
//   let request_status = false;
//   let data = null;
//      const courses = await fetch(
//         `${process.env.API_URL}employer/jobseeker/${userID}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json",
//             "Authorization" : "Bearer " + userToken
//           },
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
//             data = result.data
//             request_status = true;
//       })
//       .catch(function (error) {
//           toast.error("Something Went Wrong! Try Again");
//       });
//   return {data: data, request_status: request_status};
// }
