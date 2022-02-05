import React, { useState, useEffect, useContext } from "react";
import AuthContext from "@/context/auth/authContext";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { errorIcon, loaderIcon } from "@/utils/icons";
import { motion, AnimatePresence } from "framer-motion";

// Component imports
import Alert from "@/components/common/Alert";
import EnterOtp from "@/components/account/EnterOtp";

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Email is not valid")
    .trim(),
});

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

const EnterEmail = () => {
  const [showForm, setShowForm] = useState(true);
  const authContext = useContext(AuthContext);
  const {
    fpMessage,
    setLoading,
    loading,
    generateOtp,
    user,
    verifyEmail,
    authError,
    sendOtpEmail,
  } = authContext;

  useEffect(() => {
    if (user && user && !authError) {
      generateOtp(user.id);
      setShowForm(false);
    }
  }, [user]);

  // useEffect(() => {
  //   if (authError) setShowForm(true);
  // }, [authError]);

  useEffect(() => {
    if (fpMessage && fpMessage.message === "Otp generated" && user && user)
      sendOtpEmail(user && user.email);
  }, [fpMessage]);

  return (
    <div className="flex flex-col items-center justify-center bg-zinc-100 via-slate-50 to-white py-32">
      <div>
        <h1>
          <span className="heading-underline">Le</span>t's change your password
        </h1>
      </div>
      <AnimatePresence>
        {showForm && (
          <motion.div
            variants={variants}
            exit="exit"
            className="w-[80%] bg-white p-10 shadow-lg lg:w-[30%]"
          >
            <Formik
              initialValues={{ email: "" }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                setLoading();
                verifyEmail(values.email);
                setSubmitting(false);
              }}
            >
              {(props) => (
                <Form autoComplete="off">
                  <h4 className="mb-10 text-center font-semibold">
                    Enter Your Registered Email
                  </h4>
                  <Alert />
                  <div>
                    <div
                      className={`relative mt-2 ${
                        props.touched.email && props.errors.email
                          ? "mb-1"
                          : "mb-6"
                      }`}
                    >
                      <Field
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Your registered email*"
                        maxLength="100"
                        autoComplete="off"
                        className="remove-default-focus peer h-10 w-full border-b-2 border-b-cyan-600 p-0 placeholder-transparent placeholder-shown:border-b-gray-400"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-0 -top-3.5 text-xs text-cyan-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-cyan-600"
                      >
                        Your registered email
                      </label>
                    </div>

                    {props.touched.email && props.errors.email && (
                      <div className="mb-6 flex items-center text-xs text-rose-600">
                        <span className="mr-1">{errorIcon}</span>
                        {props.errors.email}
                      </div>
                    )}
                  </div>

                  <div className="text-center">
                    <motion.button
                      variants={variants}
                      whileTap="tap"
                      type="submit"
                      className="mt-5 mb-3 h-12 w-36 rounded-full bg-teal-600 p-3 font-semibold uppercase text-white transition-colors duration-200 ease-in hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
                    >
                      {props.isSubmitting ? (
                        <span className="flex animate-spin justify-center">
                          {loaderIcon}
                        </span>
                      ) : (
                        "GENERATE OTP"
                      )}
                    </motion.button>
                  </div>
                </Form>
              )}
            </Formik>
          </motion.div>
        )}
      </AnimatePresence>

      {!showForm && (
        <motion.div variants={variants} initial="initial" animate="animate">
          <EnterOtp />
        </motion.div>
      )}
    </div>
  );
};

export default EnterEmail;
