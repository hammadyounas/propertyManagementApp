import { getRequest, patchRequest } from "../../../libs/utils/request_handler";

export const fetchInvoicesAPI = async ({search = "", page, limit, statusFilter}) => {
    const queryParams = new URLSearchParams();
    if (search) queryParams.append("search", search.trim());
    queryParams.append("page", page.toString());
    queryParams.append("limit", limit.toString());
    if (
        statusFilter === "approved" ||
        statusFilter === "pending" ||
        statusFilter === "rejected"
    ) {
        queryParams.append("status", statusFilter);
    }

    const response = await getRequest(`invoices?${queryParams.toString()}`);
    const invoices = response?.data?.invoices?.filter((inv) => !inv.isDeleted);
    const totalCount = response?.data?.total || 0;

    return { invoices, totalCount };
}

export const updateInvoiceStatusAPI = async ({ invoiceId, status }) => {
  const response = await patchRequest(`invoices/${invoiceId}`, { status });
  return response?.data;
};