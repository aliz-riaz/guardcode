import React from "react";
// import { Spinner } from 'reactstrap';
// import { connect } from "react-redux";
import Link from "next/link";
import { updateIsNavbarOpenAction } from "../../redux/actions/main";

import { connect } from "react-redux";
import Cookies from "universal-cookie";

function MakeABookingButtonComponent(props) {
  const cookies = new Cookies();
  // Pacman

  return (
    <>
      <div className="text-right mt-3 mt-md-4 mb-3 mb-md-4 w-md-auto w-100 ml-auto">
        <Link href="/jobpost">
          <button
            disabled={props.isOrganisationApproved == 0 ? true : false}
            className={`btn btn-md ${
              props.isOrganisationApproved == 0 ? "btn-gray" : "btn-green"
            } btn-left-icon w-100 booking-button`}
            onClick={() => {
              props.updateIsNavbarOpenAction(false).then((resp0) => {});
              cookies.set("isNavBarOpenCookie", false, { path: "/" });
            }}
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
            <span className="">Post a Job</span>
          </button>
        </Link>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  is_request_loader: state.vantage.commonReducer.is_request_loader,
  user_token: state.vantage.userDataReducer.user_token,
  isOrganisationApproved:
    state.vantage.organisationReducer.isOrganisationApproved,
});

const mapDispatchToProps = (dispatch) => ({
  updateIsNavbarOpenAction: (value) =>
    dispatch(updateIsNavbarOpenAction(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MakeABookingButtonComponent);

// export default MakeABookingButtonComponent;
