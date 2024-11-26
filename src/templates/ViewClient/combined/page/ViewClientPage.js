import React from "react";
import ViewClientUI from "../../ui/organisms/ViewClientUI";
import useClientDetails from "../../functional/organisms/useClientDetails";

export default function ViewClientPage() {
  const { clientData, handleEdit } =
    useClientDetails();
  return (
    <ViewClientUI
      clientData={clientData}
      handleEdit={handleEdit}
    />
  );
}
