import React, { useEffect } from "react";
import { useRouter } from "next/router";
import fetchCandidates from "../../../hooks/Shifts/WorkerApproval/useFetchCandidates";
import styles from "./Candidate.module.scss";
import CandidateCardShimmer from "./CandidateCardShimmer";
import uniqid from "uniqid";
import { connect } from "react-redux";

function Booked(props) {
  const router = useRouter();
  const { data, isLoading, isError, error } = fetchCandidates(
    router.query.shift_id,
    "Booked"
  );

  useEffect(() => {
    if (data) {
      props.setIntrestedCandidatesCount(data?.data.interested_count);
      props.setPendingCandidatesCount(data?.data.pending_count);
      props.setBookedCandidatesCount(data?.data.booked_count);
      props.setShiftDetail(data?.data.shift);
      props.setShiftDetailsForChat(data?.data.shift);
    }
  }, [data]);

  const handleTabClick = (userId) => {
    const queryParams = { ...router.query, user_id: userId };
    router.push({ pathname: router.pathname, query: queryParams });
  };

  if (error) {
    return <div className={styles.candidates_list}></div>;
  }

  if (isLoading == false && data.data.applications.length == 0) {
    return (
      <div className={`${styles.candidates_list} ${styles.centered}`}>
        No booked candidates.
      </div>
    );
  }

  return (
    <div className={`${styles.candidates_list} ${styles.booked_list}`}>
      {isLoading && <CandidateCardShimmer />}
      {isLoading == false &&
        data.data.applications?.map((candidate) => {
          const uniqueKey = uniqid();
          return (
            <div
              className={styles.candidates_wrap}
              onClick={() => handleTabClick(candidate.worker.id)}
              style={{ cursor: "pointer" }}
              key={uniqueKey}
            >
              <div className={styles.img_wrap}>
                <img
                  src={candidate.worker.profile_picture}
                  className="img-fluid"
                />
              </div>
              <div className={styles.content}>
                <h2>{candidate.worker.fullname}</h2>
                <div className={styles.rating}>
                  <span>4.8</span>
                  <img
                    src={process.env.APP_URL + "/images/star-rate.svg"}
                    className="img-fluid"
                  />
                  <img
                    src={process.env.APP_URL + "/images/star-rate.svg"}
                    className="img-fluid"
                  />
                  <img
                    src={process.env.APP_URL + "/images/star-rate.svg"}
                    className="img-fluid"
                  />
                  <img
                    src={process.env.APP_URL + "/images/star-rate.svg"}
                    className="img-fluid"
                  />
                  <img
                    src={process.env.APP_URL + "/images/star-rate.svg"}
                    className="img-fluid"
                  />
                </div>
                <span>74 completed shifts</span>
              </div>
            </div>
          );
        })}
    </div>
  );
}

const mapStateToProps = (state) => ({
  selectedCandidatesForOffer:
    state.vantage.shiftReducer.selectedCandidatesForOffer,
});

const mapDispatchToProps = (dispatch) => ({
  setShiftDetailsForChat: (data) => {
    dispatch({
      type: "SET_JOB_TO_BE_SHOWN_IN_APPLICANT_TAB",
      payload: data,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Booked);
