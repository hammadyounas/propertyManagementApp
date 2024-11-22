import React from "react";
import CreateInvoicePage from "../../../templates/CreateInvoice/combined/page/CreateInvoicePage";
import withAuth from "../../../components/ui/organisms/withAuth";

const CreateInvoice = () => {
  return <CreateInvoicePage />;
};

export default withAuth(CreateInvoice);
