import React from "react";
import { motion } from "framer-motion";
import { loaderIcon, dangerIcon } from "@/utils/icons";

// Component imports
import Backdrop from "@/components/common/Backdrop";

const variants = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const DeleteUserModal = ({ handleDelete, handleClose, id, loading }) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal"
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="bg-gradient-to-r from-zinc-100 via-slate-100 to-gray-100 p-10">
          <div className="flex justify-center mb-5">{dangerIcon}</div>
          <p className="text-xl text-center">
            Are you sure you want to delete your user account? <br />
            This process is irreversible.
          </p>
          <div className="flex justify-evenly mt-10">
            <button
              className="bg-rose-600 rounded-full w-20 h-10 uppercase text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-600 transition-colors duration-200 ease-in-out"
              onClick={() => handleDelete(id)}
            >
              {loading ? (
                <span className="flex justify-center animate-spin">
                  {loaderIcon}
                </span>
              ) : (
                "Delete"
              )}
            </button>
            <button
              onClick={handleClose}
              className="text-teal-800 underline underline-offset-4 decoration-teal-800 decoration-2"
            >
              I changed my mind
            </button>
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default DeleteUserModal;
