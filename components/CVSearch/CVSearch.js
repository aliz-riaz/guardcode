import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import FiltersForCVSearch from "./FiltersForCVSearch";
import { Spinner } from "react-bootstrap";
import CVSearchCounter from "./CVSearchCounter";
import CVSearchList from "./CVSearchList";
import SwpPrpfileForCvSearch from "./SwpPrpfileForCvSearch";
import {
  setLicenseTypeForCVSearchFilter,
  setLocaitonForCVSearchFilter,
  setDistanceForCVSearchFilter,
  setVideoOnlyCheckForCVSearchFilter,
  getCVSearchResultsAgainstSearch,
  setLatitudeForCVSearch,
  setLongitudeForCVSearch,
  setSelectedLocaitonFromGoogleCVSearch,
  setShowCVSearchProfileStatus,
} from "../../redux/actions/cvSearchAction";
import PaginationForCVSearch from "./PaginationForCVSearch";
import EmptyStateForCvSearch from "./EmptyStateForCvSearch";
import styles from "./CVSearch.module.scss";
import CVSearchCardShimmer from "./CVSearchCardShimmer";

const CVSearch = (props) => {
  const [applicants, setApplicants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNoOfPages, setTotalNoOfPages] = useState(1);
  const [totalNoRecords, setTotalNoRecords] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(async () => {
    // setIsLoading(true)
    if (
      props.location_cv_search_filter != "" &&
      props.license_type_cv_search_filter.length > 0 &&
      props.latitude_cv_search_filter &&
      props.longitude_cv_search_filter &&
      props.enableCVSearch
    ) {
      const res = await props.getCVSearchResultsAgainstSearch(
        props.user_token,
        currentPage,
        {
          miles: props.distance_cv_search_filter,
          license: props.license_type_cv_search_filter,
          only_video: props.video_only_check_cv_search_filter,
          latitude: props.latitude_cv_search_filter,
          longitude: props.longitude_cv_search_filter,
        }
      );
      // setContentDataLinksForPagination(res.data.jobseekers.links)
      setApplicants(res.data.jobseekers.data);
      setTotalNoOfPages(res.data.jobseekers.last_page);
      setTotalNoRecords(res.data.jobseekers.total);
      setIsLoading(false);
      return;
    }
    setApplicants([]);
    setCurrentPage(1);
    setTotalNoOfPages(1);
    setTotalNoRecords(null);
    props.setLicenseTypeForCVSearchFilter([]);
    props.setLocaitonForCVSearchFilter("");
    props.setLatitudeForCVSearch(null);
    props.setLongitudeForCVSearch(null);
    props.setSelectedLocaitonFromGoogleCVSearch(false);
    props.setShowCVSearchProfileStatus(false);
    // setIsLoading(false)
  }, [currentPage, props.swp_profile_cv_search_id]);

  useEffect(() => {
    return () => {
      setApplicants([]);
      setCurrentPage(1);
      setTotalNoOfPages(1);
      setTotalNoRecords(null);
      props.setLicenseTypeForCVSearchFilter([]);
      props.setLocaitonForCVSearchFilter("");
      props.setDistanceForCVSearchFilter(9);
      props.setVideoOnlyCheckForCVSearchFilter(false);
      props.setLatitudeForCVSearch(null);
      props.setLongitudeForCVSearch(null);
      props.setSelectedLocaitonFromGoogleCVSearch(false);
      props.setShowCVSearchProfileStatus(false);
    };
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (!props.enableCVSearch) {
    return (
      <div
        className={`${styles.loading} d-flex align-items-center justify-content-center`}
      >
        <Spinner animation="border" size="lg" role="status">
          {" "}
        </Spinner>
      </div>
    );
  }
  return (
    <>
      <div
        className={`${styles.cv_search_left} ${
          !props.enableCVSearch && "blur-8"
        } position-relative h-100`}
      >
        <CVSearchCounter />
        <FiltersForCVSearch
          setApplicants={setApplicants}
          setTotalNoOfPages={setTotalNoOfPages}
          setTotalNoRecords={setTotalNoRecords}
          setCurrentPage={setCurrentPage}
          enableCVSearch={props.enableCVSearch}
          setIsLoading={setIsLoading}
        />
        {!!totalNoRecords ? (
          <div className={`${styles.search_detail} mt-4`}>
            <h3 className="fs-4 d-none">
              Result{" "}
              <span
                className={`rounded-circle bg-success fw-light text-white fs-6 d-inline-block d-inline-flex align-items-center justify-content-center ml-2`}
              >
                {totalNoRecords}
              </span>
            </h3>
            <p className="fw-bold fs-6 text-black mb-0">
              We found {totalNoRecords} matching profiles…
            </p>
            <p className="fw-medium fs-6 text-black-50">
              Tap on a profile to view more details or to invite them to apply
              for your jobs
            </p>
          </div>
        ) : (
          isLoading && (
            <div className={`${styles.search_detail} mt-4`}>
              <p className="fw-bold fs-6 text-black mb-1 animated_shimmer">
                We found {0} matching profiles…
              </p>
              <p className="fw-medium fs-6 text-black-50 animated_shimmer">
                Tap on a profile to view more details or to invite them to apply
                for your jobs
              </p>
            </div>
          )
        )}

        {/* isLoading */}
        {isLoading ? (
          <div className={`${styles.cv_search_list}`}>
            {[1, 2, 3].map((item) => {
              return <CVSearchCardShimmer />;
            })}
          </div>
        ) : applicants.length > 0 ? (
          <CVSearchList applicants={applicants} />
        ) : (
          <EmptyStateForCvSearch />
        )}
        <PaginationForCVSearch
          totalNoOfPages={totalNoOfPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
      {props.show_cv_search_profile && (
        <>
          <SwpPrpfileForCvSearch tagDisplay={false} chatButton={true} />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  license_type_cv_search_filter: state.vantage.cvSearchReducer.licenseType,
  location_cv_search_filter: state.vantage.cvSearchReducer.location,
  distance_cv_search_filter: state.vantage.cvSearchReducer.distance,
  video_only_check_cv_search_filter:
    state.vantage.cvSearchReducer.videoOnlyCheck,
  latitude_cv_search_filter: state.vantage.cvSearchReducer.latitude,
  longitude_cv_search_filter: state.vantage.cvSearchReducer.longitude,
  show_cv_search_profile: state.vantage.cvSearchReducer.showCVSearchProfile,
  swp_profile_cv_search_id: state.vantage.cvSearchReducer.swpProfileId,
});

const mapDispatchToProps = (dispatch) => ({
  setLicenseTypeForCVSearchFilter: (licenseType) =>
    dispatch(setLicenseTypeForCVSearchFilter(licenseType)),
  setLocaitonForCVSearchFilter: (location) =>
    dispatch(setLocaitonForCVSearchFilter(location)),
  setDistanceForCVSearchFilter: (distance) =>
    dispatch(setDistanceForCVSearchFilter(distance)),
  setVideoOnlyCheckForCVSearchFilter: (status) =>
    dispatch(setVideoOnlyCheckForCVSearchFilter(status)),
  getCVSearchResultsAgainstSearch: (userToken, currentPage, filtersData) =>
    dispatch(
      getCVSearchResultsAgainstSearch(userToken, currentPage, filtersData)
    ),
  setLatitudeForCVSearch: (lat) => dispatch(setLatitudeForCVSearch(lat)),
  setLongitudeForCVSearch: (lng) => dispatch(setLongitudeForCVSearch(lng)),
  setSelectedLocaitonFromGoogleCVSearch: (status) =>
    dispatch(setSelectedLocaitonFromGoogleCVSearch(status)),
  setShowCVSearchProfileStatus: (status) =>
    dispatch(setShowCVSearchProfileStatus(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CVSearch);
