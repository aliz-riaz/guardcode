import * as t from "../types";
import { toast } from "react-toastify";

export const setScreenToBeShownOnQuote = (data) => async (dispatch) => {
  dispatch({
    type: t.SET_SCREEN_TO_SHOW_ON_QUOTE,
    payload: data,
  });

  if (data === "allQuotes") {
    dispatch({
      type: t.ALL_QUOTES_API_LOADING,
      payload: true,
    });
  } else if (data === "expiredQuotes") {
    dispatch({
      type: t.EXPIRED_API_LOADING,
      payload: true,
    });
  }
};

export const fetchAllQuotation = (data) => async (dispatch) => {
  await fetch(
    process.env.API_URL + `employer/quotations?expired=${data.fetchType}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + data.userToken,
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
      if (data.fetchType == 0) {
        dispatch({
          type: t.SET_ALL_QUOTES_DATA,
          payload: result.data,
        });
        dispatch({
          type: t.ALL_QUOTES_API_LOADING,
          payload: false,
        });
      } else if (data.fetchType == 1) {
        dispatch({
          type: t.SET_EXPIRED_QUOTES_DATA,
          payload: result.data,
        });
        dispatch({
          type: t.EXPIRED_API_LOADING,
          payload: false,
        });
      }
    })
    .catch(function (error) {
      toast.error("Something went wrong, Please try again!");
    });
  return true;
};

export const paginationQuote = (data) => async (dispatch) => {
  await fetch(
    process.env.API_URL +
      `employer/quotations?expired=${data.isExpire}&page=${data.pageNumber}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + data.userToken,
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
      if (data.fetchType === "allQuotes") {
        dispatch({
          type: t.SET_ALL_QUOTES_DATA,
          payload: result.data,
        });
        dispatch({
          type: t.ALL_QUOTES_API_LOADING,
          payload: false,
        });
      } else if (data.fetchType === "expiredQuotes") {
        dispatch({
          type: t.SET_EXPIRED_QUOTES_DATA,
          payload: result.data,
        });
        dispatch({
          type: t.EXPIRED_API_LOADING,
          payload: false,
        });
      }
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    })
    .catch(function (error) {
      toast.error("Something went wrong, Please try again!");
    });
  return true;
};

export const resetState = () => (dispatch) => {
  dispatch({
    type: t.RESET_STATE,
    payload: "",
  });
};

export const markQuoteViewed = (data) => async (dispatch) => {
  const requestData = {
    quotation_id: data.quotation_id,
  };

  const res = await fetch(
    process.env.API_URL + `employer/quotation/status/update`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + data.user_token,
      },
      body: JSON.stringify({ ...requestData }),
    }
  )
    .then((response) => {
      if (!response.ok) {
        response.json().then((errorData) => {
          toast.error("An error occured", {
            autoClose: true,
          });
        });
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then((result) => {});
  return true;
};

// export const setPaginationLoading = (data) => async dispatch => {
//     if(data.type === "allQuote"){
//         dispatch({
//             type: t.ALL_QUOTES_API_LOADING,
//             payload: true
//         })
//     }else if(data.type === "expiredQuote"){
//         dispatch({
//             type: t.EXPIRED_API_LOADING,
//             payload: true
//         })
//     }
// }
