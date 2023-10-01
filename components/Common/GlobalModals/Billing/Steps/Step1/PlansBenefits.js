import { connect } from "react-redux";
import styles from "./PlansBenefits.module.scss";

const PlansBenefits = () => {
  return (
    <div className={styles.plans_benefits}>
      <h3 className="fs-5">All benefits include</h3>
      <ul>
        <li>Access to video profiles</li>

        <li>Branded job posts</li>

        <li>Company profile page</li>

        <li>Multi user access</li>

        <li>SIA licence checks</li>

        <li>Unlimited real time chat</li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  //   selectedPlan: state.vantage.billingReducer.selectedPlan,
});

const mapDispatchToProps = (dispatch) => ({
  //   setSelectedPlan: (plan) => dispatch(setSelectedPlan(plan)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlansBenefits);
