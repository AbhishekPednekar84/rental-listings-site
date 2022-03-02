import React from "react";
import {
  maleIcon,
  femaleIcon,
  petIcon,
  familyIcon,
  thumbsUpIcon,
  prayingHandsIcon,
} from "@/utils/icons";

const Tags = ({ tenantPreference, petsAllowed, nonVegetarians }) => {
  const tenantTag =
    tenantPreference === "Anyone" || tenantPreference === null
      ? "Families Bachelors Bachelorette's"
      : tenantPreference === "BB"
      ? "Bachelors Bachelorette's"
      : tenantPreference + " Only";

  const petsTag = petsAllowed ? "Pets Welcome" : "No Pets Please";

  const nvTag = nonVegetarians ? `Non Vegetarians` : "Vegetarians Only";

  return (
    <div className="mx-2 grid grid-cols-1 items-start ">
      <div
        className={`grid gap-2 lg:gap-7 ${
          tenantPreference === "Anyone"
            ? "grid-cols-2 print:grid-cols-3 md:grid-cols-3 lg:grid-cols-5"
            : tenantPreference === "BB"
            ? "grid-cols-2 print:grid-cols-3 md:grid-cols-3 lg:grid-cols-4"
            : "grid-cols-2 print:grid-cols-3 md:grid-cols-3"
        }`}
      >
        {tenantTag === "Families Bachelors Bachelorette's" ||
        tenantPreference === "BB" ? (
          tenantTag.split(" ").map((tenant) => (
            <span
              className={`${
                tenant === "Bachelors"
                  ? "bg-pink-100"
                  : tenant === "Bachelorette's"
                  ? "bg-fuchsia-100"
                  : "bg-sky-100"
              } flex h-12 items-center justify-center gap-1 p-2 text-xs font-semibold text-black lg:text-sm`}
            >
              {tenant === "Bachelors" && maleIcon}
              {tenant === "Bachelorette's" && femaleIcon}
              {tenant === "Families" && familyIcon} {tenant}
            </span>
          ))
        ) : (
          <span className="flex h-12 items-center justify-center gap-1 bg-cyan-100 p-2 text-xs font-semibold text-black lg:text-sm">
            {tenantPreference === "Bachelors" && maleIcon}
            {tenantPreference === "Bachelorette's" && femaleIcon}
            {tenantPreference === "Families" && familyIcon} {tenantTag}
          </span>
        )}

        <div className="flex h-12 items-center justify-center gap-0 bg-lime-100 p-2 text-xs font-semibold text-black md:gap-1 lg:text-sm">
          {petsAllowed && petIcon} {petsTag} {!petsAllowed && prayingHandsIcon}
        </div>
        <div
          className={`${
            nvTag.startsWith("Non") ? "bg-amber-100" : "bg-green-100"
          } flex h-12 items-center justify-center gap-0 p-2 text-xs font-semibold text-black lg:text-sm`}
        >
          {nvTag}
          {nonVegetarians && " OK!!"}
        </div>
      </div>
    </div>
  );
};

export default Tags;
