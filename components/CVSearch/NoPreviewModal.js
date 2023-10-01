import { Modal } from "react-bootstrap";
import styles from "./NoPreviewModal.module.scss";
import { useIntercom } from "react-use-intercom";
import { useRouter } from "next/router";
import { connect } from "react-redux";

const NoPreviewModal = ({ showModal, handleClose, isOrganisationApproved }) => {
  const { show } = useIntercom();
  const router = useRouter();
  const showChat = () => {
    show();
    // $crisp.push(["do", "chat:toggle"])
    handleClose();
  };

  return (
    <Modal show={showModal} className={`${styles.no_preview_modal}`}>
      <Modal.Body>
        <div
          onClick={handleClose}
          className={`${styles.close} text-right cursor-pointer`}
        >
          <img src={`${process.env.APP_URL}/images/cancel.svg`} width="16px" />
        </div>
        <div className={`${styles.modal_cont} text-center`}>
          <h3 className="fw-normal">
            {isOrganisationApproved == 0 ? (
              <>
                Your organisation verification is in progress, we’ll notify you
                as soon as your organisation is verified!
              </>
            ) : (
              <>
                Your CV views quota has been exhausted.{" "}
                <span
                  onClick={() =>
                    router.push("/account-settings?redirect_to_billing=true")
                  }
                  className="fw-bold text-decoration-line cursor-pointer"
                >
                  Upgrade
                </span>{" "}
                your plan to gain more CV views.
              </>
            )}
          </h3>
          {/* <h3>Looks like CV views have been consumed or they’ve expired.</h3> */}
          <img
            src={`${process.env.APP_URL}/images/notfound.svg`}
            className="img-fluid"
            alt="Not found"
          />
          <p className="mt-4 fs-6 fw-medium text-center">
            {/* Contact a member of our team to refresh your quota */}
            For further information, please contact a member of our team.
            <span
              className="d-block text-decoration-line cursor-pointer"
              onClick={showChat}
            >
              Chat with us
            </span>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  isOrganisationApproved:
    state.vantage.organisationReducer.isOrganisationApproved,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NoPreviewModal);
