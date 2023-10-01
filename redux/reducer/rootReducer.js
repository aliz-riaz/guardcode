import { combineReducers } from "redux";
import commonReducer from "./commonReducer";
import userDataReducer from "./userDataReducer";
import coursesReducer from "./coursesReducer";
import bookingReducer from "./bookingReducer";
import jobPostReducer from "./jobPostReducer";
import staffingReducer from "./staffingReducer";
import chatReducer from "./chatReducer";
import cvSearchReducer from "./cvSearchReducer";
import notificationsReducer from "./notificaitonsReducer";
import globalChatReducer from "./globalChatReducer";
import quotesReducer from "./quotesReducer";
import accountSettingsReducer from "./accountSettingsReducer";
import organisationReducer from "./organisationReducer";
import billingReducer from "./billingReducer";
import shiftReducer from "./shiftReducer";

const rootReducer = combineReducers({
  commonReducer: commonReducer,
  userDataReducer: userDataReducer,
  coursesReducer: coursesReducer,
  bookingReducer: bookingReducer,
  jobPostReducer: jobPostReducer,
  staffingReducer: staffingReducer,
  chatReducer: chatReducer,
  globalChatReducer: globalChatReducer,
  cvSearchReducer: cvSearchReducer,
  notificationsReducer: notificationsReducer,
  quotesReducer: quotesReducer,
  accountSettingsReducer: accountSettingsReducer,
  organisationReducer: organisationReducer,
  billingReducer: billingReducer,
  shiftReducer: shiftReducer,
});

export default rootReducer;
