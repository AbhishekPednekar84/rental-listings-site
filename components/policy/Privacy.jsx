import React from "react";

const Privacy = () => {
  return (
    <div className="flex flex-col justify-center mb-20">
      <h2 className="mb-10 text-4xl font-bold text-center">
        <span className="heading-underline">Pr</span>ivacy Policy
      </h2>
      <div className="px-5 lg:px-20">
        <div className="mb-10">
          <p className="mb-5">
            We are committed to taking your privacy very seriously. This
            commitment begins with a least-privilege philosophy: at the time of
            registration, we only require you to provide your name and email
            address as those are needed for you to use the website. Your email
            remains invisible to other registered users or site visitors at all
            times.
          </p>
          <p>
            Providing a mobile number is mandatory at the time of creating a
            listing. This is needed so that home seekers can contact you. Your
            full mobile number is displayed only to other registered users.
          </p>
        </div>

        <div className="mb-10">
          <h4 className="font-semibold mb-3">Information Sharing</h4>
          <p>
            Your information is safe and private with us. It will never be
            shared (or sold) with anyone unless required by law.
          </p>
        </div>

        <div className="mb-10">
          <h4 className="font-semibold mb-3">Erasure</h4>
          <p>
            We make it simple to permanently delete your account and all the
            active listings associated with it. A{" "}
            <span className="text-rose-600 font-semibold">Delete Account</span>{" "}
            button is available on your dashboard page.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Data Retention</h4>
          <p>
            We retain your account information, ad and chat related data unless
            you explicitly delete your account as described above.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
