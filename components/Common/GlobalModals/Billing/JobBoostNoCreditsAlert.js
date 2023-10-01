import styles from "./JobBoostNoCreditsAlert.module.scss";

const JobBoostNoCreditsAlert = (props) => {
  return (
    <div className={`${styles.no_credit_alert}`}>
      <img
        src={`${process.env.APP_URL}/images/warning-icon.svg`}
        alt="icon"
        className="img-fluid mr-2"
      />
      You don't have any credits left to boost jobs.
    </div>
  );
};

export default JobBoostNoCreditsAlert;
