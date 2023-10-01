import styles from "./PendingClaimScreen.module.scss";
const PendingClaimScreen = () => {
  return (
    <div
      className={`${styles.pending_alert} d-flex align-items-center  py-2 px-3`}
    >
      <img src={`${process.env.APP_URL}/images/clock.svg`} />
      <span className="text-dark fs-6 fw-bold pl-2">
        We’re verifying your details. You’ll be able to edit your company page
        once this is done
      </span>
    </div>
  );
};

export default PendingClaimScreen;
