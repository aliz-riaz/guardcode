import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// reactstrap components
import { Row, Col, Tooltip } from "reactstrap";
import * as styles from "./AllQuotes.module.scss";
import CountDownExpires from "./CountDownExpires";
import { markQuoteViewed } from "../../../redux/actions/quotesActions";

function AllQuotesCard(props) {
  const [isDisabled, setDisabled] = useState(false);
  const [isExpireLocalState, setExpireLocalState] = useState(false);

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  const handleToggle = async (companyData) => {
    setDisabled(true);
    await props.markQuoteViewed(companyData).then((data) => {
      // data === true && setDisabled(true);
    });
  };

  return (
    <div className={`${styles.all_uotes_card} bg-white rounded px-4 py-4 mb-3`}>
      <Row>
        <Col className="col-12 col-md-12">
          <div
            className={`${styles.user_info} d-md-flex justify-content-between`}
          >
            <div className={`d-md-flex flex-wrap align-items-start`}>
              {/* <div className={`${ props.isViewed === 0 && isDisabled === false || expiryIsGreaterThan ? "blur-3" : ''}`}> */}
              <div
                className={`${
                  (props.isViewed === 0 && isDisabled === false) ||
                  props.isDisabled
                    ? `${styles.blur_3}`
                    : ""
                }`}
              >
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
                onClick={() =>
                  handleToggle({
                    quotation_id: props.id,
                    user_token: props.user_token,
                  })
                }
                className={`btn btn-green btn-md fw-medium px-4 py-2 mt-3 mt-md-0 w-md-auto ml-md-3 text-uppercase`}
                disabled={
                  props.isViewed == 1 ||
                  isExpireLocalState ||
                  isDisabled ||
                  props.isExpired == 1
                }
              >
                {isDisabled ? "Show contact details" : "Show contact details"}
              </button>
            </div>
            <div className={`${styles.expiry_cont} text-md-right mt-4 mt-md-0`}>
              <div className={`text-md-center`}>
                {props.isExpired == 1 || isExpireLocalState ? (
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
                ) : (
                  <>
                    <span className={`${styles.badge}`}>Expires in</span>
                    <CountDownExpires
                      createdAt={props.createdAt}
                      expireAt={props.expiredAt}
                      handleLocalExpireState={setExpireLocalState}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          <div
            className={`${styles.content} ${
              props.isExpired == 1 || isExpireLocalState ? "" : "mt-md-n5"
            }`}
          >
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
              Where:{" "}
              <span className={`fw-normal`}>
                {props.location != null
                  ? props.location
                  : "location not provided"}
              </span>
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

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
});

const mapDispatchToProps = (dispatch) => ({
  markQuoteViewed: (data) => dispatch(markQuoteViewed(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllQuotesCard);
