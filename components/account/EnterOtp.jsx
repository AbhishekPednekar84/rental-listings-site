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
            className="w-[70%] bg-white p-10 shadow-lg"
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
                  <h5 className="mb-10 text-center font-semibold">
                    Enter The OTP sent to{" "}
                    <span className="font-semibold text-teal-600">
                      {user && user.email}
                    </span>{" "}
                    along with your new password
                  </h5>
                  <Alert />
                  <div>
                    <div
                      className={`relative mt-2 ${
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
                        className="remove-default-focus peer h-10 w-full border-b-2 border-b-cyan-600 p-0 placeholder-transparent placeholder-shown:border-b-gray-400"
                      />
                      <label
                        htmlFor="otp"
                        className="absolute left-0 -top-3.5 text-xs text-cyan-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-cyan-600"
                      >
                        OTP
                      </label>
                    </div>

                    {props.touched.otp && props.errors.otp && (
                      <div className="mb-6 flex items-center text-xs text-rose-600">
                        <span className="mr-1">{errorIcon}</span>
                        {props.errors.otp}
                      </div>
                    )}
                  </div>

                  <div
                    className={`relative mt-2 ${
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
                      className="remove-default-focus peer h-10 w-full border-b-2 border-b-cyan-600 p-0 placeholder-transparent placeholder-shown:border-b-gray-400"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-xs text-cyan-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-cyan-600"
                    >
                      Your New Password
                    </label>
                  </div>

                  {props.touched.password && props.errors.password && (
                    <div className="mb-6 flex items-center text-xs text-rose-600">
                      <span className="mr-1">{errorIcon}</span>
                      {props.errors.password}
                    </div>
                  )}

                  <div className="text-center">
                    <motion.button
                      variants={variants}
                      whileTap="tap"
                      type="submit"
                      className="mt-5 mb-3 h-12 w-48 rounded-full bg-teal-600 p-3 font-semibold uppercase text-white transition-colors duration-200 ease-in hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
                    >
                      {props.isSubmitting ? (
                        <span className="flex animate-spin justify-center">
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
