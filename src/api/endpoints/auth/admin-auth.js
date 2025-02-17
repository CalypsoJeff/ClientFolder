import END_POINTS from "../../../constants/endpoints";
import {
  adminLogin,
  adminRegister,
  adminVerifyOTP,
} from "../../services/auth/admin-auth-service";

export const loginAdmin = (userData) => {
  return adminLogin(END_POINTS.ADMINLOGIN, userData);
};

export const registerAdmin = (userData) => {
  return adminRegister(END_POINTS.ADMINREGISTER, userData);
};

export const otpVerificationAdmin = (otpData) => {
  return adminVerifyOTP(END_POINTS.ADMINVERIFY_OTP, otpData);
};
