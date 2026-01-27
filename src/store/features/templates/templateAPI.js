import {
  getRequest,
  patchRequest,
  postRequest,
  deleteRequest,
  searchParams,
} from "../../../libs/utils/request_handler";

export const createTemplateAPI = async (data) => {
  const response = await postRequest("template", data);
  return response?.data?.template;
};

export const fetchAllTemplatesAPI = async ({ search = "", page, limit, all = false }) => {
  const queryParams = searchParams({ search, page, limit, all });
  const response = await getRequest(`template?${queryParams.toString()}`);
  const templates = response?.data?.template?.filter(
    (template) => !template.isDeleted
  );
  console.log("templates", response?.data);
  const totalCount = response?.data?.totalCount || 0;
  return { templates, totalCount };
};

export const fetchTemplateByIdAPI = async (id) => {
  const response = await getRequest(`template/${id}`);
  console.log("response", response?.data);
  return response?.data;
};

export const updateTemplateAPI = async (id, data) => {
  const response = await patchRequest(`template/${id}`, data);
  return response?.data;
};

export const deleteTemplateAPI = async (id) => {
  const response = await deleteRequest(`template/${id}`);
  return response?.data;
};

export const fetchDeletedTemplatesAPI = async ({ search = "", page, limit }) => {
  const queryParams = searchParams({ search, page, limit });
  const response = await getRequest(`template/deleted?${queryParams.toString()}`);
  const templates = response?.data?.template || [];
  const totalCount = response?.data?.totalCount || 0;
  return { templates, totalCount };
};

export const restoreTemplateAPI = async (id) => {
  const response = await patchRequest(`template/restore/${id}`, {});
  return response?.data;
};
