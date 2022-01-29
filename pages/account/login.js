import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

// Component imports
import Layout from "@/components/layout/Layout";
import Login from "@/components/account/Login";
import LoginHeadLayout from "@/components/layout/head/LoginHeadLayout";

const createListingToast = () => {
  toast("Please login to create a listing", {
    draggablePercent: 60,
  });
};

const logoutToast = () => {
  toast("Please logout to log back in as someone else", {
    draggablePercent: 60,
  });
};

const LoginPage = ({ pathHistory }) => {
  const router = useRouter();

  const pathHistoryProp = pathHistory.current;

  if (pathHistoryProp === "/listings/create") {
    setTimeout(() => createListingToast(), 500);
  }

  if (
    typeof window !== "undefined" &&
    localStorage.getItem("__ros__listing__token")
  ) {
    logoutToast();
    setTimeout(() => router.push("/"), 2000);

    return null;
  } else {
    return (
      <LoginHeadLayout>
        <Layout textColor="gray-700">
          <Login pathHistoryProp={pathHistory.current} />
        </Layout>
      </LoginHeadLayout>
    );
  }
};

export const getServerSideProps = async ({ req }) => {
  return {
    props: {
      cookie: null,
    },
  };
};

export default LoginPage;
