import router from "next/router";
import { toast } from "react-toastify";
import * as t from "../types";
var _ = require("lodash");

export const setShowGlobalChatChannelList = (status) => {
  return {
    type: t.SET_SHOW_GLOBALE_CHAT_CHANNEL_LIST,
    payload: status,
  };
};

export const setGlobalChannelOne = (globalChannelOne) => {
  return {
    type: t.SET_GLOBALE_CHANNEL_ONE,
    payload: globalChannelOne,
  };
};

export const setGlobalChannelTwo = (globalChannelTWO) => {
  return {
    type: t.SET_GLOBALE_CHANNEL_TWO,
    payload: globalChannelTWO,
  };
};

export const setSelectedMessageTemplate = (selectedMessage) => {
  return {
    type: t.SET_SELECTED_MESSAGE_TEMPLATE,
    payload: selectedMessage,
  };
};

export const addMessageTemplate = (user_token, data) => async (dispatch) => {
  let request_status = false;

  await fetch(process.env.API_URL + "employer/chat/template/store", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + user_token,
    },
    body: JSON.stringify({ ...data }),
  })
    .then(function (response) {
      request_status = response;
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then(function (result) {
      dispatch({
        type: t.ADD_MESSAGE_TEMPLATE,
        payload: {
          templateId: result.data.id,
          templateTitle: data.name,
          templateMessage: data.message,
        },
      });
      toast.success("Template added successfully");
      // request_status = result;
    })
    .catch(function (error) {
      toast.error("Something Went Wrong, Please try again!");
    });
  return request_status;
};

export const getMessageTemplate = (user_token) => async (dispatch) => {
  let request_status = false;

  await fetch(process.env.API_URL + "employer/chat/template/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + user_token,
    },
  })
    .then(function (response) {
      request_status = response;
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then(function (result) {
      dispatch({
        type: t.SET_MESSAGE_TEMPLATE,
        payload: result.data,
      });
      // toast.success("Template added successfully");
      // request_status = result;
    })
    .catch(function (error) {
      toast.error("Something Went Wrong, Please try again!");
    });
  return request_status;
};

export const deleteMessageTemplate =
  (user_token, templateId) => async (dispatch) => {
    let request_status = false;

    await fetch(
      process.env.API_URL + `employer/chat/template/${templateId}/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + user_token,
        },
      }
    )
      .then(function (response) {
        request_status = response;
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(function (result) {
        dispatch({
          type: t.DELETE_MESSAGE_TEMPLATE,
          payload: templateId,
        });
        toast.success("Template deleted");
        // request_status = result;
      })
      .catch(function (error) {
        toast.error("Something Went Wrong, Please try again!");
      });
    return request_status;
  };

export const updateMessageTemplate = (user_token, data) => async (dispatch) => {
  let request_status = false;

  await fetch(
    process.env.API_URL + `employer/chat/template/${data.id}/update`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + user_token,
      },
      body: JSON.stringify({ ...data }),
    }
  )
    .then(function (response) {
      request_status = response;
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then(function (result) {
      dispatch({
        type: t.UPDATE_MESSAGE_TEMPLATE,
        payload: {
          templateId: data.id,
          templateTitle: data.name,
          templateMessage: data.message,
        },
      });
      toast.success("Template updated");
      // request_status = result;
    })
    .catch(function (error) {
      toast.error("Something Went Wrong, Please try again!");
    });
  return request_status;
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
