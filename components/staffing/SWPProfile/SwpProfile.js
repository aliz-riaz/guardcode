import React, { useState, useEffect, useRef, createRef } from "react";
import Image from "next/image";
import {
  Spinner,
  PopoverHeader,
  PopoverBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import moment from "moment";
import _ from "lodash";
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
import { setGlobalChannelOne } from "../../../redux/actions/globalChatAction";
// var _ = require("lodash");
// import {fetchJobPostedByUser} from '../../../redux/actions/staffingAction'
// import IsRequestLoderComponent from '../../Common/IsRequestLoderComponent';
// import JobCard from './JobCard';
// import PaginationForStaffing from '../PaginationForStaffing';

import ShareSWPProfileModal from "./ShareSWPProfileModal";
import { useRouter } from "next/router";
import styles from "./SWPProfile.module.scss";
import { OverlayTrigger, Popover } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import ReactPlayer from "react-player";
import { isMobile } from "react-device-detect";
import SwpActionsForWeb from "./SwpActionsForWeb";
import SwpActionForMobile from "./SwpActionForMobile";
import { SET_IS_MODEL_OPEN } from "../../../redux/types";
import { socket } from "../../../lib/SocketProvider";
import {
  setShowChannelForChat,
  setGroupIDForChat,
  setIsUserComingFromStaffingForChat,
  setHasDoneChatBeforeForChat,
  setShowChannelAndHideChannelListOnMobile,
} from "../../../redux/actions/chatAction";
import uniqid from "uniqid";
import { toast } from "react-toastify";
import RankIcon from "../Applicants/RankIcon";
import ChatInitiate from "../ChatInitiate";
import dynamic from "next/dynamic";
const Tagging = dynamic(() => import("../Tagging/Tagging"), {
  ssr: false,
});

function SWPProfile(props) {
  const [viewDetails, setViewDetails] = useState(true);
  const [modal, setModal] = useState(false);
  const [notes, setNotes] = useState("");
  const [timer, setTimer] = useState(null);
  const [openNote, setOpenNote] = useState(false);
  const [typing, setTyping] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpenn] = useState(false);
  const [disableChatInit, setDisableChatInit] = useState(false);

  const router = useRouter();
  const nextProfile = createRef();

  const toggle = () => {
    setDropdownOpenn(!dropdownOpen);
  };

  const profileVideo = () => {
    setVideoModalOpen(!videoModalOpen);
  };
  // useEffect(() => {
  //   window.scrollTo(0, 0)
  //   props.setSWPProfileWindowToBeShown(false)
  // }, [])
  // useEffect(() => {
  //   return () => {
  //     props.setSWPProfileForUnmount({})
  //   }
  // }, [])
  // const [swpProfile, setwProfile] = useState(false)
  useEffect(() => {
    setViewDetails(true);
  }, [props.swp_profile_to_be_shown.fullname]);

  useEffect(() => {
    setNotes(props.notes_for_swp_profile);
  }, [props.notes_for_swp_profile]);

  useEffect(() => {
    // if(props.notes_for_swp_profile != null) {
    if (
      router.query.jobid &&
      router.query.plot &&
      router.query.appid &&
      props.user_token
    ) {
      // props.getNotesAgainstSWPProfile(
      //   props.user_token,
      //   router.query.jobid,
      //   router.query.appid
      // );
    } else if (props.swp_profile_window_to_be_shown) {
      // props.getNotesAgainstSWPProfile(
      //   props.user_token,
      //   props.latest_job_id_for_applicant_tab,
      //   props.swp_profile_to_be_shown.id
      // );
    }
    // setNotes(props.notes_for_swp_profile);
    // } else {
    // }
  }, [props.swp_profile_to_be_shown]);

  useEffect(() => {
    setNotes(props.notes_for_swp_profile);
  }, [props.notes_for_swp_profile]);

  useEffect(() => {}, [props.clicked_swp_profile_status]);

  const NoteClick = () => {
    setOpenNote(!openNote);
  };
  const ClickDetails = () => {
    setViewDetails(!viewDetails);
    props.countViewContactDetailGeckoBoard(
      props.user_token,
      props.swp_profile_to_be_shown.id
    );
  };
  const UpdateApplicationStatusHandler = (e, status) => {
    e.preventDefault();
    if (
      props.job_applicants_for_applicants_tab[parseInt(props.swp_profile_index)]
        .applicant_status == status
    ) {
      props.updateApplicationStatusOfJob(
        props.user_token,
        props.latest_job_id_for_applicant_tab,
        props.swp_profile_to_be_shown.id,
        "Reviewed",
        {
          jobId: props.latest_job_id_for_applicant_list,
          applicantStatus: props.filter_for_applicants_list,
          keyword: props.search_keyword_for_applicants_list,
          dateOrder: props.date_order_for_applicants_list,
          pageNumber: props.current_page_for_applicant_list,
          url: "",
        }
      );
    } else {
      props.updateApplicationStatusOfJob(
        props.user_token,
        props.latest_job_id_for_applicant_tab,
        props.swp_profile_to_be_shown.id,
        status,
        {
          jobId: props.latest_job_id_for_applicant_list,
          applicantStatus: props.filter_for_applicants_list,
          keyword: props.search_keyword_for_applicants_list,
          dateOrder: props.date_order_for_applicants_list,
          pageNumber: props.current_page_for_applicant_list,
          url: "",
        }
      );
    }

    // closeProfile();
  };
  const closeProfile = () => {
    // setwProfile(!swpProfile);
    props.setSWPProfileWindowToBeShown(false);
    setPopoverOpen(false);
  };
  const [showDownloadSpinner, setShowDownloadSpinner] = useState(false);
  const downloadProfileCV = () => {
    setShowDownloadSpinner(true);
    props
      .downloadUserSWPProfileCV(
        props.user_token,
        props.swp_profile_to_be_shown.slug,
        props.swp_profile_to_be_shown.fullname
      )
      .then((res) => {
        setShowDownloadSpinner(false);
      });
  };

  const nextSWPProfile = (e) => {
    // e.preventDefault();
    setPopoverOpen(false);
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
    setPopoverOpen(false);
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
    // props.setClickedSWPProfileStatus(props.job_applicants_for_applicants_tab[nextIndex].applicant_status)
  };

  const firstTimeChat = (uuid) => {
    socket.emit("initChat", {
      groups: {
        name: `${props.decision_maker_first_name} ${props.decision_maker_last_name}`,
        created_by: props.employers_user_id.toString(),
        uuid: uuid,
        user_id: props.employers_user_id,
      },
      group_members: {
        users: [
          {
            id: props.employers_user_id,
            firstname: props.company_name,
            lastname: `${props.decision_maker_first_name} ${props.decision_maker_last_name}`,
            picture: null,
            email: props.employers_email,
            // "phone": props.employers_mobile_number,
            phone: "03032856025",
            type: "EMPLOYER",
          },
          {
            id: props.swp_profile_to_be_shown.id,
            firstname: props.swp_profile_to_be_shown.first_name,
            lastname:
              props.swp_profile_to_be_shown.middle_name &&
              props.swp_profile_to_be_shown.middle_name != ""
                ? `${props.swp_profile_to_be_shown.middle_name} ${props.swp_profile_to_be_shown.last_name}`
                : props.swp_profile_to_be_shown.last_name,
            picture: props.swp_profile_to_be_shown.profile_picture,
            email: props.swp_profile_to_be_shown.email_address,
            phone: props.swp_profile_to_be_shown.mobile_number,
            type: "JOBSEEKER",
          },
        ],
        applications: {
          job_id: props.job_to_be_shown_in_applicants_tab.id,
          employer_id: props.employers_user_id,
          title: props.job_to_be_shown_in_applicants_tab.title,
          location: `${
            props.job_to_be_shown_in_applicants_tab.postal_code != ""
              ? props.job_to_be_shown_in_applicants_tab.postal_code +
                ", " +
                props.job_to_be_shown_in_applicants_tab.city
              : props.job_to_be_shown_in_applicants_tab.city
          }`,
        },
        multi_chat: false,
      },
      type: "createGroup",
    });
  };

  const hasDoneChatBefore = (roomID) => {
    socket.emit("initChat", {
      groups: {
        name: `${props.decision_maker_first_name} ${props.decision_maker_last_name}`,
        created_by: props.employers_user_id.toString(),
        uuid: roomID,
        user_id: props.employers_user_id,
      },
      group_members: {
        applications: {
          job_id: props.job_to_be_shown_in_applicants_tab.id,
          employer_id: props.employers_user_id,
          title: props.job_to_be_shown_in_applicants_tab.title,
          location: `${
            props.job_to_be_shown_in_applicants_tab.postal_code != ""
              ? props.job_to_be_shown_in_applicants_tab.postal_code +
                ", " +
                props.job_to_be_shown_in_applicants_tab.city
              : props.job_to_be_shown_in_applicants_tab.city
          }`,
        },
      },
      type: "joinGroup",
    });
  };

  const intiateChat = () => {
    setDisableChatInit(true);
    socket.emit("checkGroupExist", {
      user: {
        id: props.swp_profile_to_be_shown.id,
        type: "JOBSEEKER",
      },
    });
  };

  useEffect(() => {
    if (!_.isEmpty(socket)) {
      socket.on("groupExist", (data) => {
        if (data.requestStatus == "success") {
          if (!isMobile) {
            // props.g_chat_one
            // props.setGlobalChannelOne
            if (data.data.hasRoom) {
              hasDoneChatBefore(data.data.group_id);
              props.setGlobalChannelOne({
                show: true,
                is_minimized: false,
                groupID: data.data.group_id,
                userOnlineStatus: null,
                isChannelBlocked: false,
                isTyping: false,
                isFileUploading: false,
                imageToBeShownInMsgImgPreview: null,
                modalPreview: false,
              });
              // props.setGroupIDForChat(data.data.group_id);
              // props.setHasDoneChatBeforeForChat(true);
            } else {
              const uuid = uniqid("group-").toString();
              firstTimeChat(uuid);
              setTimeout(() => {
                props.setGlobalChannelOne({
                  show: true,
                  is_minimized: false,
                  groupID: uuid,
                  userOnlineStatus: null,
                  isChannelBlocked: false,
                  isTyping: false,
                  isFileUploading: false,
                  imageToBeShownInMsgImgPreview: null,
                  modalPreview: false,
                });
                // socket.emit("groupChat", {
                //   groups: {
                //     user_id: props.employers_user_id,
                //     type: "GET_GROUPS",
                //   },
                // })

                socket.emit("groupChatTeamAccess", {
                  requested_type:
                    props.organisationFilters.chat.switchValue ===
                    "My Conversations"
                      ? "myChat"
                      : "allChat",
                  requestedPage: props.currentPage,
                  isSkip: props.isSkip,
                });
              }, 400);

              // props.setGroupIDForChat(uuid);
              // props.setGroupIDForChat(null)
              // props.setHasDoneChatBeforeForChat(false);
            }
          }
          //for mobile view
          else {
            if (data.data.hasRoom) {
              hasDoneChatBefore(data.data.group_id);
              props.setGroupIDForChat(data.data.group_id);
              props.setHasDoneChatBeforeForChat(true);
            } else {
              const uuid = uniqid("group-").toString();
              firstTimeChat(uuid);
              props.setGroupIDForChat(uuid);
              // props.setGroupIDForChat(null)
              props.setHasDoneChatBeforeForChat(false);
            }
            props.setShowChannelForChat(true);
            props.setIsUserComingFromStaffingForChat(true);
            if (isMobile) {
              props.setShowChannelAndHideChannelListOnMobile(true);
            }
            router.push("/chat");
          }
          setDisableChatInit(false);
        } else {
          console.error("Something went wrong in groupExist event:", data);
          toast.error("Something went wrong, Please try again!");
        }
      });
    }
    return () => {
      socket?.removeAllListeners("groupExist");
    };
  }, [props.swp_profile_to_be_shown]);

  if (_.isEmpty(props.swp_profile_to_be_shown)) {
    return <></>;
  }

  const proceedToNextCandidate = (e) => {
    if (
      !(
        props.job_applicants_for_applicants_tab.length ==
        parseInt(parseInt(props.swp_profile_index) + 1)
      )
    ) {
      nextSWPProfile(e);
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

  const reloadSwpProfile = () => {
    // let nextIndex = parseInt(parseInt(props.swp_profile_index) - 1);
    // props.setSWPProfileIndex(nextIndex);
    props.fetchUserSWPProfile(
      props.user_token,
      props.latest_job_id_for_applicant_tab,
      props.job_applicants_for_applicants_tab[props.swp_profile_index].slug
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
          {/* <div className={`d-flex align-align-items-center ${styles.swp_top_head}`}>
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
                  props.job_applicants_for_applicants_tab.length ==
                    parseInt(parseInt(props.swp_profile_index) + 1)
                    ? true
                    : false || props.usreq
                }
                onClick={nextSWPProfile}
                useRef={nextProfile}
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
              <div className={`d-flex justify-content-between`}>
                <span className={`${styles.applied_date}`}>
                  {/* {props.swp_profile_to_be_shown.is_invited_job == 1 ? (
                    <p className="">Invited to apply </p>
                  ) : null} */}
                  {
                    <p className="">
                      {/* Applied {moment(props.swp_profile_to_be_shown.created_at, 'YYYY-MM-DD').format('DD MMM YYYY')} */}
                      Applied{" "}
                      {moment(
                        props.swp_profile_to_be_shown.date_of_applied_job,
                        "YYYY-MM-DD"
                      ).format("DD MMM YYYY")}
                    </p>
                  }
                </span>
                <Tagging
                  jobSeekerId={props.swp_profile_to_be_shown.id}
                  tags={props.swp_profile_to_be_shown.tags}
                  reloadSwpProfile={reloadSwpProfile}
                />
              </div>
              <div className={`${styles.profile_header}`}>
                <div className={`${styles.top_content_wrap}`}>
                  <div className="d-flex">
                    <div className={`shrink-0 ${styles.profile_avatar} mr-2`}>
                      <img
                        src={props.swp_profile_to_be_shown.profile_picture}
                        alt="Profile"
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
                          <span>
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
                          className={`${
                            viewDetails ? styles.blur : null
                          } d-flex align-items-center`}
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
                          className={`${
                            viewDetails ? styles.blur : null
                          } d-flex align-items-center mb-0`}
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
                    {props.swp_profile_to_be_shown.driving_answer == "1" && (
                      <div className={`${styles.license_card}`}>
                        <img
                          src={process.env.APP_URL + "/images/driving-icon.svg"}
                        />
                        <span className="fw-medium">Driving Licence</span>
                      </div>
                    )}
                    {props.swp_profile_to_be_shown.experience_answer == "1" && (
                      <div className={`${styles.license_card}`}>
                        <img
                          src={process.env.APP_URL + "/images/license-icn.svg"}
                        />
                        <span className="fw-medium">
                          Military/Police Experience
                        </span>
                      </div>
                    )}
                  </div>
                  <div className={`${styles.licenses_wrap} mt-3`}>
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
                </div>

                <div>
                  <OverlayTrigger
                    trigger="hover"
                    placement="left-start"
                    rootClose
                    overlay={
                      <Popover
                        className="bg-transparent border-0"
                        style={{ maxWidth: "460px" }}
                      >
                        <div className={`${styles.guard_rank_popover}`}>
                          <div
                            className={`rank star_${props.swp_profile_to_be_shown.guard_rank}`}
                          >
                            <RankIcon />
                          </div>
                          <div className={`${styles.content}`}>
                            <h3>What is GuardRank?</h3>
                            <p className="mb-2">
                              GuardRank is a rating for each candidate, showing
                              how probable it is they'll be a successful hire
                              for your job. The rating is determined by
                              comparing the candidate's profile data with your
                              job post. A higher score indicates a stronger
                              match.
                            </p>
                          </div>
                        </div>
                      </Popover>
                    }
                  >
                    <div className={`${styles.ranking_wrap}`}>
                      <div
                        className={`rank star_${props.swp_profile_to_be_shown.guard_rank}`}
                      >
                        <RankIcon />
                      </div>
                      <h3>
                        <strong>
                          {rankGrade(props.swp_profile_to_be_shown.guard_rank)}
                        </strong>
                        {props.swp_profile_to_be_shown.guard_rank}
                        <span>GuardRank</span>
                      </h3>
                    </div>
                  </OverlayTrigger>
                  <div className={`${styles.actions_btn}`}>
                    <button
                      className={`btn btn-sm btn-outline-dark ${
                        styles.btn_outline
                      } ${showDownloadSpinner && styles.loading}`}
                      onClick={downloadProfileCV}
                      disabled={showDownloadSpinner ? true : false}
                    >
                      Download CV
                      {showDownloadSpinner && (
                        <span className={`${styles.loader}`}>
                          <Spinner size="sm" />
                        </span>
                      )}
                    </button>

                    <button
                      className={`btn btn-sm btn-outline-dark ${styles.btn_outline}`}
                      onClick={() => setModal(true)}
                    >
                      Share Profile
                    </button>

                    <button
                      disable={disableChatInit}
                      className={`btn btn-md btn-green ${styles.chat_button}`}
                      onClick={intiateChat}
                    >
                      Chat
                    </button>
                  </div>
                </div>

                {/* <div className={`ml-auto`}>
                  <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} className={`${styles.share_dropdown}`}>
                    <DropdownToggle className='bg-trasnparent border-0 px-0'>
                      {!dropdownOpen ? <img src={process.env.APP_URL+'/images/more-vertical.svg'} /> : <img src={process.env.APP_URL+'/images/more-vertical-green.svg'} />}
                    </DropdownToggle>
                    <DropdownMenu className='py-0 px-3'>
                      <ul className='list-unstyled mb-0'>
                        <button disable={disableChatInit} className="cursor-pointer d-flex align-items-center my-2" onClick={intiateChat}>
                          <i>
                            <img src={`${process.env.APP_URL}/images/chat.svg`} width={'18'} height={'19'} />
                          </i>
                          <span className="pl-2">Chat</span>
                        </button>
                        <li className="cursor-pointer d-flex align-items-center my-2" onClick={() => setModal(true)}>
                          <i>
                            <img src={`${process.env.APP_URL}/images/share-btn.svg`} width={'18'} height={'19'} />
                          </i>
                          <span className="pl-2">Share Profile</span>
                        </li>
                        <li className="cursor-pointer d-flex align-items-center my-2" onClick={downloadProfileCV}>
                          <i>
                            <img src={`${process.env.APP_URL}/images/pdf-icn.svg`} width={'19'} height={'21'} />
                          </i>
                          {showDownloadSpinner ? (
                            <span className="pl-2 text-black-50">Download CV</span>
                          ) : (
                            <span className="pl-2">Download CV</span>
                          )}
                        </li>
                      </ul>
                    </DropdownMenu>
                  </ButtonDropdown>
                </div> */}
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

          {isMobile ? <SwpActionForMobile /> : null}
        </div>
      </div>

      {/* SWP Profile column 3 for web view */}
      {!isMobile ? (
        <SwpActionsForWeb proceedToNextCandidate={proceedToNextCandidate} />
      ) : null}

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
  decision_maker_first_name:
    state.vantage.userDataReducer.decision_maker_first_name,
  decision_maker_last_name:
    state.vantage.userDataReducer.decision_maker_last_name,
  employers_email: state.vantage.userDataReducer.user_email,
  employers_mobile_number: state.vantage.userDataReducer.user_mobile_number,
  employers_user_id: state.vantage.userDataReducer.user_id,
  job_to_be_shown_in_applicants_tab:
    state.vantage.staffingReducer.jobToBeShownInApplicantsTab,
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
  company_name: state.vantage.userDataReducer.user_name,
  user_email: state.vantage.userDataReducer.user_email,

  g_chat_one: state.vantage.globalChatReducer.globalChannelOne,
  organisationFilters: state.vantage.organisationReducer.filter,

  currentPage: state.vantage.chatReducer.currentPage,
  isSkip: state.vantage.chatReducer.isSkip,
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
  setShowChannelForChat: (status) => dispatch(setShowChannelForChat(status)),
  setGroupIDForChat: (groupID) => dispatch(setGroupIDForChat(groupID)),
  setIsUserComingFromStaffingForChat: (status) =>
    dispatch(setIsUserComingFromStaffingForChat(status)),
  setHasDoneChatBeforeForChat: (status) =>
    dispatch(setHasDoneChatBeforeForChat(status)),
  setShowChannelAndHideChannelListOnMobile: (status) =>
    dispatch(setShowChannelAndHideChannelListOnMobile(status)),
  setGlobalChannelOne: (globalChannelOne) =>
    dispatch(setGlobalChannelOne(globalChannelOne)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SWPProfile);
