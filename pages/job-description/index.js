import Head from "next/head";
import Link from "next/link";
import classnames from "classnames";
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  CarouselItem,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { Spinner } from "react-bootstrap";

import { toast } from "react-toastify";
import Header from "../../components/Header/HeaderMain";
import Footer from "../../components/Footer/FooterLandingPage";
import TrustBox from "../../components/Common/TrustPilot";
import { connect } from "react-redux";
import styles from "./jobDescription.module.scss";
import TrustPilotWithReviews from "../../components/Common/TrustPilotWithReviews";
import Fade from "react-reveal/Fade";
import { fetchJobTitleSuggestions } from "../../redux/actions/jobDescription";
import TitleList from "../../components/jobDescription/TitleList";
import TrustPilotForCertifications from "../../components/Common/TrustPilotForCertifications";
const jobDescriptionMain = (props) => {
  const [activeTab, setActiveTab] = useState("0");
  const [titles, setTitles] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(async () => {
    setLoading(true);
    const temp = await props.fetchJobTitleSuggestions(0);
    setTitles(temp);
    setLoading(false);
  }, []);

  useEffect(async () => {
    if (searchField != "") {
      const filterTitles = titles.filter((titles) => {
        return titles.title.toLowerCase().includes(searchField.toLowerCase());
      });
      setSearchData(filterTitles);
    }
  }, [searchField]);

  const onSearchTitle = (e) => {
    setSearchField(e.target.value);
  };

  const toggleTabs = async (tab) => {
    if (activeTab !== tab) {
      const temp = await props.fetchJobTitleSuggestions(tab);
      setTitles(temp);
      setSearchField("");
      setActiveTab(tab);
    }
  };

  const items = [
    {
      src: process.env.APP_URL + "/images/user-profile.jpg",
      altText: "Slide 1",
      name: "Nayara Delafuente",
      paragraph:
        "“ Windows comes with Windows Media Player already installed. Realplayer is a free download as well. There are other free products such as Winamp (Windows only). One important feature you want to look for when choosing an audio player beyond what is packaged with your operating system is the sound filtering capabilities. It should at least have a graphic equalizer where you can adjust for poor quality sound files. Look for other features like the ability to rip sound tracks and change the skins of the computer audio player. The demand for the computer audio player “",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };
  const slides = items.map((item, key) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <div className="testimonial_box">
          <p>{item.paragraph}</p>
          <div className="testimonial_avatar">
            <img src={item.src} className="img-fluid" alt="" key={key} />
          </div>
          <h3>{item.name}</h3>
          <img
            src={process.env.APP_URL + "/images/tp-img.svg"}
            className="d-inline-block mt-1"
            alt=""
          />
        </div>
      </CarouselItem>
    );
  });

  const listTitles = [
    "A-C",
    "D-F",
    "G-I",
    "J-L",
    "M-O",
    "P-R",
    "S-U",
    "V-W",
    "X-Z",
  ];
  return (
    <div
      style={{ backgroundColor: "#F2F2F2" }}
      className={`${styles.main_wrap}`}
    >
      <Head>
        <title>
          Job description templates for roles in the Security Industry | Get
          Licensed
        </title>
        <meta
          name="description"
          content="Find and copy job description templates for roles such as Door Supervisors, Security Guards, CCTV Operators and other security job description templates."
        />
        <link
          rel="canonical"
          href="https://www.guardpass.com/employers/job-description"
        />
      </Head>
      <Header />

      <section className={`${styles.sub_heading_banner} py-5`}>
        <Container>
          <Row className="justify-content-center">
            <Col className="col-12 col-md-10">
              <div className="text-center py-3">
                <h1 className="text-white pt-2">Job Description Templates</h1>
                {/* <div className='text-center mb-4'>
                                <Link href={`${process.env.APP_URL}/signup`}>
                                    <a className='btn btn-md btn-gray px-5 py-2 mt-4'>Post a job</a>
                                </Link> 
                            </div> */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className={`bg-light py-1 py-md-3 py-md-5`}>
        <Container>
          <Row className="justify-content-center">
            <Col className="col-12 col-md-9">
              <div className="text-center py-4 my-3">
                <h2 className="fs-1">What are job descriptions?</h2>
                <p className="display-5 mt-4 pt-1">
                  A job description (also known as a JD) is the first chance
                  your potential hire has to learn about a role, and sometimes,
                  it's their first chance to learn about your company, too. An
                  ideal JD outlines the job's requirements and responsibilities
                  — both of which form a solid foundation for your dynamite
                  description.
                </p>
                <p className="display-5 mb-0">
                  To inspire your next great hire to apply, we've developed job
                  description templates spanning multiple positions across
                  multiple industries. Tailor these to your specific needs to
                  get the right talent in the door
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section
        className={`${styles.job_titles} pt-5 pb-4 mb-2`}
        id="titles_sec"
      >
        <Container>
          <Row>
            <Col className="col-12 col-md-8">
              <Nav className={`${styles.nav_tabs}`} tabs>
                {listTitles.map((value, index) => {
                  return (
                    <NavItem
                      className={`${activeTab == index && styles.active}`}
                    >
                      <NavLink
                        className={classnames({ active: activeTab == index })}
                        onClick={() => {
                          toggleTabs(index.toString());
                        }}
                      >
                        {value}
                      </NavLink>
                    </NavItem>
                  );
                })}
              </Nav>
            </Col>
            <Col className="col-12 col-md-4">
              <div className={`${styles.search_titles}`}>
                <input
                  type={"text"}
                  onChange={onSearchTitle}
                  placeholder="Search by title"
                />
                <div className={`${styles.icon_glass}`}>
                  <img
                    src={`${process.env.APP_URL}/images/loupe.svg`}
                    width={"20"}
                    height={"20px"}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="col-12">
              <div className="mt-4">
                {!loading ? (
                  <TabContent className="pt-1" activeTab={activeTab}>
                    {listTitles?.map((value, index) => {
                      return (
                        <TabPane tabId={index.toString()}>
                          <ul
                            className={`${styles.job_title_list} d-flex flex-wrap justify-content-center mt-2 mb-2`}
                          >
                            {searchField != "" ? (
                              <TitleList titles={searchData} />
                            ) : (
                              <TitleList titles={titles} />
                            )}
                          </ul>
                        </TabPane>
                      );
                    })}
                  </TabContent>
                ) : (
                  <div className="text-center py-5">
                    <Spinner animation="border" role="status"></Spinner>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section
        className={`${styles.job_description_sec} bg-white py-md-5 py-4`}
      >
        <Container>
          <Row>
            <Col className="col-12 col-md-6 order-2 order-md-1">
              <h2 className="fs-1 mt-3 mb-5 d-none d-md-block">
                How a good job description elevates your job post
              </h2>
              <p className="mt-3 mt-md-0">
                The difference between a good job description and a great one is
                the difference between simply filling the role and attracting
                world-class talent. Here are 9 ways to elevate your JD from meh
                to wow:
              </p>
              <p>
                1. <strong>Use clear and concise language.</strong> Speak
                directly and simply, avoiding jargon that'll be confusing, slang
                that could seem unprofessional, and overly wordy sentences.
              </p>
              <p>
                2. <strong>Add keywords.</strong> Job seekers most often search
                using keywords. Make sure your job description includes the
                relevant terms that a job seeker would use to find your job.
              </p>
              <p>
                3. <strong>Be specific.</strong> Cookie cutter descriptions
                aren't great at giving candidates a real sense of the role and
                your company. Give your JD a personal touch by spelling out
                distinct responsibilities.
              </p>
              <p>
                4. <strong>Be thoughtful.</strong> Strong candidates want to
                know their work will be valued. Let them know how their
                contributions will influence your company's overall success.
              </p>
              <p>
                5. <strong>Be transparent.</strong> If this role entails long
                hours and hard work, say so. In doing that, you'll weed out
                people that don't fit the bill—and you won't be wasting anyone's
                time. And always quantify the experience level necessary.
              </p>
              <p>
                6. <strong>Share your values.</strong> Introduce your company
                culture. To help you attract candidates who share your vision
                and ideals, let them know what you stand for.
              </p>
              <p>
                7. <strong>Keep it short.</strong> It can be a turn-off to see a
                wall of text in a job description. Say what you need to, and
                stop. Outline the specific requirements you're looking for that
                are mandatory, not a laundry list, which can intimidate and
                discourage even the best candidates.
              </p>
              <p>
                8. <strong>Formatting helps.</strong> To make your post easy to
                scan and digest, use bullets instead of paragraphs to relay
                responsibilities and requirements.
              </p>
              <p>
                9. <strong>Don't forget perks.</strong> Include any benefits or
                perks of the job, like 401(k), flextime, profit sharing, stock
                options, etc., but don't focus on these too much or you might
                attract the wrong audience.
              </p>
            </Col>
            <Col className="col-12 col-md-6 mt-3 mt-md-5 order-1 order-md-2">
              <h2 className="fs-1  d-md-none mb-5 text-center">
                How a good job description elevates your job post
              </h2>
              <img
                src={`${process.env.APP_URL}/images/lander-ill-1.svg`}
                className="img-fluid"
              />
            </Col>
          </Row>
        </Container>
      </section>
      <section className={`${styles.ready_to_hire_sec} bg-black py-5`}>
        <Container>
          <Row>
            <Col>
              <h3 className="fs-1 text-white text-center mb-5 mt-4">
                Ready to start hiring world-class talent?
              </h3>
              <div className="text-center mb-4">
                <Link href={`${process.env.APP_URL}/signup`}>
                  <a className="btn btn-md btn-success text-dark py-2 px-5">
                    Post a job
                  </a>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-4 bg-light ">
        <Container>
          <Row>
            <Col className="col-12">
              <TrustBox />
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
};

// export default Home;

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
});

const mapDispatchToProps = (dispatch) => ({
  fetchJobTitleSuggestions: (id) => dispatch(fetchJobTitleSuggestions(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(jobDescriptionMain);
