import React from "react";
import styles from "./GuardHire.module.scss";
import Fade from "react-reveal/Fade";
import { Col } from "react-bootstrap";
import { Row } from "reactstrap";

const GuardHire = (props) => {
  return (
    <Col className="col-12">
      <p className="fs-5 fw-medium mb-3 d-block d-md-none d-lg-none">
        Hire security workers fast
      </p>
      <Row>
        <Col className="col-lg-5 col-12">
          <div
            className={`${props.styles.emp_list_wrap} ${props.styles.purple_border}`}
          >
            <div className={`${props.styles.emp_list}`}>
              <div className={`${props.styles.iconWrap}`}>
                <img
                  src={process.env.APP_URL + "/images/badge.svg"}
                  alt="icon"
                  className={`img-fluid`}
                />
              </div>
              <div className={`${props.styles.content}`}>
                <h3 className={`fs-5`}>SIA licence check</h3>
                <p className={`fs-6 m-0`}>
                  We check every candidate’s SIA licence number against the
                  official SIA register to save you time
                </p>
              </div>
            </div>
            <div className={`${props.styles.emp_list}`}>
              <div className={`${props.styles.iconWrap}`}>
                <img
                  src={process.env.APP_URL + "/images/video-gallery.svg"}
                  alt="icon"
                  className={`img-fluid`}
                />
              </div>
              <div className={`${props.styles.content}`}>
                <h3 className={`fs-5`}>Video intros </h3>
                <p className={`fs-6 m-0`}>
                  Assess candidates better by viewing their video intros before
                  passing them on to the next stage
                </p>
              </div>
            </div>
            <div className={`${props.styles.emp_list}`}>
              <div className={`${props.styles.iconWrap}`}>
                <img
                  src={process.env.APP_URL + "/images/comment.svg"}
                  alt="icon"
                  className={`img-fluid`}
                />
              </div>
              <div className={`${props.styles.content}`}>
                <h3 className={`fs-5`}>Chat</h3>
                <p className={`fs-6 m-0`}>
                  Send and receive chat messages and files and save yourself
                  from snail mail and missed calls
                </p>
              </div>
            </div>
            <div className={`${props.styles.emp_list}`}>
              <div className={`${props.styles.iconWrap}`}>
                <img
                  src={process.env.APP_URL + "/images/screen-info.svg"}
                  alt="icon"
                  className={`img-fluid`}
                />
              </div>
              <div className={`${props.styles.content}`}>
                <h3 className={`fs-5`}>Screening information</h3>
                <p className={`fs-6 m-0`}>
                  Every applicant comes with screening data on CCJs, insolvency,
                  address proofs, and more.
                </p>
              </div>
            </div>
            <div className={`${props.styles.emp_list}`}>
              <div className={`${props.styles.iconWrap}`}>
                <img
                  src={process.env.APP_URL + "/images/zoom.svg"}
                  alt="icon"
                  className={`img-fluid`}
                />
              </div>
              <div className={`${props.styles.content}`}>
                <h3 className={`fs-5`}>CV Search</h3>
                <p className={`fs-6 m-0`}>
                  Get access to the largest register of SIA licensed security
                  workers in the UK
                </p>
              </div>
            </div>
            <div className={`${props.styles.emp_list}`}>
              <div className={`${props.styles.iconWrap}`}>
                <img
                  src={process.env.APP_URL + "/images/guard-rank.svg"}
                  alt="icon"
                  className={`img-fluid`}
                />
              </div>
              <div className={`${props.styles.content}`}>
                <h3 className={`fs-5`}>GuardRank</h3>
                <p className={`fs-6 m-0`}>
                  AI-driven scoring to link each candidate with your job,
                  enabling better decision-making.
                </p>
              </div>
            </div>
            <a
              href="employers/guardhire"
              className={`btn btn-green btn-lg mt-5 fs-5 fw-medium px-5 ${styles.guard_hire_btn}`}
            >
              Learn more
            </a>
          </div>
        </Col>
        <Col className="col-lg-7 col-12">
          <Fade bottom>
            {/* <div className="position-relative">
        <div className={`${styles.guard_hire_card}`}>
          <div className={styles.top_wrap}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={styles.body}>
            <div className={styles.card}>
              <h3>
                Security Guard <span>London</span>
              </h3>
              <div className={`${styles.skeleton_loader} w-25`}></div>
              <div className={`${styles.skeleton_loader} w-50`}></div>
              <div className={`${styles.skeleton_loader} w-25`}></div>
            </div>
            <div className={`${styles.card} border-0`}>
              <h3>
                <span>Job Details</span>
              </h3>
              <div className={`${styles.skeleton_loader} w-75`}></div>
              <div className={`${styles.skeleton_loader} w-75`}></div>
              <div className={`${styles.skeleton_loader} w-75`}></div>
            </div>
            <div className={`${styles.card} border-0`}>
              <div className={styles.badge}>
                <span>REQUIREMENT</span>Door Supervisor Licence
              </div>
              <div className={`${styles.skeleton_loader} w-75`}></div>
              <div className={`${styles.skeleton_loader} w-75`}></div>
              <div className={`${styles.skeleton_loader} w-75`}></div>
            </div>
          </div>
        </div>

        <div className={`${styles.security_profiles}`}>
          <div className={styles.card}>
            <figure className="m-0">
              <img
                src={process.env.APP_URL + "/images/user-1.jpg"}
                alt="icon"
                className={`img-fluid`}
              />
            </figure>
            <div className={styles.content}>
              <div>
                <h3>Henry Itondo</h3>
                <div className={`${styles.skeleton_loader} w-100`}></div>
                <div className={`${styles.skeleton_loader} w-75`}></div>
                <p>
                  <img
                    src={process.env.APP_URL + "/images/c-check.svg"}
                    alt="icon"
                    className={`img-fluid`}
                  />
                  Door Supervisor Licence
                </p>
              </div>
              <div className={styles.rank}>
                <img
                  src={process.env.APP_URL + "/images/rank-5.svg"}
                  alt="icon"
                  className={`img-fluid`}
                />
                <h4>
                  <span>Excellent</span>5.0 <strong>GuardRank</strong>
                </h4>
              </div>
            </div>
          </div>
          <div className={styles.card}>
            <figure className="m-0">
              <img
                src={process.env.APP_URL + "/images/user-2.jpg"}
                alt="icon"
                className={`img-fluid`}
              />
            </figure>
            <div className={styles.content}>
              <div>
                <h3>Mark Sweeney</h3>
                <div className={`${styles.skeleton_loader} w-100`}></div>
                <div className={`${styles.skeleton_loader} w-75`}></div>
                <p>
                  <img
                    src={process.env.APP_URL + "/images/c-check.svg"}
                    alt="icon"
                    className={`img-fluid`}
                  />
                  Door Supervisor Licence
                </p>
              </div>
              <div className={styles.rank}>
                <img
                  src={process.env.APP_URL + "/images/rank-4.svg"}
                  alt="icon"
                  className={`img-fluid`}
                />
                <h4>
                  <span>Excellent</span>4.0 <strong>GuardRank</strong>
                </h4>
              </div>
            </div>
          </div>
          <div className={styles.card}>
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
                <span>+ 22 other applicants</span>
              </li>
            </ul>
          </div>
        </div>
      </div> */}
            <figure className={`mt-4 mb-0 ${styles.image_wrapper}`}>
              <img
                src={process.env.APP_URL + "/images/guard-hire.png"}
                className="img-fluid"
              />
            </figure>
          </Fade>
        </Col>
      </Row>
    </Col>
  );
};

export default GuardHire;
