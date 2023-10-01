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
import ShiftPosting from "../../components/shifts/ShiftPosting/ShiftPosting";

export const getServerSideProps = async function (context) {
  return protectedRoute(context);
};

function Post(props) {
  return (
    <>
      <Header isNavBarOpenCookie={props.isNavBarOpenCookie} />
      <div className="main-layout">
        <Sidenav isNavBarOpenCookie={props.isNavBarOpenCookie} />
        <div className="main-content">
          <ShiftPosting />
        </div>
      </div>
    </>
  );
}

export default Post;
