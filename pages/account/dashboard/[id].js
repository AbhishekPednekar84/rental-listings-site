import React, { useEffect, useContext } from "react";
import AuthContext from "@/context/auth/authContext";
import { useRouter } from "next/router";
import axios from "axios";

// Component imports
import Layout from "@/components/layout/Layout";
import UserAccountWrapper from "@/components/account/UserAccountWrapper";
import UserAccountHeadLayout from "@/components/layout/head/UserAccountHeadLayout";

const Dashboard = ({ user, userListings }) => {
  const router = useRouter();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !localStorage.getItem("__ros__listing__token")
    ) {
      router.push("/404");
    }
  }, []);

  return (
    <UserAccountHeadLayout user={user}>
      <Layout textColor="gray-700">
        <UserAccountWrapper user={user} userListings={userListings} />
      </Layout>
    </UserAccountHeadLayout>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { id } = params;

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`);

  const user = res.data;

  if (res.statusText === "OK") {
    const listingRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/listings/${user.id}`
    );

    var listing = listingRes.data;
  }

  return {
    props: {
      user,
      userListings: listing,
    },
  };
};

export default Dashboard;
