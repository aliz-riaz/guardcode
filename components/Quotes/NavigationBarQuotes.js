import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import Link from "next/link";
import { connect } from "react-redux";
import { setScreenToBeShownOnQuote } from "../../redux/actions/quotesActions";

// reactstrap components

function NavigationBarQuotes(props) {
  return (
    <>
      <div className="page-tabs">
        <Nav tabs>
          <NavItem
            onClick={(e) => {
              props.screenToShowOnQuote === "allQuotes"
                ? e.preventDefault()
                : props.setScreenToBeShownOnQuote("allQuotes");
            }}
          >
            <Link href="">
              <NavLink
                className={
                  props.screenToShowOnQuote == "allQuotes" ? "active" : ""
                }
              >
                <span className="d-none d-md-block">Latest Quotes</span>
                <span className="d-block d-md-none">Latest Quotes</span>
              </NavLink>
            </Link>
          </NavItem>
          <NavItem
            onClick={(e) =>
              props.screenToShowOnQuote === "expiredQuotes"
                ? e.preventDefault()
                : props.setScreenToBeShownOnQuote("expiredQuotes")
            }
          >
            <Link href="">
              <NavLink
                className={
                  props.screenToShowOnQuote == "expiredQuotes" ? "active" : ""
                }
              >
                <span className="d-none d-md-block">Expired Quotes</span>
                <span className="d-block d-md-none">Expired Quotes</span>
              </NavLink>
            </Link>
          </NavItem>
        </Nav>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBarQuotes);
