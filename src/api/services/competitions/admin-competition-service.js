import CONFIG_KEYS from "../../../config";
import adminAxiosInstance from "../../middlewares/adminInterceptor";

export const competitionAdd = async (endpoint, userData) => {
    try {
        const response = await adminAxiosInstance.post(
            `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
            userData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        return response;
    } catch (error) {
        console.error("Error adding competition:", error);
        throw error;
    }
};

export const competitionEdit = async (endpoint, userData) => {
    try {
        const response = await adminAxiosInstance.put(
            `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
            userData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        return response;
    } catch (error) {
        console.error("Error editing competition:", error);
        throw error;
    }
};

export const competitionDelete = async (endpoint) => {
    try {
        const response = await adminAxiosInstance.delete(
            `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
        );
        return response;
    } catch (error) {
        console.error("Error deleting competition:", error);
        throw error;
    }
};


export const competitionLoad = async (endpoint) => {
    try {
        const response = await adminAxiosInstance.get(
            `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
        );
        return response;
    } catch (error) {
        console.error("Error fetching competitions:", error);
        throw error;
    }
}