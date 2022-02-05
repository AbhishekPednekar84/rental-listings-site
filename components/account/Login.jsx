import React, { useContext, useEffect } from "react";
import Link from "next/link";
import AuthContext from "@/context/auth/authContext";
import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { loaderIcon, errorIcon } from "@/utils/icons";
import { toast } from "react-toastify";
import greeting from "@/utils/greeting";

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
  toast(`${greeting()}, ${name}!`, {
    draggablePercent: 60,
  });
};

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
      loginToast(user.name);
      if (pathHistoryProp) {
        setTimeout(() => router.push(`${pathHistoryProp}`), 1000);
      } else {
        setTimeout(
          () => router.push(`/account/dashboard/${user && user.id}`),
          1000
        );
      }
    }
  }, [user]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 via-slate-50 to-white pt-10">
      <div className="my-20 mx-5 w-[400px] overflow-hidden bg-white shadow-xl">
        <div className="rounded-bl-4xl relative h-52 bg-loginHero bg-bottom">
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

        <div className="bg-white px-2 py-8 lg:px-5">
          <h1>
            <span className="heading-underline">We</span>
            lcome back!
          </h1>

          <div className="mx-5">
            <Alert />
          </div>

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
              setTimeout(() => setSubmitting(false), 1000);
            }}
          >
            {(props) => (
              <Form autoComplete="off">
                <div className="grid grid-cols-1 px-6">
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
                      className="remove-default-focus peer h-10 w-full border-b-2 border-b-teal-600 p-0 placeholder-transparent placeholder-shown:border-b-gray-400"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-xs text-teal-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-teal-600"
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
                      className="remove-default-focus peer h-10 w-full border-b-2 border-b-teal-600 p-0 placeholder-transparent placeholder-shown:border-b-gray-400"
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-xs text-teal-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-teal-600"
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

                  <button
                    type="submit"
                    className="mt-5 mb-3 h-12 rounded-full bg-teal-600 p-3 font-semibold text-white transition-colors duration-200 ease-in hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
                    disabled={props.isSubmitting || isAuthenticated}
                  >
                    {props.isSubmitting ? (
                      <span className="flex items-center justify-center">
                        PLEASE WAIT
                        <span className="ml-1 animate-spin">{loaderIcon}</span>
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
            <p className="text-center text-sm">
              <Link href="/forgotpassword">
                <a className="text-teal-600 underline decoration-teal-600 decoration-2 underline-offset-8">
                  Forgot Password?
                </a>
              </Link>
            </p>
          </div>
          <div className="mt-7">
            <p className="text-center text-sm">
              Don't have an account?{" "}
              <Link href="/account/register">
                <a className="text-cyan-600 underline decoration-cyan-600 decoration-2 underline-offset-8">
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
