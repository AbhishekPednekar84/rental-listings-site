import {
  LOAD_ADS,
  FILTER_ADS,
  SITE_ERROR,
  LOADING,
  USER_LISTINGS,
  CREATE_LISTING,
  FETCH_APARTMENTS,
  SEARCH_APARTMENTS,
  CLEAR_SEARCH,
  CREATE_APARTMENT,
} from "../Types";

const siteReducer = (state, action) => {
  switch (action.type) {
    case CREATE_APARTMENT:
      return {
        ...state,
        createdApartment: action.payload,
        loading: false,
      };

    case FETCH_APARTMENTS:
      return {
        ...state,
        apartments: action.payload,
        loading: false,
      };
    case SEARCH_APARTMENTS:
      return {
        ...state,
        searchResults: action.payload,
        loading: false,
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        searchResults: null,
      };
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
