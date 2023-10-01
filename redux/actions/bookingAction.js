import * as t from "../types";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";

export const setShouldComponentShakeOnPageOne =
  (payload) => async (dispatch) => {
    dispatch({
      type: t.SET_COMPONENT_SHAKE_ON_PAGE_ONE,
      payload: payload,
    });
    return true;
  };

export const updateBookingActiveStepAction =
  (step_number) => async (dispatch) => {
    dispatch({
      type: t.SET_BOOKING_ACTIVE_STEP,
      payload: step_number,
    });
    return true;
  };

export const resetBookingReducerAction = () => async (dispatch) => {
  dispatch({
    type: t.RESET_BOOKING_REDUCER,
    payload: "",
  });
  return true;
};

export const updatePostCodeValueAction = (postcode) => async (dispatch) => {
  dispatch({
    type: t.SET_POSTCODE,
    payload: postcode,
  });
  return true;
};

export const updateSelectedCourseIdAction = (course_id) => async (dispatch) => {
  dispatch({
    type: t.SET_SELECTED_COURSE_ID,
    payload: course_id,
  });
  return true;
};

export const updateSelectedCourseNameAction =
  (course_name) => async (dispatch) => {
    dispatch({
      type: t.SET_SELECTED_LOCATION_OBJECT,
      payload: {},
    });
    dispatch({
      type: t.SET_LOCATION_ID,
      payload: 0,
    });
    dispatch({
      type: t.SET_SELECTED_COURSE_NAME,
      payload: course_name,
    });
    return true;
  };

export const updateNumberOfSeatsAction =
  (number_of_seats) => async (dispatch) => {
    dispatch({
      type: t.SET_NUMBER_OF_SEATS,
      payload: number_of_seats,
    });
    return true;
  };

export const updateSelectedLocationObjectAction =
  (location_object) => async (dispatch) => {
    dispatch({
      type: t.SET_SELECTED_LOCATION_OBJECT,
      payload: location_object,
    });
    return true;
  };

export const updateLocationIdAction = (location_id) => async (dispatch) => {
  dispatch({
    type: t.SET_LOCATION_ID,
    payload: location_id,
  });
  return true;
};

export const updateLocationNameAction = (location_name) => async (dispatch) => {
  dispatch({
    type: t.SET_LOCATION_NAME,
    payload: location_name,
  });
  return true;
};

export const updateAttendeesAction = (attendees) => async (dispatch) => {
  dispatch({
    type: t.SET_ATTENDEES,
    payload: attendees,
  });
  return true;
};

export const updateAttendeesShowErrorAction = (status) => async (dispatch) => {
  dispatch({
    type: t.SET_ATTENDEES_SHOW_ERROR,
    payload: status,
  });
  return true;
};

export const setNoOfSeatsError = (status) => async (dispatch) => {
  dispatch({
    type: t.SET_NO_OF_SEATS_ERROR,
    payload: status,
  });
  return true;
};

export const setScreenToBeLoadedOnStep5CheckOut =
  (step) => async (dispatch) => {
    dispatch({
      type: t.SET_SCREEB_TO_BE_LOADED_ON_STEP5_CHECKOUT,
      payload: step,
    });
    return true;
  };
export const setDidUserPlacedTheOrder = (value) => async (dispatch) => {
  dispatch({
    type: t.SET_DID_USER_PLACED_THE_ORDER,
    payload: value,
  });
  return true;
};

export const setStep5RadioBtnValue = (value) => async (dispatch) => {
  dispatch({
    type: t.SET_STEP5_RADIO_BTN_VALUE,
    payload: value,
  });
  return true;
};
export const setStep5CheckBoxBtnValue = (value) => async (dispatch) => {
  dispatch({
    type: t.SET_STEP5_CHECKBOX_BTN_VALUE,
    payload: value,
  });
  return true;
};

export const setSubTotalForPayment = (subTotal) => async (dispatch) => {
  dispatch({
    type: t.SET_SUB_TOTAL_FOR_PAYMENT,
    payload: subTotal,
  });
  return true;
};
export const setUnlimitedRetakesTotalForPayment =
  (retakesTotal) => async (dispatch) => {
    dispatch({
      type: t.SET_UNLIMITTED_RETAKES_TOTAL_FOR_PAYMENT,
      payload: retakesTotal,
    });
    return true;
  };
export const setEFAWTotalForPayment = (efawTotal) => async (dispatch) => {
  dispatch({
    type: t.SET_EFAW_TOTAL_FOR_PAYMENT,
    payload: efawTotal,
  });
  return true;
};
export const setDiscountForPayment = (discount) => async (dispatch) => {
  dispatch({
    type: t.SET_DISCOUNT_FOR_PAYMENT,
    payload: discount,
  });
  return true;
};
export const setTotalBillForPayment = (totalBill) => async (dispatch) => {
  dispatch({
    type: t.SET_TOTAL_BILL_TOTAL_FOR_PAYMENT,
    payload: totalBill,
  });
  return true;
};

export const setNoOfBookingsForFirstAidForPayment =
  (noOffirstAids) => async (dispatch) => {
    dispatch({
      type: t.SET_NO_OF_BOOKINGS_FOR_FIRST_AID_FOR_PAYMENT,
      payload: noOffirstAids,
    });
    return true;
  };
export const setNoOfBookingsForUnlimitedRetakesForPayment =
  (noOfUnlimitedRetakes) => async (dispatch) => {
    dispatch({
      type: t.SET_NO_OF_BOOKINGS_FOR_UNLIMITED_RETAKES_FOR_PAYMENT,
      payload: noOfUnlimitedRetakes,
    });
    return true;
  };
export const setShouldSliderOnStepOneShake = (status) => async (dispatch) => {
  dispatch({
    type: t.SET_SHOULD_SLIDER_SHAKE_ON_STEP_ONE,
    payload: status,
  });
  return true;
};
export const setUserPONumber = (poNumber) => async (dispatch) => {
  dispatch({
    type: t.SET_USER_PO_NUMBER,
    payload: poNumber,
  });
  return true;
};

export const getPcaFindDataAction =
  (text, Container = "") =>
  async (dispatch) => {
    let request_status = false;
    let return_data = "";
    dispatch({
      type: t.SET_IS_REQUEST_LOADER,
      payload: true,
    });
    try {
      const requestOptions = {
        method: "get",
        headers: {
          // Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          // 'Authorization': 'Bearer '+token,
        },
        // body: JSON.stringify({
        //   success_url: process.env.APP_URL + "/booking/step-thanks",
        //   cancel_url: process.env.APP_URL + "/booking/step-cancel",
        // }),
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
    } catch (error) {}
    dispatch({
      type: t.SET_IS_REQUEST_LOADER,
      payload: false,
    });
    if (request_status) return return_data;
    else return false;
  };

export const getPcaRetriveDataAction = (text) => async (dispatch) => {
  let request_status = false;
  let return_data = "";
  dispatch({
    type: t.SET_IS_REQUEST_LOADER,
    payload: true,
  });
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
        // toast.success(result.message);
        // dispatch({
        //   type: t.SET_PCA_RESPONSE,
        //   payload: result.Items,
        // });
        request_status = true;
        return_data = result.Items;
      })
      .catch(function (error) {
        toast.error(error);
      });
  } catch (error) {}
  dispatch({
    type: t.SET_IS_REQUEST_LOADER,
    payload: false,
  });
  if (request_status) return return_data;
  else return false;
};

export const createSessionIdAction = () => async (dispatch) => {
  let request_status = false;
  let return_data = "";
  dispatch({
    type: t.SET_IS_REQUEST_LOADER,
    payload: true,
  });
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        // 'Authorization': 'Bearer '+token,
      },
      body: JSON.stringify({
        success_url: process.env.APP_URL + "/booking/step-thanks",
        cancel_url: process.env.APP_URL + "/booking/step-cancel",
      }),
    };
    const courses = await fetch(
      "https://staging.get-licensed.co.uk/protect/api/vantage/create/checkout/sessions/id",
      requestOptions
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        if (result.status == 402) {
          toast.error(result.error);
        } else {
          toast.success(result.message);
          dispatch({
            type: t.SET_SESSION_ID,
            payload: result.session_id,
          });
          dispatch({
            type: t.SET_PAYMENT_INTENT_ID,
            payload: result.payment_intent_id,
          });
          request_status = true;
          return_data = result.session_id;
        }
      })
      .catch(function (error) {
        toast.error(error);
      });
  } catch (error) {}
  dispatch({
    type: t.SET_IS_REQUEST_LOADER,
    payload: false,
  });
  if (request_status) return return_data;
  else return false;
};
const sentEmailWhileCreatingMultipleBookings = async (
  token,
  reference_no,
  po_number
) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      reference_no: reference_no,
      po_number: po_number,
    }),
  };
  const courses = await fetch(
    process.env.API_URL + "booking/purchase-order/mail ",
    requestOptions
  )
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then(function (result) {});
};
export const createMultipleBookingAction =
  (
    payment_method,
    employer_id,
    event_id,
    payment_intent_id,
    trainees,
    stripe_cancel_link,
    token,
    po_number
  ) =>
  async (dispatch) => {
    let request_status = false;
    let return_data = "";

    dispatch({
      type: t.SET_IS_REQUEST_LOADER,
      payload: true,
    });
    // try {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        // 'Authorization': 'Bearer '+token,
      },
      body: JSON.stringify({
        employer_id: employer_id,
        event_id: event_id,
        // payment_intent_id: payment_intent_id,
        trainees: trainees,
        success_url: process.env.APP_URL + "/booking/step-thanks",
        cancel_url:
          stripe_cancel_link == 0
            ? process.env.APP_URL + "/booking/step-4"
            : process.env.APP_URL + "/booking/step-5-checkout",
        payment_method: payment_method,
      }),
    };
    const courses = await fetch(
      process.env.API_TRAINING_HUB_URL + "bookings/create_multiple",
      requestOptions
    )
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(function (result) {
        // dispatch({
        //   type: t.SET_SCREEB_TO_BE_LOADED_ON_STEP5_CHECKOUT,
        //   payload: 1
        // })
        if (result.status == 400) {
          // result.type = 1 = out_of_seats
          // result.type = 2 = invalid_data
          if (result.error_type == 1) {
            return_data = { data: "booking/step-2", type: 1 };
            request_status = false;
            throw Error(response.statusText);
          } else if (result.error_type == 2) {
            return_data = { data: result.message, type: 2 };
            request_status = false;
            throw Error(response.statusText);
          }
        } else {
          // toast.success(result.message);
          // dispatch({
          //   type: t.SET_SESSION_ID,
          //   payload: result.session_id
          // })
          dispatch({
            type: t.SET_BOOKING_REF_NO,
            payload: result.data.ref_no,
          });
          dispatch({
            type: t.SET_CLIENT_SECRET_FOR_BOOKING,
            payload: result.data.payment_client_secret,
          });
          if (payment_method == 2) {
            dispatch({
              type: t.SET_DID_USER_PLACED_THE_ORDER,
              payload: true,
            });
            dispatch({
              type: t.SET_BOOKING_ACTIVE_STEP,
              payload: 5,
            });
            sentEmailWhileCreatingMultipleBookings(
              token,
              result.data.ref_no,
              po_number
            );
            toast.success("Your seats have been provisionally booked.", {
              autoClose: false,
            });
          }

          request_status = true;
          return_data = result.data.session_id;
        }
      })
      .catch(function (error) {
        toast.error("Something went wrong, Please try again!", {
          autoClose: false,
        });
      });
    // }
    // catch(error){
    // }
    dispatch({
      type: t.SET_IS_REQUEST_LOADER,
      payload: false,
    });
    if (request_status) return return_data;
    else return false;
  };

export const downloadBankPO =
  (token, reference_no, po_number) => async (dispatch) => {
    let request_status = false;
    let return_data = "";

    dispatch({
      type: t.SET_IS_REQUEST_LOADER,
      payload: true,
    });
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        reference_no: reference_no,
        po_number: po_number,
      }),
    };
    const courses = await fetch(
      process.env.API_URL + "booking/bank-pdf",
      requestOptions
    )
      .then((res) => res.blob())
      .then((blob) => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "gl-purchase-order.pdf";
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();
        a.remove();
      })
      .catch(function (error) {
        toast.error("Something went wrong, Try Again!");
      });
    dispatch({
      type: t.SET_IS_REQUEST_LOADER,
      payload: false,
    });
    if (request_status) return return_data;
    else return false;
  };

export const emailPoToGivenEmail =
  (token, reference_no, email_address, po_number) => async (dispatch) => {
    let request_status = false;
    let return_data = "";

    // dispatch({
    //   type: t.SET_IS_REQUEST_LOADER,
    //   payload: true
    // })
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        reference_no: reference_no,
        po_number: po_number,
        email_address: email_address,
      }),
    };
    const courses = await fetch(
      process.env.API_URL + "booking/purchase-order/mail ",
      requestOptions
    )
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(function (result) {
        toast.success(
          `The PO has been sent to the entered email: ${email_address}`
        );
        request_status = true;
      })
      .catch(function (error) {
        toast.error("Something went wrong, Please try again!");
      });
    // dispatch({
    //   type: t.SET_IS_REQUEST_LOADER,
    //   payload: false
    // })
    if (request_status) return return_data;
    else return false;
  };
