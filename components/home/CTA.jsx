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
        className={`rounded-md border-4 ${
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
          className="w-48 rounded-full bg-teal-600 px-5 py-3 text-lg font-semibold uppercase tracking-wide text-white shadow-white transition-colors duration-200 ease-in-out hover:bg-teal-800 focus:outline-none"
        >
          {selectedValue && ctaClicked ? (
            <span className="flex items-center justify-center">
              PLEASE WAIT
              <span className="ml-1 animate-spin">{loaderIcon}</span>
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
