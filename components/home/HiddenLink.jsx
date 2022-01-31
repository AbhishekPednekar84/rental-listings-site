import React from "react";
import Link from "next/link";

const HiddenLink = () => {
  return (
    <div className="absolute transform -translate-y-[200%] focus-within:translate-y-0 z-[999] transition-transform duration-300 ease-in">
      <Link href="#main">
        <a className="p-2 bg-white text-gray-800 bg-opacity-30 font-semibold">
          Skip to main content
        </a>
      </Link>
    </div>
  );
};

export default HiddenLink;
