import React, { useState, useContext, useEffect } from "react";
import SiteContext from "@/context/site/siteContext";
import { Router, useRouter } from "next/router";
import * as Yup from "yup";
import Select from "react-select";
import { Formik, Form, Field } from "formik";
import { listingSelectStyles } from "@/utils/selectStyles";
import { errorIcon, buildingIcon, loaderIcon, closeIcon } from "@/utils/icons";

const validationSchema = Yup.object({
  name: Yup.string().required("Apartment name is required").trim(),
  pincode: Yup.number()
    .typeError("Must be a number")
    .required("Pincode is required"),
});

const AddApartment = ({ apartments }) => {
  const [selectedApartment, setSelectedApartment] = useState(null);

  const router = useRouter();

  const siteContext = useContext(SiteContext);
  const {
    searchApartments,
    searchResults,
    setLoading,
    loading,
    clearApartmentSearch,
    createApartment,
    createdApartment,
  } = siteContext;

  const singleSearchResult = searchResults && searchResults.length === 1;

  const options = apartments.map((apartment) => {
    return {
      value: apartment.id,
      label:
        apartment.name + " - " + apartment.city + " - " + apartment.pincode,
    };
  });

  useEffect(() => {
    if (searchResults && searchResults.length === 0) {
      const searchedApartment =
        typeof window !== "undefined" &&
        localStorage.getItem("_searchedApartment");

      if (searchedApartment) {
        searchedApartment = JSON.parse(searchedApartment);

        createApartment(
          searchedApartment.name.trim(),
          searchedApartment.pincode.trim()
        );
      }
    }
  }, [searchResults && searchResults.length]);

  useEffect(() => {
    createdApartment &&
      createdApartment &&
      router.push(`/listings/create/${createdApartment.id}`);
  }, [createdApartment]);

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(true);
    setLoading();
    clearApartmentSearch();
    searchApartments(values.name.trim(), values.pincode.trim());
    typeof window !== "undefined" &&
      localStorage.setItem(
        "_searchedApartment",
        JSON.stringify({
          name: values.name.trim(),
          pincode: values.pincode.trim(),
        })
      );
    actions.setSubmitting(false);
  };

  return (
    <div className="mx-5">
      <div className="w-[300px] md:w-[350px]">
        <h1 className="mb-5 text-center font-bold leading-normal">
          <span className="heading-underline">Yo</span>
          ur Apartment
        </h1>

        <div className="flex flex-col items-start justify-center">
          <div
            className={`mt-6 w-72 md:w-80 ${
              selectedApartment
                ? "mb-1 border-b-2 border-b-teal-600"
                : "mb-1 border-b-2 border-b-gray-400"
            }`}
          >
            <div className="mb-2 text-center font-semibold text-teal-600">
              Select your apartment
            </div>
            <Select
              name="apartmentSelect"
              instanceId="apartmentSelect"
              options={options}
              styles={listingSelectStyles}
              isSearchable={true}
              placeholder={
                <span className="required-style">Enter the apartment name</span>
              }
              onChange={(o) => setSelectedApartment(o.value)}
              value={options.filter((option) => {
                return option.value === selectedApartment;
              })}
              className="text-sm"
            />
          </div>
        </div>

        {selectedApartment && (
          <div
            className="cursor-pointer text-sm uppercase text-teal-600 underline underline-offset-2"
            onClick={() => setSelectedApartment(null)}
          >
            clear selection
          </div>
        )}

        {!selectedApartment && (
          <div className="my-10 flex items-center justify-center font-bold text-gray-800">
            <hr className="mr-2 w-1/4 border-t-4 border-gray-800" />
            OR
            <hr className="ml-2 w-1/4 border-t-4 border-gray-800" />
          </div>
        )}

        <Formik
          initialValues={{
            name: "",
            pincode: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form>
              {!selectedApartment && (
                <>
                  <div className="mb-2 text-center font-semibold text-teal-600">
                    Add a new apartment
                  </div>
                  <div className="p-3">
                    <p className="mb-7 text-sm text-teal-800">
                      Don't see your apartment above? <br />
                      Enter the apartment details instead. We'll create your
                      apartment in an instant!
                    </p>

                    {/* Apartment name */}
                    <div
                      className={`relative ${
                        props.touched.name && props.errors.name
                          ? "mb-1"
                          : "mb-12"
                      }`}
                    >
                      <Field
                        id="name"
                        name="name"
                        type="text"
                        maxLength="50"
                        placeholder="Apartment name*"
                        autoComplete="off"
                        disabled={searchResults && searchResults}
                        className="remove-default-focus peer h-10 w-72 border-b-2 border-b-teal-600 p-0 placeholder-transparent placeholder-shown:border-b-gray-400 md:w-80"
                      />
                      <label
                        htmlFor="Apartment name"
                        className="absolute left-0 -top-3.5 text-xs text-teal-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-teal-600"
                      >
                        <span className="required-style">Apartment name</span>
                      </label>
                    </div>

                    {props.touched.name && props.errors.name && (
                      <div className="mb-12 flex items-center text-xs text-rose-600">
                        <span className="mr-1">{errorIcon}</span>
                        {props.errors.name}
                      </div>
                    )}

                    <div
                      className={`relative ${
                        props.touched.pincode && props.errors.pincode
                          ? "mb-1"
                          : "mb-6"
                      }`}
                    >
                      <Field
                        id="pincode"
                        name="pincode"
                        type="text"
                        maxLength="8"
                        placeholder="Pincode*"
                        autoComplete="off"
                        disabled={searchResults && searchResults}
                        className="remove-default-focus peer h-10 w-72 border-b-2 border-b-teal-600 p-0 placeholder-transparent placeholder-shown:border-b-gray-400 md:w-80"
                      />
                      <label
                        htmlFor="pincode"
                        className="absolute left-0 -top-3.5 text-xs text-teal-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-teal-600"
                      >
                        <span className="required-style">Pincode</span>
                      </label>
                    </div>

                    {props.touched.pincode && props.errors.pincode && (
                      <div className="mb-6 flex items-center text-xs text-rose-600">
                        <span className="mr-1">{errorIcon}</span>
                        {props.errors.pincode}
                      </div>
                    )}
                  </div>
                </>
              )}

              {searchResults && searchResults.length > 0 && !selectedApartment && (
                <div className="relative">
                  <span
                    className="absolute -right-2 -top-2 cursor-pointer rounded-full bg-gray-700 p-0.5 text-white"
                    onClick={() => {
                      clearApartmentSearch();
                      localStorage.removeItem("_searchedApartment");
                    }}
                  >
                    {closeIcon}
                  </span>
                  <div className="mb-5 flex h-[150px] justify-center overflow-y-auto bg-gradient-to-r from-slate-100 to-zinc-100">
                    <div className="w-80 p-2">
                      <h4 className="mb-1 text-center text-sm font-semibold">
                        Hold on!
                      </h4>
                      <h5 className="mb-3 text-xs leading-5">
                        We found{" "}
                        {singleSearchResult
                          ? "an apartment"
                          : "some apartments"}{" "}
                        that possibly {singleSearchResult ? "matches" : "match"}{" "}
                        your search. You can select{" "}
                        {singleSearchResult ? "it" : "one of them"} in the
                        dropdown or proceed with the apartment details you
                        entered.
                      </h5>
                      {searchResults.map((result, index) => {
                        return (
                          <p
                            key={index}
                            className="flex items-center gap-2 py-2 text-sm text-teal-800"
                          >
                            {buildingIcon} {result.name}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-center">
                {!selectedApartment && !searchResults && (
                  <button
                    type="submit"
                    className="mt-5 mb-3 h-12 w-64 rounded-full bg-teal-600 p-3 font-semibold text-white transition-colors duration-200 ease-in hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2 text-white">
                        PLEASE WAIT{" "}
                        <span className="animate-spin">{loaderIcon}</span>
                      </span>
                    ) : (
                      "ADD A NEW APARTMENT"
                    )}
                  </button>
                )}

                {selectedApartment && (
                  <button
                    type="button"
                    className="mt-10 mb-3 h-12 w-52 rounded-full bg-teal-600 p-3 font-semibold text-white transition-colors duration-200 ease-in hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
                    onClick={() => {
                      setLoading();
                      selectedApartment &&
                        localStorage.setItem(
                          "_selectedApartment",
                          selectedApartment
                        );
                      setTimeout(
                        () =>
                          router.push(`/listings/create/${selectedApartment}`),
                        1000
                      );
                    }}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2 text-white">
                        PLEASE WAIT{" "}
                        <span className="animate-spin">{loaderIcon}</span>
                      </span>
                    ) : (
                      "NEXT"
                    )}
                  </button>
                )}

                {!selectedApartment &&
                  searchResults &&
                  searchResults.length === 0 && (
                    <p className="font-semibold text-teal-800">
                      Almost there...
                    </p>
                  )}

                {!selectedApartment &&
                  searchResults &&
                  searchResults.length > 0 && (
                    <button
                      type="button"
                      className="mt-5 mb-3 h-12 w-80 rounded-full bg-teal-600 p-3 font-semibold text-white transition-colors duration-200 ease-in hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
                      onClick={() => {
                        setLoading();
                        setTimeout(
                          () =>
                            createApartment(
                              props.values.name.trim(),
                              props.values.pincode.trim()
                            ),
                          2000
                        );
                      }}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2 text-white">
                          PLEASE WAIT{" "}
                          <span className="animate-spin">{loaderIcon}</span>
                        </span>
                      ) : (
                        "JUST ADD MY APARTMENT"
                      )}
                    </button>
                  )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddApartment;
