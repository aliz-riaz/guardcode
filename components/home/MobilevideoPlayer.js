import ReactPlayer from "react-player";
import { employerVideos } from "../../redux/actions/main";
import { connect } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import styles from "./Video.module.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const VideoPlayer = (props) => {
  const [employerVideo, setEmployerVideo] = useState([]);

  const [activeVideoIndex, setActiveVideoIndex] = useState(null);
  const [swiper, setSwiper] = useState(null);
  const videoRefs = useRef([]);

  // useEffect(async () => {
  //   const videosData = await props.employerVideos();
  //   setEmployerVideo(videosData);
  // }, []);

  const handleVideoClick = (index) => {
    // Pause the previously playing video, if any
    if (activeVideoIndex !== null) {
      videoRefs.current[activeVideoIndex].pause();
      setActiveVideoIndex(null);
    }
    // Play the clicked video
    if (activeVideoIndex !== index) {
      setActiveVideoIndex(index);
      videoRefs.current[index].play();
      // Stop the carousel
      if (swiper !== null) {
        swiper.autoplay.stop();
      }
    } else {
      setActiveVideoIndex(null);
      videoRefs.current[index].pause();
      // Start the carousel
      if (swiper !== null) {
        swiper.autoplay.start();
      }
    }
  };

  const handleVideoEnded = () => {
    setActiveVideoIndex(null);
    // Start the carousel
    if (swiper !== null) {
      swiper.autoplay.start();
    }
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1025 },
      items: 5,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2.75,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1.875,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <Carousel
      arrows={false}
      autoPlaySpeed={3000}
      // centerMode={true}
      // customTransition="all 3s linear"
      // infinite={true}
      // minimumTouchDrag={80}
      responsive={responsive}
      showDots={false}
      itemClass="pr-md-4 pr-3"
      // slidesToSlide={1}
      // swipeable={false}
      ssr={false}
      draggable={true}
      // focusOnSelect={true}
      // transitionDuration={500}
    >
      {employerVideo?.map((video, index) => {
        return (
          <>
            <div className={`${styles.video_wrap}`} key={video.id}>
              <div
                className={`${styles.video_wrap} cursor-pointer`}
                onClick={() => handleVideoClick(index)}
              >
                <video
                  src={video.link}
                  poster={video.thumbnail_url}
                  ref={(el) => (videoRefs.current[index] = el)}
                  onEnded={handleVideoEnded}
                ></video>
                {activeVideoIndex !== index && (
                  <button className={styles.video_play_button}>
                    <span></span>
                  </button>
                )}
              </div>
            </div>
          </>
        );
      })}
    </Carousel>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  employerVideos: () => dispatch(employerVideos()),
});

const memoized = React.memo(VideoPlayer);

export default connect(mapStateToProps, mapDispatchToProps)(memoized);
