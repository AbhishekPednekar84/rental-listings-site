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
    <div className="mb-10 flex justify-center print:hidden">
      <Link href={`/listings/${apartmentName}`}>
        <a className="inline-flex items-center text-xl font-semibold">
          <motion.span
            variants={variants}
            whileHover="hover"
            className="mr-2 rounded-full bg-teal-600 p-2 text-white"
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
