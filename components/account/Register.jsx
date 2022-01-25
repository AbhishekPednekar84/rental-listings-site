import React, { useContext, useEffect } from "react";
import AuthContext from "@/context/auth/authContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { errorIcon } from "@/utils/icons";

// Component imports
import Alert from "@/components/common/Alert";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required").trim(),
  email: Yup.string()
    .required("Email is required")
    .email("Email is not valid")
    .trim(),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password should be at least 8 characters")
    .trim(),
});

const loaderIcon = (
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
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    ></path>
  </svg>
);

const Register = () => {
  const authContext = useContext(AuthContext);
  const { register, loading, setLoading, isAuthenticated } = authContext;
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => router.push("/"), 1000);
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-zinc-100 via-slate-50 to-white flex justify-center items-center pt-10">
      <div className="w-96 bg-white overflow-hidden shadow-xl my-20 mx-5">
        <div className="relative h-52 bg-registerHero bg-cover border-b-transparent">
          <svg
            className="absolute -bottom-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#FFFFFF"
              fillOpacity="1"
              d="M0,192L60,192C120,192,240,192,360,170.7C480,149,600,107,720,117.3C840,128,960,192,1080,197.3C1200,203,1320,149,1380,122.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
        </div>

        <div className="px-10 py-8 bg-white">
          <h1>
            <span className="heading-underline">Le</span>
            t's Begin!
          </h1>

          <Alert />

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              setLoading();
              register(values.name, values.email, values.password);
              setSubmitting(false);
            }}
          >
            {(props) => (
              <Form autoComplete="off">
                <div className="grid grid-cols-1">
                  <div
                    className={`relative ${
                      props.touched.name && props.errors.name ? "mb-1" : "mb-6"
                    }`}
                  >
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Name*"
                      maxLength="100"
                      autoComplete="off"
                      className="remove-default-focus peer border-b-2 placeholder-shown:border-b-gray-400 border-b-cyan-600 h-10 w-full p-0 placeholder-transparent"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 -top-3.5 text-cyan-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-cyan-600 peer-focus:text-xs"
                    >
                      Name
                    </label>
                  </div>

                  {props.touched.name && props.errors.name && (
                    <div className="mb-6 text-xs text-rose-600 flex items-center">
                      <span className="mr-1">{errorIcon}</span>
                      {props.errors.name}
                    </div>
                  )}

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
                      placeholder="Email Address*"
                      maxLength="100"
                      autoComplete="off"
                      className="remove-default-focus peer border-b-2 placeholder-shown:border-b-gray-400 border-b-cyan-600 h-10 w-full p-0 placeholder-transparent"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-cyan-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-cyan-600 peer-focus:text-xs"
                    >
                      Email Address
                    </label>
                  </div>

                  {props.touched.email && props.errors.email && (
                    <div className="mb-6 text-xs text-rose-600 flex items-center">
                      <span className="mr-1">{errorIcon}</span>
                      {props.errors.email}
                    </div>
                  )}

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
                      placeholder="Password*"
                      maxLength="100"
                      autoComplete="off"
                      className="remove-default-focus peer border-b-2 placeholder-shown:border-b-gray-400 border-b-cyan-600 h-10 w-full p-0 placeholder-transparent"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-cyan-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-cyan-600 peer-focus:text-xs"
                    >
                      Password
                    </label>
                  </div>

                  {props.touched.password && props.errors.password && (
                    <div className="mb-6 text-xs text-rose-600 flex items-center">
                      <span className="mr-1">{errorIcon}</span>
                      {props.errors.password}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="mt-5 mb-3 p-3 h-12 bg-cyan-600 text-white font-semibold rounded-full focus:outline-none hover:bg-cyan-800 focus:ring-2 focus:ring-offset-2 focus:ring-cyan-600 transition-colors duration-200 ease-in"
                  >
                    {loading ? (
                      <span className="flex justify-center animate-spin">
                        {loaderIcon}
                      </span>
                    ) : (
                      "SIGN UP"
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="mt-3">
            <p className="text-sm text-center">
              Already have an account?{" "}
              <Link href="/account/login">
                <a className="text-teal-600 underline underline-offset-8 decoration-teal-600 decoration-2">
                  Login
                </a>
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
