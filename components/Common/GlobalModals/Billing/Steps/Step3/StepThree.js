import { connect } from "react-redux";
import styles from "./StepThree.module.scss";
import {
  resetBillingReducer,
  setJobPostModalStatus,
  setBoostConfirmationModal,
  setBoostJobId,
  fetchMatchingCandidatesForBoost,
  verifyingPayment,
} from "../../../../../../redux/actions/billingAction";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { fetchUserAvalibleConnect } from "../../../../../../redux/actions/jobPostAction";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import Payment_loader from "../../../../../../lottie/payment.json";

const StepThree = (props) => {
  useEffect(() => {
    if (props.isPaymentVerifying) {
      setTimeout(() => props.verifyingPayment(false), 10000);
    }
  }, [props.isPaymentVerifying]);

  if (props.isPaymentVerifying) {
    return (
      <div className={`${styles.payment_confirm_modal}`}>
        <div className={`${styles.lottie_wrap}`}>
          <Lottie animationData={Payment_loader} loop={true} />
        </div>
        <h2>
          Verifying your <br /> payment...
        </h2>
        <p>Won't be long</p>
        <div className={styles.button_wrap}>
          <button type="button" disabled>
            Done
          </button>
        </div>
      </div>
    );
  }

  const router = useRouter();

  const queryClient = useQueryClient();

  const billingPaymentDoneHandler = async (e) => {
    e.preventDefault();
    const jobIdBeforeResetBillingReducer = props.boostJobId;
    queryClient.invalidateQueries({
      queryKey: ["useCreditsDetail"],
    });
    queryClient.invalidateQueries({
      queryKey: ["currentBillingHistory"],
    });
    props.resetBillingReducer();

    if (router.asPath == "/jobpost") {
      if (props.isUserInJobPostingFlow) {
        await props.fetchUserAvalibleConnect(props.user_token);
        await props
          .fetchMatchingCandidatesForBoost(props.user_token, {
            latitude:
              props.specific_address == "yes"
                ? props.center_for_map_loqate.lat
                : props.center_for_google_map.lat,
            longitude:
              props.specific_address == "yes"
                ? props.center_for_map_loqate.lng
                : props.center_for_google_map.lng,
          })
          .then((result) => {
            if (result.data.is_boost_applicable) {
              props.setJobPostModalStatus(true);
            }
          });
      }
    }

    if (router.asPath == "/staffing") {
      if (props.isUserInJobPostingFlow == false) {
        props.setBoostJobId(jobIdBeforeResetBillingReducer);
        props.setBoostConfirmationModal(true);
      }
    }

    // if (props.isUserInJobPostingFlow) {
    //   props.setJobPostModalStatus(true);
    // } else if (props.isUserInJobPostingFlow == false) {
    //   props.setBoostJobId(jobIdBeforeResetBillingReducer);
    //   props.setBoostConfirmationModal(true);
    // }
  };

  return (
    <div className={`${styles.payment_confirm_modal}`}>
      <div className={`${styles.img_wrap}`}>
        <img
          src={`${process.env.APP_URL}/images/payment-done.svg`}
          alt="success"
          className="img-fluid"
        />
      </div>
      <h2>Your order has been processed successfully</h2>
      <p>Credits have been added to your account. Happy hiring!</p>
      <div className={styles.button_wrap}>
        <button onClick={billingPaymentDoneHandler}>Done</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedPlan: state.vantage.billingReducer.selectedPlan,
  isUserInJobPostingFlow: state.vantage.jobPostReducer.isUserInJobPostingFlow,
  boostJobId: state.vantage.billingReducer.boostJobId,
  user_token: state.vantage.userDataReducer.user_token,
  specific_address: state.vantage.jobPostReducer.willReportToSpecificAddress,
  center_for_map_loqate: state.vantage.jobPostReducer.centerForMapLoqate,
  center_for_google_map: state.vantage.jobPostReducer.centerForMapGoogle,
  isPaymentVerifying: state.vantage.billingReducer.isPaymentVerifying,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedPlan: (plan) => dispatch(setSelectedPlan(plan)),
  resetBillingReducer: () => dispatch(resetBillingReducer()),
  setJobPostModalStatus: (status) => dispatch(setJobPostModalStatus(status)),
  setBoostJobId: (jobId) => dispatch(setBoostJobId(jobId)),
  setBoostConfirmationModal: (status) =>
    dispatch(setBoostConfirmationModal(status)),
  fetchUserAvalibleConnect: (user_token) =>
    dispatch(fetchUserAvalibleConnect(user_token)),
  fetchMatchingCandidatesForBoost: (user_token, data) =>
    dispatch(fetchMatchingCandidatesForBoost(user_token, data)),
  verifyingPayment: (value) => dispatch(verifyingPayment(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepThree);
