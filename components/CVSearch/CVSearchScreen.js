import { connect } from "react-redux";
import RequestCVSearch from "../CVSearch/RequestCVSearch";
import CVSearch from "../CVSearch/CVSearch";
import { Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import {
  getUsersCVSearchRequestStatus,
  setCVSearchViewsTotal,
  setCVSearchViews,
} from "../../redux/actions/cvSearchAction";
import styles from "./CVSearch.module.scss";
import CVSearchShimmer from "./CVSearchShimmer";
const CVSearchScreen = (props) => {
  const [CVSearchScreenLoading, setCVSearchScreenLoading] = useState(false);
  const [CVSearchStatus, setCVSearchStatus] = useState("");
  const [enableCVSearch, setEnableCVSearch] = useState(false);

  useEffect(async () => {
    setCVSearchScreenLoading(true);
    const res = await props.getUsersCVSearchRequestStatus(props.user_token);
    setEnableCVSearch(
      res.data.status == "Pending" || res.data.status == "Request"
        ? false
        : true
    );
    setCVSearchStatus(res.data.status);
    props.setCVSearchViewsTotal(res.data.total_views);
    props.setCVSearchViews(res.data.remaining_views);
    setCVSearchScreenLoading(false);
  }, [props.showBillingModal]);

  return (
    <>
      <div className="main-inner-content">
        {
          CVSearchScreenLoading ? (
            <CVSearchShimmer />
          ) : (
            // <div
            //   className={`${styles.loading} d-flex align-items-center justify-content-center`}
            // >
            //   <Spinner animation="border" role="status">
            //     {" "}
            //   </Spinner>
            // </div>
            <CVSearch enableCVSearch={true} />
          )
          // !enableCVSearch && (
          //     <RequestCVSearch
          //       CVSearchStatus={CVSearchStatus}
          //       setCVSearchStatus={setCVSearchStatus}
          //     />
          //     // <p>Account is not Verified</p>
          //   )
        }
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  isOrganisationApproved:
    state.vantage.organisationReducer.isOrganisationApproved,

  showBillingModal: state.vantage.billingReducer.showBillingModal,
});

const mapDispatchToProps = (dispatch) => ({
  getUsersCVSearchRequestStatus: (userToken) =>
    dispatch(getUsersCVSearchRequestStatus(userToken)),

  setCVSearchViewsTotal: (count) => dispatch(setCVSearchViewsTotal(count)),

  setCVSearchViews: (CVSearchViews) =>
    dispatch(setCVSearchViews(CVSearchViews)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CVSearchScreen);
