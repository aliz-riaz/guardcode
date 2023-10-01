import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";

function Testimonial() {
  const items = [
    {
      altText: "Slide 1",
      avatar: "/images/",
      heading: "Nayara Delafuente",
      rating: "/images/tp-img.svg",
      paragraph:
        "“ Windows comes with Windows Media Player already installed. Realplayer is a free download as well. There are other free products such as Winamp (Windows only). One important feature you want to look for when choosing an audio player beyond what is packaged with your operating system is the sound filtering capabilities. It should at least have a graphic equalizer where you can adjust for poor quality sound files. Look for other features like the ability to rip sound tracks and change the skins of the computer audio player. The demand for the computer audio player “",
    },
    {
      altText: "Slide 2",
      avatar: "/images/",
      heading: "Nayara Delafuente",
      rating: "/images/tp-img.svg",
      paragraph:
        "“ Windows comes with Windows Media Player already installed. Realplayer is a free download as well. There are other free products such as Winamp (Windows only). One important feature you want to look for when choosing an audio player beyond what is packaged with your operating system is the sound filtering capabilities. It should at least have a graphic equalizer where you can adjust for poor quality sound files. Look for other features like the ability to rip sound tracks and change the skins of the computer audio player. The demand for the computer audio player “",
    },
    {
      altText: "Slide 2",
      avatar: "/images/",
      heading: "Nayara Delafuente",
      rating: "/images/tp-img.svg",
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
        <div className="testimonail_box">
          <p>{item.paragraph}</p>
          <div className="box_bottom">
            <span className="testimonail_avatar"></span>
            <h3>{item.heading}</h3>
            <div className="rating">
              <img src={item.rating} alt="rating" />
            </div>
          </div>
        </div>
      </CarouselItem>
    );
  });

  return (
    <section className="testimonail_sec">
      <Container>
        <Row>
          <Col>
            <Carousel activeIndex={activeIndex} next={next} previous={previous}>
              {slides}
              <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={previous}
              />
              <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={next}
              />
            </Carousel>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Testimonial;
