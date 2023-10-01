import React from "react";
import styles from "./ActiveShifts.module.scss";
import { connect } from "react-redux";
import {
  setCurrentWorkerScreen,
  showWorkerScreen,
} from "../../../redux/actions/shiftActions";

const ActiveShifts = (props) => {
  return (
    <div
      className={`${
        styles.wrapper
      } bg-white box-shadow position-fixed cusor-pointer ${
        props.showWorkerSteps && styles.show
      }`}
    >
      <div className={`${styles.content_header}`}>
        <div className="d-flex justify-content-between mb-3">
          <h4 className="mb-0">
            SH21105 <span className={styles.active_badge}>Active</span>
          </h4>
          <button
            className={`cusor-pointer ${styles.close_btn}`}
            onClick={() => props.showWorkerScreen(false)}
          >
            <img src={`${process.env.APP_URL}/images/cancel_bold.svg`} />
          </button>
        </div>
        <div className={styles.search_wrapper}>
          <input type="text" placeholder="Search" />
          <img
            src={`${process.env.APP_URL}/images/search-btn.svg`}
            className="img-fluid"
          />
        </div>
      </div>
      <div className={`${styles.scroll}`}>
        <div
          className={`table-responsive table-borderless ${styles.timesheet_table}`}
        >
          <table className={`table ${styles.table} m-0`}>
            <thead>
              <tr>
                <th>
                  <div
                    className={`gl-checkbox form-group mb-0 ${styles.checkbox_wrap}`}
                  >
                    <label className="m-0">
                      <input name="checkbox_name" type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </th>
                <th>Name</th>
                <th>Site</th>
                <th>Check In/Out</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(() => {
                return (
                  <tr
                    className="cursor-pointer"
                    onClick={() =>
                      props.setCurrentWorkerScreen(
                        props.currentStepWorkerScreen + 1
                      )
                    }
                  >
                    <td>
                      <div
                        className={`gl-checkbox form-group mb-0 ${styles.checkbox_wrap}`}
                      >
                        <label className="m-0">
                          <input name="checkbox_name" type="checkbox" />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </td>
                    <td>
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
                    </td>
                    <td>Manchester City Arena</td>
                    <td>08:55am / 06:55pm</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button>Approve all</button>
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
  showWorkerScreen: (status) => dispatch(showWorkerScreen(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveShifts);
