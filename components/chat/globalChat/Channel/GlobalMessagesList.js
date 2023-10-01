import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "react-bootstrap/Spinner";
import styles from "./GlobalMessagesList.module.scss";
import GlobalMessageCard from "./GlobalMessageCard";
import MessageTemplateContainer from "../../messageTemplate/MessageTemplateContainer";
import moment from "moment";
const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

const GlobalMessagesList = (props) => {
  const formatDate = (timestamp) => {
    const date = moment(timestamp);
    const today = moment().startOf("day");
    const yesterday = moment().subtract(1, "days").startOf("day");

    if (date.isSame(today, "d")) {
      return "Today";
    } else if (date.isSame(yesterday, "d")) {
      return "Yesterday";
    } else {
      return date.format("dddd, MMMM D");
    }
  };
  return (
    <>
      <div
        id={props.scrollableDivID}
        className={styles.MessageListScroll}
        style={{
          height: "321px",
          maxHeight: "calc(100vh - 150px)",
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
              {`${props.userData.firstname} ${props.userData.lastname}`}. Only
              the two of you are in this conversation, and no one else can join
              it.
            </h4>
          }
          loader={
            <div className="text-center mt-1">
              <Spinner animation="border" size="sm" role="status"></Spinner>
            </div>
          }
          scrollableTarget={props.scrollableDivID}
        >
          {props.messageList.length > 0 &&
            props.messageList.map((message, indx) => {
              const previousMessage = props.messageList[indx + 1];
              const showDateLabel =
                !previousMessage ||
                formatDate(message.createdAt) !==
                  formatDate(previousMessage.createdAt);

              return (
                <>
                  <GlobalMessageCard
                    message={message}
                    key={indx}
                    indx={indx}
                    g_chat_obj={props.g_chat_obj}
                    setGlobalChannel={props.setGlobalChannel}
                  />
                  {showDateLabel && (
                    <div
                      className={`${styles.message_time} text-center  position-relative`}
                    >
                      <span className="box-shadow position-relative d-inline-block bg-white">
                        {formatDate(message.createdAt)}
                      </span>
                    </div>
                  )}
                </>
              );
            })}
          {props.messageList.length == 0 && <MessageTemplateContainer />}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default GlobalMessagesList;
