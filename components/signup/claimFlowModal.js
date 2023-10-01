import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useRouter } from "next/router";
import styles from "./claimFlowModal.module.scss";
import { getCompanyInfo } from "../../redux/actions/signup";

const ClaimFlowModal = (props) => {
  const router = useRouter();
  const [show, setShow] = useState(
    props.isClaimFlow && !props.didUserSawTheModal ? true : false
  );
  const [companyImage, setCompanyImage] = useState("");

  useEffect(async () => {
    if (props.isClaimFlow) {
      const companyData = await getCompanyInfo(props.isClaimFlow);
      setCompanyImage(companyData?.brand?.logo_url);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    props.setDidUserSawTheModal(true);
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
        <Modal.Body className="py-4">
          <div className="text-center pt-3">
            <div className={`${styles.shimmer_load}`}>
              <div className={`${styles.compnay_img} mt-0`}>
                <img src={companyImage} />
              </div>
              <span className={``}></span>
              <span className={`${styles.seventy}`}></span>
              <span className={`${styles.eighty}`}></span>
              <span className={`${styles.hundred}`}></span>
              {/* <div className={`${styles.shild_icon}`}>
                <img src={`${process.env.APP_URL}/images/tik_icon.svg`} height="26px" />
              </div> */}
            </div>
            <h2 className="">Create your free account to manage this page</h2>
            <div
              className={`${styles.close} cursor-pointer`}
              onClick={handleClose}
            >
              <img
                src={`${process.env.APP_URL}/images/cancel.svg`}
                width="16px"
              />
            </div>
            <div className={`mx-auto  pt-3 ${styles.cont_width}`}>
              <p className="mb-0 fs-7 text-left fw-medium mb-2">
                Account benefits:
              </p>
              <ul className="text-left p-0 m-0 fw-medium">
                <li className="d-flex align-items-start mb-2">
                  <img
                    src={`${process.env.APP_URL}/images/check.png`}
                    width="18px"
                  />
                  <span className="mt- ml-2" style={{ marginTop: "-2px" }}>
                    Receive quote requests from potential customers
                  </span>
                </li>
                <li className="d-flex align-items-start mb-2">
                  <img
                    src={`${process.env.APP_URL}/images/check.png`}
                    width="18px"
                  />
                  <span className="mt- ml-2" style={{ marginTop: "-2px" }}>
                    Be featured in our directory of all UK Security companies
                  </span>
                </li>
                <li className="d-flex align-items-start mb-2">
                  <img
                    src={`${process.env.APP_URL}/images/check.png`}
                    width="18px"
                  />
                  <span className="mt- ml-2" style={{ marginTop: "-2px" }}>
                    Manage your company page
                  </span>
                </li>
                <li className="d-flex align-items-start mb-2">
                  <img
                    src={`${process.env.APP_URL}/images/check.png`}
                    width="18px"
                  />
                  <span className="mt- ml-2" style={{ marginTop: "-2px" }}>
                    Book SIA training at over 85 locations in the UK
                  </span>
                </li>
                <li className="d-flex align-items-start mb-2">
                  <img
                    src={`${process.env.APP_URL}/images/check.png`}
                    width="18px"
                  />
                  <span className="mt- ml-2" style={{ marginTop: "-2px" }}>
                    Post jobs and hire security staff nationally
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-4">
            <Button
              className="btn btn-green btn-lg fs-6 fw-bold px-4 text-dark"
              onClick={handleClose}
            >
              Create an account
            </Button>
          </div>

          <div className="mt-2 text-center fw-medium mt-4">
            Already have an account?{" "}
            <span
              className="cursor-pointer text-decoration-line"
              onClick={() =>
                router.push(`/account-settings?claim=${props.isClaimFlow}`)
              }
            >
              Login and claim this page
            </span>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ClaimFlowModal;
