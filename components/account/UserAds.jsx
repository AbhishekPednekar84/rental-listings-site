import React, { useEffect, useState, useContext } from "react";
import SiteContext from "@/context/site/siteContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { editAlt, trashIconLg, viewIcon } from "@/utils/icons";
import { AnimatePresence } from "framer-motion";
import { sessionExpiredToast } from "@/utils/toasts";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import DeleteAdModal from "@/components/listings/DeleteAdModal";

const UserAds = ({ listings, setListings, token, user }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);

  const siteContext = useContext(SiteContext);
  const router = useRouter();

  const { deleteListing, siteError } = siteContext;

  useEffect(() => {
    if (siteError === "Token expired") {
      logout();
      sessionExpiredToast();
      setTimeout(() => router.push("/account/login"), 1500);
    }
  }, [siteError]);

  const handleDelete = (id, images) => {
    deleteListing(id);

    setListings(
      listings.filter((ad) => {
        return ad.id !== id;
      })
    );
  };

  return (
    <div className="bg-zinc-50 py-5 lg:py-10 mt-10">
      <h3 className="mb-10 text-3xl font-semibold text-center">My Ads</h3>

      {listings.length === 0 && (
        <div className="text-center text-gray-800">
          Looks like you have not posted an ad recently. You can do that{" "}
          <Link href="/listings/create">
            <a className="text-teal-600 underline underline-offset-4 decoration-teal-600 decoration-2">
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
                  className="bg-white py-3 px-5 min-w-[300px] text-center shadow-lg hover:shadow-xl"
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
                  <h6 className="text-xl mt-5 font-semibold">{ad.title}</h6>
                  <p className="mt-5">
                    Listing type:{" "}
                    <span
                      className={`uppercase text-sm ad-card-listing-type ${
                        ad.listing_type === "sale"
                          ? "bg-orange-400"
                          : "bg-lime-600"
                      }`}
                    >
                      {ad.listing_type}
                    </span>
                  </p>
                  <p className="my-5">
                    Apartment:{" "}
                    <span className="font-semibold">{ad.apartment}</span>
                  </p>

                  <div className="flex justify-evenly items-center mt-10 mb-5">
                    <button
                      className="bg-fuchsia-600 text-white p-2 rounded-md hover:bg-fuchsia-800 transition-all duration-100 ease-in"
                      onClick={() => router.push(`/ad/${ad.id}`)}
                    >
                      {viewIcon}
                    </button>
                    <button
                      className="bg-teal-600 text-white p-2 rounded-md hover:bg-teal-800 transition-all duration-100 ease-in"
                      onClick={() =>
                        router.push(`/listings/modify/${ad.id}/${user.id}`)
                      }
                    >
                      {editAlt}
                    </button>
                    <button
                      onClick={() => (modalOpen ? closeModal() : openModal())}
                      className="bg-rose-600 text-white text-lg p-2 rounded-md hover:bg-rose-800 transition-all duration-100 ease-in"
                    >
                      {trashIconLg}
                    </button>
                  </div>
                  <AnimatePresence exitBeforeEnter>
                    {modalOpen && (
                      <DeleteAdModal
                        handleDelete={handleDelete}
                        handleClose={closeModal}
                        id={ad.id}
                      />
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
};

export default UserAds;
