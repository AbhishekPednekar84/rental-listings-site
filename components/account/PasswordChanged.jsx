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
  tap: {
    y: "2px",
  },
};

const PasswordChanged = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center">
      <div className="flex w-[80%] flex-col items-center bg-white p-10 shadow-lg">
        <svg
          className="h-6 w-6"
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

        <h4 className="mt-5 text-center font-semibold">
          Password changed successfully!
        </h4>

        <motion.button
          variants={variants}
          whileTap="tap"
          className="mt-10 mb-3 h-12 w-32 rounded-full bg-teal-600 p-3 font-semibold uppercase text-white transition-colors duration-200 ease-in hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
          onClick={() => router.push("/account/login")}
        >
          Login
        </motion.button>
      </div>
    </div>
  );
};

export default PasswordChanged;
