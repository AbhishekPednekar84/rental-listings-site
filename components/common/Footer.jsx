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
        <div className="flex flex-col items-center justify-center">
          <div className="mt-7">
            <Image
              src="https://ik.imagekit.io/ykidmzssaww/Listings/site-images/ros_mrUlsGF1T.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1642437129463"
              alt="Brand logo"
              height={90}
              width={200}
            />
          </div>
          <h5 className="mt-5 mb-14 px-2 text-center text-lg">
            &copy; {year} - rentorsale.apartments - All rights reserved
          </h5>

          <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
            <div className="p-2">
              <h5 className="mb-7 text-center text-2xl font-semibold">
                Quick Links
              </h5>
              <div className="grid grid-cols-2 place-items-center gap-10">
                <ul className="flex-start flex flex-col gap-5">
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
                    <Link href="/#how-it-works">
                      <a className="nav-link font-medium">How It Works</a>
                    </Link>
                  </li>
                </ul>

                <ul className="flex-start flex flex-col gap-5">
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

            <div className="flex flex-col items-center p-2">
              <h5 className="mb-7 text-2xl font-semibold">Related Offering</h5>
              <p className="text-center">
                Buy and sell preloved items in your apartment complex
                <br /> with ease on{" "}
                <Link href="https://nxtdoordeals.com" passHref={true}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline decoration-white decoration-2 underline-offset-4"
                  >
                    nxtdoordeals.com
                  </a>
                </Link>
              </p>
            </div>
          </div>

          <p className="my-14 flex items-center">
            Made with <span className="mx-1 text-rose-600">{heartIcon}</span>{" "}
            for all the home seekers
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
