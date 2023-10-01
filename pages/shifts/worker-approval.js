import React from "react";
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
import NavigationBar from "../../components/shifts/NavigationBar";
import { useRouter } from "next/router";
import Home from "../../components/shifts/WorkerApproval/Home";

export const getServerSideProps = async function (context) {
  return protectedRoute(context);
};

function WorkerApproval(props) {
  const router = useRouter();
  return (
    <>
      <Header isNavBarOpenCookie={props.isNavBarOpenCookie} />
      <div className="main-layout">
        <Sidenav isNavBarOpenCookie={props.isNavBarOpenCookie} />
        <div className="main-content">
          <NavigationBar />
          <div>
            <ShiftAccessCheckWrapper>
              <Home />
            </ShiftAccessCheckWrapper>
          </div>
          {!isMobile && <GlobalChat />}
        </div>
      </div>
    </>
  );
}

export default WorkerApproval;
