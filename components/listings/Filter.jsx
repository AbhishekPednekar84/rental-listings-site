import React, { useState, useEffect, useRef, useContext } from "react";
import SiteContext from "@/context/site/siteContext";
import { filterIcon } from "@/utils/icons";

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
        <div className="border-2 border-teal-600 md:w-[800px] mx-4 py-4 px-2">
          <h3 className="font-semibold flex justify-center items-center mb-5">
            {filterIcon}
          </h3>
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="mb-7 lg:mb-0 flex justify-center items-center md:mr-16">
              <h5 className="font-semibold">Type of listing:</h5>

              <div className="flex justify-center items-center">
                <div className="mx-5 flex items-center">
                  <input
                    ref={checkRentRef}
                    id="rent"
                    name="rent"
                    type="checkbox"
                    value="rent"
                    className="mr-2 radio-checkbox-style"
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
                    className="mr-2 radio-checkbox-style"
                  />
                  <label htmlFor="check-sale">Sale</label>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center">
              <h5 className="pb-2 lg:pb-0 font-semibold">
                Number of bedrooms:
              </h5>

              <div className="flex items-center justify-center">
                <div className="flex items-center mx-5">
                  <input
                    ref={checkRadioOneRef}
                    id="one-bedroom"
                    name="bedrooms"
                    type="radio"
                    value="1"
                    onChange={handleRadio}
                    className="mr-2 radio-checkbox-style"
                  />
                  <label htmlFor="one-bedroom">1</label>
                </div>

                <div className="flex items-center mx-5">
                  <input
                    ref={checkRadioTwoRef}
                    id="two-bedrooms"
                    name="bedrooms"
                    type="radio"
                    value="2"
                    onChange={handleRadio}
                    className="mr-2 radio-checkbox-style"
                  />
                  <label htmlFor="two-bedrooms">2</label>
                </div>

                <div className="flex items-center mx-5">
                  <input
                    ref={checkRadioThreeRef}
                    id="three-bedrooms"
                    name="bedrooms"
                    type="radio"
                    value="3"
                    onChange={handleRadio}
                    className="mr-2 radio-checkbox-style"
                  />
                  <label htmlFor="three-bedrooms">3</label>
                </div>

                <div className="flex items-center mx-5">
                  <input
                    ref={checkRadioThreePlusRef}
                    id="three-plus-bedrooms"
                    name="bedrooms"
                    type="radio"
                    value="3+"
                    onChange={handleRadio}
                    className="mr-2 radio-checkbox-style"
                  />
                  <label htmlFor="three-plus-bedrooms">&gt;3</label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7">
            <button
              type="submit"
              disabled={!filter.rent && !filter.sale && !filter.bedrooms}
              className={`bg-teal-600 rounded-full  px-5 py-2 h-10 uppercase text-white tracking-wide font-semibold hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600 transition-colors duration-200 ease-in-out shadow-lg shadow-teal-100 ${
                !filter.rent &&
                !filter.sale &&
                !filter.bedrooms &&
                "cursor-not-allowed"
              }`}
            >
              Search
            </button>
            <button
              disabled={!filter.rent && !filter.sale && !filter.bedrooms}
              className={`bg-zinc-500 rounded-full focus:outline-none px-5 py-2 uppercase text-white tracking-wide font-semibold shadow-lg shadow-zinc-100 hover:bg-zinc-700 transition-colors duration-200 ease-in-out ml-5 ${
                !filter.rent &&
                !filter.sale &&
                !filter.bedrooms &&
                "cursor-not-allowed"
              }`}
              onClick={clear}
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Filter;
