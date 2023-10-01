import styles from "./AddNewCard.module.scss";
import { Form, FormGroup, Spinner } from "react-bootstrap";
import { Field } from "formik";
import { useIntercom } from "react-use-intercom";
import { useQueryClient } from "@tanstack/react-query";

import useSaveNewCard from "../../../../../hooks/Billing/useSaveNewCard";
import { useState } from "react";
import { connect } from "react-redux";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

const AddNewCard = ({
  setShowAddNewCard,
  setFieldValue,
  isValid,
  values,
  user_email,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess } = useSaveNewCard();

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [cardNumberElementError, setCardNumberElementError] = useState(null);
  const [cardExpiryElementError, setCardExpiryElementError] = useState(null);
  const [cardCvcElementError, setCardCvcElementError] = useState(null);
  const [isDefaultChecked, setIsDefaultChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [cardBrandImage, setCardBrandImage] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  const resetAllStates = () => {
    setName("");
    setNameError(false);
    setCardNumberElementError(null);
    setCardExpiryElementError(null);
    setCardCvcElementError(null);
    setIsDefaultChecked(false);
    setCardBrandImage(null);
    setShowAddNewCard(false);
  };

  const saveNewCardHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const paymentMethod = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
      billing_details: {
        name: name,
        email: user_email,
        // address: {
        //   postal_code: postCode,
        // },
      },
    });
    const pm = paymentMethod.paymentMethod?.id;
    mutate(
      { pm, is_default: isDefaultChecked },
      {
        onSuccess: () => {
          //   setCurrentBillingModalStep(2);
          queryClient.invalidateQueries(["userCardList"]);
          // queryClient.refetchQueries("userCardList");
          elements.getElement(CardNumberElement).clear();
          elements.getElement(CardExpiryElement).clear();
          elements.getElement(CardCvcElement).clear();
          setIsSubmitting(false);
          resetAllStates();
        },
        onError: () => {
          setIsSubmitting(false);
        },
      }
    );
  };

  // const { mutate, isLoading, isSuccess } = useSaveNewCard();

  // const [name, setName] = useState("");
  // const [nameError, setNameError] = useState(false);
  // const [cardNumberElementError, setCardNumberElementError] = useState(false);
  // const [cardExpiryElementError, setCardExpiryElementError] = useState(false);
  // const [cardCvcElementError, setCardCvcElementError] = useState(false);
  // const [isDefaultChecked, setIsDefaultChecked] = useState(false);

  // const [cardBrandImage, setCardBrandImage] = useState(null);
  // const [isSubmitting, setIsSubmitting] = useState(false);

  // const stripe = useStripe();
  // const elements = useElements();

  // const saveNewCardHandler = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   const paymentMethod = await stripe.createPaymentMethod({
  //     type: "card",
  //     card: elements.getElement(CardNumberElement),
  //     billing_details: {
  //       name: name,
  //       // address: {
  //       //   postal_code: postCode,
  //       // },
  //     },
  //   });
  //   const pm = paymentMethod.paymentMethod?.id;
  //   mutate(
  //     { pm, is_default: isDefaultChecked },
  //     {
  //       onSuccess: () => {
  //         //   setCurrentBillingModalStep(2);
  //         queryClient.invalidateQueries(["userCardList"]);
  //         queryClient.refetchQueries("userCardList");
  //         elements.getElement(CardNumberElement).clear();
  //         elements.getElement(CardExpiryElement).clear();
  //         elements.getElement(CardCvcElement).clear();
  //         setIsSubmitting(false);
  //         resetAllStates();
  //       },
  //       onError: () => {
  //         setIsSubmitting(false);
  //       },
  //     }
  //   );
  // };

  return (
    <div className={styles.add_new_card}>
      <h2>Add new card</h2>
      <div className={styles.card}>
        <div className={styles.card_front}>
          <div
            className={`${styles.input_field} 
            ${cardNumberElementError?.empty && "mb-0"} 
            ${cardNumberElementError?.error && "mb-0"}`}
          >
            <label>Card number</label>
            <FormGroup className={`${styles.card_wrap}`}>
              {cardBrandImage == "discover" ||
              cardBrandImage == "visa" ||
              cardBrandImage == "mastercard" ||
              cardBrandImage == "diners" ||
              cardBrandImage == "unionpay" ||
              cardBrandImage == "amex" ? (
                <span className={styles.card_icon}>
                  <img
                    src={`${process.env.APP_URL}/images/${cardBrandImage}.svg`}
                    width="44px"
                    height="30px"
                  />
                </span>
              ) : (
                <span className={styles.card_icon}>
                  <img
                    src={`${process.env.APP_URL}/images/blank-card.svg`}
                    width="44px"
                    height="30px"
                  />
                </span>
              )}
              <CardNumberElement
                onBlur={(e) => {}}
                onChange={(e) => {
                  setCardBrandImage(e.brand);
                  setCardNumberElementError(e);
                  setFieldValue("cardNumber", e.complete);
                }}
                options={{
                  placeholder: "**** **** **** ****", // Set your custom placeholder text
                }}
              />
            </FormGroup>
            {cardNumberElementError?.error && (
              <div className="text-danger mt-1">
                {cardNumberElementError?.error?.message}
              </div>
            )}
            {cardNumberElementError?.empty && (
              <div className="text-danger mt-1">
                Please enter your card number
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-8">
              <div className={styles.input_field}>
                <label>Name on card</label>
                <Field
                  type="text"
                  name="nameOnCard"
                  autoComplete="off"
                  maxLength="50"
                  className={styles.input}
                  value={name}
                  placeholder="- - - - - -"
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError(false);
                    setFieldValue("nameOnCard", e.target.value);
                  }}
                  onBlur={(e) => {
                    if (!e.target.value) {
                      setNameError(true);
                      setFieldValue("nameOnCard", e.target.value);
                    }
                  }}
                />
                {nameError && (
                  <div className="text-danger mt-1">
                    Please enter your name on card
                  </div>
                )}
              </div>
            </div>
            <div className="col-4">
              <div className={styles.input_field}>
                <label>Expiration</label>
                <CardExpiryElement
                  className={styles.card_wrap}
                  onChange={(e) => {
                    setCardExpiryElementError(e);
                    setFieldValue("cardExpiry", e.complete);
                  }}
                  options={{
                    placeholder: "MM/YY", // Set your custom placeholder text
                  }}
                />
                {cardExpiryElementError?.error && (
                  <div className="text-danger mt-1">
                    {cardExpiryElementError?.error?.message}
                  </div>
                )}
                {cardExpiryElementError?.empty && (
                  <div className="text-danger mt-1">
                    Please enter your card expiry date
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.checkbox_wrap}>
            <input
              type="checkbox"
              name="isDefaultChecked"
              id="set-default"
              className="form-check-input"
              // checked={termsAgree && "checked"}
              onChange={(e) => {
                setIsDefaultChecked((prev) => !prev);
                // setTermsAgreeError(false);
                // setTermsAgree(e.target.checked);
              }}
            />
            <label htmlFor="set-default">Set as default</label>
          </div>
        </div>

        <div className={styles.card_back}>
          <div className={styles.input_field}>
            <label>CVV</label>
            <CardCvcElement
              className={styles.card_wrap}
              onChange={(e) => {
                setCardCvcElementError(e);
                setFieldValue("cardCVC", e.complete);
              }}
              options={{
                placeholder: "- - -", // Set your custom placeholder text
              }}
            />
            {cardCvcElementError?.error && (
              <div className="text-danger mt-1">
                {cardCvcElementError?.error?.message}
              </div>
            )}
            {cardCvcElementError?.empty && (
              <div className="text-danger mt-1">
                Please enter your card cvc number
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={`row mt-lg-5 mt-3 ${styles.buttons_wrapper}`}>
        <div className="col-lg-8">
          <p>Save card will be automatically added to my cards.</p>
        </div>
        <div className="col-lg-4 text-right">
          <button
            className={`${styles.save_card}`}
            onClick={saveNewCardHandler}
            disabled={
              isSubmitting ||
              !isValid ||
              !values.nameOnCard ||
              !values.cardNumber ||
              !values.cardExpiry ||
              !values.cardCVC ||
              cardNumberElementError?.error
                ? true
                : false || cardExpiryElementError?.error
                ? true
                : false || cardCvcElementError?.error
                ? true
                : false || nameError
                ? true
                : false
            }
          >
            Save Card {isLoading && <Spinner size="sm" />}
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user_email: state.vantage.userDataReducer.user_email,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewCard);
