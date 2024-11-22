import React from "react";
import MeetingsPage from "../../templates/Meetings/combined/page/MeetingsPage";
import withAuth from "../../components/ui/organisms/withAuth";

const Meetings = () => {
  return <MeetingsPage />;
};

export default withAuth(Meetings);
