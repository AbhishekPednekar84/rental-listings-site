import React, { useState } from "react";
import { motion } from "framer-motion";
import { closeIcon } from "@/utils/icons";

// Component imports
import Backdrop from "@/components/common/Backdrop";
import AddApartment from "@/components/apartment/AddApartment";

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

const ApartmentModal = ({ handleClose, apartments }) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal apartment-modal"
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="relative bg-white p-10">
          <div
            className="absolute top-2 right-2 cursor-pointer"
            onClick={handleClose}
          >
            {closeIcon}
          </div>
          <AddApartment apartments={apartments} />
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default ApartmentModal;
