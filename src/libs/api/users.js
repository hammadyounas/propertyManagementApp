import { getRequest } from "../utils/request_handler";

export const getAllUsersByName = async (assignedToIds) => {
  try {
    const salespersonsResponse = await getRequest('users'); // Adjust API endpoint to fetch all users
    const salespersons = salespersonsResponse?.data || [];

    // Map ID to {label, value}
    const salespersonDetails = assignedToIds.map((id) => {
      const salesperson = salespersons.find((user) => user._id === id);
      return salesperson ? { label: salesperson.name, value: salesperson._id } : null;
    }).filter(Boolean); // Filter out any null values
    return salespersonDetails;

  } catch (error) {
    console.error("Error fetching users:", error);
  }
};
