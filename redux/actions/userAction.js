import * as t from "../types";
import { toast } from "react-toastify";

export const setUserId = (userId) => {
  return {
    type: t.SET_USER_ID,
    payload: userId,
  };
};

export const setOrganisationName = (organisationName) => {
  return {
    type: t.SET_USER_NAME,
    payload: organisationName,
  };
};

export const setDecisionMakerFirstName = (firstName) => {
  return {
    type: t.SET_DECISION_MAKER_FIRST_NAME,
    payload: firstName,
  };
};

export const setDecisionMakerLastName = (lastName) => {
  return {
    type: t.SET_DECISION_MAKER_LAST_NAME,
    payload: lastName,
  };
};

export const setUserEmail = (userEmail) => {
  return {
    type: t.SET_USER_EMAIL,
    payload: userEmail,
  };
};

export const setUserMobileNumber = (userMobileNumber) => {
  return {
    type: t.SET_USER_MOBILE_NUMBER,
    payload: userMobileNumber,
  };
};

export const setIsDiscountEnabled = (discountEnabled) => {
  return {
    type: t.SET_IS_DISCOUNT_ENABLED,
    payload: discountEnabled,
  };
};

export const setIsDiscountOnCourseBooking = (discount) => {
  return {
    type: t.SET_DISCOUNT_ON_COURSE_BOOKING,
    payload: discount,
  };
};

export const setNoOfSeatsToAvailDiscount = (availDiscount) => {
  return {
    type: t.SET_NO_OF_BOOKINGS_TO_AVAIL_DISCOUNT,
    payload: availDiscount,
  };
};

export const setIsBankTransferAvaliable = (status) => {
  return {
    type: t.SET_IS_BANK_TRANSFER_AVALIBLE,
    payload: status,
  };
};

export const setIsNewsModalDisabled = (status) => {
  return {
    type: t.SET_IS_NEWS_MODAL_DISABLED,
    payload: status,
  };
};

export const setUserAddressOne = (addressOne) => {
  return {
    type: t.SET_ADDRESS1,
    payload: addressOne,
  };
};
export const setUserAddressTwo = (addressTwo) => {
  return {
    type: t.SET_ADDRESS2,
    payload: addressTwo,
  };
};

export const setUserCity = (city) => {
  return {
    type: t.SET_CITY,
    payload: city,
  };
};

export const setUserPostCode = (postCode) => {
  return {
    type: t.SET_USER_POSTCODE,
    payload: postCode,
  };
};

export const setGlobalIsRequestLoader = (status) => {
  return {
    type: t.SET_IS_REQUEST_LOADER,
    payload: status,
  };
};

export const setIsOnboardingFeedbackDone = (status) => {
  return {
    type: t.SET_IS_ONBOARDING_FEEDBACK_DONE,
    payload: status,
  };
};
export const setIsOnboardingTourDone = (status) => {
  return {
    type: t.SET_IS_ONBOARDING_TOUR_DONE,
    payload: status,
  };
};
export const setIsOnboardingFeedbackModal = (status) => {
  return {
    type: t.SET_IS_ONBOARDING_FEEDBACK_MODAL,
    payload: status,
  };
};
export const setIsOnboardingTourModal = (status) => {
  return {
    type: t.SET_IS_ONBOARDING_TOUR_MODAL,
    payload: status,
  };
};

export const getUserInfoAction = (token, pageNumber) => async (dispatch) => {
  let request_status = false;
  // dispatch({
  //   type: t.SET_IS_REQUEST_LOADER,
  //   payload: true
  // })
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
      process.env.API_URL + "auth/profile" + "?token=" + token,
      requestOptions
    )
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
            type: t.SET_USER_ID,
            payload: result.data.id,
          });
          dispatch({
            type: t.SET_USER_NAME,
            payload: result.data.name,
          });
          dispatch({
            type: t.SET_DECISION_MAKER_FIRST_NAME,
            payload: result.data.decision_maker_first_name,
          });
          dispatch({
            type: t.SET_DECISION_MAKER_LAST_NAME,
            payload: result.data.decision_maker_last_name,
          });
          dispatch({
            type: t.SET_USER_EMAIL,
            payload: result.data.email,
          });
          dispatch({
            type: t.SET_USER_MOBILE_NUMBER,
            payload: result.data.mobile_number,
          });
          dispatch({
            type: t.SET_IS_DISCOUNT_ENABLED,
            payload: result.data.is_discount_enabled,
          });
          dispatch({
            type: t.SET_DISCOUNT_ON_COURSE_BOOKING,
            payload: result.data.discount,
          });
          dispatch({
            type: t.SET_NO_OF_BOOKINGS_TO_AVAIL_DISCOUNT,
            payload: result.data.bookings_to_avail_discount,
          });
          dispatch({
            type: t.SET_IS_BANK_TRANSFER_AVALIBLE,
            payload: result.data.is_bank_transfer_enabled,
          });
          dispatch({
            type: t.SET_IS_NEWS_MODAL_DISABLED,
            payload: result.data.is_news_modal_disabled,
          });
          if (result.data.address1) {
            dispatch({
              type: t.SET_ADDRESS1,
              payload: result.data.address1,
            });
          }
          if (result.data.address2) {
            dispatch({
              type: t.SET_ADDRESS2,
              payload: result.data.address2,
            });
          }
          if (result.data.city) {
            dispatch({
              type: t.SET_CITY,
              payload: result.data.city,
            });
          }
          if (result.data.postcode) {
            dispatch({
              type: t.SET_USER_POSTCODE,
              payload: result.data.postcode,
            });
          }
          request_status = true;
        }
      })
      .catch(function (error) {
        toast.error(error);
      });
  } catch (error) {}
  // dispatch({
  //   type: t.SET_IS_REQUEST_LOADER,
  //   payload: false
  // })
  if (request_status) return true;
  else return false;
};

export const UpdateUserInfoForBookingFlow = (token) => async (dispatch) => {
  let request_status = false;
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
    process.env.API_URL + "auth/profile" + "?token=" + token,
    requestOptions
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      if (result.error) {
        if (error != "Authorization Token not found") toast.error(result.error);
      } else {
        // toast.success(result.message);
        dispatch({
          type: t.SET_IS_DISCOUNT_ENABLED,
          payload: result.data.is_discount_enabled,
        });
        dispatch({
          type: t.SET_DISCOUNT_ON_COURSE_BOOKING,
          payload: result.data.discount,
        });
        dispatch({
          type: t.SET_NO_OF_BOOKINGS_TO_AVAIL_DISCOUNT,
          payload: result.data.bookings_to_avail_discount,
        });
        dispatch({
          type: t.SET_IS_BANK_TRANSFER_AVALIBLE,
          payload: result.data.is_bank_transfer_enabled,
        });
        request_status = true;
      }
    })
    .catch(function (error) {
      toast.error(error);
    });
  // dispatch({
  //   type: t.SET_IS_REQUEST_LOADER,
  //   payload: false
  // })
  if (request_status) return true;
  else return false;
};

export const UpdateNewsModalState = (token) => async (dispatch) => {
  let request_status = false;
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  };
  const courses = await fetch(
    process.env.API_URL + "employer/news/seen" + "?token=" + token,
    requestOptions
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      if (result.error) {
        if (error != "Authorization Token not found") toast.error(result.error);
      } else {
        dispatch({
          type: t.SET_IS_NEWS_MODAL_DISABLED,
          payload: 1,
        });
        request_status = true;
      }
    })
    .catch(function (error) {
      toast.error(error);
    });
};

export const setIsCVSearchAvaliable = (status) => {
  return {
    type: t.SET_IS_CV_SEARCH_AVALIBLE,
    payload: status,
  };
};

// get user's configuration for account
export const getUsersAccountConfiguration = (userToken) => async (dispatch) => {
  let request_status = false;
  let data = null;
  await fetch(`${process.env.API_URL}employer/additional_features`, {
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
      // dispatch({
      //   type: t.SET_IS_CV_SEARCH_AVALIBLE,
      //   payload: result.data.is_cv_search_allowed == 1 ? true : false
      // })
      request_status = true;
    })
    .catch(function (error) {
      console.error(
        "Something went wrong in endpoint employer/additional_features/"
      );
      toast.error("Something Went Wrong! Try Again");
    });
  return { data: data, request_status: request_status };
};

// send user's onboarding feedback
export const sendUserOnboardingFeedback =
  (userToken, formData) => async (dispatch) => {
    let request_status = false;
    let data = null;
    await fetch(`${process.env.API_URL}employer/onboarding/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + userToken,
      },
      body: JSON.stringify(formData),
    })
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(function (result) {
        data = result;
        request_status = true;
      })
      .catch(function (error) {
        console.error(
          "Something went wrong in endpoint /employer/onboarding/feedback"
        );
        toast.error("Something Went Wrong! Try Again");
      });
    return { data: data, request_status: request_status };
  };
