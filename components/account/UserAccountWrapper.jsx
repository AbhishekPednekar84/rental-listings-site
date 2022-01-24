import React, { useState, useEffect, useContext } from "react";
import AuthContext from "@/context/auth/authContext";
import SiteContext from "@/context/site/siteContext";

// Component imports
import ProfileUpdate from "@/components/account/ProfileUpdate";
import UserAdSummary from "@/components/account/UserAdSummary";
import UserAds from "@/components/account/UserAds";

const UserAccountWrapper = ({ user, userListings }) => {
  const siteContext = useContext(SiteContext);
  const [listings, setListings] = useState(userListings);

  const token =
    typeof window !== "undefined" &&
    localStorage.getItem("__ros__listings__token");

  return (
    <div className="pt-36 mb-20 px-2 lg:px-10 relative">
      <h1 className="text-center font-bold mb-10 lg:mb-16">
        <span className="underline underline-offset-8 decoration-teal-600 decoration-4">
          My
        </span>{" "}
        Dashboard
      </h1>
      <div className="flex justify-center items-center flex-col lg:flex-row lg:items-start lg:justify-evenly gap-10 lg:gap-0 bg-zinc-50 p-10">
        <ProfileUpdate user={user} token={token} />
        <UserAdSummary listings={listings} user={user} />
      </div>
      <UserAds
        listings={listings}
        setListings={setListings}
        token={token}
        user={user}
        // modalOpen={modalOpen}
        // openModal={openModal}
        // closeModal={closeModal}
      />
    </div>
  );
};

export default UserAccountWrapper;
