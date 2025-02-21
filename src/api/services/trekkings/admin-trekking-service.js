import CONFIG_KEYS from "../../../config";
import adminAxiosInstance from "../../middlewares/adminInterceptor";

export const load_Trekkings = async (endpoint) => {
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

export const add_Trekking = async (endpoint, trekkingData) => {
    try {
        const response = adminAxiosInstance.post(
            `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
            trekkingData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        return response;
    } catch (error) {
        console.error("Error adding trekking:", error);
        throw error;
    }
}

export const edit_Trekking = async (endpoint, trekkingData) => {
    try {
        const response = adminAxiosInstance.put(
            `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
            trekkingData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        return response;
    } catch (error) {
        console.error("Error adding trekking:", error);
        throw error;
    }
}

export const delete_Trekking = async (endpoint) => {
    try {
        const response = adminAxiosInstance.delete(
            `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
        );
        return response;
    } catch (error) {
        console.error("Error deleting trekking:", error);
        throw error;
    }
};