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
    <div className="relative mb-20 px-2 pt-36 lg:px-10">
      <h1 className="mb-10 text-center font-bold lg:mb-16">
        <span className="heading-underline">My</span> Dashboard
      </h1>
      <div className="mx-1 flex flex-col items-center justify-center gap-10 bg-gradient-to-b from-slate-100 via-neutral-100 to-zinc-50 p-10 lg:flex-row lg:items-start lg:justify-evenly lg:gap-0">
        <ProfileUpdate user={user} token={token} />
        <UserAdSummary listings={listings} user={user} />
      </div>
      <UserAds
        listings={listings}
        setListings={setListings}
        token={token}
        user={user}
      />
    </div>
  );
};

export default UserAccountWrapper;
