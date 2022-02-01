import {
  LOAD_ADS,
  FILTER_ADS,
  SITE_ERROR,
  LOADING,
  USER_LISTINGS,
  CREATE_LISTING,
} from "../Types";

const siteReducer = (state, action) => {
  switch (action.type) {
    case LOAD_ADS:
      return {
        ...state,
        apartmentAds: action.payload,
        loading: false,
      };
    case FILTER_ADS:
      return {
        ...state,
        apartmentAds: action.payload,
        loading: false,
      };
    case CREATE_LISTING:
      return {
        ...state,
        listingCreated: true,
        loading: false,
      };
    case USER_LISTINGS:
      return {
        ...state,
        userListings: action.payload,
        loading: false,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case SITE_ERROR:
      return {
        ...state,
        siteError: action.payload,
      };
    default:
      return state;
  }
};

export default siteReducer;
