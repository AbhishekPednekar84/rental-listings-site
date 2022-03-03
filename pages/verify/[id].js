import React, { useEffect, useContext } from "react";
import Link from "next/link";
import AuthContext from "@/context/auth/authContext";
import Image from "next/image";
import axios from "axios";

// Component imports
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const VerifyEmail = ({ validUser }) => {
  const authContext = useContext(AuthContext);

  const { logoutWithoutRedirect } = authContext;

  useEffect(() => {
    logoutWithoutRedirect();
  }, []);

  return (
    <div>
      <Navbar textColor="slate-600" />
      <div className="mb-20 flex flex-col items-center justify-center pt-28">
        {validUser ? (
          <Image
            src="/check.gif"
            alt="Email verified"
            height={300}
            width={300}
          />
        ) : null}

        <div className="my-5 px-5 text-center text-xl">
          Thanks! Your email has been verified.
        </div>
        <div className="text-center text-lg">
          Please{" "}
          <Link href="/account/login">
            <a className="font-semibold text-teal-600 underline decoration-teal-600 decoration-2 underline-offset-2">
              login
            </a>
          </Link>{" "}
          to your account.
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/user/verify/${params.id}`
  );

  if (!res.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      validUser: res.data,
    },
  };
};

export default VerifyEmail;
