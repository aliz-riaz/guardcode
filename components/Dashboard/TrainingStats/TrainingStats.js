import React, { useEffect, useState, useRef, useContext } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Training.module.scss";
import ActivejobsCarousel from "./ActivejobsCarousel";
import { getTrainingStats } from "../../../redux/actions/dashboardAction";
import { updateIsNavbarOpenAction } from "../../../redux/actions/main";
import { resetBookingReducerAction } from "../../../redux/actions/bookingAction";
import Cookies from "universal-cookie";

const TrainingStats = (props) => {
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [statsData, setStatsdata] = useState([]);
  const [accessLevel, setAccessLevel] = useState(
    props.userMenusAccess.find((element) => element.title == "Training")
  );

  const cookies = new Cookies();
  const router = useRouter();

  useEffect(async () => {
    setLoading(true);
    let date = new Date(); // Now
    date.setDate(date.getDate() + 30); // Set now + 30 days as the new date
    let start = moment(new Date()).format("YYYY-MM-DD").toString();
    let end = moment(date).format("YYYY-MM-DD").toString();

    const stats = await props.getTrainingStats(
      props.user_token,
      start,
      end,
      props.is_account_owner,
      accessLevel.access_level == "FULL" ? 1 : 0
    );
    if (stats) {
      setStatsdata(stats.data);
      setDateRange([new Date(), date]);
    }
    setLoading(false);
  }, []);

  const changedDateRangeHandler = async (update) => {
    setDateRange(update);
    if (update[0] !== null && update[1] !== null) {
      setLoading(true);
      let start = moment(update[0]).format("YYYY-MM-DD").toString();
      let end = moment(update[1]).format("YYYY-MM-DD").toString();
      const stats = await props.getTrainingStats(
        props.user_token,
        start,
        end,
        props.is_account_owner,
        accessLevel.access_level == "FULL" ? 1 : 0
      );
      if (stats) {
        setStatsdata(stats.data);
      }
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className={`${styles.dashboard_card} px-3 pt-3`}>
          <div
            className={`${styles.d_flex} align-items-center justify-content-between flex-wrap mb-3`}
          >
            <h2 className="fw-medium">Training</h2>
            <p className="fw-medium animated_shimmer mb-0">
              Total Applicants <strong>0</strong>
            </p>
          </div>
          <div className={`d-flex flex-wrap ${styles.card_cont}`}>
            <div
              className={`${styles.sub_card} animated_shimmer border-0 mb-0`}
            >
              <div className="w-100">
                <span>Active Jobs</span>
                <h3>0</h3>
              </div>
            </div>

            <div className={`${styles.sub_card} animated_shimmer mb-0`}>
              <span>New Applicants</span>
              <h3></h3>
            </div>
            <div
              className={`${styles.sub_card} animated_shimmer border-0 mb-0 p-0`}
            ></div>
          </div>
        </div>
      ) : (
        <div className={`${styles.dashboard_card} px-3 pt-3`}>
          <div
            className={`${styles.d_flex} align-items-center justify-content-between flex-wrap mb-3`}
          >
            <h2 className="fw-medium">Training</h2>
            <div className={`${styles.picker_wrapper}`}>
              <DatePicker
                popperPlacement="top-end"
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  changedDateRangeHandler(update);
                }}
                isClearable={true}
              />
              <h3>
                <span>Total Courses </span> {statsData?.total_courses}
              </h3>
            </div>
          </div>
          <div className={`d-flex flex-wrap ${styles.card_cont}`}>
            <div className={`${styles.sub_card}`}>
              <div>
                <ActivejobsCarousel data={statsData?.next_courses} />
              </div>
              {statsData?.total_courses > 0 ? (
                <span
                  onClick={() => {
                    router.push("/all-courses");
                  }}
                  className="text-primary fs-6 fw-normal cursor-pointer m-0"
                >
                  View all bookings
                </span>
              ) : (
                <span className="fs-6 fw-normal text-black-50 m-0">
                  View all bookings
                </span>
              )}
            </div>

            <div className={`${styles.sub_card}`}>
              <span>Total Trainees</span>
              <h3>{statsData?.all_trainees}</h3>
            </div>
            <div className={`${styles.sub_card} p-0`}>
              <button
                className="btn btn-md btn-green h-100 w-100"
                onClick={() => {
                  props.resetBookingReducerAction();
                  props.updateIsNavbarOpenAction(false).then((resp0) => {});
                  cookies.set("isNavBarOpenCookie", false, { path: "/" });
                  router.push("/booking/step-1");
                }}
              >
                <i>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="12px"
                    viewBox="0 0 448 448"
                  >
                    <path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0" />
                  </svg>
                </i>
                <span className="m-0">Make a Booking</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  is_account_owner: state.vantage.organisationReducer.isAccountOwner,
  userMenusAccess: state.vantage.organisationReducer.userMenusAccess,
});

const mapDispatchToProps = (dispatch) => ({
  getTrainingStats: (userToken, startDate, endDate, accountOwner, access) =>
    dispatch(
      getTrainingStats(userToken, startDate, endDate, accountOwner, access)
    ),
  updateIsNavbarOpenAction: (value) =>
    dispatch(updateIsNavbarOpenAction(value)),
  resetBookingReducerAction: (value) =>
    dispatch(resetBookingReducerAction(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TrainingStats);
