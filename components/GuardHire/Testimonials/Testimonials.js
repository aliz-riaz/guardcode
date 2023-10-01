import React, { useEffect, useState, useRef } from "react";
import styles from "./Testimonials.module.scss";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import useTestimonial from "../../../hooks/GuardHire/useTestimonial";
import ReadMore from "./ReadMore";
const Testimonials = () => {
  const [showReadMore, setShowReadMore] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(false);
  const { data, isLoading } = useTestimonial();

  const itemToShowOnLargeScreen = 3;
  const itemToShowOnSmallScreen = 1;

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: itemToShowOnLargeScreen,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: itemToShowOnLargeScreen,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: itemToShowOnLargeScreen,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: itemToShowOnSmallScreen,
    },
  };

  const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const {
      carouselState: { currentSlide, totalItems, deviceType },
    } = rest;
    var itemDisplay = 0;

    if (deviceType === "mobile") {
      itemDisplay = totalItems - itemToShowOnSmallScreen;
    } else {
      itemDisplay = totalItems - itemToShowOnLargeScreen;
    }

    return (
      <div className={`${styles.arrow_group}`}>
        <button
          className={currentSlide === 0 ? `${styles.disabled}` : ""}
          onClick={() => previous()}
        >
          <img src={`${process.env.APP_URL}/images/arrow-left.svg`} />
        </button>
        <button
          onClick={() => next()}
          className={currentSlide === itemDisplay ? `${styles.disabled}` : ""}
        >
          <img src={`${process.env.APP_URL}/images/arrow-right.svg`} />
        </button>
      </div>
    );
  };
  const handleReadMore = (e, index) => {
    e.preventDefault();
    setShowReadMore(true);
    setCurrentIndex(index);
  };
  if (isLoading) {
    return (
      <div className="row">
        {[1, 2, 3].map((index) => {
          return (
            <div className="col-md-4 px-1">
              <div className={`${styles.user_review}`} key={index}>
                <div className={`${styles.content}`}>
                  <p className="animated_shimmer mb-3">
                    Providing security in a hotel is of paramount importance to
                    ensure the safety and well-being of guests, staff, and
                    property. A comprehensive approach to hotel security
                    involves a combination of physical, technological, and
                    procedural measures. From preventing unauthorized access to
                    responding
                    <button>Read More</button>
                  </p>
                </div>
                <div className={styles.user_info}>
                  <h3 className={`fs-4 mb-0 animated_shimmer`}>
                    Adam Khan
                    <span className="d-block fw-normal">HR Manager</span>
                  </h3>
                  <figure className="animated_shimmer mb-0">
                    <img
                      src={process.env.APP_URL + "/images/mitie.svg"}
                      className="img-fluid"
                      alt="u"
                    />
                  </figure>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <>
      <Carousel
        // infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        responsive={responsive}
        showDots={false}
        itemClass="pr-md-3 pr-0"
        ssr={false}
        draggable={false}
        renderButtonGroupOutside={true}
        arrows={false}
        customButtonGroup={data.length > 3 ? <ButtonGroup /> : null}
      >
        {data.map((data, index) => {
          return (
            <div className={`${styles.user_review}`} key={data.id}>
              <div className={`${styles.content}`}>
                <p>
                  {data.review.slice(0, 325)}
                  {data.review.length > 325 && (
                    <>
                      ...
                      <button onClick={(e) => handleReadMore(e, index)}>
                        {" "}
                        Read More
                      </button>
                    </>
                  )}
                </p>
              </div>
              <div className={styles.user_info}>
                <h3
                  className={`fs-5 mb-0 ${
                    data?.company_logo == null && styles.no_image
                  }`}
                >
                  {data.author_name}
                  <span className="d-block fs-6 fw-normal">
                    {data.job_title}
                  </span>
                </h3>
                {data?.company_logo != null && (
                  <img
                    src={data.company_logo}
                    className="img-fluid"
                    alt="guk"
                  />
                )}
              </div>
            </div>
          );
        })}
      </Carousel>
      {showReadMore && (
        <ReadMore
          showReadMore={showReadMore}
          setShowReadMore={setShowReadMore}
          data={data}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      )}
    </>
  );
};

export default Testimonials;
