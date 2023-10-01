import useDeleteStripeCard from "../../../../hooks/Billing/useDeleteStripeCard";
import useMarkStripeCardAsDefault from "../../../../hooks/Billing/useMarkStripeCardAsDefault";
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
import styles from "./UI.module.scss";
import { useEffect, useState } from "react";
import useCancelSubscription from "../../../../hooks/Billing/useCancelSubscription";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export const StepOneLoadingState = () => {
  return (
    <div className={`row ${styles.loading_container}`}>
      {[1, 2, 3, 4].map((val) => {
        return (
          <div className="col-md-6" key={val}>
            <div className={`${styles.select_plan}`}>
              <div className={styles.plan_pricing}>
                <p className="animated_shimmer"></p>
                <h3 className="animated_shimmer"></h3>
              </div>
              <div className={styles.body}>
                <p className="animated_shimmer"></p>
                <ul>
                  <li className="animated_shimmer"></li>
                  <li className="animated_shimmer"></li>
                  <li className="animated_shimmer"></li>
                  <li className="animated_shimmer"></li>
                  <li className="animated_shimmer"></li>
                  <li className="animated_shimmer"></li>
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const CancelSubscriptionModal = ({
  showModal,
  setShowModal,
  resetBillingReducer,
  nextPaymentDate,
}) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useCancelSubscription();
  const cancelSubscriptionHandler = (e) => {
    e.preventDefault();
    mutate(_, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["currentActivePlan"] });
        toast.success("Your subscription has been cancelled.");
        setShowModal(false);
        resetBillingReducer(e);
      },
    });
  };

  return (
    <Modal
      isOpen={showModal}
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
            <h2>Confirm cancellation</h2>
            <p>
              By canceling your subscription, you will lose any remaining
              credits in your account, which cannot be recovered. Please use any
              unused credits before canceling. Additionally, canceling your
              subscription will switch you to our Free Plan.
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
              <button onClick={cancelSubscriptionHandler}>
                Yes, cancel it {isLoading && <Spinner size="sm" />}
              </button>
            </div>
          </div>
        </ModalBody>
      </div>
    </Modal>
  );
};

export const StepOneFooter = ({
  isValid,
  values,
  resetBillingReducer,
  disabledCancelSubscriptioin,
  nextPaymentDate,
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className={styles.buttons_wrapper}>
        {!disabledCancelSubscriptioin && (
          <button
            className={styles.cancel_sub}
            onClick={(e) => {
              e.preventDefault();
              setShowModal(true);
            }}
          >
            Cancel Subscription
          </button>
        )}
        <button
          className={styles.change_plan}
          type="submit"
          disabled={!isValid || !values.plan}
        >
          Next
        </button>
      </div>
      <CancelSubscriptionModal
        showModal={showModal}
        setShowModal={setShowModal}
        resetBillingReducer={resetBillingReducer}
        nextPaymentDate={nextPaymentDate}
      />
    </>
  );
};

export const UsersCardsList = ({
  cardsData,
  setSelectedPaymentMethod,
  values,
  setSelectedCardBrand,
  setSelectedCardEndingIn,
}) => {
  const { mutate, isLoading } = useDeleteStripeCard();
  const { mutate: markCardAsDefaultHandler, isLoading: isMarkingDefault } =
    useMarkStripeCardAsDefault();
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [currentPayMethod, setCurrentPayMethod] = useState(null);
  const deleteUserCardHandler = (e, pm) => {
    e.preventDefault();
    mutate(pm);
    setShowDeleteModal(false);
  };

  const [dropdownOpen, setDropdownOpen] = useState({});

  const toggle = (idx) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [idx]: !prevState[idx],
    }));
  };

  useEffect(() => {
    if (cardsData[0].is_default) {
      setSelectedPaymentMethod(cardsData[0].id);
      setSelectedCardBrand(cardsData[0].card.brand);
      setSelectedCardEndingIn(cardsData[0].card.last4);
    }
  }, []);

  return (
    <>
      {/* <ul
        className={`${(isLoading || isMarkingDefault) && "blur-8"} ${
          styles.card_list
        }`}
      > */}
      {cardsData.map((method, idx) => (
        <div
          className={`${styles.card} ${
            method.id == values.selectedCard ? styles.selected : ""
          } ${(isLoading || isMarkingDefault) && styles.load_shimmer}`}
        >
          {/* <div className="gl-radio form-check mb-0 form-group"> */}
          {/* <label className="mb-0  cursor-pointer"> */}
          <input
            type="radio"
            name="selectedCard"
            value={values.selectedCard}
            checked={method.id == values.selectedCard}
            onChange={(e) => {
              setSelectedPaymentMethod(method.id);
              setSelectedCardBrand(method.card.brand);
              setSelectedCardEndingIn(method.card.last4);
            }}
          />
          <>
            {/* {method.card.brand} */}
            <span className="d-block mb-1">
              {method.card?.funding
                ?.toLowerCase()
                ?.replace(/(?:^|\s)\w/g, function (match) {
                  return match.toUpperCase();
                })}{" "}
              card
              {method.is_default && (
                <small className={styles.default}> Default </small>
              )}
            </span>

            <div>
              {method.card.brand == "discover" ||
              method.card.brand == "visa" ||
              method.card.brand == "mastercard" ||
              method.card.brand == "diners" ||
              method.card.brand == "unionpay" ||
              method.card.brand == "amex" ? (
                <img
                  src={`${process.env.APP_URL}/images/${method.card.brand}.svg`}
                  width="24px"
                  height="24px"
                />
              ) : (
                <img
                  src={`${process.env.APP_URL}/images/generic-card.svg`}
                  width="24px"
                  height="24px"
                />
              )}
              <span className="mt-1 ml-2">**** {method.card.last4}</span>
            </div>

            <ButtonDropdown
              isOpen={dropdownOpen[idx]}
              id={`dropdown-button-drop-${idx}`}
              toggle={() => toggle(idx)}
              direction="down"
              className={`${styles.dropdownBtn}`}
            >
              <DropdownToggle className={`bg-transparent border-0 px-0`}>
                <img
                  src={process.env.APP_URL + "/images/more-vertical-sm.svg"}
                  className="img-fluid"
                />
              </DropdownToggle>
              <DropdownMenu className={`py-0 ${styles.dropdown_menu}`}>
                <ul className="list-unstyled">
                  <li className="cursor-pointer d-flex align-items-center">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPayMethod(method.id);
                        setSelectedPaymentMethod(null);
                        setShowDeleteModal(true);
                        toggle(idx);
                      }}
                    >
                      <img
                        className="img-fluid"
                        src={`${process.env.APP_URL}/images/outline-delete.svg`}
                      />
                      Delete
                    </button>
                  </li>
                  {!method.is_default && (
                    <li className="cursor-pointer d-flex align-items-center">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          markCardAsDefaultHandler(method.id);
                          toggle(idx);
                        }}
                      >
                        <img
                          className="img-fluid"
                          src={`${process.env.APP_URL}/images/default-outline.svg`}
                        />
                        Set as default
                      </button>
                    </li>
                  )}
                </ul>
              </DropdownMenu>
            </ButtonDropdown>
          </>
        </div>
      ))}
      {/* </ul> */}
      {showDeleteModal && (
        <DeleteCardModal
          currentPayMethod={currentPayMethod}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          deleteUserCardHandler={deleteUserCardHandler}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
        />
      )}
    </>
  );
};

const DeleteCardModal = ({
  currentPayMethod,
  showDeleteModal,
  setShowDeleteModal,
  deleteUserCardHandler,
  setSelectedPaymentMethod,
}) => {
  return (
    <Modal
      isOpen={showDeleteModal}
      className={`discardModal`}
      backdrop="static"
      contentClassName="bg-transparent border-0"
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
                setSelectedPaymentMethod(currentPayMethod);
                setShowDeleteModal(false);
              }}
            >
              Close
            </button>
            <button onClick={(e) => deleteUserCardHandler(e, currentPayMethod)}>
              Delete it
            </button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export const SubscriptionSuccessModal = ({
  showModal,
  setShowModal,
  resetBillingReducer,
  setJobPostingLimitEnd,
}) => {
  return (
    <Modal
      isOpen={showModal}
      className={`discardModal`}
      contentClassName="bg-transparent border-0"
      backdrop="static"
      keyboard={false}
    >
      <div className={`${styles.deleteTeamModal}`}>
        <ModalBody>
          <div className={`${styles.deleteTeamModal}`}>
            <ModalBody>
              <div
                className={`${styles.delete_confirm_modal} ${styles.payment_confirm}`}
              >
                <div className={`${styles.img_wrap}`}>
                  <img
                    src={`${process.env.APP_URL}/images/payment-done.svg`}
                    alt="success"
                    className="img-fluid"
                  />
                </div>
                <h2>Subscription Success!</h2>
                <p>Thank you for subscribing.</p>
                <div className={styles.button_wrap}>
                  <button
                    onClick={(e) => {
                      setShowModal(false);
                      resetBillingReducer();
                      setJobPostingLimitEnd(false);
                    }}
                  >
                    Done
                  </button>
                </div>
              </div>
            </ModalBody>
          </div>
        </ModalBody>
      </div>
    </Modal>
  );
};

export const SubscriptionFailModal = ({
  showModal,
  setShowModal,
  resetBillingReducer,
  subscriptionHandler,
  stripeError,
  selectedPlan,
}) => {
  return (
    <Modal
      isOpen={showModal}
      className={`discardModal`}
      backdrop="static"
      contentClassName="bg-transparent border-0"
      keyboard={false}
    >
      <div className={`${styles.deleteTeamModal}`}>
        <ModalBody>
          <div
            className={`${styles.delete_confirm_modal} ${styles.payment_failed_modal}`}
          >
            <div className={`${styles.img_wrap}`}>
              <img
                src={`${process.env.APP_URL}/images/failed-payment.svg`}
                alt="success"
                className="img-fluid"
              />
            </div>
            <h2>Payment failed</h2>
            {stripeError && <p>{stripeError}</p>}
            <div className={styles.button_wrap}>
              <button
                className={styles.cancel_btn}
                onClick={(e) => {
                  setShowModal(false);
                }}
              >
                Close
              </button>
              <button
                onClick={(e) => {
                  setShowModal(false);
                  subscriptionHandler(e);
                }}
              >
                Try again
              </button>
            </div>
          </div>
        </ModalBody>
      </div>
    </Modal>
  );
};
