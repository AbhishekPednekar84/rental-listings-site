import { useRef, useEffect } from "react";
import "../styles/globals.css";
import SiteState from "@/context/site/SiteState";
import AuthState from "@/context/auth/AuthState";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Zoom } from "react-toastify";
import { motion } from "framer-motion";
import smoothscroll from "smoothscroll-polyfill";

const pageVariants = {
  pageInitial: {
    opacity: 0,
  },
  pageAnimate: {
    opacity: 1,
  },
};

const contextClass = {
  default: "bg-teal-600",
};

function MyApp({ Component, pageProps, router }) {
  const pathHistory = useRef(null);
  const disablePrint = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      smoothscroll.polyfill();
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scroll({ top: 1, left: 1, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    let userAgent = navigator.userAgent;

    if (userAgent.match(/firefox|fxios/i) && userAgent.match(/android/i)) {
      disablePrint.current = true;
    }
  }, []);

  return (
    <motion.div
      key={router.route}
      variants={pageVariants}
      initial="pageInitial"
      animate="pageAnimate"
    >
      <AuthState>
        <SiteState>
          <Component
            {...pageProps}
            pathHistory={pathHistory}
            disablePrint={disablePrint}
          />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop
            closeOnClick
            closeButton={false}
            rtl={false}
            pauseOnHover
            transition={Zoom}
            toastClassName={({ type }) =>
              contextClass[type || "default"] +
              " flex p-1 min-h-10 justify-center overflow-hidden cursor-pointer"
            }
            bodyClassName={() =>
              "text-base text-white font-semibold tracking-wide block p-3 text-center"
            }
          />
        </SiteState>
      </AuthState>
    </motion.div>
  );
}

export default MyApp;
