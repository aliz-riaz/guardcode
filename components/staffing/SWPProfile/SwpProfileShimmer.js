import React, { useState, useEffect, useRef, createRef } from "react";
import { connect } from "react-redux";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import styles from "./SWPProfile.module.scss";
import { isMobile } from "react-device-detect";

function SWPProfileShimmer(props) {
  return (
    <>
      <div
        className={`${styles.applicant_profile} ${
          props.swp_profile_window_to_be_shown ? styles.open : null
        } rounded`}
      >
        <div
          className={`${styles.swp_profile} ${
            props.swp_profile_window_to_be_shown ? styles.show : ""
          }`}
        >
          <SimpleBar
            style={
              isMobile
                ? { maxHeight: "calc((100%) - (164px))" }
                : { maxHeight: "calc((100%) - (24px))" }
            }
          >
            <div className={`${styles.scroll_box}`}>
              <div className={`${styles.profile_header}`}>
                <span
                  className={`${styles.applied_date} shimmerBG d-block py-2 px-2 w-25`}
                ></span>
                <div
                  className={`${styles.top_content_wrap} flex-grow-1 flex-shrink-0`}
                >
                  <div className="d-flex ">
                    <div className={`shrink-0 ${styles.profile_avatar} mr-2`}>
                      <div className="shimmerBG rounded-circle w-100 h-100"></div>
                    </div>
                    <div
                      className={`${styles.profile_info} h-100 flex-shrink-0 w-50`}
                    >
                      <div className="d-block shimmerBG  w-100 py-3"></div>
                      <div className="d-block shimmerBG  w-100 py-2 mt-2"></div>
                      <div className="d-block shimmerBG  w-100 py-2 mt-1"></div>
                      <div className="d-block shimmerBG  w-100 py-2 mt-1"></div>
                    </div>
                  </div>
                  <div className={`${styles.licenses_wrap} `}>
                    <div className={` shimmerBG w-50 py-2 px-3`}></div>
                    <div className={` shimmerBG w-50 py-2 px-3`}></div>
                    <div className={` shimmerBG w-50 py-2 px-3`}></div>
                  </div>
                </div>
                <div>
                  <div className="shimmerBG h-25 px-5 py-5"></div>
                  <div className="shimmerBG  px-4 py-3 mt-3"></div>
                  <div className="shimmerBG  px-4 py-3 mt-1"></div>
                </div>
              </div>
              <div className={`${styles.card_body_wrap}`}>
                <div className={`${styles.column_wrap}`}>
                  <div className={`${styles.experience_card} mt-4`}>
                    <div className="shimmerBG py-3 px-5 w-50"></div>
                    <div className="shimmerBG py-2 px-5 w-25 mt-3"></div>
                    <div className="shimmerBG py-2 px-5 w-25 mt-2"></div>
                    <div className="shimmerBG py-2 px-5 w-25 mt-2"></div>
                  </div>
                  <div className={`${styles.experience_card} mt-4`}>
                    <div className="shimmerBG py-3 px-5 w-50"></div>
                    <div className="shimmerBG py-2 px-5 w-25 mt-3"></div>
                    <div className="shimmerBG py-2 px-5 w-25 mt-2"></div>
                    <div className="shimmerBG py-2 px-5 w-25 mt-2"></div>
                  </div>
                </div>
                <div className={`${styles.column_wrap}`}>
                  <div className="shimmerBG py-5 px-5 w-50 ml-auto w-75 rounded">
                    <div className="py-5 my-5"></div>
                  </div>
                </div>
              </div>
            </div>
          </SimpleBar>
        </div>
      </div>

      {/* SWP Profile column 3 for web view */}
      {!isMobile ? (
        <div
          className={`mt-0 ${styles.candidate_actions} ${
            props.swp_profile_window_to_be_shown ? styles.open : null
          } ${isMobile && "d-none"}`}
        >
          <div className="d-flex justify-content-between">
            <div className="shimmerBG py-3 w-50"></div>
            <div className="shimmerBG py-3 w-50 ml-2"></div>
          </div>
          <div>
            <div className="shimmerBG py-5 w-100 mt-3">
              <div className="py-5 my-5"></div>
            </div>
          </div>
          <div>
            <div className="shimmerBG py-5 w-100 mt-3"></div>
          </div>
        </div>
      ) : null}
    </>
  );
}
const mapStateToProps = (state) => ({
  swp_profile_window_to_be_shown:
    state.vantage.staffingReducer.swpProfileWindowToBeShown,
});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SWPProfileShimmer);
