import React, { useState } from "react";
import Header from "../../components/Header";
import Sidenav from "../../components/LeftNav";
import dynamic from "next/dynamic";

const GlobalChat = dynamic(
  () => import("../../components/chat/globalChat/GlobalChat"),
  {
    ssr: false,
  }
);

import { protectedRoute } from "../../utilites/utility";
import { isMobile } from "react-device-detect";
import ShiftAccessCheckWrapper from "../../components/shifts/ShiftAccessCheckWrapper";
import Role from "../../components/shifts/role/Role";
import NavigationBar from "../../components/shifts/NavigationBar";
import AccountNotApprovedAlert from "../../components/Common/AccountNotApprovedAlert";

export const getServerSideProps = async function (context) {
  return protectedRoute(context);
};

function Roles(props) {
  return (
    <>
      <Header isNavBarOpenCookie={props.isNavBarOpenCookie} />
      <div className="main-layout">
        <Sidenav isNavBarOpenCookie={props.isNavBarOpenCookie} />
        <div className="main-content">
          <NavigationBar />
          <AccountNotApprovedAlert />
          <ShiftAccessCheckWrapper>
            <div className="main-inner-content">
              <Role />
            </div>
          </ShiftAccessCheckWrapper>
          {!isMobile && <GlobalChat />}
        </div>
      </div>
    </>
  );
}

export default Roles;
