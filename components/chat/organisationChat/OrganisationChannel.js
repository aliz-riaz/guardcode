import { useEffect, useState, useRef } from "react";
import OrganisationMessageInput from "./OrganisationMessageInput";
import OrganisationMessageList from "./OrganisationMessagesList";
import { socket } from "../../../lib/SocketProvider";
import { connect } from "react-redux";
import {
  setGroupIDForChat,
  setIsFileUploading,
  setShowChannelAndHideChannelListOnMobile,
  setIsChannelBlocked,
  setIsTyping,
  setShowChannelForChat,
} from "../../../redux/actions/chatAction";
import ChannelHeader from "./OrganisationChannelHeader";
import styles from "./OrganisationChannel.module.scss";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import { isMobile } from "react-device-detect";

const OrganisationChannel = (props) => {
  const [messageList, setMessageList] = useState([]);
  const [userJobsList, setUserJobsList] = useState([]);
  const [userData, setUserData] = useState({});
  const [tagging, setTagging] = useState({});

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const timelineRef = useRef();

  useEffect(() => {
    timelineRef?.current?.scrollTo(0, timelineRef?.current?.scrollHeight);
    setCurrentPage(1);
    setTotalPages(1);
    setHasMore(true);
    setMessageList([]);
    setUserJobsList([]);
    setUserData({});
    props.setIsTyping(false);
  }, [props.chat_group_id]);

  useEffect(() => {
    if (props.organisationFilters.chat.switchValue === "My Conversations") {
      socket.emit("initChat", {
        groups: {
          uuid: props.chat_group_id,
          user_id: props.employers_user_id,
        },
        type: "joinGroup",
      });
    }
  }, [
    props.organisationFilters.chat.switchValue,
    props.socket_connection_status,
    props.show_chat_channel,
    props.chat_group_id,
  ]);

  useEffect(() => {
    // socket.emit("groupChat", {
    //   groups: {
    //     group_id: props.chat_group_id,
    //     type: "GET_GROUP_MESSAGES",
    //     requestedPage: 1,
    //   },
    // });
    let timeoutId;
    socket.emit("groupChatMessagesTeamAccess", {
      groups: {
        group_id: props.chat_group_id,
        requested_type:
          props.organisationFilters.chat.switchValue === "My Conversations"
            ? "myChat"
            : "allChat",
        requested_page: 1,
      },
    });
    socket.on("listOfGroupChatMessagesTeamAccess", (data) => {
      if (data.requestStatus == "success") {
        if (data.data[0].group_id == props.chat_group_id) {
          setMessageList((prevMessages) =>
            data.data[0].messages[0]?.group_id == props.chat_group_id
              ? [...prevMessages, ...data.data[0].messages]
              : data.data[0].messages
          );
          setCurrentPage(data.data[0].currentPage);
          setTotalPages(data.data[0].totalPages);
          setHasMore(data.data[0].nextPage);
          setUserData(data.data[0].users);
          setUserJobsList(data.data[0].applications);
          setTagging(data.data[0].tagging);
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
        props.setIsChannelBlocked(data.data.isBlocked);
      } else {
        if (
          props.organisationFilters.chat.switchValue === "All Conversations" &&
          data.requestCode === 403
        ) {
        } else {
          console.error("Something went wrong in onBlockGroup event", data);
          toast.error("Something went wrong, Please try again!");
        }
      }
    });

    //jobseeker typing event
    socket.on("typing", (data, error) => {
      if (data.requestStatus == "success") {
        if (data.data.group_id == props.chat_group_id) {
          props.setIsTyping(data.data.isTyping);
        }
      } else {
        console.error("Something went wrong in typing event", data);
        toast.error("Something went wrong, Please try again!");
      }
    });

    socket.on("message", (data) => {
      if (data.requestStatus == "success") {
        if (data.data.group_id == props.chat_group_id) {
          if (data.data.file && data.data.sender_type == "EMPLOYER") {
            props.setIsFileUploading(false);
          }
          setMessageList((prevMessages) => [data.data, ...prevMessages]);
          socket.emit("markRead", {
            group_id: props.chat_group_id,
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
                if (props.chat_group_id == channel.group_id) {
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
          }, 700);
        }
      } else {
        console.error("Something went wrong in message event", data);
        toast.error("Something went wrong, Please try again!");
      }
    });

    return () => {
      socket.removeAllListeners("listOfGroupChatMessagesTeamAccess");
      socket.removeAllListeners("message");
      socket.removeAllListeners("onBlockGroup");
      socket.removeAllListeners("typing");
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [
    props.socket_connection_status,
    props.show_chat_channel,
    props.chat_group_id,
  ]);

  const fetchMoreMessages = () => {
    if (totalPages > currentPage && hasMore) {
      // socket.emit("groupChat", {
      //   groups: {
      //     group_id: props.chat_group_id,
      //     type: "GET_GROUP_MESSAGES",
      //     requestedPage: currentPage + 1,
      //   },
      // });
      socket.emit("groupChatMessagesTeamAccess", {
        groups: {
          group_id: props.chat_group_id,
          requested_type:
            props.organisationFilters.chat.switchValue === "My Conversations"
              ? "myChat"
              : "allChat",
          requested_page: currentPage + 1,
        },
      });
    } else {
      setHasMore(false);
    }
  };

  if (_.isEmpty(userData)) {
    return (
      <div
        className={`${styles.channel_messages_loader} d-flex align-items-center justify-content-center w-100`}
      >
        <Spinner animation="border" role="status"></Spinner>
      </div>
    );
  }

  return (
    <>
      <div
        className={`col-12 col-md-7 ${styles.channel_main} ${
          isMobile && !props.show_channel_and_hide_channel_list_on_mobile
            ? "d-none"
            : ""
        }`}
      >
        <div
          className={`bg-white ${styles.channel_messages} position-relative`}
        >
          {isMobile && props.show_channel_and_hide_channel_list_on_mobile && (
            <span
              className={`${styles.backChannel}  d-md-none`}
              onClick={() => {
                props.setShowChannelAndHideChannelListOnMobile(false);
                props.setShowChannelForChat(false);
              }}
            >
              <img src={`${process.env.APP_URL}/images/chevron-left.svg`} />
            </span>
          )}
          <ChannelHeader
            userData={userData}
            userJobsList={userJobsList}
            tagging={tagging}
            setChannelList={props.setChannelList}
            setTagging={setTagging}
          />
          <div className={`${styles.message_list_wrapper}`}>
            <OrganisationMessageList
              messageList={messageList}
              fetchMoreMessages={fetchMoreMessages}
              hasMore={hasMore}
              innerRef={timelineRef}
              userData={userData}
              organisationIsFullAccess={
                props.userMenusAccess.find(
                  (element) =>
                    element.title == "Chat" && element.access_level == "FULL"
                ) && props.organisationMembers?.length > 0
              }
              organisationFilters={props.organisationFilters}
              // isTyping={props.is_typing}
            />
          </div>
          <OrganisationMessageInput
            userData={userData}
            searchField={props.searchField}
            setSearchField={props.setSearchField}
            timelineRef={timelineRef}
            userJobsList={userJobsList}
            messageList={messageList}
            setChannelList={props.setChannelList}
          />
        </div>
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
  is_file_uploading: state.vantage.chatReducer.isFileUploading,
  show_channel_and_hide_channel_list_on_mobile:
    state.vantage.chatReducer.showChannelAndHideChannelListOnMobile,
  // is_typing: state.vantage.chatReducer.isTyping,

  organisationFilters: state.vantage.organisationReducer.filter,
  organisationIsFullAccess: state.vantage.organisationReducer.isFullAccess,

  userMenusAccess: state.vantage.organisationReducer.userMenusAccess,
  organisationMembers: state.vantage.organisationReducer.organisationMembers,
});

const mapDispatchToProps = (dispatch) => ({
  setGroupIDForChat: (groupID) => dispatch(setGroupIDForChat(groupID)),
  setIsFileUploading: (status) => dispatch(setIsFileUploading(status)),
  setShowChannelAndHideChannelListOnMobile: (status) =>
    dispatch(setShowChannelAndHideChannelListOnMobile(status)),
  setIsChannelBlocked: (status) => dispatch(setIsChannelBlocked(status)),
  setIsTyping: (status) => dispatch(setIsTyping(status)),
  setShowChannelForChat: (status) => dispatch(setShowChannelForChat(status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganisationChannel);
