import React, { useState, useEffect, useMemo, useCallback } from "react";
import { isMobile } from "react-device-detect";
import Link from "next/link";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { updateIsNavbarOpenAction } from "../../redux/actions/main";
import {
  updateIsModelOpenAction,
  updateIsModelLinkAction,
} from "../../redux/actions/main";
import {
  setDiscardLinkForModalJobPost,
  setDiscardModalForJobPost,
} from "../../redux/actions/jobPostAction";
import { setDiscardModalForShiftPost } from "../../redux/actions/shiftActions";
import {
  setShowChannelForChat,
  setHasDoneChatBeforeForChat,
  setGroupIDForChat,
  setShowChannelAndHideChannelListOnMobile,
  setIsCurrentPage,
} from "../../redux/actions/chatAction";
const isBrowser = () => typeof window !== "undefined";
import Cookies from "universal-cookie";
import { socket } from "../../lib/SocketProvider";
import _ from "lodash";
import { toast } from "react-toastify";
import { useIntercom } from "react-use-intercom";
import PaymentUpdate from "./PaymentUpdate";

function LeftNav(props) {
  const cookies = new Cookies();

  const { show } = useIntercom();
  const router = useRouter();

  // const [dropdownOpen, setDropdownOpen] = useState(false);
  const [checkMobile, SetCheckMobile] = useState();
  const [unreadCount, setUnreadCount] = useState(null);
  // const [menySidenavStatus, SetmenySidenavStatus] = useState(props.is_navbar_open);
  // const toggle = () => setDropdownOpen(!dropdownOpen);
  // const [bookingStep, setBookingStep] = useState(1);
  const [withExpandClass, setWithExpandClass] = useState(
    props.isNavBarOpenCookie == "true"
      ? "menu-sidenav expanded"
      : "menu-sidenav"
  );

  useEffect(() => {
    if (isMobile) {
      SetCheckMobile(true);
    } else {
      SetCheckMobile(false);
    }
  }, []);

  //for check if shiftposting field is empty or not
  const isAnyFieldNotEmpty = props.shiftPostingArray.some((shiftObject) => {
    const conditionResult =
      shiftObject.date_start !== "" ||
      shiftObject.paid_break !== "" ||
      shiftObject.time_end !== "" ||
      shiftObject.time_start !== "";

    return conditionResult;
  });

  const LinkCLickHandler = (value) => {
    if (checkMobile) {
      props.updateIsNavbarOpenAction(false).then((resp0) => {});
      cookies.set("isNavBarOpenCookie", false, { path: "/" });
    } else {
      props.updateIsNavbarOpenAction(true).then((resp0) => {});
      cookies.set("isNavBarOpenCookie", true, { path: "/" });
    }
    // props.updateIsNavbarOpenAction(false).then((resp0) => {})
    if (
      props.booking_active_step != 5 &&
      props.course_id != 0 &&
      router.pathname.includes("/booking/")
    ) {
      props.updateIsModelOpenAction(true).then((resp0) => {});
      props.updateIsModelLinkAction("/" + value).then((resp0) => {});
    } else if (
      (props.jobpost_active_step > 1 ||
        props.job_post_job_title != "" ||
        props.job_post_job_description != "" ||
        props.job_post_is_license_required != "" ||
        props.job_post_contract_type != "" ||
        props.job_post_type_of_employment != "") &&
      (router.pathname === "/staffing" || router.pathname === "/jobpost")
    ) {
      props.setDiscardModalForJobPost(true);
      props.setDiscardLinkForModalJobPost("/" + value);
    } else if (
      (props.selectedVenue !== "" ||
        !_.isEmpty(props.selectedSite) ||
        !_.isEmpty(props.selectedRole) ||
        isAnyFieldNotEmpty) &&
      router.pathname == "/shifts/post"
    ) {
      props.setDiscardModalForShiftPost(true);
    } else {
      router.push("/" + value);
      props.resetShiftPostingReducer();
    }

    props.setIsCurrentPage(1);
  };

  // React.useEffect(() => {
  //     setBookingStep(props.booking_active_step)
  // }, [props.booking_active_step])

  useEffect(() => {
    if (!props.is_navbar_open) {
      setWithExpandClass("menu-sidenav");
    } else {
      setWithExpandClass("menu-sidenav expanded");
    }
    // SetmenySidenavStatus(props.is_navbar_open)
  }, [props.is_navbar_open]);

  const showChat = () => {
    show();
    // Intercom('show');
    // $crisp.push(["do", "chat:toggle"])
  };

  return (
    <>
      <aside className={withExpandClass}>
        <div className="sidenav-container">
          <div
            className={`scrollable ${
              props.is_navbar_open && props.isPaymentFailed && "overflow-y"
            }`}
          >
            <ul className="main-sidenav mb-3">
              <li id="dashboardTab">
                <a
                  className={router.pathname == "/dashboard" ? "active" : ""}
                  onClick={() => LinkCLickHandler("dashboard")}
                >
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                    >
                      <g fill="none" fillRule="evenodd" strokeLinecap="square">
                        <g stroke="#F9F9FC" strokeWidth="1.5">
                          <g>
                            <path d="M22 13L14 6 6 13M8 14L8 21 12.364 21 12.364 17 15.636 17 15.636 21 20 21 20 14" />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </i>
                  <span>Dashboard</span>
                </a>
              </li>
              <li id="trainingTab">
                <a
                  className={
                    [
                      "/all-courses",
                      "/upcoming-course",
                      "/past-course",
                      "/booking/step-1",
                      "/booking/step-2",
                      "/booking/step-3",
                      "/booking/step-4",
                    ].includes(router.pathname)
                      ? "active"
                      : ""
                  }
                  onClick={() => LinkCLickHandler("all-courses")}
                >
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                    >
                      <g fill="none" fillRule="evenodd">
                        <g stroke="#F9F9FC" strokeWidth="1.5">
                          <path strokeLinecap="square" d="M11.5 21L11.5 11" />
                          <circle
                            cx="9.5"
                            cy="7.5"
                            r="1.5"
                            strokeLinecap="square"
                          />
                          <path
                            strokeLinecap="square"
                            d="M7 21v-8.667C7 11.597 7.576 11 8.286 11H16"
                          />
                          <path
                            strokeLinecap="square"
                            d="M14 8L22 8 22 16 14.615 16"
                          />
                          <path d="M18 16L20 21" />
                        </g>
                      </g>
                    </svg>
                  </i>
                  <span>Training</span>
                </a>
              </li>
              <li id="staffingTab">
                <a
                  className={router.pathname == "/staffing" ? "active" : ""}
                  onClick={() => LinkCLickHandler("staffing")}
                >
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                    >
                      <g fill="none" fillRule="evenodd">
                        <g stroke="#FFF" strokeWidth="1.5">
                          <g>
                            <path d="M17.2 16.333h3.733v-2.516c0-.437-.211-.843-.558-1.068l-1.665-1.082M14.4 8.283C14.685 7.53 15.383 7 16.198 7h0c1.069 0 1.935.914 1.935 2.042v.583c0 1.128-.866 2.042-1.935 2.042h0c-.302 0-.574-.07-.83-.201M9.949 15.4l-3.065 1.674c-.548.3-.884.84-.884 1.424V21h12.133v-2.502c0-.583-.335-1.124-.883-1.424L14.185 15.4" />
                            <path
                              strokeLinecap="square"
                              d="M12.067 16.333h0c-1.804 0-3.267-1.567-3.267-3.5v-1.4c0-1.932 1.463-3.5 3.267-3.5h0c1.804 0 3.266 1.568 3.266 3.5v1.4c0 1.933-1.462 3.5-3.266 3.5z"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </i>
                  <span>Staffing</span>
                </a>
              </li>
              <li id="shiftsTab">
                <a
                  className={
                    router.pathname.includes("/shifts") ? "active" : ""
                  }
                  onClick={() => LinkCLickHandler("shifts")}
                >
                  <i>
                    <svg
                      width="28"
                      height="29"
                      viewBox="0 0 28 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_6024_12719)">
                        <path
                          d="M7 11H22"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M22 11V9.5C22 8.672 21.328 8 20.5 8H8.5C7.672 8 7 8.672 7 9.5V19.5C7 20.328 7.672 21 8.5 21H13"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11 6V8"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M18 6V8"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M18 21C20.2091 21 22 19.2091 22 17C22 14.7909 20.2091 13 18 13C15.7909 13 14 14.7909 14 17C14 19.2091 15.7909 21 18 21Z"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M18 15V17H20"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_6024_12719">
                          <rect
                            width="28"
                            height="28"
                            fill="white"
                            transform="translate(0 0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </i>
                  <span>Shifts</span>
                </a>
              </li>
              <li id="cvSearchTab">
                <a
                  className={router.pathname == "/cv-search" ? "active" : ""}
                  onClick={() => LinkCLickHandler("cv-search")}
                >
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      viewBox="0 0 28 28"
                    >
                      <g fill="none" fill-rule="evenodd">
                        <path
                          d="M6 4.571V23.43c0 .315.256.571.571.571H21.43a.571.571 0 0 0 .571-.571V4.57A.571.571 0 0 0 21.429 4H6.57A.571.571 0 0 0 6 4.571zm1.143.572h13.714v17.714H7.143V5.143z"
                          fill="#F9F9FC"
                          fill-rule="nonzero"
                        />
                        <path
                          d="M11.934 11.485c.62 0 1.216-.264 1.635-.725a.551.551 0 0 0 .126-.554.578.578 0 0 0-.979-.191c-.205.226-.483.351-.782.351-.594 0-1.077-.502-1.077-1.12 0-.617.483-1.119 1.077-1.119.299 0 .576.125.782.351a.58.58 0 0 0 .802.04.552.552 0 0 0 .051-.785 2.217 2.217 0 0 0-1.635-.725 2.232 2.232 0 0 0-2.22 2.239c0 1.234.996 2.238 2.22 2.238zm3.824-.344a.572.572 0 0 0 .528.344c.23 0 .438-.136.527-.344l1.429-3.358a.55.55 0 0 0-.069-.56.577.577 0 0 0-.986.13l-.901 2.117-.901-2.118a.577.577 0 0 0-.987-.13.55.55 0 0 0-.068.56l1.428 3.359zm3.67 2.583H8.572a.566.566 0 0 0-.571.56c0 .309.256.56.571.56H19.43c.315 0 .571-.251.571-.56 0-.31-.256-.56-.571-.56zm0 3.078H8.572a.566.566 0 0 0-.571.56c0 .31.256.56.571.56H19.43c.315 0 .571-.25.571-.56 0-.31-.256-.56-.571-.56zm0 3.079H8.572a.566.566 0 0 0-.571.56c0 .308.256.559.571.559H19.43c.315 0 .571-.25.571-.56 0-.309-.256-.56-.571-.56z"
                          fill="#F9F9FC"
                          fill-rule="nonzero"
                        />
                        <path d="M0 0h28v28H0z" />
                      </g>
                    </svg>
                  </i>
                  <span>CV Search</span>
                </a>
              </li>
              <li id="chatTab">
                <a
                  className={router.pathname == "/chat" ? "active" : ""}
                  onClick={() => {
                    LinkCLickHandler("chat");
                    props.setShowChannelForChat(false);
                    props.setHasDoneChatBeforeForChat(false);
                    props.setGroupIDForChat(null);
                    props.setShowChannelAndHideChannelListOnMobile(false);
                  }}
                >
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                    >
                      <path
                        d="M7 8h14.147v9.75h-6.43L10.215 21v-3.25H7z"
                        stroke="#F9F9FC"
                        stroke-width="1.5"
                        fill="none"
                        fill-rule="evenodd"
                        stroke-linecap="square"
                      />
                    </svg>
                  </i>
                  <span>Chat</span>
                  {props.unread_message_count &&
                  props.unread_message_count != 0 ? (
                    props.unread_message_count < 9 ? (
                      <span className="badge  rounded-circle d-flex align-items-center justify-content-center">
                        {" "}
                        <span className="text-dark">
                          {props.unread_message_count}
                        </span>{" "}
                      </span>
                    ) : (
                      <span className="badge  rounded-circle d-flex align-items-center justify-content-center">
                        <span className="text-dark">9+</span>
                      </span>
                    )
                  ) : null}
                </a>
              </li>
              {/* <li>
                                <a className={router.pathname == "/quotes" ? "active" : ""} onClick={() => LinkCLickHandler('quotes')}>
                                    <i>
                                        <svg width="28" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z" fill="white" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5.73223C6 4.22311 7.11914 3 8.49998 3C9.09221 3 9.56342 3.13037 9.96875 3.42337C10.3602 3.70633 10.647 4.11159 10.9196 4.55804C11.0661 4.79799 11.0069 5.12231 10.7873 5.28242C10.5677 5.44253 10.271 5.37781 10.1245 5.13786C9.86611 4.71466 9.66616 4.4571 9.44144 4.29465C9.23062 4.14225 8.95628 4.04463 8.49998 4.04463C7.64703 4.04463 6.95583 4.80004 6.95583 5.73223V11.4777C6.95583 11.7662 6.74186 12 6.47792 12C6.21397 12 6 11.7662 6 11.4777V5.73223Z" fill="white" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 11.5C4.5 11.2239 4.72386 11 5 11H10.5C10.7761 11 11 11.2239 11 11.5C11 11.7761 10.7761 12 10.5 12H5C4.72386 12 4.5 11.7761 4.5 11.5Z" fill="white" />
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 8C4.5 7.72386 4.72386 7.5 5 7.5H8.5C8.77614 7.5 9 7.72386 9 8C9 8.27614 8.77614 8.5 8.5 8.5H5C4.72386 8.5 4.5 8.27614 4.5 8Z" fill="white" />
                                        </svg>

                                    </i>
                                    <span>Quote Requests</span>
                                    <div className='badge new_badge fs-7 inline-block px-4 text-dark'>NEW</div>
                                </a>
                            </li> */}
              {/* <li>
                            <a href="#">
                                <i>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
                                        <g fill="none" fillRule="evenodd" strokeLinecap="square">
                                            <g stroke="#F9F9FC">
                                                <path strokeWidth="1.3" d="M8 6L21 6 21 22 18.292 20.897 16.667 22 14.5 20.897 12.333 22 10.708 20.897 8 22z" />
                                                <path strokeWidth="1.1" d="M10 17.5L14 17.5M17 17.5L18 17.5M10 15.5L14 15.5M17 15.5L18 15.5" />
                                                <circle cx="14.5" cy="10.5" r="2.5" strokeWidth="1.1" />
                                            </g>
                                        </g>
                                    </svg>
                                </i>
                                <span>Billing</span>
                            </a>
                        </li> */}
              <li>
                <a
                  className={router.pathname == "/vetting" ? "active" : ""}
                  onClick={() => LinkCLickHandler("vetting")}
                >
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                    >
                      <g fill="none" fillRule="evenodd" strokeLinecap="square">
                        <g stroke="#F9F9FC" strokeWidth="1.5">
                          <g>
                            <path d="M20 14.828C20 19.793 13.5 22 13.5 22S7 19.793 7 14.828V7.655L13.5 6 20 7.655v7.173z" />
                            <path d="M11 13.857L13 16 17 11" />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </i>
                  <span>Vetting</span>
                </a>
              </li>
              <li id="accountSettingTab">
                <a
                  className={
                    router.pathname == "/account-settings" ? "active" : ""
                  }
                  onClick={() => LinkCLickHandler("account-settings")}
                >
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                    >
                      <g fill="none" fillRule="evenodd" strokeLinecap="square">
                        <g stroke="#F9F9FC">
                          <circle cx="14" cy="14" r="2" strokeWidth="1.3" />
                          <path
                            strokeWidth="1.2"
                            d="M22 15.067v-2.134l-2.297-.287c-.144-.608-.385-1.189-.714-1.72l1.422-1.828-1.509-1.51-1.827 1.423c-.532-.33-1.113-.57-1.721-.714L15.067 6h-2.134l-.287 2.297c-.608.144-1.189.385-1.72.714L9.097 7.589l-1.51 1.509 1.423 1.827c-.33.532-.57 1.113-.714 1.721L6 12.933v2.134l2.297.287c.144.608.385 1.189.714 1.72l-1.422 1.828 1.509 1.51 1.827-1.423c.532.33 1.113.57 1.721.714L12.933 22h2.134l.287-2.297c.608-.144 1.189-.385 1.72-.714l1.828 1.422 1.51-1.509-1.423-1.827c.33-.532.57-1.113.714-1.721L22 15.067z"
                          />
                        </g>
                      </g>
                    </svg>
                  </i>
                  <span>Account Settings</span>
                  {/* <div className="badge new_badge fs-7 inline-block px-4 text-dark">
                    NEW
                  </div> */}
                </a>
              </li>
            </ul>

            {props.is_navbar_open && props.isPaymentFailed && <PaymentUpdate />}

            <ul
              className={`bottom-sidenav ${
                props.is_navbar_open && props.isPaymentFailed && "mt-4"
              }`}
            >
              {/* <li>
                            <a href="#">
                                <i>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
                                        <g fill="none" fillRule="evenodd">
                                            <g fill="#F9F9FC" fillRule="nonzero">
                                                <g>
                                                    <g transform="translate(-19.000000, -881.000000) translate(0.000000, -1.000000) translate(19.000000, 882.000000)">
                                                        <path d="M13.001 10H15.001V14H13.001z" />
                                                        <circle cx="14.001" cy="16" r="1" />
                                                        <path stroke="#242429" strokeWidth=".8" d="M21 23c-.216 0-.427-.07-.6-.2L16.667 20H7c-.552 0-1-.448-1-1V8c0-.552.448-1 1-1h14c.552 0 1 .448 1 1v14c0 .552-.448 1-1 1zM8 18h9c.216 0 .427.07.6.2L20 20V9H8v9z" />
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </i>
                                <span>Feedback</span>
                            </a>
                        </li> */}
              <li>
                <a onClick={() => showChat()}>
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                    >
                      <g fill="none" fillRule="evenodd">
                        <g>
                          <path
                            fill="#F9F9FC"
                            fillRule="nonzero"
                            d="M13.5 9.737c.517 0 1.027.09 1.5.263V6.119c-.991-.159-2.009-.159-3 0V10c.473-.173.983-.263 1.5-.263zM17.263 13.5c0 .517-.09 1.027-.263 1.5h3.882c.157-.991.157-2.009 0-3H17c.173.473.262.983.263 1.5zM13.5 17.263c-.517 0-1.027-.09-1.5-.263v3.882c.991.157 2.009.157 3 0V17c-.473.173-.983.262-1.5.263zM9.737 13.5c0-.517.09-1.027.263-1.5H6.119c-.159.991-.159 2.009 0 3H10c-.173-.473-.263-.983-.263-1.5z"
                          />
                          <circle
                            cx="13.5"
                            cy="13.5"
                            r="7.5"
                            stroke="#F9F9FC"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          />
                          <circle
                            cx="13.5"
                            cy="13.5"
                            r="3.5"
                            stroke="#F9F9FC"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                      </g>
                    </svg>
                  </i>
                  <span>Get help</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}

const mapStateToProps = (state) => ({
  is_navbar_open: state.vantage.commonReducer.is_navbar_open,
  booking_active_step: state.vantage.bookingReducer.booking_active_step,
  course_id: state.vantage.bookingReducer.course_id,

  job_post_job_title: state.vantage.jobPostReducer.jobTitle,
  job_post_job_description: state.vantage.jobPostReducer.editor,
  job_post_is_license_required: state.vantage.jobPostReducer.radio,
  job_post_contract_type: state.vantage.jobPostReducer.contract,
  job_post_type_of_employment: state.vantage.jobPostReducer.typeOfEmployment,

  employers_user_id: state.vantage.userDataReducer.user_id,

  unread_message_count: state.vantage.chatReducer.unReadMessageCount,
  is_cv_search_avalible: state.vantage.userDataReducer.is_cv_search_avalible,

  isPaymentFailed: state.vantage.billingReducer.isPaymentFailed,

  //shiftPosting
  postShiftActiveSteps: state.vantage.shiftReducer.postShiftActiveSteps,
  shiftPostingArray: state.vantage.shiftReducer.shiftPostingArray,
  selectedVenue: state.vantage.shiftReducer.selectedVenue,
  selectedSite: state.vantage.shiftReducer.selectedSite,
  selectedRole: state.vantage.shiftReducer.selectedRole,
});

const mapDispatchToProps = (dispatch) => ({
  updateIsNavbarOpenAction: (value) =>
    dispatch(updateIsNavbarOpenAction(value)),
  updateIsModelOpenAction: (value) => dispatch(updateIsModelOpenAction(value)),
  updateIsModelLinkAction: (value) => dispatch(updateIsModelLinkAction(value)),
  setDiscardLinkForModalJobPost: (link) =>
    dispatch(setDiscardLinkForModalJobPost(link)),
  setDiscardModalForJobPost: (status) =>
    dispatch(setDiscardModalForJobPost(status)),
  setShowChannelForChat: (status) => dispatch(setShowChannelForChat(status)),
  setHasDoneChatBeforeForChat: (status) =>
    dispatch(setHasDoneChatBeforeForChat(status)),
  setGroupIDForChat: (groupID) => dispatch(setGroupIDForChat(groupID)),
  setShowChannelAndHideChannelListOnMobile: (status) =>
    dispatch(setShowChannelAndHideChannelListOnMobile(status)),
  setIsCurrentPage: (page) => dispatch(setIsCurrentPage(page)),
  setDiscardModalForShiftPost: (toggle) =>
    dispatch(setDiscardModalForShiftPost(toggle)),
  resetShiftPostingReducer: () => dispatch({ type: "RESET_SHIFT_REDUCER" }),
});

export default React.memo(
  connect(mapStateToProps, mapDispatchToProps)(LeftNav)
);
