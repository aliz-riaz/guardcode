import { useEffect, useState } from "react";
import { connect } from "react-redux";
import InviteApplicantCard from "./InviteApplicantCard";
import { isMobile } from "react-device-detect";
import styles from "./ApplicantsList.module.scss";

const InviteApplicantsList = (props) => {
  return (
    <>
      <div className={""}>
        <div
          className={`${
            !isMobile && (!props.swp_profile_window_to_be_shown ? "row" : "")
          }`}
        >
          {!props.swp_profile_window_to_be_shown && (
            <div
              className={`${
                !isMobile &&
                (!props.swp_profile_window_to_be_shown
                  ? "col-md-3 position-relative"
                  : "")
              }`}
            >
              <h2>
                Your job has been posted <br /> successfully, waiting for
                applicants
              </h2>
              <p className="fw-bold fs-6 mt-4">
                Whilst you wait, we have found the following matching applicants
                — you can invite them to apply.
              </p>
              {!isMobile && (
                <div
                  className={`text-right ${styles.pointer_img}`}
                  style={{ marginTop: "-10px" }}
                >
                  <img
                    src={process.env.APP_URL + "/images/pointer-doodle.svg"}
                  />
                </div>
              )}
            </div>
          )}
          <div
            className={`${
              !isMobile &&
              (!props.swp_profile_window_to_be_shown ? "col-md-9" : "")
            }`}
          >
            {props.swp_profile_window_to_be_shown && (
              <>
                <h2>
                  Your job has been posted successfully, waiting for applicants
                </h2>
                <p className="fw-bold fs-6">
                  Whilst you wait, we have found the following matching
                  applicants — you can invite them to apply.
                </p>
              </>
            )}

            {props.invite_applicants.map((app, indx) => {
              return (
                <>
                  <InviteApplicantCard
                    name={`${app.first_name} ${
                      app.middle_name != null ? app.middle_name : ""
                    } ${app.last_name}`}
                    {...app}
                    currentIndex={indx}
                  />
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );

  // return (
  //     <>
  //         {props.invite_applicants.length > 0 && props.invite_applicants?.map((app, indx) => {
  //             return <><InviteApplicantCard name={`${app.first_name} ${app.middle_name != null ? app.middle_name : ''} ${app.last_name}`} {...app} currentIndex={indx}/></>
  //         }) }
  //     </>
  // )
};

const mapStateToProps = (state) => ({
  // job_to_be_shown_in_applicant_tab: state.vantage.staffingReducer.jobToBeShownInApplicantsTab,
  // invite_applicants: state.vantage.staffingReducer.inviteApplicants,
  // user_token: state.vantage.userDataReducer.user_token,
  swp_profile_window_to_be_shown:
    state.vantage.staffingReducer.swpProfileWindowToBeShown,
  invite_applicants: state.vantage.staffingReducer.inviteApplicants,
});

const mapDispatchToProps = (dispatch) => ({
  // setInviteApplicants: (list) => dispatch(setInviteApplicants(list)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InviteApplicantsList);
