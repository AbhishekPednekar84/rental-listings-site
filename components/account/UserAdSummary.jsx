import React, { useState, useContext } from "react";
import AuthContext from "@/context/auth/authContext";
import { starIcon } from "@/utils/icons";
import { motion, AnimatePresence } from "framer-motion";

// Component imports
import DeleteUserModal from "@/components/account/DeleteUserModal";

const variants = {
  tap: {
    y: "2px",
  },
};

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
      <div className="w-[300px] bg-white py-10 px-5 shadow-lg hover:shadow-xl lg:w-[400px]">
        <h5 className="mb-10 text-center text-xl font-semibold">Ad Summary</h5>

        <p className="flex items-center justify-start text-sm lg:text-base">
          <span className="mr-1 text-teal-600">{starIcon}</span> Number of
          active ads:{" "}
          <span className="ml-1 rounded-md bg-teal-600 px-2 py-1 font-semibold text-white">
            {listings.length}
          </span>
        </p>

        {listings.length > 0 && (
          <div>
            <div className="mt-10 flex items-center justify-start text-sm lg:text-base ">
              <span className="mr-1 text-teal-600">{starIcon}</span>
              <span>Apartments:</span>{" "}
            </div>

            {uniqueApartments.map((apt, index) => {
              return (
                <div key={index}>
                  <p
                    className={`ml-2 mt-2 max-w-max whitespace-nowrap rounded-md p-1 text-sm font-semibold text-white ${
                      chipBackground[Math.floor(Math.random() * 10)]
                    }`}
                  >
                    {apt}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-10 bg-white py-10 px-3 text-center shadow-lg hover:shadow-xl lg:mt-5">
        <motion.button
          variants={variants}
          whileTap="tap"
          onClick={() => (modalOpen ? closeModal() : openModal())}
          className="h-12 w-56 rounded-full bg-rose-600 p-3 font-semibold uppercase text-white transition-colors duration-200 ease-in hover:bg-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-offset-2"
        >
          Delete My Account
        </motion.button>
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
