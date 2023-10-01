import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import { FormGroup } from "reactstrap";
import { connect } from "react-redux";
import _ from "lodash";
import { Spinner } from "reactstrap";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {
  postJob,
  attachUsersCardToAccount,
  updateJobDataInCaseOfUpdate,
} from "../../../redux/actions/jobPostAction";
import {
  getPaymentMethods,
  paymentSubmitHandler,
  setCardAsDefaultHandler,
  showAddCardHandler,
  deleteCardDetails,
} from "./PaymentHelper";
import styles from "./DeleteCardModal.module.scss";

const PaymentForJobPost = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  // ********** Field states *************
  const [saveCard, setSaveCard] = useState(false);
  const [termsAgree, setTermsAgree] = useState(false);
  const [name, setName] = useState("");
  const [postCode, setPostCode] = useState("");

  // ********** Payment states *************
  const [loading, setLoading] = useState(false);
  const [userPaymentMethods, setUserPaymentMehtods] = useState([]);
  const [usersSelectedMethod, setUsersSelectedMethod] = useState(null);
  const [userhasPaymentMethods, setUserhasPaymentMethods] = useState(null);
  const [cardBrandImage, setCardBrandImage] = useState(null);

  // ********** Add new card screens handling states *************
  const [addNewCard, setAddNewCard] = useState(false);

  // ********** set as default loader ***************
  const [asDefaultLoader, setAsDefaultLoader] = useState(false);

  // ********** delete card modal ***************
  const [showDeleteCardModal, setShowDeleteCardModal] = useState(false);
  const [currentMethod, setCurrentMethod] = useState(null);

  // ********** Error Handling states *************
  const [nameError, setNameError] = useState(false);
  const [postCodeError, setPostCodeError] = useState(false);
  const [cardNumberElementError, setCardNumberElementError] = useState(null);
  const [cardExpiryElementError, setCardExpiryElementError] = useState(null);
  const [cardCvcElementError, setCardCvcElementError] = useState(null);
  const [termsAgreeError, setTermsAgreeError] = useState(false);
  const [usersSelectedMethodError, setUsersSelectedMethodError] =
    useState(null);

  useEffect(async () => {
    setLoading(true);
    await getPaymentMethods(
      props.user_token,
      setUserhasPaymentMethods,
      setUserPaymentMehtods,
      setUsersSelectedMethod
    );
    setLoading(false);
  }, []);

  useEffect(() => {
    setName("");
    setPostCode("");
    setNameError(false);
    setPostCodeError(false);
    setCardNumberElementError(null);
    setCardExpiryElementError(null);
    setCardCvcElementError(null);
    setUsersSelectedMethodError(null);
  }, [addNewCard]);

  if (!stripe || !elements || loading) {
    return (
      <div className="text-center m-auto">
        <Spinner size={"lg"} color={"dark"} />
      </div>
    );
  }

  return (
    <>
      <div className="payment_detail_card mb-2">
        <h4 className="mb-0">Payment Details</h4>
        {!userhasPaymentMethods && (
          <Formik
            enableReinitialize={true}
            initialValues={{
              paymentMethod: usersSelectedMethod,
            }}
            onSubmit={async (values) => {
              let error = false;
              if (!usersSelectedMethod) {
                error = true;
                setUsersSelectedMethodError(true);
              }
              if (!termsAgree && props.showTerms) {
                error = true;
                setTermsAgreeError(true);
              }
              if (!error) {
                props.setSubmitting(true);
                await paymentSubmitHandler(
                  values,
                  stripe,
                  elements,
                  CardNumberElement,
                  name,
                  postCode,
                  props.clientSecret,
                  userhasPaymentMethods,
                  addNewCard,
                  usersSelectedMethod,
                  props.user_token,
                  props.attachUsersCardToAccount,
                  props.goToNext,
                  props.toastMessage,
                  props.user_email
                );
              }
              props.setSubmitting(false);
            }}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form id={!addNewCard && "jobPostPayment"}>
                <div className="position-relative">
                  {asDefaultLoader && (
                    <div className="payment_spinner position-absolute">
                      <Spinner size={"lg"} color={"dark"} />
                    </div>
                  )}
                  {/* {true && <div className='payment_spinner position-absolute'><Spinner size={'lg'} color={'dark'} /></div>} */}
                  <ul className="saved_cards_detail credit_card">
                    {userPaymentMethods.map((method, i) => (
                      <li
                        className={`d-flex align-items-center ${
                          asDefaultLoader && "blur"
                        }`}
                      >
                        <div className="gl-radio form-check mb-0 form-group">
                          <label className="mb-0 d-block  cursor-pointer">
                            <input
                              type="checkbox"
                              value={method.id}
                              checked={method.id == usersSelectedMethod}
                              onChange={(e) => {
                                setUsersSelectedMethodError(null);
                                setFieldValue("paymentMethod", e.target.value);
                                addNewCard &&
                                  setAddNewCard((pre, state) => !pre);
                                setUsersSelectedMethod((pre, state) =>
                                  pre == e.target.value ? null : e.target.value
                                );
                              }}
                            />
                            <span className="font-weight-bold d-flex align-items-center">
                              {/* {method.card.brand} */}
                              <span className={``}>
                                {method.card.brand == "discover" ||
                                method.card.brand == "visa" ||
                                method.card.brand == "mastercard" ||
                                method.card.brand == "diners" ||
                                method.card.brand == "unionpay" ||
                                method.card.brand == "amex" ? (
                                  <img
                                    src={`${process.env.APP_URL}/images/${method.card.brand}.svg`}
                                    width="24px"
                                    height="24px"
                                  />
                                ) : (
                                  <img
                                    src={`${process.env.APP_URL}/images/generic-card.svg`}
                                    width="24px"
                                    height="24px"
                                  />
                                )}
                              </span>
                              <span className="mt-1 ml-2">
                                **** {method.card.last4}
                              </span>
                            </span>

                            <span class="checkmark"></span>
                          </label>
                        </div>
                        <div className="ml-5 d-inline set_default_act">
                          {/* {!method.is_default && <span className='delete' onClick={(e) => {
                                    deleteCardDetails(e, props.user_token, method.id)
                              }}>
                                  <img src={process.env.APP_URL+'/images/bin-delete.svg'} />
                                </span>} */}
                          {
                            <span
                              className={`delete ${
                                method.is_default && "mr-2"
                              }`}
                              onClick={(e) => {
                                setCurrentMethod(method);
                                setShowDeleteCardModal(true);
                                // deleteCardDetails(e, props.user_token, method.id, setAsDefaultLoader,  setUserhasPaymentMethods, setUserPaymentMehtods, setUsersSelectedMethod)
                              }}
                            >
                              <img
                                src={
                                  process.env.APP_URL + "/images/bin-delete.svg"
                                }
                              />
                            </span>
                          }
                          {method.is_default ? (
                            <span className="default"> Default </span>
                          ) : (
                            <span
                              className="default_set cursor-pointer text-primary fw-light mt-md-1 d-inline-block"
                              onClick={(e) =>
                                setCardAsDefaultHandler(
                                  e,
                                  props.user_token,
                                  method.id,
                                  setAsDefaultLoader,
                                  setUserPaymentMehtods,
                                  setUserhasPaymentMethods,
                                  setUsersSelectedMethod,
                                  setAddNewCard
                                )
                              }
                            >
                              {" "}
                              Set as default
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                  {!usersSelectedMethod && usersSelectedMethodError && (
                    <div className="text-danger pl-4 mt-2 ml-1">
                      Please select your card
                    </div>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        )}
        {!userhasPaymentMethods && (
          <h4
            className={`cursor-pointer pb-md-3 pb-2 ${
              !props.showTerms && "border-0"
            } d-flex justify-content-between align-items-center`}
            onClick={() =>
              showAddCardHandler(
                addNewCard,
                setUsersSelectedMethod,
                userPaymentMethods,
                setAddNewCard
              )
            }
          >
            <span className="text-decoration-line">Add new card</span>
            <span>
              <img
                src={process.env.APP_URL + "/images/chevron-down.svg"}
                className={`chevron ${addNewCard ? "open" : ""}`}
              />
            </span>
          </h4>
        )}

        {(addNewCard || userhasPaymentMethods) && (
          <div
            className={`card_detail_box ${!props.showTerms && `border-0 pb-3`}`}
          >
            <Formik
              enableReinitialize={true}
              initialValues={{
                saveCard,
                name,
                postCode,
              }}
              onSubmit={async (values, actions) => {
                props.setSubmitting(true);
                let error = false;
                if (!termsAgree && props.showTerms) {
                  error = true;
                  setTermsAgreeError(true);
                }
                if (name == "") {
                  error = true;
                  setNameError(true);
                }
                if (postCode == "") {
                  error = true;
                  setPostCodeError(true);
                }

                if (
                  cardNumberElementError == null ||
                  cardNumberElementError.empty
                ) {
                  error = true;
                  setCardNumberElementError({
                    empty: true,
                  });
                } else if (cardNumberElementError.error) {
                  error = true;
                  setCardNumberElementError(cardNumberElementError);
                }

                if (
                  cardExpiryElementError == null ||
                  cardExpiryElementError.empty
                ) {
                  error = true;
                  setCardExpiryElementError({
                    empty: true,
                  });
                } else if (cardExpiryElementError.error) {
                  error = true;
                  setCardExpiryElementError(cardExpiryElementError);
                }

                if (cardCvcElementError == null || cardCvcElementError.empty) {
                  error = true;
                  setCardCvcElementError({
                    empty: true,
                  });
                } else if (cardCvcElementError.error) {
                  error = true;
                  setCardCvcElementError(cardCvcElementError);
                }
                if (!error) {
                  await paymentSubmitHandler(
                    values,
                    stripe,
                    elements,
                    CardNumberElement,
                    name,
                    postCode,
                    props.clientSecret,
                    userhasPaymentMethods,
                    addNewCard,
                    usersSelectedMethod,
                    props.user_token,
                    props.attachUsersCardToAccount,
                    props.goToNext,
                    props.toastMessage,
                    props.user_email
                  );
                }
                props.setSubmitting(false);
              }}
            >
              {({ errors, touched, values, setFieldValue }) => (
                <Form
                  id={(addNewCard || userhasPaymentMethods) && "jobPostPayment"}
                >
                  <div className="row">
                    <div className="col-12">
                      <FormGroup className="gl-input-simple form-group  mb-3">
                        <Field
                          type="text"
                          maxLength="50"
                          className="form-control"
                          value={name}
                          placeholder="Name on card"
                          onChange={(e) => {
                            setName(e.target.value);
                            setNameError(false);
                          }}
                        />
                        {nameError && (
                          <div className="text-danger">
                            Please enter your name on card
                          </div>
                        )}
                      </FormGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-8">
                      <FormGroup className="gl-input-simple form-group position-relative  mb-3">
                        <CardNumberElement
                          onChange={(e) => {
                            setCardBrandImage(e.brand);
                            setCardNumberElementError(e);
                          }}
                        />
                        {cardBrandImage == "discover" ||
                        cardBrandImage == "visa" ||
                        cardBrandImage == "mastercard" ||
                        cardBrandImage == "diners" ||
                        cardBrandImage == "unionpay" ||
                        cardBrandImage == "amex" ? (
                          <span className={`foundCard`}>
                            <img
                              src={`${process.env.APP_URL}/images/${cardBrandImage}.svg`}
                              width="35px"
                              height="35px"
                            />
                          </span>
                        ) : null}
                        {cardNumberElementError?.error && (
                          <div className="text-danger">
                            {cardNumberElementError?.error?.message}
                          </div>
                        )}
                        {cardNumberElementError?.empty && (
                          <div className="text-danger">
                            Please enter your card number
                          </div>
                        )}
                      </FormGroup>
                    </div>
                    <div className="col-12 col-md-4  mb-3">
                      <CardExpiryElement
                        className={""}
                        onChange={(e) => {
                          setCardExpiryElementError(e);
                        }}
                        placeHolder="CVC"
                      />
                      {cardExpiryElementError?.error && (
                        <div className="text-danger">
                          {cardExpiryElementError?.error?.message}
                        </div>
                      )}
                      {cardExpiryElementError?.empty && (
                        <div className="text-danger">
                          Please enter your card expiry date
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-4">
                      <FormGroup className="gl-input-simple form-group mb-3">
                        <CardCvcElement
                          className={""}
                          onChange={(e) => {
                            setCardCvcElementError(e);
                          }}
                        />
                        {cardCvcElementError?.error && (
                          <div className="text-danger">
                            {cardCvcElementError?.error?.message}
                          </div>
                        )}
                        {cardCvcElementError?.empty && (
                          <div className="text-danger">
                            Please enter your card cvc number
                          </div>
                        )}
                      </FormGroup>
                    </div>
                    <div className="col-12 col-md-5">
                      <FormGroup className="gl-input-simple  mb-3">
                        <Field
                          type="text"
                          className="form-control"
                          value={postCode}
                          placeholder="Postcode"
                          onChange={(e) => {
                            setPostCode(e.target.value);
                            setPostCodeError(false);
                          }}
                        />

                        {postCodeError && (
                          <div className="text-danger">
                            Please enter postcode
                          </div>
                        )}
                      </FormGroup>
                    </div>
                  </div>

                  {/* <FormGroup className="gl-checkbox form-check mb-1">
                    <label className="form-check-label">
                      <Field
                        type="checkbox"
                        className="form-check-input"
                        checked={saveCard && "checked"}
                        onChange={(e) => {
                          setSaveCard(e.target.checked);
                        }}
                      />
                      <span>Save card for future purchases</span>
                      <span className="checkmark"></span>
                    </label>
                  </FormGroup> */}
                </Form>
              )}
            </Formik>
          </div>
        )}
        {props.showTerms && (
          <div className="agrement_box mt-3">
            <div className="gl-checkbox form-group mb-2">
              <label className="form-check-label ">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={termsAgree && "checked"}
                  onChange={(e) => {
                    setTermsAgreeError(false);
                    setTermsAgree(e.target.checked);
                  }}
                />
                <span>
                  I agree to the Get Licensed terms and Training provider{" "}
                  <a
                    href="https://www.get-licensed.co.uk/terms"
                    target="_blank"
                  >
                    terms and conditions.
                  </a>
                </span>
                <span className="checkmark"></span>
              </label>
              {termsAgreeError && (
                <div className="text-danger">
                  You must agree to terms and conditions
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={showDeleteCardModal}
        className={`discardModal`}
        backdrop="static"
        keyboard={false}
      >
        <div className={`${styles.deleteTeamModal}`}>
          <ModalHeader className="w-100">
            <h2 className={`m-0`}>Delete Payment Card</h2>
          </ModalHeader>
          <ModalBody>
            <div className={`${styles.deleteModalBody}`}>
              <p>
                Please confirm the changes, you can’t redo this again. Are you
                sure want to delete this card permanently from your account?{" "}
              </p>
            </div>
            <div className={`${styles.modalFooter}`}>
              <button
                onClick={(e) => {
                  setShowDeleteCardModal(false);
                }}
                type="submit"
                className={`btn btn-sm btn-secondary py-2 px-3 w-100 w-md-auto ${styles.button}`}
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  setShowDeleteCardModal(false);
                  deleteCardDetails(
                    e,
                    props.user_token,
                    currentMethod.id,
                    setAsDefaultLoader,
                    setUserhasPaymentMethods,
                    setUserPaymentMehtods,
                    setUsersSelectedMethod
                  );
                }}
                type="submit"
                className={`btn btn-sm btn-danger py-2 px-3 w-100 w-md-auto ${styles.danger}`}
              >
                Yes, Delete it
              </button>
            </div>
          </ModalBody>
        </div>
      </Modal>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    user_token: state.vantage.userDataReducer.user_token,
    job_title: state.vantage.jobPostReducer.jobTitle,
    company_name: state.vantage.userDataReducer.user_name,
    job_description: state.vantage.jobPostReducer.editor,
    venue_type: state.vantage.jobPostReducer.venueType,
    specific_address: state.vantage.jobPostReducer.willReportToSpecificAddress,
    google_city_town: state.vantage.jobPostReducer.WillNotReportToCity,
    google_post_code: state.vantage.jobPostReducer.WillNotReportToPostCode,
    loqate_address_line_one:
      state.vantage.jobPostReducer.willReportToWorkaddress1,
    loqate_address_line_two:
      state.vantage.jobPostReducer.willReportToWorkaddress2,
    loqate_city_town: state.vantage.jobPostReducer.willReportToWorkCity,
    loqate_postal_code: state.vantage.jobPostReducer.willReportToWorkPostCode,
    // street_address: state.vantage.jobPostReducer.settingsEmail,
    salary_benefits: state.vantage.jobPostReducer.salaryBenefits,
    salary_pay: state.vantage.jobPostReducer.salaryValue,
    salary_per_unit: state.vantage.jobPostReducer.salaryValuePerUnit,
    is_license_required: state.vantage.jobPostReducer.radio,
    license_required: state.vantage.jobPostReducer.SIALicense,
    contract_type: state.vantage.jobPostReducer.contract,
    daily_updates_about_this_job_email:
      state.vantage.jobPostReducer.settingsEmail,
    type_of_employment: state.vantage.jobPostReducer.typeOfEmployment,
    venue_type: state.vantage.jobPostReducer.venueType,
    is_immediate: state.vantage.jobPostReducer.is_immediate,
    shift_schedule: state.vantage.jobPostReducer.shift_schedule,
    shift_timing: state.vantage.jobPostReducer.shift_timing,
    center_for_google_map: state.vantage.jobPostReducer.centerForMapGoogle,
    show_job_preview: state.vantage.jobPostReducer.showJobPostPreview,
    salary_work_hour_per_week:
      state.vantage.jobPostReducer.salaryWorkHourPerWeek,
    job_ref_number: state.vantage.jobPostReducer.refNumber,
    client_secret: state.vantage.jobPostReducer.clientSecret,
    user_email: state.vantage.userDataReducer.user_email,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postJob: (data, user_token) => dispatch(postJob(data, user_token)),
    attachUsersCardToAccount: (user_token, pm, is_default) =>
      dispatch(attachUsersCardToAccount(user_token, pm, is_default)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForJobPost);
