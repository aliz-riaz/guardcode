import { useEffect } from "react";
import { connect } from "react-redux";
import { socket, createConneciton } from "../../lib/SocketProvider";
import {
  setSocketConnectionStatus,
  setUnreadMessageCount,
  setIsFileUploading,
  setIsCurrentPage,
  setIsSkip,
} from "../../redux/actions/chatAction";
import { setNotificaitonsToastList } from "../../redux/actions/notificationsActions";
import _ from "lodash";
import { toast } from "react-toastify";
import ToastNotificaiton, {
  toastConfig,
} from "../notifications/ToastNotificaiton";

import { useRouter } from "next/router";

const SocketWrapper = (props) => {
  const router = useRouter();

  useEffect(() => {
    if (
      props.is_user_login &&
      props.organistaionId &&
      props.isFullAccess != null
    ) {
      createConneciton(
        props.user_token,
        props.organistaionId,
        props.userMenusAccess.find(
          (element) => element.title == "Chat" && element.access_level == "FULL"
        )
          ? "FULL"
          : "LIMITED",
        props.company_name
      );
      socket.connect();
    }
    if (!_.isEmpty(socket)) {
      socket.on("connect", function (data) {
        props.setIsFileUploading(false);
        socket.emit("authentication", {});
      });

      socket.on("authenticated", function (data) {
        socket.emit("groupChatDashboard", {});
        props.setSocketConnectionStatus(true);
        // socket.emit("groupChat", {
        //   groups: {
        //     user_id: props.employers_user_id,
        //     type: "GET_GROUPS",
        //   },
        // });

        // to not redirect if user is already redirected
        socket.emit("forceLogoutAndRedirection", {
          actionType: "setRedirectionStatus",
          value: false,
        });

        const checkTeamMemberSelected = {
          requested_type:
            props.organisationFilters.chat.switchValue === "My Conversations"
              ? "myChat"
              : "allChat",
          filtered_by_ids:
            props.organisationFilters.chat.seletedTeamMembers.map((val) => {
              return val.id;
            }),
          requestedPage: 1,
          isSkip: true,
          waprea: "test",
        };

        props.organisationFilters.chat.seletedTeamMembers.length === 0 &&
          delete checkTeamMemberSelected.filtered_by_ids;

        socket.emit("groupChatTeamAccess", checkTeamMemberSelected);
      });
      socket.emit("getUnreadMessagesCount", {
        user_id: props.employers_user_id,
        user_type: "EMPLOYER",
      });

      socket.on("disconnect", (data) => {
        props.setSocketConnectionStatus(false);
      });
    }
    props.setIsCurrentPage(1);
    props.setIsSkip(true);
    return () => {
      if (!_.isEmpty(socket)) {
        socket.removeAllListeners("authenticated");
        socket.removeAllListeners("disconnect");
        socket.disconnect();
      }
    };
  }, [
    props.is_user_login,
    props.organistaionId,
    props.isFullAccess,
    props.userMenusAccess,
  ]);

  useEffect(() => {
    if (!_.isEmpty(socket)) {
      socket?.on("unreadMessageCount", (data) => {
        if (data.requestStatus == "success") {
          props.setUnreadMessageCount(data.data);
        } else {
          console.error("Something went wrong in unreadMessageCount", data);
          toast.error("Something went wrong, Please try again!");
        }
      });

      socket?.on("notification", (data) => {
        if (data.requestStatus == "success") {
          if (
            data.data.notificationType == "jobApply" &&
            !(
              router.pathname.includes("/booking") ||
              router.pathname == "/jobpost"
            )
          ) {
            toast(<ToastNotificaiton data={data.data} />, toastConfig);
          }
        } else {
          console.error("Something went wrong in notification", data);
          toast.error("Something went wrong, Please try again!");
        }
      });
    }
    return () => {
      if (!_.isEmpty(socket)) {
        socket.removeAllListeners("notification");
        socket.removeAllListeners("unreadMessageCount");
      }
    };
  }, [props.is_user_login, router.pathname]);

  props.setSocketConnectionStatus(socket.connected);

  return props.children;
};

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  is_user_login: state.vantage.userDataReducer.is_user_login,
  employers_user_id: state.vantage.userDataReducer.user_id,
  unread_message_count: state.vantage.chatReducer.unReadMessageCount,
  chat_group_id: state.vantage.chatReducer.groupID,

  organistaionId: state.vantage.organisationReducer.organistaionId,
  isFullAccess: state.vantage.organisationReducer.isFullAccess,
  organisationFilters: state.vantage.organisationReducer.filter,
  userMenusAccess: state.vantage.organisationReducer.userMenusAccess,
  company_name: state.vantage.userDataReducer.user_name,
});

const mapDispatchToProps = (dispatch) => ({
  setSocketConnectionStatus: (status) =>
    dispatch(setSocketConnectionStatus(status)),
  setUnreadMessageCount: (unReadCount) =>
    dispatch(setUnreadMessageCount(unReadCount)),
  setIsFileUploading: (status) => dispatch(setIsFileUploading(status)),
  setNotificaitonsToastList: (notificaitonsList) =>
    dispatch(setNotificaitonsToastList(notificaitonsList)),

  setIsCurrentPage: (page) => dispatch(setIsCurrentPage(page)),
  setIsSkip: (status) => dispatch(setIsSkip(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SocketWrapper);
