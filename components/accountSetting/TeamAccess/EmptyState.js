import { useState } from "react";
import InviteTeamMemberModal from "../TeamAccess/Invite/InviteTeamMemberModal";
import styles from "./TeamAccess.module.scss";
import { connect } from "react-redux";

const EmptyState = (props) => {
  const [inviteModal, setInviteModal] = useState(false);
  return (
    <div
      className={`${styles.team_empty_state} d-flex align-items-center justify-content-center`}
    >
      <div className="text-center">
        <img
          src={process.env.APP_URL + "/images/empty_team_access.svg"}
          className="img-fluid"
          alt="coming soon"
        />
        <h2 className="fw-normal my-3">
          You haven’t added any team members to your organisation.{" "}
          <br className="d-none d-md-block" /> Invite a team member to give them
          access to your account
        </h2>
        <button
          disabled={props.isOrganisationApproved == 0 ? true : false}
          className={`btn btn-md btn-left-icon w-100 w-md-auto ${
            props.isOrganisationApproved == 0 ? "btn-gray" : "btn-green"
          }`}
          onClick={() => setInviteModal(true)}
        >
          <i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="12px"
              viewBox="0 0 448 448"
            >
              <path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0" />
            </svg>
          </i>
          <span className="">Invite Team Member</span>
        </button>
        <InviteTeamMemberModal
          inviteModal={inviteModal}
          setInviteModal={setInviteModal}
          setUpdateMember={props.setUpdateMember}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  isOrganisationApproved:
    state.vantage.organisationReducer.isOrganisationApproved,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(EmptyState);
