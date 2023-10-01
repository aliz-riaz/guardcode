import React, { useState } from "react";
import { Carousel, CarouselItem, CarouselControl } from "reactstrap";
import { connect } from "react-redux";
import moment from "moment";
import styles from "./Training.module.scss";

const ActivejobsCarousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === props.data.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? props.data.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };
  return (
    <>
      {props.data?.length > 0 ? (
        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
          {props.data?.map((item, key) => {
            return (
              <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.id}
              >
                <div className={`${styles.ActivejobsCarousel}`}>
                  <h3 className={`${styles.course_date}`}>
                    <span className="d-block">Next</span>
                    {moment(item.course_start_date)
                      .format("DD")
                      .toString()}{" "}
                    <sup className="fw-normal">
                      {moment(item.course_start_date).format("MMM").toString()}
                    </sup>
                  </h3>
                  <p className={`${styles.course_title} mb-0 mt-1`}>
                    {item.course_name}
                  </p>
                </div>
              </CarouselItem>
            );
          })}
          <CarouselControl
            className="active-jobs-carousel"
            direction="prev"
            directionText="Previous"
            onClickHandler={previous}
          />
          <CarouselControl
            className="active-jobs-carousel"
            direction="next"
            directionText="Next"
            onClickHandler={next}
          />
        </Carousel>
      ) : (
        <p className="display-7 fw-normal mb-0 mt-3">No Upcoming Courses</p>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ActivejobsCarousel);
