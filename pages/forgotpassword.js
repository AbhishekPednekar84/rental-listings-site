import React from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

// Component imports
import EnterEmail from "@/components/account/EnterEmail";
import Layout from "@/components/layout/Layout";
import ChangePasswordHeadLayout from "@/components/layout/head/ChangePasswordHeadLayout";

const logoutToast = () => {
  toast("Looks like you are already logged in", {
    draggablePercent: 60,
  });
};

const ForgotPassword = () => {
  const router = useRouter();

  if (
    typeof window !== "undefined" &&
    localStorage.getItem("__ros__listing__token")
  ) {
    logoutToast();
    setTimeout(() => router.push("/"), 2000);

    return null;
  } else {
    return (
      <ChangePasswordHeadLayout>
        <Layout textColor="gray-700">
          <EnterEmail />
        </Layout>
      </ChangePasswordHeadLayout>
    );
  }
};

export default ForgotPassword;
