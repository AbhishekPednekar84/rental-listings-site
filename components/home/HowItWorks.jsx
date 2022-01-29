import React, { useEffect } from "react";
import Image from "next/image";
import { starIcon } from "@/utils/icons";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const variants = {
  hidden: {
    opacity: 0,
    y: "10vw",
  },
};

const HowItWorks = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start((i) => ({
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          delay: i * 0.2,
        },
      }));
    }
  }, [controls, inView]);

  return (
    <div
      id="how-it-works"
      className="pt-16 lg:pt-24 pb-20 bg-gradient-to-b from-zinc-300 via-slate-200 to-white"
    >
      <h2 className="text-center font-bold mb-16 mx-2">
        <span className="heading-underline">Th</span>ree steps. That's all!
      </h2>
      <motion.div
        ref={ref}
        className="flex flex-col lg:flex-row justify-center lg:justify-evenly items-center "
      >
        <motion.div
          custom={0.75}
          variants={variants}
          initial="hidden"
          animate={controls}
          className="p-5 shadow-lg hover:shadow-2xl transition-shadow duration-150 ease-in-out max-w-[400px] bg-white mx-4 mb-16 lg:mb-0"
        >
          <div className="flex flex-col justify-center relative">
            <Image
              src="https://ik.imagekit.io/ykidmzssaww/Listings/site-images/hiw-2_p_d-ygIQA.jpg"
              alt="how it works seller"
              placeholder="blur"
              blurDataURL="https://ik.imagekit.io/ykidmzssaww/Listings/site-images/hiw-2_p_d-ygIQA.jpg/tr:bl-10"
              height={250}
              width={350}
            />
            <svg
              className="absolute -bottom-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
            >
              <path
                fill="#ffffff"
                fillOpacity="1"
                d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>

          <h3 className="text-center font-bold mt-5 mb-10">
            <span className="heading-underline">Ow</span>
            ners
          </h3>
          <ul className="ml-5 lg:ml-10">
            <li className="flex items-center pb-5">
              <span className="mr-1 text-teal-600">{starIcon}</span> Sign up for
              an account
            </li>
            <li className="flex items-center pb-5">
              <span className="mr-1 text-teal-600">{starIcon}</span> Create a
              listing
            </li>
            <li className="flex items-center pb-5">
              <span className="mr-1 text-teal-600">{starIcon}</span> Get
              contacted by a potential tenant/buyer
            </li>
          </ul>
        </motion.div>
        <motion.div
          custom={1.25}
          variants={variants}
          initial="hidden"
          animate={controls}
          className="p-5 shadow-lg hover:shadow-2xl transition-shadow duration-150 ease-in-out max-w-[400px] bg-white mx-4"
        >
          <div className="flex justify-center relative">
            <Image
              src="https://ik.imagekit.io/ykidmzssaww/Listings/site-images/hiw-1_A2_WuYNR3.jpg"
              alt="how it works - seeker"
              placeholder="blur"
              blurDataURL="https://ik.imagekit.io/ykidmzssaww/Listings/site-images/hiw-1_A2_WuYNR3.jpg/tr:bl-10"
              height={250}
              width={350}
            />

            <svg
              className="absolute -bottom-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
            >
              <path
                fill="#ffffff"
                fillOpacity="1"
                d="M0,192L48,208C96,224,192,256,288,250.7C384,245,480,203,576,186.7C672,171,768,181,864,165.3C960,149,1056,107,1152,90.7C1248,75,1344,85,1392,90.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
          <h3 className="text-center font-bold mt-5 mb-10">
            <span className="heading-underline">Se</span>
            ekers
          </h3>
          <ul className="ml-5 lg:ml-10">
            <li className="flex items-center pb-5">
              <span className="mr-1 text-teal-600">{starIcon}</span> Search
              listings
            </li>
            <li className="flex items-center pb-5">
              <span className="mr-1 text-teal-600">{starIcon}</span> Sign up to
              see full ad
            </li>
            <li className="flex items-center pb-5">
              <span className="mr-1 text-teal-600">{starIcon}</span> Contact the
              owner directly and finalize your dream home
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HowItWorks;
