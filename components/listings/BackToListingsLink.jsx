import React from "react";
import Link from "next/link";
import { backIcon } from "@/utils/icons";
import { motion } from "framer-motion";

const variants = {
  hover: {
    x: -3,
  },
};

const BackToListingsLink = ({ apartmentName }) => {
  return (
    <div className="flex justify-center mb-10 print:hidden">
      <Link href={`/listings/${apartmentName}`}>
        <a className="inline-flex items-center text-xl font-semibold">
          <motion.span
            variants={variants}
            whileHover="hover"
            className="mr-2 p-2 bg-teal-600 rounded-full text-white"
          >
            {backIcon}
          </motion.span>{" "}
          Back to Listings
        </a>
      </Link>
    </div>
  );
};

export default BackToListingsLink;
