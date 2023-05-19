import Image from "next/image";
import React from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Box } from "@mui/material";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
    slidesToSlide: 3,
  },
};

const CouroselGallery = (props) => {
  const getImageBaseURL = (path) =>
    `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}${path}`;
  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      className="gallery"
      containerClass="carousel-container"
      dotListClass=""
      draggable
      focusOnSelect={false}
      // infinite
      itemClass="carousel-item-padding-40-px"
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={responsive}
    >
      {props?.gallery.map((url, index) => (
        <Image
          src={getImageBaseURL(url)}
          alt="Banner Image"
          width={100}
          height={100}
          priority
          //   className="w-[100px] md:w-[100px] h-[auto]"
          key={index}
        />
      ))}
    </Carousel>
  );
};

export default CouroselGallery;
