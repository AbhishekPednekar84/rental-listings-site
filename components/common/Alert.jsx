import React, { Fragment, useContext } from "react";
import AuthContext from "@/context/auth/authContext";

const errorIcon = (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

const Alert = () => {
  const authContext = useContext(AuthContext);
  const { authError } = authContext;

  return (
    <Fragment>
      {authError && authError && (
        <p className="-mt-5 mb-7 bg-rose-100 p-1 flex items-center justify-center text-rose-600 text-sm">
          <span className="mr-1">{errorIcon}</span>
          {authError}
        </p>
      )}
    </Fragment>
  );
};

export default Alert;
