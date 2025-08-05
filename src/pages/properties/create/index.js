import React from "react";
import withAuth from "../../../components/ui/organisms/withAuth";
import CreatePropertyPage from "../../../templates/CreateProperty/combined/page/CreateProperty";

const CreateProperty = () => {
  return <CreatePropertyPage />;
};

export default withAuth(CreateProperty);
