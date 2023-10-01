import * as t from "../types";
import { toast } from "react-toastify";
import router from "next/router";
import Cookies from "js-cookie";
// export const userSignInAction = (email_perameter, password_perameter) => async dispatch => {
//     let request_status = false;
//     dispatch({
//       type: t.SET_IS_REQUEST_LOADER,
//       payload: true
//     })
//     try {
//         // const apiResponse = await axios.post(process.env.API_URL+`auth/login`, {email, password});
//         const requestOptions = {
//             method: 'POST',
//             headers: {
//               Accept: "application/json, text/plain, */*",
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ email: email_perameter , password: password_perameter }),
//         };
//         const courses = await fetch(
//           process.env.API_URL+'auth/login',
//           requestOptions
//         )
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (result) {
//             if(result.error){
//               toast.error(result.error);
//             }else{
//               // toast.success(result.message);
//               dispatch({
//                 type: t.SET_USER_TOKEN,
//                 payload: result.access_token
//               })
//               dispatch({
//                 type: t.SET_USER_TOKEN_TYPE,
//                 payload: result.token_type
//               })
//               dispatch({
//                 type: t.SET_IS_USER_LOGIN,
//                 payload: true
//               })

//               request_status = true;
//             }
//         })
//         .catch(function (error) {
//             toast.error(error);
//         });
//     }catch(error){
//     }
//     dispatch({
//       type: t.SET_IS_REQUEST_LOADER,
//       payload: false
//     })
//     if (request_status) return true;
//     else return false;
// }

export const userEmailVerificaitonForLogin =
  (email, recaptcha, showToast = false) =>
  async (dispatch) => {
    let request_status = false;
    dispatch({
      type: t.SET_IS_REQUEST_LOADER,
      payload: true,
    });

    // let dataObj = {
    //     job_id: jobId,
    //     applicant_id: applicantId,
    //     notes: notes,
    // }

    const response = await fetch(process.env.API_URL + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        token: recaptcha,
      }),
    });
    const parsed = await response.json();
    const { status } = response;
    if (!response.ok && status === 422) {
      if (parsed?.errors?.recaptcha) {
        toast.error(<div>{parsed?.errors?.recaptcha}</div>, {
          autoClose: false,
        });
      } else {
        toast.error("Invalid Email");
      }
    } else {
      if (showToast) {
        toast.success("Code resent to email successfully", {
          position: toast.POSITION.TOP_LEFT,
        });
      }
      dispatch({
        type: t.SET_SCREEN_TO_BE_SHOWN_ON_LOGIN,
        payload: "passcode",
      });
      request_status = true;
    }
    dispatch({
      type: t.SET_IS_REQUEST_LOADER,
      payload: false,
    });
    dispatch({
      type: t.RESET_ACCOUNT_SETTINGS,
    });
    dispatch({
      type: t.RESET_ORGANISATION_REDUCER,
    });
    dispatch({
      type: t.RESET_BILLING_REDUCER,
    });
    // dispatch({
    //   type: t.RESET_STAFFING_REDUCER,
    // });
  };

export const userPassCodeVerification =
  (passcode, email) => async (dispatch) => {
    let request_status = false;
    let data = null;
    dispatch({
      type: t.SET_IS_REQUEST_LOADER,
      payload: true,
    });

    // let dataObj = {
    //     job_id: jobId,
    //     applicant_id: applicantId,
    //     notes: notes,
    // }

    await fetch(process.env.API_URL + "auth/code/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        code: passcode,
        email: email,
      }),
    })
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(function (result) {
        dispatch({
          type: t.SET_USER_TOKEN,
          payload: result.access_token,
        });
        dispatch({
          type: t.SET_USER_TOKEN_TYPE,
          payload: result.token_type,
        });
        dispatch({
          type: t.SET_IS_USER_LOGIN,
          payload: true,
        });
        dispatch({
          type: t.SET_INVALID_PASSCODE,
          payload: false,
        });

        dispatch({
          type: t.SET_USER_ID,
          payload: result.employer.id,
        });
        // dispatch({
        //   type: t.SET_USER_NAME,
        //   payload: result.employer.name
        // })

        if (result.organisations.length === 1) {
          dispatch({
            type: t.SET_ADDRESS1,
            payload: result.organisations[0].address1,
          });

          dispatch({
            type: t.SET_ADDRESS2,
            payload: result.organisations[0].address2,
          });

          dispatch({
            type: t.SET_CITY,
            payload: result.organisations[0].city,
          });

          dispatch({
            type: t.SET_USER_POSTCODE,
            payload: result.employer.postcode,
          });
        }

        dispatch({
          type: t.SET_DECISION_MAKER_FIRST_NAME,
          payload: result.employer.decision_maker_first_name,
        });
        dispatch({
          type: t.SET_DECISION_MAKER_LAST_NAME,
          payload: result.employer.decision_maker_last_name,
        });
        dispatch({
          type: t.SET_USER_EMAIL,
          payload: result.employer.email,
        });
        dispatch({
          type: t.SET_USER_MOBILE_NUMBER,
          payload: result.employer?.mobile_number,
        });

        // if (result.employer.address1) {
        //   dispatch({
        //     type: t.SET_ADDRESS1,
        //     payload: result.employer.address1,
        //   });
        // }
        // if (result.employer.address2) {
        //   dispatch({
        //     type: t.SET_ADDRESS2,
        //     payload: result.employer.address2,
        //   });
        // }
        // if (result.employer.city) {
        //   dispatch({
        //     type: t.SET_CITY,
        //     payload: result.employer.city,
        //   });
        // }
        // if (result.employer.postcode) {
        //   dispatch({
        //     type: t.SET_USER_POSTCODE,
        //     payload: result.employer.postcode,
        //   });
        // }

        data = result;
        request_status = true;
      })
      .catch(function (error) {
        // toast.error("Invalid Code");

        dispatch({
          type: t.SET_INVALID_PASSCODE,
          payload: true,
        });
      });

    dispatch({
      type: t.SET_IS_REQUEST_LOADER,
      payload: false,
    });
    return { data, request_status };
  };

export const userLogoutAction = () => async (dispatch) => {
  Cookies.remove("natprp");
  Cookies.remove("isOrgSelected");
  dispatch({
    type: t.RESET_USER_DATA_REDUCER,
    payload: "",
  });
  dispatch({
    type: t.RESET_BOOKING_REDUCER,
    payload: "",
  });
  dispatch({
    type: t.RESER_COURSE_REDUCER,
    payload: "",
  });
  dispatch({
    type: t.RESET_COMMON_REDUCER,
  });
  dispatch({
    type: t.RESET_JOBPOST_REDUCER,
  });
  dispatch({
    type: t.RESET_CHAT_REDUCER,
  });
  dispatch({
    type: t.RESET_GLOBAL_CHAT_REDUCER,
  });
  dispatch({
    type: t.RESET_CV_SEARCH_REDUCER,
  });
  dispatch({
    type: t.RESET_NOTIFCAITONS_REDUCER,
  });
  dispatch({
    type: t.RESET_QUTOES_REDUCER,
  });
  dispatch({
    type: t.RESET_ACCOUNT_SETTINGS,
  });
  dispatch({
    type: t.RESET_ORGANISATION_REDUCER,
  });
  dispatch({
    type: t.RESET_BILLING_REDUCER,
  });
  dispatch({
    type: t.RESET_SHIFT_REDUCER,
  });
  // dispatch({
  //   type: t.RESET_STAFFING_REDUCER,
  // });

  return true;
};
