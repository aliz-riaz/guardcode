import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styles from "./Candidate.module.scss";
import fetchCandidates from "../../../hooks/Shifts/WorkerApproval/useFetchCandidates";
import CandidateCardShimmer from "./CandidateCardShimmer";
import { connect } from "react-redux";
import {
  setShiftCandidatesForOffer,
  removeShiftCandidates,
} from "../../../redux/actions/shiftActions";
import uniqid from "uniqid";

function Intrested(props) {
  const router = useRouter();
  const { data, isLoading, error, refetch } = fetchCandidates(
    router.query.shift_id,
    "Interested"
  );

  useEffect(() => {
    refetch();
  }, [router.query.user_id, props.isSuccess]);

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
        No intrested candidates.
      </div>
    );
  }

  const handleCheckboxChange = (e, candidateId) => {
    if (
      e.target.checked == true &&
      !props.selectedCandidatesForOffer?.includes(candidateId)
    ) {
      props.setShiftCandidatesForOffer(candidateId);
    } else {
      props.removeShiftCandidates(candidateId);
    }
  };

  return (
    <div className={styles.candidates_list}>
      {isLoading && <CandidateCardShimmer />}
      {isLoading == false &&
        data.data.applications?.map((candidate, index) => {
          const uniqueKey = uniqid();
          return (
            <div
              className={styles.candidates_wrap}
              style={{ cursor: "pointer" }}
              key={uniqueKey}
            >
              <div
                className={`gl-checkbox form-group mb-0 ${styles.checkbox_wrap}`}
              >
                <label className="m-0">
                  <input
                    name="checkbox_name"
                    type="checkbox"
                    checked={props.selectedCandidatesForOffer?.includes(
                      candidate.worker.id
                    )}
                    disabled={props.isSendOfferInProcess}
                    onChange={(e) =>
                      handleCheckboxChange(e, candidate.worker.id)
                    }
                  />
                  <span className="checkmark"></span>
                </label>
              </div>

              <div
                className={styles.img_wrap}
                onClick={() => handleTabClick(candidate.worker.id)}
              >
                <img
                  src={candidate.worker.profile_picture}
                  className="img-fluid"
                />
              </div>
              <div
                className={styles.content}
                onClick={() => handleTabClick(candidate.worker.id)}
                style={{ cursor: "pointer" }}
              >
                <h2>{candidate.worker.fullname} </h2>
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
  setShiftCandidatesForOffer: (data) =>
    dispatch(setShiftCandidatesForOffer(data)),
  removeShiftCandidates: (data) => dispatch(removeShiftCandidates(data)),
  setShiftDetailsForChat: (data) => {
    dispatch({
      type: "SET_JOB_TO_BE_SHOWN_IN_APPLICANT_TAB",
      payload: data,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Intrested);
