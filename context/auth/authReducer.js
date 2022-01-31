import Cookies from "universal-cookie";
import {
  LOGIN,
  REGISTER,
  AUTH_ERROR,
  USER_AUTH,
  DELETE_USER,
  PROFILE_PIC,
  LOADING,
  LOGOUT,
  CLEAR_ERROR,
  PASSWORD_RESET_EMAIL,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_OTP,
} from "@/context/Types";

const cookie = new Cookies();

const authReducer = (state, action) => {
  switch (action.type) {
    default:

    case USER_AUTH:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case LOGIN:
      localStorage.setItem(
        "__ros__listing__token",
        action.payload.access_token
      );
      cookie.set("__ros__listing__token", action.payload.access_token, {
        "path": "/",
        "sameSite": "Strict",
        "maxAge": 24 * 60 * 60,
        "secure": process.env.NODE_ENV === "production",
      });
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER:
      localStorage.setItem(
        "__ros__listing__token",
        action.payload.access_token
      );
      cookie.set("__ros__listing__token", action.payload.token, {
        "path": "/",
        "maxAge": 24 * 60 * 60,
        "sameSite": "Strict",
        "secure": process.env.NODE_ENV === "production",
      });
      return {
        ...state,
        token: action.payload.token,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case DELETE_USER:
      localStorage.removeItem("__ros__listing__token");
      cookie.remove("__ros__listing__token", {
        path: "/",
      });
      return {
        ...state,
        user: null,
        loading: false,
        token: null,
        isAuthenticated: false,
      };
    case PROFILE_PIC:
      return {
        ...state,
        profileImage: action.payload,
      };
    case AUTH_ERROR:
      return {
        ...state,
        authError: action.payload,
        loading: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      };
    case PASSWORD_RESET_EMAIL:
      return {
        ...state,
        loading: false,
        passwordResetEmailSent: true,
      };

    case FORGOT_PASSWORD:
      return {
        ...state,
        authError: null,
        loading: false,
        user: action.payload,
      };
    case FORGOT_PASSWORD_OTP:
      return {
        ...state,
        authError: null,
        loading: false,
        fpMessage: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem("__ros__listing__token");
      cookie.remove("__ros__listing__token", {
        path: "/",
      });
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
      return {
        ...state,
      };
  }
};

export default authReducer;
