import CONFIG_KEYS from "../../../config";
import adminAxiosInstance from "../../middlewares/adminInterceptor";

export const user_List = async (endpoint) => {
    try {
        const response = await adminAxiosInstance.get(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`);
        return response;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}