import Head from "next/head";
import { Fragment } from "react";
import CommonHeadLayout from "./CommonHeadLayout";

const LoginHeadLayout = (props) => {
  return (
    <Fragment>
      <CommonHeadLayout />
      <Head>
        <title>User Login | rentorsale.apartments</title>
        <meta
          name="description"
          content="Find flats for rent or sale in your dream apartment. We provide a quick and easy way for owners to list their flats for rent or sale. Want to know if there is a flat for rent in that apartment you have in mind? Just search for the name of the apartment and find out!"
        />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Log into your rentorsale.apartments account"
        />
        <meta
          property="og:description"
          content="Find flats for rent or sale in your dream apartment. We provide a quick and easy way for owners to list their flats for rent or sale. Want to know if there is a flat for rent in that apartment you have in mind? Just search for the name of the apartment and find out!"
        />
        <meta property="og:url" content="https://rentorsale.apartments/" />
        <meta property="og:site_name" content="rentorsale.apartments" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `[
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "dateCreated": "22-01-2022",
                "url": "https://rentorsale.apartments",
                "description":
                  "Find flats for rent or sale in your dream apartment. We provide a quick and easy way for owners to list their flats for rent or sale. Want to know if there is a flat for rent in that apartment you have in mind? Just search for the name of the apartment and find out!",
                "genre": "Website for an online marketplace",
                "keywords":
                  "rent, flats, apartments, sell, 1BHK, 2BHK, 3BHK, to-let"
              },
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "datePublished": "22-01-2022",
                "dateModified": "22-01-2022",
                "url": "https://rentorsale.apartments/account/login",
                "description":
                  "Find flats for rent or sale in your dream apartment. We provide a quick and easy way for owners to list their flats for rent or sale. Want to know if there is a flat for rent in that apartment you have in mind? Just search for the name of the apartment and find out!",
                "name": "Find flats for rent in your dream apartment",
                "inLanguage": "en",
                "isPartOf": "https://rentorsale.apartments",
                "potentialAction": {
                  "@type": "ReadAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://rentorsale.apartments/account/login"
                  }
                }
              }
            ]`,
          }}
        />
      </Head>
      {props.children}
    </Fragment>
  );
};

export default LoginHeadLayout;
