import { useState, useRef } from "react";
import { Row, Col } from "reactstrap";

import styles from "./JobCard.module.scss";

const JobCardShimmer = (props) => {
  return (
    <>
      <div
        className={`${styles.job_card} rounded bg-white p-4`}
        style={{ marginTop: "15px" }}
      >
        <Row className="position-relative">
          <Col className="col-12 col-md-8 cursor-pointer">
            <div className="d-flex flex-column h-100">
              <div>
                <div
                  className={`d-flex align-items-md-center align-items-start  justify-content-between justify-content-md-start mb-1`}
                >
                  <h3 className="mb-0 p-0 fs-3 cursor-pointer d-flex align-items-center animated_shimmer">
                    CCTV Controller
                  </h3>
                </div>

                <p
                  className={`${styles.city} mb-1 mb-md-3 animated_shimmer d-inline-block `}
                >
                  <span className="mr-2 d-inline-block">
                    <img
                      src={`${process.env.APP_URL}/images/map-pin-1.svg`}
                      style={{ marginTop: "-2px" }}
                    />
                  </span>
                  London, Uk
                </p>
                <p
                  className={`${styles.date} m-0 text-md-right animated_shimmer d-md-none`}
                >
                  Posted on on 01 June 2023
                </p>
              </div>
              <div className="mt-2 mt-md-auto">
                <ul
                  className={`${styles.applicants} d-inline-flex list-unstyled mb-0`}
                >
                  <li>
                    <span className="animated_shimmer d-block mb-1">01</span>
                    <span className="animated_shimmer mb-0 d-block">
                      Total Applicants
                    </span>
                  </li>
                  <li>
                    <span className="animated_shimmer d-block mb-1">01</span>
                    <span className="animated_shimmer mb-0 d-block">
                      New Applicants
                    </span>
                  </li>
                  <li>
                    <span className="animated_shimmer d-block mb-1">01</span>
                    <span className="animated_shimmer mb-0 d-block">
                      Awaiting Review
                    </span>
                  </li>
                  <li>
                    <span className="animated_shimmer d-block mb-1">01</span>
                    <span className="animated_shimmer mb-0 d-block">
                      Shortlisted
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col className="ml-auto cursor-pointer">
            <div className="d-flex flex-column h-100">
              <div className="mt-auto d-none d-flex flex-column align-items-end justify-content-md-end">
                <p
                  className={`${styles.date} m-0 text-md-right animated_shimmer`}
                >
                  Posted on on 22 June 2023
                </p>
                <button
                  className={`${styles.boost_job_button} animated_shimmer mb-0 border-0`}
                >
                  <img
                    src={`${process.env.APP_URL}/images/bolt-dark.svg`}
                    alt="bolt"
                  />
                  Boost Job
                </button>
              </div>
            </div>
          </Col>
          <div
            className={`position-absolute d-flex align-items-center ${styles.jobCard__actions}`}
          >
            <div className="position-relative">
              <button className="animated_shimmer border-0 btn-md py-1">
                job action button
              </button>
            </div>
          </div>
        </Row>
      </div>
    </>
  );
};

export default JobCardShimmer;
