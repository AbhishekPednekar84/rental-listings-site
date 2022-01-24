import React from "react";
import Image from "next/image";
import axios from "axios";

// Component imports
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import HomeHeadLayout from "@/components/layout/head/HomeHeadLayout";

const index = ({ apartments }) => {
  return (
    <HomeHeadLayout>
      <Layout>
        <section>
          <Hero apartments={apartments} />{" "}
        </section>
        <section>
          <HowItWorks />
        </section>
      </Layout>
    </HomeHeadLayout>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/apartments`);

  const apartments = res.data;

  return {
    props: {
      apartments,
    },
  };
};

export default index;
