import { useReducer } from "react";
import SiteContext from "@/context/site/siteContext";
import siteReducer from "@/context/site/siteReducer";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import axios from "axios";
import setAuthToken from "@/utils/setToken";

import {
  LOAD_ADS,
  FILTER_ADS,
  SITE_ERROR,
  CREATE_LISTING,
  USER_LISTINGS,
  LOADING,
} from "../Types";

const imageDeletedToast = () => {
  toast("Image deleted", {
    draggablePercent: 60,
  });
};

const SiteState = ({ children }) => {
  const initialState = {
    apartmentAds: "",
    siteError: "",
    userListings: [],
    listingCreated: false,
    loading: false,
  };

  const router = useRouter();

  const [state, dispatch] = useReducer(siteReducer, initialState);

  const fetchAdsForApartment = async (apartmentName) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/listings/apartment/${apartmentName}`
      );

      const ads = res.data;

      if (res.status === 200) dispatch({ type: LOAD_ADS, payload: ads });
    } catch (err) {
      dispatch({ type: SITE_ERROR, payload: err });
    }
  };

  const filterAdsForApartment = async (filter, apartmentName) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/listings/filter/${filter}/${apartmentName}`
      );

      const filteredAds = res.data;

      if (res.status === 200)
        dispatch({ type: FILTER_ADS, payload: filteredAds });
    } catch (err) {
      dispatch({ type: SITE_ERROR, payload: err });
    }
  };

  //Fetch user listings
  const fetchUserListings = async (userId) => {
    setAuthToken();

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/listings/${userId}`
      );

      const listings = res.data;

      if (res.status === 200) {
        dispatch({ type: USER_LISTINGS, payload: listings });
      }
    } catch (err) {
      dispatch({ type: SITE_ERROR, payload: err.response.data.detail });
    }
  };

  const createNewListing = async (
    title,
    listingType,
    availableFrom,
    bedrooms,
    bathrooms,
    totalArea,
    floor,
    totalFloors,
    rent,
    maintenanceIncluded,
    rentNegotiable,
    deposit,
    maintenance,
    saleAmount,
    saleAmountValue,
    saleNegotiable,
    facingDirection,
    description,
    tenantPreference,
    parking,
    pets,
    nonVeg,
    mobile,
    whatsapp,
    call,
    text,
    user,
    apartment,
    images
  ) => {
    setAuthToken();
    const formData = new FormData();

    formData.set("title", title);
    formData.set("listing_type", listingType);
    formData.set("available_from", availableFrom);
    formData.set("bedrooms", parseInt(bedrooms));
    formData.set("bathrooms", bathrooms ? parseInt(bathrooms) : 0);
    formData.set("total_area", totalArea ? totalArea : 0);
    formData.set("floors", floor ? parseInt(floor) : 0);
    formData.set("total_floors", totalFloors ? parseInt(totalFloors) : 0);
    formData.set("rent_amount", rent ? parseFloat(rent) : 0);
    formData.set(
      "maintenance_included_in_rent",
      maintenanceIncluded ? maintenanceIncluded : false
    );
    formData.set(
      "rent_amount_negotiable",
      rentNegotiable ? rentNegotiable : false
    );
    formData.set("deposit_amount", deposit ? parseFloat(deposit) : 0);
    formData.set(
      "maintenance_amount",
      maintenance ? parseFloat(maintenance) : 0
    );
    formData.set("sale_amount", saleAmount ? parseFloat(saleAmount) : 0);
    formData.set("sale_amount_value", saleAmountValue || "Lakhs");
    formData.set(
      "sale_amount_negotiable",
      saleNegotiable ? saleNegotiable : false
    );
    formData.set("facing_direction", facingDirection || "");
    formData.set("description", description || "");
    formData.set("parking_available", parking || false);
    formData.set("tenant_preference", tenantPreference || "");
    formData.set("pets_allowed", pets || false);
    formData.set("non_vegetarians", nonVeg || false);
    formData.set("mobile_number", mobile);
    formData.set("whatsapp_number", whatsapp || false);
    formData.set("prefers_call", call || false);
    formData.set("prefers_text", text || false);
    formData.set("apartment_id", apartment);
    formData.set("user_id", user);
    images !== []
      ? images.forEach((image) => formData.append("images", image))
      : formData.set("images", images);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/listings`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const listingId = res.data;

      if (res.status === 201) {
        dispatch({ type: CREATE_LISTING });
        router.push(`/ad/${listingId}`);
      }
    } catch (err) {
      dispatch({ type: SITE_ERROR, payload: err.response.data.detail });
    }
  };

  const updateListing = async (
    listingId,
    title,
    listingType,
    availableFrom,
    bedrooms,
    bathrooms,
    totalArea,
    floor,
    totalFloors,
    rent,
    maintenanceIncluded,
    rentNegotiable,
    deposit,
    maintenance,
    saleAmount,
    saleAmountValue,
    saleNegotiable,
    facingDirection,
    description,
    tenantPreference,
    parking,
    pets,
    nonVeg,
    mobile,
    whatsapp,
    call,
    text,
    images
  ) => {
    setAuthToken();
    const formData = new FormData();

    formData.set("listing_id", listingId);
    formData.set("title", title);
    formData.set("listing_type", listingType);
    formData.set("available_from", availableFrom);
    formData.set("bedrooms", parseInt(bedrooms));
    formData.set("bathrooms", bathrooms ? parseInt(bathrooms) : 0);
    formData.set("total_area", totalArea ? totalArea : 0);
    formData.set("floors", floor ? parseInt(floor) : 0);
    formData.set("total_floors", totalFloors ? parseInt(totalFloors) : 0);
    formData.set("rent_amount", rent ? parseInt(rent) : 0);
    formData.set(
      "maintenance_included_in_rent",
      maintenanceIncluded ? maintenanceIncluded : false
    );
    formData.set(
      "rent_amount_negotiable",
      rentNegotiable ? rentNegotiable : false
    );
    formData.set("deposit_amount", deposit ? parseInt(deposit) : 0);
    formData.set("maintenance_amount", maintenance ? parseInt(maintenance) : 0);
    formData.set("sale_amount", saleAmount ? parseInt(saleAmount) : 0);
    formData.set("sale_amount_value", saleAmountValue);
    formData.set(
      "sale_amount_negotiable",
      saleNegotiable ? saleNegotiable : false
    );
    formData.set("facing_direction", facingDirection || "");
    formData.set("description", description || "");
    formData.set("parking_available", parking || false);
    formData.set("tenant_preference", tenantPreference || "");
    formData.set("pets_allowed", pets || false);
    formData.set("non_vegetarians", nonVeg || false);
    formData.set("mobile_number", mobile);
    formData.set("whatsapp_number", whatsapp || false);
    formData.set("prefers_call", call || false);
    formData.set("prefers_text", text || false);
    images !== []
      ? images.forEach((image) => formData.append("images", image))
      : formData.set("images", images);

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/listings`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const listingId = res.data;

      if (res.status === 201) {
        dispatch({ type: CREATE_LISTING });
        router.push(`/ad/${listingId}`);
      }
    } catch (err) {
      dispatch({ type: SITE_ERROR, payload: err.response.data.detail });
    }
  };

  const deleteListing = async (listingId) => {
    setAuthToken();

    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/listing/${listingId}`
    );
  };

  const deleteImageFromImageKit = async (fileId) => {
    setAuthToken();

    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/image/${fileId}`
    );

    if (res.status === 201) {
      imageDeletedToast();
    }
  };

  const setLoading = () => {
    dispatch({ type: LOADING });
  };

  return (
    <SiteContext.Provider
      value={{
        apartmentAds: state.apartmentAds,
        siteError: state.siteError,
        loading: state.loading,
        listingCreated: state.listingCreated,
        userListings: state.userListings,
        fetchAdsForApartment,
        filterAdsForApartment,
        fetchUserListings,
        createNewListing,
        updateListing,
        deleteListing,
        deleteImageFromImageKit,
        setLoading,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export default SiteState;
