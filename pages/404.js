import React from "react";
import Image from "next/image";
import Link from "next/link";

// Component imports
import Layout from "@/components/layout/Layout";
import PageNotFoundHeadLayout from "@/components/layout/head/PageNotFoundHeadLayout";

const PageNotFound = () => {
  return (
    <PageNotFoundHeadLayout>
      <div className="grid grid-cols-1 place-items-center mx-5 pt-20 md:pt-24">
        <Image
          src="https://ik.imagekit.io/ykidmzssaww/Listings/site-images/404_aMiNiovqf.png"
          alt="Page not found"
          placeholder="blur"
          blurDataURL="https://ik.imagekit.io/ykidmzssaww/tr:bl-5/Listings/site-images/404_aMiNiovqf.png"
          height={350}
          width={500}
        />
        <h1 className="mt-14 mb-7 font-bold">SORRY ☹️</h1>
        <p className="text-lg text-center mx-2 lg:mx-10">
          Either that page does not exist or you aren't authorized to view the
          page or you attempted to access a page that requires you to{" "}
          <Link href="/account/login">
            <a className="text-teal-800 underline underline-offset-4 decoration-2 decoration-teal-600">
              login
            </a>
          </Link>
          . If you don't have an account, we'd love you to{" "}
          <Link href="/account/register">
            <a className="text-teal-800 underline underline-offset-4 decoration-2 decoration-teal-600">
              sign up
            </a>
          </Link>{" "}
          😁
        </p>
        <p className="mt-5 mb-10 text-lg">
          Alternatively, here's the link to our{" "}
          <Link href="/">
            <a className="text-teal-800 underline underline-offset-4 decoration-2 decoration-teal-600">
              home
            </a>
          </Link>{" "}
          page.
        </p>
      </div>
    </PageNotFoundHeadLayout>
  );
};

export default PageNotFound;
