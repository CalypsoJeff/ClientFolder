import CONFIG_KEYS from "../../../config";
import adminAxiosInstance from "../../middlewares/adminInterceptor";

export const load_Categories = async (endpoint) => {
    try {
        const response = await adminAxiosInstance.get(
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
        const response = await adminAxiosInstance.post(
            `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
            categoryData,
            { headers: { "Content-Type": "application/json" } }
        );
        return response;
    } catch (error) {
        console.error("Error adding catgeory:", error);
        throw error;
    }
}

export const edit_Category = async (endpoint, categoryData) => {
    try {
        const response = await adminAxiosInstance.put(
            `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
            categoryData,
            { headers: { "Content-Type": "application/json" } }
        );

        return response;
    } catch (error) {
        console.error("❌ Error editing category:", error.response?.data || error.message);
        throw error;
    }
};


export const toggle_Category = async (endpoint) => {
    try {
        const response = await adminAxiosInstance.patch(
            `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`, {}
        );
        return response;
    } catch (error) {
        console.error("Error deleting category:", error);
        throw error;
    }
};