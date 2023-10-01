import React, { useEffect } from "react";
import Header from "../components/Header";
import Sidenav from "../components/LeftNav";
import NavigationBarQuotes from "../components/Quotes/NavigationBarQuotes";
import AllQuotes from "../components/Quotes/AllQuotes/AllQuotes";
import { connect } from "react-redux";
import {
  setScreenToBeShownOnQuote,
  resetState,
} from "../redux/actions/quotesActions";
import ExpiredQuotes from "../components/Quotes/ExpiredQuotes/ExpiredQuotes";
import { protectedRoute } from "../utilites/utility";
import { isMobile } from "react-device-detect";
import dynamic from "next/dynamic";
const GlobalChat = dynamic(
  () => import("../components/chat/globalChat/GlobalChat"),
  {
    ssr: false,
  }
);

export const getServerSideProps = async function (context) {
  return protectedRoute(context);
};
function Quotes(props) {
  useEffect(() => {
    return () => {
      props.resetState();
    };
  }, []);
  const renderScreenForQuote = (screenToBeShown) => {
    switch (screenToBeShown) {
      case "allQuotes":
        return <AllQuotes />;
      case "expiredQuotes":
        return <ExpiredQuotes />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="main-layout">
        <Sidenav />
        <div className="main-content">
          <NavigationBarQuotes />
          <div className="main-inner-content quotes-content">
            {renderScreenForQuote(props.screenToShowOnQuote)}
          </div>
          {!isMobile && <GlobalChat />}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  screenToShowOnQuote: state.vantage.quotesReducer.screenToShowOnQuote,
});

const mapDispatchToProps = (dispatch) => ({
  setScreenToBeShownOnQuote: (screen) =>
    dispatch(setScreenToBeShownOnQuote(screen)),
  resetState: () => dispatch(resetState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quotes);
