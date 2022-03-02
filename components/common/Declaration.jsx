import React from "react";
import Link from "next/link";

const Declaration = ({ message }) => {
  return (
    <div className="mt-3 text-sm text-gray-800">
      By {message} you agree to our{" "}
      <Link href="/policy/#terms">
        <a
          target="_blank"
          className="underline decoration-teal-600 underline-offset-2"
        >
          Terms of Use
        </a>
      </Link>{" "}
      and our{" "}
      <Link href="/policy/#privacy">
        <a
          target="_blank"
          className="underline decoration-teal-600 underline-offset-2"
        >
          Privacy Policy
        </a>
      </Link>{" "}
    </div>
  );
};

export default Declaration;
