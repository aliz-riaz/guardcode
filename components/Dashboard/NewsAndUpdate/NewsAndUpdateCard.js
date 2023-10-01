import React, { useEffect, useState, useRef, useContext } from "react";
import { connect } from "react-redux";
import styles from "./NewsAndUpdate.module.scss";

const NewsAndUpdateCard = (props) => {
  useEffect(async () => {}, []);

  return (
    <>
      {/* <a href={props.data.link} target="_blank" className="text-decoration-none">
                <div className={`${styles.post_article}`} style={{ backgroundImage: `url(${props.data.image})` }}>
                    <div className={`${styles.post_heading}`}>
                        <h5>{props.data.title}</h5>
                    </div>
                </div>
            </a> */}
      <a
        href={props.data.link}
        target="_blank"
        className={`card border-0 overflow-hidden ${styles.news_article}`}
      >
        <img className="img-fluid" src={props.data.image} />
        <div className={`${styles.card_content}`}>
          <h2>{props.data.title}</h2>
        </div>
      </a>
    </>
  );
};

export default NewsAndUpdateCard;
