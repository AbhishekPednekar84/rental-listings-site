import React, { useState, useContext } from "react";
import AuthContext from "@/context/auth/authContext";
import { starIcon } from "@/utils/icons";
import { motion, AnimatePresence } from "framer-motion";

// Component imports
import DeleteUserModal from "@/components/account/DeleteUserModal";

const UserAdSummary = ({ listings, user }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const authContext = useContext(AuthContext);

  const { deleteUser, setLoading, loading } = authContext;

  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);
  const userApartments = [];

  listings.map((apt) => {
    userApartments.push(apt.apartment);
  });

  const uniqueApartments = [...new Set(userApartments)];

  const chipBackground = [
    "bg-rose-600",
    "bg-orange-600",
    "bg-amber-600",
    "bg-lime-600",
    "bg-green-600",
    "bg-emerald-600",
    "bg-teal-600",
    "bg-sky-600",
    "bg-fuchsia-600",
    "bg-violet-600",
  ];

  const handleDelete = (id) => {
    setLoading();
    deleteUser(id);
  };

  return (
    <div className="">
      <div className="bg-white py-10 shadow-lg hover:shadow-xl w-[300px] lg:w-[400px] px-5">
        <h5 className="text-center mb-10 text-xl font-semibold">Ad Summary</h5>

        <p className="text-sm lg:text-base flex items-center justify-start">
          <span className="mr-1 text-teal-600">{starIcon}</span> Number of
          active ads:{" "}
          <span className="bg-teal-600 px-2 py-1 text-white font-semibold ml-1 rounded-md">
            {listings.length}
          </span>
        </p>

        {listings.length > 0 && (
          <div>
            <div className="text-sm lg:text-base mt-10 flex items-center justify-start ">
              <span className="mr-1 text-teal-600">{starIcon}</span>
              <span>Apartments:</span>{" "}
            </div>

            {uniqueApartments.map((apt, index) => {
              return (
                <>
                  <p
                    key={index}
                    className={`max-w-max ml-2 text-white p-1 rounded-md text-sm font-semibold mt-2 whitespace-nowrap ${
                      chipBackground[Math.floor(Math.random() * 10)]
                    }`}
                  >
                    {apt}
                  </p>
                </>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-10 lg:mt-5 text-center bg-white py-10 px-3 shadow-lg hover:shadow-xl">
        <button
          onClick={() => (modalOpen ? closeModal() : openModal())}
          className="p-3 h-12 w-56 bg-rose-600 text-white font-semibold rounded-full focus:outline-none hover:bg-rose-800 focus:ring-2 focus:ring-offset-2 focus:ring-rose-600 transition-colors duration-200 ease-in uppercase"
        >
          Delete My Account
        </button>
      </div>

      <AnimatePresence exitBeforeEnter>
        {modalOpen && (
          <DeleteUserModal
            handleDelete={handleDelete}
            handleClose={closeModal}
            id={user.id}
            loading={loading}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserAdSummary;
