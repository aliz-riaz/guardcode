import React from "react";
import Header from "../components/Header";
import Sidenav from "../components/LeftNav";
import { protectedRoute } from "../utilites/utility";
import { connect } from "react-redux";
import dynamic from "next/dynamic";
import ImagePreviewModal from "../components/chat/ImagePreviewModal";
import {
  setChatBookingsSwtichValue,
  setChatBookingsSeletedTeamMembers,
} from "../redux/actions/organisationAction";

const Chat = dynamic(() => import("../components/chat/Chat"), {
  ssr: false,
});

const OrganisationChat = dynamic(
  () => import("../components/chat/organisationChat/OrganisationChat"),
  {
    ssr: false,
  }
);

const TeamAccesFiltersForChat = dynamic(
  () => import("../components/chat/TeamAccesFiltersForChat"),
  {
    ssr: false,
  }
);

export const getServerSideProps = async function (context) {
  return protectedRoute(context);
};

const MY_CHAT = "My Conversations";
const ALL_CHAT = "All Conversations";

function ChatPage(props) {
  return (
    <>
      <Header isNavBarOpenCookie={props.isNavBarOpenCookie} />
      <div className="main-layout">
        <Sidenav isNavBarOpenCookie={props.isNavBarOpenCookie} />
        <div className="main-content">
          <TeamAccesFiltersForChat leftText={MY_CHAT} rightText={ALL_CHAT} />
          {props.organisationFilters.chat.switchValue == MY_CHAT ? (
            <OrganisationChat leftText={MY_CHAT} rightText={ALL_CHAT} />
          ) : (
            <OrganisationChat leftText={MY_CHAT} rightText={ALL_CHAT} />
          )}
        </div>
        <ImagePreviewModal />
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  is_user_login: state.vantage.userDataReducer.is_user_login,
  user_token: state.vantage.userDataReducer.user_token,
  booking_active_step: state.vantage.bookingReducer.booking_active_step,

  userMenusAccess: state.vantage.organisationReducer.userMenusAccess,
  organisationFilters: state.vantage.organisationReducer.filter,
});

const mapDispatchToProps = (dispatch) => ({
  setChatBookingsSwtichValue: (value) =>
    dispatch(setChatBookingsSwtichValue(value)),
  setChatBookingsSeletedTeamMembers: (members) =>
    dispatch(setChatBookingsSeletedTeamMembers(members)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
