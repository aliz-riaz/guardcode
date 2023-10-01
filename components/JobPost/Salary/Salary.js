import { Button, label, Row, Col, FormGroup } from "reactstrap";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import {
  setSalaryValue,
  setSalaryValuePerUnit,
  setSalaryBenefits,
  setTypeOfEmployment,
  setContract,
  setSalaryWorkingHoursPerWeek,
  setSalaryType,
  setSalaryRangeMin,
  setSalaryRangeMax,
  setActiveStep,
} from "../../../redux/actions/jobPostAction";
import * as Yup from "yup";
// import ReactSpeedometer from "react-d3-speedometer"

import SemiCircleProgressBar from "react-progressbar-semicircle";
import styles from "./Salary.module.scss";

const SalarySchema = Yup.object().shape({
  // salaryValue: Yup.number().min(9, "⚠️ This wage is less than the national minimum wage (minimum wage £ 9.00)").max(99999.99, "Max Limit is 99999.99").required("Please enter salary amount"),

  salaryValue: Yup.number().when("salaryType", {
    is: (val) => val === "Fixed Rate",
    then: Yup.number()
      .min(
        10,
        "⚠️ This wage is less than the national minimum wage (minimum wage £ 10.00)"
      )
      .max(99999.99, "Max Limit is 99999.99")
      .required("Please enter salary amount"),
    otherwise: Yup.number().notRequired(),
  }),

  salaryType: Yup.string(),

  // salaryRangeMin: Yup.number()
  // .min(9, "⚠️ This wage is less than the national minimum wage (minimum wage £ 9.00)")
  // .required("Please enter minimum range"),

  // salaryRangeMax: Yup.number()
  // .when("salaryRangeMin", {
  //   is: (val) => val !== null,
  //   then: Yup.number().moreThan(Yup.ref("salaryRangeMin"), "The maximum value must be greater than the minimum value"),
  // })
  // .required("Please enter maximum range"),

  salaryRangeMin: Yup.number().when("salaryType", {
    is: (val) => val === "Range",
    then: Yup.number()
      .min(
        10,
        "⚠️ This wage is less than the national minimum wage (minimum wage £ 10.00)"
      )
      .max(99999.99, "Max Limit is 99999.99")
      .required("Please enter minimum range"),
    otherwise: Yup.number().notRequired(),
  }),

  salaryRangeMax: Yup.number().when("salaryType", {
    is: (val) => val === "Range",
    then: Yup.number()
      .when("salaryRangeMin", {
        is: (val) => val !== null,
        then: Yup.number().moreThan(
          Yup.ref("salaryRangeMin"),
          "The maximum value must be greater than the minimum value"
        ),
      })
      .max(99999.99, "Max Limit is 99999.99")
      .required("Please enter maximum range"),
    otherwise: Yup.number().notRequired(),
  }),

  // typeOfEmployment: Yup.string().required('Please select employment type'),

  // contract: Yup.string().required('Please select contract type'),

  salaryValuePerUnit: Yup.string()
    .required("Please select pay frequency")
    .nullable(),
  salaryHoursPerWeek: Yup.number()
    .min(1, "Woking hours can't be less than 1 per week")
    .max(72, "Working hours per week can't be more than 72 hours/week")
    .required("Please enter salary amount")
    .required("Please enter hours/week")
    .nullable(),
});

const Salary = (props) => {
  const calculatePercantageDependingOnSalary = () => {
    let city =
      props.will_report_to_specific_address == "yes"
        ? props.will_report_to_work_city
        : props.will_not_report_to_city;
    const regex = new RegExp("(?:^|\\W)london(?:$|\\W)");
    const salaryValue =
      props.salary_type == "Fixed Rate"
        ? props.salary_value
        : props.salary_range_max;
    if (regex.test(city?.toLowerCase())) {
      //london case
      // {
      //   under £9.99: Low
      //   over £9.99 and under £12: Good
      //   over £12: Great
      //   }
      if (salaryValue == "") {
        return 0;
      } else if (salaryValue <= 9.99) {
        return 15; //means low
      } else if (salaryValue > 9.99 && salaryValue <= 12) {
        return 60;
      } else {
        return 100;
      }
    } else {
      //not in london case
      // {
      //   under £9: Low
      //   over £9 and under £11: Good
      //   over £11: Great
      //   }
      if (salaryValue == "") {
        return 0;
      } else if (salaryValue <= 9) {
        return 15; //means low
      } else if (salaryValue > 9 && salaryValue <= 11) {
        return 60;
      } else {
        return 100;
      }
    }
  };
  const getColorClass = (salaray) => {
    switch (salaray) {
      case 15:
        return "low";
      case 60:
        return "good";
      case 100:
        return "excelent";
      default:
        return "";
    }
  };
  const getColorForProgressBar = () => {
    if (calculatePercantageDependingOnSalary() == 15) {
      return "#d59d3b";
    } else if (calculatePercantageDependingOnSalary() == 60) {
      return "#8dd53b";
    } else {
      return "#3bd55a";
    }
  };

  return (
    <>
      <div className="pt-2 pt-md-5 pb-2 pb-md-4 row align-items-center justify-content-center">
        {/* <div className="col-md-2">
          <button
            className={`text-left btn btn-sm btn-transparent d-inline-flex align-items-center pl-0`}
            onClick={() => props.setActiveStep(2)}
          >
            <img
              src={`${process.env.APP_URL}/images/chevron-left.svg`}
              alt="chevron"
            />
            Back
          </button>
        </div> */}
        <div className="col-md-4">
          <h3 className="text-center text-sm-uppercase font-sm-12 mb-0">
            Wage & Benefits
          </h3>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="bg-white py-4 px-4 rounded">
            <Formik
              enableReinitialize={true}
              initialValues={{
                salaryType: props.salary_type,
                salaryRangeMin: props.salary_range_min,
                salaryRangeMax: props.salary_range_max,
                salaryValue: props.salary_value,
                salaryValuePerUnit: props.salary_value_per_unit,
                salaryBenefits: props.salary_benefits,
                typeOfEmployment: props.type_of_employment,
                contract: props.contract,
                salaryHoursPerWeek: props.salary_work_hour_per_week,
              }}
              validationSchema={SalarySchema}
              onSubmit={(values) => {
                props.goToNext(1);
              }}
            >
              {({ errors, touched, values }) => (
                <Form id="salary">
                  {/* <h4>Contract details</h4>
                    <Row>
                    <Col>
                      <div className="gl-input-simple form-group">
                        <Field className="form-control" as="select" name="typeOfEmployment" onChange={(e) => {
                          props.setTypeOfEmployment(e.target.value);
                          }}>
                          <option value="">Employment type</option>
                          <option value="Full time">Full time</option>
                          <option value="Part time">Part time</option>
                        </Field>
                        {errors.typeOfEmployment && touched.typeOfEmployment ? (<div className="text-danger">{errors.typeOfEmployment}</div>): null}
                      </div>
                    </Col>
                  </Row>
                  
                  <div className="gl-input-simple form-group ">
                    <Field as="select" className="form-control" name="contract" onChange={(e) => {
                      props.setContract(e.target.value);
                    }}>
                      <option value="">Contract type</option>
                      <option value="Permanent">Permanent - PAYE</option>
                      <option value="Contract">Contract - PAYE</option>
                      <option value="Temporary">Contract - Self employed</option>
                      <option value="Temporary">Temporary - Self employed</option> */}

                  {/* <option value="Internship">Internship</option>
                      <option value="Commission">Commission</option>
                      <option value="Volunteer">Volunteer</option> */}
                  {/* <option value="Apprenticeship">Apprenticeship</option> */}
                  {/* </Field>
                      {errors.contract && touched.contract ? (<div className="text-danger" >{errors.contract}</div>): null}
                  </div>    
                  <hr /> */}
                  <Row>
                    <Col className="col-12 col-md-7">
                      <h4 className="fs-6 fw-bold text-black">Wage rate</h4>
                      <FormGroup
                        className={`gl-input-simple position-relative`}
                      >
                        <Field
                          as="select"
                          className="form-control"
                          name="salaryType"
                          onChange={(e) => {
                            props.setSalaryType(e.target.value);
                          }}
                        >
                          <option value="Fixed Rate">Fixed Rate</option>
                          <option value="Range">Range</option>
                        </Field>
                        {/* {errors.salaryValuePerUnit && touched.salaryValuePerUnit ? (<div className='text-danger'>{errors.salaryValuePerUnit}</div>) : null} */}
                      </FormGroup>
                      {props.salary_type == "Fixed Rate" && (
                        <FormGroup
                          className={`gl-input position-relative ${styles.per_hour}`}
                        >
                          <Field
                            type="number"
                            name="salaryValue"
                            className="form-control"
                            placeholder="Salary Value"
                            onChange={(e) => {
                              props.setSalaryValue(e.target.value);
                            }}
                            onWheel={(e) => e.target.blur()}
                          />
                          <label>Per hour</label>

                          {errors.salaryValue && touched.salaryValue ? (
                            <div className="text-danger">
                              {errors.salaryValue}
                            </div>
                          ) : null}
                        </FormGroup>
                      )}
                      {props.salary_type == "Range" && (
                        <>
                          <FormGroup
                            className={`gl-input mb-1 ${styles.min_max_wrap}`}
                          >
                            <div
                              className={`position-relative ${styles.per_hour}`}
                            >
                              <Field
                                type="number"
                                name="salaryRangeMin"
                                className={`form-control ${styles.input_field}`}
                                placeholder="Salary Value"
                                onChange={(e) => {
                                  props.setSalaryRangeMin(e.target.value);
                                }}
                                onWheel={(e) => e.target.blur()}
                              />
                              <label>Minimum per hour</label>
                            </div>
                            <div
                              className={`position-relative ${styles.per_hour}`}
                            >
                              <Field
                                type="number"
                                name="salaryRangeMax"
                                className={`form-control ${styles.input_field}`}
                                placeholder="Salary Value"
                                onChange={(e) => {
                                  props.setSalaryRangeMax(e.target.value);
                                }}
                                onWheel={(e) => e.target.blur()}
                              />
                              <label>Maximum per hour</label>
                            </div>
                          </FormGroup>
                          <div className={`d-flex mb-3 ${styles.range_errors}`}>
                            <div className="w-50">
                              {errors.salaryRangeMin &&
                              touched.salaryRangeMin ? (
                                <div className="fs-8 text-danger">
                                  {errors.salaryRangeMin}
                                </div>
                              ) : null}
                            </div>
                            <div className="w-50">
                              {errors.salaryRangeMax &&
                              touched.salaryRangeMax ? (
                                <div className="fs-8 text-danger">
                                  {errors.salaryRangeMax}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </>
                      )}
                      <FormGroup
                        className={`gl-input-simple position-relative`}
                      >
                        <Field
                          as="select"
                          className="form-control"
                          name="salaryValuePerUnit"
                          onChange={(e) => {
                            props.setSalaryValuePerUnit(e.target.value);
                          }}
                        >
                          <option value="">Pay Frequency</option>
                          <option value="weekly">Weekly</option>
                          <option value="fortnightly">Fortnightly</option>
                          <option value="monthly">Monthly</option>
                        </Field>
                        {errors.salaryValuePerUnit &&
                        touched.salaryValuePerUnit ? (
                          <div className="text-danger">
                            {errors.salaryValuePerUnit}
                          </div>
                        ) : null}
                      </FormGroup>
                      <FormGroup className="gl-input">
                        <Field
                          type="number"
                          name="salaryHoursPerWeek"
                          className="form-control"
                          placeholder="Salary Value"
                          onChange={(e) => {
                            props.setSalaryWorkingHoursPerWeek(e.target.value);
                          }}
                          onWheel={(e) => e.target.blur()}
                        />
                        <label>Work hours/Week</label>

                        {errors.salaryHoursPerWeek &&
                        touched.salaryHoursPerWeek ? (
                          <div className="text-danger">
                            {errors.salaryHoursPerWeek}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Col>
                    <Col className="col-12 col-md-5">
                      {/* {props.salary_value_per_unit == "H" ?  */}
                      <>
                        <p className="fs-6 fw-bold text-black text-center mb-1">
                          Pay gauge{" "}
                          <span
                            className={`badge badge-dark badge-pill font-weight-normal ${styles.beta_badge}`}
                          >
                            BETA
                          </span>
                        </p>

                        <div className="text-center position-relative mt-5">
                          <SemiCircleProgressBar
                            percentage={calculatePercantageDependingOnSalary()}
                            strokeWidth={15}
                            diameter={160}
                            // stroke="#22194D"
                            stroke={getColorForProgressBar()}
                          />
                          <img
                            src={process.env.APP_URL + "/images/needle-img.svg"}
                            className={`${styles.speedMeter__rotate} ${
                              calculatePercantageDependingOnSalary() == 0
                                ? styles.start
                                : calculatePercantageDependingOnSalary() == 15
                                ? styles.low
                                : calculatePercantageDependingOnSalary() == 60
                                ? styles.good
                                : styles.excelent
                            }`}
                          />
                          <div className={styles.salary}>
                            <p
                              className={`mb-0 ${
                                calculatePercantageDependingOnSalary() == 0
                                  ? styles.start
                                  : calculatePercantageDependingOnSalary() == 15
                                  ? styles.low
                                  : calculatePercantageDependingOnSalary() == 60
                                  ? styles.good
                                  : styles.excelent
                              }`}
                            >
                              {calculatePercantageDependingOnSalary() == 0
                                ? "Enter info"
                                : calculatePercantageDependingOnSalary() == 15
                                ? "Low"
                                : calculatePercantageDependingOnSalary() == 60
                                ? "Good"
                                : "Great"}
                            </p>
                          </div>
                          <p
                            className="fw-bold px-3 line-height-normal"
                            style={{ fontSize: "12px", lineHeight: "normal" }}
                          >
                            {calculatePercantageDependingOnSalary() == 0
                              ? "Please fill out information your left to get an evaluation on your wage rate"
                              : calculatePercantageDependingOnSalary() == 15
                              ? "This job will attract some applicants"
                              : "This job will attract many applicants"}
                          </p>
                        </div>
                      </>
                      {/* : null
                        }  */}
                    </Col>
                    {/* {props.salary_value_per_unit == "H" ? */}
                    <>
                      <Col className="col-12">
                        <p className={`fs-6 text-black-50 fw-normal`}>
                          {" "}
                          <span className="text-dark fw-bold">
                            Pay gauge
                          </span>{" "}
                          gives you an estimated indication of how attractive
                          the pay you are offering is.
                        </p>
                      </Col>
                    </>
                    {/* : null 
                      }  */}
                  </Row>
                  <hr />
                  <Row>
                    <Col className="col-12">
                      <h4 className="mb-3">
                        Are any forms of benefits offered?
                      </h4>
                      <FormGroup
                        className={`gl-checkbox mb-1 ${styles.benefits_checkbox}`}
                      >
                        <label>
                          <Field
                            type="checkbox"
                            name="salaryBenefits"
                            value="1"
                            onChange={(e) => {
                              e.target.checked
                                ? props.setSalaryBenefits([
                                    ...values.salaryBenefits,
                                    e.target.value,
                                  ])
                                : props.setSalaryBenefits(
                                    values.salaryBenefits.filter((value) =>
                                      value == "1" ? false : true
                                    )
                                  );
                            }}
                          />
                          <img
                            src={
                              process.env.APP_URL +
                              "/images/icon-carparking.svg"
                            }
                            className={`${styles.benefit_icon}`}
                            alt="On-site parking"
                          />
                          <span>On-site parking</span>
                          <span
                            className={`checkmark ${styles.checkmark}`}
                          ></span>{" "}
                        </label>
                      </FormGroup>

                      <FormGroup
                        className={`gl-checkbox mb-1 ${styles.benefits_checkbox}`}
                      >
                        <label>
                          <Field
                            type="checkbox"
                            name="salaryBenefits"
                            value="2"
                            onChange={(e) => {
                              e.target.checked
                                ? props.setSalaryBenefits([
                                    ...values.salaryBenefits,
                                    e.target.value,
                                  ])
                                : props.setSalaryBenefits(
                                    values.salaryBenefits.filter((value) =>
                                      value == "2" ? false : true
                                    )
                                  );
                            }}
                          />
                          <img
                            src={
                              process.env.APP_URL +
                              "/images/icon-companyCar.svg"
                            }
                            className={`${styles.benefit_icon}`}
                            alt="On-site parking"
                          />
                          <span>Company car</span>
                          <span
                            className={`checkmark ${styles.checkmark}`}
                          ></span>{" "}
                        </label>
                      </FormGroup>

                      <FormGroup
                        className={`gl-checkbox mb-1 ${styles.benefits_checkbox}`}
                      >
                        <label>
                          <Field
                            type="checkbox"
                            name="salaryBenefits"
                            value="3"
                            onChange={(e) => {
                              e.target.checked
                                ? props.setSalaryBenefits([
                                    ...values.salaryBenefits,
                                    e.target.value,
                                  ])
                                : props.setSalaryBenefits(
                                    values.salaryBenefits.filter((value) =>
                                      value == "3" ? false : true
                                    )
                                  );
                            }}
                          />
                          <img
                            src={
                              process.env.APP_URL +
                              "/images/icon-medicalallowance.svg"
                            }
                            className={`${styles.benefit_icon}`}
                            alt="On-site parking"
                          />
                          <span>Medical insurance</span>
                          <span
                            className={`checkmark ${styles.checkmark}`}
                          ></span>{" "}
                        </label>
                      </FormGroup>

                      <FormGroup
                        className={`gl-checkbox mb-1 ${styles.benefits_checkbox}`}
                      >
                        <label>
                          <Field
                            type="checkbox"
                            name="salaryBenefits"
                            value="4"
                            onChange={(e) => {
                              e.target.checked
                                ? props.setSalaryBenefits([
                                    ...values.salaryBenefits,
                                    e.target.value,
                                  ])
                                : props.setSalaryBenefits(
                                    values.salaryBenefits.filter((value) =>
                                      value == "4" ? false : true
                                    )
                                  );
                            }}
                          />
                          <img
                            src={
                              process.env.APP_URL + "/images/icon-sickpay.svg"
                            }
                            className={`${styles.benefit_icon}`}
                            alt="On-site parking"
                          />
                          <span>Sick pay</span>
                          <span
                            className={`checkmark ${styles.checkmark}`}
                          ></span>
                        </label>
                      </FormGroup>

                      <FormGroup
                        className={`gl-checkbox mb-1 ${styles.benefits_checkbox}`}
                      >
                        <label>
                          <Field
                            type="checkbox"
                            name="salaryBenefits"
                            value="5"
                            onChange={(e) => {
                              e.target.checked
                                ? props.setSalaryBenefits([
                                    ...values.salaryBenefits,
                                    e.target.value,
                                  ])
                                : props.setSalaryBenefits(
                                    values.salaryBenefits.filter((value) =>
                                      value == "5" ? false : true
                                    )
                                  );
                            }}
                          />
                          <img
                            src={
                              process.env.APP_URL + "/images/icon-uniform.svg"
                            }
                            className={`${styles.benefit_icon}`}
                            alt="On-site parking"
                          />
                          <span>Uniform</span>
                          <span
                            className={`checkmark ${styles.checkmark}`}
                          ></span>
                        </label>
                      </FormGroup>

                      <FormGroup
                        className={`gl-checkbox mb-1 ${styles.benefits_checkbox}`}
                      >
                        <label>
                          <Field
                            type="checkbox"
                            name="salaryBenefits"
                            value="6"
                            onChange={(e) => {
                              e.target.checked
                                ? props.setSalaryBenefits([
                                    ...values.salaryBenefits,
                                    e.target.value,
                                  ])
                                : props.setSalaryBenefits(
                                    values.salaryBenefits.filter((value) =>
                                      value == "6" ? false : true
                                    )
                                  );
                            }}
                          />
                          <img
                            src={
                              process.env.APP_URL +
                              "/images/icon-storediscount.svg"
                            }
                            className={`${styles.benefit_icon}`}
                            alt="On-site parking"
                          />
                          <span> Store discount</span>
                          <span
                            className={`checkmark ${styles.checkmark}`}
                          ></span>
                          {errors.salaryBenefits && touched.salaryBenefits ? (
                            <div>{errors.salaryBenefits}</div>
                          ) : null}
                        </label>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    salary_value: state.vantage.jobPostReducer.salaryValue,
    salary_type: state.vantage.jobPostReducer.salaryType,
    salary_range_min: state.vantage.jobPostReducer.salaryRangeMin,
    salary_range_max: state.vantage.jobPostReducer.salaryRangeMax,
    salary_value_per_unit: state.vantage.jobPostReducer.salaryValuePerUnit,
    salary_benefits: state.vantage.jobPostReducer.salaryBenefits,
    will_report_to_specific_address:
      state.vantage.jobPostReducer.willReportToSpecificAddress,
    will_report_to_work_city: state.vantage.jobPostReducer.willReportToWorkCity,
    will_not_report_to_city: state.vantage.jobPostReducer.WillNotReportToCity,
    type_of_employment: state.vantage.jobPostReducer.typeOfEmployment,
    salary_work_hour_per_week:
      state.vantage.jobPostReducer.salaryWorkHourPerWeek,
    contract: state.vantage.jobPostReducer.contract,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSalaryValue: (salaryValue) => dispatch(setSalaryValue(salaryValue)),
    setSalaryType: (salaryType) => dispatch(setSalaryType(salaryType)),
    setSalaryRangeMin: (salaryRangeMin) =>
      dispatch(setSalaryRangeMin(salaryRangeMin)),
    setSalaryRangeMax: (salaryRangeMax) =>
      dispatch(setSalaryRangeMax(salaryRangeMax)),
    setSalaryValuePerUnit: (salaryValuePerUnit) =>
      dispatch(setSalaryValuePerUnit(salaryValuePerUnit)),
    setSalaryBenefits: (salaryBenefits) =>
      dispatch(setSalaryBenefits(salaryBenefits)),
    setTypeOfEmployment: (typeOfEmployment) =>
      dispatch(setTypeOfEmployment(typeOfEmployment)),

    setContract: (contract) => dispatch(setContract(contract)),
    setSalaryWorkingHoursPerWeek: (workingHours) =>
      dispatch(setSalaryWorkingHoursPerWeek(workingHours)),
    setActiveStep: (activeStep) => dispatch(setActiveStep(activeStep)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Salary);
