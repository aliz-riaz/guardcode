import { setCurrentBillingModalStep } from "../../../../../../redux/actions/billingAction";
import { connect } from "react-redux";
import styles from "./CardDetails.module.scss";

const CardDetails = (props) => {
  const addPaymentCardHandler = (e) => {
    e.preventDefault();
    props.setCurrentBillingModalStep(parseInt(props.currentStep) + 1);
  };

  return (
    <div className={styles.card_details}>
      <div className="d-flex align-items-center justify-content-between">
        <h3>Card Information</h3>
        <button type="button" onClick={addPaymentCardHandler}>
          Change card
        </button>
      </div>
      <p>
        {props.selectedCardBrand}
        {/* <div> */}
        {props.selectedCardBrand == "discover" ||
        props.selectedCardBrand == "visa" ||
        props.selectedCardBrand == "mastercard" ||
        props.selectedCardBrand == "diners" ||
        props.selectedCardBrand == "unionpay" ||
        props.selectedCardBrand == "amex" ? (
          <img
            src={`${process.env.APP_URL}/images/${props.selectedCardBrand}.svg`}
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
        {/* </div> */}
        ending in {props.selectedCardEndingIn}
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedPaymentMethod: state.vantage.billingReducer.selectedPaymentMethod,
  selectedCardBrand: state.vantage.billingReducer.selectedCardBrand,
  selectedCardEndingIn: state.vantage.billingReducer.selectedCardEndingIn,
  currentStep: state.vantage.billingReducer.currentStep,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentBillingModalStep: (step) =>
    dispatch(setCurrentBillingModalStep(step)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardDetails);
