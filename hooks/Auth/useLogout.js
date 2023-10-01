import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { userLogoutAction } from "../../redux/actions/login";
import { socket } from "../../lib/SocketProvider";
import Logout from "./Logout";
import _ from "lodash";
import { useState } from "react";

function useLogout(props) {
  const { mutate, isLoading } = Logout();
  const router = useRouter();
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);

  const cleanGlobalStateAndRedirectToLogin = () => {
    if (!_.isEmpty(socket)) {
      socket.disconnect();
    }
    removeCookie("user", {
      path: "/",
    });
    router.push("/login").then(() => {
      props.userLogoutActionTemp();
      props.resetJobReducer();
    });
  };

  const cleanGlobalState = () => {
    if (!_.isEmpty(socket)) {
      socket.disconnect();
    }
    removeCookie("user", {
      path: "/",
    });
    props.userLogoutActionTemp();
    props.resetJobReducer();
  };

  const logout = () => {
    mutate(
      {},
      {
        onSuccess: cleanGlobalStateAndRedirectToLogin,
      }
    );
  };
  return {
    logout,
    isLoading,
    cleanGlobalStateAndRedirectToLogin,
    cleanGlobalState,
  };
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  userLogoutAction: userLogoutAction,
  userLogoutActionTemp: () => dispatch(userLogoutAction()),
  resetJobReducer: () => dispatch({ type: "RESET_STAFFING_REDUCER" }),
});

export default useLogout;
