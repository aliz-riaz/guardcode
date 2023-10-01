import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import { resetBookingReducerAction } from "../../redux/actions/bookingAction";
import ChannelList from "./ChannelList";
import Channel from "./Channel";
import {
  setShowChannelForChat,
  setHasDoneChatBeforeForChat,
  setGroupIDForChat,
} from "../../redux/actions/chatAction";
import NoConverstaionSelected from "./NoConverstaionSelected";
import EmptyStateForChat from "./EmptyStateForChat";
import _ from "lodash";
import { socket } from "../../lib/SocketProvider";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

const Chat = (props) => {
  if (_.isEmpty(socket)) {
    return <div>Loading...</div>;
  }

  const [channelList, setChannelList] = useState(null);
  const [serachList, setSerachList] = useState([]);
  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    if (searchField != "") {
      socket.emit("searchGroup", {
        searchBy: searchField,
      });
    }
  }, [searchField]);

  useEffect(() => {
    socket.emit("groupChat", {
      groups: {
        user_id: props.employers_user_id,
        type: "GET_GROUPS",
      },
    });
    socket.on("listOfGroupChat", (data, error) => {
      if (data.requestStatus == "success") {
        setChannelList(data.data);
      } else {
        console.error("Something went wrong in listOfGroupChat event", data);
        toast.error("Something went wrong, Please try again!");
      }
    });
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

    // }
    socket.on("output", (data) => {
      if (data.requestStatus == "success") {
        if (data.eventName == "markRead" && data.messageType == "success") {
          socket.emit("groupChat", {
            groups: {
              user_id: props.employers_user_id,
              type: "GET_GROUPS",
            },
          });
        }
      } else {
        console.error("Something went wrong in output event", data);
        toast.error("Something went wrong, Please try again!");
      }
    });
    return () => {
      socket.removeAllListeners("listOfGroupChat");
      socket.removeAllListeners("listOfSearchGroupChat");
      socket.removeAllListeners("output");
      props.setShowChannelForChat(false);
      props.setHasDoneChatBeforeForChat(false);
      props.setGroupIDForChat(null);
    };
  }, []);

  return (
    <>
      {channelList ? (
        <div className="d-flex w-100">
          {channelList?.length > 0 ? (
            <>
              <ChannelList
                channelList={searchField == "" ? channelList : serachList}
                serachList={serachList}
                searchField={searchField}
                setSearchField={setSearchField}
              />
              {props.show_chat_channel ? (
                <Channel
                  searchField={searchField}
                  setSearchField={setSearchField}
                />
              ) : (
                <NoConverstaionSelected />
              )}
            </>
          ) : (
            <EmptyStateForChat />
          )}
        </div>
      ) : (
        <div className="main-content d-flex align-items-center justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden"></span>
          </Spinner>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  employers_user_id: state.vantage.userDataReducer.user_id,
  show_chat_channel: state.vantage.chatReducer.showChannel,
  chat_group_id: state.vantage.chatReducer.groupID,
  user_email: state.vantage.userDataReducer.user_email,
});

const mapDispatchToProps = (dispatch) => ({
  resetBookingReducerActionTemp: () => dispatch(resetBookingReducerAction()),
  setShowChannelForChat: (status) => dispatch(setShowChannelForChat(status)),
  setHasDoneChatBeforeForChat: (status) =>
    dispatch(setHasDoneChatBeforeForChat(status)),
  setGroupIDForChat: (groupID) => dispatch(setGroupIDForChat(groupID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
