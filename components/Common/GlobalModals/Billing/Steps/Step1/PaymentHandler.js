import { connect } from "react-redux";
import {
  setCurrentBillingModalStep,
  verifyingPayment,
} from "../../../../../../redux/actions/billingAction";
import useCreditPayment from "../../../../../../hooks/Billing/useCreditPayment";
import { useStripe } from "@stripe/react-stripe-js";
import { Spinner } from "reactstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./PaymentHandler.module.scss";

const PaymentHandler = (props) => {
  const { mutate, isLoading } = useCreditPayment();
  const stripe = useStripe();
  const [isLoadingStripe, setIsLoadingStripe] = useState(false);

  const addPaymentCardHandler = (e) => {
    e.preventDefault();
    props.setCurrentBillingModalStep(parseInt(props.currentStep) + 1);
  };

  const getSecondArray = () => {
    const apiArray = props.cart.map((item) => {
      let type;
      let qty;

      switch (item.id) {
        case "jobboost":
          type = "boost_job";
          qty = item.credits;
          break;
        case "cvviews":
          type = "cv_views";
          qty = item.credits;
          break;
        case "jobpost":
          type = "job_post";
          qty = item.credits;
          break;
        default:
          break;
      }

      return { type, qty };
    });

    return { items: apiArray, payment_method: props.selectedPaymentMethod };
  };

  const collectStripePayment = (e) => {
    e.preventDefault();
    const payload = getSecondArray();
    mutate(payload, {
      onSuccess: async (data) => {
        setIsLoadingStripe(true);
        const result = await stripe.confirmCardPayment(
          data.data.data.client_secret,
          {
            payment_method: props.selectedPaymentMethod,
          }
        );

        if (result.error) {
          toast.error(result.error.message, {
            autoClose: false,
          });
        } else {
          props.setCurrentBillingModalStep(3);
        }
        setIsLoadingStripe(false);
        props.verifyingPayment(true);
      },
    });
  };

  return (
    <div className="mt-4">
      {props.selectedPaymentMethod ? (
        <button
          type="button"
          className={`btn btn-green btn-md w-100 fs-6 py-2 ${styles.button_style}`}
          onClick={collectStripePayment}
          disabled={isLoading || isLoadingStripe}
        >
          Pay Now {(isLoading || isLoadingStripe) && <Spinner size="sm" />}
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-green btn-md w-100 fs-6 py-2"
          onClick={addPaymentCardHandler}
        >
          Add Payment Card
        </button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.vantage.billingReducer.cart,
  currentStep: state.vantage.billingReducer.currentStep,
  selectedPaymentMethod: state.vantage.billingReducer.selectedPaymentMethod,

  selectedJobPostCredits: state.vantage.billingReducer.selectedJobPostCredits,
  selectedJobBoostCredits: state.vantage.billingReducer.selectedJobBoostCredits,
  selectedCVViewsCredits: state.vantage.billingReducer.selectedCVViewsCredits,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentBillingModalStep: (step) =>
    dispatch(setCurrentBillingModalStep(step)),
  verifyingPayment: (value) => dispatch(verifyingPayment(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentHandler);
