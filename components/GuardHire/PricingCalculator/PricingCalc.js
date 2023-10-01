import React, { useState } from "react";
import styles from "./PricingCalc.module.scss";
import useJobPriceCalculator from "../../../hooks/GuardHire/useJobPriceCalculator";
import BuyMoreAlert from "../../Common/GlobalModals/Billing/Steps/Step1/BuyMoreAlert";
import { useIntercom } from "react-use-intercom";
const PricingCalc = () => {
  const { data, isLoading } = useJobPriceCalculator();
  const [selectedJobPostCredits, setSelectedJobPostCredits] = useState(1);
  const { show } = useIntercom();
  // const { job_post } = data;

  const handleIncrement = (e) => {
    e.preventDefault();
    setSelectedJobPostCredits((prev) => prev + 1);
    // if (
    //   props.selectedJobPostCredits >= props.pricing.length ||
    //   props.cart.findIndex((item) => item.id === "jobpost") !== -1
    // ) {
    //   return;
    // }
    // props.setSelectedJobPostCredits(parseInt(props.selectedJobPostCredits) + 1);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    if (selectedJobPostCredits > 1) {
      setSelectedJobPostCredits((prev) => prev - 1);
    }
  };

  // if (isLoading) {
  //   return <div>Loading....</div>;
  // }

  return (
    <section className={styles.pricing_section}>
      <div className="container">
        <div className="row">
          <div className="col-lg-11">
            <div
              className={`row no-gutters justify-content-end ${styles.container_wrap}`}
            >
              <div className="col-lg-4">
                <div className={styles.bg_dark}>
                  <h2>Transparent pricing</h2>
                  <ul>
                    <li>
                      <img
                        src={process.env.APP_URL + "/images/c-check-dark.svg"}
                        alt="icon"
                      />
                      Create and post your job ads anytime within 12 months
                    </li>
                    <li>
                      <img
                        src={process.env.APP_URL + "/images/c-check-dark.svg"}
                        alt="icon"
                      />
                      Your job ads will be available across our web and mobile
                      app
                    </li>
                    <li>
                      <img
                        src={process.env.APP_URL + "/images/c-check-dark.svg"}
                        alt="icon"
                      />
                      Dedicated support and an account manager to help you hire
                      fast
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-8">
                <div className={styles.wrapper}>
                  <div className={styles.ribbon_wrap}>
                    <p>
                      <span>New</span> Customer Offer
                    </p>
                  </div>
                  {/* <div
                    className={`${styles.ribbon} ${styles.ribbon_top_right}`}
                  >
                    <span>
                      <strong>New </strong>
                      Customer Offer
                    </span>
                  </div> */}
                  {isLoading ? (
                    <div className={styles.bg_grey}>
                      <h3 className="animated_shimmer">JOB ADVERT PRICING</h3>
                      <div className={`${styles.calculator_wrap}`}>
                        <button
                          className="animated_shimmer border-0 mb-0"
                          type="button"
                        >
                          -
                        </button>
                        <span className="animated_shimmer mb-0">0</span>
                        <button
                          className="animated_shimmer border-0 mb-0"
                          type="button"
                        >
                          +
                        </button>
                      </div>
                      <h4 className="animated_shimmer">1000</h4>
                      <p className="animated_shimmer mb-0">
                        <del>£0</del> You save £1000
                      </p>
                    </div>
                  ) : (
                    <div className={styles.bg_grey}>
                      <div className="position-relative">
                        <h3>JOB ADVERT PRICING</h3>
                        <div className={styles.calculator_wrap}>
                          <button
                            type="button"
                            onClick={handleDecrement}
                            disabled={
                              selectedJobPostCredits <= 1 ? true : false
                            }
                          >
                            -
                          </button>
                          <span>{selectedJobPostCredits}</span>
                          <button
                            type="button"
                            onClick={handleIncrement}
                            disabled={
                              selectedJobPostCredits >= data.job_post.length
                                ? true
                                : false
                            }
                          >
                            +
                          </button>
                        </div>
                        {selectedJobPostCredits >= data.job_post.length && (
                          <BuyMoreAlert limit={data.job_post.length} />
                        )}
                        <h4>
                          {selectedJobPostCredits} for £
                          {Number(
                            data.job_post[selectedJobPostCredits - 1]
                              .discounted_rate
                          ).toLocaleString()}
                        </h4>
                        <p>
                          <del>
                            £
                            {Number(
                              data.job_post[0].rate * selectedJobPostCredits
                            ).toLocaleString()}
                          </del>{" "}
                          You save £
                          {Number(
                            Number(
                              data.job_post[0].rate * selectedJobPostCredits
                            ) -
                              Number(
                                data.job_post[selectedJobPostCredits - 1]
                                  .discounted_rate
                              )
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className={`${styles.custom_plan}`}>
                    <div className="row align-items-center">
                      <div className="col-md-9">
                        <h3>Discuss your needs</h3>
                        <p>
                          Talk to a member of our friendly sales team and get a
                          tailor-made solution around your requirements
                        </p>
                      </div>
                      <div className="col-md-3">
                        <ul>
                          <li>
                            <img
                              src={
                                process.env.APP_URL + "/images/spike-img.png"
                              }
                              className="img-fluid"
                            />
                            <span>Spike</span>
                          </li>
                          <li>
                            <img
                              src={process.env.APP_URL + "/images/sam-img.png"}
                              className="img-fluid"
                            />
                            <span>Sam</span>
                          </li>
                          <li>
                            <img
                              src={process.env.APP_URL + "/images/will-img.png"}
                              className="img-fluid"
                            />
                            <span>Will</span>
                          </li>
                        </ul>
                      </div>
                      <div className="col-12">
                        <div className={styles.call_us_btn}>
                          <button
                            type="button"
                            className="btn btn-md btn-green"
                            onClick={show}
                          >
                            Chat with us
                          </button>
                          <h4>
                            or call us on{" "}
                            <a href="tel:03306600012">0330 660 0012</a>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCalc;
