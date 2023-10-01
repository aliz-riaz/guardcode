import { socket } from "../../../lib/SocketProvider";
import { connect } from "react-redux";
import styles from "./GlobalChannelListCard.module.scss";
import moment from "moment";
import {
  setGlobalChannelOne,
  setGlobalChannelTwo,
} from "../../../redux/actions/globalChatAction";
import { setIsCurrentPage } from "../../../redux/actions/chatAction";

const GlobalChannelListCard = (props) => {
  const arrIndex = 0;

  const markMsgsAsRead = () => {
    socket.emit("markRead", {
      group_id: props.data.group_id,
      sender_id: props.employers_user_id,
      reciever_id: props.data.users[arrIndex].id,
      sender_type: "EMPLOYER",
      type: "MARK_GROUP_MESSAGES_READ",
    });

    props.setChannelList(
      props.channelList.map((channel, indx) => {
        if (
          props.currentIndex == indx &&
          props.channelList[props.currentIndex].latest_message.length > 0
        ) {
          return {
            ...props.channelList[props.currentIndex],
            latest_message: [
              {
                ...props.channelList[props.currentIndex].latest_message[
                  arrIndex
                ],
                is_read: true,
              },
            ],
          };
        } else {
          return channel;
        }
      })
    );
    // socket.emit("groupChat", {
    //   groups: {
    //     user_id: props.employers_user_id,
    //     type: "GET_GROUPS",
    //   },
    // });

    // socket.emit("groupChatTeamAccess", {
    //   requested_type: "myChat",
    //   requestedPage: props.currentPage,
    //   isSkip: props.isSkip,
    // });
    setTimeout(() => {
      socket.emit("groupChatDashboard", {});
    }, 100);
  };

  const ChannelListCardClickHandler = () => {
    //clear the search if search
    if (props.searchField != "") {
      props.setSearchField("");
    }
    // props.setIsCurrentPage(1);
    props.setGlobalChannelOne({
      userOnlineStatus: null,
      isTyping: false,
      show: true,
      is_minimized: false,
      groupID: props.data.group_id,
      isChannelBlocked: props.data.group.is_blocked,
      unReadMsgs: false,
    });
    markMsgsAsRead();
  };

  const getFileName = (file) => {
    return file.substring(file.lastIndexOf("/") + 1);
  };
  const markUnreadChecker =
    props.data.latest_message[arrIndex]?.sender_type == "JOBSEEKER" && // true
    !props.data.latest_message[arrIndex]?.is_read && // true
    (props.data.group_id != props.g_chat_one?.groupID ||
      props.data.group_id != props.g_chat_two?.groupID) && // true
    props.unread_message_count != 0;

  return (
    <>
      <div
        className={`${styles.global_channel_list_card} d-flex position-relative  cursor-pointer`}
        onClick={ChannelListCardClickHandler}
      >
        <div className={`${styles.avatar} rounded-circle flex-shrink-0`}>
          <img
            src={
              props.data.users[arrIndex].picture ||
              `${process.env.APP_URL}/images/defaultAvatar.png`
            }
            className="img-fluid"
            alt="User Profile"
          />
        </div>
        <div className={`${styles.card_content} flex-grow-1 ml-2`}>
          <h3
            className={`${styles.name} mb-0 fw-medium`}
          >{`${props.data.users[arrIndex].firstname}  ${props.data.users[arrIndex].lastname}`}</h3>
          {props.data.latest_message.length > 0 && (
            <span className={`ml-auto ${styles.time} fw-normal text-black-50`}>
              {moment(props.data.latest_message[0].createdAt).fromNow()}
            </span>
          )}
          <p
            className={`${styles.latest_message} ${
              markUnreadChecker && styles.unread_message
            } text-black-50 fs-7 mb-0`}
          >
            {props.data.latest_message.length > 0 ? (
              props.data.latest_message[arrIndex]?.message ? (
                props.data.latest_message[arrIndex]?.message
              ) : (
                <>
                  <div className={`${styles.img} d-flex align-items-center`}>
                    <span>
                      <img
                        src={`${process.env.APP_URL}/images/document_img.svg`}
                      />
                    </span>
                    <span
                      className={`${styles.latest_message} fs-7 text-black-50 mt-1 ml-1`}
                    >
                      {getFileName(props.data.latest_message[arrIndex]?.file)}
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
    </>
  );
};
const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  is_user_login: state.vantage.userDataReducer.is_user_login,
  employers_user_id: state.vantage.userDataReducer.user_id,
  chat_group_id: state.vantage.chatReducer.groupID,
  unread_message_count: state.vantage.chatReducer.unReadMessageCount,

  g_chat_one: state.vantage.globalChatReducer.globalChannelOne,
  g_chat_two: state.vantage.globalChatReducer.globalChannelTwo,

  currentPage: state.vantage.chatReducer.currentPage,
  isSkip: state.vantage.chatReducer.isSkip,
});

const mapDispatchToProps = (dispatch) => ({
  setGlobalChannelOne: (globalChannelOne) =>
    dispatch(setGlobalChannelOne(globalChannelOne)),
  setGlobalChannelTwo: (globalChannelTwo) =>
    dispatch(setGlobalChannelTwo(globalChannelTwo)),
  setIsCurrentPage: (page) => dispatch(setIsCurrentPage(page)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalChannelListCard);
