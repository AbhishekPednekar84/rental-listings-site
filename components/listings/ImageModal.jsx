import React from "react";
import { motion } from "framer-motion";
import { cancelIcon } from "@/utils/icons";

// Component imports
import Backdrop from "@/components/common/Backdrop";
import ImageCarousel from "@/components/listings/ImageCarousel";

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

const ImageModal = ({ handleClose, images }) => {
  return (
    <Backdrop onClick={handleClose}>
      <div
        className="absolute right-2 top-2 lg:top-5 lg:right-5 text-white font-bold cursor-pointer z-50"
        onClick={handleClose}
      >
        {cancelIcon}
      </div>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal image-modal"
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div>
          <ImageCarousel images={images} />
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default ImageModal;
