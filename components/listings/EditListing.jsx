import React, { useEffect, useContext, useState } from "react";
import AuthContext from "@/context/auth/authContext";
import SiteContext from "@/context/site/siteContext";
import { Formik, Form, Field } from "formik";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import { loaderIcon, trashIcon, errorIcon } from "@/utils/icons";
import { sessionExpiredToast } from "@/utils/toasts";
import { motion } from "framer-motion";

// Component import
import ImageUploader from "@/components/listings/ImageUploader";

const variants = {
  tap: {
    y: "2px",
  },
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required").trim(),
  listingType: Yup.string().required(
    "Please specify if the unit is for rent or sale"
  ),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Please include at least 10 characters")
    .max(2000, "Cannot exceed 2000 characters"),
  bedrooms: Yup.string()
    .required("Required")
    .matches(/^[0-9]+$/, "Numbers only")
    .trim(),
  bathrooms: Yup.string().matches(/^[0-9]+$/, "Numbers only"),
  totalArea: Yup.string().matches(/^[0-9]+$/, "Numbers only"),
  floor: Yup.string().matches(/^[0-9]+$/, "Numbers only"),
  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(/^[0-9]+$/, "Numbers only")
    .min(10, "At least 10 digits"),
});

const infoCircle = (
  <svg
    className="w-4 h-4"
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

  const [files, setFiles] = useState([]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-slate-100 to-neutral-200 flex justify-center items-center">
      <div className="bg-white overflow-hidden shadow-xl mt-32 mb-20 mx-5">
        <div className="relative h-52 lg:h-64 bg-editListingHero bg-cover bg-center lg:bg-center">
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
        <div className="px-2 lg:px-10 pt-8 bg-white">
          <h1 className="font-bold mb-10 text-center leading-normal">
            <span className="heading-underline">Up</span>
            date your listing
          </h1>
        </div>

        <Formik
          initialValues={{
            availableFrom: startDate,
            title: listingInfo.title,
            listingType: listingInfo.listing_type,
            bedrooms: listingInfo.bedrooms,
            bathrooms: listingInfo.bathrooms,
            parking: listingInfo.parking_available,
            pets: listingInfo.pets_allowed,
            totalArea: listingInfo.total_area,
            floor: listingInfo.floor,
            description: listingInfo.description,
            mobile: listingInfo.mobile_number,
            whatsapp: listingInfo.whatsapp_number,
            excuse: listingInfo.brokers_excuse,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            setLoading();

            updateListing(
              listingId,
              values.title,
              values.listingType,
              availableFromDate,
              values.bedrooms,
              values.bathrooms,
              values.parking,
              values.pets,
              values.totalArea,
              values.floor,
              values.description,
              values.mobile,
              values.whatsapp,
              values.excuse,
              files
            );
          }}
        >
          {(props) => (
            <Form autoComplete="off">
              <p className="mb-16 text-center text-lg">
                This ad is posted in{" "}
                <span className="font-semibold underline underline-offset-4 decoration-teal-600 decoration-2">
                  {selectedApartmentInfo}
                </span>
              </p>
              {/* <div className="flex flex-col items-center justify-center">
                <div
                  className={`w-80 ${
                    selectedValue
                      ? "border-b-2 border-b-teal-600 mb-14"
                      : apartmentSelected
                      ? "border-b-2 border-b-red-600 mb-1"
                      : "border-b-2 border-b-gray-400 mb-14"
                  }`}
                >
                  <Select
                    name="apartmentSelect"
                    instanceId="apartmentSelect"
                    options={options}
                    isSearchable={true}
                    styles={listingSelectStyles}
                    placeholder="Enter the apartment name..."
                    className="text-sm"
                    value={{
                      value: selectedApartmentId,
                      label:
                        selectedApartmentInfo.name +
                        " - " +
                        selectedApartmentInfo.address1 +
                        " - " +
                        selectedApartmentInfo.city,
                    }}
                    onChange={(o) => setSelectedValue(o.value)}
                  />
                </div>
                {!selectedValue && apartmentSelected && (
                  <div className="mb-6 text-xs text-rose-600 w-80 flex justify-start items-start">
                    <span className="mr-1">{errorIcon}</span>
                    Please select an apartment
                  </div>
                )}
              </div> */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 px-4 md:px-5 lg:px-10">
                {/* Column1 */}
                <div className="grid grid-cols-1 md:pr-10 md:border-r-2 md:border-teal-100">
                  {/* Title */}
                  <div
                    className={`relative ${
                      props.touched.title && props.errors.title
                        ? "mb-1"
                        : "mb-6"
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
                      className="remove-default-focus peer border-b-2 placeholder-shown:border-b-gray-400 border-b-teal-600 h-10 w-full p-0 placeholder-transparent"
                    />
                    <label
                      htmlFor="title"
                      className="absolute left-0 -top-3.5 text-teal-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-teal-600 peer-focus:text-xs"
                    >
                      Title*
                    </label>
                  </div>

                  {props.touched.title && props.errors.title && (
                    <div className="mb-6 text-xs text-rose-600 flex items-center">
                      <span className="mr-1">{errorIcon}</span>
                      {props.errors.title}
                    </div>
                  )}

                  {/* Listing Type */}
                  <div
                    className={`flex mt-2 ${
                      props.touched.listingType && props.errors.listingType
                        ? "mb-1"
                        : "mb-6"
                    }`}
                  >
                    <div id="listingType-radio-group" className="mr-4">
                      <span className="font-medium after:content-['*'] after:ml-0.5 after:text-rose-600">
                        Type of listing
                      </span>
                      :
                    </div>

                    <div
                      role="group"
                      aria-labelledby="listingType-radio-group"
                      className="flex"
                    >
                      <label className="flex items-center mr-4">
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
                    <div className="mb-6 text-xs text-rose-600 flex items-center">
                      <span className="mr-1">{errorIcon}</span>
                      {props.errors.listingType}
                    </div>
                  )}

                  <div className="mt-2 mb-6 flex items-center">
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
                      className="remove-default-focus w-28 border-b-2 border-b-gray-400 text-center text-base cursor-pointer focus:outline-none"
                      aria-label="Pick the date from when the item will be available"
                      aria-labelledby="date-picker"
                    />
                  </div>

                  <div className="mt-2 flex justify-between">
                    {/* Bedrooms */}
                    <div>
                      <div
                        className={`relative ${
                          props.touched.bedrooms && props.errors.bedrooms
                            ? "mb-1"
                            : "mb-6"
                        }`}
                      >
                        <Field
                          id="bedrooms"
                          name="bedrooms"
                          type="text"
                          placeholder="Number of bedrooms*"
                          maxLength="2"
                          autoComplete="off"
                          className="remove-default-focus peer border-b-2 placeholder-shown:border-b-gray-400 border-b-teal-600 h-10 w-32 lg:w-40 p-0 placeholder-transparent"
                        />
                        <label
                          htmlFor="bedrooms"
                          className="absolute left-0 -top-3.5 text-teal-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-teal-600 peer-focus:text-xs"
                        >
                          Bedrooms*
                        </label>
                      </div>

                      {props.touched.bedrooms && props.errors.bedrooms && (
                        <div className="mb-6 text-xs text-rose-600 flex items-center">
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
                            : "mb-6"
                        }`}
                      >
                        <Field
                          id="bathrooms"
                          name="bathrooms"
                          type="text"
                          placeholder="Number of Bathrooms"
                          maxLength="2"
                          autoComplete="off"
                          className="remove-default-focus peer border-b-2 placeholder-shown:border-b-gray-400 border-b-teal-600 h-10 w-32 lg:w-40 p-0 placeholder-transparent"
                        />
                        <label
                          htmlFor="bathrooms"
                          className="absolute left-0 -top-3.5 text-teal-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-teal-600 peer-focus:text-xs"
                        >
                          Bathrooms
                        </label>
                      </div>

                      {props.touched.bathrooms && props.errors.bathrooms && (
                        <div className="mb-6 text-xs text-rose-600 flex items-center">
                          <span className="mr-1">{errorIcon}</span>
                          {props.errors.bathrooms}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    {/* Dedicated parking */}
                    <div className="mt-3 mb-6 flex items-center">
                      <div id="parking-group">
                        <span className="font-medium text-sm lg:text-base">
                          Parking available
                        </span>
                        :
                      </div>
                      <div
                        role="group"
                        aria-labelledby="parking-group"
                        className="flex items-center ml-2"
                      >
                        <Field
                          type="checkbox"
                          name="parking"
                          className="radio-checkbox-style"
                        />
                      </div>
                    </div>

                    {/* Pets Allowed */}
                    <div className="mt-3 mb-6 flex items-center w-32 lg:w-40">
                      <div id="pets-allowed">
                        <span className="font-medium text-sm lg:text-base">
                          Pet Friendly
                        </span>
                        :
                      </div>
                      <div
                        role="group"
                        aria-labelledby="pets-allowed"
                        className="flex items-center ml-2"
                      >
                        <Field
                          type="checkbox"
                          name="pets"
                          className="radio-checkbox-style"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-2 mb-6">
                    {/* Total Area */}
                    <div>
                      <div
                        className={`relative ${
                          props.touched.totalArea && props.errors.totalArea
                            ? "mb-1"
                            : "mb-6"
                        }`}
                      >
                        <Field
                          id="totalArea"
                          name="totalArea"
                          type="text"
                          placeholder="Area (sq ft.)*"
                          maxLength="5"
                          autoComplete="off"
                          className="remove-default-focus peer border-b-2 placeholder-shown:border-b-gray-400 border-b-teal-600 h-10 w-32 lg:w-40 p-0 placeholder-transparent"
                        />
                        <label
                          htmlFor="totalArea"
                          className="absolute left-0 -top-3.5 text-teal-600 text-xs peer-placeholder-shown:text-xs peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-teal-600 peer-focus:text-xs"
                        >
                          Total Area (Sq ft.)
                        </label>
                      </div>

                      {props.touched.totalArea && props.errors.totalArea && (
                        <div className="mb-6 text-xs text-rose-600 flex items-center">
                          <span className="mr-1">{errorIcon}</span>
                          {props.errors.totalArea}
                        </div>
                      )}
                    </div>

                    {/* Floor */}
                    <div>
                      <div
                        className={`relative ${
                          props.touched.floor && props.errors.floor
                            ? "mb-1"
                            : "mb-6"
                        }`}
                      >
                        <Field
                          id="floor"
                          name="floor"
                          type="text"
                          placeholder="Floor on which the unit is located"
                          maxLength="3"
                          autoComplete="off"
                          className="remove-default-focus peer border-b-2 placeholder-shown:border-b-gray-400 border-b-teal-600 h-10 w-32 lg:w-40 p-0 placeholder-transparent"
                        />
                        <label
                          htmlFor="floor"
                          className="absolute left-0 -top-3.5 text-teal-600 text-xs peer-placeholder-shown:text-xs peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-teal-600 peer-focus:text-xs"
                        >
                          On which floor is the unit?
                        </label>
                      </div>

                      {props.touched.floor && props.errors.floor && (
                        <div className="mb-6 text-xs text-rose-600 flex items-center">
                          <span className="mr-1">{errorIcon}</span>
                          {props.errors.floor}
                        </div>
                      )}
                    </div>
                  </div>

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
                      placeholder="Description*"
                      autoComplete="off"
                      spellCheck={true}
                      rows="7"
                      maxLength="2000"
                      autoComplete="off"
                      className="remove-default-focus-textarea peer border-2 placeholder-shown:border-gray-400 border-teal-600 w-full p-1 placeholder-transparent"
                    />
                    <label
                      htmlFor="description"
                      className="absolute left-0 -top-5 text-teal-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-teal-600 peer-focus:text-xs"
                    >
                      Describe your unit*
                    </label>
                  </div>

                  <div className="mb-2 text-xxs inline-flex">
                    <span className="mr-1">{infoCircle}</span>
                    <span>
                      Mention tenant preferences - family, bachelors,
                      vegetarians etc..
                    </span>
                  </div>

                  {props.touched.description && props.errors.description && (
                    <div className="mb-6 text-xs text-rose-600 flex items-center">
                      <span className="mr-1">{errorIcon}</span>
                      {props.errors.description}
                    </div>
                  )}
                </div>

                {/* Column 2 */}
                <div>
                  {/* Mobile */}
                  <div
                    className={`relative mt-3 lg:mt-0 ${
                      props.touched.mobile && props.errors.mobile
                        ? "mb-1"
                        : "mb-1"
                    }`}
                  >
                    <Field
                      id="mobile"
                      name="mobile"
                      type="text"
                      placeholder="Your mobile number*"
                      maxLength="13"
                      autoComplete="off"
                      className="remove-default-focus peer border-b-2 placeholder-shown:border-b-gray-400 border-b-teal-600 h-10 w-full p-0 placeholder-transparent"
                    />
                    <label
                      htmlFor="mobile"
                      className="absolute left-0 -top-3.5 text-teal-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-teal-600 peer-focus:text-xs"
                    >
                      Your mobile number*
                    </label>
                  </div>

                  <div className="mb-2 text-xxs inline-flex">
                    <span className="mr-1">{infoCircle}</span>
                    <span>
                      Your mobile number is visible to registered users only
                    </span>
                  </div>

                  {props.touched.mobile && props.errors.mobile && (
                    <div className="mb-6 text-xs text-rose-600 flex items-center">
                      <span className="mr-1">{errorIcon}</span>
                      {props.errors.mobile}
                    </div>
                  )}

                  {/* Whatsapp */}
                  <div className="mt-5 mb-6 flex items-center">
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
                      className="flex items-center ml-3"
                    >
                      <Field
                        type="checkbox"
                        name="whatsapp"
                        className="radio-checkbox-style"
                      />
                    </div>
                  </div>

                  {/* brokersExcuse */}
                  <div className="mt-8 flex items-center">
                    <div id="brokersExcuse-group">
                      <span className="font-medium">Brokers Excuse</span>:
                    </div>
                    <div
                      aria-labelledby="brokersExcuse-group"
                      className="flex items-center ml-3"
                    >
                      <Field
                        type="checkbox"
                        name="excuse"
                        className="radio-checkbox-style"
                      />
                    </div>
                  </div>

                  {/* Images Section Start */}
                  {imgList.length > 0 && (
                    <div>
                      <p className="mt-8 pb-4">Existing images:</p>
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
                                className="mt-1 cursor-pointer flex justify-center items-center text-xs"
                              >
                                {trashIcon} Delete
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <ImageUploader
                    files={files}
                    setFiles={setFiles}
                    imgList={imgList}
                  />
                  {/* Images Section End */}
                </div>
              </div>
              <div className="my-10 flex justify-center">
                <motion.button
                  variants={variants}
                  whileTap="tap"
                  type="submit"
                  className="p-3 w-40 h-12 bg-teal-600 text-white font-semibold rounded-full focus:outline-none hover:bg-teal-800 focus:ring-2 focus:ring-offset-2 focus:ring-teal-600 transition-colors duration-200 ease-in"
                >
                  {props.isSubmitting ? (
                    <span className="flex justify-center items-center">
                      PLEASE WAIT
                      <span className="animate-spin ml-1">{loaderIcon}</span>
                    </span>
                  ) : (
                    "UPDATE LISTING"
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
