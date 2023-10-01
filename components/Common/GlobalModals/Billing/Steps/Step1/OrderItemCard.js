import { connect } from "react-redux";
import { setOrderCart } from "../../../../../../redux/actions/billingAction";
import styles from "./Order.module.scss";

const OrderItemCard = ({
  id,
  title,
  total,
  credits,
  perCredit,
  perCreditActual,
  cart,
  setOrderCart,
}) => {
  const removeFromCartHandler = (e) => {
    e.preventDefault();
    const updatedCart = cart.filter((item) => item.id !== id);
    setOrderCart(updatedCart);
  };

  return (
    <div className={styles.order_item}>
      <h3 className="fs-6 d-flex justify-content-between mb-0">
        {title} <span>£{Number(total).toLocaleString()}</span>
      </h3>
      <p>
        {credits} {credits > 1 ? "credits" : "credit"}
        <span>
          £{perCredit} {perCreditActual && <del>£{perCreditActual}</del>} per
          credit
        </span>
      </p>
      <button
        type="button"
        className={styles.remove_item}
        onClick={removeFromCartHandler}
      >
        remove
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.vantage.billingReducer.cart,
});

const mapDispatchToProps = (dispatch) => ({
  setOrderCart: (cart) => dispatch(setOrderCart(cart)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderItemCard);
