import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./CandidateDetail.module.scss";
import useFetchCandidateDetails from "../../../hooks/Shifts/WorkerApproval/useFetchCandidateDetails";
import { OverlayTrigger, Popover } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import CandidateDetailShimmer from "./CandidateDetailShimmer";
import { connect } from "react-redux";
import { countViewContactDetailGeckoBoard } from "../../../redux/actions/staffingAction";
import useSendOffer from "../../../hooks/Shifts/WorkerApproval/useSendOfferToCandidates";
import { Spinner } from "reactstrap";
import moment from "moment";
import InitChatButton from "../../Common/InitChatButton";

function CandidateDetail(props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [viewDetails, setViewDetails] = useState(true);
  const { mutate: useSendOfferMutate, isLoading: isSendOfferInProcess } =
    useSendOffer();
  const shiftId = router.query.shift_id;
  const user_id = router.query.user_id;

  const { data, isLoading, isError, error, refetch } = useFetchCandidateDetails(
    router.query.user_id,
    setLoading,
    router.query.shift_id
  );

  useEffect(() => {
    setLoading(true);
    setViewDetails(true);
    refetch();
    props.setShowUserDetailInMobile(true);
    return () => {
      props.setShowUserDetailInMobile(false);
    };
  }, [router.query.user_id]);

  if (loading || isLoading) {
    return <CandidateDetailShimmer />;
  }

  const ClickDetails = () => {
    setViewDetails(!viewDetails);
    props.countViewContactDetailGeckoBoard(
      props.user_token,
      router.query.user_id
    );
  };

  const sendOfferHandler = () => {
    useSendOfferMutate(
      { shiftId, workers: [user_id] },
      {
        onSuccess: (data, variables, context) => {
          props.resetSelectedCandidates();
          const { pathname, query } = router;
          delete query.user_id;
          router.push({ pathname, query });
        },
      }
    );
  };

  const backButtonMobile = () => {
    const { pathname, query } = router;
    delete query.user_id;
    router.push({ pathname, query });
    props.setShowUserDetailInMobile(false);
  };

  return (
    <div className={styles.details_wrapper}>
      <div className={styles.profile_view_wrap}>
        <button className={styles.back_btn} onClick={() => backButtonMobile()}>
          <img
            src={process.env.APP_URL + "/images/arrow-left.svg"}
            className="img-fluid"
          />
          back
        </button>
        <div className={`${styles.profile_header}`}>
          <span className={`${styles.applied_date}`}>
            Applied{" "}
            {Boolean(data.data.applied_at) &&
              moment(data.data.applied_at).format("DD MMM YYYY").toString()}
          </span>

          <div className={`${styles.top_content_wrap} w-100`}>
            <div className="d-flex">
              <div className={`shrink-0 ${styles.profile_avatar} mr-2`}>
                <img
                  src={data.data.profile_picture}
                  alt="Profile"
                  className={`${styles.profile_img}`}
                />
                {data.data.is_enhanced_profile == 1 ? (
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id="tooltip-disabled">Verified Profile</Tooltip>
                    }
                  >
                    <span>
                      <img
                        src={process.env.APP_URL + "/images/badge-big.svg"}
                        className="verified"
                      />
                    </span>
                  </OverlayTrigger>
                ) : null}
              </div>

              <div className={`${styles.profile_info}`}>
                <h4 className="mb-2">{data.data.fullname}</h4>
                <p className="d-flex align-items-center mb-2">
                  <img
                    src={process.env.APP_URL + "/images/map-pin.svg"}
                    alt=""
                    className="img-fluid"
                  />
                  <span>{data.data.postcode + ", " + data.data.city}</span>
                </p>
                <div className={`${styles.reveal_cont}`}>
                  <a
                    className={`${
                      viewDetails ? styles.blur : null
                    } d-flex align-items-center`}
                    href={`tel:${data.data.mobile_number}`}
                  >
                    <img
                      src={process.env.APP_URL + "/images/call-icn-2.svg"}
                      alt=""
                      className="img-fluid"
                    />
                    <span>{data.data.mobile_number}</span>
                  </a>
                  <a
                    className={`${
                      viewDetails ? styles.blur : null
                    } d-flex align-items-center mb-0`}
                    href={`mailto:${data.data.email_address}`}
                  >
                    <img
                      src={process.env.APP_URL + "/images/mail-icn-web.svg"}
                      alt=""
                    />
                    <span>{data.data.email_address}</span>
                  </a>
                  {viewDetails ? (
                    <button
                      className={`btn btn-sm btn-outline-dark ${styles.btn_outline}`}
                      onClick={ClickDetails}
                    >
                      Reveal contact
                    </button>
                  ) : null}
                </div>
              </div>
            </div>

            <div className={`${styles.licenses_wrap}`}>
              {data.data.driving_answer == "1" && (
                <div className={`${styles.license_card}`}>
                  <img src={process.env.APP_URL + "/images/driving-icon.svg"} />
                  <span className="fw-medium">Driving Licence</span>
                </div>
              )}
              {data.data.experience_answer == "1" && (
                <div className={`${styles.license_card}`}>
                  <img src={process.env.APP_URL + "/images/license-icn.svg"} />
                  <span className="fw-medium">Military/Police Experience</span>
                </div>
              )}
            </div>
            <div className={`${styles.licenses_wrap} mt-3`}>
              {data.data.license?.length > 0 ? (
                <>
                  {data.data.license?.length > 0
                    ? data.data.license.map((license, i) => {
                        return (
                          <div className={`${styles.license_card}`}>
                            <img
                              src={
                                process.env.APP_URL + "/images/license-icn.svg"
                              }
                            />
                            <span className="fw-medium">
                              {license.course_license}
                            </span>
                            <OverlayTrigger
                              overlay={
                                <Tooltip id="tooltip-disabled">
                                  SIA licence
                                </Tooltip>
                              }
                            >
                              <span className="d-block">
                                <img
                                  src={
                                    process.env.APP_URL +
                                    "/images/verified-icn-sml-2.svg"
                                  }
                                  height="16px"
                                />
                              </span>
                            </OverlayTrigger>
                          </div>
                        );
                      })
                    : null}
                </>
              ) : null}
            </div>
          </div>
        </div>
        <div className={`${styles.card_body_wrap}`}>
          <div className={`${styles.experience_card}`}>
            <h4>Experience</h4>
            <ul className="mb-0">
              {data.data.work_history?.length > 0
                ? data.data.work_history.map((experience) => {
                    return (
                      <li>
                        <h4 className="mb-0">{experience.position}</h4>
                        <p className="mb-0">{experience.agency}</p>
                        <p className="mb-0">
                          {experience.from_date_formatted +
                            " - " +
                            `${
                              experience.is_current == 1
                                ? "Present"
                                : experience.to_date_formatted
                            }`}
                        </p>
                        <p className="mb-0">{experience.country.name}</p>
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
          <div className={`${styles.experience_card} border-bottom-0 pb-0`}>
            <h4>Education</h4>
            <ul className="mb-0">
              {data.data.education_history?.length > 0
                ? data.data.education_history.map((education) => {
                    return (
                      <li>
                        <h4 className="mb-0">{education.course}</h4>
                        <p className="mb-0">{education.institute}</p>
                        <p className="mb-0">
                          {education.from_date_formatted +
                            " - " +
                            `${
                              education.is_current == 1
                                ? "Present"
                                : education.to_date_formatted
                            }`}
                        </p>
                        <p className="mb-0">{education.country.name}</p>
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.video_view_wrap}>
        <div className={styles.btn_wrapper}>
          {router.query.candidate == "interested" ? (
            <button
              className="btn btn-green btn-md w-100 text-center"
              disabled={isSendOfferInProcess}
              onClick={() => sendOfferHandler()}
            >
              Send offer
              {isSendOfferInProcess && <Spinner size="sm" />}
            </button>
          ) : router.query.candidate == "pending" ? (
            data.data.is_declined ? (
              <div className="d-flex">
                <h4 className={`fw-medium ${styles.centered} m-0 mr-1`}>
                  Declined{" "}
                </h4>
                <img
                  src={process.env.APP_URL + "/images/do_not_disturb_on.svg"}
                  className="img-fluid"
                />
              </div>
            ) : (
              <div>
                <h4 className={`fw-medium ${styles.centered}`}>Pending</h4>
                <span className="fw-medium">
                  {`${data.data.fullname} has ${data.data.offer_remaining_time}hrs to confirm the shift`}
                </span>
              </div>
            )
          ) : router.query.candidate == "booked" ? (
            <div className="d-flex">
              <h4 className={`fw-medium ${styles.centered} m-0 mr-1`}>
                Confirmed{" "}
              </h4>
              <img
                src={process.env.APP_URL + "/images/Group.svg"}
                className="img-fluid"
              />
            </div>
          ) : (
            ""
          )}
          <InitChatButton
            key={data.data.profile_video}
            jobseekerData={data.data}
            buttonText={"Chat"}
            btnClass={`btn btn-secondary btn-md w-100 text-center ${styles.chat_button}`}
            chatButtonRenderType="fromWorkerProfile"
          />
        </div>
        {Boolean(data.data.profile_video) && (
          <div className={styles.video_wrap}>
            <video controls key={data.data.profile_video}>
              <source src={data.data.profile_video} type="video/mp4" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  selectedCandidatesForOffer:
    state.vantage.shiftReducer.selectedCandidatesForOffer,
  swp_profile_to_be_shown: state.vantage.staffingReducer.swpProfileToBeShown,
});

const mapDispatchToProps = (dispatch) => ({
  resetSelectedCandidates: () =>
    dispatch({ type: "RESET_SELECTED_CANDIDATES_FOR_OFFER" }),
  countViewContactDetailGeckoBoard: (userToken, applicantId) =>
    dispatch(countViewContactDetailGeckoBoard(userToken, applicantId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CandidateDetail);
