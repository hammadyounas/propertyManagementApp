import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
const {fetchUserById, clearSelectedUser} = require("../../../../store/features/users/userSlice");

export default function useSalesTeamDetails() {
  const router = useRouter();
  const userId = router.query.id;
  const dispatch = useDispatch();
  
  const {selectedUser: salesteamData} = useSelector((state) => state.users);

 useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));

      // Optional: clean up selected user on unmount
      return () => {
        dispatch(clearSelectedUser());
      };
    }
  }, [userId]);

  console.log("Sales Team Data:", salesteamData);

  const handleEdit = () => {
    router.push(`/broker/edit/${userId}`);
  };

  return { salesteamData, handleEdit };
}

  // const fetchSalesTeamData = async () => {
  //   try {
  //     const response = await getRequest(`user/${userId}`);
  //     if (response) {
  //       setSalesTeamData(response.data);
  //       // if (response.data?.assigned_properties?.length) {
  //       //   const propertyDetails = await getAllPropertiesByTitle(response.data.assigned_properties);
  //       //   setAssignedProperties(propertyDetails); // Update state with property details
  //       // }
  //     }
  //   } catch (error) {
  //     toast.error("Failed to fetch sales team data.");
  //   }
  // };
