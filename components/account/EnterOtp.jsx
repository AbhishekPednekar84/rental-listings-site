import React, { useState, useContext, useEffect } from "react";
import AuthContext from "@/context/auth/authContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { errorIcon, loaderIcon } from "@/utils/icons";
import { AnimatePresence, motion } from "framer-motion";

// Component imports
import Alert from "@/components/common/Alert";
import PasswordChanged from "@/components/account/PasswordChanged";

const variants = {
  initial: { x: 1000 },
  animate: { x: 0, transition: { delay: 0.4, duration: 0.4 } },
  exit: {
    x: -1000,
    transition: {
      duration: 0.4,
    },
  },
  tap: {
    y: "2px",
  },
};

const validationSchema = Yup.object({
  otp: Yup.string()
    .required("Otp is required")
    .min(6, "The otp should have 6 characters")
    .trim(),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password should be at least 8 characters")
    .trim(),
});

const EnterOtp = () => {
  const [showOtpForm, setShowOtpForm] = useState(true);

  const authContext = useContext(AuthContext);
  const { loading, setLoading, validateOtp, user, fpMessage, authError } =
    authContext;

  useEffect(() => {
    if (authError) {
      setShowOtpForm(true);
    }
  }, [authError]);

  useEffect(() => {
    if (fpMessage && fpMessage.message === "Password changed successfully") {
      setShowOtpForm(false);
    }
  }, [fpMessage]);

  return (
    <div className="flex justify-center">
      <AnimatePresence>
        {showOtpForm && (
          <motion.div
            variants={variants}
            exit="exit"
            className="p-10 shadow-lg bg-white w-[70%]"
          >
            <Formik
              initialValues={{ email: "" }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                setLoading();
                validateOtp(user && user.id, values.password, values.otp);
                setSubmitting(false);
              }}
            >
              {(props) => (
                <Form autoComplete="off">
                  <h5 className="text-center font-semibold mb-10">
                    Enter The OTP sent to{" "}
                    <span className="text-teal-600 font-semibold">
                      {user && user.email}
                    </span>{" "}
                    along with your new password
                  </h5>
                  <Alert />
                  <div>
                    <div
                      className={`mt-2 relative ${
                        props.touched.otp && props.errors.otp ? "mb-1" : "mb-8"
                      }`}
                    >
                      <Field
                        id="otp"
                        name="otp"
                        type="text"
                        placeholder="Otp*"
                        maxLength="6"
                        autoComplete="off"
                        className="remove-default-focus peer border-b-2 placeholder-shown:border-b-gray-400 border-b-cyan-600 h-10 w-full p-0 placeholder-transparent"
                      />
                      <label
                        htmlFor="otp"
                        className="absolute left-0 -top-3.5 text-cyan-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-cyan-600 peer-focus:text-xs"
                      >
                        OTP
                      </label>
                    </div>

                    {props.touched.otp && props.errors.otp && (
                      <div className="mb-6 text-xs text-rose-600 flex items-center">
                        <span className="mr-1">{errorIcon}</span>
                        {props.errors.otp}
                      </div>
                    )}
                  </div>

                  <div
                    className={`mt-2 relative ${
                      props.touched.password && props.errors.password
                        ? "mb-1"
                        : "mb-6"
                    }`}
                  >
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Your New Password*"
                      maxLength="50"
                      autoComplete="off"
                      className="remove-default-focus peer border-b-2 placeholder-shown:border-b-gray-400 border-b-cyan-600 h-10 w-full p-0 placeholder-transparent"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-cyan-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-cyan-600 peer-focus:text-xs"
                    >
                      Your New Password
                    </label>
                  </div>

                  {props.touched.password && props.errors.password && (
                    <div className="mb-6 text-xs text-rose-600 flex items-center">
                      <span className="mr-1">{errorIcon}</span>
                      {props.errors.password}
                    </div>
                  )}

                  <div className="text-center">
                    <motion.button
                      variants={variants}
                      whileTap="tap"
                      type="submit"
                      className="mt-5 mb-3 p-3 h-12 w-48 bg-teal-600 text-white font-semibold rounded-full focus:outline-none hover:bg-teal-800 focus:ring-2 focus:ring-offset-2 focus:ring-teal-600 transition-colors duration-200 ease-in uppercase"
                    >
                      {props.isSubmitting ? (
                        <span className="flex justify-center animate-spin">
                          {loaderIcon}
                        </span>
                      ) : (
                        "Change Password"
                      )}
                    </motion.button>
                  </div>
                </Form>
              )}
            </Formik>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showOtpForm && (
          <motion.div variants={variants} initial="initial" animate="animate">
            <PasswordChanged />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnterOtp;
