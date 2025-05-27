import { getRequest, patchRequest, postRequest } from "../../../libs/utils/request_handler";

export const fetchACMAPI = async ({search = "", page, limit}) => {
    const queryParams = new URLSearchParams();
    if (search) queryParams.append("search", search.trim());
    queryParams.append("page", page.toString());
    queryParams.append("limit", limit.toString());

    const response = await getRequest(`acm?${queryParams.toString()}`);
    const acm = response?.data?.acm?.filter((acm) => !acm.isDeleted);
    const totalCount = response?.data?.totalCount || 0;

    return { acm, totalCount };
}

export const createACMAPI = async (data) => {
    const response = await postRequest("acm", data);
    return response?.data?.acm;
}

// export const updateACMDataAPI = async ({ acmId, data }) => {
//   const response = await patchRequest(`acm/${acmId}`, { data });
//   return response?.data;
// };