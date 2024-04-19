import Carousel from "react-multi-carousel";
import "./css/MainCarousel.css";

import MainImage1 from "../Images/pic1.jpg";
import MainImage3 from "../Images/pic3.jpg";
import MainImage4 from "../Images/pic4.jpg";
import MainImage6 from "../Images/pic6.jpg";
import MainImage7 from "../Images/pic7.jpg";

const MainCarousel = () => {
  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlay
      autoPlaySpeed={3000}
      centerMode={false}
      className=""
      containerClass="container"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      // renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 1,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 1,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 1,
        },
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      <img
        src={MainImage1}
        alt="mainImage1"
        style={{
          width: "100%",
        }}
      />
      <img
        src={MainImage3}
        alt="mainImage3"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      <img
        src={MainImage4}
        alt="mainImage4"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      <img
        src={MainImage6}
        alt="mainImage6"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      <img
        src={MainImage7}
        alt="mainImage7"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </Carousel>
  );
};

export default MainCarousel;
