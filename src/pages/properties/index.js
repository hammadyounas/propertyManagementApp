import React from "react";
import PropertiesListingPage from "../../templates/PropertiesListing/combined/page/PropertiesListingPage";
import withAuth from "../../components/ui/organisms/withAuth";

const Properties = () => {
  return <PropertiesListingPage />;
};

export default withAuth(Properties);
