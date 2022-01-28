import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { heartIcon } from "@/utils/icons";

const Footer = () => {
  const year = new Date().getFullYear();

  const router = useRouter();

  return (
    <div className="relative print:hidden">
      {/* <div className="footer-tilt">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
            className="shape-fill"
          ></path>
        </svg>
      </div> */}

      <div
        className={`h-full bg-gradient-to-r ${
          router.pathname === "/account/register"
            ? "from-cyan-900 via-sky-800 to-blue-900"
            : "from-teal-900 via-emerald-800 to-green-900"
        } text-white`}
      >
        <div className="flex flex-col justify-center items-center">
          <div className="mt-7">
            <Image
              src="https://ik.imagekit.io/ykidmzssaww/Listings/site-images/ros_mrUlsGF1T.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1642437129463"
              alt="Brand logo"
              height={90}
              width={200}
            />
          </div>
          <h5 className="mt-5 mb-14 text-lg text-center">
            &copy; {year} - rentorsale.apartments - All rights reserved
          </h5>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="p-2">
              <h5 className="font-semibold text-center text-2xl mb-7">
                Quick Links
              </h5>
              <div className="grid grid-cols-2 gap-10">
                <ul className="flex flex-col gap-5 flex-start">
                  <li>
                    <Link href="/account/login">
                      <a className="nav-link font-medium">Login</a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/account/register">
                      <a className="nav-link font-medium">Register</a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/listings/create">
                      <a className="nav-link font-medium">Create Listing</a>
                    </Link>
                  </li>
                </ul>

                <ul className="flex flex-col gap-5 flex-start">
                  <li>
                    <Link href="/policy/#terms">
                      <a className="nav-link font-medium">Terms of Use</a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/policy/#privacy">
                      <a className="nav-link font-medium">Privacy Policy</a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/faqs">
                      <a className="nav-link font-medium">FAQs</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-2 flex flex-col items-center">
              <h5 className="font-semibold text-2xl mb-7">Other Offerings</h5>
              <Link href="https://nxtdoordeals.com" passHref={true}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link font-medium"
                >
                  nxtdoordeals.com
                </a>
              </Link>
            </div>
          </div>

          <p className="flex items-center my-14">
            Made with <span className="mx-1 text-rose-600">{heartIcon}</span>{" "}
            for all the home seekers
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
