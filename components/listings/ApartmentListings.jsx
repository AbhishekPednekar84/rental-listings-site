import React, { useEffect, useContext } from "react";
import SiteContext from "@/context/site/siteContext";
import { useRouter } from "next/router";
import Image from "next/image";

const searchIcon = (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      color="#6B7280"
    ></path>
  </svg>
);

const ApartmentListings = ({ apartmentName }) => {
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
    <div className="my-20">
      <div className="flex justify-center">
        <div className="w-[800px] mx-5 flex flex-col">
          {apartmentAds &&
            apartmentAds.map((ad) => {
              return (
                <div
                  key={ad.id}
                  className="border-2 border-teal-50 p-2 flex flex-col md:flex-row items-center rounded-md shadow-lg hover:shadow-xl relative mb-[60px] hover:scale-105 transition duration-200 ease-in-out"
                >
                  <div className="absolute top-2 right-2 md:-top-2 md:-right-4 lg:-top-3 lg:-right-6 z-10">
                    <span
                      className={`ad-card-listing-type text-sm ${
                        ad.listing_type === "sale"
                          ? "bg-orange-400"
                          : "bg-lime-600"
                      }`}
                    >
                      {ad.listing_type.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    {ad.images.length !== 0 ? (
                      <Image
                        src={ad.images[0].image_url}
                        alt="Image of rental property"
                        height={ad.images[0].height / 5}
                        width={ad.images[0].width / 5}
                      />
                    ) : (
                      <Image
                        src="https://ik.imagekit.io/ykidmzssaww/Listings/site-images/default-listing_nJ1h_cG5N.jpg?updatedAt=1640766058193"
                        alt="thumbnail"
                        height={160}
                        width={250}
                      />
                    )}
                  </div>
                  <div className="flex flex-col items-center justify-center w-full p-1 mt-5 md:mt-0">
                    <h3 className="pb-3 font-semibold">{ad.title}</h3>
                    <p className="pb-5 text-sm text-gray-600">
                      {ad.description.slice(0, 75)}...
                    </p>
                    <div className="flex justify-around items-center w-full">
                      <p className="text-sm">
                        <span className="ad-card-underline">Bedrooms</span>:{" "}
                        <span className="font-semibold">{ad.bedrooms}</span>
                      </p>
                      {ad.date_created && (
                        <p className="text-sm">
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
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ApartmentListings;
