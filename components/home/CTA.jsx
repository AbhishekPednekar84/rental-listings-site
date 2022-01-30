import React, { useState } from "react";
import { useRouter } from "next/router";
import Select from "react-select";
import { customSelectStyles } from "@/utils/selectStyles";
import { loaderIcon } from "@/utils/icons";
import { motion } from "framer-motion";

const variants = {
  tap: {
    y: "2px",
  },
};

const CTA = ({ apartments }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [ctaClicked, setCtaClicked] = useState(false);
  const router = useRouter();

  const options = apartments.map((apartment) => {
    return {
      value: apartment.name,
      label:
        apartment.name + " - " + apartment.address1 + " - " + apartment.city,
    };
  });

  return (
    <div>
      <div
        className={`border-4 rounded-md ${
          selectedValue
            ? "border-none"
            : ctaClicked
            ? "border-red-600"
            : "border-none"
        }`}
      >
        <Select
          instanceId="apartment-select"
          options={options}
          styles={customSelectStyles}
          isSearchable={true}
          placeholder="Enter the apartment name..."
          onChange={(o) => {
            setSelectedValue(o.value);
            setCtaClicked(false);
          }}
          className="text-lg"
        />
      </div>

      <div className="mt-8 mb-3 text-center">
        <motion.button
          variants={variants}
          whileTap="tap"
          onClick={() => {
            setCtaClicked(true);
            if (selectedValue !== null) {
              router.push(`/listings/${selectedValue}`);
            }
          }}
          className="w-44 px-5 py-3 bg-teal-600 text-white hover:bg-teal-800 shadow-white transition-colors duration-200 ease-in-out text-lg font-semibold uppercase tracking-wide rounded-full focus:outline-none"
        >
          {selectedValue && ctaClicked ? (
            <span className="animate-spin flex justify-center">
              {loaderIcon}
            </span>
          ) : (
            "See Listings"
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default CTA;
