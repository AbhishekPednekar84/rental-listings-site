import React from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageCarousel = ({ images }) => {
  return (
    <div>
      <Carousel
        dynamicHeight
        showArrows={false}
        showThumbs={false}
        infiniteLoop
        emulateTouch
      >
        {images.map((img, index) => {
          const modifiedHeight =
            img.height > img.width ? parseInt(img.height / 5) : img.height;
          const modifiedWidth =
            img.height > img.width ? parseInt(img.width / 4) : img.width;

          return (
            <div key={index}>
              <Image
                src={img.image_url}
                alt="image"
                height={modifiedHeight}
                width={modifiedWidth}
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
