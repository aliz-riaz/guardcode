import React from "react";
import Header from "../../components/Header";
import Sidenav from "../../components/LeftNav";
import dynamic from "next/dynamic";
import Shifts from "../../components/shifts/shifts/Shifts";
const GlobalChat = dynamic(
  () => import("../../components/chat/globalChat/GlobalChat"),
  {
    ssr: false,
  }
);

import { protectedRoute } from "../../utilites/utility";
import { isMobile } from "react-device-detect";
import ShiftAccessCheckWrapper from "../../components/shifts/ShiftAccessCheckWrapper";
import NavigationBar from "../../components/shifts/NavigationBar";
import AccountNotApprovedAlert from "../../components/Common/AccountNotApprovedAlert";
import ShiftsFiltersHeader from "../../components/shifts/shifts/ShiftsFiltersHeader";

export const getServerSideProps = async function (context) {
  return protectedRoute(context);
};

function ShiftsPage(props) {
  return (
    <>
      <Header isNavBarOpenCookie={props.isNavBarOpenCookie} />
      <div className="main-layout">
        <Sidenav isNavBarOpenCookie={props.isNavBarOpenCookie} />
        <div className="main-content">
          <NavigationBar />
          <AccountNotApprovedAlert />
          <ShiftAccessCheckWrapper>
            <Shifts />
          </ShiftAccessCheckWrapper>

          {!isMobile && <GlobalChat />}
        </div>
      </div>
    </>
  );
}

export default ShiftsPage;
