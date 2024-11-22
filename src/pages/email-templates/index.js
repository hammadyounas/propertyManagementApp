import React from "react";
import EmailTemplatesListingPage from "../../templates/EmailTemplatesListing/combined/page/EmailTemplatesListingPage";
import withAuth from "../../components/ui/organisms/withAuth";

const EmailTemplates = () => {
  return <EmailTemplatesListingPage />;
};

export default withAuth(EmailTemplates);
