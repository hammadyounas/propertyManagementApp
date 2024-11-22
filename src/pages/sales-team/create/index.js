import React from "react";
import CreateUserPage from "../../../templates/CreateUser/combined/page/CreateUserPage";
import withAuth from "../../../components/ui/organisms/withAuth";

const CreateUser = () => {
  return <CreateUserPage />;
};

export default withAuth(CreateUser);
