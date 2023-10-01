import React from "react";
import styles from "./CVSearchCard.module.scss";

const CVSearchCardShimmer = (props) => {
  return (
    <div className={`${styles.applicant_card_new}`}>
      <ul>
        <li className={`pl-0`}>
          <div className={`${styles.user_header} d-flex align-items-center`}>
            <div
              className={`${styles.applicant_avatar} flex-shrink-0 animated_shimmer mb-0`}
            >
              <figure>
                <img
                  src={process.env.APP_URL + "/images/user-1.jpg"}
                  className=" img-fluid"
                />
              </figure>
            </div>
            <div className={`${styles.applicant_info} flex-grow-1 `}>
              <h3 className="d-block fw-medium mb-0 p-0 cursor-pointer animated_shimmer">
                test account
              </h3>
              <p
                className={`${styles.city} d-inline-flex align-items-md-center mb-2 animated_shimmer`}
              >
                <img
                  src={process.env.APP_URL + "/images/map-pin.svg"}
                  height="14px"
                />
                <span className="ml-2">london uk</span>
              </p>
            </div>
          </div>
        </li>
        <li>
          <div className={`${styles.licenses_wrap} mb-3`}>
            {[1, 2, 3, 4].map((ind) => {
              return (
                <>
                  <div
                    className={`${styles.license_card} animated_shimmer mb-0`}
                  >
                    <img
                      src={process.env.APP_URL + "/images/badge-img.svg"}
                      className="img-fluid"
                    />
                    <span>Door Supervisor license</span>
                  </div>
                </>
              );
            })}
          </div>
        </li>
        <li>
          <div className={`${styles.detail} text-right text-md-right`}>
            <div className={`${styles.status} animated_shimmer mb-0`}>
              <span
                className={`${styles.online} d-inline-block rounded-circle bg-success`}
              ></span>
              <span className="ml-2">Active</span>
            </div>
            <div className={`${styles.miles} mt-2 animated_shimmer mb-0`}>
              <span className={` d-inline-block`}>
                <img
                  src={`${process.env.APP_URL}/images/map-pin-2.svg`}
                  alt="Pin icon"
                />
              </span>
              <span className="ml-2 text-black-50">Miles Away</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CVSearchCardShimmer;
