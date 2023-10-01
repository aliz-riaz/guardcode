import { connect } from "react-redux";
import styles from "./StepTwo.module.scss";
import CardSelection from "./ChangeCard/CardSelection";

const StepTwo = () => {
  return (
    <div>
      <CardSelection />
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedPlan: state.vantage.billingReducer.selectedPlan,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedPlan: (plan) => dispatch(setSelectedPlan(plan)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepTwo);
