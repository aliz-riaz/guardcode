// import { setSelectedJobBoostCredits } from "../../../../../../redux/actions/billingAction";
import { connect } from "react-redux";
import styles from "./Order.module.scss";

const EmptyStateOrder = (props) => {
  return (
    <div className={styles.empty_state_order}>
      <h3>
        <img src={process.env.APP_URL + "/images/add-credit-indicator.svg"} />
        Add credits to <br /> create your order
      </h3>
    </div>
  );
};

const mapStateToProps = (state) => ({
  //   cart: state.vantage.billingReducer.cart,
});

const mapDispatchToProps = (dispatch) => ({
  //   setSelectedJobBoostCredits: (credits) =>
  //     dispatch(setSelectedJobBoostCredits(credits)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmptyStateOrder);
