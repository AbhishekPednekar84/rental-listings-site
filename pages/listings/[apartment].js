import React from "react";
import axios from "axios";

// Component imports
import Layout from "@/components/layout/Layout";
import Hero from "@/components/listings/Hero";
import Filter from "@/components/listings/Filter";
import ApartmentListings from "@/components/listings/ApartmentListings";
import ApartmentListingsHeadLayout from "@/components/layout/head/ApartmentListingsHeadLayout";

const Listings = ({ apartmentName, apartmentInfo }) => {
  return (
    <ApartmentListingsHeadLayout
      apartmentName={apartmentName}
      apartmentInfo={apartmentInfo}
    >
      <Layout>
        <Hero apartmentName={apartmentName} apartmentInfo={apartmentInfo} />
        <Filter apartmentName={apartmentName} />
        <ApartmentListings apartmentName={apartmentName} />
      </Layout>
    </ApartmentListingsHeadLayout>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/apartment/${params.apartment}`
  );

  const apartmentData = res.data;

  return {
    props: {
      apartmentName: params.apartment,
      apartmentInfo: apartmentData,
    },
  };
};

export default Listings;
