import { useState } from "react";
import { connect } from "react-redux";
import Payment from "../../Common/StripePayment/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentDetail from "./PaymentDetail";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

function Pay(props) {
  return (
    <>
      <div className="pt-2 pt-md-5 pb-2 pb-md-4 row">
        <div className="col">
          <h3 className="text-center text-sm-uppercase font-sm-12">
            Pay & Confirm
          </h3>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-md-5">
          <Elements
            stripe={stripePromise}
            options={{
              // passing the client secret obtained from the server
              clientSecret: props.client_secret,
            }}
          >
            <Payment
              goToNext={props.goToNext}
              clientSecret={props.client_secret}
              setSubmitting={props.setSubmitting}
              showTerms={true}
              toastMessage="Job posted successfully."
            />
          </Elements>
        </div>
        <div className="col-12 col-sm-4 col-md-3">
          <PaymentDetail />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  active_step: state.vantage.jobPostReducer.activeStep,
  show_job_preview: state.vantage.jobPostReducer.showJobPostPreview,
  client_secret: state.vantage.jobPostReducer.clientSecret,
});

const mapDispatchToProps = (dispatch) => ({
  // setActiveStep : (activeStep) => dispatch(setActiveStep(activeStep)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pay);
