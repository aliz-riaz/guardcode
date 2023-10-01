import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useStripe } from "@stripe/react-stripe-js";
const PaymentForm = () => {
  const [paymentIntent, setPaymentIntent] = useState("");
  const [status, setStatus] = useState("");

  const stripe = useStripe();

  const handleInputChange = (e) => {
    setPaymentIntent(e.target.value);
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    // try {
    const response = await stripe.confirmCardPayment(paymentIntent, {
      payment_method: "pm_1NSaclAEmUVVHraXsIa8xYT1",
    });

    if (response.error) {
      setStatus("Payment failed: " + response.error.message);
    } else {
      setStatus("Payment was successful!");
    }
    // }
    // catch (error) {
    //   setStatus("Error occurred while processing payment.");
    // }
  };

  return (
    <div>
      <h1>Stripe Payment</h1>
      <form onSubmit={handlePayment}>
        <label>
          Enter Payment Intent:
          <input
            type="text"
            value={paymentIntent}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Make Payment</button>
      </form>
      <p>{status}</p>
    </div>
  );
};

const Payment = () => {
  // Load Stripe with your Stripe Publishable Key
  const stripePromise = loadStripe(
    "pk_test_51Kt6rRAEmUVVHraXENak1v9tkvhVa1eDUjTTBKmjeiSZ8xvmNwsPC1Pg2LPyhNtfRex8inBt67VRSB1QxB4Uy0yA00sIbj56h4"
  );

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default Payment;
