import React, { useState } from "react";
import styles from "./ShiftNoAccess.module.scss";
import userAccessRequest from "../../hooks/Shifts/ShiftRequestAccess/userRequestForAccess";
import { setShiftRequestStatus } from "../../redux/actions/organisationAction";
import { connect } from "react-redux";
import { FastField } from "formik";
import { Tooltip } from "reactstrap";

// left side static image content
const applicants = [
  {
    name: "Tiger Joseph Woods",
    time: "8h ago",
    src: "/images/shifts_applicant1.svg",
  },
  {
    name: "Alan Walker",
    time: "2h ago",
    src: "/images/shifts_applicant2.svg",
  },
  {
    name: "David Butcher",
    time: "2h ago",
    src: "/images/shifts_applicant3.svg",
  },
];

function ShiftNoAccess(props) {
  // status of request access coming from api
  const { userAccessStatus } = props;

  //request access api
  const { mutate } = userAccessRequest(props.setShiftRequestStatus);
  const handleAccessRequest = () => {
    mutate();
  };

  // tooltip setup if organisation is not approved
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <div className={`${styles.main_wrapper} main-inner-content`}>
      <div className={`${styles.wrapper} bg-white p-lg-5 p-4`}>
        {/* Locked div with lock image  */}
        <span
          className={`${styles.locked} bg-black rounded-pill text-white px-3 py-1 d-inline-flex align-items-center`}
        >
          <img
            src={`${process.env.APP_URL}/images/shiftNoAccessLockImage.png`}
            alt="lock"
            className="mr-1"
          />
          Locked
        </span>
        <div className="row justify-content-between mt-4">
          {/* right side content  */}
          <div className={`${styles.rightSideContent} col-lg-7`}>
            {/* main heading  */}
            <h1 className={`${styles.heading}`}>
              Fill your shifts <br />
              fast with <span>GuardFlex</span>
            </h1>
            <p className="mt-3 mt-lg-4">
              Post shifts and get vetted SIA security professionals to <br />{" "}
              cover them
            </p>
            {/* Icons with text div  */}
            <div className={`${styles.iconAndTextDiv} row mt-4`}>
              <div className="col-md-4 col-xl-3 pr-2">
                <img
                  src={`${process.env.APP_URL}/images/engineering.svg`}
                  alt="Engineering"
                />
                <p className="fw-bold pt-1 pt-lg-3">
                  Access to reliable <br /> and trusted workforce
                </p>
              </div>
              <div className="col-md-4 col-xl-3">
                <img
                  src={`${process.env.APP_URL}/images/blur_on.svg`}
                  alt="Blur On"
                />
                <p className="fw-bold pt-1 pt-lg-3">
                  Transparent
                  <br />
                  pricing
                </p>
              </div>
              <div className="col-md-4 col-xl-3">
                <img
                  src={`${process.env.APP_URL}/images/questionnaire.svg`}
                  alt="Vetted Workers"
                />
                <p className="fw-bold pt-1 pt-lg-3">
                  SIA licensed <br /> and vetted workers
                </p>
              </div>
            </div>
            {/* showing element on request status  */}
            {userAccessStatus == "Not Requested" && (
              <button
                className={`${styles.requestBtn} btn btn-md btn-green mt-2 mt-md-3 mb-3 mb-lg-0`}
                onClick={handleAccessRequest}
                disabled={
                  // disabling button if organisation is not approved
                  props.user_token != "" && props.isOrganisationApproved == 0
                    ? true
                    : false
                }
              >
                Request Access
                {/* showing i button alongside button if org not approve  */}
                {props.user_token != "" &&
                  props.isOrganisationApproved == 0 && (
                    <span
                      className={`${styles.accountNotApproved}`}
                      id="accountNotApproved"
                    >
                      i
                    </span>
                  )}
              </button>
            )}
            {props.user_token != "" && props.isOrganisationApproved == 0 && (
              <Tooltip
                placement="bottom"
                isOpen={tooltipOpen}
                target="accountNotApproved"
                toggle={toggle}
              >
                Account not approved!
              </Tooltip>
            )}
            {userAccessStatus == "Pending" && (
              <div
                className={`${styles.requestAccessResponse} d-flex mt-3 align-items-start mb-3 mb-lg-0`}
              >
                <img src={`${process.env.APP_URL}/images/headset_mic.svg`} />
                <p>
                  We've received your access request, our representative <br />{" "}
                  will get back to you shortly.
                </p>
              </div>
            )}
            {userAccessStatus == "Declined" && (
              <div
                className={`${styles.requestAccessDeclineResponse} d-flex mt-3 align-items-start mb-3 mb-lg-0`}
              >
                <img
                  src={`${process.env.APP_URL}/images/headset_mic_decline.svg`}
                />
                <p className="text-danger">
                  Your feature request has been declined. Please contact our
                  support for further clarification.
                </p>
              </div>
            )}
          </div>

          {/* Left side content  */}
          <div className={`${styles.leftSideContent} col-lg-5 col-xl-4 `}>
            {/*Post your shift - (box-1) */}
            <div className={`${styles.box} ${styles.post_shift} p-3 bg-white`}>
              <h2>Post your shift</h2>
              <div className="d-flex">
                <img
                  className="align-self-start"
                  src="/images/shifts_alert.svg"
                />{" "}
                <div className="ml-2 ">
                  <h3 className="m-0">Security worker required</h3>
                  <p className="m-0">@CityFM Radio Centre</p>
                </div>
              </div>
            </div>

            {/*Applicants - (box-2)*/}
            <div
              className={`${styles.box} ${styles.applicant_div} mt-3 p-3 bg-white`}
            >
              <div
                className={`${styles.head} d-flex justify-content-between align-items-center`}
              >
                <h3>Applicants</h3>
                <img src={`${process.env.APP_URL}/images/shifts_more.svg`} />
              </div>
              <hr className="m-0 p-0" />

              <div className={`${styles.applicants}`}>
                {applicants?.map((applicant) => {
                  return (
                    <div className={`${styles.gap} d-flex align-items-center`}>
                      <img
                        src={`${process.env.APP_URL}${applicant.src}`}
                        alt="aplicant_2"
                        class={`${styles.avatar} rounded-circle`}
                      />
                      <div className="applicant_info">
                        <h3 className="p-0 m-0">{applicant.name}</h3>
                        <h4 className="p-0 m-0">{applicant.time}</h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/*Check status - (box-3)  */}
            <div
              className={`${styles.box} ${styles.check_status} mt-3 p-3 bg-white d-flex justify-content-between align-items-sm-center flex-sm-row`}
            >
              <div
                className={`${styles.gap} ${styles.applicant4} d-flex align-items-center`}
              >
                <div className={`${styles.applicant4_img}`}>
                  <img
                    src={`${process.env.APP_URL}/images/shifts_applicant4.svg`}
                    alt="aplicant_4"
                    class={`${styles.avatar} rounded-circle`}
                  />
                  <img
                    src={`${process.env.APP_URL}/images/shifts_online.svg`}
                    alt="aplicant_4"
                    class="rounded-circle"
                    className={`${styles.status}`}
                  />
                </div>
                <div className="applicant_info">
                  <h3 className="p-0 m-0">James Alan</h3>
                  <h4 className="p-0 m-0">Arrived at site!</h4>
                </div>
              </div>
              <div className={`${styles.check_Status} align-self-center`}>
                <img
                  src={`${process.env.APP_URL}/images/shifts_file-send.svg`}
                  alt="file-icon"
                  class="rounded-circle"
                />
                <span className="p-0 m-0">Check status</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  shiftRequestedStatus: state.vantage.organisationReducer.shiftRequestedStatus,
  user_token: state.vantage.userDataReducer.user_token,
  isOrganisationApproved:
    state.vantage.organisationReducer.isOrganisationApproved,
});

const mapDispatchToProps = (dispatch) => ({
  setShiftRequestStatus: (shiftStatus) =>
    dispatch(setShiftRequestStatus(shiftStatus)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShiftNoAccess);
