import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Intrested from "./Intrested";
import Pending from "./Pending";
import Booked from "./Booked";
import CandidateDetail from "./CandidateDetail";
import styles from "./WorkerApproval.module.scss";
import { connect } from "react-redux";
import useSendOffer from "../../../hooks/Shifts/WorkerApproval/useSendOfferToCandidates";
import { Spinner } from "reactstrap";

const formatText = (inputText) => {
  const words = inputText?.split("-");
  const formattedWords = words?.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  const formattedText = formattedWords?.join(" ");
  return formattedText;
};

const Home = (props) => {
  const router = useRouter();
  const [tabToShow, setTabToShow] = useState(null);
  const shiftId = router.query.shift_id;
  const role = router.query.role;
  const [intrestedCandidatesCount, setIntrestedCandidatesCount] = useState(0);
  const [pendingCandidatesCount, setPendingCandidatesCount] = useState(0);
  const [bookedCandidatesCount, setBookedCandidatesCount] = useState(0);
  const [shiftDetail, setShiftDetail] = useState({});
  const [showUserDetailInMobile, setShowUserDetailInMobile] = useState(false);
  const {
    mutate: useSendOfferMutate,
    isLoading: isSendOfferInProcess,
    isSuccess,
  } = useSendOffer();

  const candidate = {
    intrested: "interested",
    pending: "pending",
    booked: "booked",
  };

  const tabShowHandler = (tabToShow) => {
    switch (tabToShow) {
      case candidate.intrested:
        return (
          <Intrested
            setIntrestedCandidatesCount={setIntrestedCandidatesCount}
            setPendingCandidatesCount={setPendingCandidatesCount}
            setBookedCandidatesCount={setBookedCandidatesCount}
            setShiftDetail={setShiftDetail}
            isSendOfferInProcess={isSendOfferInProcess}
            isSuccess={isSuccess}
          />
        );
      case candidate.pending:
        return (
          <Pending
            setIntrestedCandidatesCount={setIntrestedCandidatesCount}
            setPendingCandidatesCount={setPendingCandidatesCount}
            setBookedCandidatesCount={setBookedCandidatesCount}
            setShiftDetail={setShiftDetail}
          />
        );
      case candidate.booked:
        return (
          <Booked
            setIntrestedCandidatesCount={setIntrestedCandidatesCount}
            setPendingCandidatesCount={setPendingCandidatesCount}
            setBookedCandidatesCount={setBookedCandidatesCount}
            setShiftDetail={setShiftDetail}
          />
        );
      default:
        return "";
    }
  };

  useEffect(() => {
    // If status is not present in the query, set it to "interested"
    if (!router.query.candidate) {
      const queryParams = {
        ...router.query,
        candidate: candidate.intrested,
      };
      router.push({ pathname: router.pathname, query: queryParams });
      setTabToShow(candidate.intrested);
    } else {
      // it will run when user refresh browser
      setTabToShow(router.query.candidate);
    }
    return () => {
      props.resetSelectedCandidates();
      props.resetShiftDetailsForChat();
    };
  }, []);

  if (!shiftId) {
    return <div>Not Found</div>;
  }

  const handleTabClick = (newTab) => {
    // Preserve existing query parameters and only change 'status'
    const queryParams = { ...router.query, candidate: newTab };
    delete queryParams.user_id;
    router.push({ pathname: router.pathname, query: queryParams });
    setTabToShow(newTab);
  };

  const handleCandidateScreenToShow = () => {
    if (router.query.user_id) {
      return (
        <CandidateDetail
          setShowUserDetailInMobile={setShowUserDetailInMobile}
        />
      );
    } else {
      return (
        <div className={styles.empty_state_no_candidate}>
          <img
            src={process.env.APP_URL + "/images/empty_candidates.svg"}
            className="img-fluid"
          />
          <h3 className="fw-normal mt-4">
            Select any profile from left panel to{" "}
            <br className="d-none d-md-block" /> see detail view here.
          </h3>
        </div>
      );
    }
  };

  const ShimmerForTitle = () => {
    return (
      <div className={styles.user_list_header}>
        <button style={{ visibility: "hidden" }}>
          <img
            src={process.env.APP_URL + "/images/arrow-left.svg"}
            className="img-fluid"
          />
        </button>
        <h2>
          <div className="animated_shimmer mb-0">Door Supervisor</div>
          <span className="animated_shimmer mb-0">Workplace</span>
          <span className="animated_shimmer mb-0">8:00 am to 4:00 pm</span>
        </h2>
        <span className="ml-auto d-block animated_shimmer mb-0">1/3</span>
      </div>
    );
  };

  const sendOfferButtonHandler = () => {
    useSendOfferMutate(
      { shiftId, workers: props.selectedCandidatesForOffer },
      {
        onSuccess: (data, variables, context) => {
          props.resetSelectedCandidates();
        },
      }
    );
  };

  return (
    <div className="main-inner-content">
      <div className={styles.main_container}>
        <div className={styles.user_listing_cont}>
          {shiftDetail && Object.keys(shiftDetail).length > 0 ? (
            <div className={styles.user_list_header}>
              <button onClick={() => router.push("/shifts")}>
                <img
                  src={process.env.APP_URL + "/images/arrow-left.svg"}
                  className="img-fluid"
                />
              </button>
              <h2>
                {formatText(shiftDetail.role.title)}
                <span>{shiftDetail.site.title}</span>
                <span>{`${shiftDetail.slot[0].start_time} to ${shiftDetail.slot[0].end_time}`}</span>
              </h2>
              <span className="ml-auto d-block">
                {bookedCandidatesCount}/{shiftDetail.slot[0].workers_required}
              </span>
            </div>
          ) : (
            <ShimmerForTitle />
          )}
          <div className={styles.tab_wrapper}>
            <h3>Candidates</h3>
            <div className={styles.tab_list}>
              <button
                onClick={() => handleTabClick(candidate.intrested)}
                disabled={tabToShow == candidate.intrested}
              >
                {formatText(candidate.intrested)}{" "}
                {`(${intrestedCandidatesCount})`}
              </button>
              <button
                onClick={() => handleTabClick(candidate.pending)}
                disabled={tabToShow == candidate.pending}
              >
                {formatText(candidate.pending)} {`(${pendingCandidatesCount})`}
              </button>
              <button
                onClick={() => handleTabClick(candidate.booked)}
                disabled={tabToShow == candidate.booked}
              >
                {formatText(candidate.booked)} {`(${bookedCandidatesCount})`}
              </button>
            </div>
          </div>

          <div>{tabShowHandler(tabToShow)}</div>
          {router.query.candidate == "interested" && (
            <div className={styles.btn_wrapper}>
              <button
                className="btn btn-green btn-md w-100 text-center"
                disabled={
                  props.selectedCandidatesForOffer?.length == 0 ||
                  isSendOfferInProcess
                }
                onClick={() => sendOfferButtonHandler()}
              >
                Send offer to selected workers{" "}
                {`(${props.selectedCandidatesForOffer?.length}) `}
                {isSendOfferInProcess && <Spinner size="sm" />}
              </button>
            </div>
          )}
        </div>
        <div
          className={`${styles.user_view_cont} ${
            showUserDetailInMobile ? styles.show : ""
          }`}
        >
          {handleCandidateScreenToShow()}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedCandidatesForOffer:
    state.vantage.shiftReducer.selectedCandidatesForOffer,
});

const mapDispatchToProps = (dispatch) => ({
  resetSelectedCandidates: () =>
    dispatch({ type: "RESET_SELECTED_CANDIDATES_FOR_OFFER" }),
  resetShiftDetailsForChat: () => {
    dispatch({
      type: "SET_JOB_TO_BE_SHOWN_IN_APPLICANT_TAB",
      payload: {},
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
