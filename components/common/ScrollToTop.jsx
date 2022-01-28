import React, { useState, useEffect } from "react";
import { scrollToTopIcon } from "@/utils/icons";

const ScrollToTop = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  });

  const handleScroll = () => {
    const scrollOn = window.scrollY > 200;

    if (scrollOn) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  const scrollToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  if (scroll) {
    return (
      <div
        onClick={scrollToTop}
        className="print:hidden fixed bottom-5 right-5 bg-teal-500 hover:bg-teal-700 text-white p-2 rounded-full cursor-pointer shadow-xl z-20 hover:scale-105 transition duration-200 ease-in"
      >
        {scrollToTopIcon}
      </div>
    );
  } else {
    return null;
  }
};

export default ScrollToTop;
