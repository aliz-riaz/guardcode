import React, { useEffect, useState, useRef, useContext } from "react";
import { connect } from "react-redux";
import { getNewsAndUpdates } from "../../../redux/actions/dashboardAction";
import NewsAndUpdateCard from "./NewsAndUpdateCard";
import styles from "./NewsAndUpdate.module.scss";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";

const NewsAndUpdate = (props) => {
  const [blogData, setBlogData] = useState([]);
  useEffect(async () => {
    const blog = await props.getNewsAndUpdates(props.user_token);
    if (blog.request_status) {
      setBlogData(blog.data);
    }
  }, []);

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

  return (
    <>
      <div className="news-update-carousel">
        <h5 className={`${styles.heading}`}>News {`&`} Updates</h5>
        <div className="row">
          <div className="col-md-12">
            <Carousel
              itemClass="px-2"
              draggable={false}
              ssr={true}
              renderButtonGroupOutside={true}
              arrows={false}
              customButtonGroup={<ButtonGroup />}
              className={styles.carousel_wrap}
              responsive={responsive}
            >
              {blogData?.posts?.length > 0 ? (
                blogData.posts?.map((item) => {
                  return (
                    <>
                      <NewsAndUpdateCard data={item} />
                    </>
                  );
                })
              ) : (
                <p className="text-center py-3">No Post found</p>
              )}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user_token: state.vantage.userDataReducer.user_token,
});

const mapDispatchToProps = (dispatch) => ({
  getNewsAndUpdates: (userToken) => dispatch(getNewsAndUpdates(userToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsAndUpdate);
