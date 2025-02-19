import { getRequest, postRequest } from "../utils/request_handler";

export const getAllPropertiesByTitle = async (assignedToIds) => {
    try {
      const propertyResponse = await getRequest("properties"); // Fetch all properties
      const properties = propertyResponse?.data || [];
  
      // Map IDs to {label, value} format, filter out properties that don't exist in the database
      const propertyDetails = assignedToIds
        ?.map((id) => {
          const property = properties.find((prop) => prop._id === id);
          return property ? { label: property.title, value: property._id } : null; // Only include valid properties
        })
        .filter(Boolean); // Filter out null values
  
      return propertyDetails;
    } catch (error) {
      console.error("Error fetching properties:", error);
      throw new Error("Failed to fetch properties.");
    }
  };

  export const getAllPropertiesByIds = async (assignedToIds) => {
    try {
      const propertyResponse = await postRequest("properties/by-ids", {ids:assignedToIds});
      const properties = propertyResponse?.data || [];
      const propertyDetails = properties?.map((property)=>({ label: property.title, value: property._id }))

      return propertyDetails;
    } catch (error) {
      console.error("Error fetching properties:", error);
      throw new Error("Failed to fetch properties.");
    }
  };
  