import { getRequest, postRequest, searchParams } from "../../../libs/utils/request_handler";

export const fetchClientAPI = async ({ search = "", page, limit, all = false }) => {
  const queryParams = searchParams({ search, page, limit, all: all ? true : undefined });

  const response = await getRequest(`clients?${queryParams.toString()}`);
  const clients = response?.data?.clients.filter((client) => !client.isDeleted);
  const totalCount = response?.data?.totalCount || 0;

  return { clients, totalCount };
};

export const createACMAPI = async (data) => {
    const response = await postRequest("clients", data);
    return response?.data?.acm;
}