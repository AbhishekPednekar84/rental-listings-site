import React, { useEffect, useContext } from "react";
import SiteContext from "@/context/site/siteContext";
import { useRouter } from "next/router";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { searchIcon } from "@/utils/icons";

const variants = {
  initial: {
    opacity: 0.8,
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
          duration: 0.4,
          delay: i * 0.5,
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
      <div className="flex justify-center my-20">
        <Image
          src="/loader.svg"
          alt="Loading..."
          width={75}
          height={75}
          className="animate-spin"
        />
      </div>
    );
  }

  if (apartmentAds && apartmentAds.length === 0) {
    return (
      <div className="flex justify-center items-center my-20">
        {searchIcon}{" "}
        <p className="ml-2 text-xl text-gray-500">
          We looked high and low but found nothing :(
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 lg:mt-16">
      <div className="flex justify-center">
        <div className="w-[800px] mx-5 flex flex-col">
          {apartmentAds &&
            apartmentAds.map((ad, index) => {
              return (
                <motion.div
                  ref={ref}
                  key={ad.id}
                  variants={variants}
                  custom={index}
                  initial="initial"
                  animate={controls}
                  className="flex flex-col md:flex-row items-center shadow-sm hover:shadow-xl transition-shadow duration-200 ease-in relative mb-[60px] border-2 border-teal-100 p-2"
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
                  <div className="w-full md:w-[45%] flex justify-center">
                    {ad.images.length !== 0 ? (
                      <Image
                        src={ad.images[0].image_url}
                        alt="Image of rental property"
                        placeholder="blur"
                        blurDataURL={ad.images[0].image_url + "/tr:bl-10"}
                        height={ad.images[0].height / 5}
                        width={ad.images[0].width / 5}
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
                  <div className="flex flex-col items-center justify-center w-full mt-5 md:mt-0">
                    <h3 className="pb-3 font-semibold">{ad.title}</h3>
                    <p className="pb-5 text-sm text-gray-600">
                      {ad.description.slice(0, 75)}...
                    </p>
                    <div className="flex justify-around items-center w-full">
                      <p className="text-sm lg:text-base">
                        <span className="ad-card-underline">Bedrooms</span>:{" "}
                        <span className="font-semibold">{ad.bedrooms}</span>
                      </p>
                      {ad.date_created && (
                        <p className="text-sm lg:text-base">
                          <span className="ad-card-underline">Posted on</span>:{" "}
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
                    <button
                      onClick={() => router.push(`/ad/${ad.id}`)}
                      className="mt-5 px-3 py-2 h-10 bg-teal-600 text-white uppercase font-semibold rounded-full text-sm shadow-md shadow-teal-100 focus:outline-none hover:bg-teal-800 focus:ring-2 focus:ring-offset-2 focus:ring-teal-600 transition-colors duration-200 ease-in-out"
                    >
                      See Full Ad
                    </button>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ApartmentListings;
