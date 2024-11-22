import axios from "axios";
import { API_PREFIX, API_URL } from "../../configs";

export const postRequest = async (url, data) => {
    try {
      const response = await axios.post(`${API_URL}/${API_PREFIX}/${url}`, data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Request failed:", error.response ? error.response.data : error.message);
      throw error; // Rethrow the error for further handling
    }
  };
  