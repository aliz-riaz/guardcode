import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import styles from "./AddOrganisation.module.scss";
import { useRouter } from "next/router";
import { fetchCompanyNameSuggestions } from "../../redux/actions/signup";
import { createNewOrganisation } from "../../redux/actions/organisationAction";
import { Spinner } from "reactstrap";

const createOrganisationSchema = Yup.object().shape({
  mobileNumber: Yup.string()
    .required("Please enter phone number")
    .test(
      "len",
      "Please enter a valid mobile number",
      (val) => val?.toString()?.length >= 10 && val?.toString()?.length <= 12
    ),
  companySize: Yup.string().required("Please select company size"),
  companyName: Yup.string().required("Please enter company name"),
});

const AddOrganisation = (props) => {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState();
  const [companySize, setCompanySize] = useState();
  const [companyName, setCompanyName] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [showCompanySuggestions, setShowCompanySuggestions] = useState(false);

  return (
    <Modal className={`${styles.organisation_modal}`} show={props.show}>
      <Modal.Body className={`${styles.organisation_body} py-4 px-4`}>
        <div className="position-relative">
          <h2 className="text-center pb-2 fw-bold">Create New Organisation</h2>
          <div
            className={`${styles.close} position-absolute cursor-pointer`}
            onClick={props.cancelHandler}
          >
            <img
              src={`${process.env.APP_URL}/images/cancel.svg`}
              className="img-fluid"
            />
          </div>
        </div>
        <div className={`${styles.create_form} pt-4`}>
          <Formik
            enableReinitialize={true}
            initialValues={{
              fullName: `${props.decision_maker_first_name} ${props.decision_maker_last_name}`,
              email: props.user_email,
              mobileNumber: props.employers_mobile_number
                ? props.employers_mobile_number
                : mobileNumber,
              companySize: companySize,
              companyName: companyName,
            }}
            validationSchema={createOrganisationSchema}
            onSubmit={async (values, actions) => {
              setIsLoading(true);
              actions.setSubmitting(false);
              const { data, request_status } =
                await props.createNewOrganisation(props.user_token, {
                  title: values.companyName,
                  company_size: values.companySize,
                  mobile_number: values.mobileNumber,
                });
              if (request_status) {
                router.push("/organisation");
                props.setOrganisationModal(false);
              }
              actions.setSubmitting(true);
              setIsLoading(false);
            }}
          >
            {({ errors, values, touched, isSubmitting, setFieldValue }) => (
              <Form>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="form-group gl-input-simple mb-3">
                      <label className="fw-bold">Full Name</label>
                      <input
                        type={`text`}
                        placeholder="Full Name"
                        name="fullName"
                        value={`${props.decision_maker_first_name} ${props.decision_maker_last_name}`}
                        className={`form-control ${styles.disabled}`}
                        disabled={true}
                      />
                      {errors.fullName && touched.fullName ? (
                        <div className="error text-danger mt-1">
                          {errors.fullName}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="form-group gl-input-simple mb-3">
                      <label className="fw-bold">Email</label>
                      <input
                        type={`text`}
                        name="email"
                        value={props.user_email}
                        placeholder="Email"
                        className={`form-control ${styles.disabled}`}
                        disabled={true}
                      />
                      {errors.email && touched.email ? (
                        <div className="error text-danger mt-1">
                          {errors.email}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="form-group gl-input-simple mb-3">
                      <label className="fw-bold">Mobile Number</label>
                      <input
                        type={`text`}
                        placeholder="Mobile Number"
                        name="mobileNumber"
                        value={
                          props.employers_mobile_number
                            ? props.employers_mobile_number
                            : mobileNumber
                        }
                        className={`form-control ${
                          props.employers_mobile_number && styles.disabled
                        }`}
                        disabled={props.employers_mobile_number ? true : false}
                        onChange={(e) => {
                          setMobileNumber(e.target.value);
                        }}
                      />
                      {errors.mobileNumber && touched.mobileNumber ? (
                        <div className="error text-danger mt-1">
                          {errors.mobileNumber}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="gl-input-simple mb-3">
                      <label className="fw-bold">Company Size</label>
                      <Field
                        className="form-control"
                        as="select"
                        name="companySize"
                        value={companySize}
                        onChange={(e) => setCompanySize(e.target.value)}
                      >
                        <option value="">Company Size</option>
                        <option value="Company (1-5 employees)">
                          Company (1-5 employees)
                        </option>
                        <option value="Company (6-10 employees)">
                          Company (6-10 employees)
                        </option>
                        <option value="Company (11-20 employees)">
                          Company (11-20 employees)
                        </option>
                        <option value="Company (21-50 employees)">
                          Company (21-50 employees)
                        </option>
                        <option value="Company (51-100 employees)">
                          Company (51-100 employees)
                        </option>
                        <option value="Company (101-250 employees)">
                          Company (101-250 employees)
                        </option>
                        <option value="Company (501-3,500 employees)">
                          Company (501-3,500 employees)
                        </option>
                        <option value="Recruiting Firm">Recruiting Firm</option>
                        <option value="Staffing Agency">Staffing Agency</option>
                      </Field>
                      {errors.companySize && touched.companySize ? (
                        <div className="error text-danger mt-1">
                          {errors.companySize}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="form-group gl-input-simple">
                      <label className="fw-bold">Company Name</label>
                      <input
                        type="text"
                        name="companyName"
                        value={companyName}
                        className="form-control"
                        placeholder="Company Name"
                        autoComplete="off"
                        onChange={async (e) => {
                          setCompanyName(e.target.value);
                          if (e.target.value?.length >= 3) {
                            setShowCompanySuggestions(true);
                            props.fetchCompanyNameSuggestions(e.target.value);
                          }
                        }}
                      />

                      {errors.companyName && touched.companyName ? (
                        <div className="text-danger mt-1">
                          {errors.companyName}
                        </div>
                      ) : null}
                      {showCompanySuggestions &&
                      props.compnay_name_suggestions?.length > 0 ? (
                        <>
                          <div
                            className={`custom-dropdown ${styles.custom_dropdown}`}
                          >
                            <div className="close_dropdown m-2">
                              <img
                                src={
                                  process.env.APP_URL + "/images/c-remove.svg"
                                }
                                onClick={() => setShowCompanySuggestions(false)}
                                className="cursor-pointer"
                              />
                            </div>

                            <ul className="pt-4">
                              {props.compnay_name_suggestions?.map(
                                (company) => {
                                  return (
                                    <li
                                      onClick={() => {
                                        setCompanyName(company);
                                        setShowCompanySuggestions(false);
                                      }}
                                    >
                                      {company}
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  {/* <button
                    type="button"
                    className="btn btn-light btn-md py-2 px-4 fw-medium "
                    onClick={props.cancelHandler}
                  >
                    <img src={`${process.env.APP_URL}/images/left-arrow.svg`} />
                    <span className="ml-3">Back</span>
                  </button> */}
                  <button
                    type="submit"
                    className="btn btn-green btn-md py-2 px-4 fw-medium"
                    disabled={isLoading}
                  >
                    Create
                    {isLoading && (
                      <Spinner
                        className="ml-2"
                        animation="border"
                        size={"sm"}
                      />
                    )}
                    {/* {true && <Spinner className="ml-2" animation="border" size={"sm"} />} */}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  decision_maker_first_name:
    state.vantage.userDataReducer.decision_maker_first_name,
  decision_maker_last_name:
    state.vantage.userDataReducer.decision_maker_last_name,
  user_email: state.vantage.userDataReducer.user_email,
  employers_mobile_number: state.vantage.userDataReducer.user_mobile_number,

  compnay_name_suggestions: state.vantage.commonReducer.companyNameSuggestion,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCompanyNameSuggestions: (companyName) =>
    dispatch(fetchCompanyNameSuggestions(companyName)),
  createNewOrganisation: (userToken, FormData) =>
    dispatch(createNewOrganisation(userToken, FormData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddOrganisation);
