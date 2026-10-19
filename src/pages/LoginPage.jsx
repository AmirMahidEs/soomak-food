import { ArrowLeft, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import AuthLayout from "../components/auth/AuthLayout";
import AuthField from "../components/auth/AuthField";

import { requestOtp } from "../services/authServices";

export default function LoginPage() {
  const navigate = useNavigate();

  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");

  const [form, setForm] = useState({
    phone: "",
    password: "",
  });

  const handleOtpLogin = async () => {
    const phone = form.phone.trim();

    if (!/^09\d{9}$/.test(phone)) {
      setOtpError("شماره موبایل را به‌صورت صحیح وارد کنید.");
      return;
    }

    setOtpLoading(true);
    setOtpError("");

    try {
      await requestOtp(phone, 1);

      navigate("/verify-otp", {
        state: {
          phone,
          purpose: 1,
          flow: "login",
        },
      });
    } catch (error) {
      console.error("OTP request failed:", error);
      setOtpError(
        "ارسال کد انجام نشد. اتصال به سرور و شماره موبایل را بررسی کنید.",
      );
    } finally {
      setOtpLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // فعلاً فقط UI است.
    // بعد از اتصال Backend، درخواست Login اینجا قرار می‌گیرد.

    console.log("Login:", form);
  };

  return (
    <AuthLayout
      title="ورود به حساب کاربری"
      //   subtitle="خوش آمدید! لطفاً برای ادامه وارد شوید"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthField
          label="شماره موبایل"
          icon={Phone}
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷"
          autoComplete="tel"
        />

        <div className="flex justify-start">
          <Link
            to="/forgot-password"
            className="text-xs text-[#e6a62e] transition hover:text-[#f2c55d]"
          >
            رمز عبور خود را فراموش کرده‌اید؟
          </Link>
        </div>

        <button
          type="button"
          onClick={handleOtpLogin}
          disabled={otpLoading}
          className="group mt-2 flex h-[51px] w-full items-center justify-center gap-3 rounded-full bg-gold-gradient font-semibold text-[#120304] shadow-[0_8px_25px_rgba(217,147,30,0.16)] transition-all duration-200 hover:-translate-y-[1px] hover:brightness-105"
        >
          <span>
            {otpLoading ? "در حال ارسال کد..." : "ورود با کد یکبار مصرف"}
          </span>

          <ArrowLeft
            size={19}
            strokeWidth={1.7}
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />
        </button>

        {otpError && (
          <p role="alert" className="text-center text-sm text-red-400">
            {otpError}
          </p>
        )}

        <div className="flex items-center gap-4 py-1">
          <span className="h-px flex-1 bg-[#6f2826]/60" />

          <span className="text-xs text-white/40">یا</span>

          <span className="h-px flex-1 bg-[#6f2826]/60" />
        </div>

        <p className="pt-1 text-center text-sm text-white/45">
          حساب کاربری ندارید؟
          <Link
            to="/signup"
            className="mr-2 text-[#e6a62e] transition hover:text-[#f2c55d]"
          >
            ثبت نام کنید
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
