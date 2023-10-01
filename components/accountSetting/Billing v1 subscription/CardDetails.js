import React, { useEffect, useState } from "react";
import styles from "./CardDetails.module.scss";
import EmptyStateCardDetails from "./EmptyStates/EmptyStateCardDetails";
import useCurrentCardDetail from "../../../hooks/Billing/useCurrentCardDetail";
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
  const { data, isLoading, error, isFetching } = useCurrentCardDetail();
  const [revealDetail, setRevealDetail] = useState(true);
  useEffect(() => {
    if (data?.invoice?.upcoming?.date) {
      setPaymentDate(data?.invoice.upcoming.date);
    }
  }, [isFetching, isLoading]);

  const revealHandler = () => {
    setRevealDetail(false);
  };
  return (
    <>
      <div
        className={`${styles.card_details} ${isLoading ? styles.loading : ""} ${
          revealDetail ? "" : ""
        }`}
      >
        {isLoading ? (
          <div className="d-flex align-items-center justify-content-center my-2">
            <Spinner />
          </div>
        ) : data && Object.keys(data).length != 0 ? (
          <>
            <div className="row align-items-center mb-3">
              <div className="col-md-6">
                <h3 className="fs-5 fw-bold mb-0">Card Detail</h3>
              </div>
              <div className="col-md-6 text-right">
                <button
                  className={styles.change_plan_btn}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowChangeCardModal(true);
                  }}
                >
                  Change card
                </button>
              </div>
            </div>
            <div className={styles.visa_card}>
              {/* <img
              src={process.env.APP_URL + "/images/visa_card.svg"}
              alt="Card"
              className="img-fluid"
            /> */}
              {data.card.brand == "discover" ||
              data.card.brand == "visa" ||
              data.card.brand == "mastercard" ||
              data.card.brand == "diners" ||
              data.card.brand == "unionpay" ||
              data.card.brand == "amex" ? (
                <img
                  src={`${process.env.APP_URL}/images/${data.card.brand}.svg`}
                  width="44px"
                  height="30px"
                />
              ) : null}
              <p className="m-0">
                {data.card.brand.charAt(0).toUpperCase() +
                  data.card.brand.slice(1)}{" "}
                ending in {data?.card.last4}
                <span className="d-block">{data?.card.expiry}</span>
              </p>
            </div>
            <div className={`${styles.user_mail} d-none`}>
              <img
                src={process.env.APP_URL + "/images/mail-icn-web.svg"}
                alt="Card"
                className="img-fluid"
              />
              <p>{data?.billing_details.email}</p>
            </div>
            <p>Purchased at: {data?.invoice.last_payment.date}</p>

            <div className={styles.card_payment}>
              <h4>
                Your Next Payment <span>{data?.invoice.upcoming.date}</span>
              </h4>
              <p>
                This card is used as a <strong>Subscription</strong> card you
                can also change it from the change card.
              </p>
            </div>
          </>
        ) : (
          <EmptyStateCardDetails />
        )}
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
