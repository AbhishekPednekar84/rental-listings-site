import React, { useRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { errorIcon, starIconSmall } from "@/utils/icons";
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
            <h3 className="font-semibold mb-3 text-center">
              Add your apartment
            </h3>
            <div className="text-sm mb-7 flex justify-center items-center">
              <p className="text-center">
                <span className="font-semibold mr-1 underline underline-offset-4 decoration-teal-600 decoration-2">
                  Pro Tip:
                </span>
                Enter the address listed on{" "}
                <span className="font-semibold text-sky-500 ml-1">G</span>
                <span className="font-semibold text-red-500">o</span>
                <span className="font-semibold text-amber-500">o</span>
                <span className="font-semibold text-sky-500">g</span>
                <span className="font-semibold text-green-500">l</span>
                <span className="font-semibold text-red-500 mr-1">e</span> (if
                available)
              </p>
            </div>
            {/* Apartment name */}
            {message && (
              <div
                className={`max-w-sm text-sm p-2 mb-7 font-medium rounded-md ${
                  message.includes("Thanks!") ? "bg-teal-100" : "bg-rose-100"
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
                className="remove-default-focus peer border-b-2 placeholder-shown:border-b-gray-400 border-b-teal-600 h-10 w-full p-0 placeholder-transparent"
              />
              <label
                htmlFor="name"
                className="absolute left-0 -top-3.5 text-teal-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-teal-600 peer-focus:text-xs"
              >
                Apartment Name*
              </label>
            </div>
            {props.touched.name && props.errors.name && (
              <div className="mb-10 text-xs text-rose-600 flex items-center">
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
                className="remove-default-focus-textarea peer border-2 placeholder-shown:border-gray-400 border-teal-600 w-full p-1 placeholder-transparent"
              />
              <label
                htmlFor="address"
                className="absolute left-2 -top-5 text-teal-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-teal-600 peer-focus:text-xs"
              >
                Address*
              </label>
            </div>
            {props.touched.address && props.errors.address && (
              <div className="mb-6 text-xs text-rose-600 flex items-center">
                <span className="mr-1">{errorIcon}</span>
                {props.errors.address}
              </div>
            )}
            <div className="mt-10 flex justify-center">
              <button
                type="submit"
                className="p-3 w-40 h-12 bg-teal-600 text-white font-semibold rounded-full focus:outline-none hover:bg-teal-800 focus:ring-2 focus:ring-offset-2 focus:ring-teal-600 transition-colors duration-200 ease-in"
              >
                ADD APARTMENT
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddApartment;
