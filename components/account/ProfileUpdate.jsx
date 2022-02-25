import React, { useState, useContext, useEffect } from "react";
import AuthContext from "@/context/auth/authContext";
import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  editIcon,
  checkIconAlt,
  checkIconAltSmall,
  loaderIcon,
  errorIcon,
  cancelIcon,
} from "@/utils/icons";
import { sessionExpiredToast } from "@/utils/toasts";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
});

const ProfileUpdate = ({ user }) => {
  const [editForm, setEditForm] = useState(false);
  const [textChanged, setTextChanged] = useState(false);
  const router = useRouter();

  const authContext = useContext(AuthContext);

  const {
    updateProfile,
    profileImage,
    generateUserProfileImage,
    authError,
    logout,
  } = authContext;

  useEffect(() => {
    if (user && user) {
      generateUserProfileImage(user.name);
    }
  }, [user]);

  useEffect(() => {
    if (authError === "Token expired") {
      logout();
      sessionExpiredToast();
      setTimeout(() => router.push("/account/login"), 3000);
    }
  }, [authError]);

  return (
    <div className="w-[300px] lg:w-[600px]">
      <div className="flex flex-col items-center justify-center bg-white py-10 px-5 shadow-lg hover:shadow-xl">
        <h5 className="mb-10 text-center text-lg">
          Your registered email:{" "}
          <span className="font-semibold text-teal-600">{user.email}</span>
        </h5>

        <div className="mb-10 w-32">
          <div dangerouslySetInnerHTML={{ __html: profileImage }}></div>
        </div>

        <Formik
          initialValues={{
            name: user.name,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            setEditForm(false);
            updateProfile(user.id, values.name);
            setSubmitting(false);
          }}
        >
          {(props) => (
            <Form>
              <div className="flex items-center justify-evenly gap-2">
                <div>
                  <div
                    className={`relative ${
                      props.touched.name && props.errors.name ? "mb-1" : "mb-1"
                    }`}
                  >
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Name*"
                      maxLength="100"
                      autoComplete="off"
                      disabled={!editForm}
                      className={`remove-default-focus peer border-b-2 ${
                        editForm ? "border-b-cyan-600" : "border-b-gray-400"
                      } h-10 w-full p-0 placeholder-transparent`}
                      onKeyUp={() => setTextChanged(true)}
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 -top-3.5 text-xs text-cyan-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-cyan-600"
                    >
                      Name
                    </label>
                  </div>

                  {editForm ? (
                    <p className="flex items-center text-xs">
                      Update your name and click {checkIconAltSmall}
                    </p>
                  ) : null}

                  {props.touched.name && props.errors.name && (
                    <div className="mt-2 flex items-center text-xs text-rose-600">
                      <span className="mr-1">{errorIcon}</span>
                      {props.errors.name}
                    </div>
                  )}
                </div>

                <div>
                  {!editForm && (
                    <button onClick={() => setEditForm(true)}>
                      {editIcon}
                    </button>
                  )}
                  {editForm && (
                    <div>
                      <button type="submit" disabled={!textChanged}>
                        {props.isSubmitting ? (
                          <span className="animate-spin">{loaderIcon}</span>
                        ) : (
                          <span className="text-teal-600">{checkIconAlt}</span>
                        )}
                      </button>
                      <button
                        className="ml-1 text-rose-600"
                        onClick={() => setEditForm(false)}
                      >
                        {cancelIcon}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProfileUpdate;
