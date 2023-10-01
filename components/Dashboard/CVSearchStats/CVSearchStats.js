import React, { useEffect, useState, useRef, useContext } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import CVSearchStatsEmptyState from "./CVSearchStatsEmptyState";
import {
  getCVSearchStats,
  getRecentCVviewed,
} from "../../../redux/actions/dashboardAction";
import styles from "./CVSearchStats.module.scss";
import { Spinner } from "react-bootstrap";
import {
  setShowCVSearchProfileStatus,
  setSwpProfileId,
  setIsSWPProfileLoading,
} from "../../../redux/actions/cvSearchAction";
import SwpPrpfileForCvSearch from "../../../components/CVSearch/SwpPrpfileForCvSearch";

const CVSearchStats = (props) => {
  const [loading, setLoading] = useState(false);
  const [statsData, setStatsdata] = useState([]);
  const router = useRouter();

  const maxValue = Math.max(...statsData.map((obj) => obj.value));

  useEffect(async () => {
    setLoading(true);
    const { data, request_status } = await props.getRecentCVviewed(
      props.user_token,
      props.is_account_owner
    );
    if (request_status) {
      setStatsdata(data);
    }
    setLoading(false);
  }, []);

  const profileCardHandler = (id) => {
    props.setIsSWPProfileLoading(true);
    props.setSwpProfileId(id);
    props.setShowCVSearchProfileStatus(true);
  };

  return (
    <>
      {loading ? (
        <div className={`dashboard-card p-3 ${styles.cv_stats}`}>
          <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
            <h2 className="fw-medium">CV Search</h2>
          </div>
          <div className={`${styles.recent_views}`}>
            <h4 className={`${styles.heading}`}>Recently viewed</h4>
            <div className={styles.content_wrapper}>
              {[1, 2, 3].map((item) => {
                return (
                  <>
                    <div
                      className={`d-flex cursor-pointer animated_shimmer ${styles.recent_list}`}
                    >
                      <div className={`flex-shrink-0 ${styles.user_img}`}>
                        <img
                          src={process.env.APP_URL + "/images/user-1.jpg"}
                          alt="user"
                        />
                      </div>
                      <div className={`${styles.content}`}>
                        <h4>
                          First Name
                          <span className="d-block fw-normal fs-7">
                            london, uk
                          </span>
                        </h4>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <button className="btn btn-md py-2 fs-6 fw-medium btn-green w-100 mt-2 animated_shimmer mb-0">
              Search a CV
            </button>
          </div>
        </div>
      ) : (
        <div className={`dashboard-card p-3 ${styles.cv_stats}`}>
          <div className="d-flex align-items-center justify-content-between flex-wrap mb-2">
            <h2 className="fw-medium">CV Search</h2>
          </div>
          <div className={`${styles.recent_views}`}>
            <h4 className={`${styles.heading}`}>Recently viewed</h4>
            <div className={styles.content_wrapper}>
              {statsData?.length > 0 ? (
                statsData.map((item) => {
                  return (
                    <>
                      <div
                        className={`d-flex cursor-pointer ${styles.recent_list}`}
                        onClick={() => profileCardHandler(item.id)}
                      >
                        <div className={`flex-shrink-0 ${styles.user_img}`}>
                          <img src={item.profile_picture} alt="user" />
                        </div>
                        <div className={`${styles.content}`}>
                          <h4>
                            {item.fullname}{" "}
                            <span className="d-block fw-normal fs-7">
                              {item.location}
                            </span>
                          </h4>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <CVSearchStatsEmptyState />
              )}
              <SwpPrpfileForCvSearch tagDisplay={true} chatButton={true} />
            </div>
            <div className={styles.button_wrap}>
              <button
                className="btn btn-md py-2 fs-6 fw-medium btn-green w-100 mt-2"
                onClick={() => {
                  router.push("/cv-search");
                }}
              >
                Search a CV
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
});

const mapDispatchToProps = (dispatch) => ({
  getCVSearchStats: (userToken) => dispatch(getCVSearchStats(userToken)),
  getRecentCVviewed: (userToken, accountOwner) =>
    dispatch(getRecentCVviewed(userToken, accountOwner)),
  setSwpProfileId: (jobSeekerId) => dispatch(setSwpProfileId(jobSeekerId)),
  setIsSWPProfileLoading: (status) => dispatch(setIsSWPProfileLoading(status)),
  setShowCVSearchProfileStatus: (status) =>
    dispatch(setShowCVSearchProfileStatus(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CVSearchStats);
