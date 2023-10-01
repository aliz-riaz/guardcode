import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidenav from "../components/LeftNav";
import { connect } from "react-redux";
import { protectedRoute } from "../utilites/utility";
import dynamic from "next/dynamic";
import { isMobile } from "react-device-detect";
import {
  setShowToShowInSettings,
  getClaimStatus,
} from "../redux/actions/accountSettings";
import { setShowBillingModal } from "../redux/actions/billingAction";
import { useRouter } from "next/router";

const NavigationBar = dynamic(
  () => import("../components/accountSetting/NavigationBar"),
  {
    ssr: false,
  }
);
const AccountNotApprovedAlert = dynamic(
  () => import("../components/Common/AccountNotApprovedAlert"),
  {
    ssr: false,
  }
);
const TeamAccess = dynamic(
  () => import("../components/accountSetting/TeamAccess/TeamAccess"),
  {
    ssr: false,
  }
);
const GlobalChat = dynamic(
  () => import("../components/chat/globalChat/GlobalChat"),
  {
    ssr: false,
  }
);
const GeneralSettings = dynamic(
  () => import("../components/accountSetting/GeneralSettings"),
  {
    ssr: false,
  }
);
const Billing = dynamic(
  () => import("../components/accountSetting/Billing/Billing"),
  {
    ssr: false,
  }
);

export const getServerSideProps = async function (context) {
  return protectedRoute(context);
};

function AccountSetting(props) {
  const router = useRouter();
  const { query } = router;

  // useEffect(() => {
  //   if (query.redirect_to_billing) {
  //     props.setShowToShowInSettings("billing");
  //     if (props.isOrganisationApproved == 1) {
  //       props.setShowBillingModal(true);
  //     }
  //     router.replace(router.pathname, router.pathname, { shallow: true });
  //   }
  //   return () => {
  //     props.setShowToShowInSettings("general");
  //   };
  // }, []);

  const renderScreen = (screenToShow) => {
    switch (screenToShow) {
      case "general":
        return <GeneralSettings />;
      case "teamAccess":
        return (
          <>
            <AccountNotApprovedAlert />
            <TeamAccess />
          </>
        );
      case "billing":
        return (
          <>
            <AccountNotApprovedAlert />
            <Billing />
          </>
        );

      default:
        return <GeneralSettings />;
    }
  };

  return (
    <>
      <Header isNavBarOpenCookie={props.isNavBarOpenCookie} />
      <div className="main-layout">
        <Sidenav isNavBarOpenCookie={props.isNavBarOpenCookie} />
        <div className="main-content">
          <NavigationBar />
          {typeof window !== undefined && renderScreen(props.screenToShow)}
          {!isMobile && <GlobalChat />}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  user_id: state.vantage.userDataReducer.user_id,
  isBillingEnabled: state.vantage.billingReducer.isBillingEnabled,
  screenToShow: state.vantage.accountSettingsReducer.screenToShow,
  currentStep: state.vantage.billingReducer.currentStep,
  isOrganisationApproved:
    state.vantage.organisationReducer.isOrganisationApproved,
});

const mapDispatchToProps = (dispatch) => ({
  userSignUpAction: (name, company_name, email, phoneNumber) =>
    dispatch(userSignUpAction(name, company_name, email, phoneNumber)),
  setShowToShowInSettings: (screen) =>
    dispatch(setShowToShowInSettings(screen)),
  getClaimStatus: (userToken) => dispatch(getClaimStatus(userToken)),
  setShowBillingModal: (status) => dispatch(setShowBillingModal(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountSetting);
