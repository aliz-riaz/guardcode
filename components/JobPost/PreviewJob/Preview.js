import { Button, Label, Row, Col, FormGroup } from "reactstrap";
import { connect } from "react-redux";
import { protectedRoute } from "../../../utilites/utility";
import {
  mapCourseNumberBackToCourseName,
  mapSalaryUnitBackToCompleteText,
} from "../ReviewAndConfirm/utility";
import { isBrowser } from "react-device-detect";
import { useEffect } from "react";
import { setShowJobPreview } from "../../../redux/actions/jobPostAction";

export const getServerSideProps = async function (context) {
  return protectedRoute(context);
};
import styles from "./preview.module.scss";

function PreviewJob(props) {
  const closeHandler = () => {
    props.setShowJobPreview(false);
  };
  const mapSalaryBeniftsBackToText = (value) => {
    value = parseInt(value);
    switch (value) {
      case 1:
        return "On-site parking";
      case 2:
        return "Company car";
      case 3:
        return "Medical insurance";
      case 4:
        return "Sick pay";
      case 5:
        return "Uniform";
      case 6:
        return "Store discount";
      default:
        return "";
    }
  };

  return (
    <div
      className={`previewJob_content ${props.show_job_preview ? "show" : ""}`}
    >
      {/* <div className="pt-2 pt-md-5 pb-2 pb-md-4 row">
            <div className="col">
            <h3 className="text-center text-sm-uppercase font-sm-12">Preview</h3>
            </div>
        </div> */}
      <span className={`close_preview`} onClick={closeHandler}>
        <img src={process.env.APP_URL + "/images/x-circle.svg"} />
      </span>
      <Row className="justify-content-center">
        <Col className="col-12">
          <div className={` py-4 px-4  ${styles.single_job}`}>
            <h3 className={`${styles.job_name} mb-2 mt-0`}>
              {props.job_title}
            </h3>
            <div className={`d-flex align-items-center ${styles.company_info}`}>
              {/* <div className={styles.comp_logo}>
                            <img src="https://logo.clearbit.com/ward-security.co.uk" className={styles.img} />
                        </div> */}
              <div className={`${styles.comp_detail} flex-grow-1 ml-0`}>
                <span className={`${styles.company_name} d-block`}>
                  {props.company_name}
                </span>
                <span
                  className={`${styles.location} d-flex align-items-center`}
                >
                  <i>
                    <img
                      src="https://www.get-licensed.co.uk/guardpass/assets/images/map-pin-1.svg"
                      className="mr-2"
                    />
                  </i>
                  {props.specific_address == "yes"
                    ? props.loqate_city_town
                    : props.google_city_town}
                </span>
              </div>
            </div>
            <hr />
            <div className="scroll">
              <ul className={`${styles.job_intro__list} p-0`}>
                {props.license_required?.length > 0
                  ? props.license_required?.map((value) => {
                      return (
                        <li className="d-flex align-items-center  mb-3">
                          <i>
                            <img
                              src={
                                process.env.APP_URL + "/images/badge-img.svg"
                              }
                            />
                          </i>
                          <span>{mapCourseNumberBackToCourseName(value)}</span>
                        </li>
                      );
                    })
                  : null}
                <li className="d-flex align-items-center  mb-3">
                  <i>
                    <img src={process.env.APP_URL + "/images/wage-img.svg"} />
                  </i>
                  <span>
                    {props.salary_type == "Fixed Rate"
                      ? `£ ${props.salary_pay}`
                      : `£${props.salary_range_min} - £${props.salary_range_max}`}{" "}
                    <span className={`${styles.p_hour} ml-0`}>per hour</span>
                  </span>
                </li>

                <li className="d-flex align-items-center mb-4">
                  <i>
                    <img src={process.env.APP_URL + "/images/sign-img.svg"} />
                  </i>
                  <span>
                    {props.contract_type + ", " + props.type_of_employment}
                  </span>
                </li>
                {props.shift_schedule && (
                  <li className="d-flex align-items-center mb-4">
                    <i>
                      <img
                        src={process.env.APP_URL + "/images/calendar-icn.svg"}
                        width="21px"
                      />
                    </i>
                    <span>{props.shift_schedule}</span>
                  </li>
                )}

                {props.shift_timings && (
                  <li className="d-flex align-items-center mb-4">
                    <i>
                      <img
                        src={process.env.APP_URL + "/images/time-img.svg"}
                        width="21px"
                      />
                    </i>
                    <span>{props.shift_timings}</span>
                  </li>
                )}
              </ul>

              {props.salary_benefits?.length > 0 ? (
                <>
                  <hr />
                  <h4>Benefits</h4>
                  <hr />
                  <ul className={`${styles.job_intro__list} p-0 mt-1`}>
                    {props.salary_benefits.map((value, indx) => {
                      return (
                        <li className="d-flex align-items-center mb-3">
                          {/* <i>
                                        <img src="https://www.get-licensed.co.uk/guardpass/assets/images/sign-img.svg" />
                                    </i> */}
                          <span className="fs-6 fw-normal ml-0">
                            {" "}
                            {`${mapSalaryBeniftsBackToText(value)}${
                              props.salary_benefits.length - 1 != indx ? "" : ""
                            }`}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : null}

              {props?.venue_type != null ? (
                <>
                  <hr />
                  <h4>Venue</h4>
                  <hr />
                  <p className="fs-6 fw-normal ml-0">{props.venue_type}</p>
                </>
              ) : null}

              <hr />
              <h4>Job description</h4>
              <hr />
              <div className={`${styles.job_description}`}>
                {process.browser && (
                  <div
                    dangerouslySetInnerHTML={{ __html: props.job_description }}
                  ></div>
                )}{" "}
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* <div>
                <img src="https://staging.get-licensed.co.uk/guardpass/assets/images/guardpass-img@2x.png" alt="" />
            </div> */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  // salary_benefits: state.vantage.jobPostReducer.salaryBenefits,
  // job_title: state.vantage.jobPostReducer.jobTitle,
  // type_of_employment: state.vantage.jobPostReducer.typeOfEmployment,
  // company_name: state.vantage.userDataReducer.user_name,
  // job_description: state.vantage.jobPostReducer.editor,
  // specific_address: state.vantage.jobPostReducer.willReportToSpecificAddress,
  // google_city_town: state.vantage.jobPostReducer.WillNotReportToCity,
  // loqate_city_town: state.vantage.jobPostReducer.willReportToWorkCity,
  // salary_pay: state.vantage.jobPostReducer.salaryValue,
  // salary_per_unit: state.vantage.jobPostReducer.salaryValuePerUnit,
  // license_required: state.vantage.jobPostReducer.SIALicense,
  // contract_type: state.vantage.jobPostReducer.contract,
  // show_job_preview: state.vantage.jobPostReducer.showJobPostPreview,
});

const mapDispatchToProps = (dispatch) => ({
  setActiveStep: (activeStep) => dispatch(setActiveStep(activeStep)),
  setShowJobPreview: (status) => dispatch(setShowJobPreview(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewJob);
