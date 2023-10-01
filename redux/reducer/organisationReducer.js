import * as t from "../types";
import _ from "lodash";

const defaultState = {
  isOrganisationSelected: false,
  organistaionId: null,
  organisationMembers: [],
  isAccountOwner: null,
  activeOrganisationId: null,
  userMenusAccess: [],
  isFullAccess: null,
  organisationSize: null,
  isOrganisationApproved: null,
  allOrganisations: [],
  hasOwnerCongratulatedForApproval: null,
  organisationAccountOwnerId: null,
  filter: {
    allBookings: {
      switchValue: "My Bookings",
      seletedTeamMembers: [],
    },
    upcomingBookings: {
      switchValue: "My Bookings",
      seletedTeamMembers: [],
    },
    pastBookings: {
      switchValue: "My Bookings",
      seletedTeamMembers: [],
    },
    staffing: {
      switchValue: "My Jobs",
      seletedTeamMembers: [],
    },
    chat: {
      switchValue: "My Conversations",
      seletedTeamMembers: [],
    },
    shifts: {
      switchValue: "My Shifts",
      seletedTeamMembers: [],
    },
    timesheets: {
      switchValue: "My Timesheet",
      seletedTeamMembers: [],
    },
  },
  allowedExternalLink: 0,
  shiftRequestedStatus: "",
};

const organisationReducer = (state = defaultState, action) => {
  switch (action.type) {
    case t.SET_IS_ORGANISATION_SELECTED:
      return {
        ...state,
        isOrganisationSelected: action.payload,
      };

    case t.SET_ORGANISATION_ID:
      return {
        ...state,
        organistaionId: action.payload,
      };

    case t.SET_ORGANISATION_MEMBERS:
      return {
        ...state,
        organisationMembers: action.payload,
      };

    case t.SET_ORGANISATION_IS_ACCOUNT_OWNER:
      return {
        ...state,
        isAccountOwner: action.payload,
      };

    case t.SET_ACTIVE_ORGANISATION_ID:
      return {
        ...state,
        activeOrganisationId: action.payload,
      };

    case t.SET_USER_MENUS_ACCESS:
      return {
        ...state,
        userMenusAccess: action.payload,
      };

    case t.SET_IS_FULL_ACCESS:
      return {
        ...state,
        isFullAccess: action.payload,
      };
    case t.SET_ORGANISATION_SIZE:
      return {
        ...state,
        organisationSize: action.payload,
      };

    case t.SET_IS_ORGANISATION_APPROVED:
      return {
        ...state,
        isOrganisationApproved: action.payload,
      };
    case t.SET_HAS_OWNER_CONGRATULATED_FOR_APPROVAL:
      return {
        ...state,
        hasOwnerCongratulatedForApproval: action.payload,
      };
    case t.SET_ALL_ORGANISATIONS:
      return {
        ...state,
        allOrganisations: action.payload,
      };
    case t.SET_ORGANISATION_ACCOUNT_OWNER_ID:
      return {
        ...state,
        organisationAccountOwnerId: action.payload,
      };

    case t.SET_ORGANISATION_FILTER:
      return {
        ...state,
        filter: { ..._.set(state.filter, action.path, action.payload) },
      };
    case t.UPDATE_SELECTED_ORGANISATION_NAME:
      return {
        ...state,
        allOrganisations: state.allOrganisations.map((organisationList) => {
          return {
            ...organisationList,
            title:
              organisationList.id === action.payload.id
                ? action.payload.title
                : organisationList.title,
          };
        }),
      };
    case t.ALLOWED_EXTERNAL_LINK:
      return {
        ...state,
        allowedExternalLink: action.payload,
      };
    case t.SHIFT_REQUEST_STATUS:
      return {
        ...state,
        shiftRequestedStatus: action.payload,
      };
    case t.RESET_ORGANISATION_REDUCER:
      return {
        ...state,
        isOrganisationSelected: false,
        organistaionId: null,
        organisationMembers: [],
        isAccountOwner: null,
        activeOrganisationId: null,
        userMenusAccess: [],
        isFullAccess: null,
        organisationSize: null,
        isOrganisationApproved: null,
        hasOwnerCongratulatedForApproval: null,
        allOrganisations: [],
        filter: {
          allBookings: {
            switchValue: "My Bookings",
            seletedTeamMembers: [],
          },
          upcomingBookings: {
            switchValue: "My Bookings",
            seletedTeamMembers: [],
          },
          pastBookings: {
            switchValue: "My Bookings",
            seletedTeamMembers: [],
          },
          staffing: {
            switchValue: "My Jobs",
            seletedTeamMembers: [],
          },
          chat: {
            switchValue: "My Conversations",
            seletedTeamMembers: [],
          },
          shifts: {
            switchValue: "My Shifts",
            seletedTeamMembers: [],
          },
          timesheets: {
            switchValue: "My Timesheets",
            seletedTeamMembers: [],
          },
        },
        allowedExternalLink: 0,
        shiftRequestedStatus: "",
      };
    default:
      return state;
  }
};

export default organisationReducer;
