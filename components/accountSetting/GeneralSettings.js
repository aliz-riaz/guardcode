import React, { useEffect, useState } from "react";
// import { TabContent, TabPane, Nav, NavItem, NavLink, Spinner } from 'reactstrap';
import { Modal } from "react-bootstrap";
import PersonalInfo from "./PersonalInfo";
import CompnayDetail from "./CompnayDetail";
import NoClaimScreen from "./NoClaimScreen";
import PendingClaimScreen from "./PendingClaimScreen";
import RejectedClaimScreen from "./RejectedClaimScreen";
import AddOrganisation from "../Organisation/AddOrganisation";
import { useRouter } from "next/router";
import EditPersonalInfo from "./EditPersonalInfo";
import FormikTest from "./FormikTest.tsx";
import AccessLevel from "./AccessLevel";
import { connect } from "react-redux";
import { getClaimStatus } from "../../redux/actions/accountSettings";

const GeneralSettings = (props) => {
  const router = useRouter();

  const [organisationModal, setOrganisationModal] = useState(false);
  const [claimStatus, setClaimStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const cancelHandler = () => {
    setOrganisationModal((prev) => !prev);
  };

  useEffect(() => {
    const checkUsersClaimStatus = async () => {
      setLoading(true);
      const data = await props.getClaimStatus(props.user_token);
      setClaimStatus(data.claim_request_status);
      setLoading(false);
    };
    if (props.isAccountOwner) {
      checkUsersClaimStatus();
    }
  }, [props.isAccountOwner]);

  return (
    <div>
      {props.loading ? null : (
        <div className="main-inner-content">
          <div className="d-flex justify-content-between align-items-center flex-wrap mt-4 mb-3">
            <h2 className="fs-2 fw-bold m-0">Account Information</h2>
            <button
              className="btn btn-md btn-green py-2 w-100 w-md-auto d-flex align-items-center justify-content-center mt-2 mt-md-0"
              onClick={() => setOrganisationModal(true)}
            >
              <img
                src={`${process.env.APP_URL}/images/plus.svg`}
                height={`14px`}
                className="translate-x-minus-1"
              />
              <span className="ml-2">Create Organisation</span>
            </button>
          </div>
          {organisationModal && (
            <AddOrganisation
              show={organisationModal}
              cancelHandler={cancelHandler}
              setOrganisationModal={setOrganisationModal}
            />
          )}
          <PersonalInfo />
          {/* <CompnayDetail loading={loading} claimStatus={claimStatus} /> */}
          {props.isAccountOwner ? (
            claimStatus ? (
              <CompnayDetail loading={loading} claimStatus={claimStatus} />
            ) : (
              <NoClaimScreen />
            )
          ) : null}
          <AccessLevel />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  isAccountOwner: state.vantage.organisationReducer.isAccountOwner,
});

const mapDispatchToProps = (dispatch) => ({
  getClaimStatus: (userToken) => dispatch(getClaimStatus(userToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GeneralSettings);
