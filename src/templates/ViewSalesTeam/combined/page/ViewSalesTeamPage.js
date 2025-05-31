import React from "react";
import ViewSalesTeamUI from "../../organisms/ViewSalesTeamUI";
import useSalesTeamDetails from "../../functional/organisms/useSalesTeamDetails";

export default function ViewSalesTeamPage() {
  const { salesteamData, handleEdit, assignedProperties } =
    useSalesTeamDetails();

  return (
    <ViewSalesTeamUI
      salesteamData={salesteamData}
      handleEdit={handleEdit}
      assignedProperties={assignedProperties}
    />
  );
}
