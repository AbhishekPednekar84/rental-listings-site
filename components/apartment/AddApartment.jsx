import React, { useRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { errorIcon, loaderIcon } from "@/utils/icons";
import emailjs from "@emailjs/browser";

const validationSchema = Yup.object({
  name: Yup.string().required("Apartment name is required"),
  address: Yup.string().required("Apartment address is required"),
});

const AddApartment = ({ message, setMessage }) => {
  const form = useRef();

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          address: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          emailjs
            .sendForm(
              process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
              process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
              form.current,
              process.env.NEXT_PUBLIC_EMAILJS_USER_ID
            )
            .then(
              (result) => {
                setMessage(
                  "Thanks! Your submission is under review. Please check back in 24-48 hours."
                );
                resetForm();
                setSubmitting(false);
              },
              (error) => {
                setMessage(
                  "Oops! Looks like there was some problem. Please try submitting again."
                );
                setSubmitting(false);
              }
            );
        }}
      >
        {(props) => (
          <Form ref={form} autoComplete="off">
            <h4 className="mb-7 text-center font-semibold leading-10">
              <span className="heading-underline">Ad</span>d your apartment
            </h4>
            <div className="mb-7 flex items-center justify-center text-sm">
              <p className="text-center leading-6">
                <span className="mr-1 font-semibold underline decoration-teal-600 decoration-2 underline-offset-4">
                  Pro Tip:
                </span>
                Enter the address listed on{" "}
                <span className="ml-1 font-semibold text-sky-500">G</span>
                <span className="font-semibold text-red-500">o</span>
                <span className="font-semibold text-amber-500">o</span>
                <span className="font-semibold text-sky-500">g</span>
                <span className="font-semibold text-green-500">l</span>
                <span className="mr-1 font-semibold text-red-500">e</span> (if
                available)
              </p>
            </div>
            {/* Apartment name */}
            {message && (
              <div
                className={`mb-7 max-w-sm rounded-md p-2 text-sm font-semibold ${
                  message.includes("Thanks!")
                    ? "bg-teal-100 text-teal-900"
                    : "bg-rose-100 text-rose-900"
                }`}
              >
                {message}
              </div>
            )}

            <div
              className={`relative ${
                props.touched.name && props.errors.name ? "mb-1" : "mb-10"
              }`}
            >
              <Field
                id="name"
                name="name"
                type="text"
                maxLength={50}
                placeholder="Apartment name*"
                maxLength="100"
                autoComplete="off"
                className="remove-default-focus peer h-10 w-full border-b-2 border-b-teal-600 p-0 placeholder-transparent placeholder-shown:border-b-gray-400"
              />
              <label
                htmlFor="name"
                className="absolute left-0 -top-3.5 text-xs text-teal-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-teal-600"
              >
                Apartment Name*
              </label>
            </div>
            {props.touched.name && props.errors.name && (
              <div className="mb-10 flex items-center text-xs text-rose-600">
                <span className="mr-1">{errorIcon}</span>
                {props.errors.name}
              </div>
            )}
            {/* Address */}
            <div
              className={`relative ${
                props.touched.address && props.errors.address ? "mb-1" : "mb-6"
              }`}
            >
              <Field
                as="textarea"
                id="address"
                name="address"
                placeholder="Address*"
                autoComplete="off"
                spellCheck={true}
                rows="7"
                maxLength="2000"
                autoComplete="off"
                className="remove-default-focus-textarea peer w-full border-2 border-teal-600 p-1 placeholder-transparent placeholder-shown:border-gray-400"
              />
              <label
                htmlFor="address"
                className="absolute left-2 -top-5 text-xs text-teal-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-teal-600"
              >
                Address*
              </label>
            </div>
            {props.touched.address && props.errors.address && (
              <div className="mb-6 flex items-center text-xs text-rose-600">
                <span className="mr-1">{errorIcon}</span>
                {props.errors.address}
              </div>
            )}
            <div className="mt-10 flex justify-center">
              <button
                type="submit"
                className="h-12 w-40 rounded-full bg-teal-600 p-3 font-semibold uppercase text-white transition-colors duration-200 ease-in hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
              >
                {props.isSubmitting ? (
                  <span className="flex animate-spin justify-center">
                    {loaderIcon}
                  </span>
                ) : (
                  "ADD APARTMENT"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddApartment;
