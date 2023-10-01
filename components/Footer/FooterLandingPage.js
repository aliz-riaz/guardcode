import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useIntercom } from "react-use-intercom";
import styles from "./Footer.module.scss";

function FooterLandingPage() {
  const getlicensedURL = "https://www.get-licensed.co.uk";
  const guardpassURL = "https://www.guardpass.com";

  const { show } = useIntercom();

  return (
    <>
      <footer className={styles.footer}>
        <Container>
          <Row>
            <Col lg="6" md="12">
              <div className={`${styles.content_wrap} mb-4`}>
                <div>
                  <a href="/">
                    <img
                      src={process.env.APP_URL + "/images/gl-guardpass.svg"}
                      alt="logo"
                      className="img-fluid"
                    />
                  </a>
                  <div className={styles.apps_logo}>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.getlicensed.protect.released&hl=en&gl=US&pli=1"
                      target="_blank"
                    >
                      <img
                        src={process.env.APP_URL + "/images/googleplay.svg"}
                        alt="android"
                        className="img-fluid"
                      />
                    </a>
                    <a
                      href="https://apps.apple.com/pk/app/protect-by-get-licensed/id1562863073#?platform=iphone"
                      target="_blank"
                    >
                      <img
                        src={process.env.APP_URL + "/images/app-store.svg"}
                        alt="app store"
                        className="img-fluid"
                      />
                    </a>
                  </div>
                </div>

                <div className={`${styles.need_help}`}>
                  <h3>Need help?</h3>
                  <p>Drop us a line if you have a question or a suggestion.</p>
                  <div className="d-flex align-items-center">
                    <button onClick={() => show()}>
                      <img
                        src={process.env.APP_URL + "/images/live-chat.svg"}
                        alt="live chat"
                        className="img-fluid"
                      />
                      Live Chat
                    </button>
                    <a href="mailto:info@guardpass.com">
                      <img
                        src={process.env.APP_URL + "/images/email-us.svg"}
                        alt="Email Us"
                        className="img-fluid"
                      />
                      Email Us
                    </a>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="4" lg="2">
              <ul className={styles.sitemap_links}>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href={`${getlicensedURL}/about`} target="_blank">
                    About Get Licensed
                  </a>
                </li>
                <li>
                  <a href={`${guardpassURL}/employers`} target="_blank">
                    Employers area
                  </a>
                </li>
                <li>
                  <a href={`${getlicensedURL}/careers`} target="_blank">
                    Join us - We're hiring 👋
                  </a>
                </li>
                <li>
                  <a
                    href={`${guardpassURL}/employers/guardhire`}
                    target="_blank"
                  >
                    GuardHire - Pricing Calculator
                  </a>
                </li>
                <li>
                  <button onClick={() => show()}>Chat with us 💬</button>
                </li>
                <li>
                  <a
                    href={`https://www.guardpass.com/guardpass-app`}
                    target="_blank"
                  >
                    The GuardPass App
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.guardpass.com/resources/"
                    target="_blank"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </Col>
            <Col md="4" lg="2">
              <ul className={styles.sitemap_links}>
                <li>
                  <a href={`${guardpassURL}/jobs/search`} target="_blank">
                    Security jobs
                  </a>
                </li>
                <li>
                  <a
                    href={`${guardpassURL}/jobs/security-jobs-in-london-uk`}
                    target="_blank"
                  >
                    Security jobs in London
                  </a>
                </li>
                <li>
                  <a
                    href={`${guardpassURL}/jobs/security-jobs-in-birmingham-uk`}
                    target="_blank"
                  >
                    Security jobs in Birmingham
                  </a>
                </li>
                <li>
                  <a
                    href={`${guardpassURL}/jobs/security-jobs-in-manchester-uk`}
                    target="_blank"
                  >
                    Security jobs in Manchester
                  </a>
                </li>
                <li>
                  <a
                    href={`${guardpassURL}/jobs/security-jobs-in-leeds-uk`}
                    target="_blank"
                  >
                    Security jobs in Leeds
                  </a>
                </li>
                <li>
                  <a
                    href={`${guardpassURL}/jobs/security-jobs-in-cardiff-uk`}
                    target="_blank"
                  >
                    Security jobs in Cardiff
                  </a>
                </li>
                <li>
                  <a href={`${guardpassURL}/jobs/search`} target="_blank">
                    Door Supervisor jobs
                  </a>
                </li>
                <li>
                  <a href={`${guardpassURL}/jobs/search`} target="_blank">
                    CCTV jobs
                  </a>
                </li>
                <li>
                  <a href={`${guardpassURL}/jobs/search`} target="_blank">
                    Security Guard jobs
                  </a>
                </li>
              </ul>
            </Col>

            <Col md="4" lg="2">
              <ul className={styles.sitemap_links}>
                <li>
                  <a href={`${getlicensedURL}/get-sia-licence`} target="_blank">
                    Get SIA Licence
                  </a>
                </li>
                <li>
                  <a
                    href={`${getlicensedURL}/licence/door-supervisor-licence`}
                    target="_blank"
                  >
                    Door Supervisor Licence
                  </a>
                </li>
                <li>
                  <a
                    href={`${getlicensedURL}/licence/security-guard-licence`}
                    target="_blank"
                  >
                    Security Guard Licence
                  </a>
                </li>
                <li>
                  <a
                    href={`${getlicensedURL}/licence/cctv-licence`}
                    target="_blank"
                  >
                    CCTV Operator Licence
                  </a>
                </li>
                <li>
                  <a
                    href={`${getlicensedURL}/licence/close-protection-licence`}
                    target="_blank"
                  >
                    Close Protection Licence
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>

        {/* <div className={`${styles.copyright_area} py-3`}>
          <Container>
            <Row className="align-items-center">
              <Col lg="12" md="12">
                <div className="d-lg-flex align-items-center">
                  <div className="mr-lg-4">
                    <img
                      src={
                        process.env.APP_URL +
                        "/images/get-licensed-logo-white.svg"
                      }
                      alt="GL logo"
                      className="img-fluid d-inline-block"
                    />
                  </div>
                  <div className="mt-lg-0 mt-3">
                    <div className={`${styles.copyright_text}`}>
                      <p className="mb-0 text-white fs-6">
                        Get Licensed is a registered trademark of Get Licensed
                        Limited. Get Licensed is a training and jobs marketplace
                        - we help people book training courses with approved
                        providers and help them find work.
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div> */}

        <div className={`${styles.copyright_links} py-3`}>
          <Container>
            <Row>
              <Col lg="12" md="12">
                <ul className={styles.footer_menu}>
                  <li>
                    <a href="/privacy">Privacy</a>
                  </li>
                  <li>
                    <a href="/terms">Terms</a>
                  </li>
                  <li className="ml-lg-auto">
                    <p>Copyright © 2023 · All rights reserved</p>
                  </li>
                  <li>
                    <p>
                      Call Us <a href="tel:03306600012">0330 660 0012</a>
                    </p>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </div>
      </footer>
    </>
  );
}
export default FooterLandingPage;
