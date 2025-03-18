import CONFIG_KEYS from "../../../config";
import authInstanceAxios from "../../middlewares/interceptor";

export const load_Products = async (endpoint) => {
    try {
        const response = await authInstanceAxios.get(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`);
        return response;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

export const load_Shop_Products = async (endpoint) => {
    try {
        const response = await authInstanceAxios.get(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`);
        console.log("response", response.data);
        return response;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

export const load_Product_Details = async (endpoint, id) => {
    try {
        const response = await authInstanceAxios.get(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}/${id}`);
        return response;
    } catch (error) {
        console.error("Error fetching product details:", error);
        throw error;
    }
};
