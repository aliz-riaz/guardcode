import styles from "./CardSelection.module.scss";

import { Formik, Form } from "formik";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useUserCardList from "../../../../../../../hooks/Billing/useUserCardList";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  setSelectedPaymentMethod,
  setSelectedCardBrand,
  setSelectedCardEndingIn,
  setCurrentBillingModalStep,
} from "../../../../../../../redux/actions/billingAction";

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

const CardSelection = (props) => {
  const { data: cardsData, isLoading: isCardsDataLoading } = useUserCardList();

  const [showAddNewCard, setShowAddNewCard] = useState(false);
  const [showConformationModal, setShowConformationModal] = useState(false);

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
  };

  useEffect(() => {
    if (cardsData?.length <= 0) {
      setShowAddNewCard(true);
    }
  }, []);

  return (
    <Formik
      initialValues={{
        //step1
        selectedPaymentMethod: props.selectedPaymentMethod,
        brandName: props.selectedCardBrand,
        cardEndingIn: props.selectedCardEndingIn,

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
          <Form className="px-4 py-2">
            <div className={styles.modal_header}>
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
                      selectedPaymentMethodStore={props.selectedPaymentMethod}
                      selectedCardBrandStore={props.selectedCardBrand}
                      selectedCardEndingInStore={props.selectedCardEndingIn}
                    />
                  )}
                </>
              )}
              {!showAddNewCard && (
                <button
                  type="button"
                  className={styles.add_button}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAddNewCard((prev) => !prev);
                  }}
                >
                  <span>
                    <img
                      src={process.env.APP_URL + "/images/plus-white.svg"}
                      alt="icon"
                    />
                  </span>
                  Add new card
                </button>
              )}
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
              className={`row no-gutters align-items-center mt-4 pb-3 ${styles.card_footer}`}
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
                  type="button"
                  className={styles.add_button}
                  onClick={(e) => {
                    e.preventDefault();
                    props.setSelectedPaymentMethod(
                      values.selectedPaymentMethod
                    );
                    props.setSelectedCardBrand(values.brandName);
                    props.setSelectedCardEndingIn(values.cardEndingIn);
                    props.setCurrentBillingModalStep(
                      parseInt(props.currentStep) - 1
                    );
                  }}
                  disabled={values.selectedPaymentMethod ? false : true}
                >
                  Next
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

export default connect(mapStateToProps, mapDispatchToProps)(CardSelection);
