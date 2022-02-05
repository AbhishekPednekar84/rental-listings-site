import React, { useState, useEffect, useRef, useContext } from "react";
import SiteContext from "@/context/site/siteContext";
import { filterIcon } from "@/utils/icons";
import { motion } from "framer-motion";

const variants = {
  tap: {
    y: "2px",
  },
};

const Filter = ({ apartmentName }) => {
  const [filter, setFilter] = useState({ rent: "", sale: "", bedrooms: "" });
  const checkRentRef = useRef("");
  const checkSaleRef = useRef("");
  const checkRadioOneRef = useRef("");
  const checkRadioTwoRef = useRef("");
  const checkRadioThreeRef = useRef("");
  const checkRadioThreePlusRef = useRef("");

  const siteContext = useContext(SiteContext);
  const { setLoading, filterAdsForApartment, fetchAdsForApartment } =
    siteContext;

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.performance.getEntriesByType("navigation")[0].type === "reload"
    ) {
      checkRentRef.current.checked = false;
      checkSaleRef.current.checked = false;
      checkRadioOneRef.current.checked = false;
      checkRadioTwoRef.current.checked = false;
      checkRadioThreeRef.current.checked = false;
      checkRadioThreePlusRef.current.checked = false;
    }
  }, []);

  const handleCheck = (e) => {
    const updatedValue = {};

    if (e.target.name === "rent")
      updatedValue[e.target.name] = checkRentRef.current.checked;

    if (e.target.name === "sale")
      updatedValue[e.target.name] = checkSaleRef.current.checked;

    setFilter({ ...filter, ...updatedValue });
  };

  const handleRadio = (e) => {
    const updatedValue = {};
    updatedValue[e.target.name] = e.target.value;

    setFilter({ ...filter, ...updatedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading();
    filterAdsForApartment(JSON.stringify(filter), apartmentName);
  };

  const clear = (e) => {
    e.preventDefault();
    checkRentRef.current.checked = false;
    checkSaleRef.current.checked = false;
    checkRadioOneRef.current.checked = false;
    checkRadioTwoRef.current.checked = false;
    checkRadioThreeRef.current.checked = false;
    checkRadioThreePlusRef.current.checked = false;
    fetchAdsForApartment(apartmentName);
  };

  return (
    <div className="mt-10 text-center">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="flex justify-center"
      >
        <div className="mx-4 border-2 border-teal-600 py-4 px-2 md:w-[800px]">
          <h3 className="mb-5 flex items-center justify-center font-semibold">
            {filterIcon}
          </h3>
          <div className="flex flex-col items-center justify-center md:flex-row">
            <div className="mb-7 flex items-center justify-center md:mr-16 lg:mb-0">
              <h5 className="font-semibold">Type of listing:</h5>

              <div className="flex items-center justify-center">
                <div className="mx-5 flex items-center">
                  <input
                    ref={checkRentRef}
                    id="rent"
                    name="rent"
                    type="checkbox"
                    value="rent"
                    className="radio-checkbox-style mr-2"
                    onChange={handleCheck}
                  />
                  <label htmlFor="check-rent">Rent</label>
                </div>

                <div className="flex items-center">
                  <input
                    ref={checkSaleRef}
                    id="sale"
                    name="sale"
                    type="checkbox"
                    value="sale"
                    onChange={handleCheck}
                    className="radio-checkbox-style mr-2"
                  />
                  <label htmlFor="check-sale">Sale</label>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center md:flex-row">
              <h5 className="pb-2 font-semibold lg:pb-0">
                Number of bedrooms:
              </h5>

              <div className="flex items-center justify-center">
                <div className="mx-5 flex items-center">
                  <input
                    ref={checkRadioOneRef}
                    id="one-bedroom"
                    name="bedrooms"
                    type="radio"
                    value="1"
                    onChange={handleRadio}
                    className="radio-checkbox-style mr-2"
                  />
                  <label htmlFor="one-bedroom">1</label>
                </div>

                <div className="mx-5 flex items-center">
                  <input
                    ref={checkRadioTwoRef}
                    id="two-bedrooms"
                    name="bedrooms"
                    type="radio"
                    value="2"
                    onChange={handleRadio}
                    className="radio-checkbox-style mr-2"
                  />
                  <label htmlFor="two-bedrooms">2</label>
                </div>

                <div className="mx-5 flex items-center">
                  <input
                    ref={checkRadioThreeRef}
                    id="three-bedrooms"
                    name="bedrooms"
                    type="radio"
                    value="3"
                    onChange={handleRadio}
                    className="radio-checkbox-style mr-2"
                  />
                  <label htmlFor="three-bedrooms">3</label>
                </div>

                <div className="mx-5 flex items-center">
                  <input
                    ref={checkRadioThreePlusRef}
                    id="three-plus-bedrooms"
                    name="bedrooms"
                    type="radio"
                    value="3+"
                    onChange={handleRadio}
                    className="radio-checkbox-style mr-2"
                  />
                  <label htmlFor="three-plus-bedrooms">&gt;3</label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7">
            <motion.button
              variants={variants}
              whileTap="tap"
              type="submit"
              disabled={!filter.rent && !filter.sale && !filter.bedrooms}
              className={`h-10 rounded-full  bg-teal-600 px-5 py-2 font-semibold uppercase tracking-wide text-white shadow-lg shadow-teal-100 transition-colors duration-200 ease-in-out hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 ${
                !filter.rent &&
                !filter.sale &&
                !filter.bedrooms &&
                "cursor-not-allowed"
              }`}
            >
              Search
            </motion.button>
            <motion.button
              variants={variants}
              whileTap="tap"
              disabled={!filter.rent && !filter.sale && !filter.bedrooms}
              className={`ml-5 rounded-full bg-zinc-500 px-5 py-2 font-semibold uppercase tracking-wide text-white shadow-lg shadow-zinc-100 transition-colors duration-200 ease-in-out hover:bg-zinc-700 focus:outline-none ${
                !filter.rent &&
                !filter.sale &&
                !filter.bedrooms &&
                "cursor-not-allowed"
              }`}
              onClick={clear}
            >
              Reset
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Filter;
