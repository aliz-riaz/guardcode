import React from "react";
import styles from "./GuardFlex.module.scss";
import Fade from "react-reveal/Fade";
import { Col, Row } from "reactstrap";

const GuardFlex = (props) => {
  return (
    <Col className="col-12">
      <p className="fs-5 fw-medium mb-3 d-block d-md-none d-lg-none">
        On-demand short term hiring
      </p>
      <Row className="align-items-center">
        <Col className="col-lg-5 col-12">
          <div
            className={`py-5 ${props.styles.emp_list_wrap} ${props.styles.yellow_border}`}
          >
            <div className={`${props.styles.emp_list}`}>
              <div className={`${props.styles.iconWrap}`}>
                <img
                  src={process.env.APP_URL + "/images/flex-1.svg"}
                  alt="icon"
                  className={`img-fluid`}
                />
              </div>
              <div className={`${props.styles.content}`}>
                <h3 className={`fs-5`}>
                  Access the largest pool of security gig workers
                </h3>
                <p className={`fs-6 m-0`}>
                  Thousands of ready-to-work verified security professionals use
                  our platform to find work.
                </p>
              </div>
            </div>
            <div className={`${props.styles.emp_list}`}>
              <div className={`${props.styles.iconWrap}`}>
                <img
                  src={process.env.APP_URL + "/images/flex-3.svg"}
                  alt="icon"
                  className={`img-fluid`}
                />
              </div>
              <div className={`${props.styles.content}`}>
                <h3 className={`fs-5`}>Easy shift management</h3>
                <p className={`fs-6 m-0`}>
                  Post and manage your shifts easily with your dashboard. Add
                  your locations and then repeat shifts with 1-click.
                </p>
              </div>
            </div>
            <div className={`${props.styles.emp_list}`}>
              <div className={`${props.styles.iconWrap}`}>
                <img
                  src={process.env.APP_URL + "/images/flex-2.svg"}
                  alt="icon"
                  className={`img-fluid`}
                />
              </div>
              <div className={`${props.styles.content}`}>
                <h3 className={`fs-5`}>
                  Seamless communication with shift workers
                </h3>
                <p className={`fs-6 m-0`}>
                  Send and receive chat messages and files and save yourself
                  from snail mail and missed calls.
                </p>
              </div>
            </div>
            <div className={`${props.styles.emp_list}`}>
              <div className={`${props.styles.iconWrap}`}>
                <img
                  src={process.env.APP_URL + "/images/flex-4.svg"}
                  alt="icon"
                  className={`img-fluid`}
                />
              </div>
              <div className={`${props.styles.content}`}>
                <h3 className={`fs-5`}>Other good stuff</h3>
                <p className={`fs-6 m-0`}>
                  You also get other enhanced features such as SIA licence
                  verification, video intros and screening information.
                </p>
              </div>
            </div>
            <a
              href="/guardflex"
              className={`btn btn-green btn-lg mt-5 fs-5 fw-medium px-5 ${styles.guard_flex_btn}`}
            >
              Learn more
            </a>
          </div>
        </Col>
        <Col className="col-lg-7 col-12">
          <Fade bottom>
            {/* <div className="position-relative">
        <div className={`${styles.guard_flex}`}>
          <div className={`${styles.column_wrap}`}>
            <div className={`${styles.date_wrap}`}>
              <h4>
                <span>Jun</span>
                15
              </h4>
              <p>Mon</p>
            </div>
            <div className={`${styles.card}`}>
              <div className={`${styles.card_top}`}>
                <h4>
                  Tesco<span>N20</span>
                </h4>
                <p>8am to 2pm</p>
              </div>
              <div className={`${styles.card_footer}`}>
                <span>5 applicants</span>
                <ul>
                  <li>
                    <img
                      src={process.env.APP_URL + "/images/user-1.jpg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </li>
                  <li>
                    <img
                      src={process.env.APP_URL + "/images/user-2.jpg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </li>
                  <li>
                    <img
                      src={process.env.APP_URL + "/images/user-1.jpg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </li>
                  <li>
                    <img
                      src={process.env.APP_URL + "/images/user-1.jpg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </li>
                  <li>
                    <span>+</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`${styles.card} ${styles.confirmed}`}>
              <div className={`${styles.card_top}`}>
                <h4>
                  Tesco<span>N20</span>
                </h4>
                <p>8am to 2pm</p>
              </div>
              <div className={`${styles.card_footer}`}>
                <ul className={`${styles.confirmed}`}>
                  <li>
                    <img
                      src={process.env.APP_URL + "/images/user-1.jpg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </li>
                  <li>
                    <img
                      src={process.env.APP_URL + "/images/user-2.jpg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </li>
                  <li>
                    <span>
                      <img
                        src={process.env.APP_URL + "/images/c-check.svg"}
                        alt="icon"
                        className={`img-fluid`}
                      />
                      Confirmed
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`${styles.card} ${styles.danger}`}>
              <div className={`${styles.card_top}`}>
                <h4>
                  Tesco<span>N20</span>
                </h4>
                <p>8am to 2pm</p>
              </div>
              <div className={`${styles.card_footer}`}>
                <span>Awaiting applicants</span>
              </div>
            </div>
          </div>
          <div className={`${styles.column_wrap}`}>
            <div className={`${styles.date_wrap}`}>
              <h4>
                <span>Jun</span>
                16
              </h4>
              <p>Tues</p>
            </div>
            <div className={`${styles.card}`}>
              <div className={`${styles.card_top}`}>
                <h4>
                  Tesco<span>N20</span>
                </h4>
                <p>8am to 2pm</p>
              </div>
              <div className={`${styles.card_footer}`}>
                <span>5 applicants</span>
                <ul>
                  <li>
                    <img
                      src={process.env.APP_URL + "/images/user-1.jpg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </li>
                  <li>
                    <img
                      src={process.env.APP_URL + "/images/user-2.jpg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </li>
                  <li>
                    <img
                      src={process.env.APP_URL + "/images/user-1.jpg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </li>
                  <li>
                    <img
                      src={process.env.APP_URL + "/images/user-1.jpg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </li>
                  <li>
                    <span>+</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`${styles.card} ${styles.confirmed}`}>
              <div className={`${styles.card_top}`}>
                <h4>
                  Tesco<span>N20</span>
                </h4>
                <p>8am to 2pm</p>
              </div>
              <div className={`${styles.card_footer}`}>
                <ul className={`${styles.confirmed}`}>
                  <li>
                    <img
                      src={process.env.APP_URL + "/images/user-1.jpg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </li>
                  <li>
                    <img
                      src={process.env.APP_URL + "/images/user-2.jpg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </li>
                  <li>
                    <span>
                      <img
                        src={process.env.APP_URL + "/images/c-check.svg"}
                        alt="icon"
                        className={`img-fluid`}
                      />
                      Confirmed
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`${styles.card} ${styles.confirmed}`}>
              <div className={`${styles.card_top}`}>
                <h4>
                  Tesco<span>N20</span>
                </h4>
                <p>8am to 2pm</p>
              </div>
              <div className={`${styles.card_footer}`}>
                <span>5 applicants</span>
                <ul>
                  <li>
                    <img
                      src={process.env.APP_URL + "/images/user-1.jpg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </li>
                  <li>
                    <img
                      src={process.env.APP_URL + "/images/user-2.jpg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </li>
                  <li>
                    <img
                      src={process.env.APP_URL + "/images/user-1.jpg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </li>
                  <li>
                    <img
                      src={process.env.APP_URL + "/images/user-1.jpg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </li>
                  <li>
                    <span>+</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={`${styles.column_wrap}`}>
            <div className={`${styles.date_wrap}`}>
              <h4>
                <span>Jun</span>
                17
              </h4>
              <p>Wed</p>
            </div>
            <div className={`${styles.card}`}>
              <div className={`${styles.card_top}`}>
                <h4>
                  Tesco<span>N20</span>
                </h4>
                <p>8am to 2pm</p>
              </div>
              <div className={`${styles.card_footer}`}>
                <span>5 applicants</span>
                <ul>
                  <li>
                    <img
                      src={process.env.APP_URL + "/images/user-1.jpg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </li>
                  <li>
                    <img
                      src={process.env.APP_URL + "/images/user-2.jpg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </li>
                  <li>
                    <img
                      src={process.env.APP_URL + "/images/user-1.jpg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </li>
                  <li>
                    <img
                      src={process.env.APP_URL + "/images/user-1.jpg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </li>
                  <li>
                    <span>+</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`${styles.card} ${styles.confirmed}`}>
              <div className={`${styles.card_top}`}>
                <h4>
                  Tesco<span>N20</span>
                </h4>
                <p>8am to 2pm</p>
              </div>
              <div className={`${styles.card_footer}`}>
                <ul className={`${styles.confirmed}`}>
                  <li>
                    <img
                      src={process.env.APP_URL + "/images/user-1.jpg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </li>
                  <li>
                    <img
                      src={process.env.APP_URL + "/images/user-2.jpg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </li>
                  <li>
                    <span>
                      <img
                        src={process.env.APP_URL + "/images/c-check.svg"}
                        alt="icon"
                        className={`img-fluid`}
                      />
                      Confirmed
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`${styles.card}`}>
              <div className={`${styles.card_top}`}>
                <h4>
                  Tesco<span>N20</span>
                </h4>
                <p>8am to 2pm</p>
              </div>
              <div className={`${styles.card_footer}`}>
                <span>5 applicants</span>
                <ul>
                  <li>
                    <img
                      src={process.env.APP_URL + "/images/user-1.jpg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </li>
                  <li>
                    <img
                      src={process.env.APP_URL + "/images/user-2.jpg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </li>
                  <li>
                    <img
                      src={process.env.APP_URL + "/images/user-1.jpg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </li>
                  <li>
                    <img
                      src={process.env.APP_URL + "/images/user-1.jpg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </li>
                  <li>
                    <span>+</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.add_shift_wrap}`}>
          <h4>Add a shift</h4>
          <div className={`${styles.field_wrap}`}>
            <label>Select a site</label>
            <div className={`${styles.input_row}`}>
              <div className={`${styles.card}`}>
                <h5>
                  NatWest <span>N18</span>
                </h5>
                <img
                  src={process.env.APP_URL + "/images/shift-1.svg"}
                  alt="icon"
                  className={`img-fluid`}
                />
              </div>
              <div className={`${styles.card}`}>
                <h5>
                  Tesco <span>N20</span>
                </h5>
                <img
                  src={process.env.APP_URL + "/images/shift-2.svg"}
                  alt="icon"
                  className={`img-fluid`}
                />
              </div>
              <div className={`${styles.card}`}>
                <h5>
                  C-Bulding <span>EC1</span>
                </h5>
                <img
                  src={process.env.APP_URL + "/images/shift-3.svg"}
                  alt="icon"
                  className={`img-fluid`}
                />
              </div>
              <div className={`${styles.add_card}`}>
                <img
                  src={process.env.APP_URL + "/images/plus.svg"}
                  alt="icon"
                  className={`img-fluid`}
                />
                <h5>Add new site</h5>
              </div>
            </div>
          </div>

          <div className={`${styles.field_wrap}`}>
            <label>Select a site</label>
            <div className={`${styles.input_row}`}>
              <div className={`${styles.card} flex-shrink-0`}>
                <h5>
                  Relief Officer <span>ref:412315</span>
                </h5>
              </div>
              <div className={`${styles.card}`}>
                <h5>
                  Door Supervisor <span>ref:581231</span>
                </h5>
              </div>
              <div className={`${styles.add_card} flex-shrink-0`}>
                <img
                  src={process.env.APP_URL + "/images/plus.svg"}
                  alt="icon"
                  className={`img-fluid`}
                />
                <h5>Add new role</h5>
              </div>
            </div>
          </div>

          <div className={`${styles.field_wrap}`}>
            <label>Date & time</label>
            <div className={`${styles.input_row}`}>
              <div className={`${styles.card} ${styles.row} flex-shrink-0`}>
                <p>Open calendar</p>
                <img
                  src={process.env.APP_URL + "/images/calendar-img.svg"}
                  alt="icon"
                  className={`img-fluid`}
                />
              </div>
              <div className={`${styles.card} ${styles.row} flex-shrink-0`}>
                <p>8am to 2pm</p>
                <img
                  src={process.env.APP_URL + "/images/time-img.svg"}
                  alt="icon"
                  className={`img-fluid`}
                />
              </div>
            </div>
          </div>
        </div>
      </div> */}
            <figure className={`${styles.figure_wrap} m-0 ml-auto`}>
              <img
                src={process.env.APP_URL + "/images/guard-flex.png"}
                className="img-fluid"
              />
            </figure>
          </Fade>
        </Col>
      </Row>
    </Col>
  );
};

export default GuardFlex;
