import React, { useState, useEffect, useContext } from "react";
import SiteContext from "@/context/site/siteContext";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { largeRupeeIcon, searchIcon } from "@/utils/icons";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const variants = {
  initial: {
    y: 10,
  },
  hover: {
    backgroundColor: "#115E59",
  },
  tap: {
    y: "2px",
  },
};

const ApartmentListings = ({ apartmentName }) => {
  const [listSlice, setListSlice] = useState(10);
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start((i) => ({
        y: 0,
        transition: {
          duration: i * 0.4,
          delay: i * 0.1,
        },
      }));
    }
  });

  const siteContext = useContext(SiteContext);
  const { loading, setLoading, apartmentAds, fetchAdsForApartment } =
    siteContext;

  useEffect(() => {
    setLoading();
    fetchAdsForApartment(apartmentName);
  }, []);

  const formatCurrency = (amount) => {
    if (amount % 1 === 0) {
      return new Intl.NumberFormat("en-IN").format(Math.trunc(amount));
    } else {
      return new Intl.NumberFormat("en-IN").format(amount);
    }
  };

  if (loading) {
    return (
      <div className="my-20 flex justify-center">
        <Image
          src="/loader.svg"
          alt="Loading..."
          width={75}
          height={75}
          className="animate-spin"
        />
      </div>
    );
  } else
    return (
      <div className="mt-10 mb-20 lg:mt-16">
        {apartmentAds && apartmentAds.length === 0 && (
          <div className="mt-10 flex justify-center px-5">
            <div className="inline-flex">
              <span>{searchIcon}</span>
              <p className="ml-2 text-lg text-gray-500 lg:text-xl">
                We looked high and low but did not find any listings for{" "}
                {apartmentName} :(
              </p>
            </div>
          </div>
        )}
        <div className="mx-5 lg:mx-16">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 600: 2, 750: 2, 900: 3 }}
          >
            <Masonry gutter={50}>
              {apartmentAds &&
                apartmentAds.slice(0, listSlice).map((ad, index) => {
                  return (
                    <Link key={ad.id} href={`/ad/${ad.id}`}>
                      <motion.a
                        ref={ref}
                        custom={index + 0.5}
                        variants={variants}
                        initial="initial"
                        animate={controls}
                        whileTap="tap"
                        className="relative  cursor-pointer border-2 border-teal-100 p-2 shadow-sm transition-shadow duration-200 ease-in hover:shadow-xl"
                      >
                        <div className="relative h-[250px] overflow-hidden">
                          {ad.images.length !== 0 ? (
                            <Image
                              src={ad.images[0].image_url}
                              alt="Image of rental property"
                              layout="fill"
                              placeholder="blur"
                              blurDataURL={ad.images[0].image_url + "/tr:bl-10"}
                              objectFit="cover"
                              className="transition hover:scale-105"
                            />
                          ) : (
                            <Image
                              src="https://ik.imagekit.io/ykidmzssaww/Listings/site-images/default-listing_nJ1h_cG5N.jpg"
                              alt="thumbnail"
                              layout="fill"
                              placeholder="blur"
                              blurDataURL={
                                "https://ik.imagekit.io/ykidmzssaww/Listings/site-images/default-listing_nJ1h_cG5N.jpg/tr:bl-10"
                              }
                              objectFit="cover"
                            />
                          )}
                        </div>
                        <div className="my-7 flex justify-center">
                          <span
                            className={`ad-card-listing-type px-4 tracking-wide ring-2 ring-offset-2 ${
                              ad.listing_type === "sale"
                                ? "bg-rose-600 ring-rose-600"
                                : "bg-amber-600 ring-amber-600"
                            }`}
                          >
                            {ad.listing_type.toUpperCase()}
                          </span>
                        </div>

                        <div className="mb-5 flex w-full flex-col items-center justify-center">
                          <h3 className="px-2 font-semibold">{ad.title}</h3>
                          {ad.description && (
                            <p className="px-2 pt-3 text-sm text-gray-600">
                              {ad.description.slice(0, 50)}
                              {ad.description.length < 50 && "..."}
                            </p>
                          )}

                          {/* <motion.button
                          variants={variants}
                          whileTap="tap"
                          onClick={() => router.push(`/ad/${ad.id}`)}
                          className="mt-7 mb-4 h-10 rounded-full bg-teal-600 px-3 py-2 text-sm font-semibold uppercase text-white shadow-md transition-colors duration-200 ease-in-out hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
                        >
                          See Full Ad
                        </motion.button> */}

                          <p
                            className={`mt-5 flex items-center text-2xl font-bold underline  decoration-2 underline-offset-8 ${
                              ad.listing_type === "rent"
                                ? "decoration-amber-600"
                                : "decoration-rose-600"
                            }`}
                          >
                            <span className="stroke-2">{largeRupeeIcon}</span>
                            {ad.listing_type === "rent"
                              ? formatCurrency(ad.rent)
                              : formatCurrency(ad.sale) +
                                " " +
                                ad.sale_amount_value}
                          </p>

                          <div className="mt-7 flex w-full items-center justify-around">
                            <p className="text-sm lg:text-base">
                              <span className="ad-card-underline">
                                Bedrooms
                              </span>
                              :{" "}
                              <span className="font-semibold">
                                {ad.bedrooms}
                              </span>
                            </p>
                            {ad.date_created && (
                              <p className="text-sm lg:text-base">
                                <span className="ad-card-underline">
                                  Posted {ad.date_created}
                                </span>
                              </p>
                            )}
                            {/* {ad.attributes.area && (
                    <p className="text-sm">
                      <span className="ad-card-underline">Area</span>:{" "}
                      <span className="font-semibold">
                        {ad.attributes.area}
                      </span>{" "}
                      sq ft.
                    </p>
                  )} */}
                          </div>
                        </div>
                      </motion.a>
                    </Link>
                  );
                })}
            </Masonry>
          </ResponsiveMasonry>

          {listSlice < apartmentAds.length && (
            <div className="mt-10 flex justify-center">
              <motion.button
                variants={variants}
                whileHover="hover"
                whileTap="tap"
                className="mt-5 mb-3 h-12 w-36 rounded-full bg-teal-600 p-3 font-semibold uppercase text-white transition-colors duration-200 ease-in hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
                onClick={() => setListSlice(listSlice + 10)}
              >
                More Ads
              </motion.button>
            </div>
          )}
        </div>
      </div>
    );
};

export default ApartmentListings;
