import router from "next/router";
import { toast } from "react-toastify";
import * as t from "../types";
// import { toast } from 'react-toastify';
// import { bindActionCreators } from "redux";

export const resetBillingReducer = () => {
  return {
    type: t.RESET_BILLING_REDUCER,
  };
};

export const setShowBillingModal = (status) => {
  return {
    type: t.SET_SHOW_BILLING_MODAL,
    payload: status,
  };
};

export const setCurrentBillingModalStep = (step) => {
  return {
    type: t.SET_CURRENT_BILLING_MODAL_STEP,
    payload: step,
  };
};

export const setPlanIntervalSwitchValue = (status) => {
  return {
    type: t.SET_PLAN_INTERVAL_SWITCH_VALUE,
    payload: status,
  };
};

export const setSelectedPlan = (plan) => {
  return {
    type: t.SET_SELECTED_PLAN,
    payload: plan,
  };
};
export const setSelectedPaymentMethod = (pm) => {
  return {
    type: t.SET_SELECTED_PAYMENT_METHOD,
    payload: pm,
  };
};
export const setSelectedCardBrand = (brand) => {
  return {
    type: t.SET_SELECTED_CARD_BRAND,
    payload: brand,
  };
};
export const setSelectedCardEndingIn = (endingIn) => {
  return {
    type: t.SET_SELECTED_CARD_ENDING_IN,
    payload: endingIn,
  };
};

export const setShowChangeCardModal = (status) => {
  return {
    type: t.SET_SHOW_CHANGE_CARD_MODAL,
    payload: status,
  };
};

export const setPaymentDate = (date) => {
  return {
    type: t.SET_NEXT_PAYMENT_DATE,
    payload: date,
  };
};

export const setIsCustomPlanAvailable = (status) => {
  return {
    type: t.SET_IS_CUSTOM_PLAN_AVAILABLE,
    payload: status,
  };
};
export const setIsPaymentFailed = (status) => {
  return {
    type: t.SET_IS_PAYMENT_FAILED,
    payload: status,
  };
};

export const setShowJobPostCalculator = (status) => {
  return {
    type: t.SET_SHOW_JOB_POST_CALCULATOR,
    payload: status,
  };
};
export const setShowJobBoostCalculator = (status) => {
  return {
    type: t.SET_SHOW_JOB_BOOST_CALCULATOR,
    payload: status,
  };
};
export const setShowCVViewCalculator = (status) => {
  return {
    type: t.SET_SHOW_CV_VIEWS_CALCULATOR,
    payload: status,
  };
};

export const setSelectedJobPostCredits = (credits) => {
  return {
    type: t.SET_SELECTED_JOB_POST_CREDITS,
    payload: credits,
  };
};
export const setSelectedJobBoostCredits = (credits) => {
  return {
    type: t.SET_SELECTED_JOB_BOOST_CREDITS,
    payload: credits,
  };
};
export const setSelectedCVViewsCredits = (credits) => {
  return {
    type: t.SET_SELECTED_CV_VIEWS_CREDITS,
    payload: credits,
  };
};

export const setOrderCart = (cart) => {
  return {
    type: t.SET_ORDER_CART,
    payload: cart,
  };
};

// **************** fetch Claim Status ****************
// export const getClaimStatus = (userToken) => async dispatch => {
//   let data = null
//     await fetch(
//       process.env.API_URL+'employer/claim/status',
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json",
//           "Authorization" : "Bearer " + userToken,
//         },
//       }
//     )
//     .then( response => {
//       if (!response.ok) {
//         throw Error(response.statusText);
//     } else {
//         return response.json();
//     }
//     } )
//     .then( result => {
//       data = result.data

//     })
//     .catch(function (error) {
//         toast.error("Something went wrong, Try Again!");
//     });
//     return data
// }

export const checkJobCanPost = (userToken, jobId) => async (dispatch) => {
  let data = null;
  await fetch(process.env.API_URL + `job/${jobId}/is_boost_applicable`, {
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

export const setBuyBoostModalStatus = (value) => {
  return {
    type: t.SET_BUY_BOOST_MODAL,
    payload: value,
  };
};

export const boostJob = (user_token, data) => async (dispatch) => {
  let request_status = false;

  const courses = await fetch(
    // 'https://httpstat.us/500',
    process.env.API_URL + "job/boost",
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
      if (!response.ok) {
        throw new Error(response.status);
      } else {
        return response.json();
      }
    })
    .then(function (result) {
      if (result.data.boost_appllied == false) {
        toast.error(result.message);
      } else {
        dispatch({
          type: t.SET_BOOST_JOB_ID_FOR_BADGE,
          payload: data.job_id,
        });
        toast.success("Job boosted successfully");
      }
      request_status = true;
      // dispatch({
      //   type: t.RESET_JOBPOST_REDUCER,
      // });
    })
    .catch(function (error) {
      toast.error(`Something went wrong!!! ${error}`);
      // toast.error(
      //   "Looks like you are out of job posting limit, please update plan"
      // );
    });

  if (request_status) return true;
  else return false;
};

export const setBoostJobId = (value) => {
  return {
    type: t.SET_BOOST_JOB_ID,
    payload: value,
  };
};

export const setBoostJobIdForBadge = (value) => {
  return {
    type: t.SET_BOOST_JOB_ID_FOR_BADGE,
    payload: value,
  };
};

export const fetchMatchingCandidatesForBoost =
  (userToken, data) => async (dispatch) => {
    let request_status = false;

    const courses = await fetch(
      process.env.API_URL + "job/boost/eligibility/applicants",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + userToken,
        },
        body: JSON.stringify({ ...data }),
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
        request_status = result;
        dispatch({
          type: t.SET_BOOST_MATCHING_CANDIDATES_LIST,
          payload: result.data,
        });
      })
      .catch(function (error) {
        toast.error("Something went wrong, Try Again!");
      });
    return request_status;
  };

export const setMatchingCandidates = (value) => {
  return {
    type: t.SET_BOOST_MATCHING_CANDIDATES_LIST,
    payload: value,
  };
};

export const setBoostConfirmationModal = (value) => {
  return {
    type: t.SET_BOOST_CONFIRMATION_MODAL,
    payload: value,
  };
};

export const setJobPostModalStatus = (value) => {
  return {
    type: t.SET_JOB_POST_MODAL,
    payload: value,
  };
};

export const checkAvailableCredits = (userToken) => async (dispatch) => {
  let data = null;
  await fetch(`${process.env.API_URL}billing/v2/credits`, {
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
      //   type: t.SET_BILLING_PLAN,
      //   payload: result.data,
      // });
    });
  return data;
};

export const verifyingPayment = (value) => {
  return {
    type: t.ISPAYMENTVERIFYING,
    payload: value,
  };
};
