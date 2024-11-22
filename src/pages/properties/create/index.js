import React from "react";
import CreatePropertyPage from "../../../templates/CreateProperty/combined/page/CreatePropertyPage";
import withAuth from "../../../components/ui/organisms/withAuth";

const CreateProperty = () => {
  return <CreatePropertyPage />;
};

export default withAuth(CreateProperty);
