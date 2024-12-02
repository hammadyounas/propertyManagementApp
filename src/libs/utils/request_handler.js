import axios from "axios";
import { API_PREFIX, API_URL } from "../../configs";

const apiClient = axios.create({
  baseURL: `${API_URL}/${API_PREFIX}`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Use this if cookies or credentials are involved
});

export const postRequest = async (url, data) => {
  try {
    const response = await apiClient.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRequest = async (url) => {
  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const putRequest = async (url, data) => {
  try {
    const response = await apiClient.put(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRequest = async (url) => {
  try {
    const response = await apiClient.delete(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
