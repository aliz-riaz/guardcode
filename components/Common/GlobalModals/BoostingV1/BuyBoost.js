import React, { Children, useEffect, useState } from "react";
import styles from "./JobPostLimitExceed.module.scss";
import { connect } from "react-redux";
import {
  setBuyBoostModalStatus,
  fetchMatchingCandidatesForBoost,
  setMatchingCandidates,
  setBoostConfirmationModal,
} from "../../../../redux/actions/billingAction";
import {
  setBillingPlan,
  setActiveStep,
  setDataAfterBuyBoostCreditJobPost,
} from "../../../../redux/actions/jobPostAction";
import useUserCardList from "../../../../hooks/Billing/useUserCardList";
import useBuyBoostCreditsForExistingJob from "../../../../hooks/Billing/useBuyBoostCreditsForExistingJob";
import useBuyBoostCreditsForJobPosting from "../../../../hooks/Billing/useBuyBoostCreditsForJobPosting";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useStripe } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import SuccessModal from "../Boosting/SuccessModal";
import { Spinner } from "reactstrap";
import ChangeCardModalForBoost from "./ChangeCard/ChangeCardModalForBoost";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

function StripElementWrapper({ children, modalStateHandler, getUserJobsList }) {
  return (
    <Elements stripe={stripePromise}>
      <ConnectedBuyBoost getUserJobsList={getUserJobsList} />
    </Elements>
  );
}

function BuyBoost(props) {
  const { data, isLoading } = useUserCardList();

  const {
    mutate: useBuyBoostCreditsForExistingJobMutate,
    isLoading: isBuyBoostCreditsForExistingJobLoading,
  } = useBuyBoostCreditsForExistingJob();

  const {
    mutate: useBuyBoostCreditsForJobPostingMutate,
    isLoading: isBuyBoostCreditsForJobPostingLoading,
  } = useBuyBoostCreditsForJobPosting();

  const stripe = useStripe();

  const [clientSecret, setClientSecret] = useState(null);

  const [showSuccessModal, setSuccessModal] = useState(false);

  const [isReqestSend, setIsRequestSend] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(async () => {
    if (props.isUserInJobPostingFlow == false) {
      useBuyBoostCreditsForExistingJobMutate(
        props.boostJobId ? props.boostJobId : props.draftLatestJobId,
        {
          onSuccess: (data) => {
            setClientSecret(data.client_secret);
          },
        }
      );
    } else if (props.isUserInJobPostingFlow) {
      const postData = {
        title: props.job_title,
        ref_number: props.job_ref_number,
        employment_type: props.type_of_employment,
        license_course_id: props.license_required,
        contract_type: props.contract_type,
        venue_type:
          props.venue_type == "Other"
            ? props.venue_type_other_value
            : props.venue_type,
        is_immediate: props.is_immediate,
        shift_schedule: props.shift_schedule,
        shift_timings: props.shift_timing,
        description: props.job_description,
        is_report_specific_address: props.specific_address == "yes" ? 1 : 0,
        address:
          props.specific_address == "yes" ? props.loqate_address_line_one : "",
        address2:
          props.specific_address == "yes" ? props.loqate_address_line_two : "",
        city:
          props.specific_address == "yes"
            ? props.loqate_city_town
            : props.google_city_town,
        // city: "London",
        postal_code:
          props.specific_address == "yes"
            ? props.loqate_postal_code
            : props.google_post_code,
        salary_type: props.salary_type,
        salary: props.salary_type == "Fixed Rate" ? props.salary_pay : null,
        salary_min:
          props.salary_type == "Fixed Rate" ? null : props.salary_range_min,
        salary_max:
          props.salary_type == "Fixed Rate" ? null : props.salary_range_max,
        pay_frequency: props.salary_per_unit,
        benefit_id: props.salary_benefits,
        updating_email: props.daily_updates_about_this_job_email,
        latitude:
          props.specific_address == "yes"
            ? props.center_for_map_loqate.lat
            : props.center_for_google_map.lat,
        longitude:
          props.specific_address == "yes"
            ? props.center_for_map_loqate.lng
            : props.center_for_google_map.lng,
        working_hours: props.salary_work_hour_per_week,
        should_boost: 1,
      };

      if (
        (props.saveJobAsTemplate && props.fromJobTemplate === false) ||
        (props.updateJobTemplate &&
          props.fromJobTemplate &&
          props.saveJobAsTemplate)
      ) {
        postData.save_job_as_template = props.saveJobAsTemplate;
        postData.is_available_for_team = props.isAvailableForTeam;
        postData.template_name = props.jobTemplate.name;
      } else if (
        props.updateJobTemplate &&
        props.fromJobTemplate &&
        props.saveJobAsTemplate == false
      ) {
        postData.update_job_template = Number(props.updateJobTemplate);
        postData.is_available_for_team = props.isAvailableForTeam;
        postData.template_name = props.jobTemplate.name;
        postData.template_id = props.templateId;
      }

      // ===> add keys into api call for draft <===
      if (props.is_job_draft) {
        // ===> this block will run when user post job with draft template <===
        postData.draft_template_id = props.templateId;
      }

      useBuyBoostCreditsForJobPostingMutate(postData, {
        onSuccess: (data) => {
          setClientSecret(data.client_secret);
          props.setDataAfterBuyBoostCreditJobPost(data);
        },
      });
    }

    const boostApiPayload = {
      latitude: props.center_for_google_map.lat,
      longitude: props.center_for_google_map.lng,
    };

    if (props.boostJobId) {
      boostApiPayload.job_id = props.boostJobId;
    }

    await props.fetchMatchingCandidatesForBoost(
      props.user_token,
      boostApiPayload
    );
  }, []);

  useEffect(() => {
    if (!isLoading && data[0]?.is_default) {
      setSelectedCard({
        cardBrand: data[0]?.card.brand,
        cardLast4: data[0]?.card.last4,
        paymentMethod: data[0]?.id,
      });
    }
  }, [isLoading]);

  const stripPaymentHandler = async () => {
    setIsRequestSend(true);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: selectedCard.paymentMethod,
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      toast.error(result.error.message, {
        autoClose: false,
      });
    } else {
      setSuccessModal(true);
    }
    setIsRequestSend(false);
  };

  const [isCardChangeModalOpen, setIsCardChangeModalOpen] = useState(false);

  return (
    <>
      <div className={styles.modal_wrap}>
        <div className={styles.modal_header}>
          <button
            onClick={(e) => {
              e.preventDefault();
              props.setBuyBoostModalStatus(false);
              // props.setMatchingCandidates({});
              props.setBillingPlan([]);
              props.setBoostConfirmationModal(false);
            }}
          >
            <img
              src={process.env.APP_URL + "/images/arrow-left.svg"}
              alt="arrow"
              className="img-fluid"
            />
            Back
          </button>
        </div>
        <div className={`${styles.alert_wrap} mb-3 font-roboto`}>
          <p>
            <img
              src={process.env.APP_URL + "/images/alert-icon.svg"}
              height={20}
              width={20}
            />
            You are out of boost! Buy boost credits to instantly reach
            {props.boostMatchingCandidatesList?.first_three_applilcants?.map(
              (list, index) =>
                ` ${list.fullname.trim()}${index == 2 ? "" : ","} `
            )}{" "}
            and {props.boostMatchingCandidatesList?.remaining_market} other
            candidates who match with your job post !
          </p>
        </div>
        <div className={`${styles.content} pt-0`}>
          <h3>Summary</h3>
          <div className={styles.summary_content}>
            <div className="row align-items-start mx-0 py-1 px-2">
              <div className="col-lg-6">
                <h4>
                  Extra Boost{" "}
                  <img
                    src={process.env.APP_URL + "/images/bolt-dark.svg"}
                    height={20}
                    width={20}
                  />
                  <span className="d-block">You add an extra boost</span>
                </h4>
              </div>
              <div className="col-lg-6 text-right">
                <strong className="d-inline-block mt-2">+ £2.85</strong>
              </div>
            </div>
            {isLoading ? (
              <div>Loading...</div>
            ) : selectedCard ? (
              <div className="row align-items-center mt-3 mx-0 py-1 px-2">
                <div className="col-lg-6">
                  <h4>
                    <span className="d-block">Card Information</span>
                    {selectedCard.cardBrand} ending in {selectedCard.cardLast4}
                  </h4>
                </div>
                <div className="col-lg-6 text-right">
                  <button
                    className={styles.card_change_btn}
                    onClick={() => setIsCardChangeModalOpen(true)}
                  >
                    Change card
                    {selectedCard.cardBrand == "discover" ||
                    selectedCard.cardBrand == "visa" ||
                    selectedCard.cardBrand == "mastercard" ||
                    selectedCard.cardBrand == "diners" ||
                    selectedCard.cardBrand == "unionpay" ||
                    selectedCard.cardBrand == "amex" ? (
                      <img
                        src={`${process.env.APP_URL}/images/${selectedCard.cardBrand}.svg`}
                        height={30}
                        width={50}
                      />
                    ) : (
                      <img
                        src={`${process.env.APP_URL}/images/generic-card.svg`}
                        height={30}
                        width={50}
                      />
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="row align-items-center mt-3 mx-0 py-1 px-2">
                <div className="col-lg-6">
                  <h4>No card added yet</h4>
                </div>
                <div className="col-lg-6 text-right">
                  <button
                    className={styles.card_change_btn}
                    onClick={() => setIsCardChangeModalOpen(true)}
                  >
                    Add new card
                  </button>
                </div>
              </div>
            )}
            <hr />
            <div className="row align-items-center mt-4 mx-0 px-2">
              <div className="col-6">
                <h2 className={styles.vat_title}>VAT</h2>
              </div>
              <div className="col-6 text-right">
                <h5 className={styles.vat_price}>
                  {"+ £0.57"}
                </h5>
              </div>
            </div>
            <div className="row align-items-center mt-3 mx-0 px-2">
              <div className="col-6">
                <h2>Total</h2>
              </div>
              <div className="col-6 text-right">
                <h5>
                  £3.42 {" "}
                  <span className="d-block">
                    {props.billingPlan?.price?.interval} plan
                  </span>
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.button_wrap}>
          <button
            disabled={
              !selectedCard ||
              isBuyBoostCreditsForExistingJobLoading ||
              isBuyBoostCreditsForJobPostingLoading
            }
            onClick={stripPaymentHandler}
          >
            Pay now: £3.42 {isReqestSend && <Spinner size={"sm"} />}
          </button>
          {/* {isPaymentIndentLoading || isLoading || (selectedCard && false) ? (
            <button disabled={true}>
              Pay now: £2.85 {isReqestSend && <Spinner size={"sm"} />}
            </button>
          ) : (
            <button
              // disabled={
              //   isLoading || isPaymentIndentLoading || selectedCard
              //     ? false
              //     : true
              // }
              onClick={stripPaymentHandler}
            >
              Pay now: £2.85 {isReqestSend && <Spinner size={"sm"} />}
            </button>
          )} */}
        </div>
      </div>
      <SuccessModal
        showSuccessModal={showSuccessModal}
        setSuccessModal={setSuccessModal}
        setBuyBoostModalStatus={props.setBuyBoostModalStatus}
        getUserJobsList={props.getUserJobsList}
        isUserInJobPostingFlow={props.isUserInJobPostingFlow}
        setActiveStep={props.setActiveStep}
        setBoostConfirmationModal={props.setBoostConfirmationModal}
      />
      <ChangeCardModalForBoost
        showModal={isCardChangeModalOpen}
        setShowModal={setIsCardChangeModalOpen}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  billingPlan: state.vantage.jobPostReducer.billingPlan,
  center_for_google_map: state.vantage.jobPostReducer.centerForMapGoogle,
  boostJobId: state.vantage.billingReducer.boostJobId,
  boostMatchingCandidatesList:
    state.vantage.billingReducer.boostMatchingCandidatesList,
  draftLatestJobId: state.vantage.jobPostReducer.draftLatestJobId,
  isUserInJobPostingFlow: state.vantage.jobPostReducer.isUserInJobPostingFlow,

  buyBoostModal: state.vantage.billingReducer.buyBoostModal,

  job_title: state.vantage.jobPostReducer.jobTitle,
  company_name: state.vantage.userDataReducer.user_name,
  job_description: state.vantage.jobPostReducer.editor,
  venue_type: state.vantage.jobPostReducer.venueType,
  venue_type_other_value: state.vantage.jobPostReducer.venueTypeOtherValue,
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
  salary_type: state.vantage.jobPostReducer.salaryType,
  salary_range_min: state.vantage.jobPostReducer.salaryRangeMin,
  salary_range_max: state.vantage.jobPostReducer.salaryRangeMax,
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
  salary_work_hour_per_week: state.vantage.jobPostReducer.salaryWorkHourPerWeek,
  job_ref_number: state.vantage.jobPostReducer.refNumber,
  client_secret: state.vantage.jobPostReducer.clientSecret,
  payment_intent: state.vantage.jobPostReducer.paymentIntent,
  avalible_connects: state.vantage.jobPostReducer.availableConnects,
  saveJobAsTemplate: state.vantage.jobPostReducer.saveJobAsTemplate,
  isAvailableForTeam: state.vantage.jobPostReducer.isAvailableForTeam,
  jobTemplate: state.vantage.jobPostReducer.jobTemplate,
  updateJobTemplate: state.vantage.jobPostReducer.updateJobTemplate,
  templateId: state.vantage.jobPostReducer.templateId,
  fromJobTemplate: state.vantage.jobPostReducer.fromJobTemplate,
  is_job_draft: state.vantage.jobPostReducer.is_job_draft,
  center_for_map_loqate: state.vantage.jobPostReducer.centerForMapLoqate,
});

const mapDispatchToProps = (dispatch) => ({
  setBuyBoostModalStatus: (status) => dispatch(setBuyBoostModalStatus(status)),
  setBillingPlan: (status) => dispatch(setBillingPlan(status)),
  fetchMatchingCandidatesForBoost: (user_token, data) =>
    dispatch(fetchMatchingCandidatesForBoost(user_token, data)),
  setMatchingCandidates: (data) => dispatch(setMatchingCandidates(data)),
  setActiveStep: (activeStep) => dispatch(setActiveStep(activeStep)),
  setBoostConfirmationModal: (status) =>
    dispatch(setBoostConfirmationModal(status)),
  setDataAfterBuyBoostCreditJobPost: (data) =>
    dispatch(setDataAfterBuyBoostCreditJobPost(data)),
});

const ConnectedBuyBoost = connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyBoost);
export default StripElementWrapper;
