import { getRequest } from "../utils/request_handler";
import { includeCurrentUser } from "../utils/includeCurrentUser";

export const getAllUsersByName = async (assignedToIds, currentUser) => {
  try {
    const salespersonsResponse = await getRequest('users'); // Adjust API endpoint to fetch all users
    const salespersons = includeCurrentUser(
      salespersonsResponse?.data || [],
      currentUser
    );

    // Map ID to {label, value}
    const salespersonDetails = assignedToIds?.map((id) => {
      const salesperson = salespersons.find((user) => user._id === id);
      return salesperson ? { label: salesperson.name, value: salesperson._id } : null;
    }).filter(Boolean); // Filter out any null values
    return salespersonDetails;

  } catch (error) {
    console.error("Error fetching users:", error);
  }
};
