import { getRequest } from "../../../libs/utils/request_handler";

export const fetchInvoicesAPI = async ({search = "", page, limit}) => {
    const queryParams = new URLSearchParams();
    if (search) queryParams.append("search", search.trim());
    queryParams.append("page", page.toString());
    queryParams.append("limit", limit.toString());

    const response = await getRequest(`invoices?${queryParams.toString()}`);
    const invoices = response?.data?.invoices?.filter((inv) => !inv.isDeleted);
    const totalCount = response?.data?.total || 0;

    return { invoices, totalCount };
}