import React, { useEffect, useState } from "react";
import { getRequest } from "../../../../libs/utils/request_handler";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { getAllPropertiesByTitle } from "../../../../libs/api/properties";

export default function useSalesTeamDetails() {
  const [salesteamData, setSalesTeamData] = useState({});
  const [assignedProperties, setAssignedProperties] = useState([]);
  const router = useRouter();
  const userId = router.query.id;

  const fetchSalesTeamData = async () => {
    try {
      const response = await getRequest(`user/${userId}`);
      if (response) {
        setSalesTeamData(response.data);
        // if (response.data?.assigned_properties?.length) {
        //   const propertyDetails = await getAllPropertiesByTitle(response.data.assigned_properties);
        //   setAssignedProperties(propertyDetails); // Update state with property details
        // }
      }
    } catch (error) {
      toast.error("Failed to fetch sales team data.");
    }
  };

  useEffect(() => {
    if (userId) fetchSalesTeamData();
  }, [userId]);

  const handleEdit = () => {
    router.push(`/sales-team/edit/${userId}`);
  };

  return { salesteamData, assignedProperties, handleEdit };
}
