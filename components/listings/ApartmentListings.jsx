import React, { useEffect, useContext } from "react";
import SiteContext from "@/context/site/siteContext";
import { useRouter } from "next/router";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { searchIcon } from "@/utils/icons";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const variants = {
  initial: {
    opacity: 0.7,
  },
  tap: {
    y: "2px",
  },
};

const ApartmentListings = ({ apartmentName }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start((i) => ({
        opacity: 1,
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

  const router = useRouter();

  useEffect(() => {
    setLoading();
    fetchAdsForApartment(apartmentName);
  }, []);

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
                We looked high and low but found nothing :(
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
                apartmentAds.map((ad, index) => {
                  return (
                    <motion.div
                      ref={ref}
                      key={ad.id}
                      custom={index + 0.5}
                      variants={variants}
                      initial="initial"
                      animate={controls}
                      className="relative border-2 border-teal-100 p-2 shadow-sm transition-shadow duration-200 ease-in hover:shadow-xl"
                    >
                      <div className="absolute -top-2 -right-2 z-10">
                        <span
                          className={`ad-card-listing-type text-sm ${
                            ad.listing_type === "sale"
                              ? "bg-rose-600"
                              : "bg-teal-600"
                          }`}
                        >
                          {ad.listing_type.toUpperCase()}
                        </span>
                      </div>
                      <div className="mb-10 flex w-full justify-center">
                        {ad.images.length !== 0 ? (
                          <Image
                            src={ad.images[0].image_url}
                            alt="Image of rental property"
                            placeholder="blur"
                            blurDataURL={ad.images[0].image_url + "/tr:bl-10"}
                            height={ad.images[0].height / 3}
                            width={ad.images[0].width / 3}
                          />
                        ) : (
                          <Image
                            src="https://ik.imagekit.io/ykidmzssaww/Listings/site-images/default-listing_nJ1h_cG5N.jpg"
                            alt="thumbnail"
                            height={160}
                            width={250}
                          />
                        )}
                      </div>
                      <div className="flex w-full flex-col items-center justify-center md:mt-0">
                        <h3 className="px-2 pb-3 font-semibold">{ad.title}</h3>
                        <p className="px-2 pb-5 text-sm text-gray-600">
                          {ad.description.slice(0, 75)}...
                        </p>
                        <div className="flex w-full items-center justify-around">
                          <p className="text-sm lg:text-base">
                            <span className="ad-card-underline">Bedrooms</span>:{" "}
                            <span className="font-semibold">{ad.bedrooms}</span>
                          </p>
                          {ad.date_created && (
                            <p className="text-sm lg:text-base">
                              <span className="ad-card-underline">
                                Posted on
                              </span>
                              :{" "}
                              <span className="font-semibold">
                                {new Date(ad.date_created).toLocaleDateString(
                                  "en-IN"
                                )}
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
                        <motion.button
                          variants={variants}
                          whileTap="tap"
                          onClick={() => router.push(`/ad/${ad.id}`)}
                          className="mt-7 mb-4 h-10 rounded-full bg-teal-600 px-3 py-2 text-sm font-semibold uppercase text-white shadow-md transition-colors duration-200 ease-in-out hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
                        >
                          See Full Ad
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>
    );
};

export default ApartmentListings;
