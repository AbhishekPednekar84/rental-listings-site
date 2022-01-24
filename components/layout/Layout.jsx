import React from "react";
import { scrollToTopIcon } from "@/utils/icons";

// Component imports
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";

const Layout = ({ children, textColor }) => {
  return (
    <div>
      <ScrollToTop />
      <Navbar textColor={textColor} />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
