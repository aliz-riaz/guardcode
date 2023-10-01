import router from "next/router";
import { toast } from "react-toastify";
import * as t from "../types";
// import { toast } from 'react-toastify';
// import { bindActionCreators } from "redux";

export const fetchJobTitleSuggestions = (id) => async (dispatch) => {
  let data = null;
  await fetch(
    `${process.env.GUARD_PASS_URL}api/public/job/title/suggestions?alpha_order=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // "Authorization" : "Bearer " + userToken
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
    })
    .catch(function (error) {
      toast.error("Something Went Wrong! Try Agian");
    });
  return data;
};

export const fetchMoreTitles = () => async (dispatch) => {
  let data = null;
  await fetch(`${process.env.GUARD_PASS_URL}api/public/job/title/similar`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // "Authorization" : "Bearer " + userToken
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
    })
    .catch(function (error) {
      toast.error("Something Went Wrong! Try Agian");
    });
  return data;
};

export const DownloadJobDescription = (id, slug) => async (dispatch) => {
  let request_status = false;
  const courses = await fetch(
    `${process.env.GUARD_PASS_URL}api/public/job/description/download`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ template_id: id }),
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.blob();
      }
    })
    .then((blob) => {
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = `${slug}.pdf`;
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();
      request_status = true;
    })
    .catch(function (error) {
      toast.error("Something went wrong, Try Again!");
    });
  // dispatch({
  //     type: t.SET_IS_REQUEST_LOADER,
  //     payload: false,
  //   });
  return request_status;
};
