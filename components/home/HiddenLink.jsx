import React from "react";
import Link from "next/link";

const HiddenLink = () => {
  return (
    <div className="absolute z-[999] -translate-y-[200%] transform transition-transform duration-300 ease-in focus-within:translate-y-0">
      <Link href="#main">
        <a className="bg-white bg-opacity-30 p-2 font-semibold text-gray-800">
          Skip to main content
        </a>
      </Link>
    </div>
  );
};

export default HiddenLink;
