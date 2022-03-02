import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";

// Component imports
import CTA from "@/components/home/CTA";
import ApartmentModal from "../apartment/ApartmentModal";

const Hero = ({ apartments }) => {
  const [message, setMessage] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" && window.innerWidth
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const closeModal = () => {
    setModalOpen(false);
    setMessage(null);
  };
  const openModal = () => setModalOpen(true);

  return (
    <div
      className="relative h-[100vh]"
      //className={`${
      //  mounted ? "bg-heroSmall lg:bg-hero" : "bg-heroSmallBlur lg:bg-heroBlur"
      //} bg-center md:bg-right-bottom lg:bg-center bg-cover`}
    >
      {/* <Image
        src="https://ik.imagekit.io/ykidmzssaww/Listings/site-images/7538f295215840d3_91yuTOAZc.jpg"
        alt="Hero image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority={true}
        className="-z-10"
        placeholder="blur"
        blurDataURL="https://ik.imagekit.io/ykidmzssaww/Listings/site-images/7538f295215840d3_91yuTOAZc.jpg/tr:bl-10"
      /> */}

      <Image
        src="https://ik.imagekit.io/ykidmzssaww/Listings/site-images/d4c4344f3988a251_dYilqibMX.jpg"
        alt="Hero image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        priority={true}
        className="-z-10"
        placeholder="blur"
        blurDataURL="https://ik.imagekit.io/ykidmzssaww/Listings/site-images/d4c4344f3988a251_dYilqibMX.jpg/tr:bl-10"
      />
      <div className="flex items-center justify-center">
        <div className="relative mx-5 flex h-full flex-col items-center justify-center py-44 lg:py-56">
          <div className="bg-gray-900 bg-opacity-70 px-4 py-7 text-white md:px-5 lg:w-[80%]">
            <h1 className="mb-6 text-center text-2xl font-semibold tracking-wide text-white lg:text-3xl">
              Find flats for rent or sale in your dream apartment
            </h1>
            <p className="mb-7 text-left text-base lg:text-lg">
              Have an apartment complex in mind for your next home? Search by
              the apartment name and see what's for rent or sale.
            </p>
            <div className="flex justify-center">
              <CTA apartments={apartments} />
            </div>

            {/* <div className="mt-5 text-center">
              Don't see your apartment?{" "}
              <Link href="/">
                <a
                  className="font-semibold text-white underline decoration-teal-600 decoration-2 underline-offset-4 hover:text-teal-400"
                  onClick={() => (modalOpen ? closeModal() : openModal())}
                >
                  Add it here
                </a>
              </Link>
            </div> */}
          </div>
          <Link href="#how-it-works">
            <a
              className="absolute bottom-16"
              aria-label="Link to navigate to the next section"
            >
              <svg
                className="h-16 w-16 motion-safe:animate-bounce"
                fill="none"
                stroke="#FFFFFF"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 17l-4 4m0 0l-4-4m4 4V3"
                ></path>
              </svg>
            </a>
          </Link>
        </div>
      </div>
      <AnimatePresence exitBeforeEnter>
        {modalOpen && (
          <ApartmentModal
            handleClose={closeModal}
            message={message}
            setMessage={setMessage}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
