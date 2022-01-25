import React, { useEffect } from "react";
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

export const getServerSideProps = async ({ params, req }) => {
  const { id } = params;

  const rosToken = req.cookies.__ros__listing__token;

  if (!rosToken) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, {
    headers: {
      "Authorization": "Bearer " + req.cookies.__ros__listing__token,
    },
  });

  const user = res.data;

  if (!user) {
    return {
      notFound: true,
    };
  }

  if (res.statusText === "OK") {
    const listingRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/listings/${user.id}`,
      {
        headers: {
          "Authorization": "Bearer " + req.cookies.__ros__listing__token,
        },
      }
    );

    var listing = listingRes.data;
  }

  return {
    props: {
      user: user,
      userListings: listing,
    },
  };
};

export default Dashboard;
