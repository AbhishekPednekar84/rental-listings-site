import React, { useEffect } from "react";

// Component imports
import Terms from "@/components/policy/Terms";
import Privacy from "@/components/policy/Privacy";
import Layout from "@/components/layout/Layout";
import TermsHeadLayout from "@/components/layout/head/TermsHeadLayout";

const Policy = () => {
  useEffect(() => {
    window.scroll({ top: 1, left: 1, behavior: "smooth" });
  }, []);

  return (
    <TermsHeadLayout>
      <Layout>
        <section id="terms">
          <Terms />
        </section>
        <section id="privacy">
          <Privacy />
        </section>
      </Layout>
    </TermsHeadLayout>
  );
};

export default Policy;
