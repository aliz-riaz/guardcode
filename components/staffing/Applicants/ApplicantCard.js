import moment from "moment";
import React, { useState, Suspense } from "react";
import {
  Input,
  FormGroup,
  Label,
  Row,
  Col,
  Table,
  Button,
  Form,
  InputGroup,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import styles from "./ApplicantCard.module.scss";
const Image = React.lazy(() => import("../../Common/Image"));
import {
  fetchUserSWPProfile,
  updateApplicationStatusOfJob,
  setDidUserClickedAJob,
  setLatestJobId,
  setSWPProfileWindowToBeShown,
  setClickedSWPProfileStatus,
  setSWPProfileIndex,
  setScreenToShowOnStaffing,
} from "../../../redux/actions/staffingAction";
import { connect } from "react-redux";
import IsRequestLoderComponent from "../../Common/IsRequestLoderComponent";
import { isMobile } from "react-device-detect";
import ReactPlayer from "react-player";
import { OverlayTrigger, Popover, Tooltip } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import RankIcon from "./RankIcon";
import ChatInitiate from "../ChatInitiate";

const ApplicantCard = (props) => {
  const [showVideo, setShowVideo] = useState(false);

  const handleClose = () => setShowVideo(false);
  const handleShowVideo = () => setShowVideo(true);

  const [applicantStatus, setApplicantStatus] = useState(
    props.data.applicant_status
  );
  const setSWPProfileWindow = (status) => {
    props.setSWPProfileWindowToBeShown(status);
  };
  const cardClickHandler = (e) => {
    e.preventDefault();
    // props.setLatestJobId();
    // props.setDidUserClickedAJob(true);
    setSWPProfileWindow(true);
    props.setSWPProfileIndex(props.currentIndex);
    props.fetchUserSWPProfile(
      props.user_token,
      props.latest_job_id_for_applicant_tab,
      props.data.slug
    );
    if (props.data.is_reviewed == 0) {
      props.updateApplicationStatusOfJob(
        props.user_token,
        props.latest_job_id_for_applicant_tab,
        props.data.id,
        "Reviewed"
      );
    }
    // setSWPProfileWindow(true)
    props.setClickedSWPProfileStatus(props.data.applicant_status);
    // props.getNotesAgainstSWPProfile(props.user_token, props.latest_job_id_for_applicant_tab, props.data.id)
  };
  const UpdateApplicationStatusHandler = (e, status) => {
    e.preventDefault();
    if (applicantStatus == status) {
      props.updateApplicationStatusOfJob(
        props.user_token,
        props.latest_job_id_for_applicant_tab,
        props.data.id,
        "New Applicants"
      );
      setApplicantStatus("New Applicant");
    } else {
      props.updateApplicationStatusOfJob(
        props.user_token,
        props.latest_job_id_for_applicant_tab,
        props.data.id,
        status
      );
      setApplicantStatus(status);
    }
  };

  const nextSWPProfile = (e) => {
    e.preventDefault();

    let nextIndex = parseInt(parseInt(props.swp_profile_index) + 1);
    props.setSWPProfileIndex(nextIndex);
    props.fetchUserSWPProfile(
      props.user_token,
      props.latest_job_id_for_applicant_tab,
      props.job_applicants_for_applicants_tab[nextIndex].slug
    );
    if (props.job_applicants_for_applicants_tab[nextIndex].is_reviewed == 0) {
      props.updateApplicationStatusOfJob(
        props.user_token,
        props.latest_job_id_for_applicant_tab,
        props.job_applicants_for_applicants_tab[nextIndex].id,
        "Reviewed"
      );
    }
    // props.setClickedSWPProfileStatus(props.job_applicants_for_applicants_tab[nextIndex].applicant_status)
  };

  const previousSWPProfile = (e) => {
    e.preventDefault();

    // if(props.swp_profile_index > 0) {
    let nextIndex = parseInt(parseInt(props.swp_profile_index) - 1);
    props.setSWPProfileIndex(nextIndex);
    props.fetchUserSWPProfile(
      props.user_token,
      props.latest_job_id_for_applicant_tab,
      props.job_applicants_for_applicants_tab[nextIndex].slug
    );
    if (props.job_applicants_for_applicants_tab[nextIndex].is_reviewed == 0) {
      props.updateApplicationStatusOfJob(
        props.user_token,
        props.latest_job_id_for_applicant_tab,
        props.job_applicants_for_applicants_tab[nextIndex].id,
        "Reviewed"
      );
    }
  };

  const rankGrade = (rank) => {
    let result = "ok";
    switch (true) {
      case rank <= 2:
        result = "Fair";
        break;
      case rank == 3:
        result = "Good";
        break;
      case rank == 4:
        result = "Great";
        break;
      case rank == 5:
        result = "Excellent";
        break;
      default:
        result = "ok";
    }
    return result;
  };
  return (
    <>
      {/* Awaiting class add when you need awiting  */}
      {/* <div
        className={`cursor-pointer ${styles.applicant_card} ${props.data.applicant_status == 'New Applicants' ? styles.awaiting : null
          } rounded bg-white px-2 py-3`}
        onClick={(e) => cardClickHandler(e)}  >
        <Row className="">
          <Col className={`col-12 ${!props.swp_profile_window_to_be_shown && 'col-md-6'}`}>
            <span className={`${styles.awaiting_badge} ${props.data.applicant_status == 'New Applicants' ? null : 'd-none'}`}>
              Awaiting Review
            </span>
            <div className="d-flex flex-column">
              <div className={`${styles.user_header} d-flex align-items-md-center`}>
                <div className={`${styles.applicant_avatar} flex-shrink-0`}>
                  <Suspense fallback={<IsRequestLoderComponent />}>
                    <Image src={props.data.profile_picture} className="img-fluid" />
                  </Suspense>
                </div>
                <div className={`${styles.applicant_info} flex-grow-1 ml-2`}>
                  <h3 className="mb-1 p-0 cursor-pointer">
                    <u>{props.data.fullname}</u>
                  </h3>
                  <p className={`${styles.city} d-flex align-items-md-center mb-0`}>
                    <img src={process.env.APP_URL + '/images/map-pin.svg'} style={{ marginTop: '-2px' }} height="14px" />
                    <span className="ml-2">{props.data.postcode + ', ' + props.data.city}</span>
                  </p>
                </div>
                {props.data.is_enhanced_profile == 1 ? (
                  <span className={`${styles.applicant_badge}`}>
                    <img src={process.env.APP_URL + '/images/badge-big.svg'} className="verified" />
                  </span>
                ) : null}
              </div>
            </div>
          </Col>
          {!isMobile && !props.swp_profile_window_to_be_shown && (
            <Col className="ml-auto">
              <div className="text-left mt-3 mt-md-0 text-md-right h-100">
                <div className={`${styles.date_and_invite} mb-2`}>
                  {props.data.is_invited_job == 1 ? <span className='text-black-50'>Invited Applicant <span className='text-dark'>|</span> </span> : null}
                  <span className={`${styles.date} mb-0 font-weight-bold`}>
                    Applied {moment(props.data.applied_date, 'YYYY-MM-DD').format('DD MMM YYYY')}
                  </span>
                </div>
                {props.data.has_screened == 1 ? (
                  <span className="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17">
                      <g stroke="#000" fill="none" fill-rule="evenodd" stroke-linecap="square">
                        <path d="M7 3h8M7 9h8M7 14h8M1 1h3v3H1zM1 13h3v3H1zM1 7l3 3M4 7l-3 3"></path>
                      </g>
                    </svg>
                  </span>
                ) : null}
                {props.data.profile_video != null ? (
                  <span className="mx-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 17 15">
                      <g stroke="#000" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="1" y="1" width="15" height="13" rx="1" />
                        <path d="m6 4 5.5 3.5L6 11z" />
                      </g>
                    </svg>
                  </span>
                ) : null}

                {props.data.is_enhanced_profile == 1 ? <span className={`${styles.enhance_profile} `}>Enhanced Profile</span> : null}

                <div>

                </div>
              </div>
            </Col>
          )}
        </Row>
        <Row>
          <Col className={`col-12 ${!props.swp_profile_window_to_be_shown && 'col-md-8'}`}>
            <div className={`${styles.applicants_licence} list-unstyled mb-0 0000`}>
              <ul className={` list-unstyled mb-0`}>
                {props.data.license.map((license) => {
                  return (
                    <>
                      <li>
                        <img src={process.env.APP_URL + '/images/verified-icn-sml-2.svg'} className="img-fluid" />
                        <span>{license.course_license}</span>
                      </li>
                    </>
                  )
                })}
              </ul>
            </div>
          </Col>
          {props.data.applicant_status == 'Rejected' || props.data.applicant_status == 'Shortlisted' ? !isMobile && !props.swp_profile_window_to_be_shown && (
            <Col className="ml-md-auto aa">
              <div className="d-flex flex-column h-100">
                <div className={`${styles.actions} text-right mt-md-auto mt-3 d-md-block d-flex justify-content-between`}>
                  <button
                    className={`${styles.btn_sm} btn btn-sm btn-${props.data.applicant_status == 'Rejected' ? 'danger' : 'green'
                      } rounded-0`}
                  >
                    {props.data.applicant_status == 'Rejected'
                      ? 'Not interested'
                      : props.data.applicant_status}
                  </button>
                </div>
              </div>
            </Col>
          ) : null}
        </Row>
      </div> */}

      <div
        className={`${styles.applicant_card_new} 
          ${
            props.swp_profile_window_to_be_shown
              ? props.swp_profile_index == props.currentIndex &&
                styles.reviewing
              : null
          }
          ${
            applicantStatus == "Shortlisted"
              ? styles.shortlisted
              : applicantStatus == "Rejected"
              ? styles.declined
              : styles.awaiting
          } ${props.swp_profile_window_to_be_shown && styles.shownApplicant}`}
      >
        {props.swp_profile_window_to_be_shown &&
        props.swp_profile_index == props.currentIndex ? (
          <span className={`${styles.reviewing_badge}`}>In Review</span>
        ) : (
          applicantStatus == "New Applicants" && (
            <span className={`${styles.awaiting_badge}`}>Awaiting Review</span>
          )
        )}

        {/* {!isMobile && !props.swp_profile_window_to_be_shown &&
          <span className={`${styles.apply_date}`}>Applied {moment(props.data.applied_date, 'YYYY-MM-DD').format('DD MMM YYYY')}</span>
        } */}
        <ul>
          <li
            className={`pl-0 ${
              props.swp_profile_window_to_be_shown ? "flex-1" : null
            }`}
          >
            <div className={`${styles.user_header} d-flex align-items-center`}>
              <div className={`${styles.applicant_avatar} flex-shrink-0`}>
                <figure onClick={(e) => cardClickHandler(e)}>
                  <Suspense fallback={<IsRequestLoderComponent />}>
                    <Image
                      src={props.data.profile_picture}
                      className="img-fluid"
                    />
                  </Suspense>
                </figure>
                {props.data.is_enhanced_profile == 1 ? (
                  <span className={`${styles.applicant_badge}`}>
                    <img
                      src={process.env.APP_URL + "/images/badge-big.svg"}
                      className="verified"
                    />
                  </span>
                ) : null}
                {!isMobile &&
                  !props.swp_profile_window_to_be_shown &&
                  props.data.profile_video && (
                    <p
                      className={`${styles.play_video} m-0`}
                      onClick={handleShowVideo}
                    >
                      <img
                        src={process.env.APP_URL + "/images/play-icon.svg"}
                      />
                      <span>Play Intro</span>
                    </p>
                  )}
              </div>
              <div className={`${styles.applicant_info} flex-grow-1 `}>
                {!isMobile &&
                  !props.swp_profile_window_to_be_shown &&
                  props.data.tags && (
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id="tag-history">
                          <div className="p-2">
                            <p className="text-white fs-7 text-left mb-2">
                              {
                                props.data.tags.employer
                                  .decision_maker_first_name
                              }{" "}
                              added this tag
                              <br /> on{" "}
                              {props.data.tags &&
                                moment(props.data.tags.updated_at)
                                  .format("YYYY-MM-DD")
                                  .toString()}
                            </p>
                            {props.data.tags.notes && (
                              <p className="text-white text-left fs-7 mb-0">
                                <strong className="d-block">Note:</strong>
                                {props.data.tags.notes}
                              </p>
                            )}
                          </div>
                        </Tooltip>
                      }
                    >
                      <span
                        className={`${styles.applied_tag_box} position-relative d-block mb-2`}
                      >
                        <span
                          className={`${styles.applied_tag}  px-2 py-1 rounded fw-bold text-black text-uppercase cursor-pointer`}
                          style={{
                            backgroundColor: props.data.tags.tag?.color,
                          }}
                        >
                          {props.data.tags.tag?.name}
                        </span>
                      </span>
                    </OverlayTrigger>
                  )}
                {/* <span
                  className={`${styles.tag_label} px-2 py-1 rounded fw-bold text-black text-uppercase cursor-pointer my-2 d-inline-block`}
                  style={{ backgroundColor: "#00cf2e" }}
                >
                  Blocked
                </span> */}
                <h3
                  className="fw-medium mb-0 p-0 cursor-pointer"
                  onClick={(e) => cardClickHandler(e)}
                >
                  {props.data.fullname}
                </h3>
                <p
                  className={`${styles.city} d-flex align-items-md-center mb-2`}
                >
                  <img
                    src={process.env.APP_URL + "/images/map-pin.svg"}
                    height="14px"
                  />
                  <span className="ml-2">
                    {props.data.postcode + ", " + props.data.city}
                  </span>
                </p>
              </div>
            </div>
          </li>

          {!isMobile && !props.swp_profile_window_to_be_shown && (
            <li>
              <div className={`${styles.licenses_wrap} mb-3`}>
                {props.data.license.map((license) => {
                  return (
                    <>
                      <div className={`${styles.license_card}`}>
                        <img
                          src={process.env.APP_URL + "/images/badge-img.svg"}
                          className="img-fluid"
                        />
                        <span>{license.course_license}</span>
                      </div>
                    </>
                  );
                })}
              </div>
              <div className={`${styles.badges_wrap}`}>
                {props.data.skill_badges?.map((item, index) => {
                  if (index < 3) {
                    return (
                      <OverlayTrigger
                        trigger="hover"
                        placement="top-start"
                        rootClose
                        overlay={
                          <Popover
                            className="bg-transparent border-0"
                            style={{ maxWidth: "400px" }}
                          >
                            <div className={`${styles.popover}`}>
                              <div className={`${styles.img_wrap}`}>
                                <img src={item.skill.image} />
                              </div>
                              <div className={`${styles.content}`}>
                                <h3>
                                  {item.skill.name}{" "}
                                  <span className="fw-normal">
                                    skills badge
                                  </span>
                                </h3>
                                {/* <p>{item.skill.description}</p> */}
                                <p>
                                  This candidate has earned the skill badge by
                                  answering relevant skill based questions
                                </p>
                                <span>
                                  Achieved on{" "}
                                  {moment(item.skill.updated_at)
                                    .format("DD-MM-YYYY")
                                    .toString()}
                                </span>
                              </div>
                            </div>
                          </Popover>
                        }
                      >
                        <div className={`${styles.badge}`}>
                          <img src={item.skill.image} />
                        </div>
                      </OverlayTrigger>
                    );
                  }
                })}
              </div>
              <div></div>
            </li>
          )}

          {!isMobile && (
            <li
              className={`${
                isMobile || (props.swp_profile_window_to_be_shown && "d-none")
              }`}
            >
              <div className={`${styles.experience_wrap}`}>
                <h3>Recent experience</h3>
                {props.data.work_history?.length > 0 ? (
                  <>
                    <h4>{props.data.work_history[0].position}</h4>
                    <p>{props.data.work_history[0].agency}</p>
                    <p>
                      {props.data.work_history[0].from_date_formatted} - Present
                    </p>
                  </>
                ) : (
                  <>No data</>
                )}
              </div>
            </li>
          )}

          {!isMobile && !props.swp_profile_window_to_be_shown && (
            <li className={`pr-0`}>
              <div className={`${styles.rank_btn_wrap}`}>
                <OverlayTrigger
                  trigger="hover"
                  placement="top-end"
                  rootClose
                  overlay={
                    <Popover
                      className="bg-transparent border-0"
                      style={{ maxWidth: "460px" }}
                    >
                      <div className={`${styles.guard_rank_popover}`}>
                        <div className={`rank star_${props.data.guard_rank}`}>
                          <RankIcon />
                        </div>
                        <div className={`${styles.content}`}>
                          <h3>What is GuardRank?</h3>
                          <p className="mb-2">
                            GuardRank is a rating for each candidate, showing
                            how probable it is they'll be a successful hire for
                            your job. The rating is determined by comparing the
                            candidate's profile data with your job post. A
                            higher score indicates a stronger match.
                          </p>
                        </div>
                      </div>
                    </Popover>
                  }
                >
                  <div className={`${styles.ranking_wrap}`}>
                    <div className={`rank star_${props.data.guard_rank}`}>
                      <RankIcon />
                    </div>
                    <h3>
                      <strong>{rankGrade(props.data.guard_rank)}</strong>
                      {props.data.guard_rank} <span>GuardRank</span>
                    </h3>
                  </div>
                </OverlayTrigger>
                <div className={`${styles.button_wrap}`}>
                  <button
                    className={`${styles.not_intersted} ${
                      applicantStatus == "Rejected" ? styles.active : ""
                    }`}
                    onClick={(e) =>
                      UpdateApplicationStatusHandler(e, "Rejected")
                    }
                  >
                    <img
                      src={`${process.env.APP_URL}/images/person-block.svg`}
                    />
                    {applicantStatus == "Rejected" ? "Declined" : "Decline"}
                  </button>
                  <button
                    className={`${styles.shortlist} ${
                      applicantStatus == "Shortlisted" ? styles.active : ""
                    }`}
                    onClick={(e) =>
                      UpdateApplicationStatusHandler(e, "Shortlisted")
                    }
                  >
                    <img
                      src={`${process.env.APP_URL}/images/account-tick.svg`}
                    />
                    {applicantStatus == "Shortlisted"
                      ? "Shortlisted"
                      : "Shortlist"}
                  </button>
                  {/* <button className={`btn btn-sm btn-green`}>
                  <img src={`${process.env.APP_URL}/images/chat.svg`} width={"18"} height={"19"} />Chat
                </button> */}
                  {/* <ChatInitiate
                    swp_profile_to_be_shown={props.data}
                    style={``}
                    chatIcon={true}
                  /> */}
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
      <Modal
        show={showVideo}
        size="sm"
        centered
        onHide={handleClose}
        dialogClassName={`${styles.videoModalWrap}`}
      >
        <div className={`${styles.videoModal}`}>
          <button className={`${styles.closeBtn}`} onClick={handleClose}>
            {" "}
            <img src={`${process.env.APP_URL}/images/cancel.svg`} />
          </button>
          <Modal.Body className={`p-0`}>
            <ReactPlayer
              url={props.data.profile_video}
              className={`${styles.react_player} m-0`}
              width="300px"
              height="100%"
              playing
              config={{
                youtube: {
                  playerVars: { showinfo: 1 },
                },
              }}
              controls={true}
            />
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};
const mapStateToProps = (state) => ({
  jobs_posted_by_user: state.vantage.staffingReducer.jobsPostedByUser,
  current_page_for_job_list:
    state.vantage.staffingReducer.currentPageForJobList,
  pagination_for_job_list: state.vantage.staffingReducer.paginationForJobList,
  total_pages_for_job_list: state.vantage.staffingReducer.totalPagesForJobList,
  user_token: state.vantage.userDataReducer.user_token,
  filter_for_job_list: state.vantage.staffingReducer.filterForJobList,
  date_order_for_job_list: state.vantage.staffingReducer.dateOrderForJobList,
  search_keyword_for_job_list:
    state.vantage.staffingReducer.searchKeywordForJobList,
  latest_job_id_for_applicant_tab: state.vantage.staffingReducer.latestJobId,
  latest_job_id_for_applicant_list: state.vantage.staffingReducer.latestJobId,

  filter_for_applicants_list:
    state.vantage.staffingReducer.filterForApplicantsList,
  date_order_for_applicants_list:
    state.vantage.staffingReducer.dateOrderForApplicantsList,
  search_keyword_for_applicants_list:
    state.vantage.staffingReducer.searchKeywordForApplicantsList,
  current_page_for_applicant_list:
    state.vantage.staffingReducer.currentPageForApplicantList,
  job_applicants_for_applicants_tab:
    state.vantage.staffingReducer.jobApplicants,
  swp_profile_window_to_be_shown:
    state.vantage.staffingReducer.swpProfileWindowToBeShown,
  swp_profile_to_be_shown: state.vantage.staffingReducer.swpProfileToBeShown,
  swp_profile_index: state.vantage.staffingReducer.swpProfileIndex,
});

const mapDispatchToProps = (dispatch) => ({
  setDidUserClickedAJob: (status) => dispatch(setDidUserClickedAJob(status)),
  setLatestJobId: (jobId) => dispatch(setLatestJobId(jobId)),
  fetchUserSWPProfile: (userToken, jobId, jobSeekerSlug) =>
    dispatch(fetchUserSWPProfile(userToken, jobId, jobSeekerSlug)),
  updateApplicationStatusOfJob: (userToken, jobId, applicantId, status) =>
    dispatch(
      updateApplicationStatusOfJob(userToken, jobId, applicantId, status)
    ),
  setSWPProfileWindowToBeShown: (status) =>
    dispatch(setSWPProfileWindowToBeShown(status)),
  setClickedSWPProfileStatus: (status) =>
    dispatch(setClickedSWPProfileStatus(status)),
  setSWPProfileIndex: (index) => dispatch(setSWPProfileIndex(index)),
  //   getNotesAgainstSWPProfile: (userToken, jobId, applicantId) => dispatch(getNotesAgainstSWPProfile(userToken, jobId, applicantId)),
  setScreenToShowOnStaffing: (screen) =>
    dispatch(setScreenToShowOnStaffing(screen)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantCard);
// export default ApplicantCard;
