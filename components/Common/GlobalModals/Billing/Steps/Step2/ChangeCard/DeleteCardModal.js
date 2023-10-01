import useDeleteStripeCard from "../../../../../../../hooks/Billing/useDeleteStripeCard";
import { connect } from "react-redux";
import {
  setSelectedPaymentMethod,
  setSelectedCardBrand,
  setSelectedCardEndingIn,
} from "../../../../../../../redux/actions/billingAction";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import styles from "./DeleteCardModal.module.scss";
import { useQueryClient } from "@tanstack/react-query";
const DeleteCardModal = ({
  currentPayMethod,
  showDeleteModal,
  setShowDeleteModal,
  setFieldValue,

  setSelectedPaymentMethod,
  setSelectedCardBrand,
  setSelectedCardEndingIn,
}) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useDeleteStripeCard();

  const deleteUserCardHandler = (e, pm) => {
    e.preventDefault();
    mutate(pm, {
      onSuccess: () => {
        queryClient.invalidateQueries(["userCardList"]);
        // queryClient.refetchQueries("userCardList");
        setShowDeleteModal(false);

        setFieldValue("selectedPaymentMethod", "");
        setFieldValue("brandName", "");
        setFieldValue("cardEndingIn", "");

        setSelectedPaymentMethod("");
        setSelectedCardBrand("");
        setSelectedCardEndingIn("");
      },
    });
  };
  return (
    <Modal
      isOpen={showDeleteModal}
      className={`discardModal`}
      contentClassName="bg-transparent border-0"
      backdrop="static"
      keyboard={false}
    >
      <ModalBody>
        <div className={styles.delete_confirm_modal}>
          <div className={`${styles.img_wrap}`}>
            <img
              src={`${process.env.APP_URL}/images/delete-confirm.svg`}
              alt="success"
              className="img-fluid"
            />
          </div>
          <h2>Are you sure?</h2>
          <p>
            You want to delete this card, if not than close this popup and
            continue with your process.
          </p>
          <div className={styles.button_wrap}>
            <button
              type="button"
              className={styles.cancel_btn}
              onClick={(e) => {
                setFieldValue("selectedPaymentMethod", currentPayMethod);
                setShowDeleteModal(false);
              }}
            >
              Close
            </button>
            <button
              type="button"
              onClick={(e) => deleteUserCardHandler(e, currentPayMethod)}
            >
              {isLoading ? "Deleting.." : "Delete it"}
            </button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  selectedPaymentMethod: state.vantage.billingReducer.selectedPaymentMethod,
  selectedCardBrand: state.vantage.billingReducer.selectedCardBrand,
  selectedCardEndingIn: state.vantage.billingReducer.selectedCardEndingIn,
  currentStep: state.vantage.billingReducer.currentStep,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedPaymentMethod: (pm) => dispatch(setSelectedPaymentMethod(pm)),
  setSelectedCardBrand: (brand) => dispatch(setSelectedCardBrand(brand)),
  setSelectedCardEndingIn: (endingIn) =>
    dispatch(setSelectedCardEndingIn(endingIn)),

  setCurrentBillingModalStep: (step) =>
    dispatch(setCurrentBillingModalStep(step)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteCardModal);
