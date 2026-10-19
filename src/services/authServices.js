import api from "../services/authApi";

// ارسال کد یکبار مصرف
export async function requestOtp(phoneNumber, purpose) {
  const response = await api.post("/Auth/RequestOtp", {
    PhoneNumber: phoneNumber,
    Purpose: purpose,
  });

  return response.data;
}

// ورود با کد یکبار مصرف
export async function loginWithOtp(phoneNumber, otp) {
  const response = await api.post("/Auth/LoginWithOTP", {
    PhoneNumber: phoneNumber,
    OTP: otp,
  });

  return response.data;
}
