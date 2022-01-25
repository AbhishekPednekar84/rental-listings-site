import React from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

// Component imports
import Layout from "@/components/layout/Layout";
import Register from "@/components/account/Register";
import RegisterHeadLayout from "@/components/layout/head/RegisterHeadLayout";

const registerToast = () => {
  toast("Please logout to register with a different account", {
    draggablePercent: 60,
  });
};

const RegisterPage = () => {
  const router = useRouter();

  if (
    typeof window !== "undefined" &&
    localStorage.getItem("__ros__listing__token")
  ) {
    registerToast();
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

export default RegisterPage;
