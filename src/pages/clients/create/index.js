import React from "react";
import CreateClientPage from "../../../templates/CreateClient/combined/page/CreateClientPage";
import withAuth from "../../../components/ui/organisms/withAuth";

const CreateClient = () => {
  return <CreateClientPage />;
};

export default withAuth(CreateClient);
