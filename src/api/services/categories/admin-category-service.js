import CONFIG_KEYS from "../../../config";
import adminAxiosInstance from "../../middlewares/adminInterceptor";

export const load_Categories = async (endpoint) => {
    try {
        const response = adminAxiosInstance.get(
            `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
        );
        return response;
    } catch (error) {
        console.error("Error adding trekking:", error);
        throw error;
    }
}

export const add_Category = async (endpoint, categoryData) => {
    try {
        const response = adminAxiosInstance.post(
            `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
            categoryData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        return response;
    } catch (error) {
        console.error("Error adding trekking:", error);
        throw error;
    }
}

export const edit_Category = async (endpoint, categoryData) => {
    try {
        const response = adminAxiosInstance.put(
            `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
            categoryData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        return response;
    } catch (error) {
        console.error("Error adding trekking:", error);
        throw error;
    }
}

export const delete_Category = async (endpoint) => {
    try {
        const response = adminAxiosInstance.delete(
            `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
        );
        return response;
    } catch (error) {
        console.error("Error deleting category:", error);
        throw error;
    }
};