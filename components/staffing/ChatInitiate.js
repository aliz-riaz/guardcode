import React, { useState, useEffect } from "react";
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
const ChatInitiate = (props) => {
  const [disableChatInit, setDisableChatInit] = useState(false);
  const router = useRouter();

  const firstTimeChat = (uuid) => {
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
            // "phone": props.employers_mobile_number,
            phone: "03032856025",
            type: "EMPLOYER",
          },
          {
            id: props.swp_profile_to_be_shown.id,
            firstname: props.swp_profile_to_be_shown.first_name,
            lastname:
              props.swp_profile_to_be_shown.middle_name &&
              props.swp_profile_to_be_shown.middle_name != ""
                ? `${props.swp_profile_to_be_shown.middle_name} ${props.swp_profile_to_be_shown.last_name}`
                : props.swp_profile_to_be_shown.last_name,
            picture: props.swp_profile_to_be_shown.profile_picture,
            email: props.swp_profile_to_be_shown.email_address,
            phone: props.swp_profile_to_be_shown.mobile_number,
            type: "JOBSEEKER",
          },
        ],
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

  const intiateChat = () => {
    setDisableChatInit(true);
    socket.emit("checkGroupExist", {
      user: {
        id: props.swp_profile_to_be_shown.id,
        type: "JOBSEEKER",
      },
    });
  };

  useEffect(() => {
    if (!_.isEmpty(socket)) {
      socket.on("groupExist", (data) => {
        if (data.requestStatus == "success") {
          if (!isMobile) {
            // props.g_chat_one
            // props.setGlobalChannelOne
            if (data.data.hasRoom) {
              hasDoneChatBefore(data.data.group_id);
              props.setGlobalChannelOne({
                show: true,
                is_minimized: false,
                groupID: data.data.group_id,
                userOnlineStatus: null,
                isChannelBlocked: false,
                isTyping: false,
                isFileUploading: false,
                imageToBeShownInMsgImgPreview: null,
                modalPreview: false,
              });
              // props.setGroupIDForChat(data.data.group_id);
              // props.setHasDoneChatBeforeForChat(true);
            } else {
              const uuid = uniqid("group-").toString();
              firstTimeChat(uuid);
              setTimeout(() => {
                props.setGlobalChannelOne({
                  show: true,
                  is_minimized: false,
                  groupID: uuid,
                  userOnlineStatus: null,
                  isChannelBlocked: false,
                  isTyping: false,
                  isFileUploading: false,
                  imageToBeShownInMsgImgPreview: null,
                  modalPreview: false,
                });
                // socket.emit("groupChat", {
                //   groups: {
                //     user_id: props.employers_user_id,
                //     type: "GET_GROUPS",
                //   },
                // })

                socket.emit("groupChatTeamAccess", {
                  requested_type:
                    props.organisationFilters.chat.switchValue ===
                    "My Conversations"
                      ? "myChat"
                      : "allChat",
                  requestedPage: props.currentPage,
                  isSkip: props.isSkip,
                });
              }, 400);

              // props.setGroupIDForChat(uuid);
              // props.setGroupIDForChat(null)
              // props.setHasDoneChatBeforeForChat(false);
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
              firstTimeChat(uuid);
              props.setGroupIDForChat(uuid);
              // props.setGroupIDForChat(null)
              props.setHasDoneChatBeforeForChat(false);
            }
            props.setShowChannelForChat(true);
            props.setIsUserComingFromStaffingForChat(true);
            if (isMobile) {
              props.setShowChannelAndHideChannelListOnMobile(true);
            }
            router.push("/chat");
          }
          setDisableChatInit(false);
        } else {
          console.error("Something went wrong in groupExist event:", data);
          toast.error("Something went wrong, Please try again!");
        }
      });
    }
    return () => {
      socket?.removeAllListeners("groupExist");
    };
  }, [props.swp_profile_to_be_shown]);

  return (
    <>
      <button
        disable={disableChatInit}
        className={`btn btn-md btn-green ${props.style && props.style}`}
        onClick={intiateChat}
      >
        {props.chatIcon && (
          <img
            src={`${process.env.APP_URL}/images/chat.svg`}
            width={"18"}
            height={"19"}
          />
        )}{" "}
        Chat
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
  setShowChannelForChat: (status) => dispatch(setShowChannelForChat(status)),
  setGroupIDForChat: (groupID) => dispatch(setGroupIDForChat(groupID)),
  setIsUserComingFromStaffingForChat: (status) =>
    dispatch(setIsUserComingFromStaffingForChat(status)),
  setShowChannelAndHideChannelListOnMobile: (status) =>
    dispatch(setShowChannelAndHideChannelListOnMobile(status)),
  setHasDoneChatBeforeForChat: (status) =>
    dispatch(setHasDoneChatBeforeForChat(status)),
  setGlobalChannelOne: (globalChannelOne) =>
    dispatch(setGlobalChannelOne(globalChannelOne)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatInitiate);
