import React, { useEffect, useState } from "react";
import {
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavLink,
  Spinner,
  Tooltip,
} from "reactstrap";
import { userLogoutAction } from "../../redux/actions/login";
import { getUserInfoAction } from "../../redux/actions/userAction";
import { updateIsNavbarOpenAction } from "../../redux/actions/main";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import DiscartModelComponent from "../Common/DiscartModelComponent";
import {
  updateIsModelOpenAction,
  updateIsModelLinkAction,
} from "../../redux/actions/main";
import {
  setDiscardLinkForModalJobPost,
  setDiscardModalForJobPost,
} from "../../redux/actions/jobPostAction";
import { useCookies } from "react-cookie";
import Cookies from "universal-cookie";
import { socket } from "../../lib/SocketProvider";
import Head from "next/head";
import { useIntercom } from "react-use-intercom";
import useLogout from "../../hooks/Auth/useLogout";
function Header(props) {
  const router = useRouter();
  const cookies = new Cookies();

  const { show } = useIntercom();
  const { logout } = useLogout(props);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
  const [withExpandClass, setWithExpandClass] = useState(
    props.isNavBarOpenCookie == "true" ? "site_logo expanded" : "site_logo"
  );
  const [imageLinkOnMobile, setImageLinkOnMobile] = useState(
    props.isNavBarOpenCookie != "true"
      ? "/images/menu-btn.svg"
      : "/images/cancel.svg"
  );
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const tooltipToggle = () => setTooltipOpen(!tooltipOpen);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  const changeClass = () => {
    // setExpand(!expand)
    // getClass(expand)
    cookies.set("isNavBarOpenCookie", JSON.stringify(!props.is_navbar_open), {
      path: "/",
    });
    props.updateIsNavbarOpenAction(!props.is_navbar_open).then((resp0) => {});
  };

  const goToDashboard = () => {
    if (
      props.booking_active_step != 5 &&
      props.course_id != 0 &&
      router.pathname.includes("/booking/")
    ) {
      props.updateIsModelOpenAction(true).then((resp0) => {});
      props.updateIsModelLinkAction("/dashboard").then((resp0) => {});
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
      props.setDiscardLinkForModalJobPost("/dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  const gotoSelectOrganistionPage = () => {
    if (
      (props.jobpost_active_step > 1 ||
        props.job_post_job_title != "" ||
        props.job_post_job_description != "" ||
        props.job_post_is_license_required != "" ||
        props.job_post_contract_type != "" ||
        props.job_post_type_of_employment != "") &&
      (router.pathname === "/staffing" || router.pathname === "/jobpost")
    ) {
      props.setDiscardModalForJobPost(true);
      props.setDiscardLinkForModalJobPost("/organisation");
    } else {
      router.push("/organisation");
    }
  };

  useEffect(() => {
    if (!props.is_navbar_open) {
      setWithExpandClass("site_logo");
      setImageLinkOnMobile("/images/menu-btn.svg");
    } else {
      setImageLinkOnMobile("/images/cancel.svg");
      setWithExpandClass("site_logo expanded");
    }
    // setExpand(props.is_navbar_open)
  }, [props.is_navbar_open]);

  // const userLogoutFunction = (e) => {
  //   e.preventDefault();
  //   socket.disconnect();
  //   router.push("/login").then(() => {
  //     props.userLogoutActionTemp().then((resp0) => {
  //       if (resp0) {
  //         removeCookie("user", {
  //           path: "/",
  //         });
  //         router.push("/login").then(() => {
  //           props.resetJobReducer();
  //         });
  //       }
  //     });
  //   });
  // };

  const showChat = () => {
    show();
    // Intercom('show');
    // $crisp.push(["do", "chat:toggle"])
  };

  return (
    <>
      <Head>
        <link rel="canonical" href="https://www.guardpass.com/employers" />
      </Head>
      <header>
        <div className="header_inner">
          <div className={withExpandClass}>
            <div className="logo logo-wrap">
              <div
                className="icon-wrap cursor-pointer"
                // onClick={() => router.push("/organisation")}
                onClick={() => {
                  gotoSelectOrganistionPage();
                }}
              >
                <img
                  src={process.env.APP_URL + "/images/org_icon.svg"}
                  className="img-fluid"
                  width=""
                  height=""
                  alt="icon"
                />
                <span className="hover-cont">Switch to...</span>
              </div>
              <span className="d-inline-block mt-1" id={"Tooltip-title"}>
                {props.user_name}
              </span>
              <Tooltip
                placement="right"
                isOpen={tooltipOpen}
                target={"Tooltip-title"}
                toggle={tooltipToggle}
              >
                {props.user_name}
              </Tooltip>
            </div>

            <div className="toggle_sidenav" onClick={() => changeClass()}>
              <img
                src={process.env.APP_URL + "/images/chevron-left.svg"}
                className="d-none d-md-block"
                width=""
                height=""
                alt=""
              />

              <img
                src={process.env.APP_URL + imageLinkOnMobile}
                className="d-block d-md-none"
                width="32px"
                height="32px"
                alt=""
              />
            </div>
          </div>
          <div className="page_name" onClick={() => goToDashboard()}>
            Dashboard
          </div>
          <Nav pills>
            <NavItem className="d-none d-md-flex" id="chatWithUs">
              {/* <button
                onClick={(e) => {
                  e.preventDefault();
                  socket.disconnect();
                }}
              >
                Socket Disconnect
              </button> */}
              <NavLink onClick={() => showChat()} className="cursor-pointer">
                <i>
                  <img
                    src={process.env.APP_URL + "/images/mobile-chat.svg"}
                    alt="Chat"
                  />
                </i>
                Chat with us
              </NavLink>
            </NavItem>
            <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle nav caret>
                <span className="userAvatar">
                  <img
                    src={process.env.APP_URL + "/images/account-btn.svg"}
                    alt="Jason"
                    width="24px"
                    height="24px"
                  />
                </span>
                <span className="valTxt">
                  {props.decision_maker_first_name +
                    " " +
                    props.decision_maker_last_name}
                </span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={logout}>Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </div>
        <DiscartModelComponent NextUrl={"dashboard"} />
        {/* <NewsModal/> */}
      </header>
    </>
  );
}

// export default Header
const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  user_name: state.vantage.userDataReducer.user_name,
  decision_maker_first_name:
    state.vantage.userDataReducer.decision_maker_first_name,
  decision_maker_last_name:
    state.vantage.userDataReducer.decision_maker_last_name,
  is_navbar_open: state.vantage.commonReducer.is_navbar_open,
  booking_active_step: state.vantage.bookingReducer.booking_active_step,
  course_id: state.vantage.bookingReducer.course_id,
  jobpost_active_step: state.vantage.jobPostReducer.activeStep,

  job_post_job_title: state.vantage.jobPostReducer.jobTitle,
  job_post_job_description: state.vantage.jobPostReducer.editor,
  job_post_is_license_required: state.vantage.jobPostReducer.radio,
  job_post_contract_type: state.vantage.jobPostReducer.contract,
  job_post_type_of_employment: state.vantage.jobPostReducer.typeOfEmployment,
});

const mapDispatchToProps = (dispatch) => ({
  userLogoutAction: userLogoutAction,
  userLogoutActionTemp: () => dispatch(userLogoutAction()),
  getUserInfoAction: getUserInfoAction,
  getUserInfoActionTemp: (toker) => dispatch(getUserInfoAction(toker)),
  updateIsNavbarOpenAction: (value) =>
    dispatch(updateIsNavbarOpenAction(value)),
  updateIsModelOpenAction: (value) => dispatch(updateIsModelOpenAction(value)),
  updateIsModelLinkAction: (value) => dispatch(updateIsModelLinkAction(value)),
  setDiscardLinkForModalJobPost: (link) =>
    dispatch(setDiscardLinkForModalJobPost(link)),
  setDiscardModalForJobPost: (status) =>
    dispatch(setDiscardModalForJobPost(status)),
  resetJobReducer: () => dispatch({ type: "RESET_STAFFING_REDUCER" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
