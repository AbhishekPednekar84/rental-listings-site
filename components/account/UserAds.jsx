import React, { useEffect, useState, useContext } from "react";
import SiteContext from "@/context/site/siteContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { editAlt, trashIconLg, viewIcon, loaderIcon } from "@/utils/icons";
import { motion, AnimatePresence } from "framer-motion";
import { sessionExpiredToast } from "@/utils/toasts";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import DeleteAdModal from "@/components/listings/DeleteAdModal";

const variants = {
  tap: {
    y: "2px",
  },
};

const UserAds = ({ listings, setListings, token, user }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [adId, setAdId] = useState(null);
  const [adTitle, setAdTitle] = useState(null);

  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);

  const siteContext = useContext(SiteContext);
  const router = useRouter();

  const { deleteListing, siteError } = siteContext;

  useEffect(() => {
    if (siteError === "Token expired") {
      logout();
      sessionExpiredToast();
      setTimeout(() => router.push("/account/login"), 3000);
    }
  }, [siteError]);

  const handleDelete = (id) => {
    deleteListing(id);

    setListings(
      listings.filter((ad) => {
        return ad.id !== id;
      })
    );

    closeModal();
  };

  return (
    <div className="mt-10 bg-gradient-to-b from-zinc-50 via-neutral-100 to-slate-100 py-5 lg:py-10">
      <h3 className="mb-10 text-center text-3xl font-semibold">My Ads</h3>

      {listings.length === 0 && (
        <div className="text-center text-gray-800">
          Looks like you have not created a listing recently. You can do that{" "}
          <Link href="/listings/create">
            <a className="text-teal-600 underline decoration-teal-600 decoration-2 underline-offset-4">
              here
            </a>
          </Link>
        </div>
      )}

      <div className="mx-5 lg:mx-10">
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 600: 2, 750: 2, 900: 3 }}
        >
          <Masonry gutter={50}>
            {listings.map((ad) => {
              return (
                <div
                  key={ad.id}
                  className="flex min-w-[300px] flex-col items-center bg-white py-3 px-5 shadow-lg hover:shadow-xl"
                >
                  {ad.images.length > 0 ? (
                    <img
                      src={ad.images[0].image_url}
                      alt="thumbnail"
                      height={ad.images[0].height / 3}
                      width={ad.images[0].width / 3}
                    />
                  ) : (
                    <Image
                      src="https://ik.imagekit.io/ykidmzssaww/Listings/site-images/default-listing_nJ1h_cG5N.jpg?tr:w-200"
                      alt="thumbnail"
                      height={150}
                      width={225}
                    />
                  )}
                  <h6 className="mt-5 text-xl font-semibold">{ad.title}</h6>
                  <p className="mt-5">
                    Listing type:{" "}
                    <span
                      className={`ad-card-listing-type ml-1 text-sm uppercase ${
                        ad.listing_type === "sale"
                          ? "bg-rose-600 ring-2 ring-rose-600 ring-offset-2"
                          : "bg-amber-600 ring-2 ring-amber-600 ring-offset-2"
                      }`}
                    >
                      {ad.listing_type}
                    </span>
                  </p>
                  <p className="my-5">
                    Apartment:{" "}
                    <span className="font-semibold">{ad.apartment}</span>
                  </p>

                  <div className="my-5 flex w-full items-center justify-around">
                    <motion.button
                      variants={variants}
                      whileTap="tap"
                      className="rounded-md bg-amber-600 p-2 text-white transition-all duration-100 ease-in hover:bg-amber-800"
                      onClick={() => router.push(`/ad/${ad.id}`)}
                    >
                      {viewIcon}
                    </motion.button>
                    <motion.button
                      variants={variants}
                      whileTap="tap"
                      className="rounded-md bg-teal-600 p-2 text-white transition-all duration-100 ease-in hover:bg-teal-800"
                      onClick={() => {
                        router.push(`/listings/modify/${ad.id}/${user.id}`);
                      }}
                    >
                      {editAlt}
                    </motion.button>
                    <motion.button
                      variants={variants}
                      whileTap="tap"
                      onClick={() => {
                        setAdTitle(ad.title);
                        setAdId(ad.id);
                        setTimeout(
                          () => (modalOpen ? closeModal() : openModal()),
                          500
                        );
                      }}
                      className="rounded-md bg-rose-600 p-2 text-lg text-white transition-all duration-100 ease-in hover:bg-rose-800"
                    >
                      {trashIconLg}
                    </motion.button>
                  </div>
                </div>
              );
            })}
          </Masonry>
        </ResponsiveMasonry>

        <AnimatePresence exitBeforeEnter>
          {modalOpen && (
            <DeleteAdModal
              handleDelete={handleDelete}
              handleClose={closeModal}
              id={adId}
              title={adTitle}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserAds;
