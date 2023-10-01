import styles from "./BuyMoreAlert.module.scss";

const BuyMoreAlert = ({ limit }) => {
  return (
    <p className={`${styles.buy_more_alert}`}>
      <img src={`${process.env.APP_URL}/images/error-icon.svg`} alt="check" />
      To buy more than {limit} credits, call{" "}
      <a href="tel:03306600012" className="fw-bold">
        {" "}
        0330 660 0012
      </a>
    </p>
  );
};

export default BuyMoreAlert;
