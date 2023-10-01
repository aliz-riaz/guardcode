import PaymentWithBank from "./paymentWithBank";
import { connect } from "react-redux";
import StripeComp from "../../components/booking/StripeComp";
import React, { useState } from "react";
import PaymentWithBankPO from "./PaymentWithBankPO";
import { setScreenToBeLoadedOnStep5CheckOut } from "../../redux/actions/bookingAction";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "../Common/StripePayment/Payment";
import { Spinner } from "reactstrap";

const ShowDifferentScreenOnStep5 = (props) => {
  const backClickHandler = () => {
    props.setScreenToBeLoadedOnStep5CheckOut("1");
  };

  // const [stripePromise, setStripePromise] = useState(() => loadStripe(process.env.STRIPE_PUBLIC_KEY))
  const renderScreen = (value) => {
    value = parseInt(value);
    switch (value) {
      case 1:
        return <PaymentWithBank />;
      case 2:
        return (
          <>
            <div className="form-group col-sm-12">
              <div className="inner-addon right-addon">
                <StripeComp
                  headerAndAsideBlocker={true}
                  {...props}
                  backClickHandler={backClickHandler}
                  showTerms={false}
                />
              </div>
            </div>
          </>
        );
      case 3:
        return <PaymentWithBankPO />;
      default:
        return <h1>Hello</h1>;
    }
  };
  return <>{renderScreen(props.screen_to_be_loaded_on_step5_checkout)}</>;
};

const mapStateToProps = (state) => {
  return {
    screen_to_be_loaded_on_step5_checkout:
      state.vantage.bookingReducer.screen_to_be_loaded_on_step5_checkout,
    client_secret: state.vantage.bookingReducer.client_secret,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setScreenToBeLoadedOnStep5CheckOut: (value) =>
    dispatch(setScreenToBeLoadedOnStep5CheckOut(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowDifferentScreenOnStep5);
