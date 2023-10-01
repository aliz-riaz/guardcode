import styles from "./ChangeSubscriptionCard.module.scss";
import { FormGroup, Spinner, Modal } from "react-bootstrap";
import { Field } from "formik";
import { Formik, Form } from "formik";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useIntercom } from "react-use-intercom";
import useUserCardList from "../../../../hooks/Billing/useUserCardList";
import useDeleteStripeCard from "../../../../hooks/Billing/useDeleteStripeCard";
import useMarkStripeCardAsDefault from "../../../../hooks/Billing/useMarkStripeCardAsDefault";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  setSelectedPlan,
  setPlanIntervalSwitchValue,
  setSelectedPaymentMethod,
  setCurrentBillingModalStep,
  setSelectedCardBrand,
  setSelectedCardEndingIn,
  resetBillingReducer,
} from "../../../../redux/actions/billingAction";

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import ContentEditable from "react-contenteditable";
import * as Yup from "yup";

import UsersCardList from "./UsersCardList";
import AddNewCard from "./AddNewCard";
import ConformationModal from "./ConformationModal";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const addNewCardValidationSchema = Yup.object().shape({
  nameOnCard: Yup.string().required("This field is requierd."),
  cardNumber: Yup.string().required("This field is requierd."),
  cardExpiry: Yup.string().required("This field is requierd."),
  cardCVC: Yup.string().required("This field is requierd."),
});

const ChangeSubscriptionCard = ({ showModal, setShowModal }) => {
  const { data: cardsData, isLoading: isCardsDataLoading } = useUserCardList();

  const [showAddNewCard, setShowAddNewCard] = useState(false);
  const [showConformationModal, setShowConformationModal] = useState(false);

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
  };

  return (
    <Modal
      show={showModal}
      className={`discardModal`}
      backdrop="static"
      keyboard={false}
      centered
      modalClassName=""
      contentClassName="h-auto"
      size="lg"
    >
      <Modal.Body>
        <Formik
          initialValues={{
            //step1
            selectedPaymentMethod: "",

            nameOnCard: "",
            cardNumber: null,
            cardExpiry: null,
            cardCVC: null,
          }}
          validationSchema={addNewCardValidationSchema}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
            isValid,
            setFieldValue,
            setFieldTouched,
          }) => (
            <Elements stripe={stripePromise}>
              <Form className="px-2 py-2">
                <div className={styles.modal_header}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowModal(false);
                    }}
                  >
                    <img
                      src={process.env.APP_URL + "/images/arrow-left.svg"}
                      alt="arrow"
                      className="img-fluid"
                    />
                    Back
                  </button>
                  <h2>My Cards</h2>
                </div>
                <div className={styles.card_list}>
                  {isCardsDataLoading ? (
                    <div className={styles.loading_card}>
                      <span></span>
                      <div></div>
                    </div>
                  ) : (
                    <>
                      {cardsData.length > 0 && (
                        <UsersCardList
                          cardsData={cardsData}
                          values={values}
                          setFieldValue={setFieldValue}
                        />
                      )}
                    </>
                  )}
                  <button
                    className={styles.add_button}
                    onClick={() => setShowAddNewCard((prev) => !prev)}
                  >
                    <span>
                      <img
                        src={process.env.APP_URL + "/images/plus-white.svg"}
                        alt="icon"
                      />
                    </span>
                    Add new card
                  </button>
                  {showAddNewCard && (
                    <AddNewCard
                      showAddNewCard={showAddNewCard}
                      setShowAddNewCard={setShowAddNewCard}
                      setFieldValue={setFieldValue}
                      isValid={isValid}
                      values={values}
                    />
                  )}
                </div>
                <div
                  className={`row no-gutters align-items-center ${styles.card_footer}`}
                >
                  <div className="col-lg-7">
                    <p className="mb-md-0 mb-3">
                      <img
                        src={process.env.APP_URL + "/images/info-outline.svg"}
                        alt="icon"
                      />
                      Your selected card will be your default card for future
                      transactions.
                    </p>
                  </div>
                  <div className="col-lg-5 text-right">
                    <button
                      className={styles.add_button}
                      onClick={() => setShowConformationModal(true)}
                      disabled={values.selectedPaymentMethod ? false : true}
                    >
                      Change Card
                    </button>
                  </div>
                </div>
                <ConformationModal
                  showModal={showConformationModal}
                  setShowModal={setShowConformationModal}
                  currentPayMethod={values.selectedPaymentMethod}
                />
              </Form>
            </Elements>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ChangeSubscriptionCard;
