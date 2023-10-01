import styles from "./CandidateDetail.module.scss";

function CandidateDetailShimmer() {
  return (
    <div className={styles.details_wrapper}>
      <div className={styles.profile_view_wrap}>
        <div className={`${styles.profile_header}`}>
          <span className={`${styles.applied_date} animated_shimmer mb-0`}>
            Applied 26 May 2023
          </span>

          <div className={`${styles.top_content_wrap} w-100`}>
            <div className="d-flex">
              <div
                className={`shrink-0 ${styles.profile_avatar} mr-2 animated_shimmer mb-0 rounded-circle`}
              >
                <img
                  src={process.env.APP_URL + "/images/user-profile.jpg"}
                  alt="Profile"
                  className={`${styles.profile_img}`}
                />
              </div>

              <div className={`${styles.profile_info}`}>
                <h4 className="mb-2 animated_shimmer">Test Username</h4>
                <p className="d-flex align-items-center mb-2">
                  <img
                    src={process.env.APP_URL + "/images/map-pin.svg"}
                    alt=""
                    className="img-fluid"
                  />
                  <span className="animated_shimmer mb-0">London,Uk</span>
                </p>
                <div className={`${styles.reveal_cont}`}>
                  <a className={`d-flex align-items-center`} href={`tel:`}>
                    <img
                      src={process.env.APP_URL + "/images/call-icn-2.svg"}
                      alt=""
                      className="img-fluid"
                    />
                    <span className="animated_shimmer mb-0">0330-1234567</span>
                  </a>
                  <a
                    className={`d-flex align-items-center mb-0`}
                    href={`mailto:`}
                  >
                    <img
                      src={process.env.APP_URL + "/images/mail-icn-web.svg"}
                      alt=""
                    />
                    <span className="animated_shimmer mb-0">
                      example@example.com
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className={`${styles.licenses_wrap}`}>
              <div className={`${styles.license_card} animated_shimmer mb-0`}>
                <img src={process.env.APP_URL + "/images/driving-icon.svg"} />
                <span className="fw-medium">Driving Licence</span>
              </div>
              <div className={`${styles.license_card} animated_shimmer mb-0`}>
                <img src={process.env.APP_URL + "/images/license-icn.svg"} />
                <span className="fw-medium">Military/Police Experience</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.card_body_wrap}`}>
          <div className={`${styles.experience_card}`}>
            <h4>Experience</h4>
            <ul className="mb-0">
              <li>
                <h4 className="mb-1 animated_shimmer">Warehouse.wp</h4>
                <p className="mb-1 animated_shimmer">magna</p>
                <p className="mb-1 animated_shimmer">Dec 2021 to Dec 2022</p>
                <p className="mb-1 animated_shimmer">United Kingdom</p>
              </li>
            </ul>
          </div>
          <div className={`${styles.experience_card} border-bottom-0 pb-0`}>
            <h4>Education</h4>
            <ul className="mb-0">
              <li>
                <h4 className="mb-1 animated_shimmer">Law</h4>
                <p className="mb-1 animated_shimmer">Law.com</p>
                <p className="mb-1 animated_shimmer">Dec 2021 to Dec 2022</p>
                <p className="mb-1 animated_shimmer">United Kingdom</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.video_view_wrap}>
        <div className={styles.btn_wrapper}>
          <button className="btn btn-green btn-md w-100 text-center animated_shimmer mb-0">
            Send offer
          </button>
          <button
            className={`btn btn-secondary btn-md w-100 text-center animated_shimmer mb-0 border-0 ${styles.chat_button}`}
          >
            Chat
          </button>
        </div>
        <div className={`${styles.video_wrap} animated_shimmer mb-0`}>
          <video>
            <source
              src="https://s3-eu-west-2.amazonaws.com/get-licensed/guardpass/profile_video/VID_2022-04-04 11-58-24.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </div>
  );
}

export default CandidateDetailShimmer;
