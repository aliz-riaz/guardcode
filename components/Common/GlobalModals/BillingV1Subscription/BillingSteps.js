import styles from "./BillingSteps.module.scss";
import { Form, FormGroup, Spinner } from "react-bootstrap";
import { Field } from "formik";
import { useIntercom } from "react-use-intercom";

import useCustomPackages from "../../../../hooks/Billing/useCustomPackages";
import useSelectedPlan from "../../../../hooks/Billing/useSelectedPlan";
import useUserCardList from "../../../../hooks/Billing/useUserCardList";
import useSaveNewCard from "../../../../hooks/Billing/useSaveNewCard";
import useSubscription from "../../../../hooks/Billing/useSubscription";
import { useState } from "react";
import { connect } from "react-redux";
import {
  setSelectedPlan,
  setPlanIntervalSwitchValue,
  setSelectedPaymentMethod,
  setCurrentBillingModalStep,
  setSelectedCardBrand,
  setSelectedCardEndingIn,
  resetBillingReducer,
} from "../../../../redux/actions/billingAction";
import { setJobPostingLimitEnd } from "../../../../redux/actions/jobPostAction";
import {
  StepOneFooter,
  StepOneLoadingState,
  SubscriptionFailModal,
  SubscriptionSuccessModal,
  UsersCardsList,
} from "./UI";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useQueryClient } from "@tanstack/react-query";
const mapStateToProps = (state) => ({
  selectedPlan: state.vantage.billingReducer.selectedPlan,
  switchValue: state.vantage.billingReducer.switchValue,
  selectedPaymentMethod: state.vantage.billingReducer.selectedPaymentMethod,
  user_email: state.vantage.userDataReducer.user_email,
  selectedCardBrand: state.vantage.billingReducer.selectedCardBrand,
  nextPaymentDate: state.vantage.billingReducer.nextPaymentDate,
  selectedCardEndingIn: state.vantage.billingReducer.selectedCardEndingIn,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedPlan: (plan) => dispatch(setSelectedPlan(plan)),
  setCurrentBillingModalStep: (step) =>
    dispatch(setCurrentBillingModalStep(step)),
  setPlanIntervalSwitchValue: (status) =>
    dispatch(setPlanIntervalSwitchValue(status)),
  setSelectedPaymentMethod: (pm) => dispatch(setSelectedPaymentMethod(pm)),
  resetBillingReducer: (pm) => dispatch(resetBillingReducer(pm)),

  setSelectedCardBrand: (brand) => dispatch(setSelectedCardBrand(brand)),
  setSelectedCardEndingIn: (endingIn) =>
    dispatch(setSelectedCardEndingIn(endingIn)),
  setJobPostingLimitEnd: (status) => dispatch(setJobPostingLimitEnd(status)),
});

const ConnectedStep1 = ({
  switchValue,
  setPlanIntervalSwitchValue,
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  isValid,
  setFieldValue,
  selectedPlan,
  setSelectedPlan,
  resetBillingReducer,
  nextPaymentDate,
}) => {
  const { data, isLoading, error } = useCustomPackages(
    switchValue ? "year" : "month"
  );

  const { show } = useIntercom();

  // const [selectedPlan, setSelectedPlan] = useState(null);
  return (
    <div className={styles.billing_steps}>
      <div className={`row mt-2 mb-3`}>
        <div className="col-lg-8">
          <h2>
            Change Plan
            <span>
              Modify your subscription plan, choose the best option for you!
            </span>
          </h2>
        </div>
        <div className="col-lg-4">
          <div>
            <div className={styles.change_plan}>
              <span>Pay Monthly</span>
              <div className="gl-switch-btn m-0">
                <input
                  type="checkbox"
                  hidden="hidden"
                  id="access"
                  onChange={() => {
                    setPlanIntervalSwitchValue(!switchValue);
                    setSelectedPlan(null);
                  }}
                  checked={switchValue ? true : false}
                />
                <label className="mb-0 switch" for="access"></label>
              </div>
              <span>Pay Yearly</span>
            </div>
            <div className={styles.save_price}>
              <span>Save 25%</span>
              <img
                src={process.env.APP_URL + "/images/plan-arrow.svg"}
                alt="icon"
              />
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <StepOneLoadingState />
      ) : (
        <>
          <Form.Group
            controlId="formPlan"
            className={`row ${styles.row_container}`}
          >
            {data.all_plans.map((plan) => (
              <div className="col-md-6">
                <div
                  key={plan.id}
                  className={`${styles.select_plan} ${
                    selectedPlan?.id === plan.id && styles.selected
                  } ${plan.is_free ? styles.disabled : ""}`}
                >
                  {!!plan.is_popular && (
                    <span className={styles.most_popular}>
                      #MostPopular
                      <img
                        src={process.env.APP_URL + "/images/trend-up-white.svg"}
                        alt="icon"
                      />
                    </span>
                  )}
                  {!!plan.is_enterprise && (
                    <span className={styles.enterprise}>
                      #Enterprise{" "}
                      <img
                        src={process.env.APP_URL + "/images/infinite-white.svg"}
                        alt="icon"
                      />
                    </span>
                  )}
                  <input
                    type="radio"
                    // label={`${plan.title}`}
                    name="plan"
                    value={selectedPlan?.id ?? ""}
                    checked={selectedPlan?.id === plan.id ? true : false}
                    onChange={() => {
                      // setFieldValue("plan", plan.id);
                      setSelectedPlan(plan);
                    }}
                    disabled={plan.is_free ? true : false}
                    onBlur={handleBlur}
                    // isInvalid={!!errors.plan && touched.plan}
                  />
                  <div className={styles.plan_pricing}>
                    <p>{plan.title}</p>
                    <h3>
                      &#163;{plan.pricing[0]?.amount}
                      <span>/{plan.pricing[0]?.interval}</span>
                    </h3>
                    {!!plan.is_current && (
                      <span className={styles.current_plan}>Current Plan</span>
                    )}
                  </div>
                  <div className={styles.body}>
                    <p>
                      Includes up to{" "}
                      <strong>{plan.pricing[0]?.job_posting_credits} </strong>
                      job posting,{" "}
                      <strong>{plan.pricing[0]?.boost_credits}</strong> Boost,
                      &nbsp;
                      <strong>{plan.pricing[0]?.cv_views_credits}</strong> CV
                      search views.
                    </p>
                    <ul>
                      <li>SIA licence checks</li>
                      <li>Access to video profiles</li>
                      <li>Unlimited real-time chat</li>
                      <li>Multi-user access</li>
                      <li>Branded job posts</li>
                      <li>Company profile page</li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}

            {data.all_plans.length == 3 && (
              <>
                <div className="col-md-6">
                  <div className={`${styles.select_plan}`}>
                    <span className={styles.enterprise}>
                      #Enterprise{" "}
                      <img
                        src={process.env.APP_URL + "/images/infinite-white.svg"}
                        alt="icon"
                      />
                    </span>
                    <div className={styles.plan_pricing}>
                      <p>Custom Plan</p>
                      <div className={styles.contact_button}>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            show();
                          }}
                        >
                          Contact Us
                          <img
                            src={
                              process.env.APP_URL + "/images/chat-ico-white.svg"
                            }
                            alt="icon"
                          />
                        </button>
                      </div>
                    </div>
                    <div className={styles.body}>
                      <p>
                        Includes <strong>unlimited</strong> job postings,{" "}
                        <strong>unlimited</strong> boosts, and{" "}
                        <strong>unlimited</strong> CV Views
                      </p>
                      <ul>
                        <li>SIA licence checks</li>
                        <li>Access to video profiles</li>
                        <li>Unlimited real-time chat</li>
                        <li>Multi-user access</li>
                        <li>Branded job posts</li>
                        <li>Company profile page</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}
            <Form.Control.Feedback type="invalid">
              {errors.plan}
            </Form.Control.Feedback>
          </Form.Group>
        </>
      )}
      <StepOneFooter
        isValid={isValid}
        values={values}
        disabledCancelSubscriptioin={
          isLoading ? false : data.is_current_plan_free
        }
        resetBillingReducer={resetBillingReducer}
        nextPaymentDate={nextPaymentDate}
      />
    </div>
  );
};

const ConnectedStep2 = ({
  switchValue,
  setPlanIntervalSwitchValue,
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  isValid,
  setFieldValue,
  selectedPlan,
  setSelectedPlan,
  setSelectedPaymentMethod,
  setCurrentBillingModalStep,
  setSelectedCardBrand,
  setSelectedCardEndingIn,
}) => {
  const { data, isLoading, error } = useSelectedPlan(
    selectedPlan.id,
    switchValue ? "year" : "month"
  );
  const { data: cardsData, isLoading: isCardsDataLoading } = useUserCardList();
  return (
    <div className={styles.billing_step_two}>
      {isLoading ? (
        <div className={`${styles.selected_plan} ${styles.loading}`}>
          <div className={styles.plan_info}>
            <div className="row">
              <div className="col-lg-6">
                <p className="animated_shimmer"></p>
              </div>
              <div className="col-lg-6">
                <p className={`${styles.change_plan} animated_shimmer`}></p>
              </div>
            </div>
            <h2 className="animated_shimmer"></h2>
            <h3 className="animated_shimmer"></h3>
            <p className={`${styles.plan_description} animated_shimmer`}></p>
            <button className="animated_shimmer"></button>
          </div>
          <div className={styles.plan_benefits}>
            <h3 className="animated_shimmer"></h3>
            <ul>
              <li className="animated_shimmer"></li>
              <li className="animated_shimmer"></li>
              <li className="animated_shimmer"></li>
              <li className="animated_shimmer"></li>
              <li className="animated_shimmer"></li>
              <li className="animated_shimmer"></li>
            </ul>
          </div>
        </div>
      ) : (
        <div className={styles.selected_plan}>
          <div className={styles.plan_info}>
            <div className="row">
              <div className="col-lg-6">
                <p className={styles.title}>You have to pay for</p>
              </div>
              <div className="col-lg-6">
                {!data.is_free && !data.is_custom && (
                  <>
                    <div className={styles.change_plan}>
                      <span>Pay Monthly</span>
                      <div className="gl-switch-btn m-0">
                        <input
                          type="checkbox"
                          hidden="hidden"
                          id="access"
                          onChange={() => {
                            setPlanIntervalSwitchValue(!switchValue);
                          }}
                          checked={switchValue ? true : false}
                        />
                        <label className="mb-0 switch" for="access"></label>
                      </div>
                      <span>Pay Yearly</span>
                    </div>
                    <div className={styles.save_price}>
                      <span>Save 25%</span>
                      <img
                        src={process.env.APP_URL + "/images/plan-arrow.svg"}
                        alt="icon"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <h2>{data.title}</h2>
            <h3>
              &#163;{data.pricing[0]?.amount}
              {/* <span>/{switchValue && !data.is_free ? "year" : "mo"}</span> */}
              <span>/{data.pricing[0]?.interval}</span>
            </h3>
            {/* {!!data.is_current && (
              <span className={styles.current_plan}>Current Plan</span>
            )} */}
            <p className={styles.plan_description}>
              that includes up to&nbsp;
              <strong>{data.pricing[0]?.job_posting_credits} </strong>
              job posting, <strong>{data.pricing[0]?.boost_credits}</strong>
              &nbsp; Boost, &nbsp;
              <strong>{data.pricing[0]?.cv_views_credits}</strong> CV search
              views.
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                setCurrentBillingModalStep(1);
              }}
            >
              Change Plan
            </button>
          </div>
          <div className={styles.plan_benefits}>
            <h3>Plan Benefits</h3>
            <ul>
              <li>SIA licence checks</li>
              <li>Access to video profiles</li>
              <li>Unlimited real-time chat</li>
              <li>Multi-user access</li>
              <li>Branded job posts</li>
              <li>Company profile page</li>
            </ul>
          </div>
        </div>
      )}

      <div className={styles.payment_method}>
        <h3>Select Payment Method</h3>
        {/* <p>
          You can also select card for one-time payment that didn’t change your
          default card. Click on actions for one-time pay.
        </p> */}
      </div>
      <div className={styles.card_list}>
        {isCardsDataLoading ? (
          <div className={styles.loading_card}>
            <span></span>
            <div></div>
          </div>
        ) : (
          <>
            {cardsData.length > 0 && (
              <UsersCardsList
                cardsData={cardsData}
                setSelectedPaymentMethod={setSelectedPaymentMethod}
                values={values}
                setFieldValue={setFieldValue}
                setSelectedCardBrand={setSelectedCardBrand}
                setSelectedCardEndingIn={setSelectedCardEndingIn}
              />
            )}
            <button
              className={styles.add_button}
              onClick={() => setCurrentBillingModalStep(3)}
            >
              <span>
                <img
                  src={process.env.APP_URL + "/images/plus-white.svg"}
                  alt="icon"
                />
              </span>
              Add new card
            </button>
          </>
        )}
      </div>
      <div className={styles.buttons_wrapper}>
        <button
          className={styles.change_plan}
          type="submit"
          disabled={!isValid || !values.selectedCard}
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

const ConnectedStep3 = ({
  switchValue,
  setPlanIntervalSwitchValue,
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  isValid,
  setFieldValue,
  setFieldTouched,
  selectedPlan,
  setSelectedPlan,
  setCurrentBillingModalStep,
  user_email,
}) => {
  const { mutate, isLoading, isSuccess } = useSaveNewCard();

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [cardNumberElementError, setCardNumberElementError] = useState(null);
  const [cardExpiryElementError, setCardExpiryElementError] = useState(null);
  const [cardCvcElementError, setCardCvcElementError] = useState(null);
  const [isDefaultChecked, setIsDefaultChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [cardBrandImage, setCardBrandImage] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  const saveNewCardHandler = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    const paymentMethod = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
      billing_details: {
        name: name,
        // address: {
        //   postal_code: postCode,
        // },
        email: user_email,
      },
    });
    const pm = paymentMethod.paymentMethod?.id;
    mutate(
      { pm, is_default: isDefaultChecked },
      {
        onSuccess: () => {
          setCurrentBillingModalStep(2);
          setIsSubmitting(false);
        },
        onError: () => {
          setIsSubmitting(false);
        },
      }
    );
  };

  return (
    <div className={styles.add_new_card}>
      <h2>Add new card</h2>
      <div className={styles.card}>
        <div className={styles.card_front}>
          <div
            className={`${styles.input_field} 
            ${cardNumberElementError?.empty && "mb-0"} 
            ${cardNumberElementError?.error && "mb-0"}`}
          >
            <label>Card number</label>
            <FormGroup className={`${styles.card_wrap}`}>
              {cardBrandImage == "discover" ||
              cardBrandImage == "visa" ||
              cardBrandImage == "mastercard" ||
              cardBrandImage == "diners" ||
              cardBrandImage == "unionpay" ||
              cardBrandImage == "amex" ? (
                <span className={styles.card_icon}>
                  <img
                    src={`${process.env.APP_URL}/images/${cardBrandImage}.svg`}
                    width="44px"
                    height="30px"
                  />
                </span>
              ) : (
                <span className={styles.card_icon}>
                  <img
                    src={`${process.env.APP_URL}/images/blank-card.svg`}
                    width="44px"
                    height="30px"
                  />
                </span>
              )}
              <CardNumberElement
                onBlur={(e) => {}}
                onChange={(e) => {
                  setCardBrandImage(e.brand);
                  setCardNumberElementError(e);
                  setFieldValue("cardNumber", e.complete);
                }}
                options={{
                  placeholder: "**** **** **** ****", // Set your custom placeholder text
                }}
              />
            </FormGroup>
            {cardNumberElementError?.error && (
              <div className="text-danger my-1">
                {cardNumberElementError?.error?.message}
              </div>
            )}
            {cardNumberElementError?.empty && (
              <div className="text-danger my-1">
                Please enter your card number
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-8">
              <div className={styles.input_field}>
                <label>Name on card</label>
                <Field
                  type="text"
                  name="nameOnCard"
                  autoComplete="off"
                  maxLength="50"
                  className={styles.input}
                  value={name}
                  placeholder="- - - - - -"
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError(false);
                    setFieldValue("nameOnCard", e.target.value);
                  }}
                  onBlur={(e) => {
                    if (!e.target.value) {
                      setNameError(true);
                      setFieldValue("nameOnCard", e.target.value);
                    }
                  }}
                />
                {nameError && (
                  <div className="text-danger mt-1">
                    Please enter your name on card
                  </div>
                )}
              </div>
            </div>
            <div className="col-4">
              <div className={styles.input_field}>
                <label>Expiration</label>
                <CardExpiryElement
                  className={styles.card_wrap}
                  onChange={(e) => {
                    setCardExpiryElementError(e);
                    setFieldValue("cardExpiry", e.complete);
                  }}
                  options={{
                    placeholder: "MM/YY", // Set your custom placeholder text
                  }}
                />
                {cardExpiryElementError?.error && (
                  <div className="text-danger mt-1">
                    {cardExpiryElementError?.error?.message}
                  </div>
                )}
                {cardExpiryElementError?.empty && (
                  <div className="text-danger mt-1">
                    Please enter your card expiry date
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.checkbox_wrap}>
            <input
              type="checkbox"
              name="isDefaultChecked"
              id="set-default"
              className="form-check-input"
              // checked={termsAgree && "checked"}
              onChange={(e) => {
                setIsDefaultChecked((prev) => !prev);
                // setTermsAgreeError(false);
                // setTermsAgree(e.target.checked);
              }}
            />
            <label htmlFor="set-default">Set as default</label>
          </div>
        </div>

        <div className={styles.card_back}>
          <div className={styles.input_field}>
            <label>CVV</label>
            <CardCvcElement
              className={styles.card_wrap}
              onChange={(e) => {
                setCardCvcElementError(e);
                setFieldValue("cardCVC", e.complete);
              }}
              options={{
                placeholder: "- - -", // Set your custom placeholder text
              }}
            />
            {cardCvcElementError?.error && (
              <div className="text-danger mt-1">
                {cardCvcElementError?.error?.message}
              </div>
            )}
            {cardCvcElementError?.empty && (
              <div className="text-danger mt-1">
                Please enter your card cvc number
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={`row mt-lg-5 mt-3 ${styles.buttons_wrapper}`}>
        <div className="col-lg-8">
          {/* <p>Save card will be automatically added to my cards.</p> */}
        </div>
        <div className="col-lg-4 text-right">
          <button
            className={`${styles.save_card}`}
            onClick={saveNewCardHandler}
            disabled={
              isSubmitting ||
              !isValid ||
              !values.nameOnCard ||
              !values.cardNumber ||
              !values.cardExpiry ||
              !values.cardCVC ||
              cardNumberElementError?.error
                ? true
                : false || cardExpiryElementError?.error
                ? true
                : false || cardCvcElementError?.error
                ? true
                : false || nameError
                ? true
                : false
            }
          >
            Save Card {isLoading && <Spinner size="sm" />}
          </button>
        </div>
      </div>
    </div>
  );
};

const ConnectedStep4 = ({
  switchValue,
  setPlanIntervalSwitchValue,
  values,
  handleChange,
  handleBlur,
  errors,
  touched,
  isValid,
  setFieldValue,
  selectedPlan,
  setSelectedPlan,
  selectedCardBrand,
  selectedCardEndingIn,
  selectedPaymentMethod,
  resetBillingReducer,
  setCurrentBillingModalStep,
  setJobPostingLimitEnd,
}) => {
  const { mutate, isLoading } = useSubscription();
  const queryClient = useQueryClient();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stripeError, setStripeError] = useState(null);
  const stripe = useStripe();

  const subscriptionHandler = (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    const payload = {
      stripe_price_id: selectedPlan.pricing[0]?.stripe_price_id,
      payment_method: selectedPaymentMethod,
      stripe_plan_id: selectedPlan.stripe_plan_id,
    };
    mutate(payload, {
      onSuccess: async (data) => {
        // resetBillingReducer();
        if (data.data.data) {
          const confirm = await stripe.confirmCardPayment(data.data.data);
          if (confirm.error) {
            setStripeError(confirm.error.message);
            setShowFailModal(true);
            setIsSubmitting(false);
            queryClient.invalidateQueries({ queryKey: ["currentActivePlan"] });
            queryClient.invalidateQueries({ queryKey: ["currentCardDetail"] });
            return;
          }
          setShowSuccessModal(true);
          setIsSubmitting(false);
          queryClient.invalidateQueries({ queryKey: ["currentActivePlan"] });
          queryClient.invalidateQueries({ queryKey: ["currentCardDetail"] });
          return;
        }
      },
      onError: () => {
        setIsSubmitting(false);
        // setShowFailModal(true);
      },
    });
  };

  return (
    <>
      <div className={styles.billing_steps_four}>
        <div className={`row ${styles.top_wrap}`}>
          <div className="col-6">
            <h2>Summary</h2>
          </div>
          <div className="col-6 text-right">
            <button
              onClick={(e) => {
                e.preventDefault();
                setCurrentBillingModalStep(1);
              }}
            >
              Change Plan
            </button>
          </div>
          <div className="col-lg-10 mt-1">
            <p>
              You selected <strong>{selectedPlan.title}</strong>. If you wish to
              modify your plan, you have the option to change it. Additionally,
              you will find the option to add extra credits for boost.
            </p>
          </div>
        </div>

        <div className={styles.summary_content}>
          <div className="row align-items-start mx-0 py-1 px-2">
            <div className="col-lg-9">
              <h4>
                {selectedPlan.title}
                <span className="d-block">
                  Includes up to{" "}
                  <strong>
                    {selectedPlan.pricing[0]?.job_posting_credits}{" "}
                  </strong>
                  job posting,{" "}
                  <strong>{selectedPlan.pricing[0]?.boost_credits}</strong>{" "}
                  Boost, &nbsp;
                  <strong>
                    {selectedPlan.pricing[0]?.cv_views_credits}
                  </strong>{" "}
                  CV search views.
                </span>
              </h4>
              <ul>
                <li>SIA licence checks</li>
                <li>Access to video profiles</li>
                <li>Unlimited real-time chat</li>
                <li>Multi-user access</li>
                <li>Branded job posts</li>
                <li>Company profile page</li>
              </ul>
            </div>
            <div className="col-lg-3 text-right">
              <strong className={styles.price}>
                &#163;{selectedPlan.pricing[0]?.amount}/
                {/* {switchValue && !selectedPlan.is_free ? "year" : "mo"} */}
                {selectedPlan.pricing[0]?.interval}
              </strong>
            </div>
          </div>
          <div className="row align-items-center mt-3 mx-0 py-1 px-2">
            <div className="col-lg-6">
              <h4>
                <span className="d-block">Card Information</span>
                <strong>
                  {selectedCardBrand} ending in {selectedCardEndingIn}
                </strong>
              </h4>
            </div>
            <div className="col-lg-6 text-right">
              <button
                className={styles.card_change_btn}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentBillingModalStep(2);
                }}
              >
                Change card
                <img
                  src={`${process.env.APP_URL}/images/${selectedCardBrand}.svg`}
                  height={30}
                  width={50}
                />
              </button>
            </div>
          </div>
          <hr />
          <div className="row align-items-center mt-4 mx-0 px-2">
            <div className="col-6">
              <h2 className={styles.vat_title}>VAT</h2>
            </div>
            <div className="col-6 text-right">
              <h5 className={styles.vat_price}>
                + £{selectedPlan.pricing[0]?.vat}{" "}
              </h5>
            </div>
          </div>
          <div className="row align-items-center mt-3 mx-0 px-2">
            <div className="col-6">
              <h2>Total</h2>
            </div>
            <div className="col-6 text-right">
              <h5>
                £
                {parseInt(selectedPlan.pricing[0]?.amount) +
                  parseInt(selectedPlan.pricing[0]?.vat)}
                <span className="d-block">
                  {/* {switchValue && !selectedPlan.is_free ? "Yearly" : "Monthly"}{" "} */}
                  {`${selectedPlan.pricing[0]?.interval} plan`}
                </span>
              </h5>
            </div>
          </div>
        </div>

        <div className={styles.button_wrap}>
          <button onClick={subscriptionHandler} disabled={isSubmitting}>
            Pay now: £
            {parseInt(selectedPlan.pricing[0]?.amount) +
              parseInt(selectedPlan.pricing[0]?.vat)}
            {isSubmitting && <Spinner size="sm" />}
          </button>
        </div>
      </div>

      <SubscriptionSuccessModal
        showModal={showSuccessModal}
        setShowModal={setShowSuccessModal}
        resetBillingReducer={resetBillingReducer}
        setJobPostingLimitEnd={setJobPostingLimitEnd}
      />

      <SubscriptionFailModal
        showModal={showFailModal}
        setShowModal={setShowFailModal}
        resetBillingReducer={resetBillingReducer}
        subscriptionHandler={subscriptionHandler}
        stripeError={stripeError}
        selectedPlan={selectedPlan}
      />
    </>
  );
};

const Step1 = connect(mapStateToProps, mapDispatchToProps)(ConnectedStep1);
const Step2 = connect(mapStateToProps, mapDispatchToProps)(ConnectedStep2);
const Step3 = connect(mapStateToProps, mapDispatchToProps)(ConnectedStep3);
const Step4 = connect(mapStateToProps, mapDispatchToProps)(ConnectedStep4);

export { Step1, Step2, Step3, Step4 };
