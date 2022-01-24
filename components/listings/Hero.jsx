import React from "react";

const locationMarker = (
  <svg
    className="w-5 h-5"
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
    <div className="bg-listing1 bg-center md:bg-cover h-96 shadow-lg">
      <div className="bg-black bg-opacity-60 h-96 shadow-lg">
        <div className="flex justify-center items-center h-full">
          <div className="bg-gray-900 bg-opacity-70 px-3 py-7 md:px-5 mx-2 mt-14">
            <h1 className=" text-white font-semibold text-center mb-4">
              {apartmentName}
            </h1>
            <p className="flex items-center text-white my-2">
              <span className="mr-2">{locationMarker}</span>{" "}
              {apartmentInfo.address1}, {apartmentInfo.address2}
            </p>
            <p className="flex items-center text-white my-2">
              <span className="mr-2">{locationMarker}</span>{" "}
              {apartmentInfo.city} - {apartmentInfo.pincode},{" "}
              {apartmentInfo.state}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
