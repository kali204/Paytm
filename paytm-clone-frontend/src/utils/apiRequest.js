import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const apiRequest = async (method, endpoint, data = null, auth = true) => {
  try {
    const headers = auth
      ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
      : {};

    const response = await axios({
      method,
      url: `${API_URL}/${endpoint}`,
      data,
      headers,
    });

    return response.data;
  } catch (error) {
    console.error("API Request Error:", error.response?.data || error.message);
    return null;
  }
};
