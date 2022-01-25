import React from "react";

const Terms = () => {
  return (
    <div className="flex flex-col justify-center mb-10">
      <h1 className="mb-10 text-center mt-32">
        <span className="heading-underline">Te</span>rms of Use
      </h1>
      <div className="px-5 lg:px-20">
        <div className="mb-10">
          <p className="mb-5">
            This section defines the terms of use under which you may use{" "}
            <span className="text-teal-600 font-semibold">
              rentorsale.apartments
            </span>{" "}
            or any of its sub-domains as a site visitor or a registered user.
          </p>
          <p className="mb-5">
            Please read these Terms carefully and make sure that you understand
            them before using{" "}
            <span className="text-teal-600 font-semibold">
              rentorsale.apartments
            </span>
            . By using{" "}
            <span className="text-teal-600 font-semibold">
              rentorsale.apartments
            </span>
            , you indicate that you accept these Terms and agree to abide by
            them. If you do not agree to these Terms, please do not use{" "}
            <span className="text-teal-600 font-semibold">
              rentorsale.apartments
            </span>
          </p>
          <p>
            If you apply to become a Registered User, you imply that you{" "}
            <span className="heading-underline underline-offset-2 decoration-2">
              accept
            </span>{" "}
            these Terms.
          </p>
        </div>

        <div className="mb-10">
          <h4 className="font-semibold mb-3">Listings</h4>
          <p className="mb-5">
            <span className="text-teal-600 font-semibold">
              rentorsale.apartments
            </span>{" "}
            is a free platform for homeowners to list their property for either
            rent or sale. One of the main ideas behind the site is to enable
            home seekers to find listings in a particular apartment complex with
            ease.{" "}
            <span className="text-teal-600 font-semibold">
              rentorsale.apartments
            </span>{" "}
            does not verify or confirm the legitimacy of the listings. We merely
            provide the platform for creating and browsing through listings.
            Individuals must do their due diligence to ensure that any listings
            they are interested in meet their requirements in every possible
            way.
          </p>
          <p className="mb-5">
            Any deals or transactions between two parties will remain private
            between the parties.{" "}
            <span className="text-teal-600 font-semibold">
              rentorsale.apartments
            </span>{" "}
            will not receive any percentage of the transaction amount.
          </p>
          <p>
            Listings posted by registered users should be relevant and keep in
            line with the underlying idea of the website. Any listings deemed
            inappropriate will be taken down without any prior notice.
          </p>
        </div>

        <div className="mb-10">
          <h4 className="font-semibold mb-3">Your Account</h4>
          <p className="mb-5">
            You are responsible for any use of{" "}
            <span className="text-teal-600 font-semibold">
              rentorsale.apartments
            </span>{" "}
            under your password and login details. We have no responsibility for
            such use. Your registered email address will be the default channel
            for{" "}
            <span className="text-teal-600 font-semibold">
              rentorsale.apartments
            </span>{" "}
            to send you notifications like password reset OTP's.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Content Monitoring</h4>
          <p className="mb-5">
            <span className="text-teal-600 font-semibold">
              rentorsale.apartments
            </span>{" "}
            is under no obligation to monitor the activity of a registered user.
            Listings will not undergo moderation at the time of creation. We
            may, however, take listings down at any time (without prior notice)
            if deemed inappropriate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
