import React from "react";
import styles from "./CVSearchStats.module.scss";

const CVSearchStatsEmptyState = () => {
  return (
    <>
      <div className={styles.empty_cv_search}>
        <div className={styles.no_data}>
          <p>No data available</p>
        </div>
      </div>
    </>
  );
};

export default CVSearchStatsEmptyState;
