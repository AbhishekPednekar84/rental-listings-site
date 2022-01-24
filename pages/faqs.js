import React from "react";

// Component imports
import FAQ from "@/components/about/FAQ";
import Layout from "@/components/layout/Layout";
import FAQHeadLayout from "@/components/layout/head/FAQHeadLayout";

const FrequentlyAskedQuestions = () => {
  return (
    <FAQHeadLayout>
      <Layout textColor="gray-700">
        <FAQ />
      </Layout>
    </FAQHeadLayout>
  );
};

export default FrequentlyAskedQuestions;
