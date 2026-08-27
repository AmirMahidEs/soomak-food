import { ArrowLeft, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

import AuthLayout from "../components/auth/AuthLayout";
import AuthField from "../components/auth/AuthField";

export default function ForgotPasswordPage() {
  const [phone, setPhone] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // فعلاً فقط UI است.
    // بعداً درخواست ارسال کد تأیید به Backend اینجا قرار می‌گیرد.

    console.log("Forgot password:", phone);
  };

  return (
    <AuthLayout
      title="فراموشی رمز عبور"
      subtitle="شماره موبایل خود را وارد کنید تا کد تأیید برای شما ارسال شود"
    >
      <form onSubmit={handleSubmit} className="space-y-7">
        <AuthField
          label="شماره موبایل"
          icon={Phone}
          type="tel"
          name="phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="۰۹۱۲ ۱۲۳ ۴۵۶۷"
          autoComplete="tel"
        />

        <button
          type="submit"
          className="group mt-2 flex h-[51px] w-full items-center justify-center gap-3 rounded-full bg-gold-gradient font-semibold text-[#120304] shadow-[0_8px_25px_rgba(217,147,30,0.16)] transition-all duration-200 hover:-translate-y-[1px] hover:brightness-105"
        >
          <span>ارسال کد تأیید</span>

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

        <p className="pt-1 text-center text-sm text-white/45">
          رمز عبور خود را به یاد آوردید؟
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
