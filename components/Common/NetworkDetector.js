import React, { useState, useEffect } from "react";
import { socket } from "../../lib/SocketProvider";
import _ from "lodash";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import styles from "./NetworkDetector.module.scss";

const NetworkDetector = (props) => {
  const [isOnline, setIsOnline] = useState(true);
  const router = useRouter();

  const [showUI, setShowUI] = useState(false);

  useEffect(() => {
    let timeoutId;

    // Check the condition every second
    const checkCondition = () => {
      if (
        !props.socket_connection_status &&
        props.user_token !== "" &&
        props.isOrganisationSelected &&
        isOnline
      ) {
        // Set showUI to true if the condition remains true for more than 3 seconds
        timeoutId = setTimeout(() => setShowUI(true), 3000);
      } else {
        // Reset showUI if the condition becomes false
        clearTimeout(timeoutId);
        setShowUI(false);
      }
    };

    // Start checking the condition when the component mounts
    checkCondition();

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [
    props.socket_connection_status,
    props.user_token,
    props.isOrganisationSelected,
    isOnline,
  ]);

  const reconnectSocket = () => {
    if (
      isOnline &&
      !props.socket_connection_status &&
      !_.isEmpty(socket) &&
      props.user_token != "" &&
      props.isOrganisationSelected
    ) {
      socket.connect();
    }
  };

  useEffect(() => {
    reconnectSocket();
  }, [props.socket_connection_status]);

  useEffect(() => {
    const handleConnectionChange = () => {
      setIsOnline(window.navigator.onLine);
    };

    const handleTabVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // User has come back to the tab, execute your function here
        reconnectSocket();
      }
    };

    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);

    window.addEventListener("visibilitychange", handleTabVisibilityChange);

    return () => {
      window.removeEventListener("online", handleConnectionChange);
      window.removeEventListener("offline", handleConnectionChange);
      window.removeEventListener("visibilitychange", handleTabVisibilityChange);
    };
  }, []);

  return (
    <div>
      {!isOnline && (
        <div className={styles.connection_lost}>
          <p>Connecting...</p>
        </div>
      )}
      {showUI && (
        <div className={`${styles.connection_lost} ${styles.socket}`}>
          <p>
            Reconnecting...
            <span
              className={`${styles.reload_btn} cursor-pointer`}
              onClick={() => router.reload()}
            >
              Try now
              <img src={process.env.APP_URL + "/images/refresh.svg"} />
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  socket_connection_status: state.vantage.chatReducer.socketConnectionStatus,
  user_token: state.vantage.userDataReducer.user_token,
  isOrganisationSelected:
    state.vantage.organisationReducer.isOrganisationSelected,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NetworkDetector);
