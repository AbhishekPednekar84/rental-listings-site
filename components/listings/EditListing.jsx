import React, { useEffect, useContext, useState } from "react";
import AuthContext from "@/context/auth/authContext";
import SiteContext from "@/context/site/siteContext";
import { Formik, Form, Field } from "formik";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import Select from "react-select";
import { listingSelectStyles } from "@/utils/selectStyles";
import { loaderIcon, trashIcon, errorIcon, rupeeIcon } from "@/utils/icons";
import { sessionExpiredToast } from "@/utils/toasts";
import { motion, AnimatePresence } from "framer-motion";

// Component import
import ImageUploader from "@/components/listings/ImageUploader";

const variants = {
  tap: {
    y: "2px",
  },
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { delay: 0.5, duration: 0.2 },
  },
  exit: {
    opacity: 0,
  },
};

const validationSchema = [
  Yup.object({
    title: Yup.string().required("Title is required").trim(),
    listingType: Yup.string().required(
      "Please specify if the unit is for rent or sale"
    ),
  }),
  Yup.object({
    bedrooms: Yup.string()
      .required("Bedroom count required")
      .matches(/^[0-9]+$/, "Numbers only")
      .trim(),
    bathrooms: Yup.string()
      .matches(/^[0-9]+$/, "Numbers only")
      .trim(),
    totalArea: Yup.string()
      .required("Area in sq ft. is required")
      .matches(/^[0-9]+(\.\d{1,2})?$/, "Invalid area format")
      .trim(),
    floor: Yup.number()
      .typeError("Must be a number")
      .required("Floor is required"),
    totalFloors: Yup.number()
      .typeError("Must be a number")
      .required("Total floors are required")
      .min(Yup.ref("floor"), "Cannot be less than floor"),
    rent: Yup.string().when("listingType", {
      is: (val) => val === "rent",
      then: Yup.string()
        .required("Rent amount is required")
        .matches(/^[0-9]+(\.\d{1,2})?$/, "Invalid amount format")
        .test("minNumber", "Amount cannot be 0", (number) => number !== "0")
        .trim(),
      otherwise: Yup.string().notRequired(),
    }),
    deposit: Yup.string().when("listingType", {
      is: (val) => val === "rent",
      then: Yup.string()
        .required("Deposit amount is required")
        .matches(/^[0-9]+(\.\d{1,2})?$/, "Invalid amount format")
        .test("minNumber", "Amount cannot be 0", (number) => number !== "0")
        .trim(),
      otherwise: Yup.string().notRequired(),
    }),
    maintenance: Yup.string()
      .matches(/^[0-9]+(\.\d{1,2})?$/, "Invalid amount format")
      .trim(),
    saleAmount: Yup.string().when("listingType", {
      is: (val) => val === "sale",
      then: Yup.string()
        .required("Sale amount is required")
        .matches(/^[0-9]+(\.\d{1,2})?$/, "Invalid amount format")
        .test("minNumber", "Amount cannot be 0", (number) => number !== "0")
        .trim(),
      otherwise: Yup.string().notRequired(),
    }),
  }),
  Yup.object({}),
  Yup.object({
    mobile: Yup.string()
      .required("Mobile number is required")
      .matches(/^[0-9]+$/, "Numbers only")
      .min(10, "At least 10 digits"),
  }),
];

const infoCircle = (
  <svg
    className="h-4 w-4"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const steps = [
  "Listing Information",
  "Flat Details",
  "Additional Flat Details",
  "Contact Information",
];

const EditListing = ({
  listingId,
  listingInfo,
  imgList,
  setImgList,
  selectedApartmentInfo,
}) => {
  const [startDate, setStartDate] = useState(
    new Date(listingInfo.available_from)
  );
  const [facingDirection, setFacingDirection] = useState(
    listingInfo.facing_direction
  );
  const [saleAmountValue, setSaleAmountValue] = useState(null);
  const [tenantPreference, setTenantPreference] = useState(
    listingInfo.tenant_preference
  );
  const [files, setFiles] = useState([]);

  // Multi-step state
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === steps.length - 1;

  const authContext = useContext(AuthContext);
  const siteContext = useContext(SiteContext);

  const { user } = authContext;
  const {
    updateListing,
    loading,
    setLoading,
    deleteImageFromImageKit,
    siteError,
  } = siteContext;

  // const options = apartments.map((apartment) => {
  //   return {
  //     value: apartment.id,
  //     label:
  //       apartment.attributes.name +
  //       " - " +
  //       apartment.attributes.address1 +
  //       " - " +
  //       apartment.attributes.city,
  //   };
  // });

  const facingOptions = [
    { value: "North", label: "North" },
    { value: "East", label: "East" },
    { value: "West", label: "West" },
    { value: "South", label: "South" },
    { value: "North East", label: "North East" },
    { value: "North West", label: "North West" },
    { value: "South East", label: "South East" },
    { value: "South West", label: "South West" },
  ];

  const currencyValueOptions = [
    { value: "Lakhs", label: "Lakhs" },
    { value: "Crores", label: "Crores" },
  ];

  const tenantPreferenceOptions = [
    { value: "Anyone", label: "Anyone" },
    { value: "Families", label: "Family" },
    { value: "Bachelorette", label: "Bachelorette's" },
    { value: "Bachelors", label: "Bachelors" },
    { value: "BB", label: "Bachelorette's or Bachelors" },
  ];

  useEffect(() => {
    window.scroll({ top: 1, left: 1, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (siteError === "Token expired") {
      logout();
      sessionExpiredToast();
      setTimeout(() => router.push("/account/login"), 1500);
    }
  }, [siteError]);

  var availableFromDate = new Date(startDate);

  var currDate = availableFromDate.getDate();
  var currMonth = availableFromDate.getMonth() + 1;
  var currYear = availableFromDate.getFullYear();

  availableFromDate = currYear + "-" + currMonth + "-" + currDate;

  const currentValidationSchema = validationSchema[activeStep];

  const handleBack = () => {
    setActiveStep(parseInt(activeStep) - 1);
  };

  const handleSubmit = (values, actions) => {
    console.log(actions);
    actions.setSubmitting(true);
    actions.setTouched({});

    if (!isLastStep) {
      setActiveStep(activeStep + 1);
      actions.setSubmitting(false);
    }

    if (isLastStep) {
      setLoading();
      setTimeout(
        () =>
          updateListing(
            listingId,
            values.title,
            values.listingType,
            availableFromDate,
            values.bedrooms,
            values.bathrooms,
            values.totalArea,
            values.floor,
            values.totalFloors,
            values.rent,
            values.maintenanceIncluded,
            values.rentNegotiable,
            values.deposit,
            values.maintenance,
            values.saleAmount,
            saleAmountValue || "Lakhs",
            values.saleNegotiable,
            facingDirection,
            values.description,
            tenantPreference,
            values.parking,
            values.pets,
            values.nonVeg,
            values.mobile,
            values.whatsapp,
            values.call,
            values.text,
            files
          ),
        1000
      );
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 via-slate-100 to-neutral-200">
      <div className="mx-5 mt-32 mb-20 overflow-hidden bg-white shadow-xl">
        <div className="relative h-52 bg-editListingHero bg-cover bg-center lg:h-64 lg:bg-center">
          {/* <svg
            className="absolute -bottom-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg> */}
          <svg
            className="absolute -bottom-4 lg:-bottom-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,224L80,213.3C160,203,320,181,480,186.7C640,192,800,224,960,213.3C1120,203,1280,149,1360,122.7L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
        <div className="bg-white px-2 pt-8 lg:px-10">
          <h1 className="m-0 mb-5 text-center font-bold leading-normal">
            <span className="heading-underline">Up</span>
            date your listing
          </h1>
          <p className="text-center text-xs font-semibold text-gray-700">
            {activeStep + 1} of {steps.length}
          </p>
        </div>

        <Formik
          initialValues={{
            title: listingInfo.title,
            listingType: listingInfo.listing_type,
            availableFrom: startDate,
            bedrooms: listingInfo.bedrooms,
            bathrooms: listingInfo.bathrooms,
            totalArea: listingInfo.total_area,
            floor: listingInfo.floors,
            totalFloors: listingInfo.total_floors,
            rent: listingInfo.rent,
            maintenanceIncluded: listingInfo.maintenance_in_rent,
            rentNegotiable: listingInfo.rent_negotiable,
            deposit: listingInfo.deposit,
            maintenance: listingInfo.maintenance,
            saleAmount: listingInfo.sale,
            saleNegotiable: listingInfo.sale_negotiable,
            facing: listingInfo.facing_direction,
            description: listingInfo.description,
            tenantPreference: listingInfo.tenant_preference,
            parking: listingInfo.parking_available,
            pets: listingInfo.pets_allowed,
            nonVeg: listingInfo.nv_allowed,
            mobile: listingInfo.mobile_number,
            whatsapp: listingInfo.whatsapp_number,
            call: listingInfo.prefer_call,
            text: listingInfo.prefer_text,
          }}
          validationSchema={currentValidationSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form
              autoComplete="off"
              className="p-5 text-black md:px-16 md:pb-10"
            >
              <p className="mb-10 text-center text-lg">
                This ad is posted in{" "}
                <span className="font-semibold underline decoration-teal-600 decoration-2 underline-offset-4">
                  {selectedApartmentInfo}
                </span>
              </p>
              <AnimatePresence exitBeforeEnter>
                {activeStep === 0 && (
                  <motion.div
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {/* Title */}
                    <div
                      className={`relative ${
                        props.touched.title && props.errors.title
                          ? "mb-1"
                          : "mb-12"
                      }`}
                    >
                      <Field
                        id="title"
                        name="title"
                        type="text"
                        maxLength={50}
                        placeholder="Title for your ad*"
                        maxLength="100"
                        autoComplete="off"
                        className="remove-default-focus peer h-10 w-80 border-b-2 border-b-teal-600 p-0 placeholder-transparent placeholder-shown:border-b-gray-400"
                      />
                      <label
                        htmlFor="title"
                        className="absolute left-0 -top-3.5 text-xs text-teal-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-teal-600"
                      >
                        <span className="required-style">Ad title</span>
                      </label>
                    </div>

                    {props.touched.title && props.errors.title && (
                      <div className="mb-12 flex items-center text-xs text-rose-600">
                        <span className="mr-1">{errorIcon}</span>
                        {props.errors.title}
                      </div>
                    )}

                    {/* Listing Type */}
                    <div
                      className={`flex ${
                        props.touched.listingType && props.errors.listingType
                          ? "mb-1"
                          : "mb-12"
                      }`}
                    >
                      <div id="listingType-radio-group" className="mr-4">
                        <span className="required-style font-medium">
                          Type of listing
                        </span>
                        :
                      </div>

                      <div
                        role="group"
                        aria-labelledby="listingType-radio-group"
                        className="flex"
                      >
                        <label className="mr-4 flex items-center">
                          <Field
                            type="radio"
                            name="listingType"
                            value="rent"
                            className="radio-checkbox-style"
                          />
                          <span className="ml-2">Rent</span>
                        </label>
                        <label className="flex  items-center">
                          <Field
                            type="radio"
                            name="listingType"
                            value="sale"
                            className="radio-checkbox-style"
                          />
                          <span className="ml-2">Sale</span>
                        </label>
                      </div>
                    </div>

                    {props.touched.listingType && props.errors.listingType && (
                      <div className="mb-12 flex items-center text-xs text-rose-600">
                        <span className="mr-1">{errorIcon}</span>
                        {props.errors.listingType}
                      </div>
                    )}

                    <div className="mt-2 mb-12 flex items-center">
                      <label
                        htmlFor="availableFrom"
                        className="w-56"
                        id="date-picker"
                      >
                        <span className="font-medium">Available from</span>:
                      </label>

                      <DatePicker
                        name="availableFrom"
                        dateFormat="dd/MM/yyyy"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="remove-default-focus w-36 cursor-pointer border-b-2 border-b-gray-400 text-center text-base focus:outline-none"
                        aria-label="Pick the date from when the item will be available"
                        aria-labelledby="date-picker"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence exitBeforeEnter>
                {activeStep === 1 && (
                  <motion.div
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <div className="flex justify-between">
                      {/* Bedrooms */}
                      <div>
                        <div
                          className={`relative ${
                            props.touched.bedrooms && props.errors.bedrooms
                              ? "mb-1"
                              : "mb-12"
                          }`}
                        >
                          <Field
                            name="bedrooms"
                            placeholder="Number of bedrooms*"
                            maxLength="2"
                            autoComplete="off"
                            className="remove-default-focus peer h-10 w-32 border-b-2 border-b-teal-600 p-0 placeholder-transparent placeholder-shown:border-b-gray-400 lg:w-40"
                          />
                          <label
                            htmlFor="bedrooms"
                            className="absolute left-0 -top-3.5 text-xs text-teal-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-teal-600"
                          >
                            <span className="required-style">Bedrooms</span>
                          </label>
                        </div>

                        {props.touched.bedrooms && props.errors.bedrooms && (
                          <div className="mb-12 flex items-center text-xs text-rose-600">
                            <span className="mr-1">{errorIcon}</span>
                            {props.errors.bedrooms}
                          </div>
                        )}
                      </div>

                      {/* Bathrooms */}
                      <div>
                        <div
                          className={`relative ${
                            props.touched.bathrooms && props.errors.bathrooms
                              ? "mb-1"
                              : "mb-12"
                          }`}
                        >
                          <Field
                            id="bathrooms"
                            name="bathrooms"
                            type="text"
                            placeholder="Number of Bathrooms"
                            maxLength="2"
                            autoComplete="off"
                            className="remove-default-focus peer h-10 w-32 border-b-2 border-b-teal-600 p-0 placeholder-transparent placeholder-shown:border-b-gray-400 lg:w-40"
                          />
                          <label
                            htmlFor="bathrooms"
                            className="absolute left-0 -top-3.5 text-xs text-teal-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-teal-600"
                          >
                            Bathrooms
                          </label>
                        </div>

                        {props.touched.bathrooms && props.errors.bathrooms && (
                          <div className="mb-12 flex items-center text-xs text-rose-600">
                            <span className="mr-1">{errorIcon}</span>
                            {props.errors.bathrooms}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Total Area */}
                    <div>
                      <div
                        className={`relative flex ${
                          props.touched.totalArea && props.errors.totalArea
                            ? "mb-1"
                            : "mb-12"
                        }`}
                      >
                        <Field
                          id="totalArea"
                          name="totalArea"
                          type="text"
                          placeholder="Area (sq ft.)*"
                          maxLength="8"
                          autoComplete="off"
                          className="remove-default-focus peer h-10 w-[90%] border-b-2 border-b-teal-600 p-0 placeholder-transparent placeholder-shown:border-b-gray-400"
                        />
                        <label
                          htmlFor="totalArea"
                          className="absolute left-0 -top-3.5 text-xs text-teal-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-teal-600"
                        >
                          <span className="required-style">
                            Total Area (Sq ft.)
                          </span>
                        </label>
                        <span className="flex items-end text-sm">sq ft</span>
                      </div>

                      {props.touched.totalArea && props.errors.totalArea && (
                        <div className="mb-12 flex items-center text-xs text-rose-600">
                          <span className="mr-1">{errorIcon}</span>
                          {props.errors.totalArea}
                        </div>
                      )}
                    </div>

                    {/* Floor */}
                    <div className="flex justify-between">
                      <>
                        <div>
                          <div
                            className={`relative ${
                              props.touched.floor && props.errors.floor
                                ? "mb-1"
                                : "mb-12"
                            }`}
                          >
                            <Field
                              id="floor"
                              name="floor"
                              type="text"
                              placeholder="Floor on which the unit is located"
                              maxLength="3"
                              autoComplete="off"
                              className="remove-default-focus peer h-10 w-32 border-b-2 border-b-teal-600 p-0 placeholder-transparent placeholder-shown:border-b-gray-400 lg:w-40"
                            />
                            <label
                              htmlFor="floor"
                              className="absolute left-0 -top-3.5 text-xs text-teal-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-teal-600"
                            >
                              <span className="required-style">Floor</span>
                            </label>
                          </div>

                          {props.touched.floor && props.errors.floor && (
                            <div className="mb-12 flex items-center text-xs text-rose-600">
                              <span className="mr-1">{errorIcon}</span>
                              {props.errors.floor}
                            </div>
                          )}
                        </div>
                      </>

                      <span className="flex items-baseline pt-2 text-lg font-bold text-teal-600">
                        /
                      </span>
                      <>
                        <div>
                          <div
                            className={`relative ${
                              props.touched.totalFloors &&
                              props.errors.totalFloors
                                ? "mb-1"
                                : "mb-12"
                            }`}
                          >
                            <Field
                              id="totalFloors"
                              name="totalFloors"
                              type="text"
                              placeholder="Total floors"
                              maxLength="3"
                              autoComplete="off"
                              className="remove-default-focus peer h-10 w-32 border-b-2 border-b-teal-600 p-0 pl-2 placeholder-transparent placeholder-shown:border-b-gray-400 lg:w-40"
                            />
                            <label
                              htmlFor="totalFloors"
                              className="absolute left-0 -top-3.5 text-xs text-teal-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-teal-600"
                            >
                              <span className="required-style">
                                Total floors
                              </span>
                            </label>
                          </div>

                          {props.touched.totalFloors &&
                            props.errors.totalFloors && (
                              <div className="mb-12 flex items-center text-xs text-rose-600">
                                <span className="mr-1">{errorIcon}</span>
                                {props.errors.totalFloors}
                              </div>
                            )}
                        </div>
                      </>
                    </div>

                    {/* Rent */}
                    {props.values.listingType === "rent" && (
                      <>
                        <div>
                          <div
                            className={`relative flex ${
                              props.touched.rent && props.errors.rent
                                ? "mb-1"
                                : "mb-1"
                            }`}
                          >
                            <Field
                              id="rent"
                              name="rent"
                              type="text"
                              placeholder="Rent*"
                              maxLength="10"
                              autoComplete="off"
                              className="remove-default-focus peer h-10 w-full border-b-2 border-b-teal-600 p-0 placeholder-transparent placeholder-shown:border-b-gray-400 "
                            />
                            <label
                              htmlFor="rent"
                              className="absolute left-0 -top-3.5 text-xs text-teal-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-teal-600"
                            >
                              <span className="required-style flex items-center">
                                <span className="mr-0.5 fill-teal-600">
                                  {rupeeIcon}
                                </span>{" "}
                                Rent Amount
                              </span>
                            </label>
                          </div>

                          {props.touched.rent && props.errors.rent && (
                            <div className="mb-2 flex items-center text-xs text-rose-600">
                              <span className="mr-1">{errorIcon}</span>
                              {props.errors.rent}
                            </div>
                          )}
                        </div>
                        {/* Maintenance */}
                        <div className="mt-1 flex items-center">
                          <div id="maintenance-group">
                            <span className="text-sm font-medium">
                              Maintenance included
                            </span>
                            :
                          </div>
                          <div
                            aria-labelledby="maintenance-group"
                            className="ml-3 flex items-center"
                          >
                            <Field
                              type="checkbox"
                              name="maintenanceIncluded"
                              className="radio-checkbox-style"
                            />
                          </div>
                        </div>
                        {/* Rent negotiable */}
                        <div className="mt-1 mb-12 flex items-center">
                          <div id="negotiable-group">
                            <span className="text-sm font-medium">
                              Rent negotiable
                            </span>
                            :
                          </div>
                          <div
                            aria-labelledby="negotiable-group"
                            className="ml-3 flex items-center"
                          >
                            <Field
                              type="checkbox"
                              name="rentNegotiable"
                              className="radio-checkbox-style"
                            />
                          </div>
                        </div>
                        {/* Deposit */}
                        <div>
                          <div
                            className={`relative flex ${
                              props.touched.deposit && props.errors.deposit
                                ? "mb-1"
                                : "mb-12"
                            }`}
                          >
                            <Field
                              id="deposit"
                              name="deposit"
                              type="text"
                              placeholder="Deposit Amount*"
                              maxLength="10"
                              autoComplete="off"
                              className="remove-default-focus peer h-10 w-full border-b-2 border-b-teal-600 p-0 placeholder-transparent placeholder-shown:border-b-gray-400 "
                            />
                            <label
                              htmlFor="deposit"
                              className="absolute left-0 -top-3.5 text-xs text-teal-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-teal-600"
                            >
                              <span className="required-style flex items-center">
                                <span className="mr-0.5 fill-teal-600">
                                  {rupeeIcon}
                                </span>{" "}
                                Deposit Amount
                              </span>
                            </label>
                          </div>

                          {props.touched.deposit && props.errors.deposit && (
                            <div className="mb-12 flex items-center text-xs text-rose-600">
                              <span className="mr-1">{errorIcon}</span>
                              {props.errors.deposit}
                            </div>
                          )}
                        </div>
                        {/* Maintenance Included */}
                        {!props.values.maintenanceIncluded && (
                          <div>
                            <div
                              className={`relative flex ${
                                props.touched.maintenance &&
                                props.errors.maintenance
                                  ? "mb-1"
                                  : "mb-12"
                              }`}
                            >
                              <Field
                                id="maintenance"
                                name="maintenance"
                                type="text"
                                placeholder="Maintenance Amount*"
                                maxLength="10"
                                autoComplete="off"
                                className="remove-default-focus peer h-10 w-[85%] border-b-2 border-b-teal-600 p-0 placeholder-transparent placeholder-shown:border-b-gray-400 "
                              />
                              <label
                                htmlFor="maintenance"
                                className="absolute left-0 -top-3.5 text-xs text-teal-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-teal-600"
                              >
                                <span className="flex items-center">
                                  <span className="mr-0.5 fill-teal-600">
                                    {rupeeIcon}
                                  </span>{" "}
                                  Maintenance Amount
                                </span>
                              </label>
                              <span className="flex items-end text-sm">
                                /month
                              </span>
                            </div>

                            {props.touched.maintenance &&
                              props.errors.maintenance && (
                                <div className="mb-12 flex items-center text-xs text-rose-600">
                                  <span className="mr-1">{errorIcon}</span>
                                  {props.errors.maintenance}
                                </div>
                              )}
                          </div>
                        )}{" "}
                      </>
                    )}

                    {/* Sale Amount */}
                    {props.values.listingType === "sale" && (
                      <>
                        <div>
                          <div
                            className={`relative flex ${
                              props.touched.saleAmount &&
                              props.errors.saleAmount
                                ? "mb-1"
                                : "mb-1"
                            }`}
                          >
                            <Field
                              id="saleAmount"
                              name="saleAmount"
                              type="text"
                              placeholder="Sale Amount*"
                              maxLength="5"
                              autoComplete="off"
                              disabled={props.values.listingType === "rent"}
                              className="remove-default-focus peer h-10 w-[70%] border-b-2 border-b-teal-600 p-0 placeholder-transparent placeholder-shown:border-b-gray-400 "
                            />
                            <label
                              htmlFor="saleAmount"
                              className="absolute left-0 -top-3.5 text-xs text-teal-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-teal-600"
                            >
                              <span className="required-style flex items-center">
                                <span className="mr-0.5 fill-teal-600">
                                  {rupeeIcon}
                                </span>{" "}
                                Sale Amount
                              </span>
                            </label>
                            <Select
                              name="saleValue"
                              instanceId="saleValue"
                              options={currencyValueOptions}
                              styles={listingSelectStyles}
                              onChange={(o) => setSaleAmountValue(o.value)}
                              placeholder="Lakhs"
                              value={currencyValueOptions.filter((option) => {
                                return option.value === saleAmountValue;
                              })}
                              className={`border-b-2 text-sm ${
                                saleAmountValue
                                  ? "border-b-teal-600"
                                  : props.touched.saleAmount &&
                                    !props.errors.saleAmount
                                  ? "border-b-teal-600"
                                  : "border-b-gray-400"
                              }`}
                            />
                          </div>

                          {props.touched.saleAmount && props.errors.saleAmount && (
                            <div className="mb-1 flex items-center text-xs text-rose-600">
                              <span className="mr-1">{errorIcon}</span>
                              {props.errors.saleAmount}
                            </div>
                          )}
                        </div>
                        {/* Sale amount negotiable */}
                        <div className="mt-1 mb-12 flex items-center">
                          <div id="sale-negotiable-group">
                            <span className="text-sm font-medium">
                              Sale amount negotiable
                            </span>
                            :
                          </div>
                          <div
                            aria-labelledby="sale-negotiable-group"
                            className="ml-3 flex items-center"
                          >
                            <Field
                              type="checkbox"
                              name="saleNegotiable"
                              className="radio-checkbox-style"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence exitBeforeEnter>
                {activeStep === 2 && (
                  <motion.div
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <div
                      className={`w-full ${
                        facingDirection
                          ? "mb-1 border-b-2 border-b-teal-600"
                          : "mb-14 border-b-2 border-b-gray-400"
                      }`}
                    >
                      <span className="text-xs text-teal-600">
                        Towards which direction does your unit face?
                      </span>
                      <Select
                        name="facing"
                        instanceId="facing"
                        options={facingOptions}
                        styles={listingSelectStyles}
                        isSearchable={true}
                        placeholder="Select the facing direction"
                        onChange={(o) => setFacingDirection(o.value)}
                        value={facingOptions.filter((option) => {
                          return option.value === facingDirection;
                        })}
                        className="text-sm"
                      />
                    </div>
                    {facingDirection && (
                      <div
                        className="mb-14 cursor-pointer text-sm uppercase text-teal-600 underline underline-offset-2"
                        onClick={() => setFacingDirection(null)}
                      >
                        clear selection
                      </div>
                    )}

                    {/* Description */}
                    <div
                      className={`relative ${
                        props.touched.description && props.errors.description
                          ? "mb-1"
                          : "mb-1"
                      }`}
                    >
                      <Field
                        as="textarea"
                        id="description"
                        name="description"
                        placeholder="Describe your unit"
                        autoComplete="off"
                        spellCheck={true}
                        rows="5"
                        maxLength="2000"
                        autoComplete="off"
                        className="remove-default-focus-textarea peer w-full border-2 border-teal-600 placeholder-transparent placeholder-shown:border-gray-400"
                      />
                      <label
                        htmlFor="description"
                        className="absolute left-0 -top-5 pl-1 text-xs text-teal-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-teal-600"
                      >
                        Describe your unit
                      </label>
                    </div>

                    <div className="mb-12 inline-flex text-xs">
                      <span className="mr-1">{infoCircle}</span>
                      <span>Write a killer description for your unit</span>
                    </div>

                    {/* {props.touched.description && props.errors.description && (
                    <div className="mb-12 flex items-center text-xs text-rose-600">
                      <span className="mr-1">{errorIcon}</span>
                      {props.errors.description}
                    </div>
                  )} */}

                    {props.values.listingType === "rent" && (
                      <>
                        {/* Dedicated parking */}
                        <div className="mb-12 flex items-center">
                          <div id="parking-group">
                            <span className="text-base font-medium">
                              Parking available
                            </span>
                            :
                          </div>
                          <div
                            role="group"
                            aria-labelledby="parking-group"
                            className="ml-2 flex items-center"
                          >
                            <Field
                              type="checkbox"
                              name="parking"
                              className="radio-checkbox-style"
                            />
                          </div>
                        </div>

                        {/* Tenant Preferences */}
                        <div
                          className={`w-72 md:w-80 ${
                            tenantPreference
                              ? "mb-1 border-b-2 border-b-teal-600"
                              : "mb-12 border-b-2 border-b-gray-400"
                          }`}
                        >
                          <span className="text-xs text-teal-600">
                            Do you have any tenant preferences?
                          </span>
                          <Select
                            name="tenantPreference"
                            instanceId="tenantPreference"
                            options={tenantPreferenceOptions}
                            styles={listingSelectStyles}
                            isSearchable={true}
                            placeholder="Select the tenant preference"
                            onChange={(o) => setTenantPreference(o.value)}
                            value={tenantPreferenceOptions.filter((option) => {
                              return option.value === tenantPreference;
                            })}
                            className="text-sm"
                          />
                        </div>
                        {tenantPreference && (
                          <div
                            className="mb-12 cursor-pointer text-sm uppercase text-teal-600 underline underline-offset-2"
                            onClick={() => setTenantPreference(null)}
                          >
                            clear selection
                          </div>
                        )}

                        {/* Pets Allowed */}
                        <div className="mb-12 flex w-32 items-center justify-start lg:w-40">
                          <div id="pets-allowed">
                            <span className="text-base font-medium">
                              Pet friendly
                            </span>
                            :
                          </div>
                          <div
                            role="group"
                            aria-labelledby="pets-allowed"
                            className="ml-2 flex items-center"
                          >
                            <Field
                              type="checkbox"
                              name="pets"
                              className="radio-checkbox-style"
                            />
                          </div>
                        </div>

                        {/* Non vegetarians Allowed */}
                        <div className="mb-12 flex w-64 items-center justify-start ">
                          <div id="nonVeg-allowed">
                            <span className="text-base font-medium">
                              Non-vegetarians
                            </span>
                            :
                          </div>
                          <div
                            role="group"
                            aria-labelledby="nonVeg-allowed"
                            className="ml-2 flex items-center"
                          >
                            <Field
                              type="checkbox"
                              name="nonVeg"
                              className="radio-checkbox-style"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence exitBeforeEnter>
                {activeStep === 3 && (
                  <motion.div
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {/* Images Section Start */}
                    {imgList.length > 0 && (
                      <div className="mb-6">
                        <p className="mt-8 pb-4 text-sm text-teal-600">
                          Existing images:
                        </p>
                        <div className="grid grid-cols-4 gap-3">
                          {imgList.map((image, index) => {
                            return (
                              <div key={index}>
                                <img
                                  src={image.image_url}
                                  alt="Ad Image"
                                  width="90px"
                                />
                                <div
                                  onClick={() => {
                                    setImgList(
                                      imgList.filter((img) => img !== image)
                                    );
                                    deleteImageFromImageKit(image.ik_file_id);
                                  }}
                                  className="mt-1 flex cursor-pointer items-center justify-center text-xs"
                                >
                                  {trashIcon} Delete
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="mb-8">
                      <ImageUploader
                        files={files}
                        setFiles={setFiles}
                        imgList={imgList}
                      />
                    </div>

                    {/* Mobile */}
                    <div
                      className={`relative ${
                        props.touched.mobile && props.errors.mobile && "mb-1"
                      }`}
                    >
                      <Field
                        id="mobile"
                        name="mobile"
                        type="text"
                        placeholder="Your mobile number*"
                        maxLength="13"
                        autoComplete="off"
                        className="remove-default-focus peer h-10 w-full border-b-2 border-b-teal-600 p-0 placeholder-transparent placeholder-shown:border-b-gray-400"
                      />
                      <label
                        htmlFor="mobile"
                        className="absolute left-0 -top-3.5 text-xs text-teal-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-teal-600"
                      >
                        Your mobile number*
                      </label>
                    </div>

                    <div
                      className={`${
                        props.touched.mobile && props.errors.mobile
                          ? "mb-1"
                          : "mb-10"
                      } mt-1 inline-flex text-xxs`}
                    >
                      <span className="mr-1">{infoCircle}</span>
                      <span>
                        Your mobile number is visible to registered users only
                      </span>
                    </div>

                    {props.touched.mobile && props.errors.mobile && (
                      <div className="mb-10 flex items-center text-xs text-rose-600">
                        <span className="mr-1">{errorIcon}</span>
                        {props.errors.mobile}
                      </div>
                    )}

                    {/* Whatsapp */}
                    <div className="mt-5 mb-10 flex items-center">
                      <div
                        id="whatsapp-group"
                        className="flex items-center font-medium"
                      >
                        <span className="mr-1">Is this your</span>{" "}
                        <Image
                          src="/whatsapp-icon.svg"
                          alt="Whatsapp icon"
                          height={20}
                          width={20}
                        />{" "}
                        <span className="ml-1">number?</span>
                      </div>
                      <div
                        aria-labelledby="whatsapp-group"
                        className="ml-3 flex items-center"
                      >
                        <Field
                          type="checkbox"
                          name="whatsapp"
                          className="radio-checkbox-style"
                        />
                      </div>
                    </div>

                    <div className="w-2/3">
                      <span className="text-sm text-teal-600">
                        Preferred mode of contact
                      </span>

                      <div className="mt-3 mb-10 flex">
                        <div className="mr-5 flex items-center">
                          <div id="call-group">
                            <span className="text-base font-medium">Call</span>:
                          </div>
                          <div
                            role="group"
                            aria-labelledby="call-group"
                            className="ml-2 flex items-center"
                          >
                            <Field
                              type="checkbox"
                              name="call"
                              className="radio-checkbox-style"
                            />
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div id="text-group">
                            <span className="text-base font-medium">Text</span>:
                          </div>
                          <div
                            role="group"
                            aria-labelledby="text-group"
                            className="ml-2 flex items-center"
                          >
                            <Field
                              type="checkbox"
                              name="text"
                              className="radio-checkbox-style"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div
                className={`mb-5 grid w-full ${
                  activeStep === 0
                    ? "grid-cols-1 place-items-center"
                    : "grid-cols-2 place-items-center"
                }`}
              >
                {activeStep > 0 && (
                  <motion.button
                    variants={variants}
                    whileTap="tap"
                    type="button"
                    className={`h-12 w-28 rounded-full bg-rose-600 p-3 font-semibold text-white transition-colors duration-200 ease-in hover:bg-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-offset-2 ${
                      isLastStep && "-ml-5 md:ml-0"
                    }`}
                    //disabled={props.isSubmitting.toString()}
                    onClick={handleBack}
                  >
                    BACK
                  </motion.button>
                )}

                <motion.button
                  variants={variants}
                  whileTap="tap"
                  type="submit"
                  className={`h-12 ${
                    isLastStep ? "w-40" : "w-28"
                  } rounded-full bg-teal-600 p-3 font-semibold text-white transition-colors duration-200 ease-in hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2`}
                  //disabled={props.isSubmitting.toString()}
                >
                  {isLastStep ? (
                    !loading ? (
                      "UPDATE LISTING"
                    ) : (
                      <span className="flex justify-center">
                        PLEASE WAIT{" "}
                        <span className="ml-1 animate-spin">{loaderIcon}</span>
                      </span>
                    )
                  ) : (
                    "NEXT"
                  )}
                </motion.button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditListing;
