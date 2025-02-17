import END_POINTS from "../../../constants/endpoints";
import { login, register, resendOTP, verifyOTP } from "../../services/auth/user-auth-service";

export const loginUser = (userData) => {
    return login(END_POINTS.LOGIN, userData);
  };

export const registerUser = (userData)=>{
    return register(END_POINTS.REGISTER,userData)
  }

  export const otpVerification = (otpData)=>{
    return verifyOTP(END_POINTS.VERIFY_OTP,otpData)
  }

  export const resendOTPVerification = (phone)=>{
    return resendOTP(END_POINTS.RESEND_OTP,phone)
  }