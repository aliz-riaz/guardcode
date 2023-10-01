import React from "react";
import styles from "./GuardTrain.module.scss";

import Fade from "react-reveal/Fade";
import { Col, Row } from "reactstrap";

const GuardTrain = (props) => {
  return (
    <Col className="col-12">
      <p className="fs-5 fw-medium mb-3 d-block d-md-none d-lg-none">
        Nationwide SIA training solution
      </p>
      <Row className="align-items-start">
        <Col className="col-lg-5 col-12">
          <div
            className={`py-5 ${props.styles.emp_list_wrap} ${props.styles.blue_border}`}
          >
            <div className={`${props.styles.emp_list}`}>
              <div className={`${props.styles.iconWrap}`}>
                <img
                  src={process.env.APP_URL + "/images/train-1.svg"}
                  alt="icon"
                  className={`img-fluid`}
                />
              </div>
              <div className={`${props.styles.content}`}>
                <h3 className={`fs-5`}>Over 85 locations nationwide</h3>
                <p className={`fs-6 m-0`}>
                  Choose from over 85 locations in the country spreading across
                  every major town and city.
                </p>
              </div>
            </div>
            <div className={`${props.styles.emp_list}`}>
              <div className={`${props.styles.iconWrap}`}>
                <img
                  src={process.env.APP_URL + "/images/shape-star.svg"}
                  alt="icon"
                  className={`img-fluid`}
                />
              </div>
              <div className={`${props.styles.content}`}>
                <h3 className={`fs-5`}>SIA training experts </h3>
                <p className={`fs-6 m-0`}>
                  Our training network is consistently rated 5-star on review
                  sites such as TrustPilot.
                </p>
              </div>
            </div>
            <div className={`${props.styles.emp_list}`}>
              <div className={`${props.styles.iconWrap}`}>
                <img
                  src={process.env.APP_URL + "/images/layout-icon.svg"}
                  alt="icon"
                  className={`img-fluid`}
                />
              </div>
              <div className={`${props.styles.content}`}>
                <h3 className={`fs-5`}>Manage your team</h3>
                <p className={`fs-6 m-0`}>
                  Book your staff, track their progress and view their results
                  from a simple dashboard.
                </p>
              </div>
            </div>
            <div className={`${props.styles.emp_list}`}>
              <div className={`${props.styles.iconWrap}`}>
                <img
                  src={process.env.APP_URL + "/images/tag-loyalty.svg"}
                  alt="icon"
                  className={`img-fluid`}
                />
              </div>
              <div className={`${props.styles.content}`}>
                <h3 className={`fs-5`}>Exclusive corporate discounts</h3>
                <p className={`fs-6 m-0`}>
                  Get exclusive corporate discounts and bulk booking rates you
                  won't find elsewhere.
                </p>
              </div>
            </div>
          </div>
        </Col>
        <Col className="col-lg-7 col-12">
          <Fade bottom>
            {/* <div className={`${styles.booking_table}`}>
          <ul>
            <li>
              <span>Booking ID</span>
            </li>
            <li>
              <span>Name</span>
            </li>
            <li>
              <span>Course</span>
            </li>
            <li>
              <span>Location</span>
            </li>
            <li>
              <span>Status</span>
            </li>
          </ul>
          <ul className={`${styles.card}`}>
            <li>
              <p>312411</p>
            </li>
            <li>
              <h3>Jeff Cahill</h3>
            </li>
            <li>
              <p>Door Supervisor Training</p>
            </li>
            <li>
              <p>Cardiff</p>
            </li>
            <li>
              <button className={`${styles.btn_green}`}>Passed</button>
            </li>
          </ul>
          <ul className={`${styles.card}`}>
            <li>
              <p>312411</p>
            </li>
            <li>
              <h3>Mo Samary</h3>
            </li>
            <li>
              <p>Door Supervisor Training</p>
            </li>
            <li>
              <p>Cardiff</p>
            </li>
            <li>
              <button className={`${styles.btn_green}`}>Passed</button>
            </li>
          </ul>
          <ul className={`${styles.card}`}>
            <li>
              <p>312411</p>
            </li>
            <li>
              <h3>Jeff Cahill</h3>
            </li>
            <li>
              <p>Door Supervisor Training</p>
            </li>
            <li>
              <p>Cardiff</p>
            </li>
            <li>
              <button className={`${styles.btn_danger}`}>NEEDS RETAKE</button>
            </li>
          </ul>
          <ul className={`${styles.card}`}>
            <li>
              <p>312411</p>
            </li>
            <li>
              <h3>Jeff Cahill</h3>
            </li>
            <li>
              <p>Door Supervisor Training</p>
            </li>
            <li>
              <p>Cardiff</p>
            </li>
            <li>
              <button className={`${styles.btn_grey}`}>BOOKED</button>
            </li>
          </ul>
          <button className={`${styles.create_btn}`}>
            <img
              src={process.env.APP_URL + "/images/e-add.svg"}
              alt="icon"
              className={`img-fluid`}
            />
            Create new booking
          </button>
        </div> */}
            <figure className={styles.figure_wrap}>
              <img
                src={process.env.APP_URL + "/images/guard-train.png"}
                className="img-fluid"
              />
            </figure>
          </Fade>
        </Col>
      </Row>
    </Col>
  );
};

export default GuardTrain;
