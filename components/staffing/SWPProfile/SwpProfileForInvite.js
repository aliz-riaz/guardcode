import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Spinner,
  Popover,
  PopoverHeader,
  PopoverBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { connect } from "react-redux";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import {
  fetchUserSWPProfile,
  updateApplicationStatusOfJob,
  setSWPProfileWindowToBeShown,
  fetchApplicantsAgainstJob,
  countViewContactDetailGeckoBoard,
  setSWPProfileIndex,
  setClickedSWPProfileStatus,
  postNotesAgainstSWPProfile,
  downloadUserSWPProfileCV,
  inviteApplicantToJob,
  setSWPProfileForUnmount,
} from "../../../redux/actions/staffingAction";

import ShareSWPProfileModal from "./ShareSWPProfileModal";
import styles from "./SWPProfile.module.scss";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ReactPlayer from "react-player";
import { isMobile } from "react-device-detect";
import {
  arrYesForSWPProfile,
  arrNoForSWPProfile,
  imgYesForSWPProfile,
  imgNoForSWPProfile,
} from "../../../lib/helper";
import moment from "moment";

function SWPProfileForInvite(props) {
  const [modal, setModal] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [confirmInvitation, setConfirmInvitation] = useState(false);
  const [dropdownOpen, setDropdownOpenn] = useState(false);

  const toggle = () => {
    setDropdownOpenn(!dropdownOpen);
  };

  const disableTooltipText =
    "Not visible until the candidate accepts your job invitation";
  // useEffect(() => {
  //   return () => {
  //     props.setSWPProfileForUnmount({})
  //   }
  // }, [])

  const inviteToApplyHandler = () => {
    setConfirmInvitation(true);
  };

  const conformationNoHandler = () => {
    setConfirmInvitation(false);
  };

  const inviteApplicantToApply = () => {
    props.inviteApplicantToJob(
      props.user_token,
      props.latest_job_id_for_applicant_tab,
      props.swp_profile_to_be_shown.id
    );
    setConfirmInvitation(false);
    props.fetchUserSWPProfile(
      props.user_token,
      props.latest_job_id_for_applicant_tab,
      props.swp_profile_to_be_shown.slug
    );
  };

  const profileVideo = () => {
    setVideoModalOpen(!videoModalOpen);
  };

  const closeProfile = () => {
    props.setSWPProfileWindowToBeShown(false);
    setPopoverOpen(false);
  };

  const nextSWPProfile = (e) => {
    e.preventDefault();
    setConfirmInvitation(false);
    setPopoverOpen(false);
    let nextIndex = parseInt(parseInt(props.swp_profile_index) + 1);
    props.setSWPProfileIndex(nextIndex);
    props.fetchUserSWPProfile(
      props.user_token,
      props.latest_job_id_for_applicant_tab,
      props.invite_applicants[nextIndex].slug
    );
    props.setClickedSWPProfileStatus(
      props.invite_applicants[nextIndex].applicant_status
    );
  };

  const previousSWPProfile = (e) => {
    e.preventDefault();
    setPopoverOpen(false);
    setConfirmInvitation(false);
    // if(props.swp_profile_index > 0) {
    let nextIndex = parseInt(parseInt(props.swp_profile_index) - 1);
    props.setSWPProfileIndex(nextIndex);
    props.fetchUserSWPProfile(
      props.user_token,
      props.latest_job_id_for_applicant_tab,
      props.invite_applicants[nextIndex].slug
    );
    props.setClickedSWPProfileStatus(
      props.invite_applicants[nextIndex].applicant_status
    );
  };
  return (
    <>
      <div
        className={`${styles.applicant_profile} ${
          props.swp_profile_window_to_be_shown ? styles.open : null
        } rounded`}
      >
        <div
          className={`${styles.swp_profile} ${
            props.swp_profile_window_to_be_shown ? styles.show : ""
          }`}
        >
          {/* <div className="swp_top_head d-flex align-align-items-center px-3 py-2">
            <span className="close_profile" onClick={closeProfile}>
              <img src={process.env.APP_URL + "/images/x-circle.svg"} />
            </span>
            <span className="next_and_previous">
              <button
                disabled={parseInt(props.swp_profile_index) > 0 ? false : true}
                onClick={previousSWPProfile}
                className=""
              >
                <span>Previous</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="7"
                  viewBox="0 0 13 7"
                  className="ml-2"
                >
                  <path
                    d="M1.138 6.422a.2.2 0 0 0 .28.037l5.186-3.987 5.186 3.99a.2.2 0 0 0 .28-.037l.732-.952a.2.2 0 0 0-.037-.28L6.725.545a.2.2 0 0 0-.245 0L.443 5.19a.2.2 0 0 0-.037.28l.732.951z"
                    fill-rule="nonzero"
                  />
                </svg>
              </button>
              <button
                disabled={
                  props.invite_applicants.length ==
                    parseInt(parseInt(props.swp_profile_index) + 1)
                    ? true
                    : false
                }
                onClick={nextSWPProfile}
              >
                <span>Next</span>
                <svg
                  width="13"
                  height="7"
                  viewBox="0 0 13 7"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2"
                >
                  <path
                    d="M12.07.585a.2.2 0 0 0-.28-.037L6.603 4.535 1.418.545a.2.2 0 0 0-.28.036l-.732.953a.2.2 0 0 0 .037.28l6.04 4.648a.2.2 0 0 0 .244 0l6.038-4.646a.2.2 0 0 0 .037-.28l-.733-.951z"
                    fill-rule="nonzero"
                  />
                </svg>
              </button>
            </span>
          </div> */}
          <SimpleBar
            style={
              isMobile
                ? { maxHeight: "calc((100%) - (164px))" }
                : { maxHeight: "calc((100%) - (24px))" }
            }
          >
            <div className={`${styles.scroll_box}`}>
              <div
                className={`${styles.profile_header} align-items-center justify-content-start pt-2`}
              >
                <div className={`${styles.top_content_wrap}`}>
                  <div className="d-flex">
                    <div className={`shrink-0 ${styles.profile_avatar} mr-3`}>
                      <img
                        src={props.swp_profile_to_be_shown.profile_picture}
                        className={`${styles.profile_img}`}
                      />
                      {props.swp_profile_to_be_shown.is_enhanced_profile ==
                      1 ? (
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="tooltip-disabled">
                              Verified Profile
                            </Tooltip>
                          }
                        >
                          <span className="d-block">
                            <img
                              src={
                                process.env.APP_URL + "/images/badge-big.svg"
                              }
                              className="verified"
                            />
                          </span>
                        </OverlayTrigger>
                      ) : null}
                    </div>
                    <div className={`${styles.profile_info}`}>
                      {/* {props.swp_profile_to_be_shown.is_enhanced_profile == 1 ? (
                    <h6 className="text-black-50 mb-0">Enhanced profile</h6>
                  ) : null} */}
                      <h4 className="mb-2">
                        {props.swp_profile_to_be_shown.fullname}
                      </h4>
                      <p className="d-flex align-items-center mb-2">
                        <img
                          src={process.env.APP_URL + "/images/map-pin.svg"}
                          alt=""
                          className="img-fluid"
                        />
                        <span>
                          {props.swp_profile_to_be_shown.postcode +
                            ", " +
                            props.swp_profile_to_be_shown.city}
                        </span>
                      </p>
                      <div className={`${styles.reveal_cont}`}>
                        <a
                          className={`${styles.blur} d-flex align-items-center`}
                          href={`tel:${props.swp_profile_to_be_shown.mobile_number}`}
                        >
                          <img
                            src={process.env.APP_URL + "/images/call-icn-2.svg"}
                            alt=""
                            className="img-fluid"
                          />
                          <span>
                            {props.swp_profile_to_be_shown.mobile_number}
                          </span>
                        </a>
                        <a
                          className={`${styles.blur} d-flex align-items-center mb-0`}
                          href={`mailto:${props.swp_profile_to_be_shown.email_address}`}
                        >
                          <img
                            src={
                              process.env.APP_URL + "/images/mail-icn-web.svg"
                            }
                            alt=""
                          />
                          <span>
                            {props.swp_profile_to_be_shown.email_address}
                          </span>
                        </a>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip-disabled">
                              {disableTooltipText}
                            </Tooltip>
                          }
                        >
                          <button
                            className={`btn btn-sm btn-outline-dark ${styles.btn_outline}`}
                          >
                            Reveal contact
                          </button>
                        </OverlayTrigger>
                      </div>
                    </div>
                  </div>
                  {(props.swp_profile_to_be_shown.experience_answer == "1" ||
                    props.swp_profile_to_be_shown.driving_answer == "1") && (
                    <>
                      <div className={`${styles.licenses_wrap} mw-100`}>
                        {props.swp_profile_to_be_shown.driving_answer ==
                          "1" && (
                          <div className={`${styles.license_card}`}>
                            <img
                              src={
                                process.env.APP_URL + "/images/driving-icon.svg"
                              }
                            />
                            <span className="fw-medium">Driving Licence</span>
                          </div>
                        )}
                        {props.swp_profile_to_be_shown.experience_answer ==
                          "1" && (
                          <div className={`${styles.license_card}`}>
                            <img
                              src={
                                process.env.APP_URL + "/images/license-icn.svg"
                              }
                            />
                            <span className="fw-medium">
                              Military/Police Experience
                            </span>
                          </div>
                        )}
                      </div>
                      <div className={`${styles.licenses_wrap} mw-100 mt-3`}>
                        {props.swp_profile_to_be_shown.license?.length > 0 ? (
                          <>
                            {props.swp_profile_to_be_shown.license?.length > 0
                              ? props.swp_profile_to_be_shown.license.map(
                                  (license, i) => {
                                    return (
                                      <div className={`${styles.license_card}`}>
                                        <img
                                          src={
                                            process.env.APP_URL +
                                            "/images/license-icn.svg"
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
                                  }
                                )
                              : null}
                          </>
                        ) : null}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {props.swp_profile_to_be_shown.profile_video != null ? (
                <Modal
                  isOpen={videoModalOpen}
                  className={" discardModal VideoModal " + styles.video_modal}
                  backdrop="static"
                  keyboard={false}
                >
                  <div className={`${styles.video_body}`}>
                    <span
                      className={`${styles.close} d-block text-right`}
                      onClick={profileVideo}
                    >
                      <img
                        src={process.env.APP_URL + "/images/x-circle.svg"}
                        className="d-inline-block cursor-pointer"
                        alt=""
                      />
                    </span>
                    <video controls autoPlay>
                      <source
                        src={props.swp_profile_to_be_shown.profile_video}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                </Modal>
              ) : null}

              {props.swp_profile_to_be_shown.skill_badges?.length > 0 &&
                props.swp_profile_to_be_shown.skill_badges?.find(
                  (skill) => skill.is_completed == 1
                ) && (
                  <div className="py-2">
                    <h4>Badges earned</h4>
                    <SimpleBar
                      style={{
                        maxWidth: "100%",
                      }}
                    >
                      <div className={`${styles.badge_container}`}>
                        {props.swp_profile_to_be_shown.skill_badges?.map(
                          (skill) => {
                            return (
                              <>
                                {!!skill.is_completed && (
                                  <div className={`${styles.badge_col}`}>
                                    <img
                                      src={skill.skill.image}
                                      width={"75"}
                                      height={"75"}
                                    />
                                  </div>
                                )}
                              </>
                            );
                          }
                        )}
                      </div>
                    </SimpleBar>
                  </div>
                )}

              <div className={`${styles.card_body_wrap}`}>
                <div className={`${styles.column_wrap}`}>
                  <div className={`${styles.experience_card}`}>
                    <h4>Experience</h4>
                    <ul className="mb-0">
                      {props.swp_profile_to_be_shown.work_history?.length > 0
                        ? props.swp_profile_to_be_shown.work_history.map(
                            (experience) => {
                              return (
                                <li>
                                  <h4 className="mb-0">
                                    {experience.position}
                                  </h4>
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
                                  <p className="mb-0">
                                    {experience.country.name}
                                  </p>
                                </li>
                              );
                            }
                          )
                        : null}
                    </ul>
                  </div>
                  <div
                    className={`${styles.experience_card} border-bottom-0 pb-0`}
                  >
                    <h4>Education</h4>
                    <ul className="mb-0">
                      {props.swp_profile_to_be_shown.education_history?.length >
                      0
                        ? props.swp_profile_to_be_shown.education_history.map(
                            (education) => {
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
                                  <p className="mb-0">
                                    {education.country.name}
                                  </p>
                                </li>
                              );
                            }
                          )
                        : null}
                    </ul>
                  </div>
                </div>
                <div className={`${styles.column_wrap}`}>
                  {process.browser &&
                  props.swp_profile_to_be_shown.has_screened == 1 ? (
                    <div className={`${styles.prescreen_row} mt-4 bg-black`}>
                      <span className="d-flex fw-bold fs-6 ml-0 mb-0">
                        <span className="text-white">Screening ready</span>
                        <span className="translate-x-minus-1 ml-2">
                          <img
                            src={`${process.env.APP_URL}/images/screen_icon.svg`}
                          />
                        </span>
                      </span>
                      <span className={`${styles.updated_date} mb-2`}>
                        Updated on{" "}
                        {moment(
                          props.swp_profile_to_be_shown?.screening_questions[0]
                            ?.updated_at,
                          "YYYY-MM-DD"
                        ).format("DD MMM YYYY")}
                      </span>
                      <div>
                        <ul className="d-flex flex-wrap flex-column p-0 text-white">
                          {props.swp_profile_to_be_shown?.screening_questions?.map(
                            (question, indx) => {
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
                            }
                          )}
                        </ul>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </SimpleBar>
          <div></div>
        </div>
        <ShareSWPProfileModal
          profileImg={props.swp_profile_to_be_shown.profile_picture}
          profileName={props.swp_profile_to_be_shown.fullname}
          profileLicense={props.swp_profile_to_be_shown.license}
          profileLocation={
            props.swp_profile_to_be_shown.postcode +
            ", " +
            props.swp_profile_to_be_shown.city
          }
          profileModal={modal}
          profileSlug={props.swp_profile_to_be_shown.slug}
          setProfileModal={setModal}
        />
      </div>

      <div
        className={` ${styles.candidate_actions} ${
          props.swp_profile_window_to_be_shown ? styles.open : null
        } ${isMobile && "d-none"}`}
      >
        <SimpleBar style={{ maxHeight: "100%" }}>
          <div className="">
            {/* {!confirmInvitation && <button
              type="button"
              className="w-100 btn btn-gray btn-sm"
              onClick={conformationNoHandler}
              >
                Invite to apply
            </button>
            } */}
            {props.swp_profile_to_be_shown.is_invited_job == 0 ? (
              confirmInvitation ? (
                <div className={`${styles.confirm_action}`}>
                  <p className="text-center fs-6 mb-4 pb-2">
                    Are you sure, you want to invite this <br /> person to
                    apply?
                  </p>
                  <button
                    className={`btn btn-outline-danger border-0 fs-6 px-4 fw-bold w-50 ${styles.no_btn}`}
                    onClick={conformationNoHandler}
                  >
                    Cancel
                  </button>
                  <button
                    className={`btn btn-green fs-6 fw-bold px-4 w-50 ${styles.yes_btn}`}
                    onClick={inviteApplicantToApply}
                  >
                    Yes
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className={`w-100 btn btn-gray py-2 btn-sm`}
                    onClick={inviteToApplyHandler}
                  >
                    <span
                      className="m d-block py-1"
                      style={{ marginTop: "2px" }}
                    >
                      Invite to apply
                    </span>
                  </button>
                </div>
              )
            ) : (
              <div>
                <button className={`w-100 btn btn-green py-2 btn-sm`} disabled>
                  <img
                    src={process.env.APP_URL + "/images/tickCheckImg2.svg"}
                    style={{ marginTop: "-2px" }}
                    width="16px"
                  />
                  <span className="ml-2 d-inline-block py-1">Invite sent</span>
                </button>
              </div>
            )}
          </div>
          <div className="applicant_video mt-4 mt-md-4 mb-3">
            {props.swp_profile_to_be_shown.profile_video ? (
              <>
                <h6 className="font-weight-bold">Intro video</h6>
                <ReactPlayer
                  url={props.swp_profile_to_be_shown.profile_video}
                  className={`${styles.react_player}`}
                  width="100%"
                  //height='398px'
                  height="490px"
                  playing
                  playIcon={
                    <img src={`${process.env.APP_URL}/images/play-new.svg`} />
                  }
                  // playIcon={<button>Play</button>}
                  light={props.swp_profile_to_be_shown.thumbnail_image}
                  controls={"true"}
                />
              </>
            ) : null}
          </div>
        </SimpleBar>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  swp_profile_to_be_shown: state.vantage.staffingReducer.swpProfileToBeShown,
  latest_job_id_for_applicant_tab: state.vantage.staffingReducer.latestJobId,
  swp_profile_index: state.vantage.staffingReducer.swpProfileIndex,
  // jobs_posted_by_user: state.vantage.staffingReducer.jobsPostedByUser,
  // current_page_for_job_list: state.vantage.staffingReducer.currentPageForJobList,
  // pagination_for_job_list: state.vantage.staffingReducer.paginationForJobList,
  // total_pages_for_job_list: state.vantage.staffingReducer.totalPagesForJobList,
  user_token: state.vantage.userDataReducer.user_token,
  // filter_for_job_list: state.vantage.staffingReducer.filterForJobList,
  // date_order_for_job_list: state.vantage.staffingReducer.dateOrderForJobList,
  // search_keyword_for_job_list: state.vantage.staffingReducer.searchKeywordForJobList,
  swp_profile_window_to_be_shown:
    state.vantage.staffingReducer.swpProfileWindowToBeShown,

  latest_job_id_for_applicant_list: state.vantage.staffingReducer.latestJobId,

  filter_for_applicants_list:
    state.vantage.staffingReducer.filterForApplicantsList,
  date_order_for_applicants_list:
    state.vantage.staffingReducer.dateOrderForApplicantsList,
  search_keyword_for_applicants_list:
    state.vantage.staffingReducer.searchKeywordForApplicantsList,
  current_page_for_applicant_list:
    state.vantage.staffingReducer.currentPageForApplicantList,
  clicked_swp_profile_status:
    state.vantage.staffingReducer.clickedSWPProfileStatus,
  notes_for_swp_profile: state.vantage.staffingReducer.notesForSWPProfile,
  job_applicants_for_applicants_tab:
    state.vantage.staffingReducer.jobApplicants,
  invite_applicants: state.vantage.staffingReducer.inviteApplicants,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserSWPProfile: (userToken, jobId, jobSeekerSlug) =>
    dispatch(fetchUserSWPProfile(userToken, jobId, jobSeekerSlug)),
  updateApplicationStatusOfJob: (
    userToken,
    jobId,
    applicantId,
    status,
    fetchApplicantData
  ) =>
    dispatch(
      updateApplicationStatusOfJob(
        userToken,
        jobId,
        applicantId,
        status,
        fetchApplicantData
      )
    ),
  setSWPProfileWindowToBeShown: (status) =>
    dispatch(setSWPProfileWindowToBeShown(status)),
  fetchApplicantsAgainstJob: (
    userToken,
    jobId,
    jobStatus,
    keyword,
    dateOrder,
    pageNumber,
    url
  ) =>
    dispatch(
      fetchApplicantsAgainstJob(
        userToken,
        jobId,
        jobStatus,
        keyword,
        dateOrder,
        pageNumber,
        url
      )
    ),
  countViewContactDetailGeckoBoard: (userToken, applicantId) =>
    dispatch(countViewContactDetailGeckoBoard(userToken, applicantId)),
  setSWPProfileIndex: (index) => dispatch(setSWPProfileIndex(index)),
  setClickedSWPProfileStatus: (status) =>
    dispatch(setClickedSWPProfileStatus(status)),
  postNotesAgainstSWPProfile: (userToken, jobId, applicantId, notes) =>
    dispatch(postNotesAgainstSWPProfile(userToken, jobId, applicantId, notes)),
  // getNotesAgainstSWPProfile:(userToken, jobId, applicantId) => dispatch(getNotesAgainstSWPProfile(userToken, jobId, applicantId)),
  downloadUserSWPProfileCV: (userToken, slug, fullName) =>
    dispatch(downloadUserSWPProfileCV(userToken, slug, fullName)),
  inviteApplicantToJob: (userToken, jobId, jobSeekerId) =>
    dispatch(inviteApplicantToJob(userToken, jobId, jobSeekerId)),
  setSWPProfileForUnmount: (profile) =>
    dispatch(setSWPProfileForUnmount(profile)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SWPProfileForInvite);
