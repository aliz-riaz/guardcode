import { useEffect, useState, useRef } from "react";
import { socket } from "../../../../lib/SocketProvider";
import { connect } from "react-redux";
import GlobalChannelHeader from "./GlobalChannelHeader";
import styles from "./GlobalChannel.module.scss";
import { toast } from "react-toastify";
import GlobalMessagesList from "./GlobalMessagesList";
import GlobalMessageInput from "./GlobalMessageInput";

const GlobalChannel = (props) => {
  const [messageList, setMessageList] = useState([]);
  const [userJobsList, setUserJobsList] = useState([]);
  const [userData, setUserData] = useState({});

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [tagging, setTagging] = useState({});

  const timelineRef = useRef();

  useEffect(() => {
    timelineRef?.current?.scrollTo(0, timelineRef?.current?.scrollHeight);
    setCurrentPage(1);
    setTotalPages(1);
    setHasMore(true);
    setMessageList([]);
    setUserJobsList([]);
    props.setGlobalChannel({
      ...props.g_chat_obj,
      isTyping: false,
    });
    setIsOpen(false);
  }, [props.g_chat_obj?.groupID]);

  useEffect(() => {
    let timeoutId;
    let timeoutIdForGlobalChat;
    socket.emit("initChat", {
      groups: {
        uuid: props.g_chat_obj?.groupID,
        user_id: props.employers_user_id,
      },
      type: "joinGroup",
    });
    // socket.emit("groupChat", {
    //   groups: {
    //     group_id: props.g_chat_obj?.groupID,
    //     type: "GET_GROUP_MESSAGES",
    //     requestedPage: 1,
    //   },
    // });
    socket.emit("groupChatMessagesTeamAccess", {
      groups: {
        group_id: props.g_chat_obj?.groupID,
        requested_type: "myChat",
        requested_page: 1,
      },
    });
    // setTimeout(() => {
    //   socket.emit("groupChatDashboard", {});
    // }, 100);
    // socket.on("listOfGroupMessages", (data) => {
    socket.on("listOfGroupChatMessagesTeamAccess", (data) => {
      if (data.requestStatus == "success") {
        if (data.data[0].group_id == props.g_chat_obj?.groupID) {
          setMessageList((prevMessages) =>
            data.data[0].messages[0]?.group_id == props.g_chat_obj?.groupID
              ? [...prevMessages, ...data.data[0].messages]
              : data.data[0].messages
          );
          setCurrentPage(data.data[0].currentPage);
          setTotalPages(data.data[0].totalPages);
          setHasMore(data.data[0].nextPage);
          setUserData(data.data[0].users);
          setUserJobsList(data.data[0].applications);
          setTagging(data.data[0].tagging);
          props.setTagGlobal(data.data[0].tagging);
        }
      } else {
        console.error(
          "Something went wrong in listOfGroupChatMessagesTeamAccess event:",
          data
        );
        toast.error("Something went wrong, Please try again!");
      }
    });

    // block user event listener
    socket.on("onBlockGroup", (data, error) => {
      if (data.requestStatus == "success") {
        props.setGlobalChannel({
          ...props.g_chat_obj,
          isChannelBlocked: data.data.isBlocked,
        });
      } else {
        console.error("Something went wrong in onBlockGroup event", data);
        toast.error("Something went wrong, Please try again!");
      }
    });

    //jobseeker typing event
    socket.on("typing", (data, error) => {
      if (data.requestStatus == "success") {
        if (data.data.group_id == props.g_chat_obj?.groupID) {
          props.setGlobalChannel({
            ...props.g_chat_obj,
            isTyping: data.data.isTyping,
          });
        }
      } else {
        console.error("Something went wrong in typing event", data);
        toast.error("Something went wrong, Please try again!");
      }
    });

    socket.on("message", (data) => {
      if (data.requestStatus == "success") {
        if (data.data.group_id == props.g_chat_obj?.groupID) {
          if (timeoutIdForGlobalChat) {
            clearTimeout(timeoutIdForGlobalChat);
          }
          timeoutIdForGlobalChat = setTimeout(() => {
            socket.emit("groupChatDashboard", {});
          }, 100);
          if (data.data.file && data.data.sender_type == "EMPLOYER") {
            props.setGlobalChannel({
              ...props.g_chat_obj,
              isFileUploading: false,
            });
          }
          setMessageList((prevMessages) => [data.data, ...prevMessages]);
          if (!props.g_chat_obj?.is_minimized) {
            socket.emit("markRead", {
              group_id: props.g_chat_obj?.groupID,
              sender_id: props.employers_user_id,
              reciever_id: userData.id,
              sender_type: "EMPLOYER",
              type: "MARK_GROUP_MESSAGES_READ",
            });
            if (timeoutId) {
              clearTimeout(timeoutId);
            }

            timeoutId = setTimeout(() => {
              props.setChannelList((prev) =>
                prev.map((channel, indx) => {
                  if (props.g_chat_obj?.groupID == channel.group_id) {
                    return {
                      ...channel,
                      latest_message: [
                        {
                          ...channel.latest_message[0],
                          is_read: true,
                        },
                      ],
                    };
                  } else {
                    return channel;
                  }
                })
              );
            }, 400);
          } else if (
            data.data.group_id == props.g_chat_obj?.groupID &&
            props.g_chat_obj?.is_minimized
          ) {
            props.setGlobalChannel({
              ...props.g_chat_obj,
              unReadMsgs: true,
            });
          }
        }
      } else {
        console.error("Something went wrong in message event", data);
        toast.error("Something went wrong, Please try again!");
      }
    });

    if (props.g_chat_obj?.is_minimized) {
      socket.removeListener("typing");
    }

    return () => {
      socket.removeListener("listOfGroupChatMessagesTeamAccess");
      socket.removeListener("message");
      socket.removeListener("onBlockGroup");
      socket.removeListener("typing");
      setMessageList([]);
      if (timeoutId) {
        clearTimeout(timeoutId);
        clearTimeout(timeoutIdForGlobalChat);
      }
    };
  }, [
    props.socket_connection_status,
    props.g_chat_obj?.show,
    props.g_chat_obj?.groupID,
    props.g_chat_obj?.is_minimized,
    props.g_chat_obj?.isChannelBlocked,
  ]);

  const fetchMoreMessages = () => {
    if (totalPages > currentPage && hasMore) {
      // socket.emit("groupChat", {
      //   groups: {
      //     group_id: props.g_chat_obj?.groupID,
      //     type: "GET_GROUP_MESSAGES",
      //     requestedPage: currentPage + 1,
      //   },
      // });
      socket.emit("groupChatMessagesTeamAccess", {
        groups: {
          group_id: props.g_chat_obj?.groupID,
          requested_type: "myChat",
          requested_page: currentPage + 1,
        },
      });
    } else {
      setHasMore(false);
    }
  };

  if (_.isEmpty(userData)) {
    return <></>;
  }

  return (
    <>
      <div
        className={`${styles.channel_conversation_container} ${
          props.g_chat_obj?.is_minimized && styles.is_minimized
        }`}
      >
        <GlobalChannelHeader
          userData={userData}
          userJobsList={userJobsList}
          g_chat_obj={props.g_chat_obj}
          setGlobalChannel={props.setGlobalChannel}
          setUserId={props.setUserId}
          setShowProfile={props.setShowProfile}
          showProfile={props.showProfile}
          setChannelList={props.setChannelList}
          tagging={tagging}
        />
        <GlobalMessagesList
          scrollableDivID={props.scrollableDivID}
          messageList={messageList}
          fetchMoreMessages={fetchMoreMessages}
          hasMore={hasMore}
          innerRef={timelineRef}
          userData={userData}
          g_chat_obj={props.g_chat_obj}
          setGlobalChannel={props.setGlobalChannel}
        />

        <GlobalMessageInput
          userData={userData}
          searchField={props.searchField}
          setSearchField={props.setSearchField}
          timelineRef={timelineRef}
          g_chat_obj={props.g_chat_obj}
          setGlobalChannel={props.setGlobalChannel}
          messageList={messageList}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setChannelList={props.setChannelList}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  employers_user_id: state.vantage.userDataReducer.user_id,
  chat_group_id: state.vantage.chatReducer.groupID,
  user_has_done_chat_before: state.vantage.chatReducer.setHasDoneChatBefore,
  socket_connection_status: state.vantage.chatReducer.socketConnectionStatus,
  show_chat_channel: state.vantage.chatReducer.showChannel,
  show_channel_and_hide_channel_list_on_mobile:
    state.vantage.chatReducer.showChannelAndHideChannelListOnMobile,
});

const mapDispatchToProps = (dispatch) => ({
  // setGroupIDForChat: (groupID) => dispatch(setGroupIDForChat(groupID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GlobalChannel);
