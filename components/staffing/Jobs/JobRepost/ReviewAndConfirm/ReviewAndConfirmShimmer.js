import { Button, Label, Row, Col, FormGroup } from "reactstrap";
import { Formik, Form, Field } from "formik";
import styles from "./ReviewAndConfirm.module.scss";

const ReviewAndConfirmShimmer = (props) => {
  return (
    <>
      <div className="pt-2 pt-md-5 pb-2 pb-md-4 row">
        <div className="col-md-12 col">
          <div className={`row align-items-center`}>
            <div className="col-md-12 text-center">
              <h3 className="text-sm-uppercase font-sm-12 mb-0 animated_shimmer d-inline-block">
                Review & Confirm
              </h3>
            </div>
          </div>
        </div>
      </div>
      <Row className="justify-content-center">
        <Col className="col-12 col-md-6">
          <div className="bg-white py-4 px-4 rounded">
            <p className={`${styles.policy_txt} animated_shimmer`}>
              By pressing confirm, you agree that this job will be posted and
              applications will be processed in accordance with GuardPass for
              Employer's,{" "}
              <a href="/privacy" target="_blank">
                {" "}
                Privacy Policy{" "}
              </a>{" "}
              and{" "}
              <a href="/terms" target="_blank">
                {" "}
                Terms of Service{" "}
              </a>
              . You consent to GuardPass for Employer informing a user that you
              have opened, viewed or made a decision regarding the user's
              application.
            </p>
            <div className={`${styles.edit_preview} pr-0 pr-0`}>
              <h4 className="mb-3 animated_shimmer">
                Would you like to notify another email address when applicants
                apply for this job?
              </h4>

              <Formik>
                <Form id="updatingEmail">
                  <FormGroup className="gl-input mb-2 animated_shimmer border-transparent rounded">
                    <Field
                      type="text"
                      disabled={true}
                      name="settingsEmail"
                      className="form-control"
                      placeholder="settingsEmail"
                    />
                    <Label className="animated_shimmer">
                      Notify another email address
                    </Label>
                  </FormGroup>
                </Form>
              </Formik>
            </div>
            <div className={`${styles.edit_preview} pr-0`}>
              <h4 className="mb-0 animated_shimmer">Job title</h4>
              <p className="fs-6 mb-0 mt-1 animated_shimmer">job title</p>
            </div>
            <div class={`${styles.edit_preview} pr-0`}>
              <h4 className="mb-0 animated_shimmer">Company</h4>
              <p className="fs-6 mb-0 mt-1 animated_shimmer">company name</p>
            </div>
            <div class={`${styles.edit_preview} pr-0`}>
              <h4 className="mb-2 animated_shimmer">Job description</h4>
              {/* {process.browser && (
                <div
                  className={styles.jobDescription}
                  dangerouslySetInnerHTML={{ __html: props.job_description }}
                ></div>
              )} */}
            </div>
            <div class={`${styles.edit_preview} pr-0`}>
              <h4 className="mb-0 animated_shimmer">Street address</h4>
              <p className="fs-6 mb-0 mt-1 animated_shimmer">London, UK</p>
            </div>
            <div class={`${styles.edit_preview} pr-0`}>
              <h4 className="mb-0 animated_shimmer">Pay & benefits</h4>
              <span className={`${styles.p_hour} ml-0 animated_shimmer`}>
                per hour
              </span>
            </div>
            <div class={`${styles.edit_preview} pr-0`}>
              <>
                <h4 className="mb-0 animated_shimmer">Licence required</h4>
                <ul className="pl-0 mt-2">
                  <li className="fs-6 animated_shimmer">Yes</li>
                </ul>
              </>
            </div>

            <div class={`${styles.edit_preview} pr-0`}>
              <h4 className="animated_shimmer mb-1">Employment type</h4>
              <p className="fs-6 animated_shimmer mb-0">type of employment</p>
            </div>

            <div class={`${styles.edit_preview} pr-0`}>
              <h4 className="animated_shimmer">Contract type</h4>
              <p className="fs-6 animated_shimmer mb-0">contract type</p>
            </div>

            <div class={`${styles.edit_preview} pr-0`}>
              <h4 className="animated_shimmer">Shift schedule</h4>
              <p className="fs-6 animated_shimmer mb-0">shift schedule</p>
            </div>

            <div class={`${styles.edit_preview} pr-0`}>
              <h4 className="animated_shimmer">Shift timing</h4>
              <p className="fs-6 animated_shimmer mb-0">01/01/2023</p>
            </div>
            <div className={`${styles.edit_preview} pr-0`}>
              <h4 className="animated_shimmer">Expiry</h4>
              <p className="animated_shimmer mb-0">
                Your job will be live for 28 days.
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ReviewAndConfirmShimmer;
