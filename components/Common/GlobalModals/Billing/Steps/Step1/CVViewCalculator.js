import {
  setSelectedCVViewsCredits,
  setOrderCart,
} from "../../../../../../redux/actions/billingAction";
import { connect } from "react-redux";
import styles from "./Calculator.module.scss";
import BuyMoreAlert from "./BuyMoreAlert";
const CVViewCalculator = (props) => {
  const maxCredit = Math.max(...props.pricing.map((obj) => obj.max_credit));

  const found = props.pricing.find((obj) => {
    return (
      props.selectedCVViewsCredits >= obj.min_credit &&
      props.selectedCVViewsCredits <= obj.max_credit
    );
  });

  const handleIncrement = (e) => {
    e.preventDefault();
    if (
      props.selectedCVViewsCredits >= maxCredit ||
      props.cart.findIndex((item) => item.id === "cvviews") !== -1
    ) {
      return;
    }
    props.setSelectedCVViewsCredits(
      parseInt(props.selectedCVViewsCredits) + 50
    );
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    if (
      props.selectedCVViewsCredits > 50 &&
      props.cart.findIndex((item) => item.id === "cvviews") == -1
    ) {
      props.setSelectedCVViewsCredits(
        parseInt(props.selectedCVViewsCredits) - 50
      );
    }
  };

  const addToCartHandler = (e) => {
    e.preventDefault();
    const updatedCart = [...props.cart];
    const existingItemIndex = updatedCart.findIndex(
      (item) => item.id === "cvviews"
    );
    const data = {
      id: "cvviews",
      title: "Credits for CV Views",
      credits: props.selectedCVViewsCredits,
      perCredit: (
        (Number(props.selectedCVViewsCredits) *
          Number(found?.discounted_rate)) /
        Number(props.selectedCVViewsCredits)
      ).toFixed(2),
      perCreditActual: props.pricing[0].rate,
      total: (
        Number(props.selectedCVViewsCredits) * Number(found?.discounted_rate)
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
      <h3>CV Views</h3>
      <p>Search applicant profiles and download CVs</p>
      <div className={styles.button_wrap}>
        <button
          type="button"
          onClick={handleDecrement}
          disabled={
            props.cart.findIndex((item) => item.id === "cvviews") !== -1 ||
            props.selectedCVViewsCredits <= 50
              ? true
              : false
          }
        >
          -
        </button>
        <span>{props.selectedCVViewsCredits}</span>
        <button
          type="button"
          onClick={handleIncrement}
          disabled={
            props.selectedCVViewsCredits >= maxCredit ||
            props.cart.findIndex((item) => item.id === "cvviews") !== -1
              ? true
              : false
          }
        >
          +
        </button>
      </div>
      <h4>
        {props.selectedCVViewsCredits} for £
        {Number(
          Number(props.selectedCVViewsCredits) * Number(found?.discounted_rate)
        ).toLocaleString()}
        {/* {props.selectedCVViewsCredits * found?.rate} */}
        <del>
          £
          {Number(
            Number(props.selectedCVViewsCredits) * Number(props.pricing[0].rate)
          ).toLocaleString()}
        </del>
        <span>
          You save £
          {Number(
            Number(props.selectedCVViewsCredits * props.pricing[0].rate) -
              Number(props.selectedCVViewsCredits * found?.discounted_rate)
          ).toLocaleString()}
        </span>
      </h4>
      {props.selectedCVViewsCredits >= maxCredit && (
        <BuyMoreAlert limit={props.selectedCVViewsCredits} />
      )}
      <div className={styles.add_to_cart_btn}>
        {props.cart.findIndex((item) => item.id === "cvviews") !== -1 ? (
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
  selectedCVViewsCredits: state.vantage.billingReducer.selectedCVViewsCredits,
  cart: state.vantage.billingReducer.cart,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedCVViewsCredits: (credits) =>
    dispatch(setSelectedCVViewsCredits(credits)),
  setOrderCart: (cart) => dispatch(setOrderCart(cart)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CVViewCalculator);
