import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import {
  setShowCVSearchProfileStatus,
  setSwpProfileId,
  checkAvaliableViews,
  setCVSearchViews,
  setIsSWPProfileLoading,
} from "../../redux/actions/cvSearchAction";
import {
  setShowBillingModal,
  setShowCVViewCalculator,
} from "../../redux/actions/billingAction";
import NoPreviewModal from "./NoPreviewModal";
import styles from "./CVSearchCard.module.scss";

const CVSearchCard = ({
  applicant,
  setShowCVSearchProfileStatus,
  setSwpProfileId,
  user_token,
  checkAvaliableViews,
  setCVSearchViews,
  setIsSWPProfileLoading,
  swp_profile_cv_search_id,
  show_cv_search_profile,
  setShowBillingModal,
  setShowCVViewCalculator,
}) => {
  const [showModal, setShowModal] = useState(false);

  const profileCardHandler = async () => {
    if (swp_profile_cv_search_id == applicant.id && show_cv_search_profile) {
      return;
    }
    setIsSWPProfileLoading(true);
    if (applicant.employer_viewed) {
      // setCVSearchViews(data.count)
      setShowCVSearchProfileStatus(true);
      setSwpProfileId(applicant.id);
      return;
    }
    const { data } = await checkAvaliableViews(user_token, applicant.id);
    if (data.status) {
      // open profile
      setCVSearchViews(data.remaining_views);
      setShowCVSearchProfileStatus(true);
      setSwpProfileId(applicant.id);
      return;
    }
    // show modal
    // setShowModal(true);
    setShowBillingModal(true);
    setShowCVViewCalculator(true);
    setIsSWPProfileLoading(false);
    return;
  };

  const handleClose = () => setShowModal(false);

  return (
    <>
      {/* <div
        className={`${styles.cv_search_card} bg-white rounded px-4 py-4 mb-2`}
        onClick={profileCardHandler}
      >
        <div className={`row`}>
          <div className="col-12 col-md-8">
            <div className={`d-flex align-items-start align-items-md-center`}>
              <div
                className={`${styles.cv_search_avatar} ${
                  applicant.employer_viewed == 0 ? "blur-3" : null
                } rounded-circle`}
              >
                <img src={applicant.profile_picture} className=" img-fluid" />
              </div>
              <div className={`${styles.cv_search_info} pl-2 flex-grow-1`}>
                <h4 className={`fs-6 p-0 mb-0 mt-1 d-inline`}>
                  {applicant.first_name}{" "}
                  <span
                    className={`${
                      applicant.employer_viewed == 0 ? "blur-3" : null
                    }`}
                  >
                    {applicant.middle_name != null && applicant.middle_name}{" "}
                    {applicant.last_name}
                  </span>
                </h4>
                {!!applicant.employer_viewed && (
                  <div className="ml-0 ml-md-2 mt-1 mt-md-0 d-block d-md-inline">
                    <img
                      src={`${process.env.APP_URL}/images/c-check-sm.svg`}
                      class={`img-fluid translate-x-minus-1`}
                    />
                    <span
                      className={`ml-1 ${styles.profile_view_text} fw-medium`}
                    >
                      Profile Viewed
                    </span>
                  </div>
                )}
                <p
                  className={`${styles.location} d-flex fs-7 mb-0 mt-1 mt-md-0`}
                >
                  <i className="translate-x-minus-1">
                    <img
                      src={`${process.env.APP_URL}/images/map-pin-2.svg`}
                      alt="Pin icon"
                    />
                  </i>
                  <span className="pl-1">{`${applicant.postcode}, ${applicant.city}`}</span>
                </p>
              </div>
            </div>
          </div>
          <div
            className={`col-12 col-md-4 d-none d-md-flex justify-content-end`}
          >
            <div className={`${styles.detail} text-right text-md-right`}>
              <div className={`${styles.status}`}>
                <span
                  className={`${styles.online} d-inline-block rounded-circle bg-success`}
                ></span>
                <span className="ml-2">{`Active ${applicant.last_active_formatted}`}</span>
              </div>
              <div className={`${styles.miles} mt-2`}>
                <span className={` d-inline-block`}>
                  <img
                    src={`${process.env.APP_URL}/images/map-pin-2.svg`}
                    alt="Pin icon"
                  />
                </span>
                <span className="ml-2 text-black-50">
                  {applicant?.distance == 0
                    ? "less than a mile"
                    : `${applicant.distance} Miles  Away`}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {applicant.license.length > 0 && (
              <div className={`${styles.license_list}`}>
                <ul className="list-unstyled mb-0">
                  {applicant.license.map((lic) => {
                    return (
                      <li>
                        <img
                          src={`${process.env.APP_URL}/images/verified-icn-sml-2.svg`}
                          class="img-fluid"
                        />
                        <span>{lic.course_license}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          <div
            className={`col-12 d-block d-md-none text-center border border-top-1 border-bottom-0 border-left-0 border-right-0 border-light mt-3 pt-3`}
          >
            <div className={`${styles.detail}`}>
              <div className={`${styles.status}`}>
                <span
                  className={`${styles.online} d-inline-block rounded-circle bg-success`}
                ></span>
                <span className="ml-2">{`Active ${applicant.last_active_formatted}`}</span>
              </div>
            </div>
            <div className={`${styles.detail}`}>
              <div className={`${styles.miles}`}>
                <span className={` d-inline-block`}>
                  <img
                    src={`${process.env.APP_URL}/images/map-pin-2.svg`}
                    alt="Pin icon"
                  />
                </span>
                <span className="ml-2 text-black-50">
                  {applicant?.distance == 0
                    ? "less then a mile"
                    : `${applicant.distance} Miles  Away`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className={`${styles.applicant_card_new}`}>
        <ul>
          <li className={`pl-0`}>
            <div className={`${styles.user_header} d-flex align-items-center`}>
              <div
                className={`${styles.applicant_avatar} ${
                  applicant.employer_viewed == 0 ? "blur-3-0" : null
                } flex-shrink-0`}
                onClick={profileCardHandler}
              >
                <figure>
                  <img src={applicant.profile_picture} className=" img-fluid" />
                </figure>
              </div>
              <div className={`${styles.applicant_info} flex-grow-1 `}>
                <h3
                  className="d-inline-block fw-medium mb-0 p-0 cursor-pointer"
                  onClick={profileCardHandler}
                >
                  {applicant.first_name}
                  <span
                    className={`${
                      applicant.employer_viewed == 0 ? "blur-3" : null
                    }`}
                  >
                    {applicant.middle_name != null && applicant.middle_name}{" "}
                    {applicant.last_name}
                  </span>
                </h3>
                {!!applicant.employer_viewed && (
                  <div className="ml-0 ml-md-2 mt-1 mt-md-0 d-inline-block d-md-inline">
                    <img
                      src={`${process.env.APP_URL}/images/c-check-sm.svg`}
                      class={`img-fluid translate-x-minus-1`}
                    />
                    <span
                      className={`ml-1 ${styles.profile_view_text} fw-medium`}
                    >
                      Profile Viewed
                    </span>
                  </div>
                )}
                <p
                  className={`${styles.city} d-flex align-items-md-center mb-2`}
                >
                  <img
                    src={process.env.APP_URL + "/images/map-pin.svg"}
                    height="14px"
                  />
                  <span className="ml-2">
                    {`${applicant.postcode}, ${applicant.city}`}
                  </span>
                </p>
              </div>
            </div>
          </li>
          <li>
            <div className={`${styles.licenses_wrap} mb-3`}>
              {applicant.license.map((lic) => {
                return (
                  <>
                    <div className={`${styles.license_card}`}>
                      <img
                        src={process.env.APP_URL + "/images/badge-img.svg"}
                        className="img-fluid"
                      />
                      <span>{lic.course_license}</span>
                    </div>
                  </>
                );
              })}
            </div>
          </li>
          <li>
            <div className={`${styles.detail} text-right text-md-right`}>
              <div className={`${styles.status}`}>
                <span
                  className={`${styles.online} d-inline-block rounded-circle bg-success`}
                ></span>
                <span className="ml-2">{`Active ${applicant.last_active_formatted}`}</span>
              </div>
              <div className={`${styles.miles} mt-2`}>
                <span className={` d-inline-block`}>
                  <img
                    src={`${process.env.APP_URL}/images/map-pin-2.svg`}
                    alt="Pin icon"
                  />
                </span>
                <span className="ml-2 text-black-50">
                  {applicant?.distance == 0
                    ? "less than a mile"
                    : `${applicant.distance} Miles  Away`}
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      {/* <NoPreviewModal showModal={showModal} handleClose={handleClose} /> */}
    </>
  );
};

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  swp_profile_cv_search_id: state.vantage.cvSearchReducer.swpProfileId,
  show_cv_search_profile: state.vantage.cvSearchReducer.showCVSearchProfile,
});

const mapDispatchToProps = (dispatch) => ({
  setShowCVSearchProfileStatus: (status) =>
    dispatch(setShowCVSearchProfileStatus(status)),
  setIsSWPProfileLoading: (status) => dispatch(setIsSWPProfileLoading(status)),
  setSwpProfileId: (jobSeekerId) => dispatch(setSwpProfileId(jobSeekerId)),
  checkAvaliableViews: (userToken, jobSeekerId) =>
    dispatch(checkAvaliableViews(userToken, jobSeekerId)),
  setCVSearchViews: (CVSearchViews) =>
    dispatch(setCVSearchViews(CVSearchViews)),

  setShowBillingModal: (status) => dispatch(setShowBillingModal(status)),
  setShowCVViewCalculator: (status) =>
    dispatch(setShowCVViewCalculator(status)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CVSearchCard);
