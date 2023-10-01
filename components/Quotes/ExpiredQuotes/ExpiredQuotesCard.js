import React, { useState } from "react";
import { connect } from "react-redux";
// reactstrap components
import { Row, Col, Tooltip } from "reactstrap";
import * as styles from "../AllQuotes/AllQuotes.module.scss";

function ExpiredQuotesCard(props) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <div className={`${styles.all_uotes_card} bg-white rounded px-4 py-4 mb-3`}>
      <Row>
        <Col className="col-12 col-md-12">
          <div
            className={`${styles.user_info} d-md-flex justify-content-between`}
          >
            <div className={`d-md-flex flex-wrap align-items-start`}>
              {/* <div className={`${isDisabled ? "blur-3" : ''}`}> */}
              <div className={`${props.isDisabled ? `${styles.blur_3}` : ""}`}>
                <h2 className="m-0">
                  {props.companyName ? props.companyName : props.name}{" "}
                  <span className={`fs-7 fw-normal d-block`}>
                    {props.email}
                  </span>
                </h2>
                <span className={`${styles.text_dim} fs-7 fw-normal d-block`}>
                  {props.mobileNumber}
                </span>
              </div>
              <button
                type="submit"
                disabled={true}
                className={`btn btn-green btn-md fw-medium px-4 py-2 mt-3 mt-md-0 w-md-auto ml-md-3 text-uppercase`}
              >
                Show contact details
              </button>
            </div>
            <div className={`${styles.expiry_cont} text-md-right mt-4 mt-md-0`}>
              <div className={`text-md-center`}>
                {props.isDisabled ? (
                  <span className={`${styles.badge} ${styles.showBg}`}>
                    Expired
                  </span>
                ) : (
                  <>
                    <span className={`${styles.badge} ${styles.showBg}`}>
                      Expired{" "}
                      <img
                        src={`${process.env.APP_URL}/images/c-info.svg`}
                        id={"Tooltip-" + props.id}
                        alt=""
                      />
                    </span>
                    <Tooltip
                      placement="top"
                      isOpen={tooltipOpen}
                      target={"Tooltip-" + props.id}
                      toggle={toggle}
                    >
                      Contact details will vanish in 24 hours.
                    </Tooltip>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={`${styles.content}`}>
            <h3 className={`fs-6`}>Required Services</h3>
            <ul className={`${styles.badgeWrap} list-unstyled`}>
              <li>
                <span className={`${styles.badge} fs-6 fw-normal text-white`}>
                  {props.questionAnswers[1].answer}
                </span>
              </li>
            </ul>
            <h4 className={`fs-6`}>
              Workers Needed:{" "}
              <span className={`fw-normal`}>
                {props.questionAnswers[2].answer}
              </span>
            </h4>
            <h4 className={`fs-6`}>
              Where: <span className={`fw-normal`}>London,UK</span>
            </h4>
            {props.questionAnswers.map(
              (questions) =>
                questions.question_id === 5 && (
                  <h4 className={`fs-6`}>
                    When:{" "}
                    <span className={`fw-normal`}>{questions.answer}</span>
                  </h4>
                )
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  setScreenToShowOnStaffing: (screen) =>
    dispatch(setScreenToShowOnStaffing(screen)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpiredQuotesCard);
