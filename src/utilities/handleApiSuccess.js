export default function handleApiSuccess(response, validator) {
  const status = response?.status;

  if (typeof status !== "number" || status < 200 || status >= 300) {
    const error = new Error("INVALID_SUCCESS_STATUS");
    error.status = status ?? null;
    throw error;
  }

  const data = response.data;

  if (validator && !validator(data)) {
    const error = new Error("INVALID_API_RESPONSE");
    error.status = status;
    throw error;
  }

  return data;
}
