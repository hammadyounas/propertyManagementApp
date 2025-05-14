import { deleteRequest, getRequest } from "@/libs/utils/request_handler";

export const fetchPropertiesAPI = async ({
  search = "",
  page,
  limit,
  statusFilter,
}) => {
  const queryParams = new URLSearchParams();
  if (search) queryParams.append("search", search.trim());
  queryParams.append("page", page.toString());
  queryParams.append("limit", limit.toString());
if (
  statusFilter === "available" ||
  statusFilter === "under contract" ||
  statusFilter === "leased" ||
  statusFilter === "coming soon" ||
  statusFilter === "withdrawn" ||
  statusFilter === "sold" ||
  statusFilter === "expired"
) {
  queryParams.append("status", statusFilter); // not `params`
}


  const response = await getRequest(`properties?${queryParams.toString()}`);
  const properties = response?.data?.properties?.filter(
    (property) => !property.isDeleted
  );
  const totalCount = response?.data?.total || 0;

  return { properties, totalCount };
};

export const deletePropertyAPI = async (id) => {
  const response = await deleteRequest(`properties/${id}`);
  return response;
};
