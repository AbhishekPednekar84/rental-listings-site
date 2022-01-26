import React, { useEffect } from "react";

// Component imports
import FAQ from "@/components/about/FAQ";
import Layout from "@/components/layout/Layout";
import FAQHeadLayout from "@/components/layout/head/FAQHeadLayout";

const FrequentlyAskedQuestions = () => {
  useEffect(() => {
    window.scroll({ top: 1, left: 1, behavior: "smooth" });
  });

  return (
    <FAQHeadLayout>
      <Layout textColor="gray-700">
        <FAQ />
      </Layout>
    </FAQHeadLayout>
  );
};

export default FrequentlyAskedQuestions;
