import { deleteRequest, getRequest, patchRequest, postRequest, searchParams } from "../../../libs/utils/request_handler";

export const fetchDocumentsAPI = async ({ search = "", page, limit }) => {
  const queryParams = searchParams({ search, page, limit });
  const response = await getRequest(`document?${queryParams.toString()}`);
  const documents = response?.data?.document?.filter(
    (document) => !document.isDeleted
  );
  const totalCount = response?.data?.totalCount || 0;
  return { documents, totalCount };
};

export const fetchDocumentByIdAPI = async (id) => {
    const response = await getRequest(`document/${id}`);
    return response?.data;
}

export const createDocumentAPI = async (data) => {
    const response = await postRequest(`document`, data);
    return response?.data;
}

export const updateDocumentAPI = async (id, data) => {
    const response = await patchRequest(`document/${id}`, data);
    return response?.data;
}

export const deleteDocumentAPI = async (id) => {
    const response = await deleteRequest(`document/${id}`);
    return response?.data;
}

export const uploadPdfToCloudinaryAPI = async (id, file) => {
    const response = await patchRequest(`document/upload-pdf/${id}`, file);
    return response?.data;
}

export const sendEmailWithDocumentAPI = async (id, email) => {
    const response = await postRequest(`document/send-email/${id}`, email);
    return response?.data;
}