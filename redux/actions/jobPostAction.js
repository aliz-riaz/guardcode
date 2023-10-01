import router from "next/router";
import { toast } from "react-toastify";
import * as t from "../types";
// import { toast } from 'react-toastify';
// import { bindActionCreators } from "redux";

export const setActiveStep = (activeStep) => {
  return {
    type: t.SET_ACTIVE_STEP,
    payload: activeStep,
  };
};

export const setJobTitleValue = (jobTitle) => async (dispatch) => {
  //  return {
  //  type: t.SET_JOB_TITLE,
  //  payload : jobTitle
  // }
  dispatch({
    type: t.SET_JOB_TITLE,
    payload: jobTitle,
  });

  dispatch({
    type: t.SET_UPDATE_JOB_TEMPLATE,
    payload: true,
  });
};

export const setTypeOfEmployment = (typeOfEmployment) => async (dispatch) => {
  // return {
  // type: t.SET_TYPE_OF_EMPLOYMENT,
  // payload : typeOfEmployment
  // }
  dispatch({
    type: t.SET_TYPE_OF_EMPLOYMENT,
    payload: typeOfEmployment,
  });

  dispatch({
    type: t.SET_UPDATE_JOB_TEMPLATE,
    payload: true,
  });
};
export const setSIALicense = (SIALicense) => async (dispatch) => {
  // return {
  // type: t.SET_SIA_LICENSE,
  // payload : SIALicense
  // }
  dispatch({
    type: t.SET_SIA_LICENSE,
    payload: SIALicense,
  });

  dispatch({
    type: t.SET_UPDATE_JOB_TEMPLATE,
    payload: true,
  });
};
export const setRadio = (radio) => async (dispatch) => {
  // return {
  // type: t.SET_RADIO,
  // payload : radio
  // }
  dispatch({
    type: t.SET_RADIO,
    payload: radio,
  });

  dispatch({
    type: t.SET_UPDATE_JOB_TEMPLATE,
    payload: true,
  });
};
export const setContract = (contract) => async (dispatch) => {
  // return {
  // type: t.SET_CONTRACT,
  // payload : contract
  // }
  dispatch({
    type: t.SET_CONTRACT,
    payload: contract,
  });

  dispatch({
    type: t.SET_UPDATE_JOB_TEMPLATE,
    payload: true,
  });
};

export const setEditor = (editor) => async (dispatch) => {
  // return {
  // type: t.SET_EDITOR,
  // payload : editor
  // }
  dispatch({
    type: t.SET_EDITOR,
    payload: editor,
  });

  dispatch({
    type: t.SET_UPDATE_JOB_TEMPLATE,
    payload: true,
  });
};

export const setWillReportToSpecificAddress =
  (willReportToSpecificAddress) => async (dispatch) => {
    // return {
    // type: t.SET_WILL_REPORT_TO_SPECIFIC_ADDRESS,
    // payload : willReportToSpecificAddress
    // }
    dispatch({
      type: t.SET_WILL_REPORT_TO_SPECIFIC_ADDRESS,
      payload: willReportToSpecificAddress,
    });
    dispatch({
      type: t.SET_UPDATE_JOB_TEMPLATE,
      payload: true,
    });
  };
export const setWillNotReportToCity =
  (WillNotReportToCity) => async (dispatch) => {
    // return {
    // type: t.SET_WILL_NOT_REPORT_TO_CITY,
    // payload : WillNotReportToCity
    // }
    dispatch({
      type: t.SET_WILL_NOT_REPORT_TO_CITY,
      payload: WillNotReportToCity,
    });
    dispatch({
      type: t.SET_UPDATE_JOB_TEMPLATE,
      payload: true,
    });
  };
export const setWillNotReportToPostCode =
  (WillNotReportToPostCode) => async (dispatch) => {
    // return {
    // type: t.SET_WILL_NOT_REPORT_TO_POST_CODE,
    // payload : WillNotReportToPostCode
    // }
    dispatch({
      type: t.SET_WILL_NOT_REPORT_TO_POST_CODE,
      payload: WillNotReportToPostCode,
    });
    dispatch({
      type: t.SET_UPDATE_JOB_TEMPLATE,
      payload: true,
    });
  };
export const setCenterForMapGoogle =
  (centerForMapGoogle) => async (dispatch) => {
    // return {
    // type: t.SET_CENTER_FOR_MAP_GOOGLE,
    // payload : centerForMapGoogle
    // }
    dispatch({
      type: t.SET_CENTER_FOR_MAP_GOOGLE,
      payload: centerForMapGoogle,
    });
    dispatch({
      type: t.SET_UPDATE_JOB_TEMPLATE,
      payload: true,
    });
  };
export const setCenterForMapLoqate =
  (centerForMapLoqate) => async (dispatch) => {
    // return {
    // type: t.SET_CENTER_FOR_MAP_LOQATE,
    // payload : centerForMapLoqate
    // }
    dispatch({
      type: t.SET_CENTER_FOR_MAP_LOQATE,
      payload: centerForMapLoqate,
    });
    dispatch({
      type: t.SET_UPDATE_JOB_TEMPLATE,
      payload: true,
    });
  };
export const setWillReportToWorkPostCode = (postCode) => async (dispatch) => {
  // return {
  // type: t.SET_WILL_REPORT_TO_WORK_POST_CODE,
  // payload : postCode
  // }
  dispatch({
    type: t.SET_WILL_REPORT_TO_WORK_POST_CODE,
    payload: postCode,
  });
  dispatch({
    type: t.SET_UPDATE_JOB_TEMPLATE,
    payload: true,
  });
};
export const setWillReportToWorkCity = (city) => async (dispatch) => {
  // return {
  // type: t.SET_WILL_REPORT_TO_WORK_CITY,
  // payload : city
  // }
  dispatch({
    type: t.SET_WILL_REPORT_TO_WORK_CITY,
    payload: city,
  });
  dispatch({
    type: t.SET_UPDATE_JOB_TEMPLATE,
    payload: true,
  });
};
export const setWillReportToWorkAddressOne =
  (addressOne) => async (dispatch) => {
    // return {
    // type: t.SET_WILL_REPORT_TO_WORK_ADDRESS_ONE,
    // payload : addressOne
    // }
    dispatch({
      type: t.SET_WILL_REPORT_TO_WORK_ADDRESS_ONE,
      payload: addressOne,
    });
    dispatch({
      type: t.SET_UPDATE_JOB_TEMPLATE,
      payload: true,
    });
  };
export const setWillReportToWorkAddressTwo =
  (addressTwo) => async (dispatch) => {
    // return {
    // type: t.SET_WILL_REPORT_TO_WORK_ADDRESS_TWO,
    // payload : addressTwo
    // }
    dispatch({
      type: t.SET_WILL_REPORT_TO_WORK_ADDRESS_TWO,
      payload: addressTwo,
    });
    dispatch({
      type: t.SET_UPDATE_JOB_TEMPLATE,
      payload: true,
    });
  };
export const setWillReportToWorkShowHide = (show) => {
  return {
    type: t.SET_WILL_REPORT_TO_WORK_FIELDS_SHOW_HIDE,
    payload: show,
  };
};

export const setSalaryValue = (salaryValue) => async (dispatch) => {
  // return {
  // type: t.SET_SALARY_VALUE,
  // payload : salaryValue
  // }
  dispatch({
    type: t.SET_SALARY_VALUE,
    payload: salaryValue,
  });
  dispatch({
    type: t.SET_UPDATE_JOB_TEMPLATE,
    payload: true,
  });
};
export const setSalaryType = (salaryType) => async (dispatch) => {
  // return {
  // type: t.SET_SALARY_TYPE,
  // payload : salaryType
  // }
  dispatch({
    type: t.SET_SALARY_TYPE,
    payload: salaryType,
  });
  dispatch({
    type: t.SET_UPDATE_JOB_TEMPLATE,
    payload: true,
  });
};
export const setSalaryRangeMin = (salaryRangeMin) => async (dispatch) => {
  // return {
  // type: t.SET_SALARY_RANGE_MIN,
  // payload : salaryRangeMin
  // }
  dispatch({
    type: t.SET_SALARY_RANGE_MIN,
    payload: salaryRangeMin,
  });
  dispatch({
    type: t.SET_UPDATE_JOB_TEMPLATE,
    payload: true,
  });
};
export const setSalaryRangeMax = (salaryRangeMax) => async (dispatch) => {
  // return {
  // type: t.SET_SALARY_RANGE_MAX,
  // payload : salaryRangeMax
  // }
  dispatch({
    type: t.SET_SALARY_RANGE_MAX,
    payload: salaryRangeMax,
  });
  dispatch({
    type: t.SET_UPDATE_JOB_TEMPLATE,
    payload: true,
  });
};

export const setSalaryValuePerUnit =
  (salaryValuePerUnit) => async (dispatch) => {
    // return {
    // type: t.SET_SALARY_VALUE_PER_UNIT,
    // payload : salaryValuePerUnit
    // }
    dispatch({
      type: t.SET_SALARY_VALUE_PER_UNIT,
      payload: salaryValuePerUnit,
    });
    dispatch({
      type: t.SET_UPDATE_JOB_TEMPLATE,
      payload: true,
    });
  };
export const setSalaryWorkingHoursPerWeek =
  (workingHours) => async (dispatch) => {
    // return {
    // type: t.SET_SALARY_WORK_HOUR_PER_WEEK,
    // payload : workingHours
    // }
    dispatch({
      type: t.SET_SALARY_WORK_HOUR_PER_WEEK,
      payload: workingHours,
    });
    dispatch({
      type: t.SET_UPDATE_JOB_TEMPLATE,
      payload: true,
    });
  };
export const setSalaryBenefits = (salaryBenefits) => async (dispatch) => {
  // return {
  // type: t.SET_SALARY_BENEFITS,
  // payload : salaryBenefits
  // }
  dispatch({
    type: t.SET_SALARY_BENEFITS,
    payload: salaryBenefits,
  });
  dispatch({
    type: t.SET_UPDATE_JOB_TEMPLATE,
    payload: true,
  });
};
export const setSettingsEmail = (settingsEmail) => async (dispatch) => {
  // return {
  // type: t.SET_SETTINGS_EMAIL,
  // payload : settingsEmail
  // }
  dispatch({
    type: t.SET_SETTINGS_EMAIL,
    payload: settingsEmail,
  });
  dispatch({
    type: t.SET_UPDATE_JOB_TEMPLATE,
    payload: true,
  });
};
export const setDiscardModalForJobPost = (status) => {
  return {
    type: t.SET_DISCARD_MODAL_FOR_JOB_POST,
    payload: status,
  };
};
export const setDiscardLinkForModalJobPost = (link) => {
  return {
    type: t.SET_DISCARD_LINK_FOR_MODAL,
    payload: link,
  };
};
export const setShowJobPreview = (status) => {
  return {
    type: t.SET_SHOW_JOB_PREVIEW,
    payload: status,
  };
};
export const setVenueType = (status) => async (dispatch) => {
  // return ({
  // type: t.SET_VENUE_TYPE,
  // payload : status
  // })
  dispatch({
    type: t.SET_VENUE_TYPE,
    payload: status,
  });
  dispatch({
    type: t.SET_UPDATE_JOB_TEMPLATE,
    payload: true,
  });
};
export const setVenueTypeOtherValue = (value) => async (dispatch) => {
  // return ({
  // type: t.SET_VENUE_TYPE_OTHER_VALUE,
  // payload : value
  // })
  dispatch({
    type: t.SET_VENUE_TYPE_OTHER_VALUE,
    payload: value,
  });
  dispatch({
    type: t.SET_UPDATE_JOB_TEMPLATE,
    payload: true,
  });
};

export const setImmediateHiring = (status) => async (dispatch) => {
  // return ({
  // type: t.SET_IMMEDIATE_HIRING,
  // payload : status
  // })
  dispatch({
    type: t.SET_IMMEDIATE_HIRING,
    payload: status,
  });
  dispatch({
    type: t.SET_UPDATE_JOB_TEMPLATE,
    payload: true,
  });
};

export const setShowGoogleMapForGoogle = (status) => async (dispatch) => {
  // return ({
  // type: t.SET_SHOW_GOOGLE_MAP_FOR_GOOGLE,
  // payload : status
  // })
  dispatch({
    type: t.SET_SHOW_GOOGLE_MAP_FOR_GOOGLE,
    payload: status,
  });
  dispatch({
    type: t.SET_UPDATE_JOB_TEMPLATE,
    payload: true,
  });
};
export const setShowGoogleMapForLoquate = (status) => async (dispatch) => {
  // return ({
  // type: t.SET_SHOW_GOOGLE_MAP_FOR_LOQATE,
  // payload : status
  // })
  dispatch({
    type: t.SET_SHOW_GOOGLE_MAP_FOR_LOQATE,
    payload: status,
  });
  dispatch({
    type: t.SET_UPDATE_JOB_TEMPLATE,
    payload: true,
  });
};

export const setLocateSuggestionForText = (suggestions) => async (dispatch) => {
  // return {
  // type: t.SET_LOQATE_RESPONSE_FOR_TEXT,
  // payload : suggestions
  // }
  dispatch({
    type: t.SET_LOQATE_RESPONSE_FOR_TEXT,
    payload: suggestions,
  });
  dispatch({
    type: t.SET_UPDATE_JOB_TEMPLATE,
    payload: true,
  });
};

export const setJobRefNumber = (refNumber) => async (dispatch) => {
  // return {
  // type: t.SET_JOB_REF_NUMBER,
  // payload : refNumber
  // }
  dispatch({
    type: t.SET_JOB_REF_NUMBER,
    payload: refNumber,
  });
  dispatch({
    type: t.SET_UPDATE_JOB_TEMPLATE,
    payload: true,
  });
};

export const setShiftSchedule = (shift_schedule) => async (dispatch) => {
  // return {
  // type: t.SET_SHIFT_SCHEDULE,
  // payload : shift_schedule
  // }
  dispatch({
    type: t.SET_SHIFT_SCHEDULE,
    payload: shift_schedule,
  });
  dispatch({
    type: t.SET_UPDATE_JOB_TEMPLATE,
    payload: true,
  });
};

export const setShiftTiming = (shift_timing) => async (dispatch) => {
  // return {
  // type: t.SET_SHIFT_TIMING,
  // payload : shift_timing
  // }
  dispatch({
    type: t.SET_SHIFT_TIMING,
    payload: shift_timing,
  });
  dispatch({
    type: t.SET_UPDATE_JOB_TEMPLATE,
    payload: true,
  });
};

export const setSelectedLocationFromGoogle =
  (shift_timing) => async (dispatch) => {
    // return {
    // type: t.SET_SELECTED_LOCATION_FROM_GOOGLE,
    // payload : shift_timing
    // }
    dispatch({
      type: t.SET_SELECTED_LOCATION_FROM_GOOGLE,
      payload: shift_timing,
    });
    dispatch({
      type: t.SET_UPDATE_JOB_TEMPLATE,
      payload: true,
    });
  };

export const setJobDescriptionTitles = (titles) => {
  return {
    type: t.SET_JOB_DESCRIPTION_TITLES,
    payload: titles,
  };
};

export const setJobDescriptionTemplate = (template) => async (dispatch) => {
  // return {
  // type: t.SET_JOB_DESCRIPTION_TEMPLATE,
  // payload : template
  // }
  dispatch({
    type: t.SET_JOB_DESCRIPTION_TEMPLATE,
    payload: template,
  });

  // dispatch({
  //   type: t.SET_JOB_TITLE,
  //   payload: template.title,
  // });
};

// export const setLocateSuggestionForId= (suggestions) => {
//     return {
//     type: t.SET_LOQATE_RESPONSE_FOR_ID,
//     payload : suggestions
//     }
// }

export const getLoqateSuggestionsByText =
  (text, Container = "") =>
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
    } catch (error) {}
    // dispatch({
    //   type: t.SET_IS_REQUEST_LOADER,
    //   payload: false,
    // });
    if (request_status) return return_data;
    else return false;
  };

export const fetchJobTitleSuggestions = (userToken) => async (dispatch) => {
  let request_status = false;
  dispatch({
    type: t.SET_IS_REQUEST_LOADER,
    payload: true,
  });

  const questions = await fetch(process.env.API_URL + "job/title/suggestions", {
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
      if (result?.data) {
        dispatch({
          type: t.SET_JOB_TITLE_SUGGESTION,
          payload: result.data,
        });
      }
      request_status = true;
    })
    .catch(function (error) {
      toast.error("Something Went Wrong! Try Agian");
    });
  dispatch({
    type: t.SET_IS_REQUEST_LOADER,
    payload: false,
  });
  return request_status;
};

// export const fetchJobDescTemplate = (userToken, suggestionId) => async dispatch => {
//   let request_status = true;

//     dispatch({
//         type: t.SET_IS_REQUEST_LOADER,
//         payload: true,
//     });

//     const questions = await fetch(
//         process.env.API_URL+'job/description/template',
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json",
//             "Authorization" : "Bearer " + userToken
//           },
//           body: JSON.stringify({
//             suggestion_id: suggestionId,
//           })
//         }
//     )
//     .then(function (response) {
//         if (!response.ok) {
//             throw Error(response.statusText);
//         } else {
//             return response.json();
//         }
//     })
//     .then(function (result) {
//         // if(result?.data) {
//             dispatch({
//                 type: t.SET_JOB_DESCRIPTION_TEMPLATE,
//                 payload: result.data
//             })
//         // }
//         request_status = true;
//     })
//     // .catch(function (error) {
//     //     toast.error("Something Went Wrong! Try Agian");
//     // });
//     dispatch({
//         type: t.SET_IS_REQUEST_LOADER,
//         payload: false,
//     });

//   return request_status;
// }

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
          dispatch({
            type: t.SET_LOQATE_RESPONSE_FOR_ID,
            payload: result.Items,
          });
          if (signup) {
            dispatch({
              type: t.SET_COMPANY_ADDRESS_ONE_FOR_SIGNUP,
              payload: result?.Items[0]?.Line1 + " " + result?.Items[0]?.Line2,
            });
            dispatch({
              type: t.SET_COMPANY_ADDRESS_TWO_FOR_SIGNUP,
              payload: result?.Items[0]?.Line3 ?? "",
            });
            dispatch({
              type: t.SET_COMPANY_CITY_FOR_SIGNUP,
              payload: result?.Items[0]?.City,
            });
            dispatch({
              type: t.SET_COMPANY_POST_FOR_SIGNUP,
              payload: result?.Items[0]?.PostalCode,
            });
          }

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
    return request_status;
  };

export const getLatLonForLoqateAddress = (location) => async (dispatch) => {
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
      "https://api.addressy.com/Geocoding/International/Geocode/v1.1/json3.ws?Key=" +
        process.env.LOQATE_KEY +
        "&Country=UK&Location=" +
        location +
        "",
      requestOptions
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        //   Items[0].Latitude
        //   Items[0].Longitude
        if (result.Items.length > 0) {
          dispatch({
            type: t.SET_CENTER_FOR_MAP_LOQATE,
            payload: {
              lat: result.Items[0].Latitude,
              lng: result.Items[0].Longitude,
            },
          });
        } else {
          dispatch({
            type: t.SET_CENTER_FOR_MAP_LOQATE,
            payload: {
              lat: 55.378051,
              lng: -3.435973,
            },
          });
        }

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

export const postJob = (data, user_token) => async (dispatch) => {
  let request_status = false;
  dispatch({
    type: t.SET_IS_REQUEST_LOADER,
    payload: true,
  });
  // try {
  // const apiResponse = await axios.post(process.env.API_URL+`auth/login`, {email, password});
  const courses = await fetch(
    // 'https://httpstat.us/500',
    process.env.API_URL + "job/post",
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
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then(function (result) {
      dispatch({
        type: t.SET_DRAFT_LATEST_JOB_ID,
        payload: result.data,
      });
      dispatch({
        type: t.SET_DID_USER_CLICKED_A_JOB,
        payload: true,
      });
      dispatch({
        type: t.SET_FILTER_FOR_APPLICANT_LIST,
        payload: "all",
      });
      dispatch({
        type: t.SET_DATE_ORDER_FOR_APPLICANT_LIST,
        payload: "DESC",
      });
      dispatch({
        type: t.SET_SEARCH_KEYWORD_FOR_APPLICANT_LIST,
        payload: "",
      });
      // dispatch({
      //   type: t.SET_SCREEN_TO_SHOW_ON_STAFFING,
      //   payload: "jobs",
      // });
      // dispatch({
      //   type: t.RESET_JOBPOST_REDUCER,
      // })
      toast.success("Job posted successfully.");
      request_status = true;
    })
    .catch(function (error) {
      toast.error("Something Went Wrong, Please try again!");
    });
  // }catch(error){
  // }
  dispatch({
    type: t.SET_IS_REQUEST_LOADER,
    payload: false,
  });
  if (request_status) return true;
  else return false;
};

// export const postJob = async (data, user_token) => {
//   const jobPost = await fetch('https://www.get-licensed.co.uk/job/post',
//   {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json",
//       "Authorization" : "Bearer " + user_token
//     },
//     body: JSON.stringify(data)
//   }
//   );
//   const response = await jobPost.json();
//   if(!response.ok){
//     toast.error("Something Went Wrong!")
//   }else{
//     toast.success("JOb posted")
//   }

// }

// https://www.get-licensed.co.uk/job/post

// **************** fetch user's avalible connect ****************

export const fetchUserAvalibleConnect = (userToken) => async (dispatch) => {
  let request_status = false;
  // dispatch({
  //     type: t.SET_IS_REQUEST_LOADER,
  //     payload: true,
  //   });
  const courses = await fetch(process.env.API_URL + "employer/credits", {
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
      request_status = result;
      dispatch({
        type: t.SET_AVALIBLE_CONNECTS,
        payload: result.data.available_credits,
      });
      dispatch({
        type: t.SET_AVAILABLE_BOOST_COUNT,
        payload: result.data.available_boost_credits,
      });
      dispatch({
        type: t.SET_LAST_JOB_CONNECT,
        payload: result.data.available_credits,
      });
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

// **************** fetch user's client secrect for stipe payment ****************

// export const fetchUsersClientSecretForStripe =
//   (user_token, data) => async (dispatch) => {
//     let request_status = false;
//     // dispatch({
//     //   type: t.SET_IS_REQUEST_LOADER,
//     //   payload: true
//     // })
//     await fetch(process.env.API_URL + "stripe/payment-intent", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: "Bearer " + user_token,
//       },
//       body: JSON.stringify({ ...data }),
//     })
//       .then(function (response) {
//         if (!response.ok) {
//           throw Error(response.statusText);
//         } else {
//           return response.json();
//         }
//       })
//       .then(function (result) {
//         dispatch({
//           type: t.SET_DRAFT_LATEST_JOB_ID,
//           payload: result.data.metadata.job_id,
//         });
//         dispatch({
//           type: t.SET_DID_USER_CLICKED_A_JOB,
//           payload: true,
//         });
//         dispatch({
//           type: t.SET_FILTER_FOR_APPLICANT_LIST,
//           payload: "all",
//         });
//         dispatch({
//           type: t.SET_DATE_ORDER_FOR_APPLICANT_LIST,
//           payload: "DESC",
//         });
//         dispatch({
//           type: t.SET_SEARCH_KEYWORD_FOR_APPLICANT_LIST,
//           payload: "",
//         });
//         dispatch({
//           type: t.SET_SCREEN_TO_SHOW_ON_STAFFING,
//           payload: "applicants",
//         });
//         dispatch({
//           type: t.SET_CLIENT_SECRET,
//           payload: result.data.client_secret,
//         });
//         dispatch({
//           type: t.SET_PAYMENT_INTENT,
//           payload: result.data.id,
//         });
//         request_status = true;
//       })
//       .catch(function (error) {
//         toast.error("Something Went Wrong, Please try again!");
//       });
//     // }catch(error){
//     // }
//     // dispatch({
//     //   type: t.SET_IS_REQUEST_LOADER,
//     //   payload: false
//     // })
//     if (request_status) return true;
//     else return false;
//   };

// **************** attch user's credit card to account ****************
export const attachUsersCardToAccount =
  (user_token, pm, is_default) => async (dispatch) => {
    let request_status = false;
    // dispatch({
    //   type: t.SET_IS_REQUEST_LOADER,
    //   payload: true
    // })
    await fetch(`${process.env.API_URL}stripe/payment-methods/${pm}/attach`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + user_token,
      },
      body: JSON.stringify({ should_default: is_default ? "1" : "0" }),
    })
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(function (result) {
        // dispatch({
        //   type: t.SET_CLIENT_SECRET,
        //   payload: result.data.client_secret,
        // })
        request_status = true;
      });
    // .catch(function (error) {
    //   toast.error('Something Went Wrong, Please try again!')
    // })
    // }catch(error){
    // }
    // dispatch({
    //   type: t.SET_IS_REQUEST_LOADER,
    //   payload: false
    // })
    if (request_status) return true;
    else return false;
  };

// **************** send job data again in case of any update ****************
// export const updateJobDataInCaseOfUpdate =
//   (user_token, pi, data) => async (dispatch) => {
//     let request_status = false;
//     // dispatch({
//     //   type: t.SET_IS_REQUEST_LOADER,
//     //   payload: true
//     // })
//     // try {
//     // const apiResponse = await axios.post(process.env.API_URL+`auth/login`, {email, password});
//     const courses = await fetch(
//       // 'https://httpstat.us/500',
//       `${process.env.API_URL}stripe/payment-intent/${pi}/job`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: "Bearer " + user_token,
//         },
//         body: JSON.stringify({ ...data }),
//       }
//     )
//       .then(function (response) {
//         if (!response.ok) {
//           throw Error(response.statusText);
//         } else {
//           return response.json();
//         }
//       })
//       .then(function (result) {
//         dispatch({
//           type: t.SET_DRAFT_LATEST_JOB_ID,
//           payload: result.data.job_id,
//         });
//         dispatch({
//           type: t.SET_DID_USER_CLICKED_A_JOB,
//           payload: true,
//         });
//         dispatch({
//           type: t.SET_FILTER_FOR_APPLICANT_LIST,
//           payload: "all",
//         });
//         dispatch({
//           type: t.SET_DATE_ORDER_FOR_APPLICANT_LIST,
//           payload: "DESC",
//         });
//         dispatch({
//           type: t.SET_SEARCH_KEYWORD_FOR_APPLICANT_LIST,
//           payload: "",
//         });
//         dispatch({
//           type: t.SET_SCREEN_TO_SHOW_ON_STAFFING,
//           payload: "applicants",
//         });
//         request_status = true;
//       })
//       .catch(function (error) {
//         toast.error("Something Went Wrong, Please try again!");
//       });
//     // }catch(error){
//     // }
//     // dispatch({
//     //   type: t.SET_IS_REQUEST_LOADER,
//     //   payload: false
//     // })
//     if (request_status) return true;
//     else return false;
//   };

// **************** fetch job price ****************

export const fetchJobPrice = (userToken) => async (dispatch) => {
  let request_status = false;
  // dispatch({
  //     type: t.SET_IS_REQUEST_LOADER,
  //     payload: true,
  //   });
  const courses = await fetch(
    process.env.GUARD_PASS_URL + "api/public/billing/setting",
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
      dispatch({
        type: t.SET_JOB_PRICE,
        payload: result.data.billing_job_post_amount,
      });
      dispatch({
        type: t.SET_JOB_PRICE_VAT,
        payload: result.data.billing_job_post_vat_amount,
      });
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

// **************** fetch All Job Description Titles ****************

export const fetchJobDescriptionTitles = () => async (dispatch) => {
  let data = false;
  await fetch(
    process.env.GUARD_PASS_URL + "api/public/job/title/suggestions/slug",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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

export const fetchJobDescTemplate = (slug) => async (dispatch) => {
  let data = null;

  await fetch(
    `${process.env.GUARD_PASS_URL}api/public/job/description/${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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
      data = result.data[0];
    });

  return data;
};

export const setUserInJobPostingFlow = (status) => {
  return {
    type: t.SET_USER_IN_JOB_POSTING_FLOW,
    payload: status,
  };
};

export const fetchJobTemplate = (userToken) => async (dispatch) => {
  let data = null;
  await fetch(`${process.env.API_URL}employer/job/template`, {
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
    });

  return data;
};

export const deleteJobTemplate =
  (userToken, templateId) => async (dispatch) => {
    let data = null;
    await fetch(`${process.env.API_URL}employer/job/template/${templateId}`, {
      method: "DELETE",
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
        data = result;
      });

    return data;
  };

export const setAvailableForTeam = (status) => {
  return {
    type: t.SET_AVAILABLE_FOR_TEAM,
    payload: status,
  };
};

export const setSaveJobAsTemplate = (status) => {
  return {
    type: t.SET_SAVE_JOB_AS_TEMPLATE,
    payload: status,
  };
};

export const setUpdateJobTemplate = (status) => {
  return {
    type: t.SET_UPDATE_JOB_TEMPLATE,
    payload: status,
  };
};

export const setTemplateIdForJobUpdate = (status) => {
  return {
    type: t.SET_TEMPLATE_ID_FOR_JOB_UPDATE,
    payload: status,
  };
};

export const setJobTemplate = (status) => {
  return {
    type: t.SET_TEMPLATE_NAME,
    payload: status,
  };
};

export const fetchSpecificJobTemplate =
  (userToken, templateId) => async (dispatch) => {
    let data = null;
    await fetch(`${process.env.API_URL}employer/job/template/${templateId}`, {
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
      });

    return data;
  };

export const setDataIntoJobPostingForm = (templateData) => async (dispatch) => {
  dispatch({
    type: t.SET_JOB_TITLE,
    payload: templateData.job_title,
  });

  dispatch({
    type: t.SET_JOB_REF_NUMBER,
    payload: templateData.ref_number,
  });

  dispatch({
    type: t.SET_TYPE_OF_EMPLOYMENT,
    payload: templateData.employment_type,
  });

  dispatch({
    type: t.SET_SIA_LICENSE,
    payload: templateData.job_template_licenses.map((list) => {
      return list.course_id.toString();
    }),
  });

  dispatch({
    type: t.SET_CONTRACT,
    payload: templateData.contract_type,
  });

  dispatch({
    type: t.SET_SHIFT_SCHEDULE,
    payload: templateData.shift_schedule,
  });

  dispatch({
    type: t.SET_SHIFT_TIMING,
    payload: templateData.shift_timings.toString(),
  });

  if (
    templateData.venue_type == "Retail" ||
    templateData.venue_type == "Corporate" ||
    templateData.venue_type == "Bar/Club" ||
    templateData.venue_type == "Event" ||
    templateData.venue_type == "Mobile"
  ) {
    dispatch({
      type: t.SET_VENUE_TYPE,
      payload: templateData.venue_type,
    });

    dispatch({
      type: t.SET_VENUE_TYPE_OTHER_VALUE,
      payload: "",
    });
  } else {
    dispatch({
      type: t.SET_VENUE_TYPE,
      payload: "Other",
    });

    dispatch({
      type: t.SET_VENUE_TYPE_OTHER_VALUE,
      payload: templateData.venue_type,
    });
  }

  dispatch({
    type: t.SET_IMMEDIATE_HIRING,
    payload: templateData.is_immediate.toString(),
  });

  dispatch({
    type: t.SET_EDITOR,
    payload: templateData.description,
  });

  dispatch({
    type: t.SET_RADIO,
    payload: templateData.job_template_licenses.length === 0 ? "no" : "yes",
  });

  dispatch({
    type: t.SET_WILL_REPORT_TO_SPECIFIC_ADDRESS,
    payload: templateData.is_report_specific_address == 0 ? "no" : "yes",
  });

  if (templateData.is_report_specific_address == 0) {
    dispatch({
      type: t.SET_WILL_NOT_REPORT_TO_CITY,
      payload: templateData.city,
    });

    dispatch({
      type: t.SET_SHOW_GOOGLE_MAP_FOR_GOOGLE,
      payload: true,
    });

    dispatch({
      type: t.SET_SELECTED_LOCATION_FROM_GOOGLE,
      payload: true,
    });
  } else if (templateData.is_report_specific_address == 1) {
    dispatch({
      type: t.SET_WILL_REPORT_TO_WORK_POST_CODE,
      payload: templateData.postal_code,
    });

    dispatch({
      type: t.SET_WILL_REPORT_TO_WORK_CITY,
      payload: templateData.city,
    });

    dispatch({
      type: t.SET_WILL_REPORT_TO_WORK_FIELDS_SHOW_HIDE,
      payload: false,
    });

    dispatch({
      type: t.SET_SHOW_GOOGLE_MAP_FOR_LOQATE,
      payload: true,
    });

    dispatch({
      type: t.SET_WILL_REPORT_TO_WORK_ADDRESS_ONE,
      payload: templateData.address,
    });

    dispatch({
      type: t.SET_WILL_REPORT_TO_WORK_ADDRESS_TWO,
      payload: templateData.address2,
    });
  }

  dispatch({
    type: t.SET_SHOW_GOOGLE_MAP_FOR_LOQATE,
    payload: true,
  });

  dispatch({
    type: t.SET_CENTER_FOR_MAP_LOQATE,
    payload: {
      lat: parseFloat(templateData.latitude),
      lng: parseFloat(templateData.longitude),
    },
  });

  dispatch({
    type: t.SET_CENTER_FOR_MAP_GOOGLE,
    payload: {
      lat: parseFloat(templateData.latitude),
      lng: parseFloat(templateData.longitude),
    },
  });

  dispatch({
    type: t.SET_SALARY_TYPE,
    payload: templateData.salary_type,
  });

  if (templateData.salary_type == "Range") {
    dispatch({
      type: t.SET_SALARY_RANGE_MIN,
      payload: templateData.salary_min,
    });
    dispatch({
      type: t.SET_SALARY_RANGE_MAX,
      payload: templateData.salary_max,
    });
  } else if (templateData.salary_type == "Fixed Rate") {
    dispatch({
      type: t.SET_SALARY_VALUE,
      payload: templateData.salary,
    });
  }

  dispatch({
    type: t.SET_SALARY_WORK_HOUR_PER_WEEK,
    payload: templateData.working_hours,
  });

  dispatch({
    type: t.SET_SALARY_VALUE_PER_UNIT,
    payload: templateData.pay_frequency,
  });

  dispatch({
    type: t.SET_SALARY_BENEFITS,
    payload: templateData.job_template_benefits.map((list) => {
      return list.benefit_id.toString();
    }),
  });

  dispatch({
    type: t.SET_AVAILABLE_FOR_TEAM,
    payload: templateData.is_available_for_team,
  });

  dispatch({
    type: t.WEBSITE_LINK,
    payload: templateData.external_link,
  });
};

export const setFromJobTemplate = (value) => {
  return {
    type: t.SET_FROM_JOB_TEMPLATE,
    payload: value,
  };
};

export const getBillingPlan = (userToken) => async (dispatch) => {
  let data = null;
  await fetch(`${process.env.API_URL}billing/plan`, {
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
      dispatch({
        type: t.SET_BILLING_PLAN,
        payload: result.data,
      });
    });

  return data;
};

export const setJobPostingLimitEnd = (value) => {
  return {
    type: t.SET_JOB_POSTING_LIMIT_END,
    payload: value,
  };
};

export const setBillingPlan = (value) => {
  return {
    type: t.SET_BILLING_PLAN,
    payload: value,
  };
};

export const saveJobAsDraft = (data, user_token) => async (dispatch) => {
  let request_status = false;

  const courses = await fetch(
    // 'https://httpstat.us/500',
    process.env.API_URL + "job/store_draft",
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
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then(function (result) {
      toast.success("Job save as draft successfully.");
      request_status = true;
      dispatch({
        type: t.RESET_JOBPOST_REDUCER,
      });
    })
    .catch(function (error) {
      toast.error("Something Went Wrong, Please try again!");
    });

  if (request_status) return true;
  else return false;
};

export const setIsJobDraft = (value) => {
  return {
    type: t.SET_JOB_DRAFT,
    payload: value,
  };
};

export const saveDraftJobAsTemplate =
  (data, user_token) => async (dispatch) => {
    let request_status = false;

    const courses = await fetch(
      // 'https://httpstat.us/500',
      process.env.API_URL + "job/post",
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
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(function (result) {
        toast.success("Draft save as job template successfully.");
        request_status = true;
        dispatch({
          type: t.RESET_JOBPOST_REDUCER,
        });
      })
      .catch(function (error) {
        toast.error(
          "Looks like you are out of job posting limit, please update plan"
        );
      });

    if (request_status) return true;
    else return false;
  };

export const resetReducer = () => {
  return {
    type: t.RESET_JOBPOST_REDUCER,
  };
};

export const fetchJobs = (value) => {
  return {
    type: t.FETCH_JOBS,
    payload: value,
  };
};

export const setDataAfterBuyBoostCreditJobPost = (data) => async (dispatch) => {
  dispatch({
    type: t.SET_DRAFT_LATEST_JOB_ID,
    payload: data.metadata.job_id,
  });
  dispatch({
    type: t.SET_DID_USER_CLICKED_A_JOB,
    payload: true,
  });
  dispatch({
    type: t.SET_FILTER_FOR_APPLICANT_LIST,
    payload: "all",
  });
  dispatch({
    type: t.SET_DATE_ORDER_FOR_APPLICANT_LIST,
    payload: "DESC",
  });
  dispatch({
    type: t.SET_SEARCH_KEYWORD_FOR_APPLICANT_LIST,
    payload: "",
  });
  dispatch({
    type: t.SET_SCREEN_TO_SHOW_ON_STAFFING,
    payload: "applicants",
  });
  dispatch({
    type: t.SET_CLIENT_SECRET,
    payload: data.client_secret,
  });
  dispatch({
    type: t.SET_PAYMENT_INTENT,
    payload: data.id,
  });
};

export const updateJob = (user_token, jobData, jobId) => async (dispatch) => {
  let request_status = false;
  await fetch(`${process.env.API_URL}job/${jobId}/posted`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + user_token,
    },
    body: JSON.stringify(jobData),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      if (result.message) {
        toast.success(result.message);
      } else if (result.error) {
        toast.error(result.error);
      } else {
        toast.error("An error occured");
      }
      request_status = true;
    });
  if (request_status) return true;
  else return false;
};

export const saveJobAsTemplateFromRepost =
  (data, user_token) => async (dispatch) => {
    let request_status = false;
    dispatch({
      type: t.SET_IS_REQUEST_LOADER,
      payload: true,
    });
    // try {
    // const apiResponse = await axios.post(process.env.API_URL+`auth/login`, {email, password});
    const courses = await fetch(
      // 'https://httpstat.us/500',
      process.env.API_URL + "job/re-post",
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
          throw Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then(function (result) {
        // dispatch({
        //   type: t.SET_DRAFT_LATEST_JOB_ID,
        //   payload: result.data,
        // });
        // dispatch({
        //   type: t.SET_DID_USER_CLICKED_A_JOB,
        //   payload: true,
        // });
        dispatch({
          type: t.SET_FILTER_FOR_APPLICANT_LIST,
          payload: "all",
        });
        dispatch({
          type: t.SET_DATE_ORDER_FOR_APPLICANT_LIST,
          payload: "DESC",
        });
        dispatch({
          type: t.SET_SEARCH_KEYWORD_FOR_APPLICANT_LIST,
          payload: "",
        });
        dispatch({
          type: t.SET_SCREEN_TO_SHOW_ON_STAFFING,
          payload: "jobs",
        });
        dispatch({
          type: t.RESET_JOBPOST_REDUCER,
        });
        toast.success("Job saved as template");
        request_status = true;
      })
      .catch(function (error) {
        toast.error("Something Went Wrong, Please try again!");
      });
    // }catch(error){
    // }
    dispatch({
      type: t.SET_IS_REQUEST_LOADER,
      payload: false,
    });
    if (request_status) return true;
    else return false;
  };

export const setWebsiteLink = (link) => {
  return {
    type: t.WEBSITE_LINK,
    payload: link,
  };
};
