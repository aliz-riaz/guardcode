import { connect } from "react-redux";
import moment from "moment";
import { ButtonDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import _ from "lodash";
import styles from "./GlobalChannelHeader.module.scss";
import { useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import GlobalOnlineStatusCheckOne from "./GlobalOnlineStatusCheckOne";
import { useRouter } from "next/router";
import { socket } from "../../../../lib/SocketProvider";
import {
  setGroupIDForChat,
  setHasDoneChatBeforeForChat,
  setShowChannelForChat,
  setIsUserComingFromStaffingForChat,
  setIsChannelBlocked,
} from "../../../../redux/actions/chatAction";
import { setShowCVSearchProfileStatus } from "../../../../redux/actions/cvSearchAction";

const GlobalChannelHeader = (props) => {
  const [dropdownOpen, setDropdownOpenn] = useState(false);
  const [showDetailDropDown, setShowDetailDropDown] = useState(false);

  const router = useRouter();

  const toggle = () => {
    setDropdownOpenn(!dropdownOpen);
  };

  const handleUserBlock = () => {
    props.setChannelList((prev) =>
      prev.map((channel, indx) => {
        if (channel.group_id == props.g_chat_obj?.groupID) {
          return {
            ...channel,
            group: {
              ...channel.group,
              is_blocked: !props.g_chat_obj?.isChannelBlocked,
            },
          };
        } else {
          return channel;
        }
      })
    );
    socket.emit("blockGroup", {
      group_id: props.g_chat_obj?.groupID,
      block: !props.g_chat_obj?.isChannelBlocked,
    });
    toggle(false);
  };

  const viewProfile = (id) => {
    props.g_chat_one.is_minimized === false && props.setShowProfile(true);
    props.setUserId(id);
    props.setShowCVSearchProfileStatus(false);
  };
  const popoverHoverFocus = (
    <Popover id="popover-trigger-hover-focus" title="Popover bottom">
      <strong>Holy guacamole!</strong> Check this info.
    </Popover>
  );

  return (
    <>
      <div
        className={`${styles.channel_header} d-flex justify-content-between align-items-center cursor-pointer`}
        onClick={() => {
          props.setGlobalChannel({
            ...props.g_chat_obj,
            is_minimized: !props.g_chat_obj?.is_minimized,
            unReadMsgs: false,
          });
          socket.emit("markRead", {
            group_id: props.g_chat_obj?.groupID,
            sender_id: props.employers_user_id,
            reciever_id: props.userData.id,
            sender_type: "EMPLOYER",
            type: "MARK_GROUP_MESSAGES_READ",
          });
        }}
      >
        <div className={`${styles.channel_profile} d-flex align-items-center`}>
          <div
            className={`${styles.profile_avatar} flex-shrink-0 rounded-circle 111`}
          >
            <img
              src={
                props.userData.picture ||
                `${process.env.APP_URL}/images/defaultAvatar.png`
              }
              className="img-fluid"
              alt="Profile Image"
              onClick={(e) => {
                e.stopPropagation();
                viewProfile(props.userData.id);
              }}
            />
          </div>

          {props.tagging && Object.keys(props.tagging) != 0 && (
            <OverlayTrigger
              trigger={["hover"]}
              placement="bottom"
              overlay={
                <Popover
                  id="popover-trigger-hover-focus"
                  className={`${styles.tagPopoverBox}`}
                  title="Popover bottom"
                >
                  <div
                    className={`${styles.tagName} fw-medium rounded px-2 py-1`}
                    style={{ backgroundColor: `${props.tagging.color}` }}
                  >
                    {props.tagging.tag_name}
                  </div>
                  <div
                    className={`${styles.tagNotes} bg-black text-white px-2 py-2 mt-2`}
                  >
                    <p className="text-white fs-7 mb-2">
                      {props.tagging.decision_maker_first_name} added this tag
                      on <br />
                      {moment(props.tagging.created_at)
                        .format("DD-MM-YYYY")
                        .toString()}
                    </p>
                    {props.tagging.tag_message && (
                      <p className="mb-0 fs-7 text-white">
                        <strong className="">Notes:</strong>
                        <span className="d-block" style={{ marginTop: "-3px" }}>
                          {props.tagging.tag_message}
                        </span>
                      </p>
                    )}
                  </div>
                </Popover>
              }
            >
              <div className={`${styles.taging} position-absolute aaaa`}>
                <span
                  className={`${styles.status}  rounded-circle d-block`}
                  style={{ backgroundColor: props.tagging.color }}
                ></span>
              </div>
            </OverlayTrigger>
          )}
          <div className={`flex-grow-1 pl-2`}>
            <h5
              className="mb-0 p-0 fw-medium"
              onClick={(e) => {
                e.stopPropagation();
                viewProfile(props.userData.id);
              }}
            >{`${props.userData.firstname} ${props.userData.lastname}`}</h5>
            <span className="d-block" style={{ marginTop: "-4px" }}>
              <GlobalOnlineStatusCheckOne
                userID={props.userData.id}
                g_chat_obj={props.g_chat_obj}
                setGlobalChannel={props.setGlobalChannel}
              />
            </span>
          </div>
        </div>
      </div>
      <div className={`${styles.header_action} align-items-center d-flex`}>
        {props.g_chat_obj.unReadMsgs ? (
          <span className={`${styles.unread_status} mx-3`}>unread</span>
        ) : null}
        <div
          className={`${styles.close_chat} cursor-pointer rounded-circle d-flex align-items-center justify-content-center transition-all-2`}
          onClick={(e) => {
            e.preventDefault();
            props.setGroupIDForChat(props.g_chat_obj.groupID);
            props.setIsChannelBlocked(props.g_chat_obj.isChannelBlocked);
            props.setHasDoneChatBeforeForChat(true);
            props.setShowChannelForChat(true);
            props.setIsUserComingFromStaffingForChat(true);
            router.push("/chat");
          }}
        >
          <img
            src={`${process.env.APP_URL}/images/expand.svg`}
            height={`14px`}
          />
        </div>
        <ButtonDropdown
          isOpen={dropdownOpen}
          toggle={toggle}
          className={`${styles.dropdown_list} mx-1`}
        >
          <DropdownToggle className="p-0 d-flex align-items-center justify-content-center transition-all-2 rounded-circle">
            <img
              src={`${process.env.APP_URL}/images/more-vertical.svg`}
              height={`14px`}
            />
          </DropdownToggle>
          <DropdownMenu className={`${styles.dropdown_menu}`}>
            <ul className="p-0 m-0 cursor-pointer">
              <li onClick={handleUserBlock} className="">
                <div className="fw-medium d-flex ">
                  <i className="d-inline-block flex-shrink-0">
                    <img
                      src={`${process.env.APP_URL}/images/block.svg`}
                      alt="block icon"
                    />
                  </i>
                  <span className="flex-grow-1">
                    {props.g_chat_obj.isChannelBlocked
                      ? "Open conversation"
                      : "End conversation"}
                  </span>
                </div>
              </li>
            </ul>
          </DropdownMenu>
        </ButtonDropdown>

        <div
          className={`${styles.close_chat} cursor-pointer rounded-circle d-flex align-items-center justify-content-center transition-all-2`}
          onClick={() => {
            props.setGlobalChannel({
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
            });
          }}
        >
          <img
            src={`${process.env.APP_URL}/images/cancel_bold.svg`}
            width="12px"
            alt="Close"
          />
        </div>
      </div>
    </>
  );
  // }
};

const mapStateToProps = (state) => ({
  employers_user_id: state.vantage.userDataReducer.user_id,
  chat_group_id: state.vantage.chatReducer.groupID,
  user_has_done_chat_before: state.vantage.chatReducer.setHasDoneChatBefore,
  socket_connection_status: state.vantage.chatReducer.socketConnectionStatus,
  show_chat_channel: state.vantage.chatReducer.showChannel,
  is_channel_blocked: state.vantage.chatReducer.isChannelBlocked,
  g_chat_one: state.vantage.globalChatReducer.globalChannelOne,
});

const mapDispatchToProps = (dispatch) => ({
  setGroupIDForChat: (groupID) => dispatch(setGroupIDForChat(groupID)),
  setHasDoneChatBeforeForChat: (status) =>
    dispatch(setHasDoneChatBeforeForChat(status)),
  setShowChannelForChat: (status) => dispatch(setShowChannelForChat(status)),
  setIsUserComingFromStaffingForChat: (status) =>
    dispatch(setIsUserComingFromStaffingForChat(status)),

  setIsChannelBlocked: (status) => dispatch(setIsChannelBlocked(status)),
  setShowCVSearchProfileStatus: (status) =>
    dispatch(setShowCVSearchProfileStatus(status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalChannelHeader);
