import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useCookies } from "react-cookie";

function StaffingProgressBar(props) {
  const [step1, setStep1] = useState(
    props.jobPostActiveStep >= 1 ? "active" : ""
  );
  const [step2, setStep2] = useState(
    props.jobPostActiveStep >= 2 ? "active" : ""
  );
  const [step3, setStep3] = useState(
    props.jobPostActiveStep >= 3 ? "active" : ""
  );
  const [step4, setStep4] = useState(
    props.jobPostActiveStep >= 4 ? "active" : ""
  );
  const [step5, setStep5] = useState(
    props.jobPostActiveStep >= 5 ? "active" : ""
  );

  const [jobPostActiveStep, setJobPostActiveStep, removeJobPostActiveStep] =
    useCookies(["jobPostActiveStep"]);
  useEffect(() => {
    setJobPostActiveStep(
      "jobPostActiveStep",
      JSON.stringify(props.active_step),
      {
        path: "/",
      }
    );
    setStep1(props.active_step >= 1 ? "active" : "");
    setStep2(props.active_step >= 2 ? "active" : "");
    setStep3(props.active_step >= 3 ? "active" : "");
    setStep4(props.active_step >= 4 ? "active" : "");
    setStep5(props.active_step >= 5 ? "active" : "");
  }, [props.active_step]);

  return (
    <>
      <div className="booking-steps">
        <ul>
          <li className={step1}>
            <span className="circle"></span>
            <span className="step_name">Role</span>
          </li>
          {/* <li className="current"> */}
          <li className={step2}>
            <span className="circle"></span>
            <span className="step_name">Location</span>
          </li>
          <li className={step3}>
            <span className="circle"></span>
            <span className="step_name">Wage & Benefits</span>
          </li>
          <li className={step4}>
            <span className="circle"></span>
            {/* <span className="step_name">Settings</span> */}
            <span className="step_name">Review & Confirm</span>
          </li>
          {/* below code is comment because we are not sending user to that screen */}
          {/* {props.avalible_connects <= 0 && (
            <li className={step5}>
              <span className="circle"></span>
              <span className="step_name">Pay & Confirm</span>
            </li>
          )} */}
        </ul>
        {props.avalible_connects > 0 && props.avalible_connects != null && (
          <div className={`remaing_credit_card`}>
            <span>
              Credits <br className="d-none d-md-block" /> Remaning:{" "}
            </span>
            <span className="available_credit">{props.avalible_connects}</span>
          </div>
        )}
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  active_step: state.vantage.jobPostReducer.activeStep,
  user_token: state.vantage.userDataReducer.user_token,
  avalible_connects: state.vantage.jobPostReducer.availableConnects,
});

const mapDispatchToProps = (dispatch) => ({});

// export default StaffingProgressBar;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StaffingProgressBar);
