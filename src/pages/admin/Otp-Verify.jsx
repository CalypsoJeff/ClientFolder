import { useState, useRef, useEffect } from "react";
import { otpVerificationAdmin } from "../../api/endpoints/auth/admin-auth";
import { useLocation, useNavigate } from "react-router";

const OTPInput = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const formRef = useRef(null);
  const location = useLocation();
  const { email } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    inputRefs.current[0]?.focus();
    setupWebOTP();
  }, []);

  const setupWebOTP = async () => {
    if ("OTPCredential" in window) {
      try {
        const ac = new AbortController();
        const form = formRef.current;

        navigator.credentials
          .get({
            otp: { transport: ["sms"] },
            signal: ac.signal,
          })
          .then((otp) => {
            const otpArray = otp.code.split("");
            setOtp(otpArray);
            setTimeout(() => handleSubmit(), 500);
          })
          .catch((err) => {
            console.log("WebOTP Error:", err);
          });

        setTimeout(() => {
          ac.abort();
        }, 180000);
      } catch (err) {
        console.log("WebOTP Setup Error:", err);
      }
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value.slice(-1);
      return newOtp;
    });

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(pastedData)) return;

    const otpArray = pastedData.split("").slice(0, 6);
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      otpArray.forEach((digit, index) => {
        newOtp[index] = digit;
      });
      return newOtp;
    });

    inputRefs.current[Math.min(otpArray.length - 1, 5)]?.focus();
  };

  const handleSubmit = async () => {
    const otpValue = otp.join("");
    if (otpValue.length === 6 && email) {
      try {
        const response = await otpVerificationAdmin({ email, otp: otpValue });

        console.log("Full Response:", response);

        // Check for 201 instead of 200
        if (response.status === 201) {
          console.log("✅ OTP verified successfully:", response.data);
          navigate("/admin/dashboard");
        } else {
          console.error("❌ OTP verification failed:", response.data);
        }
      } catch (error) {
        console.error("🚨 Error verifying OTP:", error);
      } finally {
        setOtp(new Array(6).fill(""));
        inputRefs.current[0]?.focus();
      }
    } else {
      console.error("❌ Invalid email or OTP.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Verification Required
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-sm mx-auto">
            We&apos;ve sent a 6-digit verification code to your email
            {email && <span className="font-medium block mt-1">{email}</span>}
          </p>
        </div>

        <form ref={formRef} className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-center gap-3 md:gap-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  className="w-11 h-12 md:w-14 md:h-14 text-center text-lg md:text-xl 
                            font-semibold border-2 border-gray-300 rounded-xl
                            focus:outline-none focus:ring-2 focus:ring-blue-500 
                            focus:border-blue-500 transition-all duration-200
                            hover:border-gray-400 touch-manipulation
                            bg-gray-50 text-gray-900"
                  aria-label={`Digit ${index + 1}`}
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                />
              ))}
            </div>
            <p className="text-xs text-center text-gray-500">
              Didn&apos;t receive the code?
              <button
                type="button"
                className="text-blue-600 hover:text-blue-700 font-medium ml-1"
              >
                Resend
              </button>
            </p>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={otp.join("").length !== 6}
            className="w-full h-12 md:h-14 text-base md:text-lg bg-blue-600 text-white 
                     rounded-xl font-semibold hover:bg-blue-700 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200 transform hover:scale-[1.02]"
          >
            Verify Email
          </button>
        </form>

        <div className="text-center">
          <button
            type="button"
            className="text-sm text-gray-600 hover:text-gray-800 font-medium"
            // onClick={navigate("/admin/register")}
          >
            Change Email Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPInput;
