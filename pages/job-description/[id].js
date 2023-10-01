import Head from "next/head";
import Link from "next/link";

import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, CarouselItem } from "reactstrap";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import Header from "../../components/Header/HeaderMain";
import Footer from "../../components/Footer/FooterLandingPage";
import TrustPilotForCertifications from "../../components/Common/TrustPilotForCertifications";
import TrustBox from "../../components/Common/TrustPilot";
import { connect } from "react-redux";
import styles from "./jobDescription.module.scss";

import {
  fetchMoreTitles,
  DownloadJobDescription,
} from "../../redux/actions/jobDescription";
export async function getStaticProps({ params }) {
  const res = await fetch(
    `${process.env.GUARD_PASS_URL}api/public/job/description/${params.id}`
  );
  const errorCode = res.ok ? false : res.status;
  const JobTitleSuggestions = errorCode == false ? await res.json() : null;
  if (!JobTitleSuggestions || !res.ok) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      errorCode,
      fetchData: JobTitleSuggestions,
      slug: params.id,
      //data: []
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const res = await fetch(
    `${process.env.GUARD_PASS_URL}api/public/job/title/suggestions/slug`
  );
  const errorCode = res.ok ? false : res.status;
  const JobTitleSlug = errorCode == false ? await res.json() : null;
  const slugPaths = JobTitleSlug.data.map((data) => ({
    params: { id: data.slug },
  }));
  return {
    //   paths: [{params : {id: 'aviation-security-offcer'}}, ],
    paths: slugPaths,
    fallback: "blocking",
  };
}

const jobDescription = (props) => {
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }
  const [show, setShow] = useState(false);
  const [moreTitles, SetMoreTitles] = useState();
  const [downloadPdf, SetDwonloadPdf] = useState();

  useEffect(async () => {
    const titles = await props.fetchMoreTitles();
    SetMoreTitles(titles);
  }, []);

  function copyJobDescriptionHandler(e) {
    e.preventDefault();
    setShow(true);
    navigator.clipboard.writeText(props.fetchData.data[0].description);
    setTimeout(() => {
      setShow(false);
    }, 1000);
  }
  function copyToClip() {
    setShow(true);
    const str = props.fetchData.data[0].description;
    function listener(e) {
      e.clipboardData.setData("text/html", str);
      e.clipboardData.setData("text/plain", str);
      e.preventDefault();
    }
    document.addEventListener("copy", listener);
    document.execCommand("copy");
    document.removeEventListener("copy", listener);
    setTimeout(() => {
      setShow(false);
    }, 1000);
  }

  const downloadPdfSubmit = async (id, slug) => {
    SetDwonloadPdf(true);
    await props.DownloadJobDescription(id, slug);
    SetDwonloadPdf(false);
  };

  return (
    <div
      style={{ backgroundColor: "#F2F2F2" }}
      className={`${styles.main_wrap}`}
    >
      <Head>
        <title>
          {props.fetchData.data[0]?.title} job description template - Download
          now
        </title>
        <meta
          name="description"
          content={`Copy or download the perfect job description for ${props.fetchData.data[0]?.title}. Job description includes all relevant responsibilities of a ${props.fetchData.data[0]?.title} in the security industry.`}
        />
        <link
          rel="canonical"
          href={`https://www.guardpass.com/employers/job-description/${props.slug}`}
        />
      </Head>
      <Header />

      <section className={`${styles.sub_heading_banner} py-5`}>
        <Container>
          <Row className="justify-content-center">
            <Col className="col-12 col-md-10">
              <div className="text-center py-3">
                <h2 className="text-white">Job description template</h2>
                <h1 className="text-white pt-2">
                  {props.fetchData.data[0]?.title}
                </h1>
                {/* <a className='btn btn-md btn-gray px-5 py-2 mt-4' href={process.env.APP_URL+'/signup'}>Post a Job</a> */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* <section className={`bg-light py-1 py-md-5`}>
            <Container>
                <Row>
                    <Col className='col-12'>
                        <div className='text-center py-4 my-3'>
                        <h2 className='fs-1'>How to write a Door supervisor job description </h2>
                            <p className='display-5 mt-4 pt-1'>
                                The best Door supervisor job descriptions introduce the organisation’s culture and values, as well as defining <br className='d-none d-md-block' /> expectations for the role. Be specific: door supervisors are detail-oriented, so a clear, concise, and <br className='d-none d-md-block' /> descriptive job posting is the most effective way to get their attention.
                            </p>
                            <p className='display-5 mb-0'>    
                                Keep your job description easy to read by using bulleted lists and including no more than six bullet points per <br className='d-none d-md-block' /> section. Double-check that it’s accurate before posting, especially when it comes to technical details.
                            </p>
                        </div>    
                    </Col>
                </Row>
            </Container>
        </section> */}
      {/* <section className={`bg-white py-4 py-md-5`}>
            <Container>
                <Row className='justify-content-center'>
                    <Col className='col-12 col-md-9'>
                        <div className='text-center py-0 py-md-4 my-3'>
                            <h2 className='fs-1'>What does a Door supervisor do?</h2>
                            <p className='display-5 mt-4 pt-1'>
                            Sometimes referred to as software developers or software engineers, application developers are responsible for building software and solutions for an organisation and its customers. In addition to building applications, these professionals also have to continually test and maintain them to ensure they’re working properly. 
                            </p>
                            <p className='display-5 mb-0'>    
                            An application developer’s typical responsibilities include coding, designing, application management, troubleshooting, monitoring updates and possible security threats, and providing end user support. They may also handle some project management tasks on the journey to building a new application.
                            </p>
                        </div>    
                    </Col>
                </Row>
            </Container>
        </section> */}
      <section className={`${styles.job_description_temp} py-3 py-md-5`}>
        <Container>
          <Row className="d-none">
            <Col md="12">
              <h2 className="fs-1 text-center py-2 mt-3 mt-md-4 mb-4 mb-md-5">
                Sample Application for a {props.fetchData.data[0]?.title}
              </h2>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col className="col-12 col-md-9">
              <div className={`bg-white ${styles.job_description__container}`}>
                <div className={`${styles.tem_header}`}>
                  <ul className="mb-0">
                    <li
                      className="cursor-pointer position-relative"
                      onClick={copyToClip}
                    >
                      <i>
                        <img
                          src={`${process.env.APP_URL}/images/pdf-icn.svg`}
                        />
                      </i>
                      <span className="fw-bold">Copy this JD</span>
                      {show && (
                        <div className={`${styles.copy_badge}`}>Copied</div>
                      )}
                    </li>
                    <li className="cursor-pointer border-0">
                      <i>
                        <img
                          src={`${process.env.APP_URL}/images/pdf-icn.svg`}
                        />
                      </i>
                      <span
                        className={`fw-bold ${downloadPdf && styles.blur}`}
                        onClick={() =>
                          downloadPdfSubmit(
                            props.fetchData.data[0].id,
                            props.slug
                          )
                        }
                      >
                        Download as .PDF
                      </span>
                      {downloadPdf ? (
                        <>
                          <div className={`text-center ${styles.spinner}`}>
                            <Spinner
                              animation="border"
                              size="sm"
                              role="status"
                            ></Spinner>
                          </div>
                        </>
                      ) : null}
                    </li>
                  </ul>
                </div>
                <div className={`${styles.description_cont} pt-4`}>
                  {/* <h4>Job Description</h4> */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `${props.fetchData.data[0]?.description}`,
                    }}
                    className={`${styles.job_temp}`}
                  ></div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className={`${styles.job_titles} py-4 py-md-5 mb-4`}>
        <Container>
          <Row>
            <Col className="col-12">
              <h4 className="text-center">Similar job titles</h4>
            </Col>
          </Row>
          <Row>
            <Col className="col-12">
              <div className="mb-4">
                <ul
                  className={`${styles.job_title_list} d-flex justify-content-center flex-wrap mt-4 mb-2`}
                >
                  {moreTitles?.map((data, index) => {
                    return (
                      <li className="fw-bold d-flex align-items-center justify-content-center">
                        <Link
                          href={`${process.env.APP_URL}/job-description/${data.slug}`}
                        >
                          <a className="d-flex align-items-center justify-content-center">
                            {data.title}
                          </a>
                        </Link>
                      </li>
                    );
                  })}
                  {/* <li className='fw-bold d-flex align-items-center justify-content-center'>
                                    <Link href="/">
                                        <a className='d-flex align-items-center justify-content-center'>Security guard</a>
                                    </Link>
                                </li>
                                <li className='flex-inline fw-bold '>
                                    <Link href="/">
                                        <a className='d-flex align-items-center justify-content-center'>Security guard</a>
                                    </Link>
                                </li>
                                <li className='flex-inline fw-bold '>
                                    <Link href="/">
                                        <a className='d-flex align-items-center justify-content-center'>Security guard</a>
                                    </Link>
                                </li>
                                <li className='flex-inline fw-bold '>
                                    <Link href="/">
                                        <a className='d-flex align-items-center justify-content-center'>Security guard</a>
                                    </Link>
                                </li> */}
                </ul>
              </div>
              <div className="text-center">
                <Link
                  href={process.env.APP_URL + "/job-description#titles_sec"}
                >
                  <a className=" text-decoration-line text-success fw-bold display-5 d-inline-block mt-0 mt-md-3">
                    View All
                  </a>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className={`${styles.ready_to_hire_sec} bg-black pb-4 pt-5`}>
        <Container>
          <Row>
            <Col>
              <h3 className="fs-1 text-white text-center mb-3">
                Ready to hire?
                <Link href={process.env.APP_URL + "/signup"}>
                  <a className="text-success text-decoration-line ml-2 d-block d-md-inline-block">
                    Post a job now.
                  </a>
                </Link>
              </h3>
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
          <h3>Certifications and Validations</h3>
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
  fetchMoreTitles: () => dispatch(fetchMoreTitles()),
  DownloadJobDescription: (id, slug) =>
    dispatch(DownloadJobDescription(id, slug)),
});
export default connect(mapStateToProps, mapDispatchToProps)(jobDescription);
