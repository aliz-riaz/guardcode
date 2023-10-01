import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "react-bootstrap/Spinner";
import MessageCard from "./MessageCard";
import { isMobile, isAndroid } from "react-device-detect";
import styles from "./MessagesList.module.scss";
import IsTyping from "./IsTyping";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

const MessageList = (props) => {
  return (
    <div
      id="scrollableDiv"
      className={styles.MessageListScroll}
      style={{
        height: isMobile ? "calc(100vh - 335px)" : "calc(100vh - 328px)",
        // height: isMobile ? "calc(100vh - 247px)" : "calc(100vh - 274px)",
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
      }}
      ref={props.innerRef}
    >
      <InfiniteScroll
        dataLength={props.messageList.length}
        next={props.fetchMoreMessages}
        style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
        inverse={true}
        hasMore={props.hasMore}
        endMessage={
          <h4 className="text-center mt-3 px-2 fw-medium text-black-50 fs-7 w-75 mx-auto">
            This is the very beginning of your direct message history with{" "}
            {`${props.userData.firstname} ${props.userData.lastname}`}. Only the
            two of you are in this conversation, and no one else can join it.
          </h4>
        }
        loader={
          <div className="text-center mt-1">
            <Spinner animation="border" size="sm" role="status"></Spinner>
          </div>
        }
        scrollableTarget="scrollableDiv"
      >
        {props.messageList.length > 0 &&
          props.messageList.map((message, indx) => (
            <MessageCard message={message} key={indx} indx={indx} />
          ))}
      </InfiniteScroll>
    </div>
  );
};

export default MessageList;
