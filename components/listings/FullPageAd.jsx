import React, { useState, useEffect, useContext } from "react";
import AuthContext from "@/context/auth/authContext";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  checkIcon,
  cancelIcon,
  phoneIcon,
  copyIcon,
  printIcon,
} from "@/utils/icons";
import { toast } from "react-toastify";

// Component imports
import ImageModal from "./ImageModal";
import BackToListingsLink from "./BackToListingsLink";

const linkCopiedToast = () => {
  toast("Copied!", { draggablePercent: 60 });
};

const variants = {
  tap: { y: "2px" },
};

const FullPageAd = ({ adData, apartmentName, username, disablePrint }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);

  const authContext = useContext(AuthContext);
  const { getCurrentUser, user } = authContext;

  const splitDate = adData.available_from.split("-");

  const formattedDate = splitDate[1] + "/" + splitDate[2] + "/" + splitDate[0];

  const formattedDateIn =
    splitDate[2] + "/" + splitDate[1] + "/" + splitDate[0];

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("__ros__listing__token")
    )
      getCurrentUser();
  }, []);

  const availability =
    Date.parse(formattedDate) - Date.now() < 0
      ? "immediately"
      : formattedDateIn;

  const handleLinkCopy = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => linkCopiedToast());
  };

  return (
    <div className="print:pt-0 pt-36 mb-20">
      <BackToListingsLink apartmentName={apartmentName} />

      <div itemScope itemType="https://schema.org/Apartment">
        <meta itemProp="name" content={adData.title} />
        <meta itemProp="numberOfBedrooms" content={adData.bedrooms} />
        <meta itemProp="description" content={adData.description} />
        <meta itemProp="accommodationCategory" content={adData.listing_type} />
        {adData.listing_type === "rent" && (
          <div itemScope itemType="https://schema.org/RentAction">
            <div
              itemProp="landLord"
              itemScope
              itemType="https://schema.org/Person"
            >
              <meta itemProp="name" content={username} />
            </div>
          </div>
        )}
        <meta
          itemProp="numberOfBathroomsTotal"
          content={adData.bathrooms ? adData.bathrooms : "Not specified"}
        />
        <meta
          itemProp="floorLevel"
          content={adData.floor ? adData.floor : "Not specified"}
        />
        {adData.total_area && (
          <div
            itemProp="floorSize"
            itemScope
            itemType="https://schema.org/QuantitativeValue"
          >
            <meta itemProp="value" content={adData.total_area} />
            <meta itemProp="unitCode" content="FTK" />
          </div>
        )}
        <meta
          itemProp="url"
          content={`process.env.NEXT_PUBLIC_SITE_URL}/ad/${adData.id}`}
        />
      </div>

      <p className="flex justify-center items-center mb-5 print:hidden">
        <span className="hidden lg:mr-1 lg:block lg:font-semibold">
          This unit is located in
        </span>
        <span className="ml-1 font-semibold text-lg before:block before:absolute before:-inset-1 before:-skew-y-2 before:bg-rose-400 p-1.5 relative inline-block">
          <span className="text-white relative">{apartmentName}</span>
        </span>
      </p>
      <div className="bg-zinc-200 mx-3 md:mx-20 print:mx-1">
        <div className="p-3 text-center">
          <p className="hidden print:block bg-white pt-10 print:pt-3 px-3 pb-3 text-gray">
            <span className="bg-lime-300 p-2 rounded-md text-sm font-semibold">
              {apartmentName}
            </span>
          </p>
          <h1 className="bg-white px-3 font-bold py-5 print:py-2 mb-6">
            {adData.title}
          </h1>
          <p className="bg-white text-gray-700 px-3 py-5 print:text-sm print:py-2">
            {adData.description}
          </p>
        </div>

        <div className="p-3 text-center">
          <div className="bg-white flex flex-col lg:flex-row justify-center items-center lg:justify-evenly ">
            <div className="p-2 lg:p-5 print:max-w-xs block w-[300px] md:w-[500px]">
              {adData.images.length !== 0 ? (
                <>
                  <div className="cursor-pointer" onClick={() => openModal()}>
                    <Image
                      src={adData.images[0].image_url}
                      alt="Apartment image"
                      placeholder="blur"
                      blurDataURL={adData.images[0].image_url + "/tr:bl-10"}
                      height={adData.images[0].height / 2}
                      width={adData.images[0].width / 2}
                    />
                  </div>
                  <p className="pt-2 text-sm print:hidden">
                    Click on the image to view the gallery
                  </p>
                </>
              ) : (
                <Image
                  src="https://ik.imagekit.io/ykidmzssaww/Listings/site-images/default-listing_nJ1h_cG5N.jpg?updatedAt=1640766058193"
                  alt="thumbnail"
                  height={250}
                  width={350}
                  className="rounded-lg"
                />
              )}
            </div>
            <div className="px-5 lg:px-10 lg:px-2 mt-5 print:mt-1">
              <div className="mt-2 mb-7 text-left lg:text-center">
                This unit is for{" "}
                <span className="bg-teal-100 p-1 rounded-md font-semibold">
                  {adData.listing_type.toUpperCase()}
                </span>{" "}
                {adData.listing_type === "rent" && (
                  <span>and is available </span>
                )}
                {adData.listing_type === "rent" ? (
                  availability === "immediately" ? (
                    <span className="underline underline-offset-4 decoration-2 decoration-teal-600 font-semibold">
                      {availability}
                    </span>
                  ) : (
                    <span>
                      from{" "}
                      <span className="underline underline-offset-4 decoration-2 decoration-teal-600 font-semibold">
                        {availability}
                      </span>
                    </span>
                  )
                ) : null}
              </div>
              <div className="grid grid-cols-2 print:grid-cols-4 gap-6 print:gap-4 place-items-start print:place-items-center mb-7">
                <div className="text-left">
                  <span className="text-sm text-zinc-500">Bedrooms:</span>{" "}
                  <br />
                  <span className="font-semibold">{adData.bedrooms}</span>
                </div>
                {adData.bathrooms && (
                  <div className="text-left">
                    <span className="text-sm text-zinc-500">Bathrooms:</span>{" "}
                    <br />
                    <span className="font-semibold">{adData.bathrooms}</span>
                  </div>
                )}
                {adData.total_area && (
                  <div className="text-left">
                    <span className="text-sm text-zinc-500">Total Area:</span>{" "}
                    <br />
                    <span className="font-semibold">{adData.total_area}</span>
                    <span className="ml-1 text-zinc-500 text-sm">sq ft.</span>
                  </div>
                )}
                {adData.floor && (
                  <div className="text-left">
                    <span className="text-sm text-zinc-500">Floor:</span> <br />
                    <span className="font-semibold">{adData.floor}</span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 print:grid-cols-2 print:place-items-center">
                <div className="flex items-center mb-7 print:mb-2">
                  Parking Availability{" "}
                  {adData.parking_available ? (
                    <span className="ml-1 text-teal-600">{checkIcon}</span>
                  ) : (
                    <span className="ml-1 text-rose-600">{cancelIcon}</span>
                  )}
                </div>
                <div className="flex items-center mb-7 print:mb-2">
                  Pet Friendly{" "}
                  {adData.pets_allowed ? (
                    <span className="ml-1 text-teal-600">{checkIcon}</span>
                  ) : (
                    <span className="ml-1 text-rose-600">{cancelIcon}</span>
                  )}
                </div>
              </div>
              {adData.brokers_excuse && (
                <div className="flex items-center mb-7 print:my-2 print:justify-center">
                  Brokers Excuse
                  <span className="ml-1 text-teal-600">{checkIcon}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 bg-white">
            <h3 className="pt-5 print:pt-1 px-3 pb-3 print:py-2 font-semibold">
              Contact details
            </h3>
            <div className="pt-5 pb-10 print:py-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-2 print:gap-2 gap-5 place-items-start lg:place-items-center px-5 lg:px-10">
              <div className="flex items-center">
                <span className="text-sm text-zinc-500">Owner:</span>
                &nbsp;
                <span className="font-semibold">{username}</span>
              </div>

              <div>
                <div className="flex items-center">
                  <span className="text-sm text-zinc-500">Contact:</span>&nbsp;
                  <span className="font-semibold flex items-center">
                    {user && user
                      ? adData.mobile_number
                      : adData.mobile_number.slice(0, 4) + "XXXXXXX"}{" "}
                    ({phoneIcon}
                    {adData.whatsapp_number && (
                      <span className="ml-1">
                        <Image
                          src="/whatsapp-icon.svg"
                          alt="Whatsapp icon"
                          height={15}
                          width={15}
                        />
                      </span>
                    )}
                    )
                  </span>
                </div>
                {!user && (
                  <div className="text-xs text-zinc-500 text-left pt-2 print:hidden">
                    <Link href="/account/login">
                      <a className="underline decoration-2 underline-offset-4 decoration-teal-600 text-teal-600">
                        Login
                      </a>
                    </Link>{" "}
                    to view full number
                  </div>
                )}
              </div>

              <div className="flex items-center print:mt-5 print:hidden">
                <span className="text-sm text-zinc-500">Posted On:</span>&nbsp;
                <span className="font-semibold">
                  {new Date(adData.date_created).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="hidden print:flex print:justify-center print:items-center">
              <span className="text-sm text-zinc-500">Posted On:</span>&nbsp;
              <span className="font-semibold">
                {new Date(adData.date_created).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex justify-around items-center my-5 print:hidden">
            <motion.button
              variants={variants}
              whileTap="tap"
              onClick={() => handleLinkCopy()}
              className="w-36 md:w-40 h-14 bg-cyan-600 p-2 text-white uppercase font-semibold rounded-full focus:outline-none hover:bg-cyan-800 focus:ring-2 focus:ring-offset-2 focus:ring-cyan-600 transition-colors duration-200 ease-in-out flex justify-evenly items-center"
            >
              Copy ad link {copyIcon}
            </motion.button>
            {!disablePrint.current && (
              <motion.button
                variants={variants}
                whileTap="tap"
                onClick={() => window.print()}
                className="w-36 md:w-40 h-14 bg-teal-600 p-2 text-white uppercase font-semibold rounded-full focus:outline-none hover:bg-teal-800 focus:ring-2 focus:ring-offset-2 focus:ring-teal-600 transition-colors duration-200 ease-in-out flex justify-evenly items-center"
              >
                Print ad {printIcon}
              </motion.button>
            )}
          </div>
        </div>
      </div>
      <AnimatePresence exitBeforeEnter>
        {modalOpen && (
          <ImageModal handleClose={closeModal} images={adData.images} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FullPageAd;
