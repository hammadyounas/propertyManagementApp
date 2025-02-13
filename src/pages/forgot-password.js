import React from "react";
import ForgotPasswordPage from "../templates/ForgotPassword/combined/page/ForgotPasswordPage";
import withAuth from "../components/ui/organisms/withAuth";

const ForgotPassword = () => {
  return <ForgotPasswordPage />;
};

export default withAuth(ForgotPassword);
