import React from "react";

const locationMarker = (
  <svg
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      color="red"
    ></path>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      color="red"
    ></path>
  </svg>
);

const Hero = ({ apartmentName, apartmentInfo }) => {
  return (
    <div className="h-96 bg-listing1 bg-center shadow-lg md:bg-cover">
      <div className="h-96 bg-black bg-opacity-60 shadow-lg">
        <div className="flex h-full items-center justify-center">
          <div className="mx-2 mt-14 bg-gray-900 bg-opacity-70 px-3 py-7 md:px-5">
            <h1 className="mb-4 text-center text-2xl font-bold text-white lg:text-4xl">
              {apartmentName}
            </h1>
            {apartmentInfo.address1 && (
              <p className="my-2 flex items-center text-white">
                <span className="mr-2">{locationMarker}</span>{" "}
                {apartmentInfo.address1}, {apartmentInfo.address2}
              </p>
            )}
            <p className="my-2 flex items-center text-white">
              <span className="mr-2">{locationMarker}</span>{" "}
              {apartmentInfo.city} - {apartmentInfo.pincode}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
