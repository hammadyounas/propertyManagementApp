import axios from "axios";
import { API_PREFIX, API_URL } from "../../configs";

// const token =
//   typeof window != "undefined" ? localStorage.getItem("auth_token") : null;

export const postRequest = async (url, data) => {
  try {
    const response = await axios.post(`${API_URL}/${API_PREFIX}/${url}`, data);
    return response.data;
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};

export const getRequest = async (url) => {
  try {
    const response = await axios.get(`${API_URL}/${API_PREFIX}/${url}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchRequest = async (url, data) => {
  try {
    // Let axios set Content-Type + boundary for FormData (manual header breaks parsing)
    const response = await axios.patch(`${API_URL}/${API_PREFIX}/${url}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRequest = async (url) => {
  try {
    const response = await axios.delete(`${API_URL}/${API_PREFIX}/${url}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchParams = ({ search = "", page, limit, all }) => {  
  const queryParams = new URLSearchParams();

  if (search) queryParams.append("search", search.trim());
  if (page !== undefined) queryParams.append("page", page.toString());
  if (limit !== undefined) queryParams.append("limit", limit.toString());
  if (all !== undefined) queryParams.append("all", all.toString());


  return queryParams;
};
