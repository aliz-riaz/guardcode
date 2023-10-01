import useCreateAbunduntOrder from "../../../../hooks/Billing/useCreateAbunduntOrder";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  Spinner,
} from "reactstrap";
import { connect } from "react-redux";
import styles from "./ConfirmCloseModal.module.scss";
import {
  setShowBillingModal,
  resetBillingReducer,
} from "../../../../redux/actions/billingAction";

const ConfirmCloseModal = ({
  showCancelModal,
  setShowCancelModal,
  cart,
  setShowBillingModal,
  resetBillingReducer,
}) => {
  const { mutate, isLoading } = useCreateAbunduntOrder();

  const createAbunduntOrder = () => {
    const transformedOrder = cart.map((item) => {
      let type;
      let qty;

      switch (item.id) {
        case "jobboost":
          type = "boost_job";
          qty = item.credits;
          break;
        case "cvviews":
          type = "cv_views";
          qty = item.credits;
          break;
        case "jobpost":
          type = "job_post";
          qty = item.credits;
          break;
        default:
          break;
      }

      return { type, qty };
    });
    const payload = { items: transformedOrder };
    setShowBillingModal(false);
    resetBillingReducer();
    mutate(payload);
  };

  return (
    <Modal
      isOpen={showCancelModal}
      className={`discardModal`}
      contentClassName="bg-transparent border-0"
      backdrop="static"
      keyboard={false}
    >
      <div className={`${styles.deleteTeamModal}`}>
        <ModalBody>
          <div
            className={`${styles.delete_confirm_modal} ${styles.cancelation_modal}`}
          >
            <div className={`${styles.img_wrap}`}>
              <img
                src={`${process.env.APP_URL}/images/success-check.svg`}
                alt="success"
                className="img-fluid"
              />
            </div>
            <h2>Confirmation Required</h2>
            <p>
              Are you sure you want to go back? Any unsaved changes will be
              lost.
            </p>
            <div className={styles.button_wrap}>
              <button
                className={styles.cancel_btn}
                onClick={(e) => {
                  e.preventDefault();
                  setShowCancelModal(false);
                }}
              >
                Close
              </button>
              <button onClick={createAbunduntOrder}>
                Yes, go back {isLoading && <Spinner size="sm" />}
              </button>
            </div>
          </div>
        </ModalBody>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  cart: state.vantage.billingReducer.cart,
});

const mapDispatchToProps = (dispatch) => ({
  setShowBillingModal: (status) => dispatch(setShowBillingModal(status)),
  resetBillingReducer: () => dispatch(resetBillingReducer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmCloseModal);
