import Head from "next/head";
import { Fragment } from "react";
import CommonHeadLayout from "./CommonHeadLayout";

const FullPageAdHeadLayout = ({
  adId,
  adData,
  apartmentName,
  username,
  children,
}) => {
  return (
    <Fragment>
      <CommonHeadLayout />
      <Head>
        <title>
          {adData.title} | {apartmentName}
        </title>
        <meta name="description" content={adData.description} />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Dashboard" />
        <meta property="og:description" content={adData.description} />
        <meta
          property="og:url"
          content={`https://rentorsale.apartments/ad/${adId}`}
        />
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
                "url": ${'"' + "https://rentorsale.apartments/ad" + adId + '"'},
                "description": ${'"' + adData.description + '"'},
                "name": ${'"' + adData.title + '"'},
                "inLanguage": "en",
                "isPartOf": "https://rentorsale.apartments",
                "potentialAction": {
                  "@type": "ReadAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate":${
                      '"' + "https://rentorsale.apartments/ad/" + adId + '"'
                    }
                  }
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "Apartment",
                "name": ${'"' + adData.title + '"'},
                "description": ${'"' + adData.description + '"'},
                "accommodationCategory": ${'"' + adData.listing_type + '"'},
                "url": ${
                  '"' + "https://rentorsale.apartments/ad/" + { adId } + '"'
                },
                "numberOfBedrooms": ${'"' + adData.bedrooms + '"'},
                "numberOfFullBathrooms": ${
                  adData.bathrooms ? '"' + adData.bathrooms + '"' : ""
                },
                "floorSize": ${
                  adData.total_area ? '"' + adData.total_area + '"' : ""
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "RentAction",
                "landlord": ${'"' + username + '"'}
              }
            ]`,
          }}
        />
      </Head>
      {children}
    </Fragment>
  );
};

export default FullPageAdHeadLayout;
