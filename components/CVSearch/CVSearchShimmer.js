import React from "react";
import FiltersForCVSearch from "./FiltersForCVSearch";
import styles from "./CVSearch.module.scss";
import FiltersForCVSearchShimmer from "./FiltersForCVSearchShimmer";

const CVSearchShimmer = (props) => {
  return (
    <div className={`${styles.cv_search_left} position-relative h-100`}>
      <div className="text-center py-2">
        <div className="text-black-50 d-inline-block fs-6 text-center mb-0 fw-medium animated_shimmer">
          You have 0 CV views left
        </div>
      </div>
      <FiltersForCVSearchShimmer />
    </div>
  );
};

export default CVSearchShimmer;
