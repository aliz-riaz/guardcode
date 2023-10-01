import React, { useState, useCallback, useRef, useEffect } from "react";
import styles from "./GlobalChanneListHeader.module.scss";
import _ from "lodash";
import { connect } from "react-redux";
import { setShowGlobalChatChannelList } from "../../../redux/actions/globalChatAction";
import { setIsCurrentPage } from "../../../redux/actions/chatAction";

const GloablChannelListHeader = (props) => {
  const searchRef = useRef();

  useEffect(() => {
    if (props.searchField == "") {
      searchRef.current.value = "";
    }
  }, [props.searchField]);

  const setSearch = useCallback((e) =>
    props.setSearchField(e.target.value.trim())
  );

  const removeSearchText = () => {
    props.setSearchField("");
    searchRef.current.value = "";
    searchRef.current.focus();
  };

  return (
    <>
      <div
        className={`${styles.global_channel_list_header} ${
          !props.show_g_channel_list && styles.minimized
        }`}
      >
        <div
          className={`d-flex justify-content-between cursor-pointer`}
          onClick={() => {
            props.setShowGlobalChatChannelList(!props.show_g_channel_list);
            props.setIsCurrentPage(1);
          }}
        >
          <div className="d-flex align-items-center">
            <img
              src={`${process.env.APP_URL}/images/chat_bold.svg`}
              height={`14px`}
              alt="ICON"
            />
            <span className="fw-bold  ml-2 d-inline-block translate-x-minus-1">
              Chat
            </span>
            {props.unread_message_count && props.unread_message_count != 0 ? (
              props.unread_message_count < 9 ? (
                <span
                  className={`${styles.badge} badge  rounded-circle d-flex align-items-center justify-content-center translate-x-minus-1 ml-2`}
                >
                  {" "}
                  <span className="text-white">
                    {props.unread_message_count}
                  </span>{" "}
                </span>
              ) : (
                <span
                  className={`${styles.badge} badge  rounded-circle d-flex align-items-center justify-content-center translate-x-minus-1 ml-2`}
                >
                  <span className="text-white">9+</span>
                </span>
              )
            ) : null}
          </div>
          <div className={`${styles.collapse_arrow}`}>
            <img
              src={`${process.env.APP_URL}/images/Collapsedown.svg`}
              alt="icon down"
            />
          </div>
        </div>
        <div className={`${styles.search} position-relative`}>
          <input
            type={"text"}
            placeholder="Search"
            ref={searchRef}
            onChange={_.debounce(setSearch, 300)}
          />
          {props.searchField != "" && (
            <div className={`${styles.remove}`} onClick={removeSearchText}>
              <img
                src={process.env.APP_URL + "/images/cancel.svg"}
                width="10px"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  show_g_channel_list: state.vantage.globalChatReducer.showGlobalChannelList,
  unread_message_count: state.vantage.chatReducer.unReadMessageCount,
});

const mapDispatchToProps = (dispatch) => ({
  setShowGlobalChatChannelList: (status) =>
    dispatch(setShowGlobalChatChannelList(status)),
  setIsCurrentPage: (page) => dispatch(setIsCurrentPage(page)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GloablChannelListHeader);
