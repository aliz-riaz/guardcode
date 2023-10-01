// import { setSelectedJobBoostCredits } from "../../../../../../redux/actions/billingAction";
import { connect } from "react-redux";
import CardDetails from "./CardDetails";
import EmptyStateOrder from "./EmptyStateOrder";
import OrderItemCard from "./OrderItemCard";
import PaymentHandler from "./PaymentHandler";
import styles from "./Order.module.scss";

const Order = (props) => {
  const sum = props.cart.reduce((accumulator, item) => {
    return accumulator + parseFloat(item.total);
  }, 0);

  const VAT = Number(sum * 0.2);
  const totalWithVAT = Number(sum) + Number(VAT);

  return (
    <div className={styles.container}>
      {props.cart.length > 0 ? (
        <>
          <h3 className="fs-5 mb-4">Your order</h3>
          {props.cart.map((item, index) => {
            return (
              <OrderItemCard
                id={item.id}
                title={item.title}
                total={item.total}
                credits={item.credits}
                perCredit={item.perCredit}
                perCreditActual={item.perCreditActual}
              />
            );
          })}
          <hr />
          <div className={styles.total_cont}>
            <h4>
              VAT <span>£ {Number(VAT.toFixed(2)).toLocaleString()}</span>
            </h4>
            <p className="text-right">
              Total &nbsp; £ {Number(totalWithVAT.toFixed(2)).toLocaleString()}
            </p>
          </div>
          <PaymentHandler totalWithVAT={totalWithVAT} />
          {props.selectedPaymentMethod && <CardDetails />}
        </>
      ) : (
        <EmptyStateOrder />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.vantage.billingReducer.cart,
  selectedPaymentMethod: state.vantage.billingReducer.selectedPaymentMethod,
});

const mapDispatchToProps = (dispatch) => ({
  // setOrderCart: (cart) => dispatch(setOrderCart(cart)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);
