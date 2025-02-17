import axios from "axios";
import CustomApiError from "../../utils/CustomApiError";
import CONFIG_KEYS from "../../config";

const { ADMIN_API_BASE_URL } = CONFIG_KEYS;

const adminAxiosInstance = axios.create({
  baseURL: ADMIN_API_BASE_URL,
});

// Add interceptors for handling admin-specific responses
adminAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { data, status } = error.response;
      if (status === 403) {
        throw new CustomApiError("Forbidden - Admin access required", data);
      } else if (status === 500) {
        throw new CustomApiError("Server error", data);
      } else {
        throw new CustomApiError(`Request failed with status ${status}`, data);
      }
    } else if (error.request) {
      throw new CustomApiError(`No response received`, error.request);
    } else {
      console.log("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default adminAxiosInstance;
