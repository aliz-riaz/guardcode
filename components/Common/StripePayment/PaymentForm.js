import {
    CardElement,
    PaymentElement,
    PaymentRequestButtonElement,
    useElements,
    useStripe,
  } from "@stripe/react-stripe-js";
  import React, { useState } from "react";
  
  function PaymentForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [customerSecret, setCustomerSecret] = useState("");
    const stripe = useStripe();
    const elements = useElements();
  
    const createSubscription = async () => {
      try {
        const paymentMethod = await stripe.createPaymentMethod({
          card: elements.getElement("card"),
          type: "card",
        });
        // const response = await fetch("/api/subscribe", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     name,
        //     email,
        //     paymentMethod: paymentMethod.paymentMethod.id,
        //   }),
        // });
        // if (!response.ok) return alert("Payment unsuccessful!");
        // const data = await response.json();
        const confirm = await stripe.confirmCardPayment(customerSecret);
        if (confirm.error) return alert("Payment unsuccessful!");
        alert("Payment Successful! Subscription active.");
      } catch (err) {
        console.error(err);
        alert("Payment failed! " + err.message);
      }
    };
  
    return (
      <div style={{ width: "40%" }}>
        Customer Secret:{" "}
        <input
          type="text"
          value={customerSecret}
          onChange={(e) => setCustomerSecret(e.target.value)}
        />
        <br />
        <CardElement />
        <br />
        <button onClick={createSubscription}>Subscribe - 5 INR</button>
      </div>
    );
  }
  
  export default PaymentForm;