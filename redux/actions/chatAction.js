import router from "next/router";
import { toast } from "react-toastify";
import * as t from "../types";
var _ = require("lodash");

export const setShowChannelForChat = (status) => {
  return {
    type: t.SET_CHAT_SHOW_CHANNEL,
    payload: status,
  };
};
export const setSocketConnectionStatus = (status) => {
  return {
    type: t.SET_SOCKET_CONNECTION_STATUS,
    payload: status,
  };
};
export const setGroupIDForChat = (groupID) => {
  return {
    type: t.SET_CHAT_GROUP_ID_CHANNEL,
    payload: groupID,
  };
};
export const setUserNameForChat = (userName) => {
  return {
    type: t.SET_CHAT_USER_NAME_CHANNEL,
    payload: userName,
  };
};
export const setUserJobsForChat = (userJobs) => {
  return {
    type: t.SET_CHAT_USER_JOBS_CHANNEL,
    payload: userJobs,
  };
};
export const setUserProfileForChat = (userProfile) => {
  return {
    type: t.SET_CHAT_USER_PROFILE_CHANNEL,
    payload: userProfile,
  };
};
export const setIsUserOnlineForChat = (isUserOnline) => {
  return {
    type: t.SET_CHAT_USER_ONLINE_STATUS_CHANNEL,
    payload: isUserOnline,
  };
};
export const setIsUserComingFromStaffingForChat = (status) => {
  return {
    type: t.SET_CHAT_IS_COMMING_FORM_STAFFING_CHANNEL,
    payload: status,
  };
};
export const setHasDoneChatBeforeForChat = (status) => {
  return {
    type: t.SET_CHAT_HAS_DONE_CHAT_BEFORE_CHANNEL,
    payload: status,
  };
};
export const setUnreadMessageCount = (unReadCount) => {
  return {
    type: t.SET_UNREAD_MESSAGE_COUNT,
    payload: unReadCount,
  };
};
export const setIsFileUploading = (status) => {
  return {
    type: t.SET_IS_FILE_UPLOADING,
    payload: status,
  };
};

export const setShowChannelAndHideChannelListOnMobile = (status) => {
  return {
    type: t.SET_SHOW_CHANNEL_AND_HIDECHANNEL_LIST_ON_MOBILE,
    payload: status,
  };
};

export const setImageToBeShownInMsgImgPreview = (status) => {
  return {
    type: t.SET_IMAGE_TO_BE_SHOWN_IN_MSG_IMG_PREVIEW_MODAL,
    payload: status,
  };
};

export const setImgMsgModalPreview = (status) => {
  return {
    type: t.SET_IMG_MSG_MODAL_PREVIEW,
    payload: status,
  };
};

export const setIsChannelBlocked = (status) => {
  return {
    type: t.SET_IS_CHANNEL_BLOCKED,
    payload: status,
  };
};

export const setIsTyping = (status) => {
  return {
    type: t.SET_IS_TYPING,
    payload: status,
  };
};

export const setIsCurrentPage = (page) => {
  return {
    type: t.SET_IS_CURRENT_PAGE,
    payload: page,
  };
};
export const setIsSkip = (status) => {
  return {
    type: t.SET_IS_SKIP,
    payload: status,
  };
};

// fetch user's profile against user-id
export const fetchUserSWPProfile = (userToken, userID) => async (dispatch) => {
  let request_status = false;
  let data = null;
  const courses = await fetch(
    `${process.env.API_URL}employer/jobseeker/${userID}`,
    {
      method: "GET",
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
      data = result.data;
      request_status = true;
    })
    .catch(function (error) {
      toast.error("Something Went Wrong! Try Again");
    });
  return { data: data, request_status: request_status };
};
