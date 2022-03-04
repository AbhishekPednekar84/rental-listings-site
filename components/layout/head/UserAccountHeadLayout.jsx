import Head from "next/head";
import { Fragment } from "react";
import CommonHeadLayout from "./CommonHeadLayout";

const UserAccountHeadLayout = ({ user, children }) => {
  const pluralizedName =
    user.name[user.name.length - 1] === "s"
      ? user.name + "'"
      : user.name + "'s";

  return (
    <Fragment>
      <CommonHeadLayout />
      <Head>
        <title>{pluralizedName} Dashboard</title>
        <meta
          name="description"
          content="Find flats for rent or sale in your dream apartment. We provide a quick and easy way for owners to list their flats for rent or sale. Want to know if there is a flat for rent in that apartment you have in mind? Just search for the name of the apartment and find out!"
        />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${pluralizedName} Dashboard`} />
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
                "url": ${
                  '"' +
                  `https://rentorsale.apartments/account/dashboard/${user.id}` +
                  '"'
                },
                "description":
                  "Find flats for rent or sale in your dream apartment. We provide a quick and easy way for owners to list their flats for rent or sale. Want to know if there is a flat for rent in that apartment you have in mind? Just search for the name of the apartment and find out!",
                "name": "Find flats for rent in your dream apartment",
                "inLanguage": "en",
                "isPartOf": "https://rentorsale.apartments",
                "potentialAction": {
                  "@type": "ReadAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": ${
                      '"' +
                      `https://rentorsale.apartments/account/dashboard/${user.id}` +
                      '"'
                    }
                  }
                }
              }
            ]`,
          }}
        />
      </Head>
      {children}
    </Fragment>
  );
};

export default UserAccountHeadLayout;
