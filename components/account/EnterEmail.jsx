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
    <div className="py-32 flex flex-col justify-center items-center bg-zinc-100 via-slate-50 to-white">
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
            className="p-10 shadow-lg bg-white w-[80%] lg:w-[30%]"
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
                  <h4 className="text-center font-semibold mb-10">
                    Enter Your Registered Email
                  </h4>
                  <Alert />
                  <div>
                    <div
                      className={`mt-2 relative ${
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
                        className="remove-default-focus peer border-b-2 placeholder-shown:border-b-gray-400 border-b-cyan-600 h-10 w-full p-0 placeholder-transparent"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-0 -top-3.5 text-cyan-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-cyan-600 peer-focus:text-xs"
                      >
                        Your registered email
                      </label>
                    </div>

                    {props.touched.email && props.errors.email && (
                      <div className="mb-6 text-xs text-rose-600 flex items-center">
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
                      className="mt-5 mb-3 p-3 h-12 w-36 bg-teal-600 text-white font-semibold rounded-full focus:outline-none hover:bg-teal-800 focus:ring-2 focus:ring-offset-2 focus:ring-teal-600 transition-colors duration-200 ease-in uppercase"
                    >
                      {props.isSubmitting ? (
                        <span className="flex justify-center animate-spin">
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
