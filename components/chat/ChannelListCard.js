import { socket } from "../../lib/SocketProvider";
import {
  setShowChannelForChat,
  setGroupIDForChat,
  setIsUserComingFromStaffingForChat,
  setHasDoneChatBeforeForChat,
  setShowChannelAndHideChannelListOnMobile,
  setIsChannelBlocked,
} from "../../redux/actions/chatAction";
import { connect } from "react-redux";
import styles from "./ChannelListCard.module.scss";
import moment from "moment";
import { isMobile } from "react-device-detect";

const ChannelListCard = (props) => {
  const arrIndex = 0;

  const ChannelListCardClickHandler = () => {
    if (isMobile) {
      props.setShowChannelAndHideChannelListOnMobile(true);
    }
    props.setShowChannelForChat(true);
    props.setGroupIDForChat(props.data.group_id);
    props.setIsChannelBlocked(props.data.group.is_blocked);
    props.setIsUserComingFromStaffingForChat(false);
    props.setHasDoneChatBeforeForChat(true);
    socket.emit("markRead", {
      group_id: props.data.group_id,
      sender_id: props.employers_user_id,
      reciever_id: props.data.users[arrIndex].id,
      sender_type: "EMPLOYER",
      type: "MARK_GROUP_MESSAGES_READ",
    });

    socket.emit("groupChat", {
      groups: {
        user_id: props.employers_user_id,
        type: "GET_GROUPS",
      },
    });
  };
  const getFileName = (file) => {
    return file.substring(file.lastIndexOf("/") + 1);
  };

  const markUnreadChecker =
    props.data.latest_message[arrIndex]?.sender_type == "JOBSEEKER" &&
    !props.data.latest_message[arrIndex]?.is_read &&
    props.data.group_id != props.chat_group_id &&
    props.unread_message_count != 0;

  return (
    <div
      className={`cursor-pointer ${styles.channel_card} ${
        props.data.group_id == props.chat_group_id && styles.active
      }`}
      onClick={ChannelListCardClickHandler}
    >
      <div className={`${styles.channel_card_inner}`}>
        {props.data.applications.length > 0 && (
          <span className={`${styles.job_name}`}>
            {props.data.applications[0].title ==
            `Chatting with ${props.company_name}`
              ? `Chatting with ${props.data.users[arrIndex].firstname} ${props.data.users[arrIndex].lastname}`
              : props.data.applications[0].title}
          </span>
        )}
        {props.data.users.length > 0 && (
          <div className={`d-flex  ${styles.channel_card_row}`}>
            <div className={`flex-shrink-0 ${styles.card_img}`}>
              <img
                src={
                  props.data.users[arrIndex].picture ||
                  `${process.env.APP_URL}/images/defaultAvatar.png`
                }
                width="50"
                height="60"
                className="img-fluid"
              />
            </div>
            <div className={`flex-grow-1 ${styles.card_cont}`}>
              <h4 className={`mb-0 d-flex`}>
                <span>{`${props.data.users[arrIndex].firstname}  ${props.data.users[arrIndex].lastname}`}</span>
                {props.data.latest_message.length > 0 && (
                  <span className={`ml-auto ${styles.time} fw-normal`}>
                    {moment(props.data.latest_message[0].createdAt).fromNow()}
                  </span>
                )}
              </h4>
              <p
                className={`${styles.latest_message} ${
                  markUnreadChecker && "fw-bold"
                }`}
              >
                {props.data.latest_message.length > 0 ? (
                  props.data.latest_message[arrIndex]?.message ? (
                    props.data.latest_message[arrIndex]?.message
                  ) : (
                    <>
                      <div
                        className={`${styles.img} d-flex align-items-center`}
                      >
                        <span>
                          <img
                            src={`${process.env.APP_URL}/images/document_img.svg`}
                          />
                        </span>
                        <span className="fs-7 text-black-50 mt-1 ml-1">
                          {getFileName(
                            props.data.latest_message[arrIndex]?.file
                          )}
                        </span>
                      </div>
                    </>
                  )
                ) : null}
              </p>
              {markUnreadChecker && (
                <span className={`${styles.unread_status}`}></span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  is_user_login: state.vantage.userDataReducer.is_user_login,
  employers_user_id: state.vantage.userDataReducer.user_id,
  chat_group_id: state.vantage.chatReducer.groupID,
  unread_message_count: state.vantage.chatReducer.unReadMessageCount,
  company_name: state.vantage.userDataReducer.user_name,
});

const mapDispatchToProps = (dispatch) => ({
  setShowChannelForChat: (status) => dispatch(setShowChannelForChat(status)),
  setGroupIDForChat: (groupID) => dispatch(setGroupIDForChat(groupID)),
  setIsUserComingFromStaffingForChat: (status) =>
    dispatch(setIsUserComingFromStaffingForChat(status)),
  setHasDoneChatBeforeForChat: (status) =>
    dispatch(setHasDoneChatBeforeForChat(status)),
  setShowChannelAndHideChannelListOnMobile: (status) =>
    dispatch(setShowChannelAndHideChannelListOnMobile(status)),
  setIsChannelBlocked: (status) => dispatch(setIsChannelBlocked(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelListCard);
