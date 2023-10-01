import useDeleteStripeCard from "../../../../hooks/Billing/useDeleteStripeCard";
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
import styles from "./DeleteCardModal.module.scss";
import { useQueryClient } from "@tanstack/react-query";
const DeleteCardModal = ({
  currentPayMethod,
  showDeleteModal,
  setShowDeleteModal,
  setFieldValue,
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
              className={styles.cancel_btn}
              onClick={(e) => {
                setFieldValue("selectedPaymentMethod", currentPayMethod);
                setShowDeleteModal(false);
              }}
            >
              Close
            </button>
            <button onClick={(e) => deleteUserCardHandler(e, currentPayMethod)}>
              Delete it {isLoading && <Spinner size="sm" />}
            </button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteCardModal;
