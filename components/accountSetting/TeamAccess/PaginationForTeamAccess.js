import { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import ReactPaginate from "react-paginate";
import styles from "./PaginationForTeamAccess.module.scss";

function PaginationForTeamAccess({ totalNoOfPages, setCurrentPage }) {
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  if (totalNoOfPages <= 1) {
    return null;
  }

  return (
    <div className={`m-0 p-0 ${styles.pagination}`}>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalNoOfPages}
        previousLabel="< Previous"
        renderOnZeroPageCount={null}
        activeClassName={styles.active}
        disabledClassName={styles.disabled}
      />
    </div>
  );
}

export default PaginationForTeamAccess;
