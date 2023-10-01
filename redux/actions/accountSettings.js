import router from "next/router";
import { toast } from "react-toastify";
import * as t from "../types";
// import { toast } from 'react-toastify';
// import { bindActionCreators } from "redux";

export const setShowToShowInSettings = (screenToShwo) => {
  return {
    type: t.SET_SCREEN_TO_SHOW_IN_SETTINGS,
    payload: screenToShwo,
  };
};
// **************** fetch Claim Status ****************
export const getClaimStatus = (userToken) => async (dispatch) => {
  let data = null;
  await fetch(process.env.API_URL + "employer/claim/status", {
    method: "GET",
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
      data = result.data;
    })
    .catch(function (error) {
      toast.error("Something went wrong, Try Again!");
    });
  return data;
};

// **************** fetch Company Info ****************

export const getCompanyInfo = (userToken) => async (dispatch) => {
  let data = null;
  await fetch(process.env.API_URL + "employer/setting", {
    method: "GET",
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
      data = result.data;
    })
    .catch(function (error) {
      toast.error("Something went wrong, Try Again!");
    });
  return data;
};

// **************** fetch Company Info ****************

export const getCoverage = (userToken) => async (dispatch) => {
  let data = null;
  await fetch(`${process.env.API_URL}employer/service/coverage`, {
    method: "GET",
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
      data = result.data;
    })
    .catch(function (error) {
      toast.error("Something went wrong, Try Again!");
    });
  return data;
};

// **************** fetch All Services ****************

export const getServices = (userToken) => async (dispatch) => {
  let data = null;
  await fetch(process.env.API_URL + "employer/services", {
    method: "GET",
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
      data = result.data;
    })
    .catch(function (error) {
      toast.error("Something went wrong while fetching services");
    });
  return data;
};

// **************** fetch All Accredition ****************

export const getAccredition = (userToken) => async (dispatch) => {
  let data = null;
  await fetch(process.env.API_URL + "employer/accreditation", {
    method: "GET",
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
      data = result.data;
    })
    .catch(function (error) {
      toast.error("Something went wrong while fetching services");
    });
  return data;
};

// **************** fetch All Benefits ****************

export const getBenefits = (userToken) => async (dispatch) => {
  let data = null;
  await fetch(process.env.API_URL + "employer/benefits", {
    method: "GET",
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
      data = result.data;
    })
    .catch(function (error) {
      toast.error("Something went wrong while fetching services");
    });
  return data;
};

// **************** update company's info ****************

export const updateCompanyDetailPageInfo =
  (user_token, data) => async (dispatch) => {
    let request_status = false;

    await fetch(process.env.API_URL + "employer/setting/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + user_token,
      },
      body: JSON.stringify({ ...data }),
    })
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(function (result) {
        toast.success("Company info updated successfully.");
        request_status = true;
      })
      .catch(function (error) {
        toast.error("Something Went Wrong, Please try again!");
      });

    if (request_status) return true;
    else return false;
  };

// **************** user's suggestions for loqate ****************
export const getLoqateSuggestionsByText =
  (text, Container = "") =>
  async (dispatch) => {
    let request_status = false;
    let return_data = "";
    // dispatch({
    //   type: t.SET_IS_REQUEST_LOADER,
    //   payload: true,
    // });
    // try {
    const requestOptions = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const courses = await fetch(
      "https://api.addressy.com/Capture/Interactive/Find/v1.10/json3.ws?Key=" +
        process.env.LOQATE_KEY +
        "&Text=" +
        text +
        "&IsMiddleware=True&Countries=GB&Limit=10&Filters=Thoroughfare:Street" +
        "&Container=" +
        Container,
      requestOptions
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        // dispatch({
        //   type: t.SET_LOQATE_RESPONSE_FOR_TEXT,
        //   payload: result.Items,
        // });
        // toast.success(result.message);
        // dispatch({
        //   type: t.SET_PCA_RESPONSE,
        //   payload: result.Items,
        // });
        request_status = true;
        return_data = { code: text, data: result.Items };
      })
      .catch(function (error) {
        toast.error(error);
      });
    // } catch (error) {
    // }
    // dispatch({
    //   type: t.SET_IS_REQUEST_LOADER,
    //   payload: false,
    // });
    if (request_status) return return_data;
    else return false;
  };

export const getLoqateSuggestionById =
  (text, signup = false) =>
  async (dispatch) => {
    let request_status = false;
    let return_data = "";
    // dispatch({
    //   type: t.SET_IS_REQUEST_LOADER,
    //   payload: true,
    // });
    try {
      const requestOptions = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const courses = await fetch(
        "https://api.addressy.com/Capture/Interactive/Retrieve/v1.20/json3.ws?Key=" +
          process.env.LOQATE_KEY +
          "&id=" +
          text,
        requestOptions
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          return_data = result;
          // dispatch({
          //   type: t.SET_LOQATE_RESPONSE_FOR_ID,
          //   payload: result.Items,
          // });
          // if(signup) {
          //   dispatch({
          //     type: t.SET_COMPANY_ADDRESS_ONE_FOR_SIGNUP,
          //     payload: result?.Items[0]?.Line1 + ' ' +result?.Items[0]?.Line2,
          //   });
          //   dispatch({
          //     type: t.SET_COMPANY_ADDRESS_TWO_FOR_SIGNUP,
          //     payload: result?.Items[0]?.Line3 ?? "",
          //   });
          //   dispatch({
          //     type: t.SET_COMPANY_CITY_FOR_SIGNUP,
          //     payload: result?.Items[0]?.City,
          //   });
          //   dispatch({
          //     type: t.SET_COMPANY_POST_FOR_SIGNUP,
          //     payload: result?.Items[0]?.PostalCode,
          //   });

          // }

          //   dispatch({
          //     type: t.SET_WILL_REPORT_TO_WORK_POST_CODE,
          //     payload: result.Items[0].PostalCode,
          //   });
          // toast.success(result.message);
          // dispatch({
          //   type: t.SET_PCA_RESPONSE,
          //   payload: result.Items,
          // });
          request_status = true;
        })
        .catch(function (error) {
          toast.error(error);
        });
    } catch (error) {}
    // dispatch({
    //   type: t.SET_IS_REQUEST_LOADER,
    //   payload: false,
    // });
    return return_data;
  };

export const updateAccountSettingInfo =
  (user_token, data) => async (dispatch) => {
    let request_status = false;

    await fetch(process.env.API_URL + "organisation/setting/update", {
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
        toast.success("Account setting info updated successfully.");
        // request_status = result;
      })
      .catch(function (error) {
        toast.error("Something Went Wrong, Please try again!");
      });

    return request_status;
    // if (request_status) return true;
    // else return false;
  };
