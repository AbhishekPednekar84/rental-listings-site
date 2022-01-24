import React, { useContext, useEffect } from "react";
import Link from "next/link";
import AuthContext from "@/context/auth/authContext";
import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { loaderIcon } from "@/utils/icons";
import { toast } from "react-toastify";

// Component import
import Alert from "@/components/common/Alert";

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Email is not valid")
    .trim(),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password should be at least 8 characters")
    .trim(),
});

const loginToast = (name) => {
  toast(`Welcome ${name}!`, {
    draggablePercent: 60,
  });
};

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

const Login = ({ pathHistoryProp }) => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const { loading, login, setLoading, isAuthenticated, getCurrentUser, user } =
    authContext;

  useEffect(() => {
    if (isAuthenticated) {
      getCurrentUser();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (user) {
      if (pathHistoryProp) {
        setTimeout(() => router.push(`${pathHistoryProp}`), 1000);
      } else {
        loginToast(user.name);
        setTimeout(
          () => router.push(`/account/dashboard/${user && user.id}`),
          1000
        );
      }
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-zinc-100 via-slate-50 to-white flex justify-center items-center pt-10">
      <div className="w-[400px] bg-white overflow-hidden shadow-xl my-20 mx-5">
        <div className="relative h-52 bg-loginHero bg-bottom rounded-bl-4xl">
          <svg
            className="absolute -bottom-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>

        <div className="px-10 py-8 bg-white">
          <h1>
            <span className="heading-underline">We</span>
            lcome back!
          </h1>

          <Alert />
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              setLoading();
              login(values.email, values.password);
              setSubmitting(false);
            }}
          >
            {(props) => (
              <Form autoComplete="off">
                <div className="grid grid-cols-1">
                  <div
                    className={`relative ${
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
                      className="remove-default-focus peer border-b-2 placeholder-shown:border-b-gray-400 border-b-teal-600 h-10 w-full p-0 placeholder-transparent"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-teal-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-teal-600 peer-focus:text-xs"
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
                      className="remove-default-focus peer border-b-2 placeholder-shown:border-b-gray-400 border-b-teal-600 h-10 w-full p-0 placeholder-transparent"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-teal-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-teal-600 peer-focus:text-xs"
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
                    className="mt-5 mb-3 p-3 h-12 bg-teal-600 text-white font-semibold rounded-full focus:outline-none hover:bg-teal-800 focus:ring-2 focus:ring-offset-2 focus:ring-teal-600 transition-colors duration-200 ease-in"
                  >
                    {loading ? (
                      <span className="flex justify-center animate-spin">
                        {loaderIcon}
                      </span>
                    ) : (
                      "LOGIN"
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <div className="mt-3">
            <p className="text-sm text-center">
              <Link href="/forgotpassword">
                <a className="text-teal-600 underline underline-offset-8 decoration-teal-600 decoration-2">
                  Forgot Password?
                </a>
              </Link>
            </p>
          </div>
          <div className="mt-7">
            <p className="text-sm text-center">
              Don't have an account?{" "}
              <Link href="/account/register">
                <a className="text-cyan-600 underline underline-offset-8 decoration-cyan-600 decoration-2">
                  Sign Up
                </a>
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
