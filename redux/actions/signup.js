import * as t from "../types";
import { toast } from "react-toastify";
import { setSearchKeywordForJobList } from "./staffingAction";
import Cookies from "js-cookie";

export const setScreenToBeShownOnSignup = (screen) => {
  return {
    type: t.SET_SCREEN_TO_BE_SHOWN_ON_SIGNUP,
    payload: screen,
  };
};

export const setContactNameForSignup = (contactName) => {
  return {
    type: t.SET_CONTACT_NAME_FOR_SIGNUP,
    payload: contactName,
  };
};
export const setEmailAddressForSignup = (emailAddress) => {
  return {
    type: t.SET_EMAIL_ADDRESS_FOR_SIGNUP,
    payload: emailAddress,
  };
};

export const setPhoneNumberForSignup = (phone) => {
  return {
    type: t.SET_PHONE_NUMBER_FOR_SIGNUP,
    payload: phone,
  };
};
export const setCompanySizeForSignup = (comapnySize) => {
  return {
    type: t.SET_COMPANY_SIZE_FOR_SIGNUP,
    payload: comapnySize,
  };
};

export const setCompanyNameForSignup = (companyName) => {
  return {
    type: t.SET_COMPANY_NAME_FOR_SIGNUP,
    payload: companyName,
  };
};

export const setCompanyAddressForSignup = (status) => {
  return {
    type: t.SET_COMPANY_ADDRESS_FOR_SIGNUP,
    payload: status,
  };
};
export const setCompanyAddressOneForSignup = (addressOne) => {
  return {
    type: t.SET_COMPANY_ADDRESS_ONE_FOR_SIGNUP,
    payload: addressOne,
  };
};
export const setCompanyAddressTwoForSignup = (addressTwo) => {
  return {
    type: t.SET_COMPANY_ADDRESS_TWO_FOR_SIGNUP,
    payload: addressTwo,
  };
};
export const setCompanyCityForSignup = (city) => {
  return {
    type: t.SET_COMPANY_CITY_FOR_SIGNUP,
    payload: city,
  };
};
export const setCompnayPostCodeForSignup = (postcode) => {
  return {
    type: t.SET_COMPANY_POST_FOR_SIGNUP,
    payload: postcode,
  };
};
export const setTermsForSignup = (status) => {
  return {
    type: t.SET_TERMS_FOR_SIGNUP,
    payload: status,
  };
};
export const setCompanyNumberForSignup = (companyNumber) => {
  return {
    type: t.SET_COMPANY_NUMBER_FOR_SIGNUP,
    payload: companyNumber,
  };
};
export const resetCommonReducer = () => {
  return {
    type: t.RESET_COMMON_REDUCER,
  };
};

export const userSignUpAction =
  (name, company_name, email, phoneNumber) => async (dispatch) => {
    let request_status = false;
    dispatch({
      type: t.SET_IS_REQUEST_LOADER,
      payload: true,
    });
    try {
      // const apiResponse = await axios.post(process.env.API_URL+`auth/login`, {email, password});
      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          business_name: company_name,
          full_name: name,
          email_address: email,
          mobile_number: phoneNumber,
        }),
      };
      const courses = await fetch(
        process.env.API_URL + "auth/signup",
        requestOptions
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          if (result.error) {
            toast.error(result.error);
          } else {
            // toast.success(result.message);
            dispatch({
              type: t.SET_SIGNUP_NAME,
              payload: name,
            });
            dispatch({
              type: t.SET_THANK_YOU_PAGE_SHOW,
              payload: true,
            });
            request_status = true;
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
    if (request_status) return true;
    else return false;
  };

export const getCompanyHouseData = (searchKeyword) => async (dispatch) => {
  let request_status = false;
  // dispatch({
  //     type: t.SET_IS_REQUEST_LOADER,
  //     payload: true,
  // });

  // let dataObj = {
  //     job_id: jobId,
  //     applicant_id: applicantId,
  //     notes: notes,
  // }
  // var token = btoa(21658:LmjnK5smT5ewFEsfAAbnShWWzkOb0Ohj)
  var token = btoa(
    encodeURIComponent("21659:KpyPbD0Wc9NetPOttJy5jyoNqfT8N2pK")
  );
  await fetch("https://api.endole.co.uk/search/companies?q=" + searchKeyword, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Basic " + token,
    },
    // body: JSON.stringify({
    //   q: searchKeyword,
    // })
  })
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then(function (result) {
      request_status = true;
    });
  // .catch(function (error) {
  //     toast.error("Something Went Wrong! Try Again");
  // });

  // dispatch({
  //     type: t.SET_IS_REQUEST_LOADER,
  //     payload: false,
  // });
  return request_status;
};
export const createSignUpDraft =
  (full_name, email, mobile_number, recaptcha, toastForResend = false) =>
  async (dispatch) => {
    let request_status = false;
    dispatch({
      type: t.SET_IS_REQUEST_LOADER,
      payload: true,
    });

    let dataObj = {
      full_name: full_name,
      email_address: email,
      mobile_number: mobile_number.replace("0", "44"),
      token: recaptcha,
    };
    // var token = btoa(21658:LmjnK5smT5ewFEsfAAbnShWWzkOb0Ohj)
    try {
      const response = await fetch(process.env.API_URL + "auth/draft/signup", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // "Authorization": "Basic "+token
        },
        body: JSON.stringify(dataObj),
      });
      const parsed = await response.json();
      const { status } = response;
      if (response.ok) {
        dispatch({
          type: t.SET_SCREEN_TO_BE_SHOWN_ON_SIGNUP,
          payload: "passcode",
        });
        if (toastForResend) {
          toast.success("Code resent to email successfully");
        }
      } else if (status === 422) {
        // return successCallback(parsed);
        // const errorMsg = () =>
        if (parsed?.errors?.email_address) {
          toast.error(<div>{parsed?.errors?.email_address}</div>, {
            autoClose: false,
          });
        }
        if (parsed?.errors?.recaptcha) {
          toast.error(<div>{parsed?.errors?.recaptcha}</div>, {
            autoClose: false,
          });
        }
        // toast.error(<div>{parsed.errors.full_name}</div>)
      }

      if (!response.ok && status != "422") {
        toast.error("Somthing went wrong");
      }
      dispatch({
        type: t.SET_IS_REQUEST_LOADER,
        payload: false,
      });
      request_status = true;
    } catch {
      toast.error("Somthing went wrong");
    }

    // throw new Error(parsed);
    // .then(async function (response) {
    //   const a ="adfsaf"
    //     if(response.status == 422){
    //       // let result = await response.json()
    //       // toast.error(result.errors)
    //     }
    //     else if (!response.ok) {
    //         throw Error(response.statusText);
    //     } else {
    //         return response.json();
    //     }
    // }).then(function (result) {
    //     a = "dafasdfa";
    //     request_status = true;
    // })
    // .catch(function (error) {
    //     toast.error("Something Went Wrong! Try Again");
    // });

    // dispatch({
    //     type: t.SET_IS_REQUEST_LOADER,
    //     payload: false,
    // });
    return request_status;
  };

export const userPassCodeVerificationForSignup =
  (
    business_name,
    full_name,
    email_address,
    mobile_number,
    passcode,
    company_size,
    claim_request_id,
    invitationCode
  ) =>
  async (dispatch) => {
    let request_status = false;
    let data = null;
    dispatch({
      type: t.SET_IS_REQUEST_LOADER,
      payload: true,
    });

    let dataObj = {
      business_name: business_name,
      full_name: full_name,
      email_address: email_address,
      mobile_number: mobile_number.replace("0", "44"),
      code: passcode,
      company_size: company_size,
      // ...(claim_request_id && {claim_request_id: claim_request_id})
      ...(invitationCode && { invitation_code: invitationCode }),
    };

    await fetch(process.env.API_URL + "auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(dataObj),
    })
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(function (result) {
        Cookies.set("user", JSON.stringify(result.access_token), {
          path: "/",
        });
        Cookies.set("isNavBarOpenCookie", true, {
          path: "/",
        });
        Cookies.set("natprp", Buffer.from("0").toString("base64"), {
          path: "/",
        });
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

        if (result.employer.address1) {
          dispatch({
            type: t.SET_ADDRESS1,
            payload: result.employer.address1,
          });
        }
        if (result.employer.address2) {
          dispatch({
            type: t.SET_ADDRESS2,
            payload: result.employer.address2,
          });
        }
        if (result.employer.city) {
          dispatch({
            type: t.SET_CITY,
            payload: result.employer.city,
          });
        }
        if (result.employer.postcode) {
          dispatch({
            type: t.SET_USER_POSTCODE,
            payload: result.employer.postcode,
          });
        }
        dispatch({
          type: t.SET_IS_ONBOARDING_FEEDBACK_DONE,
          payload: false,
        });
        data = result;
        request_status = true;
      })
      .catch(function (error) {
        // toast.error("Invalid Code");

        dispatch({
          type: t.SET_INVALID_PASSCODE,
          payload: true,
        });
        dispatch({
          type: t.SET_IS_REQUEST_LOADER,
          payload: false,
        });
      });

    // dispatch({
    //     type: t.SET_IS_REQUEST_LOADER,
    //     payload: false,
    // });
    return { data, request_status };
  };

export const checkForAccountApproval = (userToken) => async (dispatch) => {
  let request_status = false;
  // dispatch({
  //     type: t.SET_IS_REQUEST_LOADER,
  //     payload: true,
  // });

  // let dataObj = {
  //     job_id: jobId,
  //     applicant_id: applicantId,
  //     notes: notes,
  // }

  await fetch(process.env.API_URL + "auth/check/approval", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + userToken,
    },
    // body: JSON.stringify(dataObj)
  })
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then(function (result) {
      // Cookies.set('natprp', Buffer.from((result?.data.is_account_approved).toString()).toString('base64'), {
      //   path: "/",
      //     });
      // if(result?.data) {
      //   dispatch({
      //    type: t.SET_ACCOUNT_APPROVAL,
      //    payload: result?.data,
      // });
      // if(userToken != "" && result?.data.is_account_declined == 0 && result?.data.is_account_approved == 1)
      // {
      //       checkForHasCongratulated(userToken, dispatch)
      // }
      // }
      request_status = true;
    });
  // .catch(function (error) {
  //     // toast.error("Something Went Wrong! Try Again");
  // });

  // dispatch({
  //     type: t.SET_IS_REQUEST_LOADER,
  //     payload: false,
  // });
  return request_status;
};

// export const checkForHasCongratulated = async (userToken, dispatch) => {
//   let request_status = false;
//   // dispatch({
//   //     type: t.SET_IS_REQUEST_LOADER,
//   //     payload: true,
//   // });

//   // let dataObj = {
//   //     job_id: jobId,
//   //     applicant_id: applicantId,
//   //     notes: notes,
//   // }

//   await fetch(
//       process.env.API_URL + 'employer/congratulated',
//       {
//           method: "GET",
//           headers: {
//               "Content-Type": "application/json",
//               "Accept": "application/json",
//               "Authorization": "Bearer " + userToken
//           },
//           // body: JSON.stringify(dataObj)
//       }
//   ).then(function (response) {
//       if (!response.ok) {
//           throw Error(response.statusText);
//       } else {
//           return response.json();
//       }
//   }).then(function (result) {
//     dispatch({
//      type: t.SET_HAS_CONGRATULATED,
//      payload: result?.data.has_congratulated,
//   });
//     if(result?.data.has_congratulated == 0) {
//       dispatch({
//        type: t.SET_SHOW_CONGRATULATION_MODAL,
//        payload: true,
//        });
//     }
//       request_status = true;
//   }).catch(function (error) {
//       // toast.error("Something Went Wrong! Try Again");
//   });

//   // dispatch({
//   //     type: t.SET_IS_REQUEST_LOADER,
//   //     payload: false,
//   // });
//   return request_status;
// }

// export const setUserHasCongratulated = (userToken) => async dispatch => {
//   let request_status = false;
//   // dispatch({
//   //     type: t.SET_IS_REQUEST_LOADER,
//   //     payload: true,
//   // });

//   // let dataObj = {
//   //     job_id: jobId,
//   //     applicant_id: applicantId,
//   //     notes: notes,
//   // }

//   await fetch(
//       process.env.API_URL + 'employer/congratulate',
//       {
//           method: "POST",
//           headers: {
//               "Content-Type": "application/json",
//               "Accept": "application/json",
//               "Authorization": "Bearer " + userToken
//           },
//           // body: JSON.stringify(dataObj)
//       }
//   ).then(function (response) {
//       if (!response.ok) {
//           throw Error(response.statusText);
//       } else {
//           return response.json();
//       }
//   }).then(function (result) {
//   //   dispatch({
//   //    type: t.SET_HAS_CONGRATULATED,
//   //    payload: result?.data.has_congratulated,
//   // });
//   //   if(result?.data.has_congratulated == 0) {
//   //     dispatch({
//   //      type: t.SET_SHOW_CONGRATULATION_MODAL,
//   //      payload: true,
//   //      });
//   //   }
//       request_status = true;
//   }).catch(function (error) {
//       // toast.error("Something Went Wrong! Try Again");
//   });

//   // dispatch({
//   //     type: t.SET_IS_REQUEST_LOADER,
//   //     payload: false,
//   // });
//   return request_status;
// }

export const fetchCompanyNameSuggestions =
  (companyName) => async (dispatch) => {
    let request_status = false;
    // dispatch({
    //     type: t.SET_IS_REQUEST_LOADER,
    //     payload: true,
    //   });
    const courses = await fetch(
      `${process.env.API_URL}company?q=${companyName}`
    )
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(function (data) {
        dispatch({
          type: t.SET_COMPANY_NAME_SUGGESTIONS,
          payload:
            data.data.endole_data?.items?.length > 0
              ? data.data.endole_data?.items?.map((company) => company?.title)
              : [],
        });
        request_status = true;
      });
    // .catch(function (error) {
    //     toast.error("Something Went Wrong! Try Again");
    // });
    // dispatch({
    //     type: t.SET_IS_REQUEST_LOADER,
    //     payload: false,
    //   });
    return request_status;
  };

/** Get Company info by id */
export const getCompanyInfo = async (companyId) => {
  let data = null;
  await fetch(
    `${process.env.GUARD_PASS_URL}api/public/company/${companyId}/detail`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        //"Authorization" : "Bearer " + userToken,
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
