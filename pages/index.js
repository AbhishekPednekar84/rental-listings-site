import React from "react";
import Image from "next/image";
import axios from "axios";

// Component imports
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import HomeHeadLayout from "@/components/layout/head/HomeHeadLayout";
import HiddenLink from "@/components/home/HiddenLink";

const index = ({ apartments }) => {
  return (
    <HomeHeadLayout>
      <HiddenLink />
      <Layout>
        <section id="main">
          <Hero apartments={apartments} />{" "}
        </section>
        <section id="how-it-works">
          <HowItWorks />
        </section>
      </Layout>
    </HomeHeadLayout>
  );
};

export const getStaticProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/apartments`);

  const apartments = res.data;

  return {
    props: {
      apartments,
    },
  };
};

export default index;
