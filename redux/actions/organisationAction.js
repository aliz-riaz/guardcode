import router from "next/router";
import { toast } from "react-toastify";
import * as t from "../types";
// import { toast } from 'react-toastify';
// import { bindActionCreators } from "redux";

export const setIsOrganisationSelected = (status) => {
  return {
    type: t.SET_IS_ORGANISATION_SELECTED,
    payload: status,
  };
};

export const setOrganisationId = (organisationId) => {
  return {
    type: t.SET_ORGANISATION_ID,
    payload: organisationId,
  };
};

export const setOrganisationMembers = (organisationMembers) => {
  return {
    type: t.SET_ORGANISATION_MEMBERS,
    payload: organisationMembers,
  };
};

export const setIsAccountOrganisationOwner = (status) => {
  return {
    type: t.SET_ORGANISATION_IS_ACCOUNT_OWNER,
    payload: status,
  };
};
export const setActiveOrganisationMembers = (activeOrganisation) => {
  return {
    type: t.SET_ACTIVE_ORGANISATION_ID,
    payload: activeOrganisation,
  };
};
export const setUserMenusAcces = (menus) => {
  return {
    type: t.SET_USER_MENUS_ACCESS,
    payload: menus,
  };
};

export const setIsFullAccess = (isFullAccess) => {
  return {
    type: t.SET_IS_FULL_ACCESS,
    payload: isFullAccess,
  };
};

export const setOrganisationSize = (organisationSize) => {
  return {
    type: t.SET_ORGANISATION_SIZE,
    payload: organisationSize,
  };
};

export const setIsOrganisationApproved = (status) => {
  return {
    type: t.SET_IS_ORGANISATION_APPROVED,
    payload: status,
  };
};

export const setHasOwnerCongratulatedForApproval = (status) => {
  return {
    type: t.SET_HAS_OWNER_CONGRATULATED_FOR_APPROVAL,
    payload: status,
  };
};

export const setAllOrganisations = (allOrganisations) => {
  return {
    type: t.SET_ALL_ORGANISATIONS,
    payload: allOrganisations,
  };
};

export const setOrganisationAccountOwnerId = (ownerId) => {
  return {
    type: t.SET_ORGANISATION_ACCOUNT_OWNER_ID,
    payload: ownerId,
  };
};

export const setAllBookingsSwtichValue = (value) => {
  return {
    type: t.SET_ORGANISATION_FILTER,
    path: "allBookings.switchValue",
    payload: value,
  };
};

export const setAllBookingsSeletedTeamMembers = (members) => {
  return {
    type: t.SET_ORGANISATION_FILTER,
    path: "allBookings.seletedTeamMembers",
    payload: members,
  };
};

export const setPastBookingsSwtichValue = (value) => {
  return {
    type: t.SET_ORGANISATION_FILTER,
    path: "pastBookings.switchValue",
    payload: value,
  };
};

export const setPastBookingsSeletedTeamMembers = (members) => {
  return {
    type: t.SET_ORGANISATION_FILTER,
    path: "pastBookings.seletedTeamMembers",
    payload: members,
  };
};

export const setUpcomingBookingsSwtichValue = (value) => {
  return {
    type: t.SET_ORGANISATION_FILTER,
    path: "upcomingBookings.switchValue",
    payload: value,
  };
};

export const setUpcomingBookingsSeletedTeamMembers = (members) => {
  return {
    type: t.SET_ORGANISATION_FILTER,
    path: "upcomingBookings.seletedTeamMembers",
    payload: members,
  };
};

export const setStaffingBookingsSwtichValue = (value) => {
  return {
    type: t.SET_ORGANISATION_FILTER,
    path: "staffing.switchValue",
    payload: value,
  };
};

export const setStaffingBookingsSeletedTeamMembers = (members) => {
  return {
    type: t.SET_ORGANISATION_FILTER,
    path: "staffing.seletedTeamMembers",
    payload: members,
  };
};

export const setChatBookingsSwtichValue = (value) => {
  return {
    type: t.SET_ORGANISATION_FILTER,
    path: "chat.switchValue",
    payload: value,
  };
};

export const setChatBookingsSeletedTeamMembers = (members) => {
  return {
    type: t.SET_ORGANISATION_FILTER,
    path: "chat.seletedTeamMembers",
    payload: members,
  };
};

export const setShiftsSwtichValue = (value) => {
  return {
    type: t.SET_ORGANISATION_FILTER,
    path: "shifts.switchValue",
    payload: value,
  };
};
export const setShiftsSeletedTeamMembers = (members) => {
  return {
    type: t.SET_ORGANISATION_FILTER,
    path: "shifts.seletedTeamMembers",
    payload: members,
  };
};

export const setTimesheetsSwtichValue = (value) => {
  return {
    type: t.SET_ORGANISATION_FILTER,
    path: "timesheets.switchValue",
    payload: value,
  };
};

export const setTimesheetsSeletedTeamMembers = (members) => {
  return {
    type: t.SET_ORGANISATION_FILTER,
    path: "timesheets.seletedTeamMembers",
    payload: members,
  };
};

// get list of user's all organisation
export const getListOfUsersAllOrganisation =
  (userToken) => async (dispatch) => {
    let request_status = false;
    let data = null;
    await fetch(`${process.env.API_URL}organisation`, {
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
        request_status = true;
      })
      .catch(function (error) {
        console.error("Something went wrong in endpoint /organisation");
        toast.error("Something Went Wrong! Try Again");
      });
    return { data: data, request_status: request_status };
  };

// mark organisation as active organistaion from backend so we don't have to send organisation for each api req
export const markSelectedOrganisationAsDefault =
  (userToken, organistationId) => async (dispatch) => {
    let request_status = false;
    let data = null;
    await fetch(
      `${process.env.API_URL}organisation/${organistationId}/active`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + userToken,
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
        data = result;
        request_status = true;
      })
      .catch(function (error) {
        console.error(
          "Something went wrong in endpoint organisation/${organistationId}/active"
        );
        toast.error("Something Went Wrong! Try Again");
      });
    return { data: data, request_status: request_status };
  };

// add organisation to user's list aka accept invitation
export const acceptOrganisationInvitation =
  (userToken, inviteCode) => async (dispatch) => {
    let request_status = false;
    let data = null;
    await fetch(
      `${process.env.API_URL}organisation/invitation/${inviteCode}/accept`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + userToken,
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
        data = result;
        request_status = true;
      })
      .catch(function (error) {
        console.error(
          "Something went wrong in endpoint organisation/invitation/${inviteCode}/accept"
        );
        toast.error("Something Went Wrong! Try Again");
      });
    return { data: data, request_status: request_status };
  };

// create new organisation for user
export const createNewOrganisation =
  (userToken, FormData) => async (dispatch) => {
    let request_status = false;
    let data = null;
    await fetch(`${process.env.API_URL}organisation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + userToken,
      },
      body: JSON.stringify(FormData),
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
        console.error("Something went wrong in endpoint organisation");
        toast.error("Something Went Wrong! Try Again");
      });
    return { data: data, request_status: request_status };
  };

// mark that user has seen the account approval congratulations modal
export const organisationUserHasBeenCongratulated =
  (userToken) => async (dispatch) => {
    let request_status = false;
    let data = null;
    await fetch(`${process.env.API_URL}organisation/congratulate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + userToken,
      },
      // body: JSON.stringify(FormData)
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
          "Something went wrong in endpoint organisation/congratulate"
        );
        toast.error("Something Went Wrong! Try Again");
      });
    return { data: data, request_status: request_status };
  };

export const updateOrganisationName = (organisationId, organisationName) => {
  return {
    type: t.UPDATE_SELECTED_ORGANISATION_NAME,
    payload: { id: organisationId, title: organisationName },
  };
};

export const setExternalLink = (allowedLink) => {
  return {
    type: t.ALLOWED_EXTERNAL_LINK,
    payload: allowedLink,
  };
};

export const setShiftRequestStatus = (status) => {
  return {
    type: t.SHIFT_REQUEST_STATUS,
    payload: status,
  };
};
