import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { getStaffingStats } from "../../../redux/actions/dashboardAction";
import {
  setScreenToShowOnStaffing,
  setFilterForApplicantList,
} from "../../../redux/actions/staffingAction";
import { Spinner } from "react-bootstrap";
import PostAJobButton from "../../JobPost/PostAJobButton";
import styles from "./StaffingStats.module.scss";

const StaffingStats = (props) => {
  const [statsData, setStatsdata] = useState({});
  const [loading, setLoading] = useState(false);

  const [accessLevel, setAccessLevel] = useState(
    props.userMenusAccess.find((element) => element.title == "Staffing")
  );

  const router = useRouter();
  useEffect(async () => {
    setLoading(true);
    const stats = await props.getStaffingStats(
      props.user_token,
      props.is_account_owner,
      accessLevel?.access_level == "FULL" ? 1 : 0
    );
    if (stats) {
      setStatsdata(stats.data);
    }
    setLoading(false);
  }, []);

  const viewAllJobs = () => {
    props.setFilterForApplicantList("all");
    props.setScreenToShowOnStaffing("jobs");
    router.push("/staffing");
  };

  return (
    <>
      {loading ? (
        <div className={`${styles.dashboard_card} px-3 pt-3`}>
          <div
            className={`${styles.d_flex} align-items-center justify-content-between flex-wrap mb-3`}
          >
            <h2 className="fw-medium">Staffing</h2>
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
            <h2 className="fw-medium">Staffing</h2>
            <p className="fw-medium">
              Total Applicants <strong>{statsData?.applicants_count}</strong>
            </p>
          </div>
          <div className={`d-flex flex-wrap ${styles.card_cont}`}>
            <div
              className={`${styles.sub_card} ${
                statsData?.active_jobs_count == 0 && "pointer-none-0"
              }`}
            >
              <div>
                <span>Active Jobs</span>
                <h3>{statsData?.active_jobs_count}</h3>
              </div>
              {statsData?.active_jobs_count > 0 ? (
                <span
                  onClick={viewAllJobs}
                  className={`fs-6 fw-normal cursor-pointer text-primary m-0`}
                >
                  View all jobs{" "}
                </span>
              ) : (
                <span className={`fs-6 fw-normal text-black-50 m-0`}>
                  View all jobs{" "}
                </span>
              )}
            </div>

            <div className={`${styles.sub_card}`}>
              <span>New Applicants</span>
              <h3>{statsData?.new_applicants_count}</h3>
            </div>
            <div className={`${styles.sub_card} p-0 ${styles.post_job}`}>
              <PostAJobButton />
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
  getStaffingStats: (userToken, accountOwner, access) =>
    dispatch(getStaffingStats(userToken, accountOwner, access)),
  setScreenToShowOnStaffing: (screen) =>
    dispatch(setScreenToShowOnStaffing(screen)),
  setFilterForApplicantList: (filter) =>
    dispatch(setFilterForApplicantList(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StaffingStats);
