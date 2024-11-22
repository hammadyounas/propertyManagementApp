import React from "react";
import InvoicesListingPage from "../../templates/InvoiceListing/combined/page/InvoicesListingPage";
import withAuth from "../../components/ui/organisms/withAuth";

const Invoices = () => {
  return <InvoicesListingPage />;
};

export default withAuth(Invoices);
