import React, { useEffect, useState } from "react";
import styles from "./CardDetails.module.scss";
import EmptyStateCardDetails from "./EmptyStates/EmptyStateCardDetails";
import useUserCardList from "../../../hooks/Billing/useUserCardList";
import { Spinner } from "react-bootstrap";
// import ChangeSubscriptionCard from "./ChangeCard/ChangeSubscriptionCard";
import dynamic from "next/dynamic";
import { connect } from "react-redux";
import {
  setShowChangeCardModal,
  setPaymentDate,
} from "../../../redux/actions/billingAction";
// Example: Dynamic import of a component

const ChangeSubscriptionCard = dynamic(
  () => import("./ChangeCard/ChangeSubscriptionCard"),
  { ssr: false }
);

function CardDetails({
  showChangeCardModal,
  setShowChangeCardModal,
  setPaymentDate,
}) {
  const { data, isLoading, error, isFetching } = useUserCardList();

  return (
    <>
      <div className={styles.card_details}>
        <div className="row align-items-center px-3 mb-3">
          <div className="col-md-6">
            <h3 className="fs-5 mb-0">Card Details</h3>
          </div>
          <div className="col-md-6 text-right">
            <button
              className={styles.change_plan_btn}
              onClick={(e) => {
                e.preventDefault();
                setShowChangeCardModal(true);
              }}
            >
              Add or remove
            </button>
          </div>
        </div>
        <div className={styles.card_wrapper}>
          {isLoading ? (
            <>
              {[1, 2, 3].map((ind) => {
                return (
                  <>
                    <div className={styles.card} key={ind}>
                      <div
                        className={`${styles.img_wrap} animated_shimmer mb-0`}
                      >
                        <img
                          src={`${process.env.APP_URL}/images/generic-card.svg`}
                          width="24px"
                          height="24px"
                        />
                      </div>
                      <h4 className="animated_shimmer mb-0">
                        Visa ending in 4242
                        <span>Expiry 12/24</span>
                      </h4>
                      <span
                        className={`${styles.default} animated_shimmer mb-0`}
                      >
                        DEFAULT
                      </span>
                    </div>
                  </>
                );
              })}
            </>
          ) : data?.length > 0 ? (
            <>
              {data.map((method, index) => {
                return (
                  <>
                    <div className={styles.card}>
                      <div className={`${styles.img_wrap}`}>
                        {method.card.brand == "discover" ||
                        method.card.brand == "visa" ||
                        method.card.brand == "mastercard" ||
                        method.card.brand == "diners" ||
                        method.card.brand == "unionpay" ||
                        method.card.brand == "amex" ? (
                          <img
                            src={`${process.env.APP_URL}/images/${method.card.brand}.svg`}
                            width="24px"
                            height="24px"
                          />
                        ) : (
                          <img
                            src={`${process.env.APP_URL}/images/generic-card.svg`}
                            width="24px"
                            height="24px"
                          />
                        )}
                      </div>
                      <h4>
                        {method.card.brand} ending in {method.card.last4}
                        <span>
                          Expiry {method.card.exp_month} /{method.card.exp_year}
                        </span>
                      </h4>
                      {method.is_default && (
                        <span className={styles.default}>DEFAULT</span>
                      )}
                    </div>
                  </>
                );
              })}
            </>
          ) : (
            <EmptyStateCardDetails />
          )}
        </div>
      </div>
      {showChangeCardModal && (
        <ChangeSubscriptionCard
          showModal={showChangeCardModal}
          setShowModal={setShowChangeCardModal}
        />
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  showChangeCardModal: state.vantage.billingReducer.showChangeCardModal,
});

const mapDispatchToProps = (dispatch) => ({
  setShowChangeCardModal: (status) => dispatch(setShowChangeCardModal(status)),
  setPaymentDate: (date) => dispatch(setPaymentDate(date)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CardDetails);
