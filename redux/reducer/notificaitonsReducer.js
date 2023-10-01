import * as t from "../types";

const defaultState = {
  toastList: [],
};

const notificationsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case t.SET_NOTIFICATION_TOAST_LIST:
      return {
        ...state,
        toastList: action.payload,
      };

    case t.RESET_NOTIFCAITONS_REDUCER:
      return {
        ...state,
        toastList: [],
      };
    default:
      return state;
  }
};

export default notificationsReducer;
