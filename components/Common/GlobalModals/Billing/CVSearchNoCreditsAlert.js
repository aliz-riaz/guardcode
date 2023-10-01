import styles from "./CVSearchNoCreditsAlert.module.scss";

const CVSearchNoCreditsAlert = ({ showAddCredits, addCreditsHandler }) => {
  return (
    <div className={`${styles.no_credit_alert}`}>
      <img
        src={`${process.env.APP_URL}/images/warning-icn.svg`}
        alt="icon"
        className="img-fluid mr-2"
      />
      You don't have any credits left to view CVs.
      {showAddCredits && (
        <a
          className="text-underline cursor-pointer"
          onClick={addCreditsHandler}
        >
          Add credits
        </a>
      )}
    </div>
  );
};

export default CVSearchNoCreditsAlert;
