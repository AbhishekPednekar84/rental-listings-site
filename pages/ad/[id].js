import React, { useEffect } from "react";
import axios from "axios";

// Component imports
import Layout from "@/components/layout/Layout";
import FullPageAd from "@/components/listings/FullPageAd";
import FullPageAdHeadLayout from "@/components/layout/head/FullPageAdHeadLayout";

const AdPage = ({ adId, adData, apartmentName, username, pathHistory }) => {
  useEffect(() => {
    window.scroll({
      top: 1,
      left: 1,
      behavior: "smooth",
    });
  }, []);

  pathHistory.current = `/ad/${adId}`;

  return (
    <FullPageAdHeadLayout
      adId={adId}
      adData={adData}
      apartmentName={apartmentName}
      username={username}
    >
      <div className="bg-gradient-to-br from bg-zinc-100 via-slate-50 to-white">
        <Layout textColor="blue-200">
          <FullPageAd
            adData={adData}
            apartmentName={apartmentName}
            username={username}
          />
        </Layout>
      </div>
    </FullPageAdHeadLayout>
  );
};

export const getServerSideProps = async ({ params, req }) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/listings/${params.id}`
  );

  if (res.data.length === 0) {
    return {
      notFound: true,
    };
  }

  if (res.statusText !== "OK") {
    return {
      notFound: true,
    };
  }

  var adData = res.data;

  return {
    props: {
      adId: params.id,
      adData: adData || null,
      apartmentName: adData ? adData.apartment : null,
      username: adData ? adData.user_name : null,
    },
  };
};

export default AdPage;
