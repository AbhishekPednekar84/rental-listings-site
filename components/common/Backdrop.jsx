import React, { useEffect } from "react";
import { motion } from "framer-motion";

const Backdrop = ({ children, onClick }) => {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown, false);

    return () => window.removeEventListener("keydown", handleKeyDown, false);
  }, []);

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      onClick();
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 h-full w-full bg-black bg-opacity-60 flex z-30 overflow-auto"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
