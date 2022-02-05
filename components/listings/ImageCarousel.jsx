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
        emulateTouch
      >
        {images.map((img, index) => {
          const modifiedHeight =
            img.height > img.width ? parseInt(img.height) : img.height;
          const modifiedWidth =
            img.height > img.width ? parseInt(img.width) : img.width;

          return (
            <div key={index} style={{ display: "block", minWidth: "100%" }}>
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
