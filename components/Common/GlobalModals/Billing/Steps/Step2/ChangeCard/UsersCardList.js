import styles from "./UsersCardList.module.scss";
import { FormGroup, Spinner } from "react-bootstrap";
import { Field } from "formik";
import { Formik, Form } from "formik";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useIntercom } from "react-use-intercom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import useUserCardList from "../../../../../../../hooks/Billing/useUserCardList";
import useDeleteStripeCard from "../../../../../../../hooks/Billing/useDeleteStripeCard";
import useMarkStripeCardAsDefault from "../../../../../../../hooks/Billing/useMarkStripeCardAsDefault";
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
} from "../../../../../../../redux/actions/billingAction";

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import ContentEditable from "react-contenteditable";
import DeleteCardModal from "./DeleteCardModal";
const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const UsersCardList = ({
  cardsData,
  values,
  setFieldValue,
  selectedPaymentMethodStore,
  selectedCardBrandStore,
  selectedCardEndingInStore,
}) => {
  const { mutate, isLoading } = useDeleteStripeCard();

  const { mutate: markCardAsDefaultHandler, isLoading: isMarkingDefault } =
    useMarkStripeCardAsDefault();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

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
    if (
      selectedPaymentMethodStore &&
      selectedCardBrandStore &&
      selectedCardEndingInStore
    ) {
      setFieldValue("selectedPaymentMethod", selectedPaymentMethodStore);
      setFieldValue("brandName", selectedCardBrandStore);
      setFieldValue("cardEndingIn", selectedCardEndingInStore);
    } else if (cardsData[0].is_default) {
      setFieldValue("selectedPaymentMethod", cardsData[0].id);
      setFieldValue("brandName", cardsData[0].card.brand);
      setFieldValue("cardEndingIn", cardsData[0].card.last4);
    }
  }, []);
  return (
    <>
      {/* <div className={`${styles.card_list}`}> */}
      {cardsData.map((method, idx) => (
        <div
          className={`${styles.card} ${
            method.id == values.selectedPaymentMethod ? styles.selected : ""
          } ${(isLoading || isMarkingDefault) && styles.load_shimmer}`}
          key={`rskdf-${idx}`}
        >
          {/* <div className="gl-radio form-check mb-0 form-group"> */}
          {/* <label className="mb-0  cursor-pointer"> */}
          <input
            type="radio"
            name="selectedPaymentMethod"
            value={values.selectedPaymentMethod}
            checked={method.id == values.selectedPaymentMethod}
            onChange={(e) => {
              e.preventDefault();
              setFieldValue("selectedPaymentMethod", method.id);
              setFieldValue("brandName", method.card.brand);
              setFieldValue("cardEndingIn", method.card.last4);
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
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setFieldValue("selectedPaymentMethod", null);
                        setSelectedPaymentMethod(method.id);
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
                        type="button"
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
      {/* </div> */}
      {showDeleteModal && (
        <DeleteCardModal
          currentPayMethod={selectedPaymentMethod}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          setFieldValue={setFieldValue}
        />
      )}
    </>
  );
};

// const mapStateToProps = (state) => ({
//   selectedPlan: state.vantage.billingReducer.selectedPlan,
//   switchValue: state.vantage.billingReducer.switchValue,
//   selectedPaymentMethod: state.vantage.billingReducer.selectedPaymentMethod,

//   selectedCardBrand: state.vantage.billingReducer.selectedCardBrand,
//   selectedCardEndingIn: state.vantage.billingReducer.selectedCardEndingIn,
// });

// const mapDispatchToProps = (dispatch) => ({
//   setSelectedPlan: (plan) => dispatch(setSelectedPlan(plan)),
//   setCurrentBillingModalStep: (step) =>
//     dispatch(setCurrentBillingModalStep(step)),
//   setPlanIntervalSwitchValue: (status) =>
//     dispatch(setPlanIntervalSwitchValue(status)),
//   setSelectedPaymentMethod: (pm) => dispatch(setSelectedPaymentMethod(pm)),
//   resetBillingReducer: (pm) => dispatch(resetBillingReducer(pm)),

//   setSelectedCardBrand: (brand) => dispatch(setSelectedCardBrand(brand)),
//   setSelectedCardEndingIn: (endingIn) =>
//     dispatch(setSelectedCardEndingIn(endingIn)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(UsersCardList);
export default UsersCardList;
