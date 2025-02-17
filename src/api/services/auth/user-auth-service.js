import CONFIG_KEYS from "../../../config";
import authInstanceAxios from "../../middlewares/interceptor";

export const login = (endpoint, userData) => {
  const response = authInstanceAxios.post(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
    userData
  );
  return response;
};

export const register = async (endpoint, userData) => {
  const response = await authInstanceAxios.post(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
    userData
  );
  return response;
};

export const verifyOTP = async (endpoint, otpData) => {
  const response = await authInstanceAxios.post(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
    otpData
  );
  return response;
};

export const resendOTP = async (endpoint, phone) => {
  const response = await authInstanceAxios.post(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
    { phone }
  );
  return response;
};
