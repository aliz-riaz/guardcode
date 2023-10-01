import { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import styles from "./Pagination.module.scss"; // Make sure the path is correct
const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages == 1) {
    return null;
  }
  const [displayedPages, setDisplayedPages] = useState([]);

  useEffect(() => {
    const updateDisplayedPages = () => {
      const maxDisplayedPages = isMobile ? 3 : 15;
      const halfMax = Math.floor(maxDisplayedPages / 2);
      let startPage = currentPage - halfMax;
      let endPage = currentPage + halfMax;

      if (startPage < 1) {
        startPage = 1;
        endPage = maxDisplayedPages;
      }

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, totalPages - maxDisplayedPages + 1);
      }

      const pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      setDisplayedPages(pages);
    };

    updateDisplayedPages();
  }, [totalPages, currentPage]);

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className={`bg-white mt-3 ${styles.pagination}`}>
      {/* {currentPage > 1 && ( */}
      <button
        className={`btn`}
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={!(currentPage > 1)}
      >
        « Previous
      </button>
      {/* )} */}

      {displayedPages[0] > 1 && !isMobile && (
        <>
          <button
            className={styles.pageButton}
            onClick={() => handlePageClick(1)}
          >
            1
          </button>
          {displayedPages[0] > 2 && <span className={styles.dots}>...</span>}
        </>
      )}

      {displayedPages.map((page) => (
        <button
          key={page}
          className={`${styles.pageButton} ${
            page === currentPage ? styles.active : ""
          }`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}

      {displayedPages[displayedPages.length - 1] < totalPages && (
        <>
          {displayedPages[displayedPages.length - 1] < totalPages - 1 && (
            <span className={styles.dots}>...</span>
          )}
          <button
            className={styles.pageButton}
            onClick={() => handlePageClick(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* {currentPage < totalPages && ( */}
      <button
        className={`btn `}
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={!(currentPage < totalPages)}
      >
        Next »
      </button>
      {/* )} */}
    </div>
  );
};

export default Pagination;
