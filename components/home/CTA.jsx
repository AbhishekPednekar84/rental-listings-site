import React, { useState } from "react";
import { useRouter } from "next/router";
import Select from "react-select";
import { customSelectStyles } from "@/utils/selectStyles";

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
          onChange={(o) => setSelectedValue(o.value)}
          className="text-lg"
        />
      </div>

      <div className="mt-8 mb-3 text-center">
        <button
          onClick={() => {
            setCtaClicked(true);
            if (selectedValue !== null) {
              router.push(`/listings/${selectedValue}`);
            }
          }}
          className="px-5 py-3 bg-teal-600 text-white hover:bg-teal-800 shadow-white transition-colors duration-200 ease-in-out text-lg font-semibold uppercase tracking-wide rounded-full focus:outline-none "
        >
          See Listings
        </button>
      </div>
    </div>
  );
};

export default CTA;
