import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useRouter } from "next/router";
import styles from "./VerificationModal.module.scss";
import { getCompanyInfo } from "../../redux/actions/signup";

const VerificationModal = ({ show, setShow, setClaimStatus, claim }) => {
  const [companyImage, setCompanyImage] = useState("");
  const router = useRouter();
  //   const [show, setShow] = useState(props.showModal);

  useEffect(async () => {
    if (claim) {
      const companyData = await getCompanyInfo(claim);
      setCompanyImage(companyData?.brand?.logo_url);
    }
    setClaimStatus("Pending");
  }, []);

  const handleClose = () => {
    setShow(false);
    router.push("/account-settings");
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <Modal
        show={show}
        //show={true}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className={`${styles.modal_verification}`}
      >
        <Modal.Body className="position-relative py-4">
          <div className={`${styles.shimmer_load}`}>
            <div className={`${styles.compnay_img} mt-0 text-center`}>
              <img src={companyImage} />
            </div>
            <span className={``}></span>
            <span className={`${styles.seventy}`}></span>
            <span className={`${styles.eighty}`}></span>
            <span className={`${styles.hundred}`}></span>
            <div className={`${styles.shild_icon}`}>
              <img
                src={`${process.env.APP_URL}/images/tik_icon.svg`}
                height="26px"
              />
            </div>
          </div>
          <h2 className="text-center pt-2">We’re verifying a few details </h2>
          <p className="text-center fs-6 fw-medium fs-6 mt-3">
            You’ll be able to manage your company profile page{" "}
            <br className="d-none d-md-block" /> once we’re done with a few
            simple checks. This usually <br className="d-none d-md-block" />{" "}
            takes under 15 mins on a working day.
          </p>
          <div
            className={`${styles.close} cursor-pointer`}
            onClick={handleClose}
          >
            <img
              src={`${process.env.APP_URL}/images/cancel.svg`}
              width="16px"
            />
          </div>
          <div className="text-center pt-2 pb-2">
            <Button
              className="btn btn-green btn-lg fs-6 fw-bold px-4 text-dark px-5"
              onClick={handleClose}
            >
              Ok, Got it
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
});
const mapDispatchToProps = (dispatch) => ({
  getCompanyInfo: (token) => dispatch(getCompanyInfo(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VerificationModal);
