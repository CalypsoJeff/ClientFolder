import CONFIG_KEYS from "../../../config";
import adminAxiosInstance from "../../middlewares/adminInterceptor";

export const adminLogin = (endpoint, userData) => {
  const response = adminAxiosInstance.post(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
    userData
  );
  return response;
};

export const adminRegister = async (endpoint, userData) => {
  const response = await adminAxiosInstance.post(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
    userData
  );
  return response;
};

export const adminVerifyOTP = async (endpoint, otpData) => {
  const response = await adminAxiosInstance.post(
    `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
    otpData
  );
  return response;
};

// export const adminResendOTP = async (endpoint, phone) => {
//   const response = await adminAxiosInstance.post(
//     `${CONFIG_KEYS.API_BASE_URL}/${endpoint}`,
//     { phone }
//   );
//   return response;
// };
