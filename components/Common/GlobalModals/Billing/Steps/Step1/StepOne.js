import { connect } from "react-redux";
import JobPostCalculator from "./JobPostCalculator";
import JobBoostCalculator from "./JobBoostCalculator";
import CVViewCalculator from "./CVViewCalculator";
import PlansBenefits from "./PlansBenefits";
import CustomPlanBanner from "./CustomPlanBanner";
import Order from "./Order";
import useCreditsPricing from "../../../../../../hooks/Billing/useCreditsPricing";
import useUserCardList from "../../../../../../hooks/Billing/useUserCardList";
import {
  setSelectedPaymentMethod,
  setSelectedCardBrand,
  setSelectedCardEndingIn,
} from "../../../../../../redux/actions/billingAction";
import styles from "./StepOne.module.scss";
import { useEffect } from "react";

const StepOne = (props) => {
  const { data, isLoading, error } = useCreditsPricing();
  const { data: cardData, isLoading: isCardDataLoading } = useUserCardList();

  useEffect(() => {
    if (
      !isCardDataLoading &&
      !props.selectedPaymentMethod &&
      cardData[0]?.is_default
    ) {
      props.setSelectedPaymentMethod(cardData[0].id);
      props.setSelectedCardBrand(cardData[0].card.brand);
      props.setSelectedCardEndingIn(cardData[0].card.last4);
    }
  }, [isCardDataLoading]);

  return (
    <div className={`${styles.step_one_cont} no-gutters row`}>
      <div className={`${styles.credit_details} px-4`}>
        <h3 className="fs-6 fw-medium mt-2 mb-3">Add credits</h3>
        {isLoading ? (
          <div className={`${styles.calculator_wrap} mb-4`}>
            {[1, 2, 3].map((ind) => {
              return (
                <div className={styles.calc_card}>
                  <h3 className="animated_shimmer">Job Posts</h3>
                  <p className="animated_shimmer">
                    Post jobs on the UK's no.1 security job board
                  </p>
                  <div className={styles.button_wrap}>
                    <button type="button" className="animated_shimmer">
                      -
                    </button>
                    <span className="animated_shimmer">0</span>
                    <button type="button" className="animated_shimmer">
                      +
                    </button>
                  </div>
                  <h4 className="animated_shimmer mb-0">
                    1<span>You save £ </span>
                  </h4>
                  <button type="button" className="animated_shimmer mb-0">
                    Add to order
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <div className={`${styles.calculator_wrap} mb-4`}>
              {props.showJobPostCalculator && (
                <JobPostCalculator pricing={data.job_post} />
              )}
              {props.showJobBoostCalculator && (
                <JobBoostCalculator pricing={data.boost_job} />
              )}
              {props.showCVViewsCalculator && (
                <CVViewCalculator pricing={data.cv_view} />
              )}
            </div>
          </>
        )}
        <CustomPlanBanner />
        <PlansBenefits />
      </div>
      <div className={`${styles.order_list}`}>
        <Order />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedPlan: state.vantage.billingReducer.selectedPlan,
  selectedPaymentMethod: state.vantage.billingReducer.selectedPaymentMethod,
  selectedJobPostCredits: state.vantage.billingReducer.selectedJobPostCredits,
  selectedJobBoostCredits: state.vantage.billingReducer.selectedJobBoostCredits,

  showJobPostCalculator: state.vantage.billingReducer.showJobPostCalculator,
  showJobBoostCalculator: state.vantage.billingReducer.showJobBoostCalculator,
  showCVViewsCalculator: state.vantage.billingReducer.showCVViewsCalculator,
});

const mapDispatchToProps = (dispatch) => ({
  // setSelectedPlan: (plan) => dispatch(setSelectedPlan(plan)),
  setSelectedPaymentMethod: (pm) => dispatch(setSelectedPaymentMethod(pm)),
  setSelectedCardBrand: (brand) => dispatch(setSelectedCardBrand(brand)),
  setSelectedCardEndingIn: (endingIn) =>
    dispatch(setSelectedCardEndingIn(endingIn)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepOne);
