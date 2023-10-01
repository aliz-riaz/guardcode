import React from "react";
import styles from "./WorkerProfile.module.scss";
import { connect } from "react-redux";
import { setCurrentWorkerScreen } from "../../../redux/actions/shiftActions";

const WorkerProfile = (props) => {
  return (
    <div
      className={`${styles.wrapper} bg-white box-shadow position-fixed ${
        props.showWorkerSteps && styles.show
      }`}
    >
      <div className={`${styles.content_header}`}>
        <button
          className={`cursor-pointer ${styles.back_btn}`}
          onClick={() =>
            props.setCurrentWorkerScreen(props.currentStepWorkerScreen - 1)
          }
        >
          <img src={`${process.env.APP_URL}/images/arrow-left.svg`} />
        </button>
        <h4 className="mb-0">Worker Profile</h4>
        <button
          className={`cursor-pointer ${styles.close_btn}`}
          onClick={props.closeWorkerProfile}
        >
          <img src={`${process.env.APP_URL}/images/cancel_bold.svg`} />
        </button>
      </div>
      <div className={`${styles.scroll}`}>
        <h4>General Information</h4>
        <div className={styles.user_wrapper}>
          <div className={styles.card}>
            <figure>
              <img
                src={`${process.env.APP_URL}/images/user-1.jpg`}
                className="img-fluid"
              />
            </figure>
            <div className={styles.content}>
              <h5>Khurram Shahzad</h5>
              <a href="mailto:dhurrams@email.com">dhurrams@email.com</a>
              <a href="tel:(907) 555-0101">(907) 555-0101</a>
            </div>
          </div>
          <div className={`${styles.btn_wrapper}`}>
            <button
              className="btn btn-sm btn-green"
              onClick={() =>
                props.setCurrentWorkerScreen(props.currentStepWorkerScreen + 1)
              }
            >
              Approve
            </button>
            <span className="d-block m-0 fw-normal px-3 mt-1">48 hrs left</span>
          </div>
        </div>
        <div className={styles.columns_wrap}>
          <div className={styles.column}>
            <h4>
              <span className="d-block">Role</span>
              Relief Officer
            </h4>
          </div>
          <div className={styles.column}>
            <h4>
              <span className="d-block">Site</span>
              The Stay Club Kentish Town
            </h4>
          </div>
          <div className={styles.column}>
            <h4>
              <span className="d-block">Shift Timings</span>
              9:00 AM to 5:00 PM
            </h4>
          </div>
        </div>
        <h4 className="mt-3">Check- In/Out Timesheet</h4>
        <div className={styles.time_detail}>
          <div className={styles.column}>
            <span className="d-block mb-1">Punched Image</span>
            <span className={styles.punched}>
              <img src={`${process.env.APP_URL}/images/user-profile.jpg`} />
              Via Mobile
            </span>
          </div>
          <div className={styles.column}>
            <span className="d-block mb-1">Checked In</span>
            <h4>08.53 AM</h4>
          </div>
          <div className={styles.column}>
            <span className="d-block mb-1">Check In Location</span>
            <span className={styles.location}>
              <img src={`${process.env.APP_URL}/images/location_ico.svg`} />
              4517 Washington Ave. Manchester, Kentucky 39495
            </span>
          </div>
        </div>
        <figure>
          <img
            src={`${process.env.APP_URL}/images/check-in-map.png`}
            className="img-fluid"
          />
        </figure>
        <div className={styles.time_detail}>
          <div className={styles.column}>
            <span className="d-block mb-1">Punched Image</span>
            <span className={styles.punched}>
              <img src={`${process.env.APP_URL}/images/user-profile.jpg`} />
              Via Mobile
            </span>
          </div>
          <div className={styles.column}>
            <span className="d-block mb-1">Checked Out</span>
            <h4>08.53 AM</h4>
          </div>
          <div className={styles.column}>
            <span className="d-block mb-1">Check out Location</span>
            <span className={styles.location}>
              <img src={`${process.env.APP_URL}/images/location_ico.svg`} />
              4517 Washington Ave. Manchester, Kentucky 39495
            </span>
          </div>
        </div>
        <figure>
          <img
            src={`${process.env.APP_URL}/images/check-in-map.png`}
            className="img-fluid"
          />
        </figure>
        <div className={styles.alert}>
          <img
            src={`${process.env.APP_URL}/images/info-blue.svg`}
            className="img-fluid"
          />
          <p>
            Time and location data is collected from the worker's mobile phone
          </p>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(WorkerProfile);
