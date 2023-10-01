import { Modal } from "react-bootstrap";
import styles from "./GlobalImagePreviewModal.module.scss";

const GlobalImagePreviewModal = (props) => {
  const handleClose = () => {
    props.setGlobalChannel({
      ...props.g_chat_obj,
      modalPreview: false,
    });
  };

  return (
    <Modal
      show={props.g_chat_obj.modalPreview}
      className={`${styles.imagePreviewModal}`}
    >
      <Modal.Body>
        <div class={`${styles.closeModal}`} onClick={handleClose}>
          <img src={`${process.env.APP_URL}/images/cancel.svg`} width="16px" />
        </div>
        <div className={`${styles.action}`}>
          <a
            href={props.g_chat_obj.imageToBeShownInMsgImgPreview}
            target="_blank"
            download
          >
            <img src={`${process.env.APP_URL}/images/download.svg`} />
          </a>
        </div>
        <div className={`${styles.image} mt-4`}>
          <img
            src={props.g_chat_obj.imageToBeShownInMsgImgPreview}
            className="img-fluid "
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default GlobalImagePreviewModal;
