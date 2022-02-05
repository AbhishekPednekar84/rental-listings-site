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
    <div className="mb-20 pt-36 print:pt-0">
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

      <p className="mb-5 flex items-center justify-center print:hidden">
        <span className="hidden lg:mr-1 lg:block lg:font-semibold">
          This unit is located in
        </span>
        <span className="relative ml-1 inline-block p-1.5 text-lg font-semibold before:absolute before:-inset-1 before:block before:-skew-y-2 before:bg-rose-400">
          <span className="relative text-white">{apartmentName}</span>
        </span>
      </p>
      <div className="mx-3 bg-zinc-200 print:mx-1 md:mx-20">
        <div className="p-3 text-center">
          <p className="text-gray hidden bg-white px-3 pt-10 pb-3 print:block print:pt-3">
            <span className="rounded-md bg-lime-300 p-2 text-sm font-semibold">
              {apartmentName}
            </span>
          </p>
          <h1 className="mb-6 bg-white px-3 py-5 font-bold print:py-2">
            {adData.title}
          </h1>
          <p
            className={`bg-white ${
              adData.description.length < 25 ? "text-center" : "text-left"
            } px-3 py-5 text-gray-700 print:py-2 print:text-sm`}
          >
            {adData.description}
          </p>
        </div>

        <div className="p-3 text-center">
          <div className="flex flex-col items-center justify-center bg-white lg:flex-row lg:items-start lg:justify-evenly">
            <div className="block p-2 pt-5 print:max-w-xs lg:w-1/2 lg:p-5">
              {adData.images.length !== 0 ? (
                <>
                  <div
                    className={`cursor-pointer print:max-h-[${
                      adData.images[0].height / 4
                    }] print:max-w-[${adData.images[0].width / 4}]`}
                    onClick={() => openModal()}
                  >
                    <Image
                      src={adData.images[0].image_url}
                      alt="Apartment image"
                      placeholder="blur"
                      blurDataURL={adData.images[0].image_url + "/tr:bl-10"}
                      height={adData.images[0].height / 3}
                      width={adData.images[0].width / 3}
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
                />
              )}
            </div>
            <div className="mt-5 w-full px-2 print:mt-1 lg:w-1/2">
              <div className="mt-2 mb-7 text-center leading-8 print:text-center ">
                This unit is for{" "}
                <span className="rounded-md bg-teal-100 p-1 font-semibold">
                  {adData.listing_type.toUpperCase()}
                </span>{" "}
                <span>and is available </span>
                {availability === "immediately" ? (
                  <span className="font-semibold underline decoration-teal-600 decoration-2 underline-offset-4">
                    {availability}
                  </span>
                ) : (
                  <span>
                    from{" "}
                    <span className="font-semibold underline decoration-teal-600 decoration-2 underline-offset-4">
                      {availability}
                    </span>
                  </span>
                )}
              </div>
              <div className="flex justify-center">
                <div className="mb-7 grid grid-cols-2 place-items-start gap-8 print:grid-cols-3 lg:grid-cols-3">
                  <div className="text-left">
                    <span className="text-sm text-zinc-500">Bedrooms:</span>
                    <br />
                    <span className="font-semibold">{adData.bedrooms}</span>
                  </div>

                  <div className="text-left">
                    <span className="text-sm text-zinc-500">Bathrooms:</span>
                    <br />
                    <span className="font-semibold">
                      {adData.bathrooms ? adData.bathrooms : "Not specified"}
                    </span>
                  </div>

                  <div className="text-left">
                    <span className="text-sm text-zinc-500">Total Area:</span>
                    <br />
                    <span className="font-semibold">
                      {adData.total_area ? adData.total_area : "Not specified"}
                    </span>
                    <span className="ml-1 text-sm text-zinc-500">sq ft.</span>
                  </div>

                  <div className="text-left">
                    <span className="text-sm text-zinc-500">Floor:</span>
                    <br />
                    <span className="font-semibold">
                      {adData.floor ? adData.floor : "Not specified"}
                    </span>
                  </div>

                  <div className="flex items-center print:mb-2 lg:pt-5">
                    Parking{" "}
                    {adData.parking_available ? (
                      <span className="ml-1 text-teal-600">{checkIcon}</span>
                    ) : (
                      <span className="ml-1 text-rose-600">{cancelIcon}</span>
                    )}
                  </div>
                  <div className="flex items-center print:mb-2 lg:pt-5">
                    Pets Allowed{" "}
                    {adData.pets_allowed ? (
                      <span className="ml-1 text-teal-600">{checkIcon}</span>
                    ) : (
                      <span className="ml-1 text-rose-600">{cancelIcon}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* {adData.brokers_excuse && (
                <div className="flex items-center justify-start md:justify-center mb-7 print:my-2 print:justify-center">
                  Brokers Excuse
                  <span className="ml-1 text-teal-600">{checkIcon}</span>
                </div>
              )} */}
            </div>
          </div>

          <div className="mt-6 bg-white">
            <h3 className="px-3 pt-5 pb-3 font-semibold print:py-2 print:pt-1">
              Contact details
            </h3>
            <div className="flex justify-center print:block">
              <div className="grid grid-cols-1 place-items-start gap-5 px-5 pt-5 pb-10 print:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:place-items-center lg:gap-x-14">
                <div className="flex items-center">
                  <span className="text-sm text-zinc-500">Owner:</span>
                  &nbsp;
                  <span className="font-semibold">{username}</span>
                </div>

                <div>
                  <div className="flex items-center">
                    <span className="text-sm text-zinc-500">Contact:</span>
                    &nbsp;
                    <span className="flex items-center font-semibold">
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
                    <div className="pt-2 text-left text-xs text-zinc-500 print:hidden">
                      <Link href="/account/login">
                        <a className="text-teal-600 underline decoration-teal-600 decoration-2 underline-offset-4">
                          Login
                        </a>
                      </Link>{" "}
                      to view full number
                    </div>
                  )}
                </div>

                <div className="flex items-center">
                  <span className="text-sm text-zinc-500">Posted On:</span>
                  &nbsp;
                  <span className="font-semibold">
                    {new Date(adData.date_created).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* <div className="hidden print:flex print:justify-center print:items-center">
                <span className="text-sm text-zinc-500">Posted On:</span>&nbsp;
                <span className="font-semibold">
                  {new Date(adData.date_created).toLocaleDateString()}
                </span>
              </div> */}
            </div>
          </div>

          <div className="my-5 flex items-center justify-around print:hidden">
            <motion.button
              variants={variants}
              whileTap="tap"
              onClick={() => handleLinkCopy()}
              className="flex h-14 w-36 items-center justify-evenly rounded-full bg-cyan-600 p-2 font-semibold uppercase text-white transition-colors duration-200 ease-in-out hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 md:w-40"
            >
              Copy ad link {copyIcon}
            </motion.button>
            {!disablePrint.current && (
              <motion.button
                variants={variants}
                whileTap="tap"
                onClick={() => window.print()}
                className="flex h-14 w-36 items-center justify-evenly rounded-full bg-teal-600 p-2 font-semibold uppercase text-white transition-colors duration-200 ease-in-out hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 md:w-40"
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
