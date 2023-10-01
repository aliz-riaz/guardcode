import React, { useState, useEffect } from "react";
import Head from "next/head";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import styles from "./Home.module.scss";
import Header from "../components/Header/HeaderMain";
import Footer from "../components/Footer/FooterLandingPage";
import Marquee from "react-fast-marquee";
import Fade from "react-reveal/Fade";
import Quotation from "../components/home/Quotation";
import GuardFlex from "../components/home/GuardFlex";
import GuardCheck from "../components/home/GuardCheck";
import GuardTrain from "../components/home/GuardTrain";
import GuardHire from "../components/home/GuardHire";
import { ScrollTrigger, Tween } from "react-gsap";
import ReactPlayer from "react-player";
// import MobilevideoPlayer from "../components/home/MobilevideoPlayer";
import TrustPilotWithReviews from "../components/Common/TrustPilotWithReviews";
import TrustPilotForCertifications from "../components/Common/TrustPilotForCertifications";
import { getTrustpilotTotalCount } from "../redux/actions/main";
import { useIntercom } from "react-use-intercom";
import Cookies from "js-cookie";
import { gsap } from "gsap";
import { socket } from "../lib/SocketProvider";
import { userLogoutAction } from "../redux/actions/login";
import { useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { isMobile } from "react-device-detect";
import dynamic from "next/dynamic";
import useLogout from "../hooks/Auth/useLogout";

const MobilevideoPlayer = dynamic(
  () => import("../components/home/MobilevideoPlayer"),
  { ssr: false }
);

const TestimonialsCarousel = dynamic(
  () => import("../components/GuardHire/Testimonials/Testimonials"),
  { ssr: false }
);

function Home(props) {
  const [trustPilotCount, setTrustPilotCount] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");
  const { cleanGlobalState } = useLogout(props);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(async () => {
    const count = await props.getTrustpilotTotalCount();
    setTrustPilotCount(count.reviews);
    if (!Cookies.get("user")) {
      cleanGlobalState();
    }
  }, []);

  const { show } = useIntercom();

  const showChat = () => {
    show();
    // $crisp.push(["do", "chat:toggle"])
  };

  const logoRef = useRef(null);
  const iconRef = useRef(null);
  const introIconRef = useRef(null);

  // useEffect(() => {
  //   const timeline = gsap.timeline({ paused: true });
  //   timeline.to(logoRef.current, {
  //     width: "100%",
  //     height: "116%",
  //     top: isMobile ? "0%" : "0%",
  //     bottom: 0,
  //     paddingBottom: "15rem",
  //     borderRadius: 0,
  //     duration: 0.5,
  //     ease: "power1.inOut",
  //   });
  //   timeline.to(iconRef.current, {
  //     display: "none",
  //     scale: 0,
  //     alpha: 0,
  //     duration: 0.1,
  //     ease: "power1.inOut",
  //   });

  //   timeline.to(introIconRef.current, {
  //     display: "flex",
  //     alpha: 1,
  //     scale: 1,
  //     duration: 0.5,
  //     ease: "power1.inOut",
  //   });

  //   function handleScroll() {
  //     if (window.scrollY > 100) {
  //       timeline.play();
  //     } else {
  //       timeline.reverse();
  //     }
  //   }

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const triggerRef = useRef(null);
  const [trigger, setTrigger] = useState(triggerRef.current);

  useEffect(() => {
    setTrigger(triggerRef.current);
  }, []);

  return (
    <div className={`${styles.main_wrap}`}>
      <Head>
        <link rel="canonical" href="https://www.guardpass.com/employers" />
      </Head>
      <Header />

      <section className={`${styles.home_banner_sec} position-relative`}>
        <ScrollTrigger
          trigger={trigger}
          start="-50px center"
          end="bottom"
          scrub={0.5}
        >
          <Tween
            to={{
              scale: isMobile ? 1 : 1.25,
            }}
          >
            <div className={`${styles.banner_img}`}>
              <img
                src={process.env.APP_URL + "/images/banner-bg.png"}
                alt="banner image"
                className="img-fluid d-none d-lg-block"
              />
              <img
                src={process.env.APP_URL + "/images/banner-icons-mb.png"}
                alt="banner image"
                className="img-fluid d-block d-lg-none"
              />
            </div>
          </Tween>
        </ScrollTrigger>

        <Container>
          <Row className="justify-content-center">
            <Col className="col-lg-10 col-md-10 col-12">
              <Fade bottom>
                <div
                  className={`${styles.icon_wrap}`}
                  //  ref={logoRef}
                >
                  <img
                    src={process.env.APP_URL + "/images/banner-logo.svg"}
                    alt="G4"
                    // ref={iconRef}
                  />
                  {/* <div className={`${styles.intro_icon}`} ref={introIconRef}>
                    <span>Introducing</span>
                    <img
                      src={process.env.APP_URL + "/images/intro_icon.svg"}
                      alt="intro icon"
                      className="img-fluid"
                    />
                  </div> */}
                </div>
                <h1>
                  The all-in-one platform for <br />
                  training, vetting & staffing
                  <span>for security employers</span>
                </h1>
                <p>
                  Train, hire and vet security professionals <br />
                  with the security industry's most powerful tool
                </p>
                <a
                  href={process.env.APP_URL + "/signup"}
                  className={`btn btn-lg fw-medium btn-green ${styles.button}`}
                >
                  Sign up
                </a>
              </Fade>
            </Col>
          </Row>
        </Container>
      </section>

      <section className={`${styles.trustpilot_wrap}`}>
        <Container>
          <Row>
            <Col className="col-12 text-center px-0">
              <a
                href="https://uk.trustpilot.com/review/www.get-licensed.co.uk?utm_medium=trustbox&utm_source=Horizontal"
                target="_blank"
              >
                Rated <strong>Excellent</strong>
                <img
                  src={process.env.APP_URL + "/images/trustpilot-stars.svg"}
                  alt="stars"
                />
                <strong>{trustPilotCount && trustPilotCount}</strong> reviews on
                <img
                  src={process.env.APP_URL + "/images/green-star.svg"}
                  alt="star"
                />
                Trustpilot
              </a>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Company logo Section starts from Here */}

      <section className={`${styles.company_logo}`}>
        <div className="container">
          <p>Companies working with us</p>
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

      {/* Built security Section starts from Here */}
      <section className={`${styles.built_security}`}>
        <Container>
          <Row>
            <Col className="col-12 col-lg-12 text-center mb-5">
              <h2 className={`fw-bold mb-2`}>
                PURPOSE-BUILT SOLUTIONS FOR <span>SECURITY EMPLOYERS</span>
              </h2>
              <h3>Tap on a solution to learn more</h3>
            </Col>

            <Col className="col-12 col-lg-12">
              <div className={`${styles.tabs_wrapper} mt-4`}>
                <Carousel
                  arrows={false}
                  autoPlay={false}
                  responsive={{
                    desktop: {
                      breakpoint: { max: 3000, min: 1025 },
                      items: 4,
                      slidesToSlide: 1, // optional, default to 1.
                    },
                    tablet: {
                      breakpoint: { max: 1024, min: 464 },
                      items: 2.75,
                      slidesToSlide: 1, // optional, default to 1.
                    },
                    mobile: {
                      breakpoint: { max: 464, min: 0 },
                      items: 2.5,
                      slidesToSlide: 1, // optional, default to 1.
                    },
                  }}
                  itemClass="px-0"
                  swipeable={true}
                  ssr={false}
                  draggable={true}
                >
                  <button
                    onClick={() => handleTabClick("tab1")}
                    className={`${activeTab === "tab1" ? styles.active : ""} ${
                      styles.purple
                    }`}
                  >
                    G
                    <img src={process.env.APP_URL + "/images/s-app-icon.svg"} />
                    ARD<span>HIRE</span>
                    <p>Hire security workers fast</p>
                  </button>
                  <button
                    onClick={() => handleTabClick("tab2")}
                    className={`${activeTab === "tab2" ? styles.active : ""} ${
                      styles.blue
                    }`}
                  >
                    G
                    <img src={process.env.APP_URL + "/images/s-app-icon.svg"} />
                    ARD<span>TRAIN</span>
                    <p>Nationwide SIA training solution</p>
                  </button>
                  <button
                    onClick={() => handleTabClick("tab3")}
                    className={`${activeTab === "tab3" ? styles.active : ""} ${
                      styles.orange
                    }`}
                  >
                    G
                    <img src={process.env.APP_URL + "/images/s-app-icon.svg"} />
                    ARD<span>CHECK</span>
                    <p>Security vetting for workers </p>
                  </button>
                  <button
                    onClick={() => handleTabClick("tab4")}
                    className={`${activeTab === "tab4" ? styles.active : ""} ${
                      styles.yellow
                    }`}
                  >
                    G
                    <img src={process.env.APP_URL + "/images/s-app-icon.svg"} />
                    ARD<span>FLEX</span>
                    <p>On-demand short term hiring</p>
                  </button>
                </Carousel>
              </div>
            </Col>

            {activeTab === "tab1" && <GuardHire styles={styles} />}
            {activeTab === "tab2" && <GuardTrain styles={styles} />}
            {activeTab === "tab3" && <GuardCheck styles={styles} />}
            {activeTab === "tab4" && <GuardFlex styles={styles} />}
          </Row>
        </Container>
      </section>
      {/* Built security Section Ends Here */}

      <section className={`${styles.video_section}`}>
        <Container>
          <Row className="align-items-center">
            <Col className="col-lg-4 col-12">
              <h2 className={`fw-bold mb-3`}>
                LIGHTS, CAMERA <span>HIRE!</span>
              </h2>
              <h3>
                Hiring's got a new vibe:
                <br /> Video Intros for finding those hidden gems 💎
              </h3>
            </Col>
            <Col className="col-lg-8 col-12">
              <div className={`${styles.video_wrapper}`}>
                <MobilevideoPlayer />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

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
                WE REALLY MEAN IT <br />
                WHEN WE SAY <span>FAST</span> 🚀
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
              <p className="fs-6 mt-3">
                Signup today to get access to 100k licensed security jobseekers
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      {/* How we Compare Section Ends Here */}

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

      {/* <section className={`${styles.vetting_section}`}>
        <img
          src={process.env.APP_URL + "/images/lock-icon.svg"}
          alt="lock"
          className={`${styles.lockIcon}`}
        />
        <Container>
          <div className={`bg-white ${styles.vetting_cont_wrap}`}>
            <Row className="align-items-end">
              <Col className="col-lg-6 col-12">
                <h2 className={`fs-1 fw-normal mb-0`}>
                  BS7858: Security Vetting <span>Coming soon</span>
                </h2>
                <p className={`my-2 fs-4 fw-medium ${styles.para}`}>
                  Fast and automated security screening to reduce your time to
                  hire - all built within your portal
                </p>
                <div className={`${styles.listWrap}`}>
                  <h3 className="fs-2">A fully managed service</h3>
                  <ul className="list-unstyled">
                    <li>Order vetting and track progress from your portal</li>
                    <li>Fast, automated and hassle free process</li>
                    <li>Limited Screening completed within 48 hours</li>
                    <li>Full quality and compliance assurance</li>
                  </ul>
                </div>
              </Col>
              <Col className="col-lg-6 col-12">
                <figure>
                  <img
                    src={process.env.APP_URL + "/images/report_img.svg"}
                    alt="report"
                    className={`img-fluid ${styles.report_img}`}
                  />
                  <img
                    src={process.env.APP_URL + "/images/laptop_img.svg"}
                    alt="laptop"
                    className={`${styles.laptop_img} img-fluid`}
                  />
                </figure>
              </Col>
            </Row>
          </div>
        </Container>
      </section> */}

      <Quotation />

      <section className={`${styles.trustpilot_reviews_sec}`}>
        <Container>
          <Row>
            <Col className="col-12">
              <TrustPilotWithReviews />
            </Col>
          </Row>
        </Container>
      </section>

      <section className={` ${styles.certificate_sec}`}>
        <Container>
          <h3 className="text-center text-md-left">
            Certifications and Validations
          </h3>
          <Row>
            <Col className="col-12">
              <ul className="list-unstyled d-flex flex-md-wrap align-items-center justify-content-between">
                <li>
                  <img src={process.env.APP_URL + "/images/ukas.svg"} alt="1" />
                </li>
                <li>
                  <img
                    src={process.env.APP_URL + "/images/GDPR_badge.svg"}
                    alt="2"
                  />
                </li>
                <li>
                  <img
                    src={process.env.APP_URL + "/images/cyber-essentials.svg"}
                    alt="3"
                  />
                </li>
                <li>
                  <img
                    src={
                      process.env.APP_URL + "/images/armed-forces-covenant.svg"
                    }
                    alt="4"
                  />
                </li>
                <li>
                  <img
                    src={process.env.APP_URL + "/images/trusted_site.svg"}
                    alt="5"
                  />
                </li>
                <li>
                  <TrustPilotForCertifications />
                </li>
                <li>
                  <img
                    src={process.env.APP_URL + "/images/google-reviews.svg"}
                    alt="5"
                  />
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  // employerVideos: () => dispatch(employerVideos()),
  getTrustpilotTotalCount: () => dispatch(getTrustpilotTotalCount()),
  userLogoutAction: userLogoutAction,
  userLogoutActionTemp: () => dispatch(userLogoutAction()),
  resetJobReducer: () => dispatch({ type: "RESET_STAFFING_REDUCER" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
