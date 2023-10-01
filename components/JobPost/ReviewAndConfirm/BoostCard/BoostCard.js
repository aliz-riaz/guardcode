import React, { useEffect, useState } from "react";
import styles from "./BoostCard.module.scss";
import { connect } from "react-redux";
import { fetchMatchingCandidatesForBoost } from "../../../../redux/actions/billingAction";

function BoostCard(props) {
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(async () => {
  //   setIsLoading(true);
  //   await props.fetchMatchingCandidatesForBoost(props.user_token, {
  //     latitude:
  //       props.specific_address == "yes"
  //         ? props.center_for_map_loqate.lat
  //         : props.center_for_google_map.lat,
  //     longitude:
  //       props.specific_address == "yes"
  //         ? props.center_for_map_loqate.lng
  //         : props.center_for_google_map.lng,
  //   });
  //   setIsLoading(false);
  // }, []);

  if (isLoading) {
    return <div></div>;
  }

  if (props.boostMatchingCandidatesList?.is_boost_applicable == false) {
    return (
      <div className={`${styles.boost_card} ${styles.not_available}`}>
        <div className={styles.card_wrapper}>
          <h2>Reach 5x more candidates with</h2>
          <h3>
            <img
              src={`${process.env.APP_URL}/images/offline-bolt.svg`}
              alt="bolt"
            />
            Boost
          </h3>
          <p>
            Boosted jobs deliver rapid applicant reach and simultaneous
            engagement with multiple candidates.
          </p>
        </div>
        <div className={styles.overlay}>
          <h4>
            <img
              src={`${process.env.APP_URL}/images/error-ico.svg`}
              alt="bolt"
            />
            Boost is not available at your location
          </h4>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.boost_card}>
      <div className={styles.card_wrapper}>
        <h2>Reach 5x more candidates with</h2>
        <h3>
          <img
            src={`${process.env.APP_URL}/images/offline-bolt.svg`}
            alt="bolt"
          />
          Boost
        </h3>
        <ul>
          {props.boostMatchingCandidatesList?.first_three_applilcants?.map(
            (list) => (
              <li>
                <a>
                  <img src={list.profile_picture} alt="bolt" />
                </a>
              </li>
            )
          )}
          <li className={styles.plus_value}>
            <a>+{props.boostMatchingCandidatesList?.remaining_market}</a>
          </li>
        </ul>
        <p>
          Utilise your boost credits to instantly reach{" "}
          {props.boostMatchingCandidatesList?.first_three_applilcants?.map(
            (list, index) => `${list.fullname.trim()}${index == 2 ? "" : ","} `
          )}{" "}
          and {props.boostMatchingCandidatesList?.remaining_market} other
          candidates who match with your job.
        </p>
        <h4>You have {props.available_boost_credits} boost left</h4>
      </div>
      {/* <p>You are out of Boost. Click this to buy more</p> */}
      <img
        src={`${process.env.APP_URL}/images/boost-down-arrow.svg`}
        alt="arrow"
        className={styles.arrow_img}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user_token: state.vantage.userDataReducer.user_token,
    center_for_google_map: state.vantage.jobPostReducer.centerForMapGoogle,
    boostMatchingCandidatesList:
      state.vantage.billingReducer.boostMatchingCandidatesList,
    available_boost_credits:
      state.vantage.jobPostReducer.available_boost_credits,
    center_for_map_loqate: state.vantage.jobPostReducer.centerForMapLoqate,
    specific_address: state.vantage.jobPostReducer.willReportToSpecificAddress,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMatchingCandidatesForBoost: (user_token, data) =>
      dispatch(fetchMatchingCandidatesForBoost(user_token, data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BoostCard);
