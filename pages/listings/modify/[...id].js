import React, { useState, useEffect, useContext } from "react";
import AuthContext from "@/context/auth/authContext";
import axios from "axios";
import { useRouter } from "next/router";

// Component imports
import Layout from "@/components/layout/Layout";
import EditListing from "@/components/listings/EditListing";
import ModifyListingHeadLayout from "@/components/layout/head/ModifyListingHeadLayout";

const CreateListing = ({
  listingId,
  listingInfo,
  imagePath,
  selectedApartmentInfo,
}) => {
  const [imgList, setImgList] = useState(imagePath);
  const authContext = useContext(AuthContext);
  const { getCurrentUser, user, isAuthenticated } = authContext;
  const router = useRouter();

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (user && user) {
      if (user.id !== listingInfo.user_id) {
        router.push("/404");
      }
    }
  }, [user]);

  return (
    <ModifyListingHeadLayout listingId={listingId} listingInfo={listingInfo}>
      <Layout textColor="gray-700">
        <EditListing
          listingId={listingId}
          listingInfo={listingInfo}
          imgList={imgList}
          setImgList={setImgList}
          selectedApartmentInfo={selectedApartmentInfo}
        />
      </Layout>
    </ModifyListingHeadLayout>
  );
};

export const getServerSideProps = async ({ req, params }) => {
  const listingModificationParam = params.id;

  const listingRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/listings/${listingModificationParam[0]}`
  );

  if (listingRes.data.length === 0) {
    return {
      notFound: true,
    };
  }

  const listingInfo = listingRes.data;

  if (listingRes.data.user_id.toString() !== listingModificationParam[1]) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      listingId: listingModificationParam[0],
      listingInfo: listingInfo,
      imagePath: listingInfo.images,
      selectedApartmentInfo: listingInfo.apartment,
    },
  };
};

export default CreateListing;
