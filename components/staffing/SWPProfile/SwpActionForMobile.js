import React, { useState, useEffect, useRef } from "react";
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
} from "reactstrap";
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
import SwpActionsForWeb from "./SwpActionsForWeb";

function SWPProfile(props) {
  const [openNote, setOpenNote] = useState(false);

  const [notes, setNotes] = useState(props.swp_profile_to_be_shown.notes);
  const [timer, setTimer] = useState(null);
  const [typing, setTyping] = useState(false);
  const [applicantStatus, setApplicantStatus] = useState(
    props.swp_profile_to_be_shown.applicant_status
  );

  const textAreaValue = useRef(null);

  useEffect(() => {
    setApplicantStatus(props.swp_profile_to_be_shown.applicant_status);
    setNotes(props.swp_profile_to_be_shown.notes);
    textAreaValue.current.value = props.swp_profile_to_be_shown.notes;
  }, [props.swp_profile_to_be_shown]);

  const NoteClick = () => {
    setOpenNote(!openNote);
  };

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

  return (
    <div className={`${styles.swp_profile_footer} d-md-none`}>
      <div className={`${styles.add_note} w-100`}>
        <div
          className={`${styles.add_note_header} text-white d-flex align-items-center cursor-pointer`}
          onClick={NoteClick}
        >
          <i>
            <img src={process.env.APP_URL + "/images/chat-white.svg"} />
          </i>
          <span className="fw-bold fs-6 ml-2">
            Add Note{" "}
            <small className="ml-2">Comments - only visible to you</small>
          </span>
          <span className="ml-auto">
            <img
              className={`${openNote && "rotate"}`}
              src={process.env.APP_URL + "/images/chevron-right-white.svg"}
            />
          </span>
        </div>
        <div
          className={`${styles.add_note_field} text-white pt-4  ${
            !openNote && "d-none"
          } `}
        >
          <textarea
            className="form-control"
            placeholder="Write your notes here…"
            value={notes}
            onChange={(e) => textAreaChangeHandler(e)}
            ref={textAreaValue}
          ></textarea>
          <span
            className={`cursor-pointer ${styles.remove_note}`}
            onClick={() => {
              setNotes("");
              props.postNotesAgainstSWPProfile(
                props.user_token,
                props.latest_job_id_for_applicant_tab,
                props.swp_profile_to_be_shown.id,
                ""
              );
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <g fill="none" fill-rule="evenodd" stroke-linecap="square">
                <g stroke="#242429" stroke-width="1.5">
                  <g>
                    <path
                      d="M16 8v8.571c0 .79-.672 1.429-1.5 1.429h-9c-.828 0-1.5-.64-1.5-1.429V8M2 5.5L18 5.5M7 5L7 2 13 2 13 5M12 10L8 14M12 14L8 10"
                      transform="translate(-713.000000, -3.000000) translate(713.000000, 3.000000)"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </span>
          {/* typing ?  */}
          {typing ? (
            <span className={`${styles.note_saving} fw-bold text-success`}>
              Saving....
            </span>
          ) : null}
        </div>
      </div>
      <div className={`d-flex swp_footer_action ${styles.swp_footer_action}`}>
        <button
          type="button"
          className={`btn btn-sm ${
            applicantStatus == "Rejected" ? "btn-danger" : ""
          }`}
          onClick={(e) => UpdateApplicationStatusHandler(e, "Rejected")}
        >
          Not interested
        </button>
        <button
          type="button"
          className={`btn btn-sm ${
            applicantStatus == "Shortlisted" ? "btn-green" : ""
          }`}
          onClick={(e) => UpdateApplicationStatusHandler(e, "Shortlisted")}
        >
          Shortlist
        </button>
      </div>
    </div>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(SWPProfile);
