import * as t from "../types";

const defaultState = {
  screenToShow: "general",
};

const accountSettingsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case t.SET_SCREEN_TO_SHOW_IN_SETTINGS:
      return {
        ...state,
        screenToShow: action.payload,
      };

    case t.RESET_ACCOUNT_SETTINGS:
      return {
        ...state,
        screenToShow: "general",
      };
    default:
      return state;
  }
};

export default accountSettingsReducer;
