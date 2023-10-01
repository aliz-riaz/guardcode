import React, { useEffect, useState, useContext, useRef } from "react";
import { connect } from "react-redux";
import { resetBookingReducerAction } from "../../../redux/actions/bookingAction";
import ChannelList from "./OrganisationChannelList";
import Channel from "./OrganisationChannel";
import {
  setShowChannelForChat,
  setHasDoneChatBeforeForChat,
  setGroupIDForChat,
  setIsCurrentPage,
  setIsSkip,
} from "../../../redux/actions/chatAction";
import NoConverstaionSelected from "./OrganisationNoConverstaionSelected";
import EmptyStateForChat from "./OrganisationEmptyStateForChat";
import _ from "lodash";
import { socket } from "../../../lib/SocketProvider";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import OrganisationChannelListShimmer from "./OrganisationChannelListShimmer";

const OrganisationChat = (props) => {
  if (_.isEmpty(socket)) {
    return <div>Loading...</div>;
  }

  const [channelList, setChannelList] = useState(null);
  const [serachList, setSerachList] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [hasMoreChannels, setHasMoreChannels] = useState(false);
  const channelDivRef = useRef(null);

  useEffect(() => {
    if (searchField != "") {
      socket.emit("searchGroup", {
        searchBy: searchField,
        searchType:
          props.organisationFilters.chat.switchValue === "My Conversations"
            ? "myChat"
            : "allChat",
        ...(props.organisationFilters.chat.seletedTeamMembers.length > 0 && {
          filtered_by_ids:
            props.organisationFilters.chat.seletedTeamMembers.map((val) => {
              return val.id;
            }),
        }),
      });
    } else {
      props.setIsCurrentPage(1);
    }
  }, [searchField, props.organisationFilters.chat.seletedTeamMembers]);

  useEffect(() => {
    setChannelList(null);
    setSerachList([]);
    setSearchField("");
    setHasMoreChannels(false);
  }, [props.organisationFilters.chat.switchValue]);

  useEffect(() => {
    if (channelDivRef.current && props.currentPage == 1) {
      channelDivRef.current.scrollTop = 0;
    }
    socket.emit("groupChatTeamAccess", {
      requested_type:
        props.organisationFilters.chat.switchValue === "My Conversations"
          ? "myChat"
          : "allChat",
      requestedPage: props.currentPage,
      isSkip: props.isSkip,
      ...(props.organisationFilters.chat.seletedTeamMembers.length > 0 && {
        filtered_by_ids: props.organisationFilters.chat.seletedTeamMembers.map(
          (val) => {
            return val.id;
          }
        ),
      }),
    });
    socket.on("listOfGroupChatTeamAccess", (data, error) => {
      if (data.requestStatus == "success") {
        if (data.data.currentPage == 1) {
          props.setIsCurrentPage(1);
        }
        setChannelList((prev) =>
          prev?.length > 0 &&
          props.currentPage > 1 &&
          data.data.currentPage != 1
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
  }, [
    props.currentPage,
    props.organisationFilters.chat.switchValue,
    props.organisationFilters.chat.seletedTeamMembers,
  ]);

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
          //   requested_type:
          //     props.organisationFilters.chat.switchValue === "My Conversations"
          //       ? "myChat"
          //       : "allChat",
          //   requestedPage: 1,
          //   isSkip: props.isSkip,
          // });
          props.setIsCurrentPage(1);
        }
      } else {
        console.error("Something went wrong in output event", data);
        toast.error("Something went wrong, Please try again!");
      }
    });
    return () => {
      socket.removeAllListeners("listOfSearchGroupChat");
      socket.removeAllListeners("output");
      props.setShowChannelForChat(false);
      props.setHasDoneChatBeforeForChat(false);
      props.setGroupIDForChat(null);
      props.setIsCurrentPage(1);
    };
  }, []);

  const fetchMoreChannels = () => {
    props.setIsCurrentPage(props.currentPage + 1);
  };

  return (
    <>
      {channelList ? (
        <div className="d-flex w-100">
          {channelList?.length > 0 ? (
            <>
              <ChannelList
                channelDivRef={channelDivRef}
                channelList={searchField == "" ? channelList : serachList}
                setChannelList={
                  searchField == "" ? setChannelList : setSerachList
                }
                serachList={serachList}
                searchField={searchField}
                setSearchField={setSearchField}
                organisationFilters={props.organisationFilters}
                hasMore={hasMoreChannels}
                fetchMoreChannels={fetchMoreChannels}
              />
              {props.show_chat_channel ? (
                <Channel
                  searchField={searchField}
                  setSearchField={setSearchField}
                  setChannelList={
                    searchField == "" ? setChannelList : setSerachList
                  }
                />
              ) : (
                <NoConverstaionSelected
                  organisationIsFullAccess={
                    props.userMenusAccess.find(
                      (element) =>
                        element.title == "Chat" &&
                        element.access_level == "FULL"
                    ) && props.organisationMembers?.length > 0
                  }
                />
              )}
            </>
          ) : (
            <EmptyStateForChat />
          )}
        </div>
      ) : (
        <div className="d-flex w-100">
          <OrganisationChannelListShimmer />
          <NoConverstaionSelected />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  employers_user_id: state.vantage.userDataReducer.user_id,
  show_chat_channel: state.vantage.chatReducer.showChannel,
  chat_group_id: state.vantage.chatReducer.groupID,
  currentPage: state.vantage.chatReducer.currentPage,
  isSkip: state.vantage.chatReducer.isSkip,
  user_email: state.vantage.userDataReducer.user_email,

  organisationFilters: state.vantage.organisationReducer.filter,
  organisationIsFullAccess: state.vantage.organisationReducer.isFullAccess,
  userMenusAccess: state.vantage.organisationReducer.userMenusAccess,
  organisationMembers: state.vantage.organisationReducer.organisationMembers,
});

const mapDispatchToProps = (dispatch) => ({
  resetBookingReducerActionTemp: () => dispatch(resetBookingReducerAction()),
  setShowChannelForChat: (status) => dispatch(setShowChannelForChat(status)),
  setHasDoneChatBeforeForChat: (status) =>
    dispatch(setHasDoneChatBeforeForChat(status)),
  setGroupIDForChat: (groupID) => dispatch(setGroupIDForChat(groupID)),
  setIsCurrentPage: (page) => dispatch(setIsCurrentPage(page)),
  setIsSkip: (status) => dispatch(setIsSkip(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrganisationChat);
