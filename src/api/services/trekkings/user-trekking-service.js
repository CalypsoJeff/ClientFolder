import CONFIG_KEYS from "../../../config";
import authInstanceAxios from "../../middlewares/interceptor";

export const load_Trekkings = async (endpoint) => {
    try {
        const response = await authInstanceAxios.get(
            `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
        );
        return response;
    } catch (error) {
        console.error("Error adding trekking:", error);
        throw error;
    }
}