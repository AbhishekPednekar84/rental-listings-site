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

const DeleteAdModal = ({ handleDelete, handleClose, id, title }) => {
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
          <p className="mt-2 text-center text-lg font-semibold">{title}</p>
          <div className="mt-7 flex justify-evenly">
            <motion.button
              variants={variants}
              whileTap="tap"
              className="h-10 w-20 rounded-full bg-rose-600 uppercase text-white transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-offset-2"
              onClick={() => handleDelete(id)}
            >
              Delete
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

export default DeleteAdModal;
