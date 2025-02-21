import React from "react";
import withAuth from "../../../components/ui/organisms/withAuth";
import SendEmailPage from "../../../templates/SendEmail/combined/page/SendEmail";

const SendEmail = () => {
  return <SendEmailPage />;
};

export default withAuth(SendEmail);
