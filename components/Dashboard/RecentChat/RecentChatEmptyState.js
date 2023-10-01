import React, { useEffect, useState, useRef, useContext } from "react";
import { connect } from "react-redux";
import styles from "./RecentChat.module.scss";

const RecentChatEmptyState = () => {
  return (
    <>
      <div className={`${styles.empty_card}`}>
        <img src={process.env.APP_URL + "/images/no-comments.svg"} />
        <h3 className="fw-bold my-3">
          As of yet, you haven’t chatted <br className="d-none d-md-block" />
          with any applicants.
        </h3>
        <p className="fs-6 fw-normal mb-0">
          Your most recent conversations would be displayed here.
        </p>
      </div>
    </>
  );
};

export default RecentChatEmptyState;
