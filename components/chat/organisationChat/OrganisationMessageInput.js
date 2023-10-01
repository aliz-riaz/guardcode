import { connect } from "react-redux";
import { useEffect, useRef, useState, useCallback } from "react";
import { socket } from "../../../lib/SocketProvider";
import styles from "./OrganisationMessageInput.module.scss";
import FilePreview from "react-file-preview-latest";
import SimpleBar from "simplebar-react";
import { toast } from "react-toastify";
import {
  setIsFileUploading,
  setIsCurrentPage,
} from "../../../redux/actions/chatAction";
import { isMobile } from "react-device-detect";
import "simplebar/dist/simplebar.min.css";
import uniqid from "uniqid";
import { setChatBookingsSwtichValue } from "../../../redux/actions/organisationAction";
import {
  setShowChannelForChat,
  setHasDoneChatBeforeForChat,
  setGroupIDForChat,
} from "../../../redux/actions/chatAction";
import MessageTemplateContainer from "../messageTemplate/MessageTemplateContainer";
import {
  setSelectedMessageTemplate,
  setGlobalChannelOne,
} from "../../../redux/actions/globalChatAction";

const OrganisationMessageInput = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileExtension, setSelectedFileExtension] = useState(null);
  const [convertedFile, setConvertedFile] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [messageLengthError, setMessageLengthError] = useState(false);
  const [hasRoom, setHasRoom] = useState({ isRoomExist: null, groupId: null });

  const [typingState, setTypingState] = useState({
    typingTimeout: 0,
  });
  // sending to jobseeker if employer is typing or not
  const [isTyping, setIsTyping] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [showMessageTemplateIcon, setShowMessageTemplateIcon] = useState(true);

  useEffect(() => {
    if (props.organisationFilters.chat.switchValue === "My Conversations") {
      socket?.emit("userTyping", {
        group_id: props.chat_group_id,
        isTyping: isTyping,
      });
    }
  }, [isTyping]);

  const messageArea = useRef(null);
  const filePickerRef = useRef(null);

  const maxWordsAllowed = 5000;

  useEffect(() => {
    props.setSelectedMessageTemplate({});
    socket?.on("connect_error", (err) => {
      props.setIsFileUploading(false);
      console.log(`connect_error due to ${err.message}`);
    });

    return () => {
      socket?.removeAllListeners("connect_error");
    };
  }, []);

  useEffect(() => {
    setSelectedFile(null);
    setSelectedFileExtension(null);
    setConvertedFile(null);
    setUploadingFile(false);
    setMessageLengthError(false);

    if (props.organisationFilters.chat.switchValue === "My Conversations") {
      socket?.emit("userTyping", {
        group_id: props.chat_group_id,
        isTyping: false,
      });
    }
  }, [props.chat_group_id, props.is_channel_blocked]);

  const toBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setConvertedFile(e.target.result.split(",")[1]);
    };
  };

  const customToast = (message) => {
    toast.error(message, {
      autoClose: false,
      theme: "colored",
    });
  };

  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (
      file.type != "image/jpeg" &&
      file.type != "image/jpg" &&
      file.type != "image/png" &&
      file.type != "application/pdf" &&
      file.type != "application/msword" &&
      file.type !=
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      customToast("Accepted format: image, pdf and doc.");
      return;
    }
    try {
      setUploadingFile(true);
      if (file.size < 10485760) {
        setSelectedFile(file);
        toBase64(file);
        setSelectedFileExtension(file.name.split(".").pop());
      } else {
        customToast("File can't be greater than 10mb");
      }
      setUploadingFile(false);
    } catch {
      customToast("Something went wrong while uploading, Please try again!");
    }
  };

  const fileCancelHandler = () => {
    setSelectedFile(null);
    setSelectedFileExtension(null);
    setConvertedFile(null);
    filePickerRef.current.value = null;
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const message = messageArea.current.innerText;
    if (message.trim().length > maxWordsAllowed) {
      setMessageLengthError(true);
      return;
    }
    props.setIsCurrentPage(1);
    setMessageLengthError(false);
    if (selectedFile && convertedFile) {
      props.setIsFileUploading(true);
      socket.emit("onAttachment", {
        sender_id: props.employers_user_id,
        sender_type: "EMPLOYER",
        reciever_id: props.userData.id,
        group_id: props.chat_group_id,
        fileName: selectedFile.name,
        file: convertedFile,
      });
      fileCancelHandler();
    }
    if (message.trim() != "" && props.socket_connection_status) {
      socket.emit("sendMessage", {
        sender_id: props.employers_user_id,
        sender_type: "EMPLOYER",
        reciever_id: props.userData.id,
        message: message.trim(),
        group_id: props.chat_group_id,
      });
      messageArea.current.innerText = "";
      props.setSearchField("");
      setShowMessageTemplateIcon(true);
    }
    if (isMobile) {
      setTimeout(() => {
        props.timelineRef?.current?.scrollTo({
          top: 100,
          left: 100,
          behavior: "smooth",
        });
      }, 800);
    } else {
      props.timelineRef?.current?.scrollTo(
        0,
        props.timelineRef?.current?.scrollHeight
      );
    }
  };

  const keyPressHandler = useCallback((e) => {
    const keyCode = e.which || e.keyCode;

    setIsTyping(true);

    if (typingState.typingTimeout) {
      clearTimeout(typingState.typingTimeout);
    }

    setTypingState({
      typingTimeout: setTimeout(function () {
        setIsTyping(false);
      }, 1000),
    });

    if (keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  });

  const keyDownHandler = useCallback((e) => {
    if (messageArea?.current?.innerText?.trim()?.length < maxWordsAllowed) {
      setMessageLengthError(false);
      return;
    }
    if (e.keyCode === 8) {
      setMessageLengthError(false);
    }
  });

  const pasteOnMesssage = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, text);
  };
  const getFileExtension = (file) => {
    return file.split(/\.(?=[^\.]+$)/)[1];
  };

  const handleUserBlock = () => {
    props.setChannelList((prev) =>
      prev.map((channel, indx) => {
        if (channel.group_id == props.chat_group_id) {
          return {
            ...channel,
            group: {
              ...channel.group,
              is_blocked: !props.is_channel_blocked,
            },
          };
        } else {
          return channel;
        }
      })
    );
    if (props.chat_group_id == props.g_chat_one.groupID) {
      props.setGlobalChannelOne({
        ...props.g_chat_one,
        isChannelBlocked: !props.is_channel_blocked,
      });
    }
    socket.emit("blockGroup", {
      group_id: props.chat_group_id,
      block: !props.is_channel_blocked,
    });
  };

  useEffect(() => {
    if (hasRoom.isRoomExist === true) {
      props.setGroupIDForChat(hasRoom.groupId);
    } else if (hasRoom.isRoomExist === false) {
      const uuid = uniqid("group-").toString();
      socket.emit("initChat", {
        groups: {
          name: `${props.decision_maker_first_name} ${props.decision_maker_last_name}`,
          created_by: props.employers_user_id.toString(),
          uuid: uuid,
          user_id: props.employers_user_id,
        },
        group_members: {
          users: [
            {
              id: props.employers_user_id,
              firstname: props.company_name,
              lastname: `${props.decision_maker_first_name} ${props.decision_maker_last_name}`,
              picture: null,
              email: props.employers_email,
              // "phone": props.employers_mobile_number,
              phone: "03032856025",
              type: "EMPLOYER",
            },
            {
              id: props.userData.id,
              firstname: props.userData.firstname,
              lastname: props.userData.lastname,
              picture: props.userData.picture,
              email: props.userData.email,
              phone: "1234",
              type: "JOBSEEKER",
            },
          ],
          applications: props.userJobsList[0],
          multi_chat: false,
        },
        type: "createGroup",
      });
      props.setGroupIDForChat(uuid);
    }

    return () => {
      socket.removeAllListeners("groupExist");
    };
  }, [hasRoom]);

  const initChat = () => {
    socket.emit("checkGroupExist", {
      user: {
        id: props.userData.id,
        type: "JOBSEEKER",
      },
    });
    socket.on("groupExist", (data) => {
      if (data.requestStatus == "success") {
        setHasRoom({
          isRoomExist: data.data.hasRoom,
          groupId: data.data.group_id,
        });
        props.setSearchField("");
        props.setChatBookingsSwtichValue("My Conversations");
        setTimeout(() => {
          props.setIsCurrentPage(1);
          // socket.emit("groupChatTeamAccess", {
          //   requested_type: "myChat",
          //   requestedPage: props.currentPage,
          //   isSkip: props.isSkip,
          // });
          props.setShowChannelForChat(true);
        }, 1000);
      }
    });
  };

  const onChangeEventHandler = (e) => {
    if (e.target?.innerHTML?.trim()?.length == 0) {
      setShowMessageTemplateIcon(true);
    } else {
      setShowMessageTemplateIcon(false);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (
      props.organisationFilters.chat.switchValue === "My Conversations" &&
      props.is_channel_blocked === false
    ) {
      if (
        props.selectedMessageTemplate &&
        Object.keys(props.selectedMessageTemplate).length == 0
      ) {
        messageArea.current.innerText = "";
        setShowMessageTemplateIcon(true);
      } else {
        setShowMessageTemplateIcon(false);
        setIsOpen(false);
        const replaceValue = props.selectedMessageTemplate?.templateMessage
          .replace(/\|F\*NAME\|/g, props.userData.firstname)
          .replace(/\|L\*NAME\|/g, props.userData.lastname)
          .replace(
            /\|MY\*NAME\|/g,
            `${props.decision_maker_first_name} ${props.decision_maker_last_name}`
          )
          .replace(/\|MY\*EMAIL\|/g, props.user_email);
        // messageArea.current.innerText = props.selectedMessageTemplate?.templateMessage
        messageArea.current.innerText = replaceValue;
      }
    }
  }, [props.selectedMessageTemplate]);

  return (
    <>
      <div className={`${styles.message_fields}`}>
        {!props.socket_connection_status && (
          <div className="mt-2 mb-3">
            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="31"
                height="28"
                viewBox="0 0 31 28"
              >
                <g
                  stroke="#CC2B2B"
                  stroke-width="1.5"
                  fill="none"
                  fill-rule="evenodd"
                  stroke-linecap="square"
                >
                  <path d="M16.609 20.17a3 3 0 1 1-3.827 3.827M23.39 15.222A10.962 10.962 0 0 0 15.612 12a10.962 10.962 0 0 0-7.778 3.222M29.224 9.638A19.193 19.193 0 0 0 15.612 4 19.193 19.193 0 0 0 2 9.638M4.612 26l24-24" />
                </g>
              </svg>
            </i>
            <span className="text-danger ml-2">
              Whoops! due to slow or no internet connection, we’re unable to
              send your messages
            </span>
          </div>
        )}
        {selectedFile && (
          <>
            <div className={`${styles.selected_files}`}>
              <div className={`${styles.close}`} onClick={fileCancelHandler}>
                <img
                  src={process.env.APP_URL + "/images/e-remove.svg"}
                  width="27px"
                />
              </div>
              {selectedFile?.type?.includes("image/") ? (
                <div className={`${styles.img_preview_thumbnail} d-flex`}>
                  <FilePreview type={"file"} file={selectedFile} />
                  <span className="fw-medium text-black pt-1 pl-2 fs-6">
                    {selectedFile.name}
                  </span>
                </div>
              ) : (
                <div
                  className={`${styles.file_preview_thumbnail} d-flex align-items-center`}
                >
                  <img
                    src={`${process.env.APP_URL}/images/${
                      getFileExtension(selectedFile.name) == "pdf"
                        ? "pdf_preview_black"
                        : "doc_preview_black"
                    }.svg`}
                  />
                  <span className="fw-bold text-black pt-1 pl-2 fs-6">
                    {selectedFile.name}
                  </span>
                </div>
              )}
            </div>
          </>
        )}
        {props.is_channel_blocked ? (
          <div className={`fs-6 text-black-50 text-center pt-1`}>
            <span>
              {/* {`Can't send a message to blocked contact ${props.userData.firstname} ${props.userData.lastname}.`}  */}
              You have ended this conversation. Messages can no longer be sent
              or received.
            </span>
            <span
              className="text-success text-decoration-line cursor-pointer d-block"
              onClick={handleUserBlock}
            >
              Open conversation
            </span>
          </div>
        ) : (
          <div className="d-flex align-items-end">
            <div className={`d-flex flex-grow-1 pr-2 align-items-end`}>
              <div className={`${styles.textArea} flex-grow-1`}>
                {/* uploadingFile */}
                {props.is_file_uploading && (
                  <span
                    className={`${styles.uploading_file_badge} d-block text-dark fw-medium text-center position-absolute mx-auto`}
                  >
                    Sending File...
                  </span>
                )}
                {messageLengthError && (
                  <span className="text-danger">{`Your message is too long max ${maxWordsAllowed} characters is allowed.`}</span>
                )}
                <div
                  className={`${styles.chat_field_wrap} p-2 rounded bg-white`}
                >
                  {props.organisationFilters.chat.switchValue ===
                  "My Conversations" ? (
                    <>
                      <SimpleBar
                        style={{ maxHeight: "100px" }}
                        autoHide={false}
                      >
                        <div
                          className={`${styles.editable_textarea}`}
                          placeholder={`Message ${props.userData.firstname} ${props.userData.lastname}`}
                          contentEditable={true}
                          ref={messageArea}
                          onPaste={pasteOnMesssage}
                          onKeyPress={keyPressHandler}
                          onKeyDown={keyDownHandler}
                          onInput={onChangeEventHandler}
                        ></div>
                      </SimpleBar>
                      {isOpen && (
                        <div className={`${styles.template_box}`}>
                          <MessageTemplateContainer setIsOpen={setIsOpen} />
                        </div>
                      )}
                      {showMessageTemplateIcon &&
                        props.messageList.length > 0 && (
                          <button
                            className={`cursor-pointer ${styles.add_temp_btn}`}
                            onClick={() => setIsOpen(!isOpen)}
                          >
                            <img
                              src={`${process.env.APP_URL}/images/add_temp.svg`}
                            />
                          </button>
                        )}
                    </>
                  ) : (
                    <p className={`${styles.start_new_chat} fs-6 m-0`}>
                      You cannot join this conversation.{" "}
                      <span onClick={() => initChat()}>click here</span> to
                      start a new conversation with {props.userData.firstname}{" "}
                      {props.userData.lastname}{" "}
                    </p>
                  )}
                </div>
              </div>
              {props.organisationFilters.chat.switchValue ===
                "My Conversations" && (
                <div
                  className={`${styles.sendButton} flex-shrink-0 d-flex align-items-end justify-content-center px-0`}
                >
                  <button onClick={(e) => sendMessage(e)}>
                    <img src={process.env.APP_URL + "/images/send_icon.svg"} />
                  </button>
                </div>
              )}
            </div>
            {props.organisationFilters.chat.switchValue ===
              "My Conversations" && (
              <div className={`${styles.add_files}`}>
                <input
                  ref={filePickerRef}
                  type="file"
                  id="upload"
                  className={`${styles.file}`}
                  onChange={uploadFileHandler}
                  accept={".doc, .docx, .pdf, image/png, image/jpg, image/jpeg"}
                />
                <label
                  for="upload"
                  class="mb-0 d-block d-flex align-items-center justify-content-center cursor-pointer"
                >
                  <img
                    src={`${process.env.APP_URL}/images/attach.svg`}
                    height="18px"
                  />
                </label>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  employers_user_id: state.vantage.userDataReducer.user_id,
  chat_group_id: state.vantage.chatReducer.groupID,
  user_has_done_chat_before: state.vantage.chatReducer.setHasDoneChatBefore,
  socket_connection_status: state.vantage.chatReducer.socketConnectionStatus,
  is_file_uploading: state.vantage.chatReducer.isFileUploading,
  is_channel_blocked: state.vantage.chatReducer.isChannelBlocked,

  organisationFilters: state.vantage.organisationReducer.filter,
  decision_maker_last_name:
    state.vantage.userDataReducer.decision_maker_last_name,
  employers_email: state.vantage.userDataReducer.user_email,
  decision_maker_first_name:
    state.vantage.userDataReducer.decision_maker_first_name,
  company_name: state.vantage.userDataReducer.user_name,

  selectedMessageTemplate:
    state.vantage.globalChatReducer.selectedMessageTemplate,
  user_email: state.vantage.userDataReducer.user_email,

  currentPage: state.vantage.chatReducer.currentPage,
  isSkip: state.vantage.chatReducer.isSkip,
  g_chat_one: state.vantage.globalChatReducer.globalChannelOne,
});

const mapDispatchToProps = (dispatch) => ({
  setIsFileUploading: (status) => dispatch(setIsFileUploading(status)),
  setChatBookingsSwtichValue: (value) =>
    dispatch(setChatBookingsSwtichValue(value)),
  setShowChannelForChat: (value) => dispatch(setShowChannelForChat(value)),
  setGroupIDForChat: (value) => dispatch(setGroupIDForChat(value)),
  setSelectedMessageTemplate: (selectedTemplate) =>
    dispatch(setSelectedMessageTemplate(selectedTemplate)),
  setIsCurrentPage: (status) => dispatch(setIsCurrentPage(status)),
  setGlobalChannelOne: (globalChannelOne) =>
    dispatch(setGlobalChannelOne(globalChannelOne)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganisationMessageInput);
