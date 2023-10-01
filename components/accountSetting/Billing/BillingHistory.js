import React, { useState } from "react";
import _ from "lodash";
import EmailInvoice from "./EmailInvoice";
import styles from "./BillingHistory.module.scss";

import EmptyStateBillingHistory from "./EmptyStates/EmptyStateBillingHistory";
import useCurrentBillingHistory from "../../../hooks/Billing/useCurrentBillingHistory";
import BillingHistoryCard from "./BillingHistoryCard";
import { Spinner } from "react-bootstrap";
import NoDataBillingHistory from "./EmptyStates/NoDataBillingHistory";

function BillingHistory(props) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useCurrentBillingHistory({
    currentPage,
    search,
  });

  const searchBillingHistory = (event) => {
    const val = event.target.value;
    setSearch(val);
    val.length > 0 && setCurrentPage(1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = (totalPages) => {
    if (currentPage - 1 < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPageNumbers = (totalPages) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          className={`d-none d-md-block page-item ${
            i === currentPage ? "active" : ""
          }`}
        >
          <a
            key={i}
            onClick={() => goToPage(i, totalPages)}
            className="page-link"
          >
            {i}
          </a>
        </li>
      );
    }
    return pageNumbers;
  };
  const goToPage = (pageNumber, totalPages) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  return (
    <div className={styles.history_table}>
      <div className="row align-items-end">
        <div className="col-lg-9">
          <h2 className="fs-5 fw-bold mb-3">Payment Receipts</h2>
        </div>
        <div className="col-lg-3 d-none">
          <div className={`${styles.search_here} mb-3`}>
            <input
              type="text"
              placeholder="Search by plan"
              onChange={_.debounce(searchBillingHistory, 900)}
            />
            <img src={`${process.env.APP_URL}/images/loupe.svg`} />
          </div>
        </div>
      </div>
      <div
        className={`table-card box-shadow mb-2 ${styles.table_card} ${
          data?.data?.length == 0 ? styles.loading_state : ""
        }`}
      >
        {isLoading ? (
          <>
            <div className={`table-wrap ${styles.table_wrap}`}>
              <div className={`table-responsive ${styles.persoanl_table}`}>
                <table className={`table ${styles.table}`}>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th className="text-center">Order</th>
                      <th className="text-center">Amount</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((item) => {
                      return (
                        <tr>
                          <td className="text-left fw-light">
                            <span
                              className={`${styles.badge} animated_shimmer`}
                            >
                              Paid
                            </span>
                          </td>
                          <td className="text-center">
                            {" "}
                            <span
                              className={`${styles.badge} animated_shimmer`}
                            >
                              Paid
                            </span>
                          </td>
                          <td className="text-center">
                            {" "}
                            <span
                              className={`${styles.badge} animated_shimmer`}
                            >
                              Paid
                            </span>
                          </td>
                          <td className="text-center">
                            <span
                              className={`${styles.badge} animated_shimmer`}
                            >
                              Paid
                            </span>
                          </td>
                          <td className="text-center">
                            <span
                              className={`${styles.badge} animated_shimmer`}
                            >
                              Paid
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : data && search ? (
          data.data.length > 0 ? (
            <>
              <div className={`table-wrap ${styles.table_wrap}`}>
                <div className={`table-responsive ${styles.persoanl_table}`}>
                  <table className={`table ${styles.table}`}>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th className="text-center">Order</th>
                        <th className="text-center">Amount</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item) => {
                        return <BillingHistoryCard data={item} />;
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <NoDataBillingHistory />
          )
        ) : data.data.length > 0 ? (
          <>
            <div className={`table-wrap ${styles.table_wrap}`}>
              <div className={`table-responsive ${styles.persoanl_table}`}>
                <table className={`table ${styles.table}`}>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th className="text-center">Order</th>
                      <th className="text-center">Amount</th>
                      <th className="text-center">Status</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.data.map((item) => {
                      return <BillingHistoryCard data={item} />;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <EmptyStateBillingHistory />
        )}
      </div>
      {data && data.data.length > 0 && data.last_page > 1 && (
        <ul className="pagination pl-0">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <a
              className="page-link"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Previous Page
            </a>
          </li>
          {renderPageNumbers(data.last_page)}
          <li
            className={`page-item ${
              currentPage === data.last_page ? "disabled" : ""
            }`}
          >
            <a
              className="page-link"
              onClick={() => goToNextPage(data.last_page)}
              disabled={currentPage === data.last_page}
            >
              Next Page
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}

export default BillingHistory;
