import api from "./authApi";

export async function requestOtp(phoneNumber, purpose) {
  const response = await api.post("/Auth/RequestOtp", {
    PhoneNumber: phoneNumber,
    Purpose: purpose,
  });

  return {
    status: response.status,
    data: response.data,
  };
}

export async function loginWithOtp(phoneNumber, otp) {
  const response = await api.post("/Auth/LoginWithOTP", {
    PhoneNumber: phoneNumber,
    OTP: otp,
  });

  return {
    status: response.status,
    data: response.data,
  };
}
