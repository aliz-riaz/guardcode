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
import styles from "./ConformationModal.module.scss";
import { useQueryClient } from "@tanstack/react-query";
import { connect } from "react-redux";
import { useState } from "react";
const ConformationModal = ({
  showModal,
  setShowModal,
  currentPayMethod,
  setChangeCardModal,
  setSelectedCard,
  selectedCardBrand,
  selectedCardLast4,
}) => {
  const queryClient = useQueryClient();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const changeSubscriptionCard = (e, pm) => {
    e.preventDefault();
    setIsSubmitting(true);

    setSelectedCard({
      cardBrand: selectedCardBrand,
      cardLast4: selectedCardLast4,
      paymentMethod: pm,
    });

    setChangeCardModal(false);
    setShowModal(false);
    setIsSubmitting(false);
  };
  return (
    <Modal
      isOpen={showModal}
      className={`discardModal`}
      backdrop="static"
      contentClassName="bg-transparent border-0"
      keyboard={false}
    >
      <ModalBody>
        <div className={styles.delete_confirm_modal}>
          <div className={`${styles.img_wrap}`}>
            <img
              src={`${process.env.APP_URL}/images/success-check.svg`}
              alt="success"
              className="img-fluid"
            />
          </div>
          <h2>Are you sure?</h2>
          <p>
            You are about to change your subscription card, your next
            subscription charges will be detected from.
          </p>
          <div className={styles.button_wrap}>
            <button
              className={styles.cancel_btn}
              onClick={(e) => {
                e.preventDefault();
                setShowModal(false);
              }}
            >
              Close
            </button>
            <button
              onClick={(e) => changeSubscriptionCard(e, currentPayMethod)}
              disabled={isSubmitting}
            >
              Change it
            </button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  // showChangeCardModal: state.vantage.billingReducer.showChangeCardModal,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ConformationModal);
