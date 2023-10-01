import React, { useState } from "react";
import moment from "moment";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import {
  setImageToBeShownInMsgImgPreview,
  setImgMsgModalPreview,
} from "../../../redux/actions/chatAction";
import styles from "./OrganisationMessagesList.module.scss";

const style = {
  position: "relative",
  display: "flex",
  "flex-direction": "column",
};
const OrganisationMessageCard = ({
  message,
  indx,
  setImageToBeShownInMsgImgPreview,
  setImgMsgModalPreview,
}) => {
  const [IsReadMore, setIsReadMore] = useState(true);

  const getFileExtension = (file) => {
    return file.split(/\.(?=[^\.]+$)/)[1];
  };
  const getFileName = (file) => {
    return file.substring(file.lastIndexOf("/") + 1);
  };
  const handleShow = () => {
    setImageToBeShownInMsgImgPreview(message.file);
    setImgMsgModalPreview(true);
  };

  function urlify(text) {
    if (!text) return text;
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
      return '<a href="' + url + '" target="_blank">' + url + "</a>";
    });
  }

  return (
    <div className={`${styles.message_list_scroll}`}>
      {message.file &&
      (getFileExtension(message.file) == "jpg" ||
        getFileExtension(message.file) == "jpeg" ||
        getFileExtension(message.file) == "png") ? (
        <>
          <div
            className={` ${styles.sender_message} ${styles.onlyImage} ${
              message.sender_type == "EMPLOYER"
                ? styles.sender_right
                : styles.sender_left
            } px-0 py-0 cursor-pointer`}
            onClick={handleShow}
          >
            <img src={message.file} className="img-fluid rounded " />
          </div>
        </>
      ) : (
        <div
          style={style}
          key={indx}
          className={` ${styles.sender_message} ${
            message.sender_type == "EMPLOYER"
              ? styles.sender_right
              : styles.sender_left
          } `}
        >
          <div
            className={`mb-0 ${
              message.sender_type == "EMPLOYER" ? "bg-light-" : "bg-dark-"
            } d-block- card- p-2- m-2-`}
            key={indx}
          >
            {message.file ? (
              <div
                className={`${styles.messageFile} d-flex align-items-center justify-content-center position-relative`}
              >
                <div className={`${styles.file_thumb} flex-shrink-0`}>
                  {(getFileExtension(message.file) == "doc" ||
                    getFileExtension(message.file) == "docx") && (
                    <img
                      src={`${process.env.APP_URL}/images/${
                        message.sender_type == "EMPLOYER"
                          ? "doc_preview_white"
                          : "doc_preview_white"
                      }.svg`}
                      width="50px"
                    />
                  )}
                  {getFileExtension(message.file) == "pdf" && (
                    <img
                      src={`${process.env.APP_URL}/images/${
                        message.sender_type == "EMPLOYER"
                          ? "pdf_preview_white"
                          : "pdf_preview_black"
                      }.svg`}
                      width="50px"
                    />
                  )}
                  {getFileExtension(message.file) == "png" ||
                  getFileExtension(message.file) == "jpg" ||
                  getFileExtension(message.file) == "jpeg" ? (
                    <img src={message.file} width="50px" />
                  ) : null}
                </div>
                <div
                  className={`${styles.file_right} flex-grow-1 pl-3 position-relative`}
                >
                  <span
                    className={`d-block ${
                      message.sender_type == "EMPLOYER"
                        ? "text-white"
                        : "text-black"
                    } ${styles.file_name}`}
                  >
                    {getFileName(message.file)}
                  </span>
                  <span
                    className={`${
                      message.sender_type == "EMPLOYER"
                        ? "text-white"
                        : "text-black"
                    } ${styles.file_extension}`}
                  >
                    {getFileExtension(message.file) == "doc" ||
                    getFileExtension(message.file) == "docx"
                      ? "Doc File"
                      : null}
                    {getFileExtension(message.file) == "pdf"
                      ? "PDF File"
                      : null}
                  </span>
                </div>
                <div className={`${styles.download_file}`}>
                  {/* <Link > */}
                  <a href={message.file} target="_blank" download>
                    <img src={`${process.env.APP_URL}/images/download.svg`} />
                  </a>
                </div>
              </div>
            ) : (
              <p
                className={`mb-0 ${
                  message.sender_type == "EMPLOYER" ? "bg-light-" : "bg-dark-"
                } d-block- card- p-2- m-2-`}
                key={indx}
              >
                <span className="mr-1">
                  {message?.message?.length > 180 ? (
                    IsReadMore ? (
                      message?.message?.slice(0, 180)
                    ) : (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: urlify(message?.message),
                        }}
                      ></span>
                    )
                  ) : (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: urlify(message?.message),
                      }}
                    ></span>
                  )}
                </span>
                {message?.message?.length > 180 && IsReadMore && (
                  <span
                    className="text-success cursor-pointer"
                    onClick={() => setIsReadMore(false)}
                  >
                    read more...
                  </span>
                )}
              </p>
            )}
          </div>
        </div>
      )}

      <div className={`${styles.clear}`}></div>
      <div
        className={`${styles.time} ${
          message.sender_type == "EMPLOYER" ? styles.right : styles.left
        } text-black-50 mt-1 pt-0`}
      >
        {moment(message.createdAt).format("hh:mm a")}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  // image_to_be_shown_in_msg_img_preview: state.vantage.chatReducer.imageToBeShownInMsgImgPreview,
  // img_modal_preview: state.vantage.chatReducer.modalPreview,
});

const mapDispatchToProps = (dispatch) => ({
  setImageToBeShownInMsgImgPreview: (status) =>
    dispatch(setImageToBeShownInMsgImgPreview(status)),
  setImgMsgModalPreview: (status) => dispatch(setImgMsgModalPreview(status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganisationMessageCard);
