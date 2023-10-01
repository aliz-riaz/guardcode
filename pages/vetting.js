import React, { useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Table,
} from "reactstrap";
import Header from "../components/Header";
import Sidenav from "../components/LeftNav";
import { connect } from "react-redux";
import { resetBookingReducerAction } from "../redux/actions/bookingAction";
import dynamic from "next/dynamic";

const GlobalChat = dynamic(
  () => import("../components/chat/globalChat/GlobalChat"),
  {
    ssr: false,
  }
);

import { protectedRoute } from "../utilites/utility";
import { isMobile } from "react-device-detect";

export const getServerSideProps = async function (context) {
  return protectedRoute(context);
};

function Vetting(props) {
  const [expandMenu, setExpandMenu] = useState();

  React.useEffect(() => {
    props.resetBookingReducerActionTemp().then((resp0) => {});
  }, []);

  const getClass = (expand) => {
    setExpandMenu(expand);
  };
  return (
    <>
      <Header isNavBarOpenCookie={props.isNavBarOpenCookie} />
      <div className="main-layout">
        <Sidenav isNavBarOpenCookie={props.isNavBarOpenCookie} />
        <div className="main-content d-flex align-items-center justify-content-center">
          <div>
            <img
              src={process.env.APP_URL + "/images/coming-soon.gif"}
              className="img-fluid"
              alt="coming soon"
            />
            <h2 className="text-center " style={{ marginTop: "-36px" }}>
              This feature is currently under{" "}
              <br className="d-none d-md-block" /> construction and will be
              <br className="d-none d-md-block" /> available soon
            </h2>
          </div>
          {!isMobile && <GlobalChat />}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  resetBookingReducerActionTemp: () => dispatch(resetBookingReducerAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Vetting);
