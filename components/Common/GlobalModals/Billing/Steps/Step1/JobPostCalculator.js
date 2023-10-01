import {
  setSelectedJobPostCredits,
  setOrderCart,
} from "../../../../../../redux/actions/billingAction";
import { connect } from "react-redux";
import styles from "./Calculator.module.scss";
import BuyMoreAlert from "./BuyMoreAlert";

const JobPostCalculator = (props) => {
  const handleIncrement = (e) => {
    e.preventDefault();
    if (
      props.selectedJobPostCredits >= props.pricing.length ||
      props.cart.findIndex((item) => item.id === "jobpost") !== -1
    ) {
      return;
    }
    props.setSelectedJobPostCredits(parseInt(props.selectedJobPostCredits) + 1);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    if (
      props.selectedJobPostCredits > 1 &&
      props.cart.findIndex((item) => item.id === "jobpost") == -1
    ) {
      props.setSelectedJobPostCredits(
        parseInt(props.selectedJobPostCredits) - 1
      );
    }
  };

  const addToCartHandler = (e) => {
    e.preventDefault();
    const updatedCart = [...props.cart];
    const existingItemIndex = updatedCart.findIndex(
      (item) => item.id === "jobpost"
    );
    const data = {
      id: "jobpost",
      title: "Credits for Job Posts",
      credits: props.selectedJobPostCredits,
      perCredit: (
        props.pricing[props.selectedJobPostCredits - 1].discounted_rate /
        props.selectedJobPostCredits
      ).toFixed(2),
      perCreditActual: props.pricing[0].rate,
      total: Number(
        props.pricing[props.selectedJobPostCredits - 1].discounted_rate
      ).toFixed(2),
    };
    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex] = data;
    } else {
      updatedCart.push(data);
    }
    props.setOrderCart(updatedCart);
  };

  return (
    <div className={styles.calc_card}>
      <h3>Job Posts</h3>
      <p>Post jobs on the UK's no.1 security job board</p>
      <div className={styles.button_wrap}>
        <button
          type="button"
          onClick={handleDecrement}
          disabled={
            props.cart.findIndex((item) => item.id === "jobpost") !== -1 ||
            props.selectedJobPostCredits <= 1
              ? true
              : false
          }
        >
          -
        </button>
        <span>{props.selectedJobPostCredits}</span>
        <button
          type="button"
          onClick={handleIncrement}
          disabled={
            props.cart.findIndex((item) => item.id === "jobpost") !== -1 ||
            props.selectedJobPostCredits >= props.pricing.length
              ? true
              : false
          }
        >
          +
        </button>
      </div>
      <h4>
        {props.selectedJobPostCredits} for £
        {Number(
          props.pricing[props.selectedJobPostCredits - 1].discounted_rate
        ).toLocaleString()}
        <del>
          £
          {Number(
            props.pricing[0].rate * props.selectedJobPostCredits
          ).toLocaleString()}
        </del>
        <span>
          You save £
          {Number(
            Number(props.pricing[0].rate * props.selectedJobPostCredits) -
              Number(
                props.pricing[props.selectedJobPostCredits - 1].discounted_rate
              )
          ).toLocaleString()}
        </span>
      </h4>
      {props.selectedJobPostCredits >= props.pricing.length && (
        <BuyMoreAlert limit={props.pricing.length} />
      )}
      <div className={styles.add_to_cart_btn}>
        {props.cart.findIndex((item) => item.id === "jobpost") !== -1 ? (
          <button type="button" className={styles.added}>
            <span>
              <img
                src={`${process.env.APP_URL}/images/check-outline.svg`}
                alt="check"
              />
              Added to your order
            </span>
          </button>
        ) : (
          <button type="button" onClick={addToCartHandler}>
            Add to order
          </button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.vantage.billingReducer.cart,
  selectedJobPostCredits: state.vantage.billingReducer.selectedJobPostCredits,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedJobPostCredits: (credits) =>
    dispatch(setSelectedJobPostCredits(credits)),
  setOrderCart: (cart) => dispatch(setOrderCart(cart)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobPostCalculator);
