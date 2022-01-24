import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const variants = {
  hidden: { opacity: 0, pathLength: 0 },
  animate: {
    opacity: 1,
    pathLength: 1,
    transition: { delay: 1.2, duration: 2 },
  },
};

const PasswordChanged = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center">
      <div className="p-10 shadow-lg bg-white w-[80%] flex flex-col items-center">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          variants={variants}
          initial="hidden"
          animate="animate"
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
          ></motion.path>
        </svg>

        <h4 className="text-center font-semibold mt-5">
          Password changed successfully!
        </h4>

        <button
          className="mt-10 mb-3 p-3 h-12 w-32 bg-teal-600 text-white font-semibold rounded-full focus:outline-none hover:bg-teal-800 focus:ring-2 focus:ring-offset-2 focus:ring-teal-600 transition-colors duration-200 ease-in uppercase"
          onClick={() => router.push("/account/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default PasswordChanged;
