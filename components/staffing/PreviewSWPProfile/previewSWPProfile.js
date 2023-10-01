import { Button, Label, Row, Col, FormGroup } from "reactstrap";
import { connect } from "react-redux";
import moment from "moment";
import { protectedRoute } from "../../../utilites/utility";
import { isBrowser } from "react-device-detect";
import { useEffect, useLayoutEffect, useState } from "react";
import styles from "./previewSWPProfile.module.scss";
import { fetchUserSWPProfile } from "../../../redux/actions/chatAction";
import {
  countViewContactDetailGeckoBoard,
  downloadUserSWPProfileCV,
} from "../../../redux/actions/staffingAction";
import { OverlayTrigger, Popover, Tooltip, Modal } from "react-bootstrap";
import { Spinner } from "reactstrap";
import Image from "next/image";
import ReactPlayer from "react-player";
import {
  arrYesForSWPProfile,
  arrNoForSWPProfile,
  imgYesForSWPProfile,
  imgNoForSWPProfile,
} from "../../../lib/helper";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

export const getServerSideProps = async function (context) {
  return protectedRoute(context);
};

function PreviewSWPProfile(props) {
  const [userData, setUserData] = useState(null);
  const [viewDetails, setViewDetails] = useState(false);
  const [showDownloadSpinner, setShowDownloadSpinner] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useLayoutEffect(() => {
    setUserData(null);
  }, [props.show_cv_search_profile === false]);

  useEffect(async () => {
    // if(props.showProfile){
    const result = await props.fetchUserSWPProfile(
      props.user_token,
      props.userID
    );
    setUserData(result.data);
    // }
    setViewDetails(false);
    setPopoverOpen(false);
  }, [props.showProfile, props.show_cv_search_profile === false]);

  const closeProfileHandler = () => {
    props.setShowProfile(false);
  };

  const showDetail = () => {
    setViewDetails((prev) => !prev);
    props.countViewContactDetailGeckoBoard(props.user_token, props.userID);
  };

  const downloadProfileCV = () => {
    setShowDownloadSpinner(true);
    props
      .downloadUserSWPProfileCV(
        props.user_token,
        userData.slug,
        userData.fullname
      )
      .then((res) => {
        setShowDownloadSpinner(false);
      });
  };
  const handleClose = () => setShowVideo(false);
  const handleShow = () => setShowVideo(true);

  if (!userData) {
    return (
      <div
        className={`${styles.previewProfile_content_wrap} ${
          props.showProfile ? `${styles.show}` : "hide"
        }`}
      >
        <div
          className={`${styles.previewProfile_content} ${
            props.showProfile ? `${styles.show}` : "hide"
          }`}
        >
          <div
            className={`${styles.profile_loader} text-center d-flex align-items-center justify-content-center`}
          >
            <Spinner animation="border" role="status">
              {" "}
            </Spinner>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${styles.previewProfile_content_wrap} ${
        props.showProfile && props.show_cv_search_profile === false
          ? `${styles.show}`
          : "hide"
      }`}
    >
      <div
        className={`${styles.previewProfile_content} ${
          props.showProfile && props.show_cv_search_profile === false
            ? `${styles.show}`
            : "hide"
        }`}
      >
        {props.tag && Object.keys(props.tag) != 0 && (
          <OverlayTrigger
            trigger={["hover"]}
            placement="bottom"
            overlay={
              <Popover
                id="popover-basic"
                className={`${styles.tagPopoverBox}`}
                title="Popover bottom"
              >
                <div
                  className={`${styles.tagNotes} bg-black text-white px-2 py-2 `}
                >
                  <p className="text-white fs-7 mb-2">
                    {props.tag.decision_maker_first_name} added this tag on{" "}
                    {moment(props.tag.updated_at)
                      .format("YYYY-MM-DD")
                      .toString()}
                  </p>

                  {props.tag.tag_message && (
                    <p className="mb-0 fs-7 text-white">
                      <strong className="d-block">Notes:</strong>
                      <span>{props.tag.tag_message}</span>
                    </p>
                  )}
                </div>
              </Popover>
            }
          >
            <div
              className={`${styles.tagging}  d-inline-block px-2 rounded fw-medium text-uppercase cursor-pointer position-absolute`}
              style={{ backgroundColor: props.tag.color }}
            >
              <span className="fw-bold">{props.tag.tag_name}</span>
            </div>
          </OverlayTrigger>
        )}
        <span
          className={`${styles.close_preview}`}
          onClick={closeProfileHandler}
        >
          <img src={process.env.APP_URL + "/images/x-circle.svg"} />
        </span>
        <div className={`${styles.profile_header} text-center pt-3`}>
          <div className={`${styles.profile_img} rounded-circle mx-auto`}>
            <img src={userData.profile_picture} className="img-fluid" />
            {userData.is_enhanced_profile == 1 ? (
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip-disabled">Verified Profile</Tooltip>
                }
              >
                <span className={`${styles.verified_badge}`}>
                  <img
                    src={process.env.APP_URL + "/images/badge-big.svg"}
                    className="verified"
                  />
                </span>
              </OverlayTrigger>
            ) : null}
          </div>
          {userData.is_enhanced_profile == "1" && (
            <span className="text-black-50 fw-bold mt-3 d-block">
              Enhanced profile
            </span>
          )}
          <h4 className="d-block mb-0">{userData.fullname}</h4>
          <div
            className={`${styles.location} d-flex align-items-center justify-content-center`}
          >
            <img src={`${process.env.APP_URL}/images/map-pin-1.svg`} />
            <span className="ml-1">{` ${userData.postcode}, ${userData.city}`}</span>
          </div>
        </div>
        <div className="px-4 mt-4">
          <div className="d-flex align-items-center my-2">
            <i className="mr-2">
              <img
                src={`${process.env.APP_URL}/images/call-icn-2.svg`}
                alt=""
              />
            </i>
            {viewDetails ? (
              <a
                href={`tel:${userData.mobile_number}`}
                className=""
                style={{ transform: "translateY(2px)" }}
              >
                {userData.mobile_number}
              </a>
            ) : (
              <span
                className=" font-weight-bold text-success cursor-pointer"
                style={{ transform: "translateY(2px)" }}
                onClick={showDetail}
              >
                View Number
              </span>
            )}
          </div>
          <div className="d-flex align-items-center my-2">
            <i className="mr-2">
              <img
                src={`${process.env.APP_URL}/images/mail-icn-web.svg`}
                alt=""
              />
            </i>
            {viewDetails ? (
              <a
                href={`mailto:${userData.email_address}`}
                className=""
                style={{ marginTop: "1px" }}
              >
                {userData.email_address}
              </a>
            ) : (
              <span
                className="font-weight-bold text-success cursor-pointer"
                style={{ transform: "translateY(2px)" }}
                onClick={showDetail}
              >
                View Email Address
              </span>
            )}
          </div>
          {userData.license?.length > 0 ? (
            <ul className="pl-0 mb-0 mt-3">
              {userData.license.map((license, i) => {
                return (
                  <li className="d-flex my-1">
                    <i>
                      <img
                        src={process.env.APP_URL + "/images/license-icn.svg"}
                        alt=""
                      />
                    </i>
                    <span
                      className="font-weight-bold ml-2"
                      style={{ marginTop: "2px" }}
                    >
                      {license.course_license}
                    </span>
                    <span id={`btn-${i}`} className="ml-2 mt-1">
                      <OverlayTrigger
                        overlay={
                          <Tooltip id="tooltip-disabled">SIA licence</Tooltip>
                        }
                      >
                        <span className="d-block">
                          <img
                            src={
                              process.env.APP_URL +
                              "/images/verified-icn-sml-2.svg"
                            }
                            className="mb-2"
                            width={`17`}
                          />
                        </span>
                      </OverlayTrigger>
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : null}
          {(userData?.experience_answer == "1" ||
            userData?.driving_answer == "1") && (
            <div className={`d-flex ${styles.gab_between} mb-3 flex-wrap`}>
              {userData?.driving_answer == "1" && (
                <div className={`${styles.badge_icon_for_profile}`}>
                  <img src={process.env.APP_URL + "/images/check_plain.svg"} />
                  <span className="fw-medium">Driving Licence</span>
                </div>
              )}
              {userData?.experience_answer == "1" && (
                <div className={`${styles.badge_icon_for_profile}`}>
                  <img src={process.env.APP_URL + "/images/check_plain.svg"} />
                  <span className="fw-medium">Military/Police Experience</span>
                </div>
              )}
            </div>
          )}
          <div
            className={`${styles.profile_btn} d-flex justify-content-between mt-3`}
          >
            <button
              onClick={handleShow}
              className="btn btn-green btn-md py-2 px-4 d-flex align-items-center-center justify-content-center"
              disabled={userData.profile_video ? false : true}
            >
              <i>
                <img src={`${process.env.APP_URL}/images/Play.svg`} />
              </i>
              <span className="ml-2">Play Video</span>
            </button>
            <button
              onClick={downloadProfileCV}
              className="btn btn-green btn-md py-2 px-4 d-flex align-items-center-center justify-content-center"
            >
              <i>
                <img
                  src={`${process.env.APP_URL}/images/pdf-icn.svg`}
                  width="19"
                  height="21"
                />
              </i>
              <span className="ml-2">Download CV</span>
              {/* showDownloadSpinner */}
              {showDownloadSpinner && (
                <span className="ml-1">
                  <Spinner size={"sm"} />
                </span>
              )}
            </button>
          </div>
        </div>
        {/* Play Video Modal */}
        {userData.profile_video ? (
          <Modal
            show={showVideo}
            onHide={handleClose}
            className={`${styles.videoModal}`}
          >
            <Modal.Body>
              <div class={`${styles.closeModal}`} onClick={handleClose}>
                <img
                  src={`${process.env.APP_URL}/images/cancel.svg`}
                  width="16px"
                />
              </div>
              <div>
                <ReactPlayer
                  url={userData.profile_video}
                  className={`${styles.react_player}`}
                  width="100%"
                  height="450px"
                  config={{
                    youtube: {
                      playerVars: { showinfo: 1 },
                    },
                  }}
                  playing
                  playIcon={
                    <img src={process.env.APP_URL + "/images/play-new.svg"} />
                  }
                  light={userData.thumbnail_image}
                  controls={"true"}
                />
              </div>
            </Modal.Body>
          </Modal>
        ) : null}
        {/* {userData.profile_video}  todo add profile video on btn click */}
        {userData.has_screened == 1 ? (
          <div className={`${styles.prescreen_row} mt-4 bg-black`}>
            <span className="d-flex fw-bold fs-6 ml-0 mb-2">
              <span className="text-white">Screening ready</span>
              <span className="translate-x-minus-1 ml-2">
                <img src={`${process.env.APP_URL}/images/screen_icon.svg`} />
              </span>
            </span>
            <div>
              <ul className="d-flex flex-wrap p-0 text-white">
                {userData?.screening_questions?.map((question, indx) => {
                  return (
                    <li className={`mr-2 my-1`}>
                      <span>
                        <img
                          src={`${process.env.APP_URL}/images/${
                            question.answer == "Yes"
                              ? imgYesForSWPProfile[indx]
                              : imgNoForSWPProfile[indx]
                          }`}
                          className="translate-x-minus-2"
                        />
                        <span className="ml-2">
                          {question.answer == "Yes"
                            ? arrYesForSWPProfile[indx].name
                            : arrNoForSWPProfile[indx].name}
                        </span>
                      </span>

                      <span id={`tool-btn-${indx}`} className="">
                        <OverlayTrigger
                          //show={indx == 0 ? true : false}
                          overlay={
                            <Tooltip className="screen_tooltip">
                              {question.answer == "Yes"
                                ? arrYesForSWPProfile[indx].value
                                : arrNoForSWPProfile[indx].value}
                            </Tooltip>
                          }
                        >
                          <img
                            src={`${process.env.APP_URL}/images/info2.svg`}
                            className="translate-x-minus-1 ml-1 cursor-pointer"
                          />
                        </OverlayTrigger>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : null}
        {userData?.skill_badges?.length > 0 &&
          userData?.skill_badges?.find((skill) => skill.is_completed == 1) && (
            <div className="px-4 py-2">
              <h2>Badges earned</h2>
              <SimpleBar
                style={{
                  maxWidth: "100%",
                }}
              >
                <div className={`${styles.badge_container}`}>
                  {userData?.skill_badges?.map((skill) => {
                    return (
                      <div className={`${styles.badge_col}`}>
                        {!!skill.is_completed && (
                          <div>
                            <img
                              src={skill.skill.image}
                              width={"75"}
                              height={"75"}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </SimpleBar>
            </div>
          )}
        <div className="">
          {/* experience */}
          <div className={`${styles.experience_card}`}>
            <h4>Experience</h4>
            <ul className="p-0 mb-0">
              {userData.work_history?.length > 0
                ? userData.work_history.map((experience) => {
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
          {/* educaiton */}
          <div className={`${styles.experience_card} border-bottom-0 pb-0`}>
            <h4>Education</h4>
            <ul className="p-0 mb-0">
              {userData.education_history?.length > 0
                ? userData.education_history.map((education) => {
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
    </div>
  );
}

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  show_cv_search_profile: state.vantage.cvSearchReducer.showCVSearchProfile,
});

const mapDispatchToProps = (dispatch) => ({
  // setActiveStep : (activeStep) => dispatch(setActiveStep(activeStep)),
  // setShowJobPreview: (status) => dispatch(setShowJobPreview(status)),
  fetchUserSWPProfile: (userToken, userID) =>
    dispatch(fetchUserSWPProfile(userToken, userID)),
  countViewContactDetailGeckoBoard: (userToken, applicantId) =>
    dispatch(countViewContactDetailGeckoBoard(userToken, applicantId)),
  downloadUserSWPProfileCV: (userToken, slug, fullName) =>
    dispatch(downloadUserSWPProfileCV(userToken, slug, fullName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewSWPProfile);
