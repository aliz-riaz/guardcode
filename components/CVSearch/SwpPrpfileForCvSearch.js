import React, { useEffect, useState, useRef, useContext } from "react";
import { connect } from "react-redux";
import { socket } from "../../lib/SocketProvider";
import { OverlayTrigger, Modal, Spinner, Tooltip } from "react-bootstrap";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import Image from "next/image";
import ReactPlayer from "react-player";
import styles from "./SwpPrpfileForCvSearch.module.scss";
import {
  fetchUserSWPProfileAgainstCVSearch,
  setShowCVSearchProfileStatus,
  inviteJobsInCvSearch,
  setSwpProfileId,
  setIsSWPProfileLoading,
} from "../../redux/actions/cvSearchAction";
import {
  countViewContactDetailGeckoBoard,
  downloadUserSWPProfileCV,
} from "../../redux/actions/staffingAction";
import {
  arrYesForSWPProfile,
  arrNoForSWPProfile,
  imgYesForSWPProfile,
  imgNoForSWPProfile,
} from "../../lib/helper";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { isMobile } from "react-device-detect";
import {
  setShowChannelForChat,
  setGroupIDForChat,
  setIsUserComingFromStaffingForChat,
  setHasDoneChatBeforeForChat,
  setShowChannelAndHideChannelListOnMobile,
} from "../../redux/actions/chatAction";
import { setGlobalChannelOne } from "../../redux/actions/globalChatAction";

import { useRouter } from "next/router";
import uniqid from "uniqid";
import Tagging from "./Tagging/Tagging";

const SwpPrpfileForCvSearch = (props) => {
  const [userData, setUserData] = useState(null);
  const [viewDetails, setViewDetails] = useState(false);
  const [showDownloadSpinner, setShowDownloadSpinner] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [selectedInvite, setSelectedInvite] = useState([]);
  const [inviteLimitError, setInviteLimitError] = useState(false);
  const [inviteLoader, setInviteLoader] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [reloadSwpProfile, setReloadSwpProfile] = useState(false);

  const [disableChatInit, setDisableChatInit] = useState(false);

  const inputCheckbox = useRef();
  const router = useRouter();

  // useEffect(async () => {
  //   if (props.swp_profile_cv_search_id) {
  //     const result = await props.fetchUserSWPProfileAgainstCVSearch(
  //       props.user_token,
  //       props.swp_profile_cv_search_id
  //     );
  //     setSelectedInvite([]);
  //     setUserData(result.data);
  //     props.setIsSWPProfileLoading(false);
  //     setReloadSwpProfile(false);
  //     //   inputCheckbox.current.checked = false;
  //   }
  //   setViewDetails(false);
  //   setPopoverOpen(false);
  //   setInviteLimitError(false);
  //   setDropdownOpen(false);
  // }, [
  //   props.swp_profile_cv_search_id,
  //   props.show_cv_search_profile,
  //   reloadSwpProfile,
  // ]);

  useEffect(() => {
    async function fetchProfile() {
      if (props.swp_profile_cv_search_id) {
        const result = await props.fetchUserSWPProfileAgainstCVSearch(
          props.user_token,
          props.swp_profile_cv_search_id
        );
        setSelectedInvite([]);
        setUserData(result.data);
        props.setIsSWPProfileLoading(false);
        setReloadSwpProfile(false);
        // inputCheckbox.current.checked = false;
      }
      setViewDetails(false);
      setPopoverOpen(false);
      setInviteLimitError(false);
      setDropdownOpen(false);
    }

    fetchProfile();
  }, [
    props.swp_profile_cv_search_id,
    props.show_cv_search_profile,
    reloadSwpProfile,
  ]);

  const intiateChat = () => {
    setDisableChatInit(true);
    socket.emit("checkGroupExist", {
      user: {
        id: userData.jobseeker.id,
        type: "JOBSEEKER",
      },
    });
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
            id: userData.jobseeker.id,
            firstname: userData.jobseeker.first_name,
            lastname:
              userData.jobseeker.middle_name &&
              userData.jobseeker.middle_name != ""
                ? `${userData.jobseeker.middle_name} ${userData.jobseeker.last_name}`
                : userData.jobseeker.last_name,
            picture: userData.jobseeker.profile_picture,
            email: userData.jobseeker.email_address,
            phone: userData.jobseeker.mobile_number,
            type: "JOBSEEKER",
          },
        ],
        applications: {
          job_id: "000",
          employer_id: props.employers_user_id,
          title: `Chatting with ${props.company_name}`,
          location: `CV-Search`,
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
          job_id: "000",
          employer_id: props.employers_user_id,
          title: `Chatting with ${props.company_name}`,
          location: `CV-Search`,
        },
      },
      type: "joinGroup",
    });
  };

  useEffect(() => {
    if (!_.isEmpty(socket) && props.show_cv_search_profile) {
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
  }, [userData]);

  const closeProfileHandler = () => {
    setUserData(null);
    props.setShowCVSearchProfileStatus(false);
    props.setSwpProfileId(null);
    setSelectedInvite([]);
    props.setIsSWPProfileLoading(false);
    setViewDetails(false);
    setPopoverOpen(false);
    setInviteLimitError(false);
    setDropdownOpen(false);
    setShowDownloadSpinner(false);
    setShowVideo(false);
    setInviteLoader(false);
    setDisableChatInit(false);
  };

  const showDetail = () => {
    setViewDetails((prev) => !prev);
    props.countViewContactDetailGeckoBoard(
      props.user_token,
      userData.jobseeker.id
    );
  };

  const downloadProfileCV = () => {
    setShowDownloadSpinner(true);
    props
      .downloadUserSWPProfileCV(
        props.user_token,
        userData.jobseeker.slug,
        userData.jobseeker.fullname
      )
      .then((res) => {
        setShowDownloadSpinner(false);
      });
  };

  const handlesetInvitelist = (e) => {
    e.target.checked
      ? setSelectedInvite((prev) => [
          ...prev,
          {
            id: e.target.value,
            isChecked: e.target.checked,
          },
        ])
      : setSelectedInvite((prev) =>
          prev.filter((value) => (value.id == e.target.value ? false : true))
        );
  };
  const submitInvite = async () => {
    if (selectedInvite.length > 0) {
      if (selectedInvite.length <= 5) {
        setInviteLoader(true);
        await props.inviteJobsInCvSearch(
          props.user_token,
          userData.jobseeker.id,
          selectedInvite.map((items) => items.id)
        );
        setSelectedInvite([]);
        props.setSwpProfileId("");
        props.setSwpProfileId(userData.jobseeker.id);
        setInviteLoader(false);
      } else {
        setInviteLimitError(true);
      }
    }
  };
  const handleClose = () => setShowVideo(false);
  const handleShow = () => setShowVideo(true);

  const toggleDropdown = () => {
    setDropdownOpen((pre) => !pre);
  };

  if (!userData) {
    return (
      <div
        className={`${styles.previewProfile_content_wrap} ${
          props.show_cv_search_profile ? `${styles.show}` : "hide"
        }`}
      >
        <div
          className={`${styles.previewProfile_content} ${
            props.show_cv_search_profile ? `${styles.show}` : "hide"
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
    // props.showProfile
    <div
      className={`${styles.previewProfile_content_wrap} ${
        props.show_cv_search_profile ? `${styles.show}` : "hide"
      }`}
    >
      <div
        className={`${styles.previewProfile_content} ${
          props.show_cv_search_profile ? `${styles.show}` : "hide"
        }`}
      >
        {/*  */}
        {props.is_swp_profile_loading ? (
          <div
            className={`${styles.profile_loader} text-center d-flex align-items-center justify-content-center`}
          >
            <Spinner animation="border" role="status">
              {" "}
            </Spinner>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between position-absolute w-100">
              {props.tagDisplay && (
                <Tagging
                  jobSeekerId={userData.jobseeker.id}
                  tags={userData.jobseeker.tags}
                  setReloadSwpProfile={setReloadSwpProfile}
                />
              )}

              <span
                className={`${styles.close_preview}`}
                onClick={closeProfileHandler}
              >
                <img src={process.env.APP_URL + "/images/x-circle.svg"} />
              </span>
            </div>

            <div className={`${styles.profile_header} text-center pt-3`}>
              <div
                className={`${styles.profile_img} rounded-circle mx-auto`}
                onClick={() => setReloadSwpProfile(true)}
              >
                <img
                  src={userData.jobseeker.profile_picture}
                  className="img-fluid"
                />
                {userData.jobseeker.is_enhanced_profile == 1 ? (
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
              {userData.jobseeker.is_enhanced_profile == "1" && (
                <span className="text-black-50 fw-bold mt-3 d-block">
                  Enhanced profile
                </span>
              )}
              <h4 className="d-block mb-0">{userData.jobseeker.fullname}</h4>
              <div
                className={`${styles.location} d-flex align-items-center justify-content-center`}
              >
                <img src={`${process.env.APP_URL}/images/map-pin-1.svg`} />
                <span className="ml-1">{` ${userData.jobseeker.postcode}, ${userData.jobseeker.city}`}</span>
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
                    href={`tel:${userData.jobseeker.mobile_number}`}
                    className=""
                    style={{ transform: "translateY(2px)" }}
                  >
                    {userData.jobseeker.mobile_number}
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
                    href={`mailto:${userData.jobseeker.email_address}`}
                    className=""
                    style={{ marginTop: "1px" }}
                  >
                    {userData.jobseeker.email_address}
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
              {userData.jobseeker.license?.length > 0 ? (
                <ul className="pl-0 mb-0 mt-3">
                  {userData.jobseeker.license.map((license, i) => {
                    return (
                      <li className="d-flex my-1">
                        <i>
                          <img
                            src={
                              process.env.APP_URL + "/images/license-icn.svg"
                            }
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
              {(userData.jobseeker?.experience_answer == "1" ||
                userData.jobseeker?.driving_answer == "1") && (
                <div className={`d-flex ${styles.gab_between} mb-3 flex-wrap`}>
                  {userData.jobseeker?.driving_answer == "1" && (
                    <div className={`${styles.badge_icon_for_profile}`}>
                      <img
                        src={process.env.APP_URL + "/images/check_plain.svg"}
                      />
                      <span className="fw-medium">Driving Licence</span>
                    </div>
                  )}
                  {userData.jobseeker?.experience_answer == "1" && (
                    <div className={`${styles.badge_icon_for_profile}`}>
                      <img
                        src={process.env.APP_URL + "/images/check_plain.svg"}
                      />
                      <span className="fw-medium">
                        Military/Police Experience
                      </span>
                    </div>
                  )}
                </div>
              )}
              {props.chatButton && (
                <div className="d-block">
                  <button
                    disable={disableChatInit}
                    className="btn btn-md btn-green cursor-pointer  d-block d-md-flex align-items-center my-2 py-2 px-4 w-100 d-flex justify-content-center"
                    onClick={intiateChat}
                  >
                    <i>
                      <img
                        src={`${process.env.APP_URL}/images/chat.svg`}
                        width={"18"}
                        height={"19"}
                      />
                    </i>
                    <span className="pl-2">Chat</span>
                  </button>
                </div>
              )}
              <div
                className={`${styles.profile_btn} d-flex justify-content-between mt-3 flex-wrap`}
              >
                {!userData.jobseeker.profile_video ? (
                  <OverlayTrigger
                    overlay={
                      <Tooltip id="tooltip-disabled">
                        No video available
                      </Tooltip>
                    }
                  >
                    <button
                      className="btn btn-green btn-md py-2 px-4 d-flex align-items-center-center justify-content-center w-50 disabled"
                      //disabled={true}
                      rootCloseEvent={(e) => !e}
                    >
                      <i>
                        <img src={`${process.env.APP_URL}/images/Play.svg`} />
                      </i>
                      <span className="ml-2">Play Video</span>
                    </button>
                  </OverlayTrigger>
                ) : (
                  <button
                    onClick={handleShow}
                    className="btn btn-green btn-md py-2 px-4 d-flex align-items-center-center justify-content-center "
                    rootCloseEvent={(e) => !e}
                  >
                    <i>
                      <img src={`${process.env.APP_URL}/images/Play.svg`} />
                    </i>
                    <span className="ml-2">Play Video</span>
                  </button>
                )}

                <Dropdown
                  isOpen={dropdownOpen}
                  toggle={toggleDropdown}
                  className={`${styles.invite_dropdown} ${
                    dropdownOpen && styles.active
                  } `}
                >
                  <DropdownToggle
                    caret
                    className={`${styles.invite_btn} btn btn-gray border-dark btn-md py-2 px-4 d-flex align-items-center-center justify-content-center`}
                  >
                    Invite to apply
                  </DropdownToggle>
                  <DropdownMenu className={`${styles.invite_list}`}>
                    {userData.jobseeker.available_jobs.length > 0 ? (
                      <>
                        <p className="fs-7 mb-0 mt-1">
                          Please select job(s) to invite this candidate to:
                        </p>
                        <ul className="pl-0 mb-0 mt-2">
                          {userData.jobseeker.available_jobs.map(
                            (job, index) => {
                              return (
                                <li>
                                  <div className="gl-checkbox form-group mb-0">
                                    <label className="form-check-label ">
                                      <input
                                        name={job.id}
                                        type="checkbox"
                                        class="form-check-input"
                                        value={job.id}
                                        onChange={handlesetInvitelist}
                                        // ref={inputCheckbox}

                                        checked={selectedInvite.find((x) => {
                                          if (x.id == job.id) {
                                            return true;
                                          }
                                          return false;
                                        })}
                                      />
                                      <span>{job.name}</span>
                                      <span class="checkmark"></span>
                                    </label>
                                  </div>
                                </li>
                              );
                            }
                          )}
                        </ul>
                        {inviteLimitError && (
                          <span className="text-danger mt-1 d-block">
                            You can only invite up to 5 jobs.
                          </span>
                        )}
                        <div
                          className={`${styles.invite_act_btn} text-center d-flex justify-content-between mb-1 mt-3`}
                        >
                          <button
                            className="btn btn-md btn-transparent py-2 px-4 fw-medium"
                            onClick={toggleDropdown}
                          >
                            Cancel
                          </button>
                          <button
                            className={`btn btn-md btn-green py-2 px-4  fw-medium d-inline-flex ${
                              !selectedInvite.length > 0 && "disabled"
                            } ${inviteLoader && "disabled"}`}
                            onClick={submitInvite}
                          >
                            <span className="fw-bold">Send invite</span>
                            {inviteLoader && (
                              <span className="ml-1">
                                {" "}
                                <Spinner
                                  animation="border"
                                  size="sm"
                                  role="status"
                                >
                                  {" "}
                                </Spinner>
                              </span>
                            )}
                          </button>
                        </div>
                      </>
                    ) : (
                      <ul className="pl-0 mb-0 mt-0">
                        <li className="border-bottom-0 text-center fw-bold">
                          No Jobs available
                        </li>
                      </ul>
                    )}
                  </DropdownMenu>
                </Dropdown>
                <button
                  onClick={downloadProfileCV}
                  className={`btn btn-outline-dark btn-md w-100 py-2 px-4 d-flex align-items-center-center justify-content-center mt-3 ${styles.download_btn}`}
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
                      <Spinner animation="border" size={"sm"} />
                    </span>
                  )}
                </button>
              </div>
            </div>
            {/* Play Video Modal */}
            {userData.jobseeker.profile_video ? (
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
                      url={userData.jobseeker.profile_video}
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
                          src={process.env.APP_URL + "/images/play-new.svg"}
                        />
                      }
                      light={userData.jobseeker.thumbnail_image}
                      controls={"true"}
                    />
                  </div>
                </Modal.Body>
              </Modal>
            ) : null}
            {/* {userData.jobseeker.profile_video}  todo add profile video on btn click */}
            {userData.jobseeker.has_screened == 1 ? (
              <div className={`${styles.prescreen_row} mt-4 bg-black`}>
                {/* <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                >
                  <g
                    stroke="#FFF"
                    fill="none"
                    fill-rule="evenodd"
                    stroke-linecap="square"
                  >
                    <path d="M7 3h8M7 9h8M7 14h8M1 1h3v3H1zM1 13h3v3H1zM1 7l3 3M4 7l-3 3" />
                  </g>
                </svg>
              </span> */}
                <span className="d-flex fw-bold fs-6 ml-0 mb-2">
                  <span className="text-white">Screening ready</span>
                  <span className="translate-x-minus-1 ml-2">
                    <img
                      src={`${process.env.APP_URL}/images/screen_icon.svg`}
                    />
                  </span>
                </span>
                <div>
                  <ul className="d-flex flex-wrap p-0 text-white">
                    {userData?.jobseeker.screening_questions?.map(
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
                {/* <i className="ml-auto">
                <Image
                  src={`/images/chevron-right-white.svg`}
                  width={"24"}
                  height={"24"}
                ></Image>
              </i> */}
                {/* <Popover
                className={styles.preScreen_ready_container}
                placement="top"
                isOpen={popoverOpen}
                target="Popover1"
                toggle={() => {
                  setPopoverOpen(!popoverOpen);
                }}
                >
                <PopoverBody className={styles.preScreen_ready_body}>
                  <div>
                    <span
                      className={styles.close}
                      onClick={() => {
                        setPopoverOpen(!popoverOpen);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 13 13"
                      >
                        <g
                          transform="translate(1 1)"
                          stroke="#3BD55A"
                          fill="none"
                          fill-rule="evenodd"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <circle cx="5.5" cy="5.5" r="5.5" />
                          <path d="m3.5 3.5 4 4M7.5 3.5l-4 4" />
                        </g>
                      </svg>
                    </span>
                    <p>The candidate stated the following:</p>
                    <ul>
                      {userData?.jobseeker.screening_questions?.map(
                        (question, indx) => {
                          return (
                            <li
                              className={
                                question.answer == "Yes"
                                  ? styles.verified
                                  : styles.Notverified
                              }
                            >
                              <img
                                src={`${process.env.APP_URL}/images/${
                                  question.answer == "Yes"
                                    ? imgYesForSWPProfile[indx]
                                    : imgNoForSWPProfile[indx]
                                }`}
                              />

                              {question.answer == "Yes"
                                ? arrYesForSWPProfile[indx]
                                : arrNoForSWPProfile[indx]}
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </div>
                </PopoverBody>
              </Popover> */}
              </div>
            ) : null}
            {userData?.jobseeker.skill_badges?.length > 0 &&
              userData?.jobseeker.skill_badges?.find(
                (skill) => skill.is_completed == 1
              ) && (
                <div className="px-4 py-2">
                  <h2>Badges earned</h2>
                  <SimpleBar
                    style={{
                      maxWidth: "100%",
                    }}
                  >
                    <div className={`${styles.badge_container}`}>
                      {userData?.jobseeker.skill_badges?.map((skill) => {
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
                  {userData.jobseeker.work_history?.length > 0
                    ? userData.jobseeker.work_history.map((experience) => {
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
                  {userData.jobseeker.education_history?.length > 0
                    ? userData.jobseeker.education_history.map((education) => {
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
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  show_cv_search_profile: state.vantage.cvSearchReducer.showCVSearchProfile,
  swp_profile_cv_search_id: state.vantage.cvSearchReducer.swpProfileId,
  is_swp_profile_loading: state.vantage.cvSearchReducer.isSWPProfileLoading,

  employers_user_id: state.vantage.userDataReducer.user_id,

  decision_maker_first_name:
    state.vantage.userDataReducer.decision_maker_first_name,
  decision_maker_last_name:
    state.vantage.userDataReducer.decision_maker_last_name,
  employers_email: state.vantage.userDataReducer.user_email,
  company_name: state.vantage.userDataReducer.user_name,

  organisationFilters: state.vantage.organisationReducer.filter,

  currentPage: state.vantage.chatReducer.currentPage,
  isSkip: state.vantage.chatReducer.isSkip,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserSWPProfileAgainstCVSearch: (userToken, jobSeekerId) =>
    dispatch(fetchUserSWPProfileAgainstCVSearch(userToken, jobSeekerId)),
  fetchEmployerJobList: (userToken, employerID) =>
    dispatch(fetchEmployerJobList(userToken, employerID)),
  countViewContactDetailGeckoBoard: (userToken, applicantId) =>
    dispatch(countViewContactDetailGeckoBoard(userToken, applicantId)),
  downloadUserSWPProfileCV: (userToken, slug, fullName) =>
    dispatch(downloadUserSWPProfileCV(userToken, slug, fullName)),
  setShowCVSearchProfileStatus: (status) =>
    dispatch(setShowCVSearchProfileStatus(status)),
  setSwpProfileId: (jobSeekerId) => dispatch(setSwpProfileId(jobSeekerId)),
  inviteJobsInCvSearch: (userToken, jobseekerId, jobIds) =>
    dispatch(inviteJobsInCvSearch(userToken, jobseekerId, jobIds)),
  setIsSWPProfileLoading: (status) => dispatch(setIsSWPProfileLoading(status)),
  //chat
  setHasDoneChatBeforeForChat: (status) =>
    dispatch(setHasDoneChatBeforeForChat(status)),
  setGroupIDForChat: (groupID) => dispatch(setGroupIDForChat(groupID)),
  setGlobalChannelOne: (globalChannelOne) =>
    dispatch(setGlobalChannelOne(globalChannelOne)),
  setShowChannelForChat: (status) => dispatch(setShowChannelForChat(status)),
  setIsUserComingFromStaffingForChat: (status) =>
    dispatch(setIsUserComingFromStaffingForChat(status)),
  setShowChannelAndHideChannelListOnMobile: (status) =>
    dispatch(setShowChannelAndHideChannelListOnMobile(status)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwpPrpfileForCvSearch);
