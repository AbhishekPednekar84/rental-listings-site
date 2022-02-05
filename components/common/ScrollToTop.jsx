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
        className="fixed bottom-5 right-5 z-20 cursor-pointer rounded-full bg-teal-500 p-2 text-white shadow-xl transition duration-200 ease-in hover:scale-105 hover:bg-teal-700 print:hidden"
      >
        {scrollToTopIcon}
      </div>
    );
  } else {
    return null;
  }
};

export default ScrollToTop;
