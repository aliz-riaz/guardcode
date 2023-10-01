import React from "react";
import styles from "./ReviewAndConfirm.module.scss";
function ReviewAndConfirmAgreeTerms({
  agreePrivacyCheck,
  setAgreePrivacyCheck,
  checkingIsNextButtonClicked,
}) {
  // function toggling is privacy checkbox is true or false 
  function handleCheck() {
    setAgreePrivacyCheck(!agreePrivacyCheck);
  }
  return (
    // agree terms and conditions of shift posting component 
    <>
      <div className={`${styles.wrapper} bg-white p-2 mt-3 d-flex`}>
        <input
          type="checkbox"
          className={`${styles.agreePrivacyCheckbox} ml-2`}
          onChange={handleCheck}
        />
        <p className={`${styles.termsAndConditions}`}>
          I agree to the GuardPass{" "}
          <a href="https://www.guardpass.com/terms" target="_blank">
            terms and conditions
          </a>{" "}
          and
          <a href="https://www.guardpass.com/privacy" target="_blank">
            {" "}
            privacy policy
          </a>
        </p>
      </div>
    </>
  );
}

export default ReviewAndConfirmAgreeTerms;
