import Link from "next/link";
import styles from "./OrganisationEmptyStateForChat.module.scss";
import { connect } from "react-redux";

const OrganisationEmptyStateForChat = (props) => {
  return (
    <div className={`${styles.emptyChat}`}>
      <div className={`text-center`}>
        <div>
          <img src={process.env.APP_URL + "/images/chat-empty.svg"} />
        </div>
        <h4 className="mt-5">
          Chat with security professionals in realtime. <br />
          Post a job or search a CV to chat.
        </h4>
        <div className="mt-4">
          <Link href="/staffing">
            <a className="text-decoration-line text-dark fs-7 mx-2" href="#">
              Take me to jobs page
            </a>
          </Link>
          <Link href="/jobpost">
            <button
              className={`btn btn-sm ${
                props.isOrganisationApproved == 0 ? "btn-gray" : "btn-green"
              } btn-left-icon w-100 w-md-auto mx-2`}
              disabled={props.isOrganisationApproved == 0 ? true : false}
            >
              <i>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="12px"
                  viewBox="0 0 448 448"
                >
                  <path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0"></path>
                </svg>
              </i>
              <span class="">Post a Job</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isOrganisationApproved:
    state.vantage.organisationReducer.isOrganisationApproved,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganisationEmptyStateForChat);
