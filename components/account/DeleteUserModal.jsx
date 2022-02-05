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
  tap: { y: "2px" },
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
          <div className="mb-5 flex justify-center">{dangerIcon}</div>
          <p className="text-center text-xl">
            Are you sure you want to delete your user account? <br />
            This process is irreversible.
          </p>
          <div className="mt-10 flex justify-evenly">
            <motion.button
              variants={variants}
              whileTap="tap"
              className="h-10 w-20 rounded-full bg-rose-600 uppercase text-white transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-offset-2"
              onClick={() => handleDelete(id)}
            >
              {loading ? (
                <span className="flex animate-spin justify-center">
                  {loaderIcon}
                </span>
              ) : (
                "Delete"
              )}
            </motion.button>
            <button
              onClick={handleClose}
              className="text-teal-800 underline decoration-teal-800 decoration-2 underline-offset-4"
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
