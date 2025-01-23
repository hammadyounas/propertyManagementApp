import axios from "axios";
import { API_PREFIX, API_URL } from "../../configs";

const token =
  typeof window != "undefined" ? localStorage.getItem("auth_token") : null;

export const postRequest = async (url, data) => {
  try {
    const response = await axios.post(`${API_URL}/${API_PREFIX}/${url}`, data, {
      // withCredentials: true,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (error) {
    throw error; // Rethrow the error for further handling
  }
};

export const getRequest = async (url) => {
  try {
    const response = await axios.get(`${API_URL}/${API_PREFIX}/${url}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchRequest = async (url, data) => {
  try {
    const response = await axios.patch(
      `${API_URL}/${API_PREFIX}/${url}`,
      data,
      {
        // withCredentials: true,
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRequest = async (url) => {
  try {
    const response = await axios.delete(`${API_URL}/${API_PREFIX}/${url}`, {
      // withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
