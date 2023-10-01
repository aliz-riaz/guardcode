import { useState } from "react";
import moment from "moment";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import {
  setImageToBeShownInMsgImgPreview,
  setImgMsgModalPreview,
} from "../../redux/actions/chatAction";
import styles from "./ImagePreviewModal.module.scss";

const ImagePreviewModal = (props) => {
  const handleClose = () => {
    props.setImgMsgModalPreview(false);
  };

  return (
    <Modal
      show={props.img_modal_preview}
      className={`${styles.imagePreviewModal}`}
    >
      <Modal.Body>
        <div class={`${styles.closeModal}`} onClick={handleClose}>
          <img src={`${process.env.APP_URL}/images/cancel.svg`} width="16px" />
        </div>
        <div className={`${styles.action}`}>
          <a
            href={props.image_to_be_shown_in_msg_img_preview}
            target="_blank"
            download
          >
            <img src={`${process.env.APP_URL}/images/download.svg`} />
          </a>
        </div>
        <div className={`${styles.image} mt-4`}>
          <img
            src={props.image_to_be_shown_in_msg_img_preview}
            className="img-fluid "
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  image_to_be_shown_in_msg_img_preview:
    state.vantage.chatReducer.imageToBeShownInMsgImgPreview,
  img_modal_preview: state.vantage.chatReducer.modalPreview,
});

const mapDispatchToProps = (dispatch) => ({
  setImageToBeShownInMsgImgPreview: (status) =>
    dispatch(setImageToBeShownInMsgImgPreview(status)),
  setImgMsgModalPreview: (status) => dispatch(setImgMsgModalPreview(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImagePreviewModal);
