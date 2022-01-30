import React from "react";
import { motion } from "framer-motion";

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
  tap: {
    y: "2px",
  },
};

const DeleteAdModal = ({ handleDelete, handleClose, id }) => {
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
          <p className="text-xl">
            Are you sure you want to delete this listing?
          </p>
          <div className="flex justify-evenly mt-10">
            <motion.button
              variants={variants}
              whileTap="tap"
              className="bg-rose-600 rounded-full w-20 h-10 uppercase text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-600 transition-colors duration-200 ease-in-out"
              onClick={() => handleDelete(id)}
            >
              Delete
            </motion.button>
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

export default DeleteAdModal;
