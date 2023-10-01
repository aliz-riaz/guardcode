import * as t from "../types";

const defaultState = {
  showGlobalChannelList: false,
  globalChannelOne: {
    show: false,
    is_minimized: false,
    groupID: null,
    userOnlineStatus: null,
    isChannelBlocked: false,
    isTyping: false,
    isFileUploading: false,
    imageToBeShownInMsgImgPreview: null,
    modalPreview: false,
  },
  globalChannelTwo: {
    show: false,
    is_minimized: false,
    groupID: null,
    userOnlineStatus: null,
    isChannelBlocked: false,
    isTyping: false,
    isFileUploading: false,
    imageToBeShownInMsgImgPreview: null,
    modalPreview: false,
  },
  messageTemplate: [],
  selectedMessageTemplate: {},
  // groupID: null,
  // userNameForChannel: null,
  // userJobsForChannel: null,
  // userProfilePictureForChannel: null,
  // userOnlineStatus: null,
  // modalPreview: false,
  // unReadMessageCount: null,
  // isFileUploading: false,
  // showChannelAndHideChannelListOnMobile: false,
  // imageToBeShownInMsgImgPreview: null,
  // modalPreview: false,
  // isChannelBlocked: false,
  // isTyping: false,
};

const globalChatReducer = (state = defaultState, action) => {
  switch (action.type) {
    case t.SET_SHOW_GLOBALE_CHAT_CHANNEL_LIST:
      return {
        ...state,
        showGlobalChannelList: action.payload,
      };
    case t.SET_GLOBALE_CHANNEL_ONE:
      return {
        ...state,
        globalChannelOne: action.payload,
      };
    case t.SET_GLOBALE_CHANNEL_TWO:
      return {
        ...state,
        globalChannelTwo: action.payload,
      };

    case t.RESET_GLOBAL_CHAT_REDUCER:
      return {
        ...state,
        showGlobalChannelList: false,
        globalChannelOne: {
          show: false,
          is_minimized: false,
          groupID: null,
          userNameForChannel: null,
          userJobsForChannel: null,
          userProfilePictureForChannel: null,
          userOnlineStatus: null,
          isChannelBlocked: false,
          isTyping: false,
          unReadMsgs: false,
          isFileUploading: false,
          imageToBeShownInMsgImgPreview: null,
          modalPreview: false,
        },
        globalChannelTwo: {
          show: false,
          is_minimized: false,
          groupID: null,
          userOnlineStatus: null,
          isChannelBlocked: false,
          isTyping: false,
          unReadMsgs: false,
          isFileUploading: false,
          imageToBeShownInMsgImgPreview: null,
          modalPreview: false,
        },
        messageTemplate: [],
        selectedMessageTemplate: {},
      };
    case t.SET_MESSAGE_TEMPLATE:
      return {
        ...state,
        messageTemplate: action.payload.map((templateList) => {
          return {
            templateId: templateList.id,
            templateTitle: templateList.name,
            templateMessage: templateList.message,
          };
        }),
      };
    case t.SET_SELECTED_MESSAGE_TEMPLATE:
      return {
        ...state,
        selectedMessageTemplate: action.payload,
      };
    case t.ADD_MESSAGE_TEMPLATE:
      return {
        ...state,
        messageTemplate: [...state.messageTemplate, action.payload],
      };
    case t.DELETE_MESSAGE_TEMPLATE:
      const prevState = state.messageTemplate;

      prevState.map((templateObject, index) => {
        if (templateObject.templateId == action.payload) {
          delete prevState.splice(index, 1);
        }
      });

      return {
        ...state,
        messageTemplate: [...prevState],
      };
    case t.UPDATE_MESSAGE_TEMPLATE:
      const messageTemplatePrevState = state.messageTemplate;
      messageTemplatePrevState.map((templateObject) => {
        if (templateObject.templateId === action.payload.templateId) {
          (templateObject.templateTitle = action.payload.templateTitle),
            (templateObject.templateMessage = action.payload.templateMessage);
        }
      });

      return {
        ...state,
        messageTemplate: [...messageTemplatePrevState],
      };
    default:
      return state;
  }
};

export default globalChatReducer;
