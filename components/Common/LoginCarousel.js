import { useState } from "react";
import { Carousel, CarouselItem, CarouselIndicators } from "reactstrap";

const LoginCarousel = () => {
  // const items = [
  //     {
  //         src: process.env.APP_URL+'/images/carousel-img-3@2x.png',
  //         altText: 'Slide 3',
  //         heading: 'Book and manage your staff training with approved providers in over 85 locations nationwide.',
  //         paragraph: 'Choose from thousands of qualified and vetted security professionals to perfectly suit your position. Find shift cover or permanent placements nationwide.'
  //     },
  //     {
  //         src: process.env.APP_URL+'/images/carousel-img-2@2x.png',
  //         altText: 'Slide 2',
  //         heading: 'Post Jobs and connect with licensed security professionals instantly.',
  //         paragraph: 'Fully compliant BS7858 security vetting solutions for security companies of all sizes. We understand the pain of remaining compliant as a security employer. Our vetting solution makes vetting easy to initiate, process and maintain for your records and audits'
  //     },
  //     {
  //         src: process.env.APP_URL+'/images/carousel-img-1@2x.png',
  //         altText: 'Slide 1',
  //         heading: 'Supercharge your security training and hiring.',
  //         paragraph: 'Hire SIA Licensed professionals and book security courses with approved providers — all in one place.'
  //     },
  // ];
  const items = [
    {
      src: process.env.APP_URL + "/images/carousel-img2.png",
      altText: "Slide 2",
      heading: `Seeking Security Professionals?<br/>Start with £65 for your first Job Post`,
      paragraph:
        "Advertise your job on GuardPass with ease and discover qualified candidates quickly and effortlessly.",
    },
    {
      src: process.env.APP_URL + "/images/car-img-one.png",
      altText: "Slide 3",
      heading: "Simplifying Security training and Staffing for Companies",
      paragraph:
        "Post jobs and get licensed applicants with video profiles in minutes. Book training with approved providers. Find short-term cover without any problem!",
    },
    {
      src: process.env.APP_URL + "/images/carousel-img-1@2x.png",
      altText: "Slide 1",
      heading: "Find the Right Security Professionals Instantly",
      paragraph:
        "Post shifts or permanent jobs and choose from thousands of qualified and vetted security professionals that perfectly suit your position",
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
        <div className="login-slider-item">
          <img src={item.src} className="img-fluid" alt="" key={key} />
          <h1
            className="text-white"
            dangerouslySetInnerHTML={{ __html: item.heading }}
          />
          {/* {item.heading}{" "} */}
          {/* </h1> */}
          <p className="text-white">{item.paragraph}</p>
        </div>
      </CarouselItem>
    );
  });
  return (
    <div className="login-right d-none d-md-flex">
      <div className="login-screen-slider">
        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
          <CarouselIndicators
            items={items}
            activeIndex={activeIndex}
            onClickHandler={goToIndex}
          />
          {slides}
        </Carousel>
      </div>
    </div>
  );
};

export default LoginCarousel;
