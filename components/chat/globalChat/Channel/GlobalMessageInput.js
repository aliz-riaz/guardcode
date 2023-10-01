import { connect } from "react-redux";
import { useEffect, useRef, useState, useCallback } from "react";
import { socket } from "../../../../lib/SocketProvider";
import styles from "./GlobalMessageInput.module.scss";
import FilePreview from "react-file-preview-latest";
import SimpleBar from "simplebar-react";
import { toast } from "react-toastify";
import { isMobile } from "react-device-detect";
import "simplebar/dist/simplebar.min.css";
import MessageTemplateContainer from "../../messageTemplate/MessageTemplateContainer";
import { setSelectedMessageTemplate } from "../../../../redux/actions/globalChatAction";
import { setIsCurrentPage } from "../../../../redux/actions/chatAction";

const GlobalMessageInput = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileExtension, setSelectedFileExtension] = useState(null);
  const [convertedFile, setConvertedFile] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [messageLengthError, setMessageLengthError] = useState(false);
  const [typingState, setTypingState] = useState({
    typingTimeout: 0,
  });
  // sending to jobseeker if employer is typing or not
  const [isTyping, setIsTyping] = useState(false);

  const [showMessageTemplateIcon, setShowMessageTemplateIcon] = useState(true);

  useEffect(() => {
    socket?.emit("userTyping", {
      group_id: props.g_chat_obj?.groupID,
      isTyping: isTyping,
    });
  }, [isTyping]);

  const messageArea = useRef(null);
  const filePickerRef = useRef(null);

  const maxWordsAllowed = 5000;

  useEffect(() => {
    props.setSelectedMessageTemplate({});
    socket?.on("connect_error", (err) => {
      // props.setIsFileUploading(false);
      props.setGlobalChannel({
        ...props.g_chat_obj,
        isFileUploading: false,
      });
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
    return () => {
      socket?.removeAllListeners("userTyping");
    };
  }, [props.g_chat_obj.groupID, props.g_chat_obj.isChannelBlocked]);

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
      props.setGlobalChannel({
        ...props.g_chat_obj,
        isFileUploading: true,
      });
      socket.emit("onAttachment", {
        sender_id: props.employers_user_id,
        sender_type: "EMPLOYER",
        reciever_id: props.userData.id,
        group_id: props.g_chat_obj?.groupID,
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
        group_id: props.g_chat_obj?.groupID,
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
        if (channel.group_id == props.g_chat_obj?.groupID) {
          return {
            ...channel,
            group: {
              ...channel.group,
              is_blocked: !props.g_chat_obj?.isChannelBlocked,
            },
          };
        } else {
          return channel;
        }
      })
    );
    socket.emit("blockGroup", {
      group_id: props.g_chat_obj?.groupID,
      block: !props.g_chat_obj?.isChannelBlocked,
    });
  };

  const onChangeEventHandler = (e) => {
    if (e.target?.innerHTML?.trim()?.length == 0) {
      setShowMessageTemplateIcon(true);
    } else {
      setShowMessageTemplateIcon(false);
      props.setIsOpen(false);
    }
  };

  useEffect(() => {
    if (props.isChannelBlocked === false) {
      if (
        props.selectedMessageTemplate &&
        Object.keys(props.selectedMessageTemplate).length == 0
      ) {
        messageArea.current.innerText = "";
        setShowMessageTemplateIcon(true);
      } else {
        setShowMessageTemplateIcon(false);
        props.setIsOpen(false);
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

  useEffect(() => {
    if (props.isChannelBlocked === false) {
      messageArea.current.innerText = "";
    }
  }, [props.groupID]);

  return (
    <>
      <div className={`${styles.message_fields}`}>
        {!props.socket_connection_status && (
          <div className="mt-2 mb-1 px-3">
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
                <div
                  className={`${styles.img_preview_thumbnail} d-flex align-items-center`}
                >
                  <FilePreview type={"file"} file={selectedFile} />
                  <span
                    className={`${styles.file_name} fw-medium text-black pt-1 pl-2 fs-7`}
                  >
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
                  <span
                    className={`${styles.file_name} fw-bold text-black pt-1 pl-2 fs-7`}
                  >
                    {selectedFile.name}
                  </span>
                </div>
              )}
            </div>
          </>
        )}
        {props.g_chat_obj?.isChannelBlocked ? (
          <div className={`fs-6 text-black-50 text-center pt-1 px-3`}>
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
          <div className="">
            <div
              className={`d-flex justify-content-between align-content-center px-2 py-3`}
            >
              <div className={`${styles.add_files} d-flex align-items-end`}>
                <input
                  ref={filePickerRef}
                  type="file"
                  className={`${styles.file}`}
                  id="upload"
                  onChange={uploadFileHandler}
                  accept={".doc, .docx, .pdf, image/png, image/jpg, image/jpeg"}
                  hidden
                />
                <label
                  for="upload"
                  className="mb-0 d-block d-flex align-items-center justify-content-center"
                >
                  <img
                    src={process.env.APP_URL + "/images/attach.svg"}
                    height="18px"
                  />
                </label>
              </div>
              <div className={`${styles.textArea} flex-grow-1 px-2`}>
                {/* uploadingFile */}
                {props.g_chat_obj.isFileUploading && (
                  <span
                    className={`${styles.uploading_file_badge} d-block text-dark fw-medium text-center position-absolute mx-auto`}
                  >
                    Sending File...
                  </span>
                )}
                {messageLengthError && (
                  <span className="text-danger">{`Your message is too long max ${maxWordsAllowed} characters is allowed.`}</span>
                )}
                <div className={`${styles.chat_field_wrap} rounded bg-white`}>
                  <SimpleBar style={{ maxHeight: "120px" }} autoHide={false}>
                    <div
                      className={`${styles.editable_textarea}`}
                      placeholder={`Type here...`}
                      contentEditable={true}
                      ref={messageArea}
                      onPaste={pasteOnMesssage}
                      onKeyPress={keyPressHandler}
                      onKeyDown={keyDownHandler}
                      onInput={onChangeEventHandler}
                    ></div>
                  </SimpleBar>
                  {props.isOpen && (
                    <div className={`${styles.template_box}`}>
                      <MessageTemplateContainer setIsOpen={props.setIsOpen} />
                    </div>
                  )}
                  {showMessageTemplateIcon && props.messageList.length > 0 && (
                    <button
                      className={`cursor-pointer ${styles.add_temp_btn}`}
                      onClick={() => props.setIsOpen(!props.isOpen)}
                    >
                      <img src={`${process.env.APP_URL}/images/add_temp.svg`} />
                    </button>
                  )}
                </div>
              </div>
              <div
                className={`${styles.sendButton} flex-shrink-0 d-flex align-items-end justify-content-center`}
              >
                <button onClick={(e) => sendMessage(e)} className="m-0">
                  <img src={process.env.APP_URL + "/images/send_icon.svg"} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  employers_user_id: state.vantage.userDataReducer.user_id,
  socket_connection_status: state.vantage.chatReducer.socketConnectionStatus,
  selectedMessageTemplate:
    state.vantage.globalChatReducer.selectedMessageTemplate,
  decision_maker_first_name:
    state.vantage.userDataReducer.decision_maker_first_name,
  decision_maker_last_name:
    state.vantage.userDataReducer.decision_maker_last_name,
  user_email: state.vantage.userDataReducer.user_email,
  isChannelBlocked:
    state.vantage.globalChatReducer.globalChannelOne.isChannelBlocked,
  groupID: state.vantage.globalChatReducer.globalChannelOne.groupID,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedMessageTemplate: (selectedTemplate) =>
    dispatch(setSelectedMessageTemplate(selectedTemplate)),
  setIsCurrentPage: (status) => dispatch(setIsCurrentPage(status)),
  // setIsFileUploading: (status) => dispatch(setIsFileUploading(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GlobalMessageInput);
