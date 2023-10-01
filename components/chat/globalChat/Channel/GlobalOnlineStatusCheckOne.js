import { useEffect, useState, useCallback } from "react";
import { socket } from "../../../../lib/SocketProvider";
import moment from "moment";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { setIsTyping } from "../../../../redux/actions/chatAction";
import GlobalIsTyping from "./GlobalIsTyping";

const GlobalOnlineStatusCheck = (props) => {
  const [onlineStatus, setOnlineStatus] = useState(false);
  const [lastSeen, setLastSeen] = useState(false);

  const checkStatus = useCallback(() => {
    socket.emit("checkUserStatus", {
      user_id: props.userID,
      user_type: "JOBSEEKER",
    });
  });

  useEffect(() => {
    socket.on("userOnline", (data) => {
      if (data.requestStatus == "success") {
        if (data.data.status == "offline") {
          props.setIsTyping(false);
        }
        setOnlineStatus(data.data.status);
        setLastSeen(data.data.last_active);
      } else {
        console.error("Something went wrong in userOnline event", data);
        toast.error("Something went wrong, Please try again!");
      }
    });
    return () => {
      socket.removeAllListeners("userOnline");
    };
  }, []);

  useEffect(() => {
    checkStatus();
    const intervalForOnlineCheck = setInterval(checkStatus, 15000);

    return () => {
      clearInterval(intervalForOnlineCheck);
    };
  }, [props.userID]);

  return (
    <>
      {props.g_chat_obj?.isTyping && onlineStatus == "online" ? (
        <GlobalIsTyping />
      ) : onlineStatus == "online" ? (
        <span className="text-success fw-medium fs-7 d-block">
          {onlineStatus}
        </span>
      ) : lastSeen ? (
        <span className="text-black-50 fw-medium fs-7">
          last seen {moment(lastSeen).fromNow()}
        </span>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  // is_typing: state.vantage.chatReducer.isTyping,
});

const mapDispatchToProps = (dispatch) => ({
  setIsTyping: (status) => dispatch(setIsTyping(status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalOnlineStatusCheck);
