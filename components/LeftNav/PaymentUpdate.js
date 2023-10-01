import React from "react";
import styles from "./PaymentUpdate.module.scss";
import { useRouter } from "next/router";

const PaymentUpdate = () => {
  const router = useRouter();
  return (
    <div className={styles.card}>
      <img
        src={`${process.env.APP_URL}/images/credit-vector.png`}
        alt="icon"
        className="img-fluid"
      />
      <p>
        Payment failed for your recurring subscription, resulting in a temporary
        suspension of your access to resources. Please make the payment to
        restore access.
      </p>
      <button
        onClick={() =>
          router.push("/account-settings?redirect_to_billing=true")
        }
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentUpdate;
