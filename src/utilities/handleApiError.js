export default function handleApiError(error) {
  const response = error?.response;
  const data = response?.data;

  // خطاهای مربوط به شبکه یا عدم دریافت پاسخ از سرور
  if (!response) {
    return {
      status: null,
      code: null,
      message: "ارتباط با سرور برقرار نشد.",
      fieldErrors: {},
    };
  }

  const status = response.status;
  const code = data?.code ?? null;

  // استخراج خطاهای اعتبارسنجی فیلدها
  const fieldErrors = {};

  if (data?.errors && typeof data.errors === "object") {
    Object.entries(data.errors).forEach(([field, messages]) => {
      const uniqueMessages = [
        ...new Set(
          (Array.isArray(messages) ? messages : [messages])
            .filter(Boolean)
        ),
      ];

      if (uniqueMessages.length) {
        fieldErrors[field] = uniqueMessages;
      }
    });
  }

  // استخراج پیام‌های اعتبارسنجی
  const validationMessages = [
    ...new Set(Object.values(fieldErrors).flat()),
  ];

  // اولویت پیام:
  // 1. خطاهای validation
  // 2. متن برگشتی بک‌اند
  // 3. پیام عمومی
  const message =
    validationMessages.length > 0
      ? validationMessages.join(" ")
      : data?.description ||
        data?.title ||
        data?.detail ||
        data?.message ||
        error?.message ||
        "خطای نامشخصی رخ داده است.";

  return {
    status,
    code,
    message,
    fieldErrors,
  };
}