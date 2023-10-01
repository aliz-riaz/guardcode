import React, { useEffect, useState, useRef, useContext } from "react";
import { connect } from "react-redux";
import styles from "./RecentChat.module.scss";
import { socket } from "../../../lib/SocketProvider";
import _ from "lodash";
import { setGlobalChannelOne } from "../../../redux/actions/globalChatAction";
import { useRouter } from "next/router";
import moment from "moment";
import { Spinner } from "reactstrap";
import RecentChatEmptyState from "../RecentChat/RecentChatEmptyState";

const RecentChat = (props) => {
  const router = useRouter();
  const markMsgsAsRead = (chatDetails) => {
    socket.emit("markRead", {
      group_id: chatDetails.group_id,
      sender_id: props.employers_user_id,
      reciever_id: chatDetails.users[0].id,
      sender_type: "EMPLOYER",
      type: "MARK_GROUP_MESSAGES_READ",
    });

    socket.emit("groupChatTeamAccess", {
      requested_type: "myChat",
      requestedPage: props.currentPage,
      isSkip: props.isSkip,
    });

    setTimeout(() => {
      socket.emit("groupChatDashboard", {});
    }, 100);
  };

  const globalChatClickHandler = (chatDetails) => {
    props.setGlobalChannelOne({
      userOnlineStatus: null,
      isTyping: false,
      show: true,
      is_minimized: false,
      groupID: chatDetails.group_id,
      isChannelBlocked: chatDetails.group.is_blocked,
      unReadMsgs: false,
    });
    markMsgsAsRead(chatDetails);
  };

  const [listOfGroupChatDashboard, setListOfGroupChatDashboard] = useState([]);

  const getListOfGroupDashboard = () => {
    socket.emit("groupChatDashboard", {});
    socket.on("listOfGroupChatDashboard", (data, error) => {
      if (data.requestStatus == "success") {
        setListOfGroupChatDashboard(data);
      } else {
        console.error("Something went wrong in listOfGroupChat event", data);
        toast.error("Something went wrong, Please try again!");
      }
    });
  };

  useEffect(() => {
    getListOfGroupDashboard();
    return () => {
      socket.removeAllListeners("listOfGroupChatDashboard");
      socket.removeAllListeners("output");
    };
  }, []);

  const getFileName = (file) => {
    return file.substring(file.lastIndexOf("/") + 1);
  };

  return (
    <div className={`${styles.recent_chats}`}>
      <h4 className={`${styles.heading}`}>Recent Chats</h4>
      <>
        <div className={`${styles.card}`}>
          {listOfGroupChatDashboard.length === 0 ? (
            <div className={`${styles.loader_wrap}`}>
              {[1, 2, 3].map((item) => {
                return (
                  <div
                    className={`d-flex ${styles.chat_list}`}
                    onClick={() => {
                      globalChatClickHandler(listOfRecentGroupChats);
                    }}
                  >
                    <div
                      className={`flex-shrink-0 ${styles.user_img} rounded-circle animated_shimmer mb-0`}
                    >
                      <img
                        src={process.env.APP_URL + "/images/user-1.jpg"}
                        alt="user image"
                      />
                    </div>
                    <div className={`${styles.content}`}>
                      <h4 className="w-100">
                        <strong className="animated_shimmer w-100 mw-100 mb-0">
                          Referral Two
                        </strong>
                        <span className="animated_shimmer mb-0 w-100 mw-100">
                          Yes, I am available
                        </span>
                        <span
                          className={`${styles.time} animated_shimmer w-100 mw-100 mb-0`}
                        >
                          3 months ago
                        </span>
                      </h4>
                    </div>
                  </div>
                );
              })}
              <button
                className={`${styles.button_style} animated_shimmer mb-0`}
              >
                View all chats
              </button>
            </div>
          ) : listOfGroupChatDashboard.data.length > 0 ? (
            listOfGroupChatDashboard.data.map(
              (listOfRecentGroupChats, index) => (
                <>
                  <div
                    className={`d-flex ${styles.chat_list}`}
                    onClick={() => {
                      globalChatClickHandler(listOfRecentGroupChats);
                    }}
                  >
                    <div className={`flex-shrink-0 ${styles.user_img}`}>
                      <img
                        src={`${listOfRecentGroupChats.users[0].picture}`}
                        alt="user image"
                      />
                    </div>
                    <div className={`${styles.content}`}>
                      <h4>
                        <strong>{`${listOfRecentGroupChats.users[0].firstname} ${listOfRecentGroupChats.users[0].lastname}`}</strong>
                        <span>
                          {listOfRecentGroupChats.latest_message.last_message
                            .message ? (
                            listOfRecentGroupChats.latest_message.last_message
                              .message
                          ) : (
                            <>
                              <div
                                className={`${styles.img} d-flex align-items-center`}
                              >
                                <img
                                  src={`${process.env.APP_URL}/images/document_img.svg`}
                                  height="14px"
                                  width="14px"
                                  className="mr-1"
                                />
                                {getFileName(
                                  listOfRecentGroupChats.latest_message
                                    .last_message?.file
                                )}
                              </div>
                            </>
                          )}
                        </span>
                        <span className={styles.time}>
                          {moment(
                            listOfRecentGroupChats.latest_message.last_message
                              .createdAt
                          ).fromNow()}
                        </span>
                      </h4>
                      {listOfRecentGroupChats.latest_message.unreadMessageCount
                        .length > 0 && (
                        <span className={`${styles.badge}`}>
                          {
                            listOfRecentGroupChats.latest_message
                              .unreadMessageCount[0].count
                          }
                        </span>
                      )}
                    </div>
                  </div>
                  {index == 2 && (
                    <button
                      className={styles.button_style}
                      onClick={() => router.push("/chat")}
                    >
                      View all chats
                    </button>
                  )}
                </>
              )
            )
          ) : (
            <RecentChatEmptyState />
          )}
        </div>
      </>
    </div>
  );
};

const mapStateToProps = (state) => ({
  employers_user_id: state.vantage.userDataReducer.user_id,

  currentPage: state.vantage.chatReducer.currentPage,
  isSkip: state.vantage.chatReducer.isSkip,
});

const mapDispatchToProps = (dispatch) => ({
  setGlobalChannelOne: (globalChannelOne) =>
    dispatch(setGlobalChannelOne(globalChannelOne)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecentChat);
