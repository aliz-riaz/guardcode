import router from "next/router";
import { toast } from "react-toastify";
import * as t from "../types";
// import { toast } from 'react-toastify';
// import { bindActionCreators } from "redux";

// **************** Email Exist Function ****************
export const checkEmailExist =
  (userToken, email, organisation_id) => async (dispatch) => {
    let data = null;
    await fetch(process.env.API_URL + "organisation/employer/exists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + userToken,
      },
      body: JSON.stringify({
        email: email,
        organisation_id: organisation_id,
      }),
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
      .catch(function (error) {
        toast.error("Something went wrong, Try Again!");
      });
    return data;
  };

// **************** Send Invite ****************
export const sendInvite = (userToken, obj) => async (dispatch) => {
  let data = null;
  await fetch(process.env.API_URL + "organisation/invite/employer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + userToken,
    },
    body: JSON.stringify({ ...obj }),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then((result) => {
      data = result;
    })
    .catch(function (error) {
      toast.error("Something went wrong, Try Again!");
    });
  return data;
};

// **************** Fetch All Members Function ****************
export const fetchAllMembers = (userToken, currentPage) => async (dispatch) => {
  let data = null;
  await fetch(
    process.env.API_URL + "organisation/invited/members?page=" + currentPage,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + userToken,
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
    .catch(function (error) {
      toast.error("Something went wrong, Try Again!");
    });
  return data;
};

// **************** Update Members Function ****************
export const updateMember = (userToken, obj, id) => async (dispatch) => {
  let data = null;
  await fetch(process.env.API_URL + "organisation/invitation/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + userToken,
    },
    body: JSON.stringify({ ...obj }),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then((result) => {
      data = result;
    })
    .catch(function (error) {
      toast.error("Something went wrong, Try Again!");
    });
  return data;
};

// **************** Update Members Function ****************
export const deleteMember = (userToken, id) => async (dispatch) => {
  let data = null;
  await fetch(process.env.API_URL + "organisation/invitation/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + userToken,
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
      data = result;
      toast.success("Team member deleted successfull");
    })
    .catch(function (error) {
      toast.error("Something went wrong, Try Again!");
    });
  return data;
};

// **************** Resend Invites Function ****************
export const resendInvite = (userToken, id) => async (dispatch) => {
  let data = null;
  await fetch(process.env.API_URL + "organisation/resend/" + id + "/invite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + userToken,
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
      data = result;
    })
    .catch(function (error) {
      toast.error("Something went wrong, Try Again!");
    });
  return data;
};
