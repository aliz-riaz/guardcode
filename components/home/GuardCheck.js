import React from "react";
import styles from "./GuardCheck.module.scss";
import Fade from "react-reveal/Fade";
import { Col, Row } from "reactstrap";

const GuardCheck = (props) => {
  return (
    <Col className="col-12">
      <p className="fs-5 fw-medium mb-3 d-block d-md-none d-lg-none">
        Security vetting for workers{" "}
      </p>
      <Row className="align-items-center">
        <Col className="col-lg-5 col-12">
          <div
            className={`py-5 ${props.styles.emp_list_wrap} ${props.styles.orange_border}`}
          >
            <div className={`${props.styles.emp_list}`}>
              <div className={`${props.styles.iconWrap}`}>
                <img
                  src={process.env.APP_URL + "/images/BS-7858.svg"}
                  alt="icon"
                  className={`img-fluid`}
                />
              </div>
              <div className={`${props.styles.content}`}>
                <h3 className={`fs-5`}>BS7858 vetting made easy</h3>
                <p className={`fs-6 m-0`}>
                  A vetting tool that ensures you stay compliant with in-built
                  validations.
                </p>
              </div>
            </div>
            <div className={`${props.styles.emp_list}`}>
              <div className={`${props.styles.iconWrap}`}>
                <img
                  src={process.env.APP_URL + "/images/p-heart.svg"}
                  alt="icon"
                  className={`img-fluid`}
                />
              </div>
              <div className={`${props.styles.content}`}>
                <h3 className={`fs-5`}>Easy onboarding</h3>
                <p className={`fs-6 m-0`}>
                  Onboard new hires easily with data collection optimised for
                  mobile phones.
                </p>
              </div>
            </div>
            <div className={`${props.styles.emp_list}`}>
              <div className={`${props.styles.iconWrap}`}>
                <img
                  src={process.env.APP_URL + "/images/geometry.svg"}
                  alt="icon"
                  className={`img-fluid`}
                />
              </div>
              <div className={`${props.styles.content}`}>
                <h3 className={`fs-5`}>Third party integrations</h3>
                <p className={`fs-6 m-0`}>
                  We use reliable partners such as CreditSafe and Yoti to check
                  ID, right to work and public record information.
                </p>
              </div>
            </div>
            <div className={`${props.styles.emp_list}`}>
              <div className={`${props.styles.iconWrap}`}>
                <img
                  src={process.env.APP_URL + "/images/messaging.svg"}
                  alt="icon"
                  className={`img-fluid`}
                />
              </div>
              <div className={`${props.styles.content}`}>
                <h3 className={`fs-5`}>Messaging tool</h3>
                <p className={`fs-6 m-0`}>
                  Missing documents or need more evidence? Send and receive
                  messages and files from inside the portal.
                </p>
              </div>
            </div>
          </div>
        </Col>
        <Col className="col-lg-6 col-12">
          <Fade bottom>
            {/* <div className={`${styles.screening_box}`}>
        <div className={`${styles.icon_wrapper}`}>
          <div className={`${styles.icon_box}`}>
            <img
              src={process.env.APP_URL + "/images/yoti-icon.svg"}
              alt="icon"
              className={`img-fluid`}
            />
          </div>
          <div className={`${styles.icon_box}`}>
            <img
              src={process.env.APP_URL + "/images/credit-icon.svg"}
              alt="icon"
              className={`img-fluid`}
            />
          </div>
        </div>
        <button className={`btn btn-md btn-green py-2 fs-6`}>
          Screening complete
        </button>
        <div className={`${styles.user_info} py-5`}>
          <figure className="m-0">
            <img
              src={process.env.APP_URL + "/images/user-2.jpg"}
              alt="icon"
              className={`img-fluid`}
            />
          </figure>
          <h3>
            Henry Brown <span>London</span>
          </h3>
        </div>
        <div className={`${styles.list}`}>
          <p>Personal information and ID</p>
          <img
            src={process.env.APP_URL + "/images/c-check.svg"}
            alt="icon"
            className={`img-fluid`}
          />
        </div>
        <div className={`${styles.list}`}>
          <p>Right to work</p>
          <img
            src={process.env.APP_URL + "/images/c-check.svg"}
            alt="icon"
            className={`img-fluid`}
          />
        </div>
        <div className={`${styles.list}`}>
          <p>Address history</p>
          <img
            src={process.env.APP_URL + "/images/c-check.svg"}
            alt="icon"
            className={`img-fluid`}
          />
        </div>
        <div className={`${styles.list}`}>
          <p>Public records</p>
          <img
            src={process.env.APP_URL + "/images/warning-sign.svg"}
            alt="icon"
            className={`img-fluid`}
          />
        </div>
        <div className={`${styles.list}`}>
          <p>5 year work history</p>
          <img
            src={process.env.APP_URL + "/images/c-check.svg"}
            alt="icon"
            className={`img-fluid`}
          />
        </div>
      </div> */}
            <figure className={`m-0 ${styles.figure_wrap} ml-auto`}>
              <img
                src={process.env.APP_URL + "/images/guard-check.png"}
                className="img-fluid"
              />
              <img
                src={process.env.APP_URL + "/images/guard-check-icon.png"}
                className={`img-fluid ${styles.icon_img}`}
              />
            </figure>
          </Fade>
        </Col>
      </Row>
    </Col>
  );
};

export default GuardCheck;
