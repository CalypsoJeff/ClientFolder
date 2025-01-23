import { useState, useEffect, useRef } from "react";
import {
  otpVerification,
  resendOTPVerification,
} from "../../api/endpoints/auth/user-auth";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css"; 

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const location = useLocation();
  const { phone } = location.state || {};
  const navigate = useNavigate();
  const inputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];

  useEffect(() => {
    const countdown = timer > 0 && setInterval(() => setTimer(timer - 1), 1000);
    if (timer === 0) setIsResendDisabled(false);
    return () => clearInterval(countdown);
  }, [timer]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== "" && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleResend = async () => {
    try {
      setOtp(["", "", "", "", "", ""]);
      setTimer(30);
      setIsResendDisabled(true);
      const response = await resendOTPVerification(phone);
      console.log("Resending OTP response:", response.data);

      // Show success notification
      toast.success("A new OTP has been sent to your registered phone number.");
    } catch (error) {
      console.error(
        "Error resending OTP:",
        error.response?.data || error.message
      );
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    const otpData = { otp: otpValue, phone };

    try {
      const response = await otpVerification(otpData);
      console.log("Verifying OTP:", response.data);

      // Show success notification
      toast.success("OTP verified successfully. Redirecting...");
      navigate("/login");
    } catch (error) {
      console.error(
        "Error verifying OTP:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.error || "Failed to verify OTP. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBECD9]">
      <div className="bg-[#FDFDFD] p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#070407] mb-2">
            Verify Your Email
          </h2>
          <p className="text-[#585858]">We&apos;ve sent a code to your email</p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl font-bold border-2 rounded-lg focus:border-[#85ACD0] focus:outline-none bg-[#F1FFC7] text-[#2C3A28]"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          className="w-full bg-[#A1CE01] hover:bg-[#D5FFA0] text-[#161913] font-bold py-3 rounded-lg mb-4 transition duration-300"
        >
          Verify
        </button>

        <div className="text-center">
          <p className="text-[#828181] mb-2">
            Didn&apos;t receive the code? {timer > 0 && `(${timer}s)`}
          </p>
          <button
            onClick={handleResend}
            disabled={isResendDisabled}
            className={`text-[#356F9C] font-medium ${
              isResendDisabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-[#E56551]"
            }`}
          >
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otp;
