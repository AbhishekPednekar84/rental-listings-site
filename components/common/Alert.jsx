import React, { Fragment, useContext } from "react";
import AuthContext from "@/context/auth/authContext";
import { errorIcon } from "@/utils/icons";

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
