import React, { useEffect } from "react";
import { connect } from "react-redux";
import dynamic from "next/dynamic";
import {
  setChatBookingsSwtichValue,
  setChatBookingsSeletedTeamMembers,
} from "../../redux/actions/organisationAction";

import {
  setShowChannelForChat,
  setIsCurrentPage,
} from "../../redux/actions/chatAction";

const TeamAccessFilters = dynamic(
  () => import("../Common/TeamAccess/TeamAccessFilters"),
  { ssr: false }
);

function TeamAccesFiltersForChat(props) {
  useEffect(() => {
    return () => {
      props.setChatBookingsSwtichValue(props.leftText);
      props.setChatBookingsSeletedTeamMembers([]);
    };
  }, []);

  return (
    <>
      {props.organisationMembers &&
        props.organisationMembers?.length > 0 &&
        props.userMenusAccess.find(
          (element) => element.title == "Chat" && element.access_level == "FULL"
        ) && (
          <div className="p-3">
            <TeamAccessFilters
              leftSideClickHandler={() => {
                props.setChatBookingsSwtichValue(props.leftText);
                props.setShowChannelForChat(false);
                props.setIsCurrentPage(1);
                props.setChatBookingsSeletedTeamMembers([]);
              }}
              leftText={props.leftText}
              rightSideClickHandler={() => {
                props.setChatBookingsSwtichValue(props.rightText);
                props.setShowChannelForChat(false);
                props.setIsCurrentPage(1);
              }}
              rightText={props.rightText}
              seletedTeamMembers={
                props.organisationFilters.chat.seletedTeamMembers
              }
              setSeletedTeamMembers={(e) => {
                props.setIsCurrentPage(1);
                props.setChatBookingsSeletedTeamMembers(e);
              }}
              switchValue={props.organisationFilters.chat.switchValue}
            />
          </div>
        )}
    </>
  );
}

const mapStateToProps = (state) => ({
  userMenusAccess: state.vantage.organisationReducer.userMenusAccess,
  organisationFilters: state.vantage.organisationReducer.filter,
  organisationMembers: state.vantage.organisationReducer.organisationMembers,
});

const mapDispatchToProps = (dispatch) => ({
  setChatBookingsSwtichValue: (value) =>
    dispatch(setChatBookingsSwtichValue(value)),
  setChatBookingsSeletedTeamMembers: (members) =>
    dispatch(setChatBookingsSeletedTeamMembers(members)),
  setShowChannelForChat: (status) => dispatch(setShowChannelForChat(status)),
  setIsCurrentPage: (page) => dispatch(setIsCurrentPage(page)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamAccesFiltersForChat);
