import React from "react";
import ClientsListingPage from "../../templates/ClientsListing/combined/page/ClientsListingPage";
import withAuth from "../../components/ui/organisms/withAuth";

const Clients = () => {
  return <ClientsListingPage />;
};

export default withAuth(Clients);
