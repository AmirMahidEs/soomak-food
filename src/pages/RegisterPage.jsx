import { ArrowLeft, Phone, UserRound } from "lucide-react";

import { Link } from "react-router-dom";
import { useState } from "react";

import AuthLayout from "../components/auth/AuthLayout";
import AuthField from "../components/auth/AuthField";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.terms) {
      return;
    }

    if (form.password !== form.confirmPassword) {
      return;
    }

    // فعلاً فقط UI است.
    // بعداً درخواست Register به Backend اینجا قرار می‌گیرد.

    console.log("Register:", form);
  };

  return (
    <AuthLayout
      title="ثبت نام در سومک فود"
    //   subtitle="اطلاعات خود را وارد کنید تا ثبت نام شوید"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthField
          label="نام و نام خانوادگی"
          icon={UserRound}
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="مثال: امیر محمدی"
          autoComplete="name"
        />

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

        <AuthField
          label="رمز عبور"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="رمز عبور خود را وارد کنید"
          autoComplete="new-password"
        />

        <AuthField
          label="تکرار رمز عبور"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="رمز عبور را دوباره وارد کنید"
          autoComplete="new-password"
        />

        <label className="flex cursor-pointer items-center gap-2 pt-1 text-xs text-white/60">
          <input
            type="checkbox"
            name="terms"
            checked={form.terms}
            onChange={handleChange}
            className="h-4 w-4 cursor-pointer appearance-none rounded border border-[#8b4a3e] bg-transparent transition checked:border-[#e6a62e] checked:bg-[#e6a62e]"
          />

          <span>
            با
            <button
              type="button"
              className="mx-1 text-[#e6a62e] hover:text-[#f2c55d]"
            >
              قوانین و شرایط استفاده
            </button>
            موافق هستم
          </span>
        </label>

        <button
          type="submit"
          className="group mt-2 flex h-[51px] w-full items-center justify-center gap-3 rounded-full bg-gold-gradient font-semibold text-[#120304] shadow-[0_8px_25px_rgba(217,147,30,0.16)] transition-all duration-200 hover:-translate-y-[1px] hover:brightness-105"
        >
          <span>ثبت نام</span>

          <ArrowLeft
            size={19}
            strokeWidth={1.7}
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />
        </button>

        <div className="flex items-center gap-4 py-1">
          <span className="h-px flex-1 bg-[#6f2826]/60" />

          <span className="text-xs text-white/40">یا</span>

          <span className="h-px flex-1 bg-[#6f2826]/60" />
        </div>

        <p className="text-center text-sm text-white/45">
          حساب کاربری دارید؟
          <Link
            to="/login"
            className="mr-2 text-[#e6a62e] transition hover:text-[#f2c55d]"
          >
            وارد شوید
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
