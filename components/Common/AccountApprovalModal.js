import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
// import { updateIsModelOpenAction } from "../../redux/actions/main";
import { useRouter } from "next/router";
// import {setShowModal, setHasCongratulated} from "../../redux/actions/main"
import {
  setHasOwnerCongratulatedForApproval,
  organisationUserHasBeenCongratulated,
} from "../../redux/actions/organisationAction";
import styles from "./Modal.module.scss";

const AccountApprovalModal = (props) => {
  const router = useRouter();

  const cancelFunciton = async () => {
    const { data, request_status } =
      await props.organisationUserHasBeenCongratulated(props.user_token);
    if (request_status) {
      props.setHasOwnerCongratulatedForApproval(1);
    }
  };

  return (
    <div>
      <Modal
        isOpen={
          !props.hasOwnerCongratulatedForApproval &&
          props.isOrganisationSelected &&
          props.isAccountOwner &&
          props.isOrganisationApproved
        }
        className={`discardModal ${styles.congratModal}`}
        backdrop="static"
        keyboard={false}
      >
        <div
          className="text-right px-4 pt-3 cursor-pointer fw-bold"
          onClick={cancelFunciton}
        >
          <span>
            <img src={`${process.env.APP_URL}/images/cancel.png`} />
          </span>
        </div>
        <ModalBody>
          <div className={` ${styles.congratModal__body}`}>
            <div className="text-center">
              <i>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="68"
                  width="68"
                  viewBox="0 0 48 48"
                >
                  <title>party popper</title>
                  <g class="nc-icon-wrapper">
                    <path
                      d="M37.648,32.979,15.021,10.352a1,1,0,0,0-1.656.39L2.052,44.684A1,1,0,0,0,3,46a.987.987,0,0,0,.316-.052L37.258,34.635a1,1,0,0,0,.39-1.656Z"
                      fill="#efd358"
                    ></path>{" "}
                    <ellipse
                      cx="25.627"
                      cy="22.373"
                      rx="5"
                      ry="17"
                      transform="translate(-8.314 24.674) rotate(-45)"
                      fill="#e2ac4b"
                    ></ellipse>{" "}
                    <path
                      d="M31,25a1,1,0,0,1-.9-1.426c2.516-5.349,8.805-7.2,15.29-4.5a1,1,0,1,1-.77,1.846c-5.451-2.27-10.674-.828-12.71,3.5A1,1,0,0,1,31,25Z"
                      fill="#43a6dd"
                    ></path>{" "}
                    <circle cx="37" cy="9" r="3" fill="#e86c60"></circle>{" "}
                    <circle cx="41" cy="39" r="2" fill="#e2ac4b"></circle>{" "}
                    <circle cx="28" cy="18" r="2" fill="#5a7a84"></circle>{" "}
                    <circle cx="42.5" cy="26.5" r="1.5" fill="#ae453e"></circle>{" "}
                    <circle cx="17.5" cy="4.5" r="1.5" fill="#e2ac4b"></circle>{" "}
                    <path
                      d="M21,19a1,1,0,0,1-.6-1.8A12.026,12.026,0,0,0,24.081,2.394a1,1,0,0,1,1.838-.788A13.975,13.975,0,0,1,21.6,18.8.994.994,0,0,1,21,19Z"
                      fill="#e86c60"
                    ></path>{" "}
                    <path
                      d="M4.172,13.828a1,1,0,0,1-.707-.293,5,5,0,1,1,7.07-7.07A1,1,0,0,1,9.121,7.879a3.072,3.072,0,0,0-4.242,0,3,3,0,0,0,0,4.242,1,1,0,0,1-.707,1.707Z"
                      fill="#43a6dd"
                    ></path>
                  </g>
                </svg>
              </i>
            </div>
            <h4 className="text-center mb-2">
              Your organisation has been approved
            </h4>
            <div className={`${styles.congrats_cont}`}>
              <p className="mb-2 fs-7 mt-4">Account benefits:</p>
              <ul className="list check-round">
                <li>Post jobs and hire security staff nationally</li>
                <li>Book SIA training at over 85 locations in the UK</li>
              </ul>
              {/* <div className={`${styles.bonus_card} d-flex align-items-center`}>
                <div
                  className={`${styles.card_icon} d-flex align-items-center justify-content-center`}
                >
                  <img
                    src={process.env.APP_URL + "/images/gift_icon.svg"}
                    width="35px"
                  />
                </div>
                <div
                  className={`${styles.card_cont} flex-grow-1 text-left pl-2`}
                  >
                  <p className={`fs-7  ${styles.head}`}>BONUS</p>
                  <p className="mb-0">Ten free job credits on us worth £1500</p>
                </div>
              </div> */}
              <div className="d-flex justify-content-between mt-4">
                <button
                  className={` ${styles.get_start_btn} btn btn-lg btn-green`}
                  onClick={() => {
                    router.push("/jobpost");
                    cancelFunciton();
                  }}
                >
                  Post a Job
                </button>
                <button
                  className={` ${styles.get_start_btn} btn btn-lg btn-gray`}
                  onClick={() => {
                    router.push("/booking/step-1");
                    cancelFunciton();
                  }}
                >
                  Book Training
                </button>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  hasOwnerCongratulatedForApproval:
    state.vantage.organisationReducer.hasOwnerCongratulatedForApproval,
  isOrganisationSelected:
    state.vantage.organisationReducer.isOrganisationSelected,
  isAccountOwner: state.vantage.organisationReducer.isAccountOwner,
  isOrganisationApproved:
    state.vantage.organisationReducer.isOrganisationApproved,
  user_token: state.vantage.userDataReducer.user_token,
});

const mapDispatchToProps = (dispatch) => ({
  setHasOwnerCongratulatedForApproval: (status) =>
    dispatch(setHasOwnerCongratulatedForApproval(status)),
  organisationUserHasBeenCongratulated: (userToken) =>
    dispatch(organisationUserHasBeenCongratulated(userToken)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountApprovalModal);
