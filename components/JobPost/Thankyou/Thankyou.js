import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import useThankyou from "../../../hooks/JobPost/useThankyou";
import styles from "./Thankyou.module.scss";
import {
  setScreenToShowOnStaffing,
  setLatestJobId,
} from "../../../redux/actions/staffingAction";
import { Spinner } from "react-bootstrap";

import {
  setShowCVSearchProfileStatus,
  setSwpProfileId,
  setIsSWPProfileLoading,
} from "../../../redux/actions/cvSearchAction";
import SwpPrpfileForCvSearch from "../../../components/CVSearch/SwpPrpfileForCvSearch";

const ThankyouForJobPost = (props) => {
  const [data, setData] = useState([]);
  const [jobId, setJobId] = useState(props.draft_payment_id); //props.draft_payment_id 396
  // const { data, isLoading, error } = useThankyou(396);
  const { mutate, isLoading } = useThankyou();
  const router = useRouter();

  useEffect(() => {
    mutate(jobId, {
      onSuccess: (data) => {
        setData(data.data.data);
      },
    });
    props.setLatestJobId(props.draft_payment_id);
    props.restJobPostReducer();
    return () => {
      props.resetLastJobConnect(null);
    };
  }, []);

  const profileCardHandler = (id) => {
    props.setIsSWPProfileLoading(true);
    props.setSwpProfileId(id);
    props.setShowCVSearchProfileStatus(true);
  };

  return (
    <>
      <div className="row">
        <div
          className={`${
            data && data.matching?.length == 0 ? "col-12" : "col-md-8"
          } `}
        >
          <div className="pt-2 pt-md-5 pb-2 pb-md-4 row">
            <div className="col text-center">
              <h3 className=" text-sm-uppercase fs-2">
                <span className="mr-2">All done</span>
                <img
                  src={`${process.env.APP_URL}/images/c-check-2.svg`}
                  style={{ marginTop: "-4px" }}
                />
              </h3>
              <p className="fw-bold fs-4">Your job has been posted </p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div
              className={`col-12  ${
                data && data.matching?.length == 0 ? "col-md-5" : "col-lg-7"
              }`}
            >
              <div
                className={`thankyou_box bg-white p-4 rounded position-relative`}
              >
                <h4>What happens next?</h4>
                <ul className={`${styles.list_msg} list-bullet pl-2 mt-4`}>
                  <li className="mt-3 fw-medium">
                    We’re busy finding the right applicants for this job. You’ll
                    be notified as applicants apply.
                  </li>
                  <li className="mt-3 fw-medium">
                    You’ll be able to review, shortlist and contact applicants
                    who apply for this role.
                  </li>
                  {data && data.matching?.length > 0 && (
                    <li className="mt-3 fw-medium">
                      You can invite matching jobseekers to your job
                    </li>
                  )}
                </ul>
                {data && data.matching?.length > 0 && (
                  <img
                    src={`${process.env.APP_URL}/images/new_round_arrow.svg`}
                    className={`${styles.new_round_arrow} position-absolute`}
                  />
                )}
              </div>
              <div className="row">
                <div className="col-12 col-md-6 d-none">
                  <button
                    className="btn btn-sm btn-green btn btn-secondary w-100 mt-3"
                    onClick={() => {
                      router.push("/staffing");
                      props.setScreenToShowOnStaffing("applicants");
                    }}
                  >
                    Invite matching applicants
                  </button>
                </div>
                <div className="col-12 col-md-6">
                  <button
                    className="btn btn-sm btn-black btn btn-secondary w-100 mt-3"
                    onClick={() => {
                      props.setShowThankyou(false);
                      router.push("/jobpost");
                    }}
                  >
                    Post another job
                  </button>
                </div>
              </div>
            </div>

            {/* {props.last_job_connects == 0 && (
          <>
            <div className="col-12 col-md-4">
              <div className="booking_history_card mt-3 mt-md-0">
                <h4>Your receipt</h4>
                <div class="course_summary">
                  <div class="course_summary_row align-items-center justify-content-center">
                    <div class="course_name d-flex align-items-center">
                      <img src="/employers/images/bill-icn.svg" alt="" />
                      <p href="#" class="ml-2 mb-0 receipt_text">
                        Your receipt has been emailed to you.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`${styles.gurantee_card} d-flex px-3 py-3 ${
                  props.last_job_connects == 0 ? "" : "mt-4 mt-md-0"
                }`}
                style={{
                  background: `url(${process.env.APP_URL}/images/big-bg-bacvk@2x.png)`,
                }}
              >
                <div className={`${styles.gurantee_badge} flex-shrink-0`}>
                  <img
                    src={process.env.APP_URL + "/images/Risky.svg"}
                    width={"68px"}
                  />
                </div>
                <div className={`${styles.gurantee_text} flex-grow-1`}>
                  <h4 className="text-white pb-0 mb-0 mt-0 mt-md-1">
                    100% <span>Money Back Guarantee</span>
                  </h4>
                  <p className="text-white mb-0">
                    We’ll fully refund you if you don’t get a minimum{" "}
                    <span className="fw-bold">10 applicants</span> within 3 days
                    of posting your job.
                  </p>
                </div>
              </div>
            </div>
          </>
        )} */}
          </div>
        </div>
      </div>

      {isLoading ? (
        <></>
      ) : (
        <>
          {data && data.matching?.length > 0 && (
            <div className={`${styles.matching_applicants} px-4 py-4 bg-white`}>
              <h4 className="fs-5">
                Invite matching applicants to apply for the{" "}
                {data && data.job.title} role
              </h4>
              <p className="fs-6 fw-medium d-flex lh-normal">
                <img
                  src={`${process.env.APP_URL}/images/info_2.svg`}
                  className="mb-auto"
                />
                <span className="ml-2">
                  Inviting them to apply will send the jobseeker a request to
                  review the job ad and apply.{" "}
                </span>
              </p>
              <div className={`${styles.applicants} `}>
                {data.matching.map((item, i) => {
                  return (
                    <div
                      className={`${
                        styles.applicant
                      } rounded d-flex align-items-center ${
                        i != 0 && "mt-3"
                      } cursor-pointer`}
                      onClick={() => profileCardHandler(item.id)}
                    >
                      <div
                        className={`${styles.avatar} rounded-circle flex-shrink-0 overflow-hidden`}
                      >
                        <img src={item.profile_picture} className="img-fluid" />
                      </div>
                      <div className={`${styles.right_cont} flex-grow-1 pl-3`}>
                        <div className={`d-flex`}>
                          <div className={`${styles.info}`}>
                            <h5 className="mb-1">{item.fullname}</h5>
                            <p className="fs-6 d-flex lh-normal mb-2">
                              <img
                                src={`${process.env.APP_URL}/images/map-pin.svg`}
                                height={`14px`}
                              />
                              <span className="ml-1">{item.city}</span>
                            </p>
                          </div>
                          {/* <div
                            className={`${styles.video_btn} ml-auto position-relative cursor-pointer`}
                            onClick={() => profileCardHandler(item.id)}
                            >
                            <span className="fw-bold text-white d-block rounded-pill px-2">
                              <span
                                className={`${styles.play} position-absolute rounded-circle d-flex align-content-center justify-content-center`}
                              >
                                <img
                                  src={`${process.env.APP_URL}/images/triangle-right 1.svg`}
                                  height={`14px`}
                                  className=""
                                />
                              </span>
                              Profile Video
                            </span>
                          </div> */}
                        </div>
                        <ul className="pl-0">
                          {item.license?.length > 0
                            ? item.license.map((val) => {
                                return (
                                  <li className="d-flex my-1">
                                    <div className={`${styles.card}`}>
                                      <i>
                                        <img
                                          src={`${process.env.APP_URL}/images/license-icn.svg`}
                                          alt=""
                                        />
                                      </i>
                                      <span
                                        className="font-weight-bold ml-2"
                                        style={{ marginTop: "2px" }}
                                      >
                                        {val.course_license}
                                      </span>
                                      <span id="btn-0" className="ml-2 mt-1">
                                        <span className="d-block">
                                          <img
                                            src={`${process.env.APP_URL}/images/verified-icn-sml-2.svg`}
                                            className="mb-2"
                                            width="17"
                                          />
                                        </span>
                                      </span>
                                    </div>
                                  </li>
                                );
                              })
                            : null}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      <SwpPrpfileForCvSearch chatButton={false} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user_token: state.vantage.userDataReducer.user_token,
    last_job_connects: state.vantage.staffingReducer.lastJobConnects,
    draft_payment_id: state.vantage.jobPostReducer.draftLatestJobId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    restJobPostReducer: () => dispatch({ type: "RESET_JOBPOST_REDUCER" }),
    resetLastJobConnect: (value) =>
      dispatch({ type: "SET_LAST_JOB_CONNECT", payload: value }),
    setScreenToShowOnStaffing: (screen) =>
      dispatch(setScreenToShowOnStaffing(screen)),
    setLatestJobId: (jobId) => dispatch(setLatestJobId(jobId)),

    setSwpProfileId: (jobSeekerId) => dispatch(setSwpProfileId(jobSeekerId)),
    setIsSWPProfileLoading: (status) =>
      dispatch(setIsSWPProfileLoading(status)),
    setShowCVSearchProfileStatus: (status) =>
      dispatch(setShowCVSearchProfileStatus(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThankyouForJobPost);
