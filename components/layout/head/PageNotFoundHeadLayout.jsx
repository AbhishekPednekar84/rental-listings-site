import Head from "next/head";
import { Fragment } from "react";
import CommonHeadLayout from "./CommonHeadLayout";

const PageNotFoundHeadLayout = (props) => {
  return (
    <Fragment>
      <CommonHeadLayout />
      <Head>
        <title>Page Not Found</title>
        <meta
          name="description"
          content="Find flats for rent or sale in your dream apartment. We provide a quick and easy way for owners to list their flats for rent or sale. Want to know if there is a flat for rent in that apartment you have in mind? Just search for the name of the apartment and find out!"
        />
      </Head>
      {props.children}
    </Fragment>
  );
};

export default PageNotFoundHeadLayout;
