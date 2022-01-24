import React, { useState, useContext, useEffect } from "react";
import AuthContext from "@/context/auth/authContext";
import SiteContext from "@/context/site/siteContext";
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

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
});

const ProfileUpdate = ({ user }) => {
  const [editForm, setEditForm] = useState(false);
  const [textChanged, setTextChanged] = useState(false);

  const authContext = useContext(AuthContext);

  const { updateProfile, profileImage, generateUserProfileImage } = authContext;

  useEffect(() => {
    if (user && user) {
      generateUserProfileImage(user.name);
    }
  }, [user]);

  return (
    <div className="w-11/12 lg:w-1/3">
      <div className="flex flex-col justify-center items-center bg-white py-10 px-5 shadow-lg hover:shadow-xl">
        <h5 className="mb-10 text-lg text-center">
          Your registered email:{" "}
          <span className="text-teal-600 font-semibold">{user.email}</span>
        </h5>

        <div className="w-32 mb-10">
          <div
            dangerouslySetInnerHTML={{ __html: profileImage }}
            className="border-2 border-teal-200 rounded-full p-1"
          ></div>
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
                      className="absolute left-0 -top-3.5 text-cyan-600 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-cyan-600 peer-focus:text-xs"
                    >
                      Name
                    </label>
                  </div>

                  {editForm ? (
                    <p className="flex text-xs items-center">
                      Update your name and click {checkIconAltSmall}
                    </p>
                  ) : null}

                  {props.touched.name && props.errors.name && (
                    <div className="mt-2 text-xs text-rose-600 flex items-center">
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
