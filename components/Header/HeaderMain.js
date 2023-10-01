import router from "next/router";
import styles from "./Header.module.scss";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "next/image";
import Link from "next/link";
import { connect } from "react-redux";
import { useState } from "react";

const HeaderMain = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* <header id="header_main" className={styles.header_main}>
        <Container>
          <Navbar expand="md">
            <Link href="/">
              <NavbarBrand>
                <img
                  src={process.env.APP_URL + "/images/guardpass-logo-white.svg"}
                  width={200}
                />
              </NavbarBrand>
            </Link>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <div
                className="d-block d-md-none close-mobile-menu cursor-pointer"
                onClick={toggle}
              >
                Close
              </div>
              <Nav navbar className={`${styles.nav_container} mx-auto`}>
                <NavItem className={styles.nav_item}>
                  <Nav.Link className={styles.nav_link} href="/">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem className={styles.nav_item}>
                  <NavLink className={styles.nav_link} href="/guardpass-app">
                    The GuardPass App
                  </NavLink>
                </NavItem>
                <NavItem className={styles.nav_item}>
                  <NavLink className={styles.nav_link} href="/jobs">
                    Security Jobs
                  </NavLink>
                </NavItem>
                <NavItem className={styles.nav_item}>
                  <NavLink className={styles.nav_link} href="/employers">
                    Employers
                  </NavLink>
                </NavItem>
                <NavItem className={styles.nav_item}>
                  <NavLink className={styles.nav_link} href="/companies">
                    Companies
                  </NavLink>
                </NavItem>
              </Nav>

              {props.user_token != "" ? (
                <>
                  <NavItem className="d-md-flex user_login">
                    <NavLink
                      className="cursor-pointer btn btn-link"
                      onClick={() => router.push("/dashboard")}
                    >
                      <span className="userAvatar">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 30 31"
                        >
                          <g fill="none" fill-rule="evenodd">
                            <g stroke-width="2">
                              <g transform="translate(-1.000000, 0.000000) translate(1.000000, 0.000000)">
                                <path
                                  stroke-linecap="square"
                                  d="M15 20h0c-2.209 0-4-1.97-4-4.4v-2.2c0-2.43 1.791-4.4 4-4.4h0c2.209 0 4 1.97 4 4.4v2.2c0 2.43-1.791 4.4-4 4.4z"
                                />
                                <path d="M22 25c-1.172-1.802-2.952-3-4.903-3H13.9c-1.967 0-3.728 1.163-4.9 2.99" />
                                <circle
                                  cx="15"
                                  cy="15"
                                  r="12"
                                  stroke-linecap="square"
                                />
                              </g>
                            </g>
                          </g>
                        </svg>
                      </span>
                      <span className="valTxt ml-1">
                        {props.decision_maker_first_name +
                          " " +
                          props.decision_maker_last_name}
                      </span>
                    </NavLink>
                  </NavItem>
                </>
              ) : (
                <>
                  <NavbarText
                    className={`signin d-block text-center text-md-right ml-0 ${styles.sign_in_btn}`}
                  >
                    <Link href={process.env.APP_URL + "/login"}>
                      <a className="btn btn-md py-2 fw-medium btn-green text-black">
                        Sign in
                      </a>
                    </Link>
                  </NavbarText>
                </>
              )}
            </Collapse>
          </Navbar>
        </Container>
      </header> */}
      <header className={`${styles.header_container}`}>
        <Navbar bg="transparent" expand="lg">
          <div className="container">
            <a href="/" className="text-start d-inline-block">
              <img
                src={process.env.APP_URL + "/images/guardpass-logo-white.svg"}
                alt="Logo"
                height={40}
                width={220}
                className={`img-fluid ${styles.logo}`}
              />
            </a>
            <Navbar.Toggle
              className={`${styles.toggle_icon}`}
              aria-controls="basic-navbar-nav"
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className={`mx-auto ${styles.nav_container}`}>
                {/* <Nav.Link className={styles.nav_link} href="/">
                  Home
                </Nav.Link> */}
                <Nav.Link className={styles.nav_link} href="/guardpass-app">
                  The GuardPass App
                </Nav.Link>
                <Nav.Link className={styles.nav_link} href="/jobs">
                  Security Jobs
                </Nav.Link>
                <Nav.Link className={styles.nav_link} href="/employers">
                  Employers
                </Nav.Link>
                <Nav.Link className={styles.nav_link} href="/companies">
                  Companies
                </Nav.Link>
                {/* <Nav.Link className={styles.nav_link} href="/employers/pricing">
                  Pricing
                </Nav.Link> */}
              </Nav>

              {props.user_token != "" ? (
                <>
                  <div className="d-md-flex">
                    <Nav.Link
                      className={`cursor-pointer btn ${styles.btn_link}`}
                      onClick={() => router.push("/dashboard")}
                    >
                      <span className={styles.user_avatar}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 30 31"
                        >
                          <g fill="none" fill-rule="evenodd">
                            <g stroke-width="2">
                              <g transform="translate(-1.000000, 0.000000) translate(1.000000, 0.000000)">
                                <path
                                  stroke-linecap="square"
                                  d="M15 20h0c-2.209 0-4-1.97-4-4.4v-2.2c0-2.43 1.791-4.4 4-4.4h0c2.209 0 4 1.97 4 4.4v2.2c0 2.43-1.791 4.4-4 4.4z"
                                />
                                <path d="M22 25c-1.172-1.802-2.952-3-4.903-3H13.9c-1.967 0-3.728 1.163-4.9 2.99" />
                                <circle
                                  cx="15"
                                  cy="15"
                                  r="12"
                                  stroke-linecap="square"
                                />
                              </g>
                            </g>
                          </g>
                        </svg>
                      </span>
                      <span className={`${styles.val_txt} ml-1`}>
                        {props.decision_maker_first_name +
                          " " +
                          props.decision_maker_last_name}
                      </span>
                    </Nav.Link>
                  </div>
                </>
              ) : (
                <>
                  <span
                    className={`signin d-block text-center text-md-right ml-0 ${styles.sign_in_btn}`}
                  >
                    <Link href={process.env.APP_URL + "/login"}>
                      <a className="btn btn-md py-2 fw-medium btn-green text-black">
                        Sign in
                      </a>
                    </Link>
                  </span>
                </>
              )}
            </Navbar.Collapse>
          </div>
        </Navbar>
      </header>
    </>
  );
};

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
  decision_maker_first_name:
    state.vantage.userDataReducer.decision_maker_first_name,
  decision_maker_last_name:
    state.vantage.userDataReducer.decision_maker_last_name,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMain);
