import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";

// Component imports
import Layout from "@/components/layout/Layout";
import AddListing from "@/components/listings/AddListing";
import CreateListingHeadLayout from "@/components/layout/head/CreateListingHeadLayout";

const CreateListing = ({ apartment, pathHistory }) => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("_searchedApartment");
    }
  }, []);

  if (
    typeof window !== "undefined" &&
    !localStorage.getItem("__ros__listing__token")
  ) {
    pathHistory.current = router.pathname;

    if (process.browser) {
      router.push("/account/login");
    }

    return <div></div>;
  }

  return (
    <CreateListingHeadLayout>
      <Layout textColor="gray-700">
        <AddListing apartment={apartment} />
      </Layout>
    </CreateListingHeadLayout>
  );
};

export const getServerSideProps = async ({ req, params }) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/apartment/id/${params.id}`
  );

  const apartment = res.data;

  return {
    props: {
      apartment,
    },
  };
};

export default CreateListing;
