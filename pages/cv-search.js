import React, { useState } from "react";
import Header from "../components/Header";
import Sidenav from "../components/LeftNav";
import { protectedRoute } from "../utilites/utility";
import { isMobile } from "react-device-detect";
import dynamic from "next/dynamic";
import ImagePreviewModal from "../components/chat/ImagePreviewModal";
import {
  getUsersAccountConfiguration,
  getUsersCVSearchRequestStatus,
} from "../lib/apiCalls";
import { serverSideRedirectionTo } from "../lib/helper";
import NavigationBarCVSearch from "../components/CVSearch/NavigationBarCVSearch";
import AccountNotApprovedAlert from "../components/Common/AccountNotApprovedAlert";

const CVSearchScreen = dynamic(
  () => import("../components/CVSearch/CVSearchScreen"),
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

export const getServerSideProps = async function (context) {
  //cv search enable/disbale from admin panel, checking route access
  // const propsData = await protectedRoute(context);
  // let CVSearchStatus = null;
  // try {
  //   const res = await getUsersCVSearchRequestStatus(context.req.cookies['user'].replace(/['"]+/g, ''))
  //   CVSearchStatus = res.status
  // } catch (error) {
  //     // return serverSideRedirectionTo('staffing')
  //     throw new Error()
  // }
  // return {
  //   props: {
  //     ...propsData.props,
  //     CVSearchStatus,
  //   },
  // }
  return protectedRoute(context);
};

function CVSearchPage(props) {
  // const enableCVSearch = true;

  return (
    <>
      <Header isNavBarOpenCookie={props.isNavBarOpenCookie} />
      <div className="main-layout">
        <Sidenav isNavBarOpenCookie={props.isNavBarOpenCookie} />
        <div className="main-content">
          <NavigationBarCVSearch />
          <AccountNotApprovedAlert />
          <CVSearchScreen />
          {!isMobile && <GlobalChat />}
        </div>
      </div>
    </>
  );
}

export default CVSearchPage;
