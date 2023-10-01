import ShiftPostButton from "./ShiftPostButton";
import styles from "./NoRecordFound.module.scss"; // Make sure the path is correct

const NoRecordFound = () => {
  return (
    <div className={`${styles.shifts_empty_state} text-center mt-4`}>
      <h1>No Record Found</h1>
    </div>
  );
};

export default NoRecordFound;
