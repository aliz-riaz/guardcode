import React, { useState } from "react";
import { connect } from "react-redux";
import { socket } from "../../lib/SocketProvider";
import { setGlobalChannelOne } from "../../redux/actions/globalChatAction";
import {
  setShowChannelForChat,
  setGroupIDForChat,
  setIsUserComingFromStaffingForChat,
  setHasDoneChatBeforeForChat,
  setShowChannelAndHideChannelListOnMobile,
} from "../../redux/actions/chatAction";
import uniqid from "uniqid";
import { isMobile } from "react-device-detect";
import { useRouter } from "next/router";

const InitChatButton = (props) => {
  const [disableChatInit, setDisableChatInit] = useState(false);
  const router = useRouter();

  const firstTimeChat = (uuid, applications) => {
    socket.emit("initChat", {
      groups: {
        name: `${props.decision_maker_first_name} ${props.decision_maker_last_name}`,
        created_by: props.employers_user_id.toString(),
        uuid: uuid,
        user_id: props.employers_user_id,
      },
      group_members: {
        users: [
          {
            id: props.employers_user_id,
            firstname: props.company_name,
            lastname: `${props.decision_maker_first_name} ${props.decision_maker_last_name}`,
            picture: null,
            email: props.employers_email,
            phone: props.employers_mobile_number,
            // phone: "03032856025",
            type: "EMPLOYER",
          },
          {
            id: props.jobseekerData.id,
            firstname: props.jobseekerData.first_name,
            lastname:
              props.jobseekerData.middle_name &&
              props.jobseekerData.middle_name != ""
                ? `${props.jobseekerData.middle_name} ${props.jobseekerData.last_name}`
                : props.jobseekerData.last_name,
            picture: props.jobseekerData.profile_picture,
            email: props.jobseekerData.email_address,
            phone: props.jobseekerData.mobile_number,
            type: "JOBSEEKER",
          },
        ],
        applications,
        multi_chat: false,
      },
      type: "createGroup",
    });
  };

  const hasDoneChatBefore = (roomID) => {
    socket.emit("initChat", {
      groups: {
        name: `${props.decision_maker_first_name} ${props.decision_maker_last_name}`,
        created_by: props.employers_user_id.toString(),
        uuid: roomID,
        user_id: props.employers_user_id,
      },
      group_members: {
        applications: {
          job_id: props.job_to_be_shown_in_applicants_tab.id,
          employer_id: props.employers_user_id,
          title: props.job_to_be_shown_in_applicants_tab.title,
          location: `${
            props.job_to_be_shown_in_applicants_tab.postal_code != ""
              ? props.job_to_be_shown_in_applicants_tab.postal_code +
                ", " +
                props.job_to_be_shown_in_applicants_tab.city
              : props.job_to_be_shown_in_applicants_tab.city
          }`,
        },
      },
      type: "joinGroup",
    });
  };

  const openGlobalChat = (groupId) => {
    props.setGlobalChannelOne({
      show: true,
      is_minimized: false,
      groupID: groupId,
      userOnlineStatus: null,
      isChannelBlocked: false,
      isTyping: false,
      isFileUploading: false,
      imageToBeShownInMsgImgPreview: null,
      modalPreview: false,
    });
  };

  const checkButtonShowType = (uuid) => {
    if (props.chatButtonRenderType == "fromWorkerProfile") {
      const applications = {
        job_id: `${router.query.shift_id}`,
        employer_id: props.employers_user_id,
        title: `${props.job_to_be_shown_in_applicants_tab.role.title}`,
        location: `${props.job_to_be_shown_in_applicants_tab.site.title}`,
      };
      firstTimeChat(uuid, applications);
    } else if (props.chatButtonRenderType == "fromSWPProfile") {
      const applications = {
        job_id: props.job_to_be_shown_in_applicants_tab.id,
        employer_id: props.employers_user_id,
        title: props.job_to_be_shown_in_applicants_tab.title,
        location: `${
          props.job_to_be_shown_in_applicants_tab.postal_code != ""
            ? `${props.job_to_be_shown_in_applicants_tab.postal_code}, 
                      ${props.job_to_be_shown_in_applicants_tab.city}`
            : props.job_to_be_shown_in_applicants_tab.city
        }`,
      };
      firstTimeChat(uuid, applications);
    } else {
      return false;
    }
  };

  const intiateChat = () => {
    setDisableChatInit(true);

    socket.emit("checkGroupExist", {
      user: {
        id: props.jobseekerData.id,
        type: "JOBSEEKER",
      },
    });

    socket.on("groupExist", (data) => {
      if (data.requestStatus == "success") {
        if (!isMobile) {
          if (data.data.hasRoom) {
            openGlobalChat(data.data.group_id);
          } else {
            const uuid = uniqid("group-").toString();
            checkButtonShowType(uuid); // check component called from
            socket.on("output", (outputData) => {
              if (
                outputData.data.eventName == "initChat" &&
                outputData.data.message == "new group created successfully"
              ) {
                openGlobalChat(uuid);
              }
            });
          }
        }
        //for mobile view
        else {
          if (data.data.hasRoom) {
            hasDoneChatBefore(data.data.group_id);
            props.setGroupIDForChat(data.data.group_id);
            props.setHasDoneChatBeforeForChat(true);
          } else {
            const uuid = uniqid("group-").toString();
            checkButtonShowType(uuid); // check component called from
            props.setGroupIDForChat(uuid);
            props.setHasDoneChatBeforeForChat(false);
          }
          socket.on("output", (outputData) => {
            if (
              (outputData.data.eventName == "initChat" &&
                outputData.data.message == "room joined") ||
              (outputData.data.eventName == "initChat" &&
                outputData.data.message == "new group created successfully")
            ) {
              props.setShowChannelForChat(true);
              props.setIsUserComingFromStaffingForChat(true);
              if (isMobile) {
                props.setShowChannelAndHideChannelListOnMobile(true);
              }
              router.push("/chat");
              setDisableChatInit(false);
            }
          });
        }
      } else {
        console.error("Something went wrong in groupExist event:", data);
        toast.error("Something went wrong, Please try again!");
      }
      socket?.removeAllListeners("groupExist");
    });
    socket?.removeAllListeners("output");
  };

  return (
    <>
      <button
        disable={disableChatInit}
        className={props.btnClass}
        onClick={intiateChat}
      >
        {props.buttonText}
      </button>
    </>
  );
};

const mapStateToProps = (state) => ({
  // swp_profile_to_be_shown: state.vantage.staffingReducer.swpProfileToBeShown,
  latest_job_id_for_applicant_tab: state.vantage.staffingReducer.latestJobId,
  swp_profile_index: state.vantage.staffingReducer.swpProfileIndex,
  user_token: state.vantage.userDataReducer.user_token,
  decision_maker_first_name:
    state.vantage.userDataReducer.decision_maker_first_name,
  decision_maker_last_name:
    state.vantage.userDataReducer.decision_maker_last_name,
  employers_email: state.vantage.userDataReducer.user_email,
  employers_mobile_number: state.vantage.userDataReducer.user_mobile_number,
  employers_user_id: state.vantage.userDataReducer.user_id,
  job_to_be_shown_in_applicants_tab:
    state.vantage.staffingReducer.jobToBeShownInApplicantsTab,
  latest_job_id_for_applicant_list: state.vantage.staffingReducer.latestJobId,

  filter_for_applicants_list:
    state.vantage.staffingReducer.filterForApplicantsList,
  date_order_for_applicants_list:
    state.vantage.staffingReducer.dateOrderForApplicantsList,

  job_applicants_for_applicants_tab:
    state.vantage.staffingReducer.jobApplicants,
  company_name: state.vantage.userDataReducer.user_name,
  user_email: state.vantage.userDataReducer.user_email,

  g_chat_one: state.vantage.globalChatReducer.globalChannelOne,
  organisationFilters: state.vantage.organisationReducer.filter,

  currentPage: state.vantage.chatReducer.currentPage,
  isSkip: state.vantage.chatReducer.isSkip,
});

const mapDispatchToProps = (dispatch) => ({
  setShowChannelForChat: () => {
    dispatch({
      type: "SET_CHAT_SHOW_CHANNEL",
      payload: true,
    });
  },
  setGroupIDForChat: (groupID) => dispatch(setGroupIDForChat(groupID)),
  setIsUserComingFromStaffingForChat: (status) =>
    dispatch(setIsUserComingFromStaffingForChat(status)),
  setShowChannelAndHideChannelListOnMobile: (status) =>
    dispatch(setShowChannelAndHideChannelListOnMobile(status)),
  setHasDoneChatBeforeForChat: (status) =>
    dispatch(setHasDoneChatBeforeForChat(status)),
  setGlobalChannelOne: (globalChannelOne) =>
    dispatch(setGlobalChannelOne(globalChannelOne)),
  maximizeGlobalChat: () => {
    dispatch({
      type: "MAXIMIZE_GLOBAL_CHAT",
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(InitChatButton);
