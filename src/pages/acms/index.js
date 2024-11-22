import React from "react";
import ACMListingPage from "../../templates/ACMListing/combined/page/ACMListingPage";
import withAuth from "../../components/ui/organisms/withAuth";

const ACMS = () => {
  return <ACMListingPage />;
};

export default withAuth(ACMS);