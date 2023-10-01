import * as t from "../types";

const defaultState = {
  showChannel: null,
  socketConnectionStatus: null,
  groupID: null,
  userNameForChannel: null,
  userJobsForChannel: null,
  userProfilePictureForChannel: null,
  userOnlineStatus: null,
  isUserFromComingForStaffing: false,
  setHasDoneChatBefore: false,
  unReadMessageCount: null,
  isFileUploading: false,
  showChannelAndHideChannelListOnMobile: false,
  imageToBeShownInMsgImgPreview: null,
  modalPreview: false,
  isChannelBlocked: false,
  isTyping: false,
  currentPage: 1,
  isSkip: true,
};

const chatReducer = (state = defaultState, action) => {
  switch (action.type) {
    case t.SET_CHAT_SHOW_CHANNEL:
      return {
        ...state,
        showChannel: action.payload,
      };
    case t.SET_SOCKET_CONNECTION_STATUS:
      return {
        ...state,
        socketConnectionStatus: action.payload,
      };
    case t.SET_CHAT_GROUP_ID_CHANNEL:
      return {
        ...state,
        groupID: action.payload,
      };
    case t.SET_CHAT_USER_NAME_CHANNEL:
      return {
        ...state,
        userNameForChannel: action.payload,
      };
    case t.SET_CHAT_USER_JOBS_CHANNEL:
      return {
        ...state,
        userJobsForChannel: action.payload,
      };
    case t.SET_CHAT_USER_PROFILE_CHANNEL:
      return {
        ...state,
        userProfilePictureForChannel: action.payload,
      };
    case t.SET_CHAT_USER_ONLINE_STATUS_CHANNEL:
      return {
        ...state,
        userOnlineStatus: action.payload,
      };
    case t.SET_CHAT_IS_COMMING_FORM_STAFFING_CHANNEL:
      return {
        ...state,
        isUserFromComingForStaffing: action.payload,
      };
    case t.SET_CHAT_HAS_DONE_CHAT_BEFORE_CHANNEL:
      return {
        ...state,
        setHasDoneChatBefore: action.payload,
      };
    case t.SET_UNREAD_MESSAGE_COUNT:
      return {
        ...state,
        unReadMessageCount: action.payload,
      };
    case t.SET_IS_FILE_UPLOADING:
      return {
        ...state,
        isFileUploading: action.payload,
      };
    case t.SET_SHOW_CHANNEL_AND_HIDECHANNEL_LIST_ON_MOBILE:
      return {
        ...state,
        showChannelAndHideChannelListOnMobile: action.payload,
      };
    case t.SET_IMAGE_TO_BE_SHOWN_IN_MSG_IMG_PREVIEW_MODAL:
      return {
        ...state,
        imageToBeShownInMsgImgPreview: action.payload,
      };
    case t.SET_IMG_MSG_MODAL_PREVIEW:
      return {
        ...state,
        modalPreview: action.payload,
      };
    case t.SET_IS_CHANNEL_BLOCKED:
      return {
        ...state,
        isChannelBlocked: action.payload,
      };
    case t.SET_IS_TYPING:
      return {
        ...state,
        isTyping: action.payload,
      };
    case t.SET_IS_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case t.SET_IS_SKIP:
      return {
        ...state,
        isSkip: action.payload,
      };

    case t.RESET_CHAT_REDUCER:
      return {
        ...state,
        showChannel: null,
        socketConnectionStatus: null,
        groupID: null,
        userNameForChannel: null,
        userJobsForChannel: null,
        userProfilePictureForChannel: null,
        userOnlineStatus: null,
        isUserFromComingForStaffing: false,
        setHasDoneChatBefore: false,
        unReadMessageCount: null,
        isFileUploading: false,
        showChannelAndHideChannelListOnMobile: false,
        imageToBeShownInMsgImgPreview: null,
        modalPreview: false,
        isChannelBlocked: false,
        isTyping: false,
        currentPage: 1,
        isSkip: true,
      };
    default:
      return state;
  }
};

export default chatReducer;
