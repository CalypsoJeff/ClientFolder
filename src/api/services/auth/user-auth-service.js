import END_POINTS from "../../../constants/endpoints";
import CONFIG_KEYS from "../../../config";
import authInstanceAxios from "../../middlewares/interceptor";

export const loginUser = (userData) => {
  return login(END_POINTS.LOGIN, userData);
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
    phone
  );
  return response;
};
