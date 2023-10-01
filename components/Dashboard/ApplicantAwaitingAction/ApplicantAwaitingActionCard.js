import React, { useEffect, useState, useRef, useContext } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import {
  setDidUserClickedAJob,
  setLatestJobId,
  setScreenToShowOnStaffing,
  setDateOrderForApplicantList,
  setSearchKeywordForApplicantList,
  setCurrentPageForApplicantList,
  setSWPProfileWindowToBeShown,
  setFilterForApplicantList,
} from "../../../redux/actions/staffingAction";
import styles from "./ApplicantAwaitingAction.module.scss";

const ApplicantAwaitingActionCard = (props) => {
  const router = useRouter();

  return (
    <ul>
      {props.applicant?.map((item, index) => {
        if (index < 8) {
          return (
            <>
              <li>
                <a className="">
                  <img src={item.profile_picture} alt={item.id} />
                </a>
              </li>
            </>
          );
        }
      })}

      {props.applicant?.length > 8 && (
        <li className={`${styles.plus_value}`}>
          <a>+{props.applicant.length - 7}</a>
        </li>
      )}
      {/* <li className={`${styles.plus_value}`}><a href="#">+{props.applicant.length - 8}</a></li> */}
    </ul>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  setLatestJobId: (jobId) => dispatch(setLatestJobId(jobId)),

  setDidUserClickedAJob: (status) => dispatch(setDidUserClickedAJob(status)),
  setScreenToShowOnStaffing: (screen) =>
    dispatch(setScreenToShowOnStaffing(screen)),
  setDateOrderForApplicantList: (dateOrder) =>
    dispatch(setDateOrderForApplicantList(dateOrder)),
  setSearchKeywordForApplicantList: (keyword) =>
    dispatch(setSearchKeywordForApplicantList(keyword)),
  setCurrentPageForApplicantList: (page) =>
    dispatch(setCurrentPageForApplicantList(page)),
  setSWPProfileWindowToBeShown: (status) =>
    dispatch(setSWPProfileWindowToBeShown(status)),
  setFilterForApplicantList: (filter) =>
    dispatch(setFilterForApplicantList(filter)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicantAwaitingActionCard);
