import React, { useState } from "react";
import styles from "./WorkerReview.module.scss";
import { connect } from "react-redux";
import { setCurrentWorkerScreen } from "../../../redux/actions/shiftActions";

const WorkerReview = (props) => {
  const [rating, setRating] = useState(0);
  const ratingLabels = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

  const handleStarHover = (starIndex) => {
    setRating(starIndex + 1);
  };

  const handleStarClick = (starIndex) => {
    // You can handle the click event here, e.g., send the rating to a server.
    // You clicked on star ${starIndex + 1}
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const isFilled = i < rating;
      stars.push(
        <span
          key={i}
          className={`${styles.star} ${isFilled ? styles.filled : ""}`}
          onMouseEnter={() => handleStarHover(i)}
          onClick={() => handleStarClick(i)}
        >
          &#9733; {/* Unicode star character */}
        </span>
      );
    }
    return stars;
  };

  return (
    <div
      className={`${styles.wrapper} bg-white box-shadow position-fixed ${
        props.showWorkerSteps && styles.show
      }`}
    >
      <div className={`${styles.content_header}`}>
        <button
          className={`cusor-pointer ${styles.back_btn}`}
          onClick={() =>
            props.setCurrentWorkerScreen(props.currentStepWorkerScreen - 1)
          }
        >
          <img src={`${process.env.APP_URL}/images/arrow-left.svg`} />
        </button>
        <h4 className="mb-0">Review</h4>
        <button
          className={`cusor-pointer ${styles.close_btn}`}
          onClick={props.closeWorkerProfile}
        >
          <img src={`${process.env.APP_URL}/images/cancel_bold.svg`} />
        </button>
      </div>
      <div className={`${styles.scroll}`}>
        <div className={styles.card}>
          <figure>
            <img
              src={`${process.env.APP_URL}/images/user-1.jpg`}
              className="img-fluid"
            />
          </figure>
          <div className={styles.content}>
            <h3>
              Khurram Shahzad <span>Relief Officer</span>
            </h3>
            <p>04 Jul 09am to 05pm</p>
          </div>
        </div>
        <div className={styles._site}>
          <p className="m-0 fs-6 fw-normal">Site: The Stay Club Kentish Town</p>
        </div>
        <div className={styles.rate_review}>
          <h3 className="text-center">Rate & Review</h3>
          <div className={styles.stars_wrapper}>{renderStars()}</div>
          <span className="d-block text-center">
            {ratingLabels[rating - 1]} &nbsp;
          </span>
        </div>
        <div className={styles.comments_wrap}>
          <label>Comments</label>
          <textarea></textarea>

          <div className="gl-radio mt-2 mb-1">
            <label>
              <input type="radio" name="radio_check" className="" value="" />
              <span>Add this worker to my preferred staff list</span>
              <span className="checkmark"></span>
            </label>
          </div>
          <div className="gl-radio mb-0">
            <label>
              <input type="radio" name="radio_check" className="" value="" />
              <span>Add this worker to my block list</span>
              <span className="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      {/* <div className={styles.button_wrap}>
        <button className={`btn btn-secondary btn-md ${styles.back}`}>
          <img src={`${process.env.APP_URL}/images/arrow-left.svg`} />
          Back
        </button>
        <button className="btn btn-green btn-md">
          Next
          <img src={`${process.env.APP_URL}/images/arrow-right.svg`} />
        </button>
      </div> */}
      <div className={`${styles.button_wrap} d-block`}>
        <div className={`gl-checkbox form-group mb-1 ${styles.checkbox_wrap}`}>
          <label className="m-0">
            <input name="checkbox_name" type="checkbox" />
            <span className="checkmark"></span>
            <span>Don’t show me again</span>
          </label>
        </div>
        <button className="btn btn-green btn-md justify-content-center w-100">
          Submit
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentStepWorkerScreen: state.vantage.shiftReducer.currentStepWorkerScreen,
  showWorkerSteps: state.vantage.shiftReducer.showWorkerSteps,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentWorkerScreen: (step) => dispatch(setCurrentWorkerScreen(step)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkerReview);
