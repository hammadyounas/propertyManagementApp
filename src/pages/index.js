import React from "react";
import LoginPage from "../templates/Login/combined/page/LoginPage";
import withAuth from "../components/ui/organisms/withAuth";

const Home = () => {
  return <LoginPage />;
};

export default withAuth(Home);
