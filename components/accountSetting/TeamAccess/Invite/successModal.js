import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "./InviteMember.module.scss";
import Lottie from "lottie-react";
import Accepted from "../../../../lottie/accepted.json";

const SuccessModal = (props) => {
  return (
    <>
      <div className={`${styles.successModal}`}>
        <div className={`${styles.lottieWrap}`}>
          <Lottie animationData={Accepted} loop={false} />
        </div>
        <h2 className={`fs-2 fw-medium mt-3`}>
          Team access permission has been submitted to all{" "}
          <br className={`d-none d-md-block`} /> given members' email addresses
        </h2>
      </div>
    </>
  );
};

export default SuccessModal;
