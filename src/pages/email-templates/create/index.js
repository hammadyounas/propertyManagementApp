import React from "react";
import CreateEmailTemplatePage from "../../../templates/CreateEmailTemplate/combined/page/CreateEmailTemplatePage";
import withAuth from "../../../components/ui/organisms/withAuth";

const CreateEmailTemplate = () => {
  return <CreateEmailTemplatePage />;
};

export default withAuth(CreateEmailTemplate);
