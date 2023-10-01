import React, { useState } from "react";
import Head from "next/head";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import styles from "./Guardhire.module.scss";
import Header from "../components/Header/HeaderMain";
import Footer from "../components/Footer/FooterLandingPage";
import Marquee from "react-fast-marquee";
import Fade from "react-reveal/Fade";
import { Tween } from "react-gsap";
import ReactPlayer from "react-player";
import { useIntercom } from "react-use-intercom";
import dynamic from "next/dynamic";
import PricingCalc from "../components/GuardHire/PricingCalculator/PricingCalc";

const MobilevideoPlayer = dynamic(
  () => import("../components/home/MobilevideoPlayer"),
  { ssr: false }
);

const TestimonialsCarousel = dynamic(
  () => import("../components/GuardHire/Testimonials/Testimonials"),
  { ssr: false }
);

function Guardhire(props) {
  const { show } = useIntercom();

  const showChat = () => {
    show();
  };

  return (
    <div className={`${styles.main_wrap}`}>
      <Head>
        <link rel="canonical" href="https://www.guardpass.com/employers" />
      </Head>
      <Header />

      <section className={`${styles.home_banner_sec} position-relative`}>
        <Container>
          <Row className="justify-content-center mb-5">
            <Col className="col-lg-10 col-md-10 col-12">
              <Fade bottom>
                <h1>
                  Post your job on the UK's
                  <span>#1 security jobs board</span>
                </h1>
                <p className="mt-4">
                  Hire security professionals quickly and easily
                </p>
                <ul className={styles.list}>
                  <li>
                    <img
                      src={process.env.APP_URL + "/images/check-double.svg"}
                      alt="icon"
                    />
                    SIA licence checked applicants
                  </li>
                  <li>
                    <img
                      src={process.env.APP_URL + "/images/check-double.svg"}
                      alt="icon"
                    />
                    100,000+ jobseekers
                  </li>
                  <li>
                    <img
                      src={process.env.APP_URL + "/images/check-double.svg"}
                      alt="icon"
                    />
                    Bespoke for security hiring
                  </li>
                </ul>
                <div className={styles.button_wrap}>
                  <a
                    href={process.env.APP_URL + "/jobpost"}
                    className={`btn btn-lg fw-medium btn-green ${styles.button}`}
                  >
                    Post a job
                  </a>
                  <button onClick={showChat}>
                    <img
                      src={process.env.APP_URL + "/images/chat-icon-light.svg"}
                      alt="icon"
                    />
                    <span>Chat with an advisor</span>
                  </button>
                </div>
              </Fade>
            </Col>
          </Row>

          <Row className="align-items-center">
            <Col className="col-lg-12 col-12">
              <div className={`${styles.video_wrapper}`}>
                <MobilevideoPlayer />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <div className={styles.hotline_tooltip}>
        <div>
          <img src={process.env.APP_URL + "/images/thumb.svg"} alt="icon" />
          <a href="tel:03306600012">
            HIRING HOTLINE<span>0330 660 0012</span>
          </a>
        </div>
        <p onClick={showChat} className="cursor-pointer">
          <img
            src={process.env.APP_URL + "/images/chat-emoji.svg"}
            alt="icon"
          />
          Chat with us
        </p>
      </div>

      {/* Company logo Section starts from Here */}
      <section className={`${styles.company_logo}`}>
        <div className="container">
          <p>Trusted by top security employers</p>
          <div className="mt-4 mt-md-4 mt-lg-5 row">
            <div className="col-md-12">
              <ul>
                <li>
                  <Fade>
                    <img
                      src={process.env.APP_URL + "/images/G4S_logo.svg"}
                      height="50px"
                      alt="G4"
                    />
                  </Fade>
                </li>
                <li>
                  <Fade>
                    <img
                      src={process.env.APP_URL + "/images/nhs_logo.svg"}
                      height="50px"
                      alt="nhs"
                    />
                  </Fade>
                </li>
                <li>
                  <Fade>
                    <img
                      src={process.env.APP_URL + "/images/mitie-logo.svg"}
                      height="50px"
                      alt="mitie"
                    />
                  </Fade>
                </li>
                <li>
                  <Fade>
                    <img
                      src={process.env.APP_URL + "/images/Interserve_logo.svg"}
                      height="50px"
                      alt="inter"
                    />
                  </Fade>
                </li>
                <li>
                  <Fade>
                    <img
                      src={process.env.APP_URL + "/images/Underground_logo.svg"}
                      height="50px"
                      alt="UG"
                    />
                  </Fade>
                </li>
                <li>
                  <Fade>
                    <img
                      src={process.env.APP_URL + "/images/OCS-50.svg"}
                      height="50px"
                      alt="G4"
                    />
                  </Fade>
                </li>
                <li>
                  <Fade>
                    <img
                      src={process.env.APP_URL + "/images/BWN.svg"}
                      height="50px"
                      alt="nhs"
                    />
                  </Fade>
                </li>
                <li>
                  <Fade>
                    <img
                      src={process.env.APP_URL + "/images/CG.svg"}
                      height="50px"
                      alt="mitie"
                    />
                  </Fade>
                </li>
                <li>
                  <Fade>
                    <img
                      src={process.env.APP_URL + "/images/serco50.svg"}
                      height="50px"
                      alt="UG"
                    />
                  </Fade>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Company logo Section Ends Here */}

      {/* Not on Other Job Board Section Ends Here */}
      <section className={styles.job_board}>
        <Container>
          <div className={styles.wrapper}>
            <Row>
              <Col className="col-12 mb-mb-5 mb-4 ">
                <h2 className="fs-1">
                  Not on other
                  <span>
                    job boards{" "}
                    <img
                      src={process.env.APP_URL + "/images/heart.svg"}
                      alt="icon"
                    />
                  </span>
                </h2>
              </Col>

              <Col className="col-lg-4 col-12">
                <div className={`${styles.emp_list}`}>
                  <div className={`${styles.iconWrap}`}>
                    <img
                      src={process.env.APP_URL + "/images/badge.svg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </div>
                  <div className={`${styles.content}`}>
                    <h3 className={`fs-5`}>SIA licence check</h3>
                    <p className={`fs-6 m-0`}>
                      We verify each applicant's SIA license number using the
                      official SIA registry, saving you time.
                    </p>
                  </div>
                </div>

                <div className={`${styles.emp_list}`}>
                  <div className={`${styles.iconWrap}`}>
                    <img
                      src={process.env.APP_URL + "/images/comment.svg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </div>
                  <div className={`${styles.content}`}>
                    <h3 className={`fs-5`}>Chat</h3>
                    <p className={`fs-6 m-0`}>
                      Send and receive chat messages and files and save yourself
                      from snail mail and missed calls.
                    </p>
                  </div>
                </div>

                <div className={`${styles.emp_list}`}>
                  <div className={`${styles.iconWrap}`}>
                    <img
                      src={process.env.APP_URL + "/images/zoom.svg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </div>
                  <div className={`${styles.content}`}>
                    <h3 className={`fs-5`}>CV Search</h3>
                    <p className={`fs-6 m-0`}>
                      Get access to the largest register of SIA licensed
                      security workers in the UK.
                    </p>
                  </div>
                </div>
              </Col>

              <Col className="col-lg-4 col-12 mt-4 mt-lg-0">
                <div className={`${styles.emp_list}`}>
                  <div className={`${styles.iconWrap}`}>
                    <img
                      src={process.env.APP_URL + "/images/video-gallery.svg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </div>
                  <div className={`${styles.content}`}>
                    <h3 className={`fs-5`}>Video intros </h3>
                    <p className={`fs-6 m-0`}>
                      Assess candidates better by viewing their video intros
                      before passing them on to the next stage.
                    </p>
                  </div>
                </div>

                <div className={`${styles.emp_list}`}>
                  <div className={`${styles.iconWrap}`}>
                    <img
                      src={process.env.APP_URL + "/images/screen-info.svg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </div>
                  <div className={`${styles.content}`}>
                    <h3 className={`fs-5`}>Screening information</h3>
                    <p className={`fs-6 m-0`}>
                      Every applicant comes with screening data on CCJs,
                      insolvency, address proofs, and more.
                    </p>
                  </div>
                </div>

                <div className={`${styles.emp_list}`}>
                  <div className={`${styles.iconWrap}`}>
                    <img
                      src={process.env.APP_URL + "/images/guard-rank.svg"}
                      alt="icon"
                      className={`img-fluid`}
                    />
                  </div>
                  <div className={`${styles.content}`}>
                    <h3 className={`fs-5`}>GuardRank</h3>
                    <p className={`fs-6 m-0`}>
                      AI-driven scoring to link each candidate with your job,
                      enabling better decision-making.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
      {/* Not on Other Job Board Section Ends Here */}

      <PricingCalc />

      <section className={`${styles.courses_section}`}>
        <Marquee speed={60} gradient={false}>
          <div
            className={`d-flex align-items-center justify-content-between w-100`}
          >
            <h2 className={`${styles.purple}`}>
              <span>Hire </span> Security Guards
            </h2>
            <h2 className={`${styles.blue}`}>
              <span>Hire </span> CCTV Operators
            </h2>
            <h2 className={`${styles.orange}`}>
              <span>Hire </span> Door Supervisors
            </h2>
            <h2 className={`${styles.yellow}`}>
              <span>Hire </span> Relief Officers
            </h2>
          </div>
        </Marquee>
      </section>

      {/* How we Compare Section starts from Here */}
      <section className={`${styles.compare_section}`}>
        <Container>
          <Row className="justify-content-center">
            <Col className="col-12 col-lg-12 text-center mb-5">
              <h2 className={`fs-1 fw-bold mb-lg-3`}>
                ...AND WE'RE <span>FAST</span> 🚀
              </h2>
              <p className={`my-2 fs-3 ${styles.compare_para}`}>
                We posted the same job on other platforms. Here are the
                results...
              </p>
            </Col>
          </Row>

          <Row className={`align-items-end`}>
            <Col className="col-12 col-lg-2 d-none d-md-block d-lg-block">
              <div
                className={`${styles.comp_card} shadow-none align-items-start text-left`}
              >
                <p className={`fs-6`}>Total applicants received</p>
                <p className={`fs-6`}>Time to first applicant</p>
              </div>
            </Col>
            <Col className="col-12 col-md-3 col-lg-2">
              <Fade bottom>
                <div className={`bg-white ${styles.comp_card} text-center`}>
                  <div className={`${styles.imgWrap}`}>
                    <img
                      src={process.env.APP_URL + "/images/vubrary.svg"}
                      alt="icon"
                    />
                  </div>
                  <div
                    className={`d-lg-block d-flex justify-content-between w-100`}
                  >
                    <p
                      className={`fs-6 d-block d-md-none d-lg-none text-left pl-4`}
                    >
                      Total applicants received
                    </p>
                    <p className={`fs-6`}>7</p>
                  </div>
                  <div
                    className={`d-lg-block d-flex justify-content-between w-100`}
                  >
                    <p
                      className={`fs-6 d-block d-md-none d-lg-none text-left pl-4`}
                    >
                      Time to first applicant
                    </p>
                    <p className={`fs-6`}>16 hours</p>
                  </div>
                </div>
              </Fade>
            </Col>
            <Col className="col-12 col-md-3 col-lg-2">
              <Fade bottom>
                <div className={`bg-white ${styles.comp_card} text-center`}>
                  <div className={`${styles.imgWrap}`}>
                    <img
                      src={process.env.APP_URL + "/images/reed-co.svg"}
                      alt="icon"
                    />
                  </div>
                  <div
                    className={`d-lg-block d-flex justify-content-between w-100`}
                  >
                    <p
                      className={`fs-6 d-block d-md-none d-lg-none text-left pl-4`}
                    >
                      Total applicants received
                    </p>
                    <p className={`fs-6`}>12</p>
                  </div>
                  <div
                    className={`d-lg-block d-flex justify-content-between w-100`}
                  >
                    <p
                      className={`fs-6 d-block d-md-none d-lg-none text-left pl-4`}
                    >
                      Time to first applicant
                    </p>
                    <p className={`fs-6`}>18 hours</p>
                  </div>
                </div>
              </Fade>
            </Col>
            <Col className="col-12 col-md-3 col-lg-2">
              <Fade bottom>
                <div
                  className={`${styles.comp_card} ${styles.highlight} text-center`}
                >
                  <div className={`${styles.imgWrap}`}>
                    <img
                      src={
                        process.env.APP_URL + "/images/guardpass-logo-black.svg"
                      }
                      className="img-fluid"
                      alt="icon"
                    />
                  </div>
                  <div
                    className={`d-lg-block d-flex justify-content-between w-100`}
                  >
                    <p
                      className={`fs-6 d-block d-md-none d-lg-none text-left pl-4`}
                    >
                      Total applicants received
                    </p>
                    <p className={`fs-6`}>28</p>
                  </div>
                  <div
                    className={`d-lg-block d-flex justify-content-between w-100`}
                  >
                    <p
                      className={`fs-6 d-block d-md-none d-lg-none text-left pl-4`}
                    >
                      Time to first applicant
                    </p>
                    <div className={`${styles.lottieWrap}`}>
                      <svg
                        version="1.1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 512 242.5"
                      >
                        <g>
                          <Tween
                            from={{
                              svgDraw: 0,
                            }}
                            to={{
                              svgDraw: 1,
                              scrollTrigger: {
                                trigger: ".square",
                                start: "-200px center",
                                end: "200px center",
                                // scrub: 0.5,
                              },
                            }}
                          >
                            <path
                              fill="transparent"
                              className="square"
                              stroke="#FF0000"
                              stroke-width="8"
                              stroke-linecap="round"
                              class="draw-arrow"
                              d="M454.8,60.7c-92-43-154.1-48.8-241.7-39.9c-4.6,0.5-24.7,2.6-50.3,10.4c-13,4-114.9,36.2-117.5,89.1
		                                                c-0.6,13.4,5,24.2,7.9,28.3c90.4,128.9,412.8,51,411.1-20.3c-0.1-2.6-0.1-5-1.1-8.6c-14.3-49.2-97.9-68.5-150.2-76.2"
                            />
                          </Tween>
                        </g>
                      </svg>
                      <p className={`fs-6`}>12 minutes</p>
                    </div>
                  </div>
                </div>
              </Fade>
            </Col>
            <Col className="col-12 col-md-3 col-lg-2">
              <Fade bottom>
                <div className={`bg-white ${styles.comp_card} text-center`}>
                  <div className={`${styles.imgWrap}`}>
                    <img
                      src={process.env.APP_URL + "/images/indeed.svg"}
                      alt="icon"
                    />
                  </div>
                  <div
                    className={`d-lg-block d-flex justify-content-between w-100`}
                  >
                    <p
                      className={`fs-6 d-block d-md-none d-lg-none text-left pl-4`}
                    >
                      Total applicants received
                    </p>
                    <p className={`fs-6`}>17</p>
                  </div>
                  <div
                    className={`d-lg-block d-flex justify-content-between w-100`}
                  >
                    <p
                      className={`fs-6 d-block d-md-none d-lg-none text-left pl-4`}
                    >
                      Time to first applicant
                    </p>
                    <p className={`fs-6`}>5 hours</p>
                  </div>
                </div>
              </Fade>
            </Col>
            <Col className="col-12 col-md-3 col-lg-2">
              <Fade bottom>
                <div
                  className={`bg-white ${styles.comp_card} ${styles.others_card} text-center`}
                >
                  <div className={`${styles.imgWrap}`}>
                    <img
                      src={process.env.APP_URL + "/images/others_text.png"}
                      alt="icon"
                    />
                  </div>
                  <div
                    className={`d-lg-block d-flex justify-content-between w-100`}
                  >
                    <p
                      className={`fs-6 d-block d-md-none d-lg-none text-left pl-4`}
                    >
                      &nbsp;
                    </p>
                    <p className={`fs-6`}>&nbsp;</p>
                  </div>
                  <div
                    className={`d-lg-block d-flex justify-content-between w-100`}
                  >
                    <p
                      className={`fs-6 d-block d-md-none d-lg-none text-left pl-4`}
                    >
                      &nbsp;
                    </p>
                    <p className={`fs-6`}>&nbsp;</p>
                  </div>
                </div>
              </Fade>
            </Col>
            <Col className="col-12 col-lg-12 text-center mt-2 mt-lg-5 mt-md-5">
              <a
                href={process.env.APP_URL + "/signup"}
                className={`btn btn-md btn-success fw-medium px-5 mr-3 mt-3 ${styles.btn_md}`}
              >
                Create an account
              </a>
            </Col>
          </Row>
        </Container>
      </section>
      {/* How we Compare Section Ends Here */}

      <section className={styles.flex_section}>
        <Container>
          <Row className="align-items-center">
            <Col className="col-12 mb-5">
              <h2 className="fs-1 text-uppercase text-center">
                other good stuff
              </h2>
            </Col>

            <Col className="col-md-4 col-12">
              <ul>
                <li>Applicant Tracking System </li>
                <li>Company profile page </li>
                <li>Branded job ads</li>
                <li>Dedicated account manager</li>
                <li>Pre-built job templates</li>
              </ul>
            </Col>
            <Col className="col-md-8 col-12 mt-4 mt-md-0">
              <figure>
                <img
                  src={process.env.APP_URL + "/images/guardflex-img.png"}
                  alt="img"
                  className="img-fluid"
                />
              </figure>
            </Col>

            <Col className="col-12 mt-5">
              <div className={styles.button_wrap}>
                <a
                  href={process.env.APP_URL + "/jobpost"}
                  className={`btn btn-lg fw-medium btn-green ${styles.button}`}
                >
                  Post a job
                </a>
                <button onClick={showChat}>
                  <img
                    src={process.env.APP_URL + "/images/chat-icon-dark.svg"}
                    alt="icon"
                  />
                  <span>Chat with an advisor</span>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Case Study Section starts from Here */}
      <section className={`${styles.case_study}`}>
        <Container>
          <Row>
            <Col className="col-12 col-lg-3  mt-4 mt-lg-0">
              <Fade>
                <div className={`${styles.case_study_card}`}>
                  <span className={`${styles.tag}`}>CASE STUDY</span>
                  <div className={`${styles.img_wrap}`}>
                    <ReactPlayer
                      url={"https://www.youtube.com/embed/fWuh7UkHnaQ"}
                      width="100%"
                      height="275px"
                      config={{
                        youtube: {
                          playerVars: { showinfo: 1 },
                        },
                      }}
                      playing
                      playIcon={
                        <img
                          src={process.env.APP_URL + "/images/play-btn.svg"}
                        />
                      }
                      light={process.env.APP_URL + "/images/case-study.png"}
                      controls={false}
                    />
                  </div>
                  <div className={`${styles.content}`}>
                    <h3 className={`fs-5`}>
                      See how we helped Mitie meet its hiring requirements.
                    </h3>
                    <div
                      className={`d-flex align-items-center justify-content-between mt-3`}
                    >
                      <div>
                        <a
                          href="https://www.youtube.com/watch?v=fWuh7UkHnaQ&ab_channel=GetLicensed-SecurityInsider"
                          target="_blank"
                        >
                          <img
                            src={
                              process.env.APP_URL +
                              "/images/video-gallery-2.svg"
                            }
                            alt="icon"
                          />
                          Watch the video
                        </a>
                        <a
                          href="https://www.get-licensed.co.uk/get-daily/how-mitie-uks-top-security-service-provider-successfully-achieved-its-hiring-needs/"
                          target="_blank"
                        >
                          <img
                            src={process.env.APP_URL + "/images/e-reader.svg"}
                            alt="icon"
                          />
                          Read the case study
                        </a>
                      </div>
                      <img
                        src={process.env.APP_URL + "/images/mitie.svg"}
                        className="img-fluid"
                        alt="u"
                      />
                    </div>
                  </div>
                </div>
              </Fade>
            </Col>
            <Col className="col-12 col-lg-9">
              <div className={styles.slider_wrapper}>
                <h3 className="fs-4 fw-bold mb-3 mt-5 mt-md-0">
                  See what our customers say
                </h3>
                <TestimonialsCarousel />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Case Study Section Ends Here */}

      <Footer />
    </div>
  );
}
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Guardhire);
