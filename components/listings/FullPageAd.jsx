import React, { useState, useEffect, useContext } from "react";
import AuthContext from "@/context/auth/authContext";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  EmailShareButton,
  EmailIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import {
  checkIcon,
  cancelIcon,
  phoneIcon,
  copyIcon,
  printIcon,
  chatIcon,
  bedroomIcon,
  bathroomIcon,
  areaIcon,
  floorIcon,
  parkingIcon,
  directionIcon,
  rupeeIcon,
} from "@/utils/icons";
import { toast } from "react-toastify";

// Component imports
import ImageModal from "./ImageModal";
import BackToListingsLink from "./BackToListingsLink";
import Tags from "./Tags";

const linkCopiedToast = () => {
  toast("Copied!", { draggablePercent: 60 });
};

const variants = {
  tap: { y: "2px" },
};

const FullPageAd = ({
  adData,
  apartmentName,
  username,
  disablePrint,
  mobileBrowser,
}) => {
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

  const formatCurrency = (amount) => {
    if (amount % 1 === 0) {
      return new Intl.NumberFormat("en-IN").format(Math.trunc(amount));
    } else {
      return new Intl.NumberFormat("en-IN").format(amount);
    }
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
        <meta itemProp="petsAllowed" content={adData.pets_allowed} />
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

      {/* <p className="mb-10 flex items-center justify-center  print:hidden">
        <span className="hidden lg:mr-1 lg:block lg:font-semibold">
          This unit is located in
        </span>
        <span className="relative ml-1 inline-block p-1.5 text-base font-semibold before:absolute before:-inset-1 before:block before:-skew-y-2 before:bg-rose-400 md:text-lg">
          <span className="relative text-white">{apartmentName}</span>
        </span>
      </p> */}

      <p className="mb-6 flex items-center justify-center text-2xl font-bold text-gray-800 print:hidden">
        {apartmentName}
      </p>

      <div className="flex justify-center">
        <div className="mx-3 bg-zinc-200 print:mx-1 md:mx-20 md:w-[800px] lg:w-[1000px]">
          <div className="relative overflow-hidden p-3 text-center">
            <div
              className={`absolute top-6 -left-12 w-40 -rotate-45 transform tracking-wide md:-left-10 ${
                adData.listing_type === "rent" ? "bg-amber-600" : "bg-red-600"
              } px-2 py-1 text-sm font-semibold text-white md:text-base`}
            >
              {adData.listing_type.toUpperCase()}
            </div>
            <p className="text-gray hidden bg-white px-3 pt-10 pb-3 print:block print:pt-3">
              <span className="rounded-md bg-lime-300 p-2 text-sm font-semibold">
                {apartmentName}
              </span>
            </p>
            <div className="mb-6 bg-white">
              <h1 className="m-0 px-3 pt-7 pb-5 font-bold print:py-2 lg:py-5">
                {adData.title}
              </h1>
              <div className="mb-5 flex items-center justify-center text-zinc-600">
                <span className="text-sm">
                  Posted by <span className="font-semibold">{username}</span> on{" "}
                  <span className="font-semibold">
                    {new Date(adData.date_created).toLocaleDateString()}
                  </span>
                </span>
              </div>
              <div className="mx-2 flex items-center justify-center pb-3 print:hidden">
                <p className="mr-2 text-sm text-zinc-600">
                  Share this listing:
                </p>
                <p className="flex items-center justify-center gap-5 lg:mx-0 lg:justify-end">
                  <WhatsappShareButton
                    url={typeof window !== "undefined" && window.location.href}
                    title={`Check out this apartment listing from ${apartmentName}`}
                    separator=" - "
                  >
                    <WhatsappIcon size={32} borderRadius={10} />
                  </WhatsappShareButton>
                  <TelegramShareButton
                    url={typeof window !== "undefined" && window.location.href}
                    title={`Check out this apartment listing from ${apartmentName}`}
                  >
                    <TelegramIcon size={32} borderRadius={10} />
                  </TelegramShareButton>
                  <EmailShareButton
                    url={typeof window !== "undefined" && window.location.href}
                    subject={`Check out this apartment listing from ${apartmentName}`}
                    body="Link"
                    separator=" - "
                  >
                    <EmailIcon size={32} borderRadius={10} />
                  </EmailShareButton>
                </p>
              </div>
            </div>
            <div
              className={`bg-white ${
                adData.description && adData.description.length > 100
                  ? "tet-left"
                  : "text-center"
              } px-3 py-5 text-gray-700 print:py-2 print:text-sm`}
            >
              {adData.description && (
                <p className="mb-5">{adData.description}</p>
              )}

              {adData.listing_type === "rent" && (
                <div className="w-full">
                  <Tags
                    tenantPreference={adData.tenant_preference}
                    petsAllowed={adData.pets_allowed}
                    nonVegetarians={adData.nv_allowed}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="p-3 text-center">
            <div className="flex flex-col items-center justify-center bg-white lg:flex-row lg:items-start lg:justify-evenly">
              <div className="block w-full p-2 pt-5 print:hidden lg:h-full lg:w-1/2 lg:py-5 lg:px-2">
                {adData.images.length !== 0 ? (
                  <>
                    {/* <div
                      className={`cursor-pointer print:max-h-[${
                        adData.images[0].height / 4
                      }] print:max-w-[${adData.images[0].width / 4}]`}
                      onClick={() => openModal()}
                    > */}
                    <div
                      className="cursor-pointer overflow-hidden bg-zinc-100 p-0"
                      onClick={() => openModal()}
                    >
                      <Image
                        src={adData.images[0].image_url}
                        alt="Apartment image"
                        layout="responsive"
                        height={400}
                        width={500}
                        placeholder="blur"
                        blurDataURL={adData.images[0].image_url + "/tr:bl-10"}
                        objectFit="contain"
                        objectPosition="center"
                        className="transition hover:scale-105"
                        //height={adData.images[0].height / 3}
                        //width={adData.images[0].width / 3}
                      />
                    </div>
                    <p className="pt-2 text-sm print:hidden">
                      Click on the image to view the gallery
                    </p>
                  </>
                ) : (
                  <div className="relative m-4 mt-5 h-[400px] overflow-hidden">
                    <Image
                      src="https://ik.imagekit.io/ykidmzssaww/Listings/site-images/default-listing_nJ1h_cG5N.jpg?updatedAt=1640766058193"
                      alt="thumbnail"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}
              </div>
              <div className="mt-5 w-full print:mt-1 lg:w-1/2">
                <div className="mx-2 mt-2 mb-7 text-center leading-8 print:mb-3 print:text-center">
                  This unit is for{" "}
                  <span className="font-semibold">
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
                  {adData.listing_type === "rent" && (
                    <div
                      className={`mx-1 mb-10 grid gap-5 print:my-5 print:gap-2 lg:gap-7 ${
                        adData.maintenance_in_rent &&
                        "grid-cols-1 print:grid-cols-2 print:place-items-center lg:place-items-center"
                      } ${
                        !adData.maintenance_in_rent &&
                        "grid-cols-1 print:place-items-center lg:place-items-center"
                      } ${
                        adData.maintenance
                          ? "print:grid-cols-3"
                          : "print:grid-cols-2"
                      }`}
                    >
                      <div className="w-56 rounded-sm bg-gradient-to-b from-emerald-100 to-emerald-200 py-3 px-1 text-center shadow-md print:h-24 print:w-52 md:w-60">
                        <h5 className="mb-2 text-sm print:text-lg md:text-base">
                          Rent {adData.rent_negotiable && "(negotiable)"}
                        </h5>
                        <p className="flex items-center justify-center text-xl font-bold">
                          <span className="mr-0.5 fill-black">{rupeeIcon}</span>
                          {formatCurrency(adData.rent)}
                        </p>
                      </div>

                      <div className="w-56 bg-gradient-to-r from-emerald-200 to-emerald-100 py-3 px-1 text-center shadow-md print:h-24 print:w-52 md:w-60">
                        <h5 className="mb-2 text-sm print:text-lg md:text-base">
                          Deposit
                        </h5>
                        <p className="flex items-center justify-center text-xl font-bold">
                          <span className="mr-0.5 fill-black">{rupeeIcon}</span>
                          {formatCurrency(adData.deposit)}
                        </p>
                      </div>

                      {!adData.maintenance_in_rent && adData.maintenance > 0 && (
                        <div className="w-56 bg-gradient-to-r from-emerald-100 to-emerald-200 py-3 px-1 text-center shadow-md print:h-24 print:w-52 md:w-60">
                          <h5 className="mb-2 text-sm print:text-lg md:text-base">
                            Maintenance
                          </h5>
                          <p className="flex items-center justify-center text-xl font-bold">
                            <span className="mr-0.5 fill-black">
                              {rupeeIcon}
                            </span>
                            {formatCurrency(adData.maintenance)}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {adData.listing_type === "sale" && (
                  <div className="mx-3 mb-10 grid place-items-center print:mb-5 lg:h-[250px]">
                    <div className="flex h-36 w-72 flex-col items-center justify-center rounded-sm bg-gradient-to-r from-yellow-100 to-yellow-200 shadow-md print:h-24 print:w-52">
                      <h5 className="mb-2 text-sm print:text-lg md:text-base">
                        Quoted amount {adData.sale_negotiable && "(negotiable)"}
                      </h5>
                      <p className="pt-2 text-xl font-bold">
                        ₹{" "}
                        {formatCurrency(adData.sale) +
                          " " +
                          adData.sale_amount_unit}
                      </p>
                    </div>
                  </div>
                )}

                {/* {adData.brokers_excuse && (
                <div className="flex items-center justify-start md:justify-center mb-7 print:my-2 print:justify-center">
                  Brokers Excuse
                  <span className="ml-1 text-teal-600">{checkIcon}</span>
                </div>
              )} */}
              </div>
            </div>

            <div className="my-6 bg-white">
              <h3 className="px-3 pt-5 font-semibold print:py-2 print:pt-1">
                Listing details
              </h3>
              <div className="flex justify-center px-2">
                <div className="my-10 grid grid-cols-2 place-items-start gap-8 print:m-5 print:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-16">
                  <div className="text-left">
                    <span className="flex items-center text-sm text-zinc-500 md:text-base">
                      {bedroomIcon}&nbsp;Bedrooms:
                    </span>
                    <span className="font-semibold md:text-lg">
                      {adData.bedrooms}
                    </span>
                  </div>

                  <div className="text-left">
                    <span className="flex items-center text-sm text-zinc-500 md:text-base">
                      {bathroomIcon}&nbsp;Bathrooms:
                    </span>

                    <span className="font-semibold md:text-lg">
                      {adData.bathrooms ? adData.bathrooms : "Not specified"}
                    </span>
                  </div>

                  <div className="text-left">
                    <span className="flex items-center text-sm text-zinc-500 md:text-base">
                      {floorIcon}&nbsp;Floor:
                    </span>
                    <span className="font-semibold md:text-lg">
                      {adData.floors + " / " + adData.total_floors}
                    </span>
                  </div>

                  <div className="text-left">
                    <span className="flex items-center text-sm text-zinc-500 md:text-base">
                      {areaIcon}&nbsp;Total Area:
                    </span>
                    <span className="font-semibold md:text-lg">
                      {adData.total_area ? adData.total_area : "Not specified"}
                    </span>
                    <span className="ml-1 text-sm text-zinc-500 md:text-base">
                      sq ft.
                    </span>
                  </div>

                  <div className="flex items-center print:mb-2 lg:pt-5">
                    {parkingIcon}&nbsp;Parking:{" "}
                    {adData.parking_available ? (
                      <span className="ml-1 text-teal-600">{checkIcon}</span>
                    ) : (
                      <span className="ml-1 stroke-2 text-rose-600">
                        {cancelIcon}
                      </span>
                    )}
                  </div>
                  <div className="text-left">
                    <span className="inline-flex items-center text-sm text-zinc-500 md:text-base">
                      {directionIcon}&nbsp;Facing:
                    </span>
                    <br />
                    <span className="font-semibold md:text-lg">
                      {adData.facing_direction
                        ? adData.facing_direction
                        : "Not specified"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white">
              <h3 className="px-3 pt-5 pb-3 font-semibold print:py-2 print:pt-1">
                Contact details
              </h3>
              <div className="flex justify-start print:block lg:justify-center">
                <div
                  className={`grid place-items-start gap-5 px-5 pt-5 pb-10 print:grid-cols-2 print:gap-3 print:pb-5 ${
                    adData.prefer_call || adData.prefer_text
                      ? "grid-cols-1 lg:grid-cols-3"
                      : "grid-cols-1 lg:grid-cols-2"
                  } lg:place-items-center lg:gap-x-1`}
                >
                  <div className="flex items-center">
                    <span className="text-sm text-zinc-500 lg:text-base">
                      Owner:
                    </span>
                    &nbsp;
                    <span className="font-semibold">{username}</span>
                  </div>

                  <div>
                    <div className="flex items-center lg:text-base">
                      <span className="text-sm text-zinc-500 lg:text-base">
                        Contact:
                      </span>
                      &nbsp;
                      <span className="flex items-center font-semibold">
                        {user && user
                          ? adData.mobile_number
                          : adData.mobile_number.slice(0, 4) + "XXXXXXX"}{" "}
                      </span>
                      {user && mobileBrowser.current && (
                        <Link href={`tel:${adData.mobile_number}`}>
                          <motion.a
                            whileTap={{ y: "2px" }}
                            className="ml-2 cursor-pointer bg-teal-600 py-1 px-1.5 text-sm font-semibold uppercase text-white shadow-md print:hidden"
                          >
                            Call
                          </motion.a>
                        </Link>
                      )}
                    </div>
                    {!user && (
                      <div className="pt-2 text-left text-xs text-zinc-500 print:hidden lg:text-base">
                        <Link href="/account/login">
                          <a className="text-teal-600 underline decoration-teal-600 decoration-2 underline-offset-4">
                            Login
                          </a>
                        </Link>{" "}
                        to view full number
                      </div>
                    )}
                  </div>
                  {(adData.prefer_call || adData.prefer_text) && (
                    <div className="print:flex-row print:items-center lg:flex lg:items-center">
                      <span className="pr-0.5 text-sm text-zinc-500 lg:text-base">
                        Preferred Mode of Contact:
                      </span>
                      <div className="flex items-center gap-1 print:ml-1">
                        {adData.whatsapp_number && (
                          <span className="ml-1 flex items-center">
                            <Image
                              src="/whatsapp-icon.svg"
                              alt="Whatsapp icon"
                              height={20}
                              width={20}
                            />
                          </span>
                        )}
                        {adData.prefer_call && (
                          <span className="ml-1 font-semibold">
                            {phoneIcon}
                          </span>
                        )}
                        {adData.prefer_text && (
                          <span className="ml-1 font-semibold">{chatIcon}</span>
                        )}
                      </div>
                    </div>
                  )}
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
                className="flex h-14 w-36 items-center justify-evenly rounded-full bg-cyan-600 p-2 text-sm font-semibold uppercase text-white transition-colors duration-200 ease-in-out hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 md:w-40 md:text-base"
              >
                Copy ad link {copyIcon}
              </motion.button>
              {!disablePrint.current && (
                <motion.button
                  variants={variants}
                  whileTap="tap"
                  onClick={() => window.print()}
                  className="flex h-14 w-36 items-center justify-evenly rounded-full bg-teal-600 p-2 text-sm font-semibold uppercase text-white transition-colors duration-200 ease-in-out hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 md:w-40 md:text-base"
                >
                  Print ad {printIcon}
                </motion.button>
              )}
            </div>
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
