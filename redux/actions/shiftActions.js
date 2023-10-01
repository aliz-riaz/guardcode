import * as t from "../types";
import { toast } from "react-toastify";


export const setShiftActiveStep = (step) =>{
  return {
    type: t.SET_SHIFT_POST_ACTIVE_STEPS,
    payload : step,
  };
}

export const setShowCreateRole = (show) => {
  return {
    type: t.SET_SHOW_CREATE_ROLE,
    payload: show,
  };
};
export const setCreateRole = (mode) => {
  return {
    type: t.SET_CREATE_ROLE,
    payload: mode,
  };
};

export const setRoleName = (name) => {
  return {
    type: t.SET_ROLE_NAME,
    payload: name,
  };
};
export const setRoleReference = (reference) => {
  return {
    type: t.SET_ROLE_REFERENCE,
    payload: reference,
  };
};
export const setRoleLicense = (license) => {
  return {
    type: t.SET_ROLE_LICENSE,
    payload: license,
  };
};
export const setRoleJobDescription = (description) => {
  return {
    type: t.SET_ROLE_JOB_DESCRIPTION,
    payload: description,
  };
};
export const setRoleUniformType = (type) => {
  return {
    type: t.SET_ROLE_UNIFORM_TYPE,
    payload: type,
  };
};
export const setRoleUniformDescription = (description) => {
  return {
    type: t.SET_ROLE_UNIFORM_DESCRIPTION,
    payload: description,
  };
};
export const setRoleUniformImage = (image) => {
  return {
    type: t.SET_ROLE_UNIFORM_IMAGE,
    payload: image,
  };
};

export const setRoleSiteType = (type) => {
  return {
    type: t.SET_ROLE_SITE_TYPE,
    payload: type,
  };
};
export const setRoleSiteList = (list) => {
  return {
    type: t.SET_ROLE_SITE_LIST,
    payload: list,
  };
};

export const setDiscardModalForShiftPost = (toggle) => {
  return {
    type: t.SET_DISCARD_MODAL_FOR_SHIFT_POST,
    payload: toggle,
  };
};
export const setShiftPostingArray = (data) => {
  return {
    type: t.SET_SHIFT_POSTING_Array,
    payload: data,
  };
};

export const setShiftSelectSite = (site) => {
  return {
    type: t.SET_SHIFT_SELECT_SITE,
    payload: site,
  };
};

export const setShiftSelectRole = (role) => {
  return {
    type: t.SET_SHIFT_SELECT_ROLE,
    payload: role,
  };
};

export const setShiftSelectVenueType = (venue) => {
  return {
    type: t.SET_SHIFT_SELECT_VENUE_TYPE,
    payload: venue,
  };
};

export const setShiftPostingDeleteArray = (index) => {
  return {
    type: t.SET_SHIFT_POSTING_DELETE_Array,
    payload: index,
  };
};

export const setShiftCal = (data) => {
  return {
    type: t.SET_SHIFT_CALCULATION,
    payload: data,
  };
};

export const setShiftExternalCharges = (data) => {
  return {
    type: t.SET_SHIFT_EXTERNSL_CHARGES,
    payload: data,
  };
};

export const setShiftCandidatesForOffer = (data) => {
  return {
    type: t.SET_SELECTED_CANDIDATES_FOR_OFFER,
    payload: data,
  };
};

export const removeShiftCandidates = (data) => {
  return {
    type: t.REMOVE_SELECTED_CANDIDATES_FOR_OFFER,
    payload: data,
  };
};

export const setCreateSite = (data) => {
  return {
    type: t.SET_CREATE_SITE,
    payload: data,
  };
};

export const setShowCreateSite = (data) => {
  return {
    type: t.SET_SHOW_CREATE_SITE,
    payload: data,
  };
};

export const setSiteName = (data) => {
  return {
    type: t.SET_SITE_NAME,
    payload: data,
  };
};

export const setSiteReference = (data) => {
  return {
    type: t.SET_SITE_REFERENCE,
    payload: data,
  };
};

export const setSiteAddress1 = (data) => {
  return {
    type: t.SET_SITE_ADDRESS1,
    payload: data,
  };
};

export const setSiteAddress2 = (data) => {
  return {
    type: t.SET_SITE_ADDRESS2,
    payload: data,
  };
};

export const setSitePostcode = (data) => {
  return {
    type: t.SET_SITE_POSTCODE,
    payload: data,
  };
};

export const setSiteCity = (data) => {
  return {
    type: t.SET_SITE_CITY,
    payload: data,
  };
};

export const setSiteAccessInstruction = (data) => {
  return {
    type: t.SET_SITE_ACCESS_INSTRUCTION,
    payload: data,
  };
};

export const setSiteLableColor = (data) => {
  return {
    type: t.SET_SITE_LABEL_COLOR,
    payload: data,
  };
};

export const setSiteContactPerson = (data) => {
  return {
    type: t.SET_SITE_CONTACT_PERSON,
    payload: data,
  };
};

export const setSiteContactNumber = (data) => {
  return {
    type: t.SET_SITE_CONTACT_NUMBER,
    payload: data,
  };
};
export const setSiteUseMyDetail = (data) => {
  return {
    type: t.SET_SITE_USE_MY_DETAIL,
    payload: data,
  };
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

export const setCurrentWorkerScreen = (data) => {
  return {
    type: t.SET_CURRENT_STEP_WORKER_SCREEN,
    payload: data,
  };
};

export const showWorkerScreen = (data) => {
  return {
    type: t.SHOW_WORKER_SCREEN,
    payload: data,
  };
};
