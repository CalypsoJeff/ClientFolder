import CONFIG_KEYS from "../../../config";
import adminAxiosInstance from "../../middlewares/adminInterceptor";

export const load_Products = async (endpoint) => {
    try {
        const response = await adminAxiosInstance.get(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`);
        return response;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

export const add_Product = async (endpoint, userData) => {
    console.log("📝 Sending Add Request:", userData);

    try {
        const response = await adminAxiosInstance.post(
            `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
            userData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        return response;
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
};

export const edit_Product = async (endpoint, userData) => {
    try {
        const response = await adminAxiosInstance.put(
            `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
            userData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        return response;
    } catch (error) {
        console.error("Error editing product:", error);
        throw error;
    }
};

export const toggle_product = async (endpoint) => {
    try {
        const response = await adminAxiosInstance.put(
            `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
        );
        return response;
    } catch (error) {
        console.error("Error toggling product:", error);
        throw error;
    }
};