import { useReducer, useEffect } from "react";
import AuthContext from "@/context/auth/authContext";
import authReducer from "@/context/auth/authReducer";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import setAuthToken from "@/utils/setToken";

import {
  LOGIN,
  REGISTER,
  AUTH_ERROR,
  USER_AUTH,
  DELETE_USER,
  PROFILE_PIC,
  LOGOUT,
  LOADING,
  CLEAR_ERROR,
  PASSWORD_RESET_EMAIL,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_OTP,
} from "@/context/Types";

const userDeleteToast = () => {
  toast("Sorry to see you go :(", {
    draggablePercent: 60,
  });
};

const registerToast = (name) => {
  toast(`Welcome aboard, ${name}! 😊`, {
    draggablePercent: 60,
  });
};

const accountUpdateToast = () => {
  toast("Profile updated!", {
    draggablePercent: 60,
  });
};

const AuthState = ({ children }) => {
  const router = useRouter();

  const initialState = {
    user: null,
    authError: null,
    loading: false,
    isAuthenticated: false,
    profileImage: null,
    token: null,
    fpMessage: null,
  };

  useEffect(() => {
    if (localStorage.getItem("__ros_listings__token")) getCurrentUser();
  }, []);

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Register
  const register = async (name, email, password) => {
    setAuthToken();

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user`,
        { name: name, email: email, password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = res.data;

      if (res.statusText === "Created") {
        registerToast(data.name);

        dispatch({ type: REGISTER, payload: data });
      }
    } catch (err) {
      console.log(err``);
      dispatch({ type: AUTH_ERROR, payload: err.response.data.detail });
      // setTimeout(() => dispatch({ type: CLEAR_ERROR }), 5000);
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const formData = new FormData();

      formData.set("username", email);
      formData.set("password", password);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = res.data;

      if (res.statusText === "OK") {
        dispatch({ type: LOGIN, payload: data });
      }
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: err.response.data.detail });
      setTimeout(() => dispatch({ type: CLEAR_ERROR }), 5000);
    }
  };

  const getCurrentUser = async () => {
    setAuthToken();

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/current_user`
      );

      const data = res.data;

      if (res.statusText === "OK") {
        dispatch({ type: USER_AUTH, payload: data });
      }
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: err.response.data.detail });
    }
  };

  // Logout
  const logout = async () => {
    dispatch({ type: LOGOUT });

    if (router.pathname === "/") {
      router.reload();
    } else {
      router.push("/");
    }
  };

  const deleteUser = async (userId) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/user/delete/${userId}`
      );

      if (res.statusText === "Created") {
        dispatch({ type: DELETE_USER });
        userDeleteToast();
        setTimeout(() => router.push("/"), 3000);
      }
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: err.response.data.detail });
    }
  };

  // Check if user is logged in
  // const checkIfUserIsLoggedIn = async () => {
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_NEXT_API_URL}/user`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   const data = await res.json();

  //   if (res.ok) {
  //     dispatch({ type: USER_AUTH, payload: data.user });
  //   } else {
  //     dispatch({ type: AUTH_ERROR, payload: data.message });
  //   }
  // };

  // Update user profile
  const updateProfile = async (id, name) => {
    setAuthToken();
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/user/update`,
        { id: id, name: name },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const user = res.data;

      accountUpdateToast();
      dispatch({ type: USER_AUTH, payload: user });
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: err.response.data.detail });
    }
  };

  const generateUserProfileImage = async (name) => {
    const res = await fetch(
      `https://avatars.dicebear.com/api/bottts/${name}.svg`
    );

    const pic = await res.text();

    if (res.ok) {
      dispatch({ type: PROFILE_PIC, payload: pic });
    }
  };

  const sendPasswordResetEmail = async (email) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      toast.success("Please check your email");
      dispatch({ type: PASSWORD_RESET_EMAIL, payload: data });
    }
  };

  // -------------------- Forgot password start --------------------

  const verifyEmail = async (email) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/email/${email}`
      );

      const data = res.data;

      if (res.statusText === "OK") {
        dispatch({ type: FORGOT_PASSWORD, payload: data });
      }
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: err.response.data.detail });
      setTimeout(() => dispatch({ type: CLEAR_ERROR }), 10000);
    }
  };

  const generateOtp = async (userId) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/otp/${userId}`
      );

      const data = res.data;

      if (res.statusText == "Created") {
        dispatch({ type: FORGOT_PASSWORD_OTP, payload: data });
      }
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: err.response.data.detail });
      setTimeout(() => dispatch({ type: CLEAR_ERROR }), 5000);
    }
  };

  const sendOtpEmail = async (email) => {
    try {
      const payload = { email: email };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/email/send_otp`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.statusText === "Created") {
        dispatch({ type: PASSWORD_RESET_EMAIL });
      }
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: err.response.data.detail });
      setTimeout(() => dispatch({ type: CLEAR_ERROR }), 5000);
    }
  };

  const validateOtp = async (id, password, otp) => {
    try {
      const payload = {
        password: password,
        otp: otp,
      };

      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/user/password/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = res.data;

      if (res.statusText == "Created") {
        dispatch({ type: FORGOT_PASSWORD_OTP, payload: data });
      }
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: err.response.data.detail });
      setTimeout(() => dispatch({ type: CLEAR_ERROR }), 5000);
    }
  };

  // -------------------- Forgot password end --------------------

  // Loading
  const setLoading = () => {
    dispatch({ type: LOADING });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        authError: state.authError,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        profileImage: state.profileImage,
        passwordResetEmailSent: state.passwordResetEmailSent,
        token: state.token,
        fpMessage: state.fpMessage,
        register,
        login,
        getCurrentUser,
        logout,
        setLoading,
        updateProfile,
        deleteUser,
        generateUserProfileImage,
        sendPasswordResetEmail,
        verifyEmail,
        generateOtp,
        sendOtpEmail,
        validateOtp,
        // checkIfUserIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
