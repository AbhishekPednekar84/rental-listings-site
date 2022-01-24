import React from "react";
import { useRouter } from "next/router";

// Component imports
import Layout from "@/components/layout/Layout";
import Register from "@/components/account/Register";
import RegisterHeadLayout from "@/components/layout/head/RegisterHeadLayout";

const RegisterPage = () => {
  const router = useRouter();

  if (
    typeof window !== "undefined" &&
    localStorage.getItem("__ros__listing__token")
  ) {
    toast.warning("Please logout to register with a different account");
    setTimeout(() => router.push("/"), 2000);

    return null;
  } else {
    return (
      <RegisterHeadLayout>
        <Layout textColor="gray-700">
          <Register />
        </Layout>
      </RegisterHeadLayout>
    );
  }
};

export const getServerSideProps = ({ req }) => {
  if (req.headers.cookie) {
    return {
      notFound: true,
    };
  }

  const token = req.headers.cookie;

  return {
    props: {
      token: null,
    },
  };
};

export default RegisterPage;
