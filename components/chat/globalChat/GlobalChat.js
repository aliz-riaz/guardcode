import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import {
  setShowGlobalChatChannelList,
  setGlobalChannelOne,
  setGlobalChannelTwo,
} from "../../../redux/actions/globalChatAction";
import { setIsCurrentPage, setIsSkip } from "../../../redux/actions/chatAction";
import _ from "lodash";
import { socket } from "../../../lib/SocketProvider";
import { toast } from "react-toastify";
import styles from "./GlobalChat.module.scss";
import GlobalChannelList from "./GlobalChannelList";
import GlobalChannel from "./Channel/GlobalChannel";
import GlobalImagePreviewModal from "./GlobalImagePreviewModal";
import PreviewSWPProfile from "../../staffing/PreviewSWPProfile/previewSWPProfile";

const GlobalChat = (props) => {
  if (_.isEmpty(socket)) {
    return <div>Loading...</div>;
  }

  const [channelList, setChannelList] = useState(null);
  const [serachList, setSerachList] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [userId, setUserId] = useState(null);
  const [tagGLobal, setTagGlobal] = useState(null);
  const channelDivRef = useRef(null);
  const [hasMoreChannels, setHasMoreChannels] = useState(false);

  useEffect(() => {
    if (searchField != "") {
      socket.emit("searchGroup", {
        searchBy: searchField,
        searchType: "myChat",
      });
    }
  }, [searchField]);

  useEffect(() => {
    if (channelDivRef.current && props.currentPage == 1) {
      channelDivRef.current.scrollTop = 0;
    }
    socket.emit("groupChatTeamAccess", {
      requested_type: "myChat",
      requestedPage: props.currentPage,
      isSkip: props.isSkip,
    });
    socket.on("listOfGroupChatTeamAccess", (data, error) => {
      if (data.requestStatus == "success") {
        if (data.data.currentPage == 1) {
          props.setIsCurrentPage(1);
        }
        setChannelList((prev) =>
          prev?.length > 0 && props.currentPage > 1
            ? [...prev, ...data.data.groupData]
            : data.data.groupData
        );
        setHasMoreChannels(data.data.nextPage);
      } else {
        console.error(
          "Something went wrong in listOfGroupChatTeamAccess event",
          data
        );
        toast.error("Something went wrong, Please try again!");
      }
    });
    return () => {
      socket.removeAllListeners("listOfGroupChatTeamAccess");
    };
  }, [props.currentPage]);

  useEffect(() => {
    socket.on("listOfSearchGroupChat", (data, error) => {
      if (data.requestStatus == "success") {
        setSerachList(data.data);
      } else {
        console.error(
          "Something went wrong in listOfSearchGroupChat event",
          data
        );
        toast.error("Something went wrong, Please try again!");
      }
    });
    socket.on("output", (data) => {
      if (data.requestStatus == "success") {
        if (data.eventName == "markRead" && data.messageType == "success") {
          // socket.emit("groupChatTeamAccess", {
          //   requested_type: "myChat",
          //   requestedPage: props.currentPage,
          //   isSkip: props.isSkip,
          // });
          props.setIsCurrentPage(1);
          setTimeout(() => {
            socket.emit("groupChatDashboard", {});
          }, 100);
        }
      } else {
        if (
          (data.data.eventName === "initChat" &&
            data.requestCode === 404 &&
            props.g_chat_one.groupID != null) ||
          (data.data.eventName === "GET_GROUP_MESSAGES" &&
            data.requestCode === 404 &&
            props.g_chat_one.groupID != null)
        ) {
          props.setGlobalChannelOne({
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
        } else {
          console.error("Something went wrong in output event", data);
          toast.error("Something went wrong, Please try again!");
        }
      }
    });
    return () => {
      props.setIsCurrentPage(1);
      socket.removeAllListeners("listOfSearchGroupChat");
      socket.removeAllListeners("output");
      props.setShowGlobalChatChannelList(false);
    };
  }, []);

  const fetchMoreChannels = () => {
    props.setIsCurrentPage(props.currentPage + 1);
  };

  return (
    <>
      <div className={`${styles.global_chat_container}`}>
        {channelList?.length > 0 && (
          <GlobalChannelList
            channelDivRef={channelDivRef}
            channelList={searchField == "" ? channelList : serachList}
            setChannelList={searchField == "" ? setChannelList : setSerachList}
            serachList={serachList}
            searchField={searchField}
            setSearchField={setSearchField}
            hasMore={hasMoreChannels}
            fetchMoreChannels={fetchMoreChannels}
          />
        )}
        {props.g_chat_one?.show && (
          <GlobalChannel
            scrollableDivID={"scrollableDivOne"}
            searchField={searchField}
            setSearchField={setSearchField}
            g_chat_obj={props.g_chat_one}
            setGlobalChannel={props.setGlobalChannelOne}
            setUserId={setUserId}
            setShowProfile={setShowProfile}
            showProfile={showProfile}
            setChannelList={searchField == "" ? setChannelList : setSerachList}
            setTagGlobal={setTagGlobal}
          />
        )}
      </div>
      <GlobalImagePreviewModal
        g_chat_obj={props.g_chat_one}
        setGlobalChannel={props.setGlobalChannelOne}
      />
      {showProfile && (
        <PreviewSWPProfile
          showProfile={showProfile}
          setShowProfile={setShowProfile}
          userID={userId}
          tag={tagGLobal}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  employers_user_id: state.vantage.userDataReducer.user_id,
  show_chat_channel: state.vantage.chatReducer.showChannel,
  chat_group_id: state.vantage.chatReducer.groupID,
  user_email: state.vantage.userDataReducer.user_email,

  g_chat_one: state.vantage.globalChatReducer.globalChannelOne,
  g_chat_two: state.vantage.globalChatReducer.globalChannelTwo,

  currentPage: state.vantage.chatReducer.currentPage,
  isSkip: state.vantage.chatReducer.isSkip,
  show_g_channel_list: state.vantage.globalChatReducer.showGlobalChannelList,
});

const mapDispatchToProps = (dispatch) => ({
  setShowGlobalChatChannelList: (status) =>
    dispatch(setShowGlobalChatChannelList(status)),
  setGlobalChannelOne: (globalChannelOne) =>
    dispatch(setGlobalChannelOne(globalChannelOne)),
  setGlobalChannelTwo: (globalChannelTwo) =>
    dispatch(setGlobalChannelTwo(globalChannelTwo)),
  setIsCurrentPage: (page) => dispatch(setIsCurrentPage(page)),
  setIsSkip: (status) => dispatch(setIsSkip(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GlobalChat);
