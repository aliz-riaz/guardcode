import { requestCVSearchAccess } from "../../redux/actions/cvSearchAction";
import { useState } from "react";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";

import styles from "./RequestCVSearch.module.scss";

const RequestCVSearch = (props) => {
  const [isRequestLoading, setIsRequestLoading] = useState(false);

  const handlerCVSearchRequest = async () => {
    setIsRequestLoading(true);
    const data = await props.requestCVSearchAccess(props.user_token);
    setIsRequestLoading(false);
    props.setCVSearchStatus(data.data.status);
  };

  return (
    <>
      <div
        className={`${styles.locked_feature} d-flex align-items-center justify-content-center`}
      >
        <div className={`${styles.locked_feature_box} bg-white rounded `}>
          <div className="row">
            <div className="col-12 col-md-5">
              <div>
                <h2 className="fw-bold">Search 1000s of verified CVs</h2>
                <span
                  className={`${styles.lock_badged} px-3 py-2 d-inline-flex align-items-center`}
                >
                  <img
                    src={`${process.env.APP_URL}/images/lock_1.svg`}
                    className="translate-x-minus-1"
                  />
                  <span className="ml-1">Locked Feature</span>
                </span>
                <ul className="fs-6 text-dark list-unstyled mt-3">
                  <li className="my-2 my-md-3 d-flex align-items-center">
                    <img
                      src={`${process.env.APP_URL}/images/check-circle.svg`}
                      className="translate-x-minus-1"
                    />
                    <span className="ml-2">Search by location or licence</span>
                  </li>
                  <li className="my-2 my-md-3">
                    <img
                      src={`${process.env.APP_URL}/images/check-circle.svg`}
                      className="translate-x-minus-1"
                    />
                    <span className="ml-2">Instant chat messaging</span>
                  </li>
                  <li className="my-2 my-md-3">
                    <img
                      src={`${process.env.APP_URL}/images/check-circle.svg`}
                      className="translate-x-minus-1"
                    />
                    <span className="ml-2">Unlimited searches</span>
                  </li>
                  <li className="my-2 my-md-3">
                    <img
                      src={`${process.env.APP_URL}/images/check-circle.svg`}
                      className="translate-x-minus-1"
                    />
                    <span className="ml-2">
                      Rich profiles with video intros
                    </span>
                  </li>
                </ul>
                {props.CVSearchStatus == "Pending" ? (
                  <div
                    className={`${styles.notes} d-inline-block rounded py-3 px-3`}
                  >
                    We've received your access request, our{" "}
                    <br className="d-none d-md-block" /> representative will get
                    back to you shortly.
                  </div>
                ) : (
                  <div className="mt-4 pt-0 pt-md-2">
                    <button
                      className="btn btn-green btn-md py-2 px-4"
                      onClick={handlerCVSearchRequest}
                      disabled={isRequestLoading}
                    >
                      Request Access
                      {/* isRequestLoading */}
                      {isRequestLoading && (
                        <Spinner
                          size="sm"
                          animation="border"
                          role="status"
                          className="ml-2"
                        ></Spinner>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="col-12 col-md-7 text-md-right mt-3 mt-md-0">
              <div
                className={`${styles.request_cv_search_img} position-relative d-inline-block`}
              >
                <img
                  src={`${process.env.APP_URL}/images/cvSearch-Image.png`}
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
});

const mapDispatchToProps = (dispatch) => ({
  requestCVSearchAccess: (userToken) =>
    dispatch(requestCVSearchAccess(userToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestCVSearch);
