import React, { useContext, useEffect, createRef } from "react";
import AuthContext from "@/context/auth/authContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { errorIcon, loaderIcon } from "@/utils/icons";
import ReCAPTCHA from "react-google-recaptcha";

// Component imports
import Alert from "@/components/common/Alert";
import Declaration from "../common/Declaration";

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

const Register = () => {
  const authContext = useContext(AuthContext);
  const recaptchaRef = createRef();
  const { register, loading, setLoading, isAuthenticated } = authContext;
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => router.push("/"), 1000);
    }
  }, [isAuthenticated]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 via-slate-50 to-white pt-10">
      <div className="my-20 mx-5 w-96 overflow-hidden bg-white shadow-xl">
        <div className="relative h-52 border-b-transparent bg-registerHero bg-cover bg-center">
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

        <div className="bg-white px-2 py-8 lg:px-5">
          <h1>
            <span className="heading-underline">Le</span>
            t's Begin!
          </h1>

          <div className="mx-5">
            <Alert />
          </div>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              recaptchaRef.current.execute();
              setLoading();
              register(values.name, values.email, values.password);
              setTimeout(() => setSubmitting(false), 1000);
            }}
          >
            {(props) => (
              <Form autoComplete="off">
                <div className="grid grid-cols-1 px-6">
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
                      className="remove-default-focus peer h-10 w-full border-b-2 border-b-cyan-600 p-0 placeholder-transparent placeholder-shown:border-b-gray-400"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 -top-3.5 text-xs text-cyan-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-cyan-600"
                    >
                      Name
                    </label>
                  </div>

                  {props.touched.name && props.errors.name && (
                    <div className="mb-6 flex items-center text-xs text-rose-600">
                      <span className="mr-1">{errorIcon}</span>
                      {props.errors.name}
                    </div>
                  )}

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
                      placeholder="Email Address*"
                      maxLength="100"
                      autoComplete="off"
                      className="remove-default-focus peer h-10 w-full border-b-2 border-b-cyan-600 p-0 placeholder-transparent placeholder-shown:border-b-gray-400"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-xs text-cyan-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-cyan-600"
                    >
                      Email Address
                    </label>
                  </div>

                  {props.touched.email && props.errors.email && (
                    <div className="mb-6 flex items-center text-xs text-rose-600">
                      <span className="mr-1">{errorIcon}</span>
                      {props.errors.email}
                    </div>
                  )}

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
                      placeholder="Password*"
                      maxLength="100"
                      autoComplete="off"
                      className="remove-default-focus peer h-10 w-full border-b-2 border-b-cyan-600 p-0 placeholder-transparent placeholder-shown:border-b-gray-400"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-xs text-cyan-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-cyan-600"
                    >
                      Password
                    </label>
                  </div>

                  {props.touched.password && props.errors.password && (
                    <div className="mb-6 flex items-center text-xs text-rose-600">
                      <span className="mr-1">{errorIcon}</span>
                      {props.errors.password}
                    </div>
                  )}

                  <div className="z-[100]">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      size="invisible"
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    />
                  </div>

                  <Declaration message="signing up" />

                  <button
                    type="submit"
                    className="mt-5 mb-3 h-12 rounded-full bg-cyan-600 p-3 font-semibold text-white transition-colors duration-200 ease-in hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2"
                    disabled={props.isSubmitting || isAuthenticated}
                  >
                    {props.isSubmitting ? (
                      <span className="flex items-center justify-center">
                        PLEASE WAIT
                        <span className="ml-1 animate-spin">{loaderIcon}</span>
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
            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/account/login">
                <a className="text-teal-600 underline decoration-teal-600 decoration-2 underline-offset-8">
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
