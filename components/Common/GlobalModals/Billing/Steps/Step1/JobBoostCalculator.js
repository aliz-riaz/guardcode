import {
  setSelectedJobBoostCredits,
  setOrderCart,
} from "../../../../../../redux/actions/billingAction";
import { connect } from "react-redux";
import styles from "./Calculator.module.scss";
import BuyMoreAlert from "./BuyMoreAlert";
const JobPostCalculator = (props) => {
  const handleIncrement = (e) => {
    e.preventDefault();
    if (
      props.selectedJobBoostCredits >= props.pricing.length ||
      props.cart.findIndex((item) => item.id === "jobboost") !== -1
    ) {
      return;
    }
    props.setSelectedJobBoostCredits(
      parseInt(props.selectedJobBoostCredits) + 1
    );
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    if (
      props.selectedJobBoostCredits > 1 &&
      props.cart.findIndex((item) => item.id === "jobboost") == -1
    ) {
      props.setSelectedJobBoostCredits(
        parseInt(props.selectedJobBoostCredits) - 1
      );
    }
  };

  const addToCartHandler = (e) => {
    e.preventDefault();
    const updatedCart = [...props.cart];
    const existingItemIndex = updatedCart.findIndex(
      (item) => item.id === "jobboost"
    );
    const data = {
      id: "jobboost",
      title: "Credits for Job Boost",
      credits: props.selectedJobBoostCredits,
      perCredit: (
        props.pricing[props.selectedJobBoostCredits - 1].discounted_rate /
        props.selectedJobBoostCredits
      ).toFixed(2),
      perCreditActual: props.pricing[0].rate,
      total: Number(
        props.pricing[props.selectedJobBoostCredits - 1].discounted_rate
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
      <h3>Job Boost</h3>
      <p>Get applicants faster with the Job Boost add-on</p>
      <div className={styles.button_wrap}>
        <button
          type="button"
          onClick={handleDecrement}
          disabled={
            props.cart.findIndex((item) => item.id === "jobboost") !== -1 ||
            props.selectedJobBoostCredits <= 1
              ? true
              : false
          }
        >
          -
        </button>
        <span>{props.selectedJobBoostCredits}</span>
        <button
          type="button"
          onClick={handleIncrement}
          disabled={
            props.cart.findIndex((item) => item.id === "jobboost") !== -1 ||
            props.selectedJobBoostCredits >= props.pricing.length
              ? true
              : false
          }
        >
          +
        </button>
      </div>
      <h4>
        {props.selectedJobBoostCredits} for £
        {Number(
          props.pricing[props.selectedJobBoostCredits - 1].discounted_rate
        ).toLocaleString()}
        <del>
          £
          {Number(
            props.pricing[0].rate * props.selectedJobBoostCredits
          ).toLocaleString()}
        </del>
        <span>
          You save £
          {Number(
            Number(props.pricing[0].rate * props.selectedJobBoostCredits) -
              Number(
                props.pricing[props.selectedJobBoostCredits - 1].discounted_rate
              )
          ).toLocaleString()}
        </span>
      </h4>
      {props.selectedJobBoostCredits >= props.pricing.length && (
        <BuyMoreAlert limit={props.pricing.length} />
      )}
      <div className={styles.add_to_cart_btn}>
        {props.cart.findIndex((item) => item.id === "jobboost") !== -1 ? (
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
  selectedJobBoostCredits: state.vantage.billingReducer.selectedJobBoostCredits,
  cart: state.vantage.billingReducer.cart,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedJobBoostCredits: (credits) =>
    dispatch(setSelectedJobBoostCredits(credits)),
  setOrderCart: (cart) => dispatch(setOrderCart(cart)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobPostCalculator);
