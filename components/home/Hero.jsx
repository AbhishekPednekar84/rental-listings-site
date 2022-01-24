import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";

// Component imports
import CTA from "@/components/home/CTA";
import ApartmentModal from "../apartment/ApartmentModal";

const Hero = ({ apartments }) => {
  const [message, setMessage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
    setMessage(null);
  };
  const openModal = () => setModalOpen(true);

  return (
    <div className="bg-hero bg-cover">
      <div className="bg-black bg-opacity-30">
        <div className="flex flex-col justify-center items-center h-screen relative mx-6">
          <div className="bg-gray-900 bg-opacity-70 px-3 py-7 md:px-5 mx-2 text-white">
            <h1 className="text-white text-3xl lg:text-4xl tracking-wide font-semibold text-center mb-6">
              Find flats for rent or sale in your dream apartment
            </h1>
            <div className="flex justify-center">
              <CTA apartments={apartments} />
            </div>

            <div className="text-center mt-5">
              Don't see your apartment?{" "}
              <Link href="/">
                <a
                  className="text-white hover:text-teal-100 font-semibold underline underline-offset-4 decoration-teal-600 decoration-2"
                  onClick={() => (modalOpen ? closeModal() : openModal())}
                >
                  Add it here
                </a>
              </Link>
            </div>
          </div>
          <Link href="#how-it-works">
            <a
              className="absolute bottom-0 pb-10"
              aria-label="Link to navigate to the next section"
            >
              <svg
                className="motion-safe:animate-bounce w-16 h-16"
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
