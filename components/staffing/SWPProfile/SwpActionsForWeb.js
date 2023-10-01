import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Modal, Spinner } from "react-bootstrap";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import moment from "moment";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import {
  arrYesForSWPProfile,
  arrNoForSWPProfile,
  imgYesForSWPProfile,
  imgNoForSWPProfile,
} from "../../../lib/helper";

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
  setSWPProfileForUnmount,
  videoRequest,
  setFilterForApplicantList,
  setSWPProfileNextCandidateStatus,
} from "../../../redux/actions/staffingAction";
// var _ = require("lodash");
// import {fetchJobPostedByUser} from '../../../redux/actions/staffingAction'
// import IsRequestLoderComponent from '../../Common/IsRequestLoderComponent';
// import JobCard from './JobCard';
// import PaginationForStaffing from '../PaginationForStaffing';

import ShareSWPProfileModal from "./ShareSWPProfileModal";
import router from "next/router";
import styles from "./SWPProfile.module.scss";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ReactPlayer from "react-player";
import { isMobile } from "react-device-detect";

function SwpActionsForWeb(props) {
  const [notes, setNotes] = useState(
    props.swp_profile_to_be_shown.profile_picture
  );
  const [timer, setTimer] = useState(null);
  const [typing, setTyping] = useState(false);
  const [applicantStatus, setApplicantStatus] = useState(
    props.swp_profile_to_be_shown.applicant_status
  );
  const [videoRequested, setVideoRequested] = useState(null);
  const [infoVideoModal, setInfoVideoModal] = useState(false);
  const [playingVideoId, setplayingVideoId] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loading, setLoading] = useState(false);
  const [nextCandidateStatus, setNextCandidateStatus] = useState(false);

  const textAreaValue = useRef(null);
  const nextStatus = useRef(null);

  useEffect(() => {
    setApplicantStatus(props.swp_profile_to_be_shown.applicant_status);
    setNotes(props.swp_profile_to_be_shown.notes);
    setVideoRequested(props.swp_profile_to_be_shown.is_video_requested);
    textAreaValue.current.value = props.swp_profile_to_be_shown.notes;
  }, [props.swp_profile_to_be_shown]);

  const UpdateApplicationStatusHandler = (e, status) => {
    e.preventDefault();
    if (applicantStatus == status) {
      props.updateApplicationStatusOfJob(
        props.user_token,
        props.latest_job_id_for_applicant_tab,
        props.swp_profile_to_be_shown.id,
        "New Applicants"
      );
      setApplicantStatus("New Applicant");
    } else {
      props.updateApplicationStatusOfJob(
        props.user_token,
        props.latest_job_id_for_applicant_tab,
        props.swp_profile_to_be_shown.id,
        status
      );
      setApplicantStatus(status);
      if (
        props.swp_profile_next_candidate_status &&
        (status == "Shortlisted" || status == "Rejected")
      ) {
        props.proceedToNextCandidate();
      }
    }
  };

  const textAreaChangeHandler = (e) => {
    e.preventDefault();
    // props.postNotesAgainstSWPProfile(props.user_token, props.latest_job_id_for_applicant_tab, props.swp_profile_to_be_shown.id, e.target.value);
    setNotes(e.target.value);
    setTyping(true);
    window.clearTimeout(timer); // prevent errant multiple timeouts from being generated
    // setTimer = window.setTimeout(() => {
    setTimer(
      window.setTimeout(() => {
        setTyping(false);
        props.postNotesAgainstSWPProfile(
          props.user_token,
          props.latest_job_id_for_applicant_tab,
          props.swp_profile_to_be_shown.id,
          e.target.value
        );
      }, 1000)
    );
  };

  const deleteNotes = () => {
    setNotes("");
    props.postNotesAgainstSWPProfile(
      props.user_token,
      props.latest_job_id_for_applicant_tab,
      props.swp_profile_to_be_shown.id,
      ""
    );
  };

  const videoRequestSend = async () => {
    setLoading(true);
    if (
      await props.videoRequest(
        props.user_token,
        props.swp_profile_to_be_shown.id,
        props.latest_job_id_for_applicant_tab,
        props.organisation_id
      )
    ) {
      setVideoRequested(1);
    }
    setLoading(false);
  };
  const proceedToNextCandidateHandler = () => {
    // if (props.job_applicants_for_applicants_tab.length ==
    //   parseInt(parseInt(props.swp_profile_index) + 1)) {
    //   let nextIndex = parseInt(parseInt(props.swp_profile_index) + 1);
    //   props.setSWPProfileIndex(nextIndex);
    //   props.fetchUserSWPProfile(
    //     props.user_token,
    //     props.latest_job_id_for_applicant_tab,
    //     props.job_applicants_for_applicants_tab[nextIndex].slug
    //   );
    //   if (props.job_applicants_for_applicants_tab[nextIndex].is_reviewed == 0) {
    //     props.updateApplicationStatusOfJob(
    //       props.user_token,
    //       props.latest_job_id_for_applicant_tab,
    //       props.job_applicants_for_applicants_tab[nextIndex].id,
    //       "Reviewed"
    //     );
    //   }
    // }
  };

  return (
    <div
      className={` ${styles.candidate_actions} ${
        props.swp_profile_window_to_be_shown ? styles.open : null
      } ${isMobile && "d-none"}`}
    >
      <SimpleBar style={{ maxHeight: "100%" }}>
        <div
          className={`d-flex justify-content-between ${styles.action_buttons}`}
        >
          <button
            type="button"
            className={`btn btn-sm ${
              applicantStatus == "Rejected" ? styles.btn_danger : ""
            }`}
            onClick={(e) => UpdateApplicationStatusHandler(e, "Rejected")}
          >
            <img src={`${process.env.APP_URL}/images/person-block.svg`} />
            {applicantStatus == "Rejected" ? "Declined" : "Decline"}
          </button>
          <button
            type="button"
            className={`btn btn-sm ${
              applicantStatus == "Shortlisted" ? styles.btn_success : ""
            }`}
            onClick={(e) => UpdateApplicationStatusHandler(e, "Shortlisted")}
          >
            <img src={`${process.env.APP_URL}/images/account-tick.svg`} />
            {applicantStatus == "Shortlisted" ? "Shortlisted" : "Shortlist"}
          </button>
        </div>
        <div>
          <div className={`gl-checkbox form-group mb-0 mt-3`}>
            <label className="mb-0">
              <input
                type="checkbox"
                name="proceedToNextCandidate"
                ref={nextStatus}
                checked={props.swp_profile_next_candidate_status}
                // onClick={() => setNextCandidateStatus(!nextCandidateStatus)}
                onClick={() => {
                  props.setSWPProfileNextCandidateStatus(
                    !props.swp_profile_next_candidate_status
                  );
                }}
              />
              <span>
                Proceed to the next unreviewed candidate after marking
              </span>
              <span className="checkmark"></span>
            </label>
          </div>
        </div>
        <div className="applicant_video mt-4 mt-md-4 mb-3">
          {props.swp_profile_to_be_shown.profile_video ? (
            <>
              <h6 className="font-weight-bold">Intro video</h6>

              <ReactPlayer
                url={props.swp_profile_to_be_shown.profile_video}
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
                  <img
                    src={process.env.APP_URL + "/images/play-icon-new.svg"}
                  />
                }
                light={props.swp_profile_to_be_shown.thumbnail_image}
                controls={"true"}
              />
            </>
          ) : (
            <>
              {/* #VideoProfileRequest */}
              <div
                className={`${styles.no_video_card} position-relative`}
                style={{
                  backgroundImage: `url(${
                    props.swp_profile_to_be_shown.profile_picture
                      ? props.swp_profile_to_be_shown.profile_picture
                      : process.env.APP_URL + "/images/training_user.png"
                  })`,
                }}
              >
                <span
                  className={`${styles.info} position-absolute cursor-pointer`}
                  onClick={() => setInfoVideoModal(true)}
                >
                  <img src={`${process.env.APP_URL}/images/info_green.svg`} />
                </span>
                <div className={`${styles.cont} text-white`}>
                  <div className={`text-center py-2 px-2`}>
                    {videoRequested == 0 ? (
                      <>
                        <span>
                          <img
                            src={`${process.env.APP_URL}/images/play_small.svg`}
                          />
                        </span>
                        <h5 className="text-white mb-2 mt-1 fs-robot">
                          Request video intro
                        </h5>
                        <p className="lh-normal text-white m-0 px-2 fs-robot">
                          Ask {props.swp_profile_to_be_shown.first_name} to
                          record and upload a short video intro for you
                        </p>
                        <button
                          className="btn btn-success btn-md text-dark fw-medium mt-2 fs-6 py-2 px-3"
                          disabled={loading ? true : false}
                          onClick={videoRequestSend}
                        >
                          <span className="mx-1">Request video intro</span>
                          {loading && <Spinner animation="border" size="sm" />}
                        </button>
                      </>
                    ) : (
                      <>
                        <span>
                          <img
                            src={`${process.env.APP_URL}/images/requested_icon.svg`}
                          />
                        </span>
                        <h5 className="text-white mb-1 mt-1 fs-robot">
                          Video intro requested
                        </h5>
                        <p className="lh-normal text-white m-0 px-2 fs-robot">
                          We’ve sent your request to{" "}
                          {props.swp_profile_to_be_shown.first_name} to record a
                          video intro. Once available, you’ll be able to view it
                          here
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className={`${styles.video_info_modal}`}
                show={infoVideoModal}
              >
                <Modal.Body className={`${styles.organisation_body} py-4 px-4`}>
                  <div className="position-relative">
                    <h2 className="fs-robot">Request video intro</h2>
                    <div
                      className={`${styles.close} position-absolute cursor-pointer`}
                      onClick={() => setInfoVideoModal(false)}
                    >
                      <img
                        src={`${process.env.APP_URL}/images/cancel.svg`}
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className={`${styles.video_sample} mt-3 fs-robot`}>
                    <p className="fs-6">
                      Video intros can aide you in making better hiring
                      decisions.{" "}
                    </p>
                    <p className="fs-6">
                      When video intros aren’t available, you can request them
                      from an applicant and we’ll ask them to upload one for
                      you.
                    </p>

                    <p className="fs-6">
                      We’ll notify you once the applicant uploads their video
                      and its available for viewing
                    </p>
                    <p className="fw-bold fs-6">Sample intro videos</p>
                    {infoVideoModal && (
                      <div className="row">
                        <div className="col-12 col-md-4">
                          <div className="box-shadow">
                            <ReactPlayer
                              url={`https://s3-eu-west-2.amazonaws.com/get-licensed/guardpass/profile_video/VID_2022-01-13%2005-22-55.mp4`}
                              className={`${styles.react_player}`}
                              width="100%"
                              height="300px"
                              config={{
                                youtube: {
                                  playerVars: { showinfo: 1 },
                                },
                              }}
                              onPlay={() => {
                                setplayingVideoId(1);
                                setIsPlaying(false);
                              }}
                              onPause={() => {
                                setIsPlaying(true);
                              }}
                              playing={playingVideoId === 1 ? true : false}
                              playIcon={
                                <button onClick={() => setplayingVideoId(1)}>
                                  <img
                                    src={
                                      process.env.APP_URL +
                                      "/images/play-btn.svg"
                                    }
                                  />
                                </button>
                              }
                              light={
                                props.swp_profile_to_be_shown.thumbnail_image
                              }
                              controls={"true"}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-4">
                          <div className="box-shadow">
                            <ReactPlayer
                              url={`https://s3-eu-west-2.amazonaws.com/get-licensed/guardpass/profile_video/VID_2022-03-22%2012-21-56.mp4`}
                              className={`${styles.react_player}`}
                              width="100%"
                              height="300px"
                              config={{
                                youtube: {
                                  playerVars: { showinfo: 1 },
                                },
                              }}
                              onPlay={() => {
                                setplayingVideoId(2);
                                setIsPlaying(false);
                              }}
                              onPause={() => {
                                setIsPlaying(true);
                              }}
                              playing={playingVideoId === 2 ? true : false}
                              playIcon={
                                <button onClick={() => setplayingVideoId(2)}>
                                  <img
                                    src={
                                      process.env.APP_URL +
                                      "/images/play-btn.svg"
                                    }
                                  />
                                </button>
                              }
                              light={
                                props.swp_profile_to_be_shown.thumbnail_image
                              }
                              controls={"true"}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-4">
                          <div className="box-shadow">
                            <ReactPlayer
                              url={`https://s3-eu-west-2.amazonaws.com/get-licensed/guardpass/profile_video/VID_2022-05-11%2011-16-02.mp4`}
                              className={`${styles.react_player}`}
                              width="100%"
                              height="300px"
                              config={{
                                youtube: {
                                  playerVars: { showinfo: 1 },
                                },
                              }}
                              onPlay={() => {
                                setplayingVideoId(3);
                                setIsPlaying(false);
                              }}
                              onPause={() => {
                                setIsPlaying(true);
                              }}
                              playing={playingVideoId === 3 ? true : false}
                              playIcon={
                                <button onClick={() => setplayingVideoId(3)}>
                                  <img
                                    src={
                                      process.env.APP_URL +
                                      "/images/play-btn.svg"
                                    }
                                  />
                                </button>
                              }
                              light={
                                props.swp_profile_to_be_shown.thumbnail_image
                              }
                              controls={"true"}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Modal.Body>
              </Modal>
            </>
          )}
        </div>

        <div className={`${styles.add_note_field} text-white px-3`}>
          <div className={`${styles.notes_header} `}>
            <i>
              <img
                src={process.env.APP_URL + "/images/pen.svg"}
                width={"12"}
                height={"12"}
              />
            </i>
            <span className="font-weight-bold ml-2">Add note</span>
          </div>
          <textarea
            className="form-control"
            placeholder="Write your notes here…"
            value={notes}
            onChange={(e) => textAreaChangeHandler(e)}
            ref={textAreaValue}
          ></textarea>
          <span
            className={`cursor-pointer ${styles.remove_note}`}
            onClick={deleteNotes}
          >
            <img src={process.env.APP_URL + "/images/deletenotes.svg"} />
          </span>
        </div>
        {/* typing ?  */}
        {typing ? (
          <span className="note_saving fw-bold text-success position-absolute">
            Saving....
          </span>
        ) : null}
      </SimpleBar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  swp_profile_next_candidate_status:
    state.vantage.staffingReducer.nextCandidateStatus,
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
  organisation_id: state.vantage.organisationReducer.organistaionId,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserSWPProfile: (userToken, jobId, jobSeekerSlug) =>
    dispatch(fetchUserSWPProfile(userToken, jobId, jobSeekerSlug)),
  updateApplicationStatusOfJob: (userToken, jobId, applicantId, status) =>
    dispatch(
      updateApplicationStatusOfJob(userToken, jobId, applicantId, status)
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
  setSWPProfileForUnmount: (profile) =>
    dispatch(setSWPProfileForUnmount(profile)),
  videoRequest: (userToken, jobSeekerId, jobID, organisationID) =>
    dispatch(videoRequest(userToken, jobSeekerId, jobID, organisationID)),
  setFilterForApplicantList: (filter) =>
    dispatch(setFilterForApplicantList(filter)),
  setSWPProfileNextCandidateStatus: (status) =>
    dispatch(setSWPProfileNextCandidateStatus(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SwpActionsForWeb);
