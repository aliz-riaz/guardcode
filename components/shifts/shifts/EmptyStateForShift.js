import ShiftPostButton from "./ShiftPostButton";
import styles from "./EmptyStateForShift.module.scss"; // Make sure the path is correct

const EmptyStateForShift = () => {
  return (
    <div className={`${styles.shifts_empty_state} text-center mt-4`}>
      <img
        src={process.env.APP_URL + "/images/shifts_empty_state.svg"}
        className="cursor-pointer"
      />
      <p className="mt-4">
        No shifts added yet. All shifts created <br /> will update here.
      </p>
      <ShiftPostButton text="ADD NEW SHIFT" />
    </div>
  );
};

export default EmptyStateForShift;
