import React, { Fragment, useContext } from "react";
import AuthContext from "@/context/auth/authContext";
import { errorIcon } from "@/utils/icons";

const Alert = () => {
  const authContext = useContext(AuthContext);
  const { authError } = authContext;

  return (
    <Fragment>
      {authError && authError && (
        <p
          className={`-mt-5 mb-7 bg-rose-100 p-2 px-3 text-sm font-semibold text-rose-600 ${
            authError.length < 20 ? "text-center" : "text-left"
          }`}
        >
          <span>{authError}</span>
        </p>
      )}
    </Fragment>
  );
};

export default Alert;
