import React from "react";
import Image from "next/image";

const ServerError = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h4 className="font-semibold">
        Oops! Someone pulled the plug. We're on it!
      </h4>
      <Image
        src="https://ik.imagekit.io/ykidmzssaww/Listings/site-images/500_I-CnBPce5.svg"
        alt="Server error"
        width={425}
        height={450}
      />
    </div>
  );
};

export default ServerError;
